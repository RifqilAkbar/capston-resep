-- ============================================================
-- SEED DATA TIM  |  database/seed_resep.sql
-- ------------------------------------------------------------
-- File ini OTOMATIS dijalankan setiap kali `npm run dev:api`
-- (lihat pastikanDatabaseAda di server/index.js). Jadi:
--   - Tambahkan resep/bahan "master" tim DI SINI.
--   - Commit -> teman `git pull` -> `npm run dev:api` ->
--     data langsung muncul. Tanpa import manual.
--
-- ATURAN PENTING:
-- 1. SQL-nya IDEMPOTEN (aman dijalankan berulang). Jangan ubah pola:
--      bahan        -> INSERT IGNORE  (nama_bahan UNIQUE)
--      resep        -> INSERT ... SELECT ... WHERE NOT EXISTS
--      bahan resep  -> INSERT IGNORE  (PK recipe_id+ingredient_id)
-- 2. Tulis bahan SEBELUM resep yang memakainya (lookup by nama).
-- 3. `langkah_memasak` harus JSON VALID, tidak ada baris baru,
--    gunakan tanda kutip ganda (") untuk key.
-- 4. Satuan contoh: 'piring', 'butir', 'siung', 'gram', 'ikat'.
-- 5. Bahan yang belum terdaftar akan otomatis ikut ditambahkan
--    (status_validasi = TRUE) bila ditulis di blok BAHAN.
-- ============================================================

-- ===== BAHAN =====
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tempe', 'Protein', TRUE);

-- ===== RESEP =====
INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tempe Bacem', 'Nusantara', 4,
       '[{"instruksi":"Potong tempe menjadi beberapa bagian."},{"instruksi":"Rebus tempe dengan air gula dan bumbu sampai meresap."},{"instruksi":"Goreng sebentar hingga kecokelatan."}]',
       NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tempe Bacem');

-- ===== BAHAN RESEP =====
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'piring'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Bacem' AND i.nama_bahan = 'Tempe';

-- ===== BAHAN NUSANTARA (seed massal) =====
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Nasi', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Beras', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mi', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bihun', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lontong', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ketupat', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kerupuk', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Sagu', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Beras', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Terigu', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ayam', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Telur', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daging Sapi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daging Kambing', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Udang', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cumi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tempe', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tahu', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bebek', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Iga Sapi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kaki Sapi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan Teri', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Hijau', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Oncom', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kelapa', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Santan', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bayam', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kangkung', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kol', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kubis', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Wortel', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kentang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tomat', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jagung', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Terong', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jamur', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Bawang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Panjang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Taoge', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Timun', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sawi', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Tanah', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Singkong', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Genjer', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pepaya Muda', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Labu Kuning', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jengkol', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kemangi', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Petai', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Putih', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Rawit', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jahe', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kencur', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lengkuas', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kunyit', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kemiri', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ketumbar', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jintan', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Terasi', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Asam Jawa', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Salam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Jeruk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Serai', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kayu Manis', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cengkeh', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pala', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kapulaga', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Merica', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kluwak', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ebi', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Garam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kecap Manis', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Minyak Goreng', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Penyedap', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kaldu Ayam', 'Bumbu', TRUE);

-- ===== RESEP NUSANTARA (seed massal) =====

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gudeg', 'Jawa Tengah', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Gudeg."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Tengah hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Gudeg hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gudeg');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Kudus', 'Jawa Tengah', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Kudus."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Tengah."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Kudus hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Kudus');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Garang Asem', 'Jawa Tengah', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Garang Asem."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Tengah hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Garang Asem hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Garang Asem');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Nasi Liwet Solo', 'Jawa Tengah', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Nasi Liwet Solo."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Tengah hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Nasi Liwet Solo hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Nasi Liwet Solo');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tengkleng Solo', 'Jawa Tengah', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tengkleng Solo."},{"instruksi":"Masak dengan api kecil agar bumbu Tengkleng Solo meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Tengkleng Solo hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tengkleng Solo');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Mangut Lele', 'Jawa Tengah', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Mangut Lele."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Tengah hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Mangut Lele hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Mangut Lele');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Selat Solo', 'Jawa Tengah', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Selat Solo."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Tengah."},{"instruksi":"Koreksi rasa, lalu sajikan Selat Solo hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Selat Solo');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tahu Gimbal', 'Jawa Tengah', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tahu Gimbal."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Tengah."},{"instruksi":"Koreksi rasa, lalu sajikan Tahu Gimbal hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tahu Gimbal');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Lumpia Semarang', 'Jawa Tengah', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Lumpia Semarang."},{"instruksi":"Masak dengan api kecil agar bumbu Lumpia Semarang meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Lumpia Semarang hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Lumpia Semarang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tempe Mendoan', 'Jawa Tengah', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tempe Mendoan."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Tengah hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Tempe Mendoan hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tempe Mendoan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gudeg Jogja', 'Yogyakarta', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Gudeg Jogja."},{"instruksi":"Masak dengan api kecil agar bumbu Gudeg Jogja meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Gudeg Jogja hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gudeg Jogja');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Oseng Mercon', 'Yogyakarta', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Oseng Mercon."},{"instruksi":"Tumis atau rebus bumbu khas Yogyakarta hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Oseng Mercon hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Oseng Mercon');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sate Klathak', 'Yogyakarta', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Sate Klathak."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Yogyakarta."},{"instruksi":"Koreksi rasa, lalu sajikan Sate Klathak hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sate Klathak');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Brongkos', 'Yogyakarta', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Brongkos."},{"instruksi":"Tumis atau rebus bumbu khas Yogyakarta hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Brongkos hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Brongkos');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Bakpia', 'Yogyakarta', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Bakpia."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Yogyakarta."},{"instruksi":"Koreksi rasa, lalu sajikan Bakpia hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Bakpia');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Geplak', 'Yogyakarta', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Geplak."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Yogyakarta."},{"instruksi":"Koreksi rasa, lalu sajikan Geplak hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Geplak');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Rawon', 'Jawa Timur', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Rawon."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Timur hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Rawon hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Rawon');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Lamongan', 'Jawa Timur', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Lamongan."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Timur hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Lamongan hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Lamongan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Rujak Cingur', 'Jawa Timur', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Rujak Cingur."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Timur."},{"instruksi":"Koreksi rasa, lalu sajikan Rujak Cingur hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Rujak Cingur');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Pecel Madiun', 'Jawa Timur', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Pecel Madiun."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Timur."},{"instruksi":"Koreksi rasa, lalu sajikan Pecel Madiun hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Pecel Madiun');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Lontong Balap', 'Jawa Timur', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Lontong Balap."},{"instruksi":"Masak dengan api kecil agar bumbu Lontong Balap meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Lontong Balap hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Lontong Balap');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tahu Campur', 'Jawa Timur', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tahu Campur."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Timur hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Tahu Campur hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tahu Campur');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Nasi Krawu', 'Jawa Timur', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Nasi Krawu."},{"instruksi":"Masak dengan api kecil agar bumbu Nasi Krawu meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Nasi Krawu hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Nasi Krawu');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Semanggi Surabaya', 'Jawa Timur', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Semanggi Surabaya."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Timur."},{"instruksi":"Koreksi rasa, lalu sajikan Semanggi Surabaya hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Semanggi Surabaya');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Madura', 'Jawa Timur', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Madura."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Timur."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Madura hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Madura');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Bebek Sinjay', 'Jawa Timur', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Bebek Sinjay."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Timur."},{"instruksi":"Koreksi rasa, lalu sajikan Bebek Sinjay hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Bebek Sinjay');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Karedok', 'Jawa Barat', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Karedok."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Barat hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Karedok hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Karedok');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Lotek', 'Jawa Barat', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Lotek."},{"instruksi":"Masak dengan api kecil agar bumbu Lotek meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Lotek hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Lotek');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Nasi Tutug Oncom', 'Jawa Barat', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Nasi Tutug Oncom."},{"instruksi":"Masak dengan api kecil agar bumbu Nasi Tutug Oncom meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Nasi Tutug Oncom hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Nasi Tutug Oncom');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Empal Gentong', 'Jawa Barat', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Empal Gentong."},{"instruksi":"Masak dengan api kecil agar bumbu Empal Gentong meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Empal Gentong hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Empal Gentong');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Seblak', 'Jawa Barat', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Seblak."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Barat hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Seblak hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Seblak');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Batagor', 'Jawa Barat', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Batagor."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Barat."},{"instruksi":"Koreksi rasa, lalu sajikan Batagor hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Batagor');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Cuanki', 'Jawa Barat', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Cuanki."},{"instruksi":"Tumis atau rebus bumbu khas Jawa Barat hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Cuanki hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Cuanki');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Mie Kocok', 'Jawa Barat', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Mie Kocok."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Barat."},{"instruksi":"Koreksi rasa, lalu sajikan Mie Kocok hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Mie Kocok');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Surabi', 'Jawa Barat', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Surabi."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Jawa Barat."},{"instruksi":"Koreksi rasa, lalu sajikan Surabi hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Surabi');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Bandung', 'Jawa Barat', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Bandung."},{"instruksi":"Masak dengan api kecil agar bumbu Soto Bandung meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Bandung hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Bandung');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Rendang', 'Padang', 5, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Rendang."},{"instruksi":"Masak dengan api kecil agar bumbu Rendang meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Rendang hangat untuk 5 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Rendang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Dendeng Balado', 'Padang', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Dendeng Balado."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Padang."},{"instruksi":"Koreksi rasa, lalu sajikan Dendeng Balado hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Dendeng Balado');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gulai Tunjang', 'Padang', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Gulai Tunjang."},{"instruksi":"Tumis atau rebus bumbu khas Padang hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Gulai Tunjang hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gulai Tunjang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ayam Pop', 'Padang', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Ayam Pop."},{"instruksi":"Masak dengan api kecil agar bumbu Ayam Pop meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Ayam Pop hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ayam Pop');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gulai Kepala Ikan', 'Padang', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Gulai Kepala Ikan."},{"instruksi":"Tumis atau rebus bumbu khas Padang hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Gulai Kepala Ikan hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gulai Kepala Ikan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sambal Ijo', 'Padang', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Sambal Ijo."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Padang."},{"instruksi":"Koreksi rasa, lalu sajikan Sambal Ijo hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sambal Ijo');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Padang', 'Padang', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Padang."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Padang."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Padang hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Padang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Betawi', 'Betawi', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Betawi."},{"instruksi":"Masak dengan api kecil agar bumbu Soto Betawi meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Betawi hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Betawi');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Kerak Telor', 'Betawi', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Kerak Telor."},{"instruksi":"Tumis atau rebus bumbu khas Betawi hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Kerak Telor hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Kerak Telor');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Asinan Betawi', 'Betawi', 2, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Asinan Betawi."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Betawi."},{"instruksi":"Koreksi rasa, lalu sajikan Asinan Betawi hangat untuk 2 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Asinan Betawi');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Semur Jengkol', 'Betawi', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Semur Jengkol."},{"instruksi":"Masak dengan api kecil agar bumbu Semur Jengkol meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Semur Jengkol hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Semur Jengkol');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gabus Pucung', 'Betawi', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Gabus Pucung."},{"instruksi":"Masak dengan api kecil agar bumbu Gabus Pucung meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Gabus Pucung hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gabus Pucung');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ayam Betutu', 'Bali', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Ayam Betutu."},{"instruksi":"Masak dengan api kecil agar bumbu Ayam Betutu meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Ayam Betutu hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ayam Betutu');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sate Lilit', 'Bali', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Sate Lilit."},{"instruksi":"Tumis atau rebus bumbu khas Bali hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Sate Lilit hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sate Lilit');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Lawar', 'Bali', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Lawar."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Bali."},{"instruksi":"Koreksi rasa, lalu sajikan Lawar hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Lawar');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Nasi Campur Bali', 'Bali', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Nasi Campur Bali."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Bali."},{"instruksi":"Koreksi rasa, lalu sajikan Nasi Campur Bali hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Nasi Campur Bali');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tum Ayam', 'Bali', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tum Ayam."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Bali."},{"instruksi":"Koreksi rasa, lalu sajikan Tum Ayam hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tum Ayam');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Coto Makassar', 'Sulawesi', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Coto Makassar."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Sulawesi."},{"instruksi":"Koreksi rasa, lalu sajikan Coto Makassar hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Coto Makassar');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Pallubasa', 'Sulawesi', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Pallubasa."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Sulawesi."},{"instruksi":"Koreksi rasa, lalu sajikan Pallubasa hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Pallubasa');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sop Konro', 'Sulawesi', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Sop Konro."},{"instruksi":"Masak dengan api kecil agar bumbu Sop Konro meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Sop Konro hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sop Konro');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tinutuan', 'Sulawesi', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tinutuan."},{"instruksi":"Masak dengan api kecil agar bumbu Tinutuan meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Tinutuan hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tinutuan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ikan Woku', 'Sulawesi', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Ikan Woku."},{"instruksi":"Masak dengan api kecil agar bumbu Ikan Woku meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Ikan Woku hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ikan Woku');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Banjar', 'Kalimantan', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Soto Banjar."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Kalimantan."},{"instruksi":"Koreksi rasa, lalu sajikan Soto Banjar hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Banjar');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ketupat Kandangan', 'Kalimantan', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Ketupat Kandangan."},{"instruksi":"Tumis atau rebus bumbu khas Kalimantan hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Ketupat Kandangan hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ketupat Kandangan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Juhu Singkah', 'Kalimantan', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Juhu Singkah."},{"instruksi":"Masak dengan api kecil agar bumbu Juhu Singkah meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Juhu Singkah hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Juhu Singkah');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Pempek', 'Sumatera', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Pempek."},{"instruksi":"Masak dengan api kecil agar bumbu Pempek meresap sempurna."},{"instruksi":"Koreksi rasa, lalu sajikan Pempek hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Pempek');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tekwan', 'Sumatera', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Tekwan."},{"instruksi":"Tumis atau rebus bumbu khas Sumatera hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Tekwan hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tekwan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Mie Aceh', 'Sumatera', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Mie Aceh."},{"instruksi":"Tumis atau rebus bumbu khas Sumatera hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Mie Aceh hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Mie Aceh');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gulai Ikan Patin', 'Sumatera', 3, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Gulai Ikan Patin."},{"instruksi":"Bakar, kukus, atau sangrai sesuai teknik tradisional Sumatera."},{"instruksi":"Koreksi rasa, lalu sajikan Gulai Ikan Patin hangat untuk 3 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gulai Ikan Patin');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Bika Ambon', 'Sumatera', 4, '[{"instruksi":"Siapkan dan bersihkan seluruh bahan untuk Bika Ambon."},{"instruksi":"Tumis atau rebus bumbu khas Sumatera hingga harum sebelum dimasukkan bahan utama."},{"instruksi":"Koreksi rasa, lalu sajikan Bika Ambon hangat untuk 4 porsi."}]', NULL, 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Bika Ambon');

-- ===== BAHAN RESEP NUSANTARA (seed massal) =====
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg' AND i.nama_bahan = 'Nasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Lontong';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Kudus' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Wortel';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Kacang Panjang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Garang Asem' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Beras';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Liwet Solo' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Kaki Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Wortel';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tengkleng Solo' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mangut Lele' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Wortel';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Kentang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Merica';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Selat Solo' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Tahu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gimbal' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Tepung Terigu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Wortel';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Kacang Panjang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lumpia Semarang' AND i.nama_bahan = 'Garam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Tempe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Tepung Terigu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Merica';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tempe Mendoan' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja' AND i.nama_bahan = 'Nasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Cabai Rawit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Mercon' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Daging Kambing';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Merica';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Garam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Klathak' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Kencur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brongkos' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakpia' AND i.nama_bahan = 'Tepung Terigu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakpia' AND i.nama_bahan = 'Kacang Hijau';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakpia' AND i.nama_bahan = 'Gula';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakpia' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakpia' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Geplak' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Geplak' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Geplak' AND i.nama_bahan = 'Garam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Kluwak';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rawon' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Kubis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Lamongan' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Timun';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Kangkung';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Tahu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Tempe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Cingur' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Kangkung';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Bayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pecel Madiun' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Lontong';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lontong Balap' AND i.nama_bahan = 'Tahu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Tahu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Campur' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Nasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Krawu' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semanggi Surabaya' AND i.nama_bahan = 'Genjer';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semanggi Surabaya' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semanggi Surabaya' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semanggi Surabaya' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semanggi Surabaya' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semanggi Surabaya' AND i.nama_bahan = 'Kencur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Madura' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Bebek';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bebek Sinjay' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Kacang Panjang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Timun';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Karedok' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Kangkung';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Bayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lotek' AND i.nama_bahan = 'Tahu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Tutug Oncom' AND i.nama_bahan = 'Beras';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Tutug Oncom' AND i.nama_bahan = 'Oncom';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Tutug Oncom' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Tutug Oncom' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Tutug Oncom' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Tutug Oncom' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Cengkeh';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Empal Gentong' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Kerupuk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Kencur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Sawi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seblak' AND i.nama_bahan = 'Jamur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Tahu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Tepung Terigu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Batagor' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cuanki' AND i.nama_bahan = 'Udang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cuanki' AND i.nama_bahan = 'Tepung Sagu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cuanki' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cuanki' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cuanki' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cuanki' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Mi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Udang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Kocok' AND i.nama_bahan = 'Kaldu Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Surabi' AND i.nama_bahan = 'Tepung Beras';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Surabi' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Surabi' AND i.nama_bahan = 'Gula';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Surabi' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Surabi' AND i.nama_bahan = 'Garam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Wortel';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Bandung' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Kayu Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Cengkeh';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rendang' AND i.nama_bahan = 'Pala';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Gula';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dendeng Balado' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Kaki Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Tunjang' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Pop' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Kepala Ikan' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambal Ijo' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambal Ijo' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambal Ijo' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambal Ijo' AND i.nama_bahan = 'Gula';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambal Ijo' AND i.nama_bahan = 'Garam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambal Ijo' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Kentang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Padang' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Merica';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Betawi' AND i.nama_bahan = 'Kentang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kerak Telor' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kerak Telor' AND i.nama_bahan = 'Beras';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kerak Telor' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kerak Telor' AND i.nama_bahan = 'Ebi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kerak Telor' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kerak Telor' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Kol';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Kubis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Wortel';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Timun';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Terasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Asinan Betawi' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Jengkol';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Semur Jengkol' AND i.nama_bahan = 'Gula';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Kluwak';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gabus Pucung' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Betutu' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Udang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sate Lilit' AND i.nama_bahan = 'Gula Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Lawar' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Nasi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Kelapa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Nasi Campur Bali' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tum Ayam' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Ketumbar';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Coto Makassar' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Daging Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Kacang Tanah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Ketumbar';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pallubasa' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Iga Sapi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Ketumbar';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Daun Salam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sop Konro' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Beras';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Jagung';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Labu Kuning';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Kangkung';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Ikan Teri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tinutuan' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Daun Jeruk';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Woku' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Kentang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar' AND i.nama_bahan = 'Bihun';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Ketupat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Lengkuas';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketupat Kandangan' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Jahe';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Bawang Merah';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Juhu Singkah' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pempek' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pempek' AND i.nama_bahan = 'Tepung Sagu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pempek' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pempek' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pempek' AND i.nama_bahan = 'Garam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pempek' AND i.nama_bahan = 'Minyak Goreng';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Udang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Tepung Sagu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Kaldu Ayam';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tekwan' AND i.nama_bahan = 'Taoge';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Mi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Udang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Bawang Putih';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Kecap Manis';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Tomat';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Jintan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh' AND i.nama_bahan = 'Daun Bawang';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Ikan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Cabai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Kunyit';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Kemiri';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Serai';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Asam Jawa';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Ikan Patin' AND i.nama_bahan = 'Kemangi';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bika Ambon' AND i.nama_bahan = 'Telur';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bika Ambon' AND i.nama_bahan = 'Tepung Terigu';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bika Ambon' AND i.nama_bahan = 'Santan';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bika Ambon' AND i.nama_bahan = 'Gula';
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bika Ambon' AND i.nama_bahan = 'Kayu Manis';
