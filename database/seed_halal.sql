-- ============================================================
-- SEED DATA HALAL (upload per-user) | database/seed_halal.sql
-- ------------------------------------------------------------
-- Dikonversi otomatis dari tampilan/resep_halal.sql.
-- IDEMPOTEN: bahan -> INSERT IGNORE, resep -> WHERE NOT EXISTS,
-- link bahan -> INSERT IGNORE. Dijalankan di jalankanSeed()
-- setelah seed_resep.sql.
--
-- Distribusi ke user (tidak merata):
--   user1 = 9, user2 = 8, user3 = 8, user4 = 7,
--   user5 = 7, user6 = 7, user7 = 6  (total 52)
-- ============================================================

-- ===== BAHAN =====
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ayam', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jeruk Nipis', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Garam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Santan', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Minyak Goreng', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Putih', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kemiri', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Terasi', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Tapioka', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Bawang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Baking Powder', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Telur', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pala', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bubuk Merica Putih', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kaldu Jamur', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kaldu Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Es Batu', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Air', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tulang Sapi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('L Air', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabe Rawit Bird Eye Chilli', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mi Kuning', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bihun', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tahu Goreng', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Goreng', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pangsit', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Udang Tanpa Kepala', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tahu Putih Di', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kentang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Petai', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lengkuas', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jahe', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kunyit', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kunyit Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Serai', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Jeruk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Salam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Penyedap', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ayam Dipotong Kecil-', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('L Santan Encer', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Susu', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tomat', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Bombay', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ketumbar', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jintan', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Merica', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Secukupnya Garam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lontong', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ketupat', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sambal Cabai Rawit', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tempe', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tahu', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan Tuna', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Rawit', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Paprika Bubuk', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jahe Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Udang', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Taoge', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jinten Hitam Bubuk', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bumbu Kari', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Seledri', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kecap Asin', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kecap Manis', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Minyak Wijen', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cuka', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Tanah', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kerupuk', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cumi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kerang', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Brokoli', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Rawit Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Saus Tiram', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Saus Tomat', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Saus Sambal', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kecap Ikan', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Seasoning Sauce', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Hati Ayam', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kentang Potong Dadu', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Elas Santan Encer', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gr', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Putih Tumbuk Kasar Bersama Kulitnya', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Nangka Muda Boleh Kaleng', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kithul Jaggery', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ceker Ayam', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Black Tea', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Krecek', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Tolo', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Tholo', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ayam Kampung', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Terigu', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Garlic Powder', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tomat Cherry Merah', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Air Perasan Jeruk Nipis', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lemon Grass Diambil Bawahnya', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Siung Bawang Putih', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Penuh Gula Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lbr Roti Tawar', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Btr Telur Ayam', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Wortel', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sosis', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Iga Kambing Muda - Lamb', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Oyster Sauce', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Vinegar', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ons', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Telur Dikocok', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ditambahkan Sedikit Air', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tomat Buah Digiling', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Oregano', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cc Susu Cair', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mentega', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Margarin', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Merica Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bawang Merah Goreng', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kuning Telur', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Putih Telur Dikocok Sebentar', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jangan Merebus Kentang Kelamaan', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jangan Mengaduk Adonan Terlalu Lama', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Menggoreng Dengan Minyak', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jangan Terlalu Banyak Memasukkan Adonan Ke Penggorengan', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jika Adonan Ditambahkan Kuning Telur', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan Tuna Dapat Diganti Dengan Ikan Jenis Lain Tetapi', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Dadu Dikukus Dulu', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Spring Green Secukupnya Dipotong-Potong Kasar', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan Teri', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Satu Butir Telur Dikocok Dahulu', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Hijau Potong Kasar', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Pisang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kencur', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kaldu', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pak Curly Kale', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula Jawa Disisir', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mata Asam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Elas Air', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Kai Choi', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tahu Potong', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Goreng', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Air Panas', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Air Kaldu Ayam Kampung', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Dadar Telor', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Telor', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Peres Garam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Wortel Kukus', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kacang Polong Kukus', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jamur Putih', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Iga Kambing', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jahe Potong', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Batang Kulit Kayu Manis', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cengkeh', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Wortel Dipotong-Potong Bundar', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Bawang Ambil', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Merica Butiran', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sambal Rawit Merah', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Emping Goreng', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kayu Manis', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kapulaga', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bunga Lawang', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tangkai Daun Bawang', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tangkai Seledri', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ikan Tilapia', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bakso Ikan', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Dada Ayam', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pakcoy', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sawi Putih', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sawi Hijau', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kol', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Baby Corn', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Jamur', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Plain', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Lada Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Merah Rawit', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kelapa Parut', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Beras', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Hijau', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Red Onion', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pare', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Enggam Teri', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Enggam Spaghetti', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Chicken Mince', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mie Shanghai', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Teh Lada Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bakso', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Jagung', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pasta Pandan', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cetakan Kue', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kolang-Kaling', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Alpukat', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Nangka Manis', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kelapa', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kelapa Berbentuk Parutan Kasar', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Nata De Coco', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Susu Semi Skim', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sirup Mawar', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Es Batu - Crushed Es Batu', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Siapkan Semua Buah-Buahan Segar', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Semua Potongan Buah Serta Kolang-Kaling', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Dimasukkan Susu Kental Manis', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tambahkan Sedikit Garam', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Baru Dimasukkan Es Batu', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Nanas', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cocktail In Syrup', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Chia Seed', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Roti Tawar', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pisang', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Nutella', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Keju', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES (': Wijen', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Madu', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Deep Fried Tofu', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Asam Jawa', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Soft Cheese', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Double Cream', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula Pasir Butiran', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pisang Tanduk', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Maizena', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Soda Kue', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Minyak Sayur', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Sheet Puff Pastry', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ripe Banana', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Spoons Of Butter', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mature Cheese', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Of Nutella', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Egg Yolk', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Ubi Manis', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Ketan', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kelapa Parut Kering', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Gula Aren', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Pandan Satu Lembar', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Tepung Protein', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Pewarna Makanan Hijau', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Vanili Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Btr Telur', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Potatoes', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Butter Melted', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Flour', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Milk Powder', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Carrots', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Minced Chicken', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Medium Onion Finely Chopped', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cloves Garlic Crushed', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bunch Spring Onions', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Bread Crumbs', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Oil For Frying', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Putih Telur', 'Protein', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Caster Sugar', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kentang Direbus Dan', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Plain Flour', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kismis', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Alternatif Lain Nangka Manis', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Garam Sejumput', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Granulated Sugar', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Daun Pandan', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Beras Ketan', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cc Santan Kental', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cokelat Bubuk', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Singkong', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Vanili', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Kulit Lumpia', 'Karbohidrat', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Mangga', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Apel', 'Lainnya', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Timun', 'Sayuran', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Cabai Merah Keriting', 'Bumbu', TRUE);
INSERT IGNORE INTO ingredients (nama_bahan, kategori, status_validasi)
VALUES ('Air Asam', 'Bumbu', TRUE);

-- ===== RESEP =====
INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ayam Bakar Taliwang', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Marinasi ayam dengan jeruk nipis dan garam selama kurang lebih 20 menit, lalu cuci bersih. Sisihkan."},{"instruksi":"Panaskan minyak di atas wajan besar, lalu tumis bumbu halus hingga harum."},{"instruksi":"Tuang santan. Aduk lalu rebus hingga mendidih."},{"instruksi":"Masukkan ayam. Masak hingga matang dan bumbu meresap. Matikan kompor."},{"instruksi":"Panggang ayam di atas bara api atau dalam oven api atas di temperatur 200 derajat celcius, posisi loyang nomer 2 dari atas. Sambil oles dengan bumbu yang tersisa, panggang hingga bumbu sedikit terbakar. Balik ayam, lakukan hal yang sama."},{"instruksi":"Jika sudah agak terbakar kedua sisi, keluarkan dari oven. Sajikan dengan lalapan, sambel cobek, dan nasi hangat."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ayam Bakar Taliwang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Bakso Daging Sapi dengan Kuah Kaldu Tulang', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Bakso: Iris bawang putih dan bawang merah, lalu goreng hingga kecoklatan atau matang."},{"instruksi":"Masukkan daging ke dalam food processor, tambahkan 2 cube es batu, lalu haluskan daging hingga lumat."},{"instruksi":"Masukkan bawang putih dan bawang merah goreng, merica, kaldu, garam, baking powder, es batu lagi. Adonan diaduk lagi hingga bercampur rata."},{"instruksi":"Masukkan tepung tapioka, dan es batu bila perlu. Adonan diaduk lagi hingga merata."},{"instruksi":"Panaskan air dengan api kecil dan jangan sampai mendidih. Tunggu hingga cukup panas."},{"instruksi":"Bentuk adonan bakso bulat-bulat sesuai selera menggunakan tangan dan sendok, masukkan bakso ke dalam air yang cukup panas. Tunggu hingga bakso mengapung di atas permukaan air, baru diangkat."},{"instruksi":"Kuah kaldu tulang: Cuci bersih tulang atau ribs."},{"instruksi":"Rebus tulang hingga mendidih selama 10 menit, kemudian kecilkan api, biarkan hingga 1 jam atau lebih."},{"instruksi":"Iris bawang putih dan bawang merah, lalu goreng hingga kecoklatan atau matang. Kemudian blender hingga halus."},{"instruksi":"Jika rebusan tulang sudah mengeluarkan kaldunya, masukkan bawang putih dan bawang merah yang sudah diblender dan bumbu lainnya ke dalam kuah tersebut. Koreksi rasanya."},{"instruksi":"Masukkan bakso ke dalam kuah kaldu. Tunggu hingga cukup matang dan kaldu meresap ke dalam bakso."},{"instruksi":"Masukkan daun bawang dan tambahkan bawang merah goreng."},{"instruksi":"Sambal bawang: Rebus cabe rawit dan bawang putih hingga empuk. Angkat dan haluskan menggunakan blender atau diulek (tambahkan sedikit garam dan gula). Taruh di mangkok sambal."},{"instruksi":"Penataan: Masukkan tahu goreng dan mie ke dalam mangkok, lalu tambahkan bakso dan tuangkan kuahnya. Taburkan dengan daun bawang dan bawang goreng, serta sambal bawang."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Panaskan minyak secukupnya lalu tumis bahan yang dihaluskan sampai wangi. Setelah itu masukkan udang yang sudah dilumuri jeruk nipis tadi."},{"instruksi":"Setelah udang berubah warna masukkan air. Setelah mendidih masukkan kentang."},{"instruksi":"Setelah kentang lunak masukkan tahu."},{"instruksi":"Tambahkan juga serai, daun jeruk purut, daun salam, garam, dan penyedap rasa. Aduk-aduk dengan pelan agar tahu tidak hancur."},{"instruksi":"Setelah bumbu meresap dan harum, masukkan santan bubuk yang telah dicampurkan dengan sedikit air terlebih dahulu. Lanjutkan mengaduk."},{"instruksi":"Jika kuah dirasa sudah mengental, uji rasa. Bila sudah dirasa pas, angkat dan sajikan langsung dengan nasi panas."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ayam Glabed', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Lumuri ayam menggunakan jeruk nipis, remas-remas dan biarkan selama sekitar 10 menit."},{"instruksi":"Haluskan bawang putih, kunyit, ketumbar dan lada, lalu tumis hingga harum."},{"instruksi":"Masukkan ayam dan aduk hingga berubah warna. Tambahkan garam dan santan/air. Masak hingga ayam empuk dan bumbu meresap, matikan api."},{"instruksi":"Pada panci terpisah, tumis bumbu kuah yang telah dihaluskan bersama daun jeruk hingga harum. Masukkan tomat dan beri garam secukupnya."},{"instruksi":"Tambahkan santan dan susu ke dalamnya. Masak sampai kuah mendidih sambil ditimba-timba agar santan tidak pecah. Cicipi, jika dirasa sudah pas, masukkan ayam yang telah ditumis tadi ke dalam panci kuah. Masak sekitar 5 menit, matikan api."},{"instruksi":"Penyajian: Dalam mangkok tata lontong/ketupat yang telah dipotong-potong, telur, tempe, dan tahu putih. Siram dengan kuah glabed panas dan beri potongan ayam. Taburi bawang goreng, beri air jeruk nipis secukupnya serta sambal sesuai selera."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ayam Glabed');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Resep Sambal Tuna', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Panaskan 1 sdm minyak goreng lalu tumis tuna menggunakan api sedang sampai kering."},{"instruksi":"Blender kasar bawang, cabe merah besar, cabe rawit dan sereh."},{"instruksi":"Panaskan 7 sdm minyak goreng menggunakan api sedang lalu masukkan bahan-bahan yang sudah di blender. Tumis sebentar."},{"instruksi":"Masukkan air, gula dan garam lalu kecilkan api, masak kurang lebih 20 menit atau sampai air menyusut."},{"instruksi":"Masukkan tuna, lalu tumis kembali selama 5 menit."},{"instruksi":"Sambal ini menghasilkan sekitar 300 gr siap santap."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Resep Sambal Tuna');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Mie Aceh Udang', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Goreng bawang merah, bawang putih, cabe rawit, dan tomat sebentar sekitar 3 menit. Kemudian blender semua bahan bumbu halus hingga rata (sebaiknya tidak menggunakan air saat memblender, tapi minyak goreng secukupnya)."},{"instruksi":"Panaskan wajan dengan 2-3 sendok makan minyak goreng. Setelah itu, tumis udang sampai matang sekitar 5 menit. Sisihkan."},{"instruksi":"Di wajan yang sama, tambahkan sesendok minyak goreng lagi, masukkan irisan bawang merah, dan tumis sebentar hingga layu."},{"instruksi":"Masukkan bumbu halus dan tumis sekitar 5-7 menit. Tambahkan 1/4 cup air. Masukkan bubuk jinten dan kari. Tumis terus sampai harum, sekitar 6 menit."},{"instruksi":"Masukkan mi yang sudah didinginkan. Aduk terus, lalu tambahkan kecap asin dan manis secukupnya. Tumis terus hingga semua bahan menyatu."},{"instruksi":"Masukkan tauge. Aduk terus. Tambahkan minyak wijen dan cuka. Aduk terus hingga semua bahan tercampur rata. Koreksi rasanya."},{"instruksi":"Masukkan udang, daun bawang, dan daun sop. Aduk hingga semuanya tercampur rata."},{"instruksi":"Mie Aceh Udang siap disajikan dengan irisan tomat, taburan bawang goreng, kerupuk udang, dan kacang tanah goreng."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Mie Aceh Udang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Seafood Saus Padang Bintang Toedjoeh', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Haluskan bawang putih, bawang merah, cabai rawit, dan minyak dengan blender kemudian tumis hingga wangi."},{"instruksi":"Masukkan daun salam dan daun jeruk, tumis hingga wangi dan matang."},{"instruksi":"Masukkan kecap ikan, seasoning sauce, saus tiram, saus tomat, saus sambal, daun bawang, dan bagian putih, aduk rata."},{"instruksi":"Tambahkan air, aduk rata lalu masukkan gula dan kaldu bubuk."},{"instruksi":"Masukkan kerang yang telah direbus."},{"instruksi":"Panaskan minyak, goreng cumi dan udang selama 30-60 detik, tiriskan."},{"instruksi":"Masukkan sisa daun bawang, cumi, dan udang yang telah digoreng, (brokoli boleh dicampur atau dipisah untuk hiasan) masak hingga mendidih kemudian matikan api."},{"instruksi":"Seafood saus padang siap disajikan dengan nasi sebagai pelengkap."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Seafood Saus Padang Bintang Toedjoeh');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Spaghetti Dendeng Balado', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Toping dendeng basah balado. Potong daging setebal 1 cm."},{"instruksi":"Lumuri dengan bawang putih, merica, dan garam. Biarkan selama 15 menit."},{"instruksi":"Pindahkan ke wajan, beri air dan masak sampai air habis dan daging empuk, angkat dan tiriskan daging."},{"instruksi":"Goreng daging dengan minyak panas sebentar saja tidak perlu sampai kering, angkat dan tiriskan."},{"instruksi":"Tumis cabe dan bawang dengan minyak sisa menggoreng daging hingga layu."},{"instruksi":"Masukkan daging goreng ke dalam sambal, aduk rata."},{"instruksi":"Penyajian: Rebus pasta, angkat dan tiriskan kedalam wadah. Sajikan dendeng balado diatas pasta sebagai toping."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Spaghetti Dendeng Balado');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sambel Goreng Hati Kentang', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Rebus hati ayam 1x mendidih untuk menghilangkan bau amis, tiriskan dan potong sesuai selera kemudian goreng sebentar."},{"instruksi":"Goreng kentang setengah matang."},{"instruksi":"Panaskan minyak di atas wajan besar, lalu tumis bumbu halus hingga harum. Tambahkan daun jeruk."},{"instruksi":"Tuang santan, masak hingga mendidih."},{"instruksi":"Masukkan hati ayam dan kentang masak hingga air santan habis dan bumbu meresap. Matikan kompor."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sambel Goreng Hati Kentang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ungkep Ayam/Daging/Hati Ayam', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Cuci bersih bahan daging dan potong sesuai selera."},{"instruksi":"Marinasi ayam/daging/hati ayam dengan bumbu tersebut selama 2 jam, taruh di dalam kulkas."},{"instruksi":"Kemudian rebus dengan 1/2 gelas air dengan api kecil. Atau jika ayam/daging/hati sudah berair maka tidak perlu ditambah air."},{"instruksi":"Rebus hingga bumbu meresap dan air habis. Dinginkan."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ungkep Ayam/Daging/Hati Ayam');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gudeg Jogja Komplet', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Haluskan bumbu (disarankan ditumbuk untuk rasa yang lebih mantap)."},{"instruksi":"Tumis bawang merah dan bawang putih sampai matang dan harum."},{"instruksi":"Tumis bumbu halus hingga harum."},{"instruksi":"Letakkan bumbu rempah di dasar panci/kuali."},{"instruksi":"Masukkan cabai halus, lalu tumis lagi hingga benar-benar matang (berubah warna)."},{"instruksi":"Masukkan bumbu rempah."},{"instruksi":"Berikan sedikit garam dan gula merah."},{"instruksi":"Tuangi 800 ml santan."},{"instruksi":"Tuangi santan."},{"instruksi":"Lanjutkan masukkan bumbu halus."},{"instruksi":"Tunggu sampai mendidih kemudian masukkan kacang tholo, tempe."},{"instruksi":"Beri garam/kaldu bubuk dan gula merah secukupnya."},{"instruksi":"Untuk mendapatkan warna gudeg yang merah gelap bisa ditambahkan 10 sachet black tea."},{"instruksi":"Beri garam, kaldu bubuk serta gula merah."},{"instruksi":"Masak sampai ayam empuk dan kuah mengental dengan api kecil."},{"instruksi":"Masukkan nangka yang sudah direbus."},{"instruksi":"Masak sampai bumbu meresap."},{"instruksi":"Tuang santan dan tambahkan air sampai nangka terendam."},{"instruksi":"Siap sajikan bersama gudeg."},{"instruksi":"Masak dengan api kecil atau dengan slow cooker minimal 4-5 jam."},{"instruksi":"Jangan lupa dibolak balik biar tidak gosong."},{"instruksi":"Dapat dikoreksi rasanya, sesuai dengan selera."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gudeg Jogja Komplet');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ikan Goreng Dabu-Dabu for Kids', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Campurkan lada, garam dan garlic powder ke dalam tepung terigu. Aduk merata."},{"instruksi":"Gulirkan ikan ke dalam racikan tepung sampai terlapisi merata."},{"instruksi":"Panaskan minyak, lalu goreng ikan di atas api sedang sampai matang. Tiriskan dan sisihkan ikan goreng."},{"instruksi":"Potong tomat cherry menjadi 4 bagian."},{"instruksi":"Iris tipis bawang merah."},{"instruksi":"Siapkan mangkuk kecil tahan panas."},{"instruksi":"Masukkan potongan tomat dan bawang merah, perasan jeruk nipis, irisan daun jeruk, gula, lada dan garam ke dalam mangkuk tahan panas. Sisihkan."},{"instruksi":"Panaskan minyak sampai panas dan hampir berasap, kemudian segera tuangkan ke dalam mangkuk sambal dabu-dabu. Aduk dan koreksi rasa."},{"instruksi":"Sajikan ikan goreng di atas piring, tambahkan sambal dabu-dabu diatasnya."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ikan Goreng Dabu-Dabu for Kids');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ayam Bakar Solo', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Ayam dibersihkan, dicuci, dan dibelah dua."},{"instruksi":"Bawang merah, bawang putih, cabai merah, kemiri, jinten, dan ketumbar dihaluskan/diblender."},{"instruksi":"Panaskan wajan penggorengan dengan menggunakan empat sendok makan minyak goreng. Tumislah bumbu yang sudah dihaluskan sampai harum, dan masukkan serainya."},{"instruksi":"Masukkan ayamnya diaduk sebentar, kemudian masukkan santannya, yang berikutnya masukkan daun salam, lengkuas, gula jawa dan garam."},{"instruksi":"Masak sampai santan mendidih, dan tutuplah wajan penggorengan/diungkep sampai santan mulai mengental dan berkurang, serta bumbu-bumbunya meresap. Angkat. Sisa-sisa bumbu jangan dibuang."},{"instruksi":"Ayam dipanggang di dalam oven atau dibakar diatas grill/barbeque sambil dibolak-balik, sesekali diolesi dengan sisa-sisa bumbu tadi, sampai matangnya merata dan kecoklatan."},{"instruksi":"Angkat dan sajikan dengan sambal terasi serta lalapan."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ayam Bakar Solo');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Rolade', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Aduk semua bahan menjadi satu hingga rata, kecuali wortel/sosis."},{"instruksi":"Ambil satu lembar plastik wrap, letakkan diatasnya 1/3 bagian adonan, ratakan pipih."},{"instruksi":"Letakkan 1 batang wortel atau sosis dibagian tengah. Gulung menjadi seperti lontong. Lakukan pada semua adonan."},{"instruksi":"Tusuk-tusuk dibeberapa bagian gulungan dengan tusuk gigi."},{"instruksi":"Kukus selama 30 menit. Angkat, dinginkan."},{"instruksi":"Goreng. Potong-potong. Sajikan rolade dengan pelengkap saos, wortel, buncis rebus dan French fries."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Rolade');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Iga Bakar', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Potong-potong iga lamb dengan menurut alur tulangnya."},{"instruksi":"Bumbu dihaluskan, iga lamb dimasukkan dan dicampurkan secara merata kedalam bumbu, dan diinapkan semalam atau kalau terlalu lama setengah hari juga bisa."},{"instruksi":"Kemudian dipanggang atau dibakar, sesuai selera."}]',
       (SELECT id FROM users WHERE email = 'user7@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Iga Bakar');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Kambing Masak Tomat', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Tumis bawang bombay hingga harum."},{"instruksi":"Masukkan oregano, daging kambing dan tomat diikuti susu cair masak hingga susu meresap."},{"instruksi":"Masukkan kocokan telur dan aduk cepat hingga telur tidak pecah, dan diamkan 1 menit hingga telur masak."},{"instruksi":"Angkat, sajikan dengan nasi hangat."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Kambing Masak Tomat');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Perkedel Ikan Tuna ala Dina', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Panaskan minyak di wajan, campur bahan 1 dan aduk rata."},{"instruksi":"Cetak dengan tangan bulat-bulat sebesar bola pingpong dan dipipihkan."},{"instruksi":"Setelah minyak panas, ambil satu adonan, gulingkan ke putih telur (bahan 2)."},{"instruksi":"Goreng sampai kuning kecoklatan."},{"instruksi":"Sajikan untuk 12-15 buah."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Perkedel Ikan Tuna ala Dina');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Bothok Tempe', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Bumbu halus di tumis sebentar agak harum, dimasukkan serai, daun salam, daun jeruk lalu santannya."},{"instruksi":"Masukkan tempe kukus, spring green, petai potong kasar, teri, tomat, cabai hijau potongan, daun bawang dan diaduk rata."},{"instruksi":"Masukkan telur kocok kemudian diaduk rata kembali."},{"instruksi":"Seluruh bahan dibungkus dengan daun pisang atau alumunium foil sesuai selera. Dapat dijadikan beberapa bungkus, lalu dikukus selama kurang lebih 30 sampai 45 menit."}]',
       (SELECT id FROM users WHERE email = 'user7@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Bothok Tempe');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Brambang Asem', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Rebus curly kale/spring cabbage. Sisihkan."},{"instruksi":"Saus: goreng cabe + bawang merah, lalu haluskan cabe, terasi, dan bawang merah."},{"instruksi":"Panaskan sedikit minyak, tumis bumbu halus sampai harum. Tuangi air."},{"instruksi":"Masukkan asam, gula jawa dan garam. Aduk rata sampai mendidih dan agak kental. Matikan api."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Brambang Asem');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Cah Mustard Green (Kai Choi)', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Tumis bawang bombay, bawang putih, hingga harum."},{"instruksi":"Masukkan udang, tahu dan tambah air sedikit."},{"instruksi":"Tambahkan kecap, oyster sauce, garam dan merica."},{"instruksi":"Masukkan daun Mustard Green, aduk hingga rata."},{"instruksi":"Masak daun Kai Choi setengah matang. Angkat. Sajikan."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Cah Mustard Green (Kai Choi)');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sup Ayam Bungkus Telor', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Ayam bungkus telor: Campur daging ayam cincang, telor dan bumbu halus, aduk rata."},{"instruksi":"Ambil selembar dadar, isi dengan 1 sendok makan adonan ayam, lipat seperti amplop/kantong. Lakukan sampai adonan habis."},{"instruksi":"Kukus selama sekitar 30 menit dan sisihkan."},{"instruksi":"Kuah sup: Tumis bawang bombay sampai layu."},{"instruksi":"Masukkan bawang putih dan lada putih, tumis sampai harum."},{"instruksi":"Tuangi dengan air kaldu ayam, masukkan garam + gula pasir secukupnya."},{"instruksi":"Rebus sampai mendidih."},{"instruksi":"Penyajian: Tata ayam bungkus telor, rebusan wortel + jamur putih + kacang polong + irisan daun bawang dan seledri dalam mangkuk/piring. Tuangi dengan kuah panas, sajikan."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sup Ayam Bungkus Telor');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sup Iga Kambing', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Cuci iga kambing, rebus dalam air bersama jahe dan garam hingga berubah warna."},{"instruksi":"Panaskan minyak, tumis bumbu halus, kayu manis dan cengkeh. Aduk hingga harum dan angkat."},{"instruksi":"Masukkan ke dalam kaldu rebusan iga. Didihkan dan kecilkan apinya. Tutup panci dan masak hingga bumbu meresap dan daging empuk."},{"instruksi":"Masukkan wortel dan brokoli, setelah cukup layu."},{"instruksi":"Masukkan daun bawang dan tomat, dibiarkan cukup layu."},{"instruksi":"Angkat, sajikan hangat bersama taburan dan pelengkap."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sup Iga Kambing');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Soto Banjar (Halal)', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Rebus ayam selama 10 menit, buang rebusan pertama."},{"instruksi":"Angkat ayam tambahkan 2 liter air dan rebus kembali."},{"instruksi":"Tumis bumbu halus sampai wangi."},{"instruksi":"Masukkan bumbu halus ke rebusan ayam."},{"instruksi":"Masukkan bumbu cemplung lanjut rebus sampai ayam lunak."},{"instruksi":"Suwir-suwir ayam jika sudah empuk."},{"instruksi":"Sajikan dengan lontong, telor rebus dan perkedel kentang."}]',
       (SELECT id FROM users WHERE email = 'user7@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Soto Banjar (Halal)');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ikan Bakar Manis', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Bersihkan ikan, lumuri dengan perasan jeruk nipis. Sisihkan."},{"instruksi":"Campur bumbu halus dengan lelehan butter, kecap manis, dan garam ke dalam wadah."},{"instruksi":"Masukkan ikan ke bumbu, campur hingga merata, kemudian marinate/diamkan sekitar 20 menit (lebih lama lebih baik)."},{"instruksi":"Panaskan oven. Panggang ikan di oven dengan suhu 180 C selama 15 menit, kemudian keluarkan ikan. Olesi dengan sisa bumbu dan panggang kembali selama 15 menit/sampai tingkat kematangan yang diinginkan."},{"instruksi":"Sajikan dengan sambal bawang dan lalapan."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ikan Bakar Manis');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Cap Cay', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Rebus dada ayam hingga matang. Suwir-suwir. Sisihkan (air rebusan ayam digunakan untuk kuah kaldu)."},{"instruksi":"Campur tepung plain dan air hingga menjadi adonan kental, beri garam secukupnya. Goreng hingga kecoklatan. Iris kotak-kotak. Sisihkan."},{"instruksi":"Tumis bawang putih hingga wangi. Masukkan irisan bakso ikan, ayam suwir, lada bubuk dan oyster sauce, aduk rata. Tambahkan kuah kaldu sesuai selera. Tunggu hingga mendidih."},{"instruksi":"Masukkan wortel, jamur dan tepung goreng. Tutup selama lima menit."},{"instruksi":"Masukkan pakcoy, daun bawang, dan garam secukupnya. Matikan kompor, koreksi rasa."},{"instruksi":"Sajikan dengan taburan bawang merah dan cabai goreng."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Cap Cay');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ceker Mercon', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Rebus ceker ayam selama 10 menit, kemudian buang air rebusan."},{"instruksi":"Tumis bumbu halus hingga wangi, tambahkan sereh, lengkuas, daun jeruk, dan oyster sauce."},{"instruksi":"Masukkan ceker, kecap manis, dan garam. Aduk rata."},{"instruksi":"Tambahkan air. Masak ceker hingga empuk dan bumbu meresap. Koreksi rasa."},{"instruksi":"Sajikan dengan nasi hangat."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ceker Mercon');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Telur Ceplok Kuah Santan', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Ceplok telur. Sisihkan."},{"instruksi":"Tumis bumbu halus hingga wangi, tambahkan lada."},{"instruksi":"Masukkan telur ceplok dan garam. Aduk rata."},{"instruksi":"Tambahkan santan. Masak hingga mendidih. Koreksi rasa."},{"instruksi":"Sajikan dengan nasi hangat."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Telur Ceplok Kuah Santan');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Telur Dadar Padang', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Telur dadar: Iris tipis bawang merah, bawang putih, cabai, dan daun bawang."},{"instruksi":"Dalam wadah, pecahkan telur, masukkan irisan bumbu, dan semua bahan. Kocok hingga berbuih."},{"instruksi":"Panaskan minyak. Goreng telur hingga kuning kecoklatan."},{"instruksi":"Sambal ijo: Didihkan air. Masukkan cabai, bawang merah, dan bawang putih. Rebus selama 5 menit. Tiriskan."},{"instruksi":"Haluskan cabai dan bawang yang sudah direbus, tambahkan garam dan lada. Koreksi rasa."},{"instruksi":"Sajikan telur dadar dan sambal ijo bersama nasi hangat dan lalapan timun dan kale rebus."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Telur Dadar Padang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Oseng Pare Teri', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Iris pare (jangan terlalu tipis). Beri garam, remas-remas sebentar untuk mengurangi rasa pahit. Cuci."},{"instruksi":"Tumis bumbu iris hingga wangi. Masukkan pare dan air. Masak hingga pare agak layu dan air menyusut."},{"instruksi":"Masukkan teri goreng, gula, dan garam. Aduk rata. Koreksi rasa."},{"instruksi":"Sajikan dengan nasi hangat."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Oseng Pare Teri');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Spaghetti Goreng Jawa', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Rebus spaghetti hingga matang, tiriskan."},{"instruksi":"Tumis bawang putih hingga wangi. Masukkan ayam dan oyster sauce. Tumis hingga ayam matang."},{"instruksi":"Masukkan spaghetti, kecap manis, lada, daun bawang, dan garam. Aduk rata. Koreksi rasa."},{"instruksi":"Sajikan selagi hangat, beri taburan bawang merah goreng."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Spaghetti Goreng Jawa');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Mie Ayam Ceker', 'Aneka Lauk dan Sayur', 4,
       '[{"instruksi":"Tumis bumbu halus hingga wangi. Masukkan sereh, lengkuas, daun jeruk. Tumis hingga layu."},{"instruksi":"Masukkan chicken mince dan ceker. Tambahkan oyster sauce, kecap, garam, dan air. Masak hingga ayam dan ceker matang dan air menyusut."},{"instruksi":"Masukkan daun bawang."},{"instruksi":"Koreksi rasa."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Mie Ayam Ceker');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Kue Cantik Manis', 'Kudapan/Snack', 4,
       '[{"instruksi":"Adonan A: Tuang santan ke dalam panci. Masukkan garam dan gula, aduk rata."},{"instruksi":"Di wadah lain, larutkan tepung terigu dengan santan yang sudah dicampur garam dan gula sekitar 10 sdm."},{"instruksi":"Saat tepung terigu sudah larut, tuang dan masukkan bersama ke dalam larutan santan dalam panci kemudian didihkan dengan api sedang cenderung kecil, sambil terus diaduk hingga adonan mengental."},{"instruksi":"Jika sudah mengental, matikan api kompor dan biarkan adonan dingin terlebih dahulu."},{"instruksi":"Adonan B: Tuang semua bahan B ke dalam panci, aduk rata dan didihkan dengan api kecil."},{"instruksi":"Aduk adonan hingga mengental dan tidak ada gerindil-gerindil tepung. Matikan api."},{"instruksi":"Adonan C: Siapkan wadah, masukkan telur dan gula lalu kocok hingga gula pasir larut."},{"instruksi":"Jika gula pasir sudah larut, masukkan santan kemudian aduk hingga rata."},{"instruksi":"Masukkan terigu (sebaiknya disaring) sedikit demi sedikit sambil terus diaduk agar terigu tidak menggerindil."},{"instruksi":"Tuang adonan B ke dalam adonan C lalu aduk sehingga kedua adonan tercampur rata."},{"instruksi":"Jika adonan B dan C sudah tercampur rata, saring kembali adonan untuk memastikan tidak ada terigu yang menggumpal."},{"instruksi":"Siapkan cetakan kue (bentuk mencembung), oleskan minyak sayur pada cetakan."},{"instruksi":"Adonan A masukkan ke dalam plastik piping bag."},{"instruksi":"Tuang adonan hijau sampai 3/4 cetakan. Lakukan sampai semua cetakan terisi adonan."},{"instruksi":"Semprotkan adonan A ke dalam masing-masing cetakan kue yang telah diisi adonan hijau."},{"instruksi":"Siapkan kukusan. Jika kukusan sudah panas, masukkan semua cetakan ke dalam kukusan dan kukus selama 20-25 menit."},{"instruksi":"Jika kue sudah matang, tunggu hingga kue agak dingin lalu keluarkan dari cetakan."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Kue Cantik Manis');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Es Teler Nottingham', 'Kudapan/Snack', 4,
       '[{"instruksi":"Bekukan semua buah-buahan ke dalam freezer, kecuali avocado."},{"instruksi":"Keluarkan semua buah-buahan beku."},{"instruksi":"Campurkan semua bahan ke dalam bowl besar."},{"instruksi":"Siram dengan susu terlebih dahulu, serta sedikit syrupnya."},{"instruksi":"Biarkan meleleh sendiri atau diaduk-aduk agar cepat mencair, atau boleh dipukul-pukul dengan sendok agar bisa menyerupai es crushed."},{"instruksi":"Siapkan fruit cocktail, (jika kalengan, air cocktailnya jangan diikutkan)."},{"instruksi":"Potong dadu avocado."},{"instruksi":"Masukkan cocktail fruitnya serta alpukat potongannya, tambahkan syrup atau gula sesuai selera."},{"instruksi":"Sebelum disajikan, dapat ditambahkan satu sendok teh garam, atau sesuai selera."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Es Teler Nottingham');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Setup Buah', 'Kudapan/Snack', 4,
       '[{"instruksi":"Rebus air bersama gula, cengkeh dan kayu manis hingga mendidih."},{"instruksi":"Jika air sudah mendidih, matikan api, masukkan nanas. Tutup panci selama 10 menit."},{"instruksi":"Setelah agak dingin, pindahkan ke wadah. Kemudian tambahkan cocktail dan chia seed."},{"instruksi":"Siap disajikan."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Setup Buah');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Pisang Selimut', 'Kudapan/Snack', 4,
       '[{"instruksi":"Panggang pisang hingga kecoklatan."},{"instruksi":"Pipihkan roti tawar menggunakan rolling pan atau tekan-tekan menggunakan sendok makan."},{"instruksi":"Olesi roti tawar dengan Nutella, beri pisang, keju, kemudian gulung."},{"instruksi":"Panggang roti menggunakan butter hingga kecoklatan."},{"instruksi":"Taburi topping."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Pisang Selimut');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Tahu Gejrot Khas Cirebon', 'Kudapan/Snack', 4,
       '[{"instruksi":"Tuang dan didihkan air bersama gula merah, asam, kecap dan sejumput garam."},{"instruksi":"Masak sampai mendidih dan semua bahan tercampur merata. Tunggu sampai air rebusan sedikit berkurang (reduced) dan kuah berwarna lebih gelap."},{"instruksi":"Diamkan kuah sampai dingin atau suhu ruangan."},{"instruksi":"Untuk toppingnya, gerus kasar bawang merah dan cabai sesuai selera, lalu sisihkan."},{"instruksi":"Siapkan mangkuk dan tahu yang sudah dipotong-potong sesuai selera."},{"instruksi":"Tambahkan gerusan cabai dan bawang diatas tahu."},{"instruksi":"Siram potongan tahu dengan kuah yang sudah dingin."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Tahu Gejrot Khas Cirebon');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Basque Burnt Cheesecake', 'Kudapan/Snack', 4,
       '[{"instruksi":"Campurkan soft cheese dan gula hingga lembut dengan mixer berkecepatan tinggi."},{"instruksi":"Tambahkan telur satu per satu, aduk kembali dengan mixer."},{"instruksi":"Tambahkan heavy cream, aduk rata dengan mixer."},{"instruksi":"Terakhir masukkan tepung terigu, campur hingga merata."},{"instruksi":"Alasi loyang dengan baking paper melebihi loyangnya, karena adonan akan mengembang tinggi."},{"instruksi":"Masukkan ke oven dengan suhu 200 derajat C selama 1 jam. Pada menit ke-50, jika sudah kecoklatan tunggu sekitar 5 menit lalu matikan oven, angkat."},{"instruksi":"Jika bagian tengah belum settle, tidak mengapa karena nanti saat dingin akan bagus bentuknya."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Basque Burnt Cheesecake');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Keik Pisang Cokelat', 'Kudapan/Snack', 4,
       '[{"instruksi":"Panaskan oven api atas 180 dan api bawah 190 derajat Celcius atau 160 derajat Celcius untuk tipe standing oven."},{"instruksi":"Kocok telur gula sampai kental putih mengembang, turunkan kecepatan, masukkan pisang yang sudah dihaluskan, dan mixer lagi sebentar sampai rata."},{"instruksi":"Masukkan campuran terigu, kayu manis, soda kue, dan maizena, mixer dengan kecepatan rendah sampai tercampur rata."},{"instruksi":"Masukkan minyak sayur/lelehan butter, aduk balik dengan spatula."},{"instruksi":"Setelah benar-benar rata, tuang ke dalam loyang yang sudah dioles mentega dan ditaburi tepung."},{"instruksi":"Oven selama kurang lebih 45 menit (sampai matang), sesuaikan dengan oven masing-masing. Oven dipanaskan dulu 10-15 menit sebelum loyang masuk."}]',
       (SELECT id FROM users WHERE email = 'user7@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Keik Pisang Cokelat');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Kartika Sari Notts', 'Kudapan/Snack', 4,
       '[{"instruksi":"Peel and fry the banana with butter until golden brown (kupas dan goreng pisang dengan butter sampai kecoklatan)."},{"instruksi":"Cut the banana into 3 cm long."},{"instruksi":"Cut the cheese into small bar (3 cm long)."},{"instruksi":"Cut the puff pastry sheet into 12 rectangles."},{"instruksi":"Roll over the pastry sheet forwards and backwards until the small rectangle is about 12 cm x 10 cm."},{"instruksi":"Put the cheese, banana and one tsp of Nutella in the middle of small puff pastry sheet and wrap it properly."},{"instruksi":"Brush with beaten egg yolk."},{"instruksi":"Sprinkle with shredded cheese."},{"instruksi":"Bake at 200 degrees Celsius for 20-25 minutes (or until golden brown)."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Kartika Sari Notts');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Boh Rom-rom Ubi Manis', 'Kudapan/Snack', 4,
       '[{"instruksi":"Cuci ubi manis sampai bersih kemudian rebus atau kukus sampai matang."},{"instruksi":"Angkat ubi manis dan buang kulitnya kemudian haluskan di dalam mangkuk."},{"instruksi":"Masukkan tepung ketan dan aduk merata hingga terbentuk menjadi adonan."},{"instruksi":"Bentuk adonan menjadi bola-bola kecil dan isi di dalamnya dengan gula merah."},{"instruksi":"Rebus adonan. Angkat ketika mengambang (matang)."},{"instruksi":"Gulingkan ke kelapa parut."},{"instruksi":"Sajikan."}]',
       (SELECT id FROM users WHERE email = 'user4@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Boh Rom-rom Ubi Manis');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Dadar Gulung Ayu', 'Kudapan/Snack', 4,
       '[{"instruksi":"Untuk unti: Larutkan gula aren/merah dengan air matang atau santan di dalam panci diatas kompor dengan api sedang. Setelah larut, saring agar larutannya bersih."},{"instruksi":"Masukkan ke dalam panci yang berisi larutan gula di atas, gula pasir, garam dan daun pandan yang sudah disimpul. Masak hingga mendidih, kemudian masukkan kelapa parut. Dimasak dengan api sedang, sampai larutan gula tercampur dengan parutan kelapa, dan airnya menyusut."},{"instruksi":"Untuk kulit: Masukkan telur dalam wadah, kocok lepas, tambahkan santannya dan air matang. Aduk rata, masukkan gula pasir dan garamnya, diaduk kembali sampai rata berupa adonan cair."},{"instruksi":"Bagi menjadi 4 bagian, setiap bagian diberi warna masing-masing dengan pewarna makanan. Siapkan wajan non stick atau teflon, olesi dengan kuas sedikit minyak, dan buat dadar satu persatu untuk warna masing-masing."},{"instruksi":"Isikan unti kelapa disetiap kulit dadar, satu sendok makan atau satu sendok teh, sesuai dengan besarnya kulit dadar. Dilipat seperti bentuk amplop. Kemudian dihias dengan bentuk bunga atau bintang."}]',
       (SELECT id FROM users WHERE email = 'user6@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Dadar Gulung Ayu');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Wingko', 'Kudapan/Snack', 4,
       '[{"instruksi":"Pilih desicated coconut yang serutannya kasar, jangan pilih yang serutannya halus dan hancur, untuk mendapatkan hasil yang prima."},{"instruksi":"Desicated coconut dicampur rata dengan santan, dibiarkan terendam beberapa waktu."},{"instruksi":"Mentega dicairkan/microwave hingga cair, dimasukkan gula dan telur, kemudian dimixer hingga tercampur rata."},{"instruksi":"Masukkan tepung ketan bergantian dengan desicated coconut + santan pada adonan sebelumnya. Sedikit ditambahkan vanilli dan garam, mixer atau diaduk merata."},{"instruksi":"Siapkan loyang yang sudah dilapisi kertas roti terlebih dahulu."},{"instruksi":"Masukkan adonan kedalam loyang, dioven selama 45 menit dengan gas mark-4 atau 180 C."},{"instruksi":"Jika sudah setengah matang, olesi bagian atas wingko dengan kuning telur."},{"instruksi":"Panggang kembali hingga matang."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Wingko');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sosis Solo', 'Kudapan/Snack', 4,
       '[{"instruksi":"Aduk rata bumbu halus, daging cincang, telur, dan santan kental, sisihkan."},{"instruksi":"Kocok telur hingga lepas, tambahkan santan, garam, aduk rata. Buat dadar tipis-tipis garis tengah 18 cm."},{"instruksi":"Ambil selembar dadar, isi dengan adonan daging di tengah, lipat bentuk amplop, gulung. Lakukan hingga adonan habis, kukus hingga matang."},{"instruksi":"Panaskan sedikit minyak, goreng hingga kuning."}]',
       (SELECT id FROM users WHERE email = 'user7@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sosis Solo');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Kroket Kentang', 'Kudapan/Snack', 4,
       '[{"instruksi":"Mix the potatoes, melted butter, egg yolks, milk powder and flour, in the large bowl knead it together until it forms a nice dough, put aside."},{"instruksi":"Heat 2 tbsp oil, fry the onion and garlic until golden brown, add the minced chicken and cook for 5 minutes then add the grated carrot and chopped spring onion, cook it further until all are soft, add seasoning."},{"instruksi":"Take 2 tbsp of the dough shape it into a round, then put 1 tbsp of filling, fold and shape it into an oval sausage shape."},{"instruksi":"Dip it into slightly whisked egg white, then into the breadcrumbs and fry until golden brown."}]',
       (SELECT id FROM users WHERE email = 'user7@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Kroket Kentang');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Kue Lumpur', 'Kudapan/Snack', 4,
       '[{"instruksi":"Mixer kuning telur dengan gula sampai tercampur rata dan mengembang. Tambahkan garam, santan, kentang lembut, dan tepung terigu, diaduk menjadi adonan."},{"instruksi":"Panaskan loyang kue lumpur di atas kompor, dan loyang diberi olesan mentega/minyak. Masukkan adonan ke dalam loyang setinggi 3/4 tiap lubangnya, dan tutup."},{"instruksi":"Apabila sudah setengah matang masukkan nangka/raisinnya di atas tiap adonan. Dimasak sekitar 5 menit."},{"instruksi":"Apabila sudah kelihatan matang, angkat satu persatu, dan masukkan adonan berikutnya sampai habis."},{"instruksi":"Sajikan, dimakan setelah menunggu dingin sejenak."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Kue Lumpur');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Pulut Sri Muka', 'Kudapan/Snack', 4,
       '[{"instruksi":"Pembuatan bahan dasar/base: Didihkan air di dalam steamer/kukusan."},{"instruksi":"Campur ketan putih, santan, garam, dan selembar daun pandan dalam panci. Masak dan aduk sampai 3/4 matang (sampai santan meresap dalam ketan dan lembut)."},{"instruksi":"Panaskan loyang yang telah diolesi minyak di dalam kukusan selama 5 menit."},{"instruksi":"Angkat loyang dan masukkan 3/4 ketan yang sudah setengah matang tadi, dan kukus selama 15 menit."},{"instruksi":"Pembuatan bahan atas/topping: Campurkan gula, santan, garam, daun pandan ke dalam panci dan masak sampai tercampur rata."},{"instruksi":"Jika sudah mendidih, sisihkan agar agak dingin."},{"instruksi":"Kocok telur dan tambahkan tepung terigu, aduk sampai tercampur rata."},{"instruksi":"Campur adonan telur dan tepung ini ke dalam adonan gula tadi, dan tambahkan pandan extract, kemudian dicampur rata (bisa menggunakan mixer)."},{"instruksi":"Saring adonan tersebut agar tidak ada gumpalan."},{"instruksi":"Siramkan adonan topping pada adonan ketan yang di dalam kukusan."},{"instruksi":"Kukus kembali selama 20 menit."},{"instruksi":"Setelah matang, ambil dari kukusan dan diamkan sementara agar tidak terlalu panas."},{"instruksi":"Setelah dingin, potong-potong sesuai selera menggunakan pisau yang sudah diberi minyak sedikit."}]',
       (SELECT id FROM users WHERE email = 'user5@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Pulut Sri Muka');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Sari Rasa Ketan Coklat', 'Kudapan/Snack', 4,
       '[{"instruksi":"Letakkan beras ketan di dalam kukusan, tambahkan santan dan garam. Kukus selama 30 menit."},{"instruksi":"Setelah matang, angkat dan pindahkan ke dalam loyang. Ratakan."},{"instruksi":"Kocok semua bahan A, tuangkan ke atas nasi ketan."},{"instruksi":"Kukus hingga masak, kurang lebih 30 menit."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Sari Rasa Ketan Coklat');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Gethuk', 'Kudapan/Snack', 4,
       '[{"instruksi":"Kukus singkong selama 30 menit atau sampai empuk."},{"instruksi":"Setelah matang, pindahkan singkong yang masih panas ke dalam baskom, tambahkan vanili."},{"instruksi":"Tumbuk singkong secara bertahap, sambil masukkan palm sugar, kelapa parut, dan gula pasir."},{"instruksi":"Cetak tumbukan singkong di loyang, padatkan."},{"instruksi":"Iris gethuk sesuai selera. Sajikan untuk teman minum teh atau kopi."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Gethuk');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Ketan Unti', 'Kudapan/Snack', 4,
       '[{"instruksi":"Unti kelapa: Rebus air, gula merah, daun pandan, garam, dan vanili. (Saring bila perlu untuk membersihkan ampas gula merah)."},{"instruksi":"Masukkan kelapa parut, masak sambil diaduk sampai agak mengering. Dinginkan dan sisihkan."},{"instruksi":"Ketan hijau: Campur santan, pasta pandan, beras ketan, daun pandan, dan garam. Masak (sambil sesekali diaduk) dengan api sedang cenderung kecil sampai mengering."},{"instruksi":"Angkat dan kukus sekitar 30 menit."},{"instruksi":"Siapkan cetakan (bebas, bisa pakai cetakan talam). Masukkan satu sendok teh unti kelapa, tekan-tekan. Tambahkan ketan di atasnya hingga penuh, keluarkan dari cetakan, sajikan."}]',
       (SELECT id FROM users WHERE email = 'user1@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Ketan Unti');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Klepon', 'Kudapan/Snack', 4,
       '[{"instruksi":"Sisir halus gula merah untuk isian klepon."},{"instruksi":"Siapkan wadah, campur tepung ketan, garam, dan pasta pandan secukupnya. Aduk rata."},{"instruksi":"Tambahkan air sedikit demi sedikit, uleni adonan tepung sampai kalis kemudian bentuk bulat-bulat."},{"instruksi":"Pipihkan adonan yang telah dibentuk bulat, beri isian gula merah kemudian bulatkan lagi."},{"instruksi":"Rebus air hingga mendidih kemudian masukkan bulatan klepon satu persatu, rebus klepon sampai matang (mengapung)."},{"instruksi":"Angkat klepon yang telah matang, tiriskan kemudian gulingkan pada taburan kelapa."},{"instruksi":"Sajikan klepon untuk camilan bersama teh hangat atau kopi panas."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Klepon');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Martabak Daging', 'Kudapan/Snack', 4,
       '[{"instruksi":"Tumis bawang bombay hingga layu. Masukkan daging, aduk rata."},{"instruksi":"Tambahkan garlic powder, ketumbar, jintan, dan garam. Aduk rata kembali hingga daging matang. Sisihkan."},{"instruksi":"Kocok telur di wadah baskom. Tambahkan daun bawang dan daging. Aduk rata."},{"instruksi":"Ambil satu lembar kulit spring roll. Beri 3 sendok makan adonan telur, lipat seperti amplop."},{"instruksi":"Goreng martabak di minyak panas hingga kuning kecoklatan. Tiriskan."},{"instruksi":"Sajikan dengan acar timun/pickles."}]',
       (SELECT id FROM users WHERE email = 'user3@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Martabak Daging');

INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak, user_id, status)
SELECT 'Rujak Serut', 'Kudapan/Snack', 4,
       '[{"instruksi":"Kupas semua buah-buahan dan ketela pohon/sweet potatoes kemudian diparut (kecuali nanas). Nanas dipotong kecil seperti korek api."},{"instruksi":"Rebus 250 gr gula merah/jawa dengan air secukupnya sampai mencair."},{"instruksi":"Haluskan cabai dan terasi, kemudian tambahkan air asam."},{"instruksi":"Siapkan wadah, masukkan rebusan air gula, bumbu halus dan buah buahan. Aduk hingga tercampur."},{"instruksi":"Masukkan ke dalam lemari es sekitar satu jam dan sajikan setelah dingin."}]',
       (SELECT id FROM users WHERE email = 'user2@user.com'), 'approved'
WHERE NOT EXISTS (SELECT 1 FROM recipes WHERE judul_resep = 'Rujak Serut');

-- ===== BAHAN RESEP =====
INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kg'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Jeruk Nipis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 300, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 7, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Terasi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Taliwang' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Tepung Tapioka';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Baking Powder';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Pala';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Bubuk Merica Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Kaldu Jamur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Kaldu Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Es Batu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kg'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Tulang Sapi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'L Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 15, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Cabe Rawit Bird Eye Chilli';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Mi Kuning';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Bihun';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Tahu Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Bawang Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bakso Daging Sapi dengan Kuah Kaldu Tulang' AND i.nama_bahan = 'Pangsit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Udang Tanpa Kepala';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Tahu Putih Di';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Kentang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'biji'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Petai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Lengkuas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Jahe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Kunyit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Kunyit Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Daun Salam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Penyedap';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gulai Udang Tahu Petai (Gudang Tape) ala Iza' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ekor'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Ayam Dipotong Kecil-';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'potong'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Jeruk Nipis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'L Santan Encer';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 300, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Susu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Tomat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Bawang Bombay';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Jintan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Kunyit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Jahe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Secukupnya Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Lontong';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Ketupat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Bawang Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Sambal Cabai Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Tempe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Glabed' AND i.nama_bahan = 'Tahu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kaleng'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Ikan Tuna';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 15, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Cabai Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Resep Sambal Tuna' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 30, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Tomat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Cabai Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Paprika Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Jahe Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Mi Kuning';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Udang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Taoge';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Jinten Hitam Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Bumbu Kari';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Seledri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Kecap Asin';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Minyak Wijen';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Cuka';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Kacang Tanah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Bawang Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Kerupuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.25, 'cangkir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Aceh Udang' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 350, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Udang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Cumi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 300, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Kerang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Brokoli';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Cabai Rawit Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Saus Tiram';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Saus Tomat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Saus Sambal';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Kecap Ikan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Seasoning Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 800, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Daun Salam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Seafood Saus Padang Bintang Toedjoeh' AND i.nama_bahan = 'Kaldu Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 300, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Cabai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Jeruk Nipis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Dendeng Balado' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Hati Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Kentang Potong Dadu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Elas Santan Encer';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Cabai Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sambel Goreng Hati Kentang' AND i.nama_bahan = 'Penyedap';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ekor'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ekor'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Gr';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Kunyit Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Bawang Putih Tumbuk Kasar Bersama Kulitnya';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ungkep Ayam/Daging/Hati Ayam' AND i.nama_bahan = 'Penyedap';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kg'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Nangka Muda Boleh Kaleng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Kithul Jaggery';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Ceker Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'sachet'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Black Tea';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'liter'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Daun Salam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Lengkuas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Krecek';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Kacang Tolo';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Kacang Tholo';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Tempe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ekor'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ekor'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Ayam Kampung';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Tahu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gudeg Jogja Komplet' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Ikan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Tepung Terigu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Garlic Powder';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Tomat Cherry Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 120, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Air Perasan Jeruk Nipis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Goreng Dabu-Dabu for Kids' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'liter'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Lemon Grass Diambil Bawahnya';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Lengkuas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Daun Salam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Siung Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Cabai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Jintan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Penuh Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ayam Bakar Solo' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Lbr Roti Tawar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Btr Telur Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Kaldu Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Pala';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Wortel';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rolade' AND i.nama_bahan = 'Sosis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Iga Kambing Muda - Lamb';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Oyster Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Vinegar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Iga Bakar' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Ons';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Telur Dikocok';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Ditambahkan Sedikit Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Bawang Bombay';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Tomat Buah Digiling';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Oregano';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kambing Masak Tomat' AND i.nama_bahan = 'Cc Susu Cair';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Kentang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kaleng'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Ikan Tuna';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Mentega';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Margarin';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Pala';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Merica Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Bawang Merah Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Tepung Terigu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Kuning Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Putih Telur Dikocok Sebentar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Jangan Merebus Kentang Kelamaan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Jangan Mengaduk Adonan Terlalu Lama';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Menggoreng Dengan Minyak';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Jangan Terlalu Banyak Memasukkan Adonan Ke Penggorengan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Jika Adonan Ditambahkan Kuning Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Perkedel Ikan Tuna ala Dina' AND i.nama_bahan = 'Ikan Tuna Dapat Diganti Dengan Ikan Jenis Lain Tetapi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Tempe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Dadu Dikukus Dulu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Spring Green Secukupnya Dipotong-Potong Kasar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'iris'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Tomat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Ikan Teri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Satu Butir Telur Dikocok Dahulu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Petai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Cabai Hijau Potong Kasar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Daun Pisang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Kencur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Jintan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Jahe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Terasi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Bothok Tempe' AND i.nama_bahan = 'Kaldu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Pak Curly Kale';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Gula Jawa Disisir';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Mata Asam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Terasi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Cabai Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Brambang Asem' AND i.nama_bahan = 'Elas Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'bungkus'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Daun Kai Choi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Udang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Tahu Potong';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Bawang Bombay';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Kecap Asin';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Oyster Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cah Mustard Green (Kai Choi)' AND i.nama_bahan = 'Air Panas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'liter'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Air Kaldu Ayam Kampung';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Bawang Bombay';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 15, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Dadar Telor';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Telor';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Wortel';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Peres Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Wortel Kukus';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Kacang Polong Kukus';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Jamur Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Ayam Bungkus Telor' AND i.nama_bahan = 'Seledri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 750, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Iga Kambing';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Jahe Potong';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Batang Kulit Kayu Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Cengkeh';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Wortel Dipotong-Potong Bundar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Brokoli';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Tomat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Daun Bawang Ambil';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 8, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Merica Butiran';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Bawang Merah Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Seledri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Sambal Rawit Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sup Iga Kambing' AND i.nama_bahan = 'Emping Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ekor'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'liter'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Jahe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Pala';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.25, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Kayu Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Cengkeh';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Kapulaga';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Bunga Lawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Tangkai Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Tangkai Seledri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Bawang Bombay';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Kaldu Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Soto Banjar (Halal)' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kg'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Ikan Tilapia';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Jeruk Nipis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Mentega';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Jahe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ikan Bakar Manis' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Bakso Ikan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Dada Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Wortel';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Pakcoy';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Sawi Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Sawi Hijau';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Kol';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Baby Corn';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Jamur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Tepung Plain';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Lada Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Oyster Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Cap Cay' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Ceker Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Oyster Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Lengkuas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 400, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Cabai Merah Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ceker Mercon' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.75, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Merica';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Cabai Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Ceplok Kuah Santan' AND i.nama_bahan = 'Tomat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Cabai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Kelapa Parut';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Tepung Beras';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Kunyit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Lada Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 15, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Cabai Hijau';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Telur Dadar Padang' AND i.nama_bahan = 'Red Onion';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Pare';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Enggam Teri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Cabai Hijau';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Red Onion';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Oseng Pare Teri' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Enggam Spaghetti';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Dada Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Oyster Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Spaghetti Goreng Jawa' AND i.nama_bahan = 'Lada Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'kg'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Chicken Mince';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Ceker Ayam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Mie Shanghai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Oyster Sauce';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Teh Lada Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Daun Jeruk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Serai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Lengkuas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Red Onion';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Kunyit Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'ruas'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Jahe';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Pakcoy';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Bakso';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Pangsit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Mie Ayam Ceker' AND i.nama_bahan = 'Bawang Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Tepung Terigu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2.5, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Tepung Jagung';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Pasta Pandan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'biji'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Cetakan Kue';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Cantik Manis' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Kolang-Kaling';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Alpukat';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Nangka Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Kelapa';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Kelapa Berbentuk Parutan Kasar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Nata De Coco';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Susu Semi Skim';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Sirup Mawar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Es Batu - Crushed Es Batu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Siapkan Semua Buah-Buahan Segar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Semua Potongan Buah Serta Kolang-Kaling';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Dimasukkan Susu Kental Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Tambahkan Sedikit Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Es Teler Nottingham' AND i.nama_bahan = 'Baru Dimasukkan Es Batu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Nanas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'kaleng'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Cocktail In Syrup';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 10, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Cengkeh';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'batang'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Kayu Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'liter'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Setup Buah' AND i.nama_bahan = 'Chia Seed';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Roti Tawar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Pisang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Nutella';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Keju';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Mentega';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = ': Wijen';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Kayu Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pisang Selimut' AND i.nama_bahan = 'Madu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'bungkus'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Deep Fried Tofu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Cabai Rawit';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 350, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 125, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Asam Jawa';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 7, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Kecap Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Tahu Gejrot Khas Cirebon' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 900, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Basque Burnt Cheesecake' AND i.nama_bahan = 'Soft Cheese';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 350, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Basque Burnt Cheesecake' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 7, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Basque Burnt Cheesecake' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Basque Burnt Cheesecake' AND i.nama_bahan = 'Double Cream';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Basque Burnt Cheesecake' AND i.nama_bahan = 'Tepung Terigu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Gula Pasir Butiran';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 300, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Pisang Tanduk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 225, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Tepung Terigu';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 25, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Tepung Maizena';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Kayu Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Soda Kue';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 160, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Keik Pisang Cokelat' AND i.nama_bahan = 'Minyak Sayur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kartika Sari Notts' AND i.nama_bahan = 'Sheet Puff Pastry';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kartika Sari Notts' AND i.nama_bahan = 'Ripe Banana';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kartika Sari Notts' AND i.nama_bahan = 'Spoons Of Butter';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 400, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kartika Sari Notts' AND i.nama_bahan = 'Mature Cheese';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 12, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kartika Sari Notts' AND i.nama_bahan = 'Of Nutella';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kartika Sari Notts' AND i.nama_bahan = 'Egg Yolk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 339, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Boh Rom-rom Ubi Manis' AND i.nama_bahan = 'Ubi Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 125, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Boh Rom-rom Ubi Manis' AND i.nama_bahan = 'Tepung Ketan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Boh Rom-rom Ubi Manis' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Boh Rom-rom Ubi Manis' AND i.nama_bahan = 'Kelapa Parut Kering';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Boh Rom-rom Ubi Manis' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Kelapa Parut';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Gula Aren';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Daun Pandan Satu Lembar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 65, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 125, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Tepung Protein';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Dadar Gulung Ayu' AND i.nama_bahan = 'Pewarna Makanan Hijau';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 400, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Tepung Ketan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Margarin';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Mentega';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Kuning Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Kelapa Parut';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1.5, 'kaleng'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Wingko' AND i.nama_bahan = 'Vanili Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 125, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.25, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Btr Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Bawang Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'siung'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Bawang Putih';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.25, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Jintan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sosis Solo' AND i.nama_bahan = 'Kemiri';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Potatoes';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Butter Melted';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Flour';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Milk Powder';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Carrots';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Minced Chicken';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Medium Onion Finely Chopped';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Cloves Garlic Crushed';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Bunch Spring Onions';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Bread Crumbs';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kroket Kentang' AND i.nama_bahan = 'Oil For Frying';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Kuning Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Putih Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 180, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Caster Sugar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Kentang Direbus Dan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Plain Flour';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Kismis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 150, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Alternatif Lain Nangka Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Garam Sejumput';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Minyak Goreng';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Kue Lumpur' AND i.nama_bahan = 'Mentega';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 350, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Flour';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 280, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Granulated Sugar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 6, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Daun Pandan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 225, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Beras Ketan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Pulut Sri Muka' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Cc Santan Kental';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Tepung Beras';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Cokelat Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 750, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Beras Ketan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Sari Rasa Ketan Coklat' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'kg'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gethuk' AND i.nama_bahan = 'Singkong';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 120, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gethuk' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 50, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gethuk' AND i.nama_bahan = 'Gula';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 100, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gethuk' AND i.nama_bahan = 'Kelapa Parut';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'bungkus'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Gethuk' AND i.nama_bahan = 'Vanili';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 500, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Beras Ketan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Pasta Pandan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 600, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Santan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.75, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'lembar'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Daun Pandan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.25, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Vanili Bubuk';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Ketan Unti' AND i.nama_bahan = 'Kelapa Parut';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Klepon' AND i.nama_bahan = 'Tepung Ketan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 200, 'ml'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Klepon' AND i.nama_bahan = 'Air';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Klepon' AND i.nama_bahan = 'Pasta Pandan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Klepon' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Klepon' AND i.nama_bahan = 'Kelapa Parut';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.75, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Klepon' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Kulit Lumpia';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 4, 'butir'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Telur';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Bawang Bombay';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Daun Bawang';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Garlic Powder';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Ketumbar';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 0.5, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Jintan';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Martabak Daging' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Mangga';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Nanas';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Singkong';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Ubi Manis';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 3, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Apel';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'buah'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Timun';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 250, 'gr'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Gula Merah';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Cabai';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 5, 'secukupnya'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Cabai Merah Keriting';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Terasi';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 1, 'sdt'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Garam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Air Asam';

INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan)
SELECT r.id, i.id, 2, 'sdm'
FROM recipes r, ingredients i
WHERE r.judul_resep = 'Rujak Serut' AND i.nama_bahan = 'Asam Jawa';
