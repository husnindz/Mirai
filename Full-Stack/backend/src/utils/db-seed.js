import pool from '../config/database.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function seedDatabase() {
  console.log('--- 🚀 Memulai Proses Seeding Database Mirai ---');
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    console.log('1. Mengosongkan data lama di semua tabel...');
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
    console.log('✔ Semua tabel dikosongkan & sequence ID di-reset ke 1.');

    console.log('2. Menanamkan data master penyakit (diseases)...');
    // Memastikan urutan ID: 1 = Jantung, 2 = Penyakit Dalam, 3 = Paru-paru
    const seedDiseasesQuery = `
      INSERT INTO diseases (disease_name) VALUES
        ('Jantung'),
        ('Penyakit Dalam'),
        ('Paru-paru')
      ON CONFLICT DO NOTHING;
    `;
    await client.query(seedDiseasesQuery);
    console.log('✔ Data master penyakit berhasil ditanamkan (1: Jantung, 2: Penyakit Dalam, 3: Paru-paru).');

    console.log('3. Membuat akun pengguna percobaan (users)...');
    const defaultPasswordHash = await bcrypt.hash('password123', SALT_ROUNDS);

    // Seed User Budi (Laki-laki, 42 Tahun)
    const budiUserQuery = `
      INSERT INTO users (email, password) 
      VALUES ('budi@mirai.com', $1) 
      RETURNING user_id;
    `;
    const budiUserRes = await client.query(budiUserQuery, [defaultPasswordHash]);
    const budiUserId = budiUserRes.rows[0].user_id;

    const budiProfileQuery = `
      INSERT INTO profiles (user_id, name, age, gender) 
      VALUES ($1, 'Budi Santoso', 42, 1);
    `;
    await client.query(budiProfileQuery, [budiUserId]);

    // Seed User Siti (Perempuan, 28 Tahun)
    const sitiUserQuery = `
      INSERT INTO users (email, password) 
      VALUES ('siti@mirai.com', $1) 
      RETURNING user_id;
    `;
    const sitiUserRes = await client.query(sitiUserQuery, [defaultPasswordHash]);
    const sitiUserId = sitiUserRes.rows[0].user_id;

    const sitiProfileQuery = `
      INSERT INTO profiles (user_id, name, age, gender) 
      VALUES ($1, 'Siti Rahma', 28, 0);
    `;
    await client.query(sitiProfileQuery, [sitiUserId]);

    console.log('✔ Akun percobaan berhasil dibuat:');
    console.log('   - budi@mirai.com (Password: password123) -> Budi Santoso (Laki-laki, 42 thn)');
    console.log('   - siti@mirai.com (Password: password123) -> Siti Rahma (Perempuan, 28 thn)');

    console.log('4. Menanamkan data riwayat check-up medis percobaan (check_up)...');
    
    // Check-up 1 untuk Budi (Check-up Lama, Hasil Kurang Baik)
    const budiCheckUp1Query = `
      INSERT INTO check_up (user_id, cholesterol, creatinin, fbs, rbs, hgb, lymfosit, mch, mchc, mcv, ureum, wbc, created_at)
      VALUES ($1, 245.50, 1.45, 125.80, 160.20, 13.20, 24.50, 27.50, 31.20, 84.40, 38.50, 10.40, NOW() - INTERVAL '1 month')
      RETURNING check_up_id;
    `;
    const budiCheckUp1Res = await client.query(budiCheckUp1Query, [budiUserId]);
    const budiCheckUp1Id = budiCheckUp1Res.rows[0].check_up_id;

    // Check-up 2 untuk Budi (Check-up Baru, Kondisi Membaik)
    const budiCheckUp2Query = `
      INSERT INTO check_up (user_id, cholesterol, creatinin, fbs, rbs, hgb, lymfosit, mch, mchc, mcv, ureum, wbc, created_at)
      VALUES ($1, 210.20, 1.15, 98.40, 135.00, 14.50, 32.10, 29.00, 33.50, 88.50, 24.10, 7.80, NOW() - INTERVAL '3 days')
      RETURNING check_up_id;
    `;
    const budiCheckUp2Res = await client.query(budiCheckUp2Query, [budiUserId]);
    const budiCheckUp2Id = budiCheckUp2Res.rows[0].check_up_id;

    // Check-up 1 untuk Siti (Kondisi Sangat Sehat)
    const sitiCheckUpQuery = `
      INSERT INTO check_up (user_id, cholesterol, creatinin, fbs, rbs, hgb, lymfosit, mch, mchc, mcv, ureum, wbc, created_at)
      VALUES ($1, 180.20, 0.85, 88.50, 115.20, 12.80, 35.40, 30.20, 34.10, 91.30, 18.40, 6.50, NOW() - INTERVAL '5 days')
      RETURNING check_up_id;
    `;
    const sitiCheckUpRes = await client.query(sitiCheckUpQuery, [sitiUserId]);
    const sitiCheckUpId = sitiCheckUpRes.rows[0].check_up_id;

    console.log('✔ Riwayat check-up berhasil dimasukkan.');

    console.log('5. Menanamkan data prediksi risiko penyakit (disease_predictions)...');
    
    // Prediksi untuk Check-up 1 Budi (Kondisi Kurang Sehat)
    // 1: Jantung, 2: Penyakit Dalam, 3: Paru-paru
    const predictionsBudi1 = [
      { diseaseId: 1, prob: 0.68, risk: 'Medium' }, // Risiko Jantung Medium
      { diseaseId: 2, prob: 0.72, risk: 'High' },   // Risiko Penyakit Dalam Tinggi
      { diseaseId: 3, prob: 0.22, risk: 'Low' }     // Risiko Paru rendah
    ];
    for (const p of predictionsBudi1) {
      await client.query(
        'INSERT INTO disease_predictions (check_up_id, disease_id, probability, risk) VALUES ($1, $2, $3, $4)',
        [budiCheckUp1Id, p.diseaseId, p.prob, p.risk]
      );
    }

    // Prediksi untuk Check-up 2 Budi (Kondisi Membaik)
    const predictionsBudi2 = [
      { diseaseId: 1, prob: 0.28, risk: 'Low' },
      { diseaseId: 2, prob: 0.35, risk: 'Medium' },
      { diseaseId: 3, prob: 0.15, risk: 'Low' }
    ];
    for (const p of predictionsBudi2) {
      await client.query(
        'INSERT INTO disease_predictions (check_up_id, disease_id, probability, risk) VALUES ($1, $2, $3, $4)',
        [budiCheckUp2Id, p.diseaseId, p.prob, p.risk]
      );
    }

    // Prediksi untuk Siti (Sehat Walafiat)
    const predictionsSiti = [
      { diseaseId: 1, prob: 0.05, risk: 'Low' },
      { diseaseId: 2, prob: 0.08, risk: 'Low' },
      { diseaseId: 3, prob: 0.02, risk: 'Low' }
    ];
    for (const p of predictionsSiti) {
      await client.query(
        'INSERT INTO disease_predictions (check_up_id, disease_id, probability, risk) VALUES ($1, $2, $3, $4)',
        [sitiCheckUpId, p.diseaseId, p.prob, p.risk]
      );
    }

    await client.query('COMMIT');
    console.log('\n✔ --- PROSES SEEDING BERHASIL DISELESAIKAN! ---');
    console.log('Semua tabel database terisi dengan data riwayat kesehatan simulasi yang kaya.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Gagal melakukan seeding database:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
