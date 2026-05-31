import pool from '../config/database.js';

async function resetDatabase() {
  console.log('--- Memulai Proses Reset Database ---');
  
  const client = await pool.connect();
  try {
    // Memulai transaksi SQL
    await client.query('BEGIN');
    
    console.log('Mengosongkan semua tabel dan me-reset sequence ID...');
    // TRUNCATE dengan CASCADE akan mengosongkan semua tabel dengan aman meskipun ada foreign key relations.
    // RESTART IDENTITY akan me-reset nilai primary key ID auto-increment kembali ke angka 1.
    const truncateQuery = `
      TRUNCATE TABLE 
        users, 
        profiles, 
        check_up, 
        disease_predictions, 
        refresh_tokens, 
        diseases 
      RESTART IDENTITY CASCADE;
    `;
    await client.query(truncateQuery);
    
    console.log('Menanamkan (seeding) kembali data awal penyakit...');
    // Mengembalikan data master penyakit agar siap digunakan kembali oleh model medis
    const seedDiseasesQuery = `
      INSERT INTO diseases (disease_name) VALUES
        ('Jantung'),
        ('Penyakit Dalam'),
        ('Paru-paru')
      ON CONFLICT DO NOTHING;
    `;
    await client.query(seedDiseasesQuery);
    
    await client.query('COMMIT');
    console.log('✔ Database BERHASIL dikosongkan dan di-reset!');
    console.log('✔ ID primary key telah di-reset ke 1.');
    console.log('✔ Penyakit awal (Jantung, Paru-paru, Penyakit Dalam) telah ditanamkan kembali.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Gagal melakukan reset database:', error.message);
  } finally {
    client.release();
    // Tutup koneksi pool agar script selesai dengan bersih
    await pool.end();
  }
}

resetDatabase();
