const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

let isRefreshing = false;
let refreshSubscribers = [];

// Memasukkan request ke antrean (queue) saat proses refresh token sedang berjalan
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// Menjalankan semua request yang sedang mengantre setelah token berhasil diperbarui
function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach((cb) => cb(newAccessToken));
  refreshSubscribers = [];
}

/**
 * Wrapper native fetch yang otomatis menangani:
 * 1. Menambahkan Authorization Bearer Token dari localStorage.
 * 2. Auto-refresh token ketika mendapatkan response 401 (Expired Token).
 * 3. Menangani antrean request (request queueing) agar tidak memicu refresh ganda.
 */
export async function fetchWithAuth(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  // Default headers
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Selalu pasang access token jika tersedia di localStorage
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    options.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    let response = await fetch(url, options);

    // Deteksi jika Token kedaluwarsa (401 Unauthorized)
    if (response.status === 401) {
      // Kloning response untuk membaca JSON tanpa mengonsumsi body response asli
      const cloneResponse = response.clone();
      const data = await cloneResponse.json().catch(() => ({}));

      // Pastikan error disebabkan oleh token kedaluwarsa atau tidak valid
      if (
        data.message === 'Invalid or expired token!' || 
        data.message?.toLowerCase().includes('token')
      ) {
        
        // Skenario A: Jika proses refresh token sedang berjalan, masukkan request ini ke antrean
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newAccessToken) => {
              options.headers['Authorization'] = `Bearer ${newAccessToken}`;
              resolve(fetch(url, options));
            });
          });
        }

        // Skenario B: Jika belum ada proses refresh yang berjalan, jalankan refresh token
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          handleLogout();
          throw new Error('No refresh token available');
        }

        try {
          const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (!refreshResponse.ok) {
            throw new Error('Refresh token expired or invalid');
          }

          const refreshData = await refreshResponse.json();
          const newAccessToken = refreshData.accessToken;

          // Simpan token baru ke localStorage
          localStorage.setItem('accessToken', newAccessToken);
          isRefreshing = false;

          // Bebaskan & jalankan seluruh request yang mengantre
          onRefreshed(newAccessToken);

          // Kirim ulang request asal dengan token baru
          options.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return await fetch(url, options);

        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          handleLogout();
          throw refreshError;
        }
      }
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Fungsi helper untuk logout otomatis saat token benar-benar mati/tidak valid
function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // Arahkan pengguna ke halaman utama/login
  window.location.href = '/';
}
