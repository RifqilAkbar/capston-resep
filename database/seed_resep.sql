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
