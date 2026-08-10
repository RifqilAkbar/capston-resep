// Foto makanan asli (Wikimedia Commons) untuk tampilan "Resep Masakan Nusantara".
// Statis & deterministik per hidangan — tidak menyentuh database.
// Urutan dicocokkan dari kata kunci ter-spesifik ke umum.

const FOTO_MAKANAN = [
  // Jawa Tengah
  ['gudeg jogja', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nasi_Gudeg.jpg/960px-Nasi_Gudeg.jpg'],
  ['gudeg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gudeg_Ayam.jpg/960px-Gudeg_Ayam.jpg'],
  ['soto kudus', 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Soto_Kudus.jpg'],
  ['garang asem', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Garang_asem_Pj.JPG'],
  ['nasi liwet', 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Nasi_Liwet_A.JPG'],
  ['tengkleng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tengkleng.jpg/960px-Tengkleng.jpg'],
  ['mangut', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/9._Dapur_Mangut_Lele_3.jpg/960px-9._Dapur_Mangut_Lele_3.jpg'],
  ['selat solo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Selat_Solo.jpg/960px-Selat_Solo.jpg'],
  ['tahu gimbal', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Tahu_gimbal_in_Semarang.jpg/960px-Tahu_gimbal_in_Semarang.jpg'],
  ['lumpia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Lumpia_at_Teh_Jawa%2C_Purwokerto_Station%2C_Purwokerto_2015-03-20.jpg/960px-Lumpia_at_Teh_Jawa%2C_Purwokerto_Station%2C_Purwokerto_2015-03-20.jpg'],
  ['tempe bacem', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tempe_bacem_lauk_soto_Pak_Marto.JPG/960px-Tempe_bacem_lauk_soto_Pak_Marto.JPG'],
  ['tempe mendoan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mendoan.jpg/960px-Mendoan.jpg'],
  ['mendoan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mendoan.jpg/960px-Mendoan.jpg'],
  ['bothok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Botok%2C_wrapped_in_banana_leaf.jpg/960px-Botok%2C_wrapped_in_banana_leaf.jpg'],
  ['botok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Botok%2C_wrapped_in_banana_leaf.jpg/960px-Botok%2C_wrapped_in_banana_leaf.jpg'],
  ['brambang asem', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Brambang_asem.jpg/960px-Brambang_asem.jpg'],
  ['wingko', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Wingko_Babat_Semarang.JPG/960px-Wingko_Babat_Semarang.JPG'],
  ['sosis solo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Sosis_Timlo_Solo.JPG/960px-Sosis_Timlo_Solo.JPG'],
  ['kroket', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Croquetas_Caseras_%287068664101%29.jpg/960px-Croquetas_Caseras_%287068664101%29.jpg'],
  ['kue lumpur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kue_Lumpur.jpg/960px-Kue_Lumpur.jpg'],
  ['dadar gulung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kue_dadar_gulung.JPG/960px-Kue_dadar_gulung.JPG'],
  ['klepon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Klepon_Khas_Tulungagung.jpg/960px-Klepon_Khas_Tulungagung.jpg'],
  ['gethuk', 'https://upload.wikimedia.org/wikipedia/commons/7/76/Getuk_1.jpg'],
  ['getuk', 'https://upload.wikimedia.org/wikipedia/commons/7/76/Getuk_1.jpg'],

  // Yogyakarta
  ['ceker mercon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ceker_Ayam_Pedas.jpg/960px-Ceker_Ayam_Pedas.jpg'],
  ['oseng mercon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Oseng_mercon.jpg/960px-Oseng_mercon.jpg'],
  ['mercon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Oseng_mercon.jpg/960px-Oseng_mercon.jpg'],
  ['sate klathak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sate_klatak_20170818_Yogyakarta.jpg/960px-Sate_klatak_20170818_Yogyakarta.jpg'],
  ['klathak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sate_klatak_20170818_Yogyakarta.jpg/960px-Sate_klatak_20170818_Yogyakarta.jpg'],
  ['brongkos', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Brongkos_1.jpg/960px-Brongkos_1.jpg'],
  ['bakpia', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Bakpia_pathok.jpg'],
  ['geplak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/17._Geplak_3.jpg/960px-17._Geplak_3.jpg'],

  // Jawa Timur
  ['rawon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rawon_Setan.jpg/960px-Rawon_Setan.jpg'],
  ['soto lamongan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Soto_Lamongan.jpg/960px-Soto_Lamongan.jpg'],
  ['rujak cingur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Rujak_cingur_Madura.jpg/960px-Rujak_cingur_Madura.jpg'],
  ['rujak serut', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Rujak_Buah_%28Indonesian_Fruit_Salad%29.JPG/960px-Rujak_Buah_%28Indonesian_Fruit_Salad%29.JPG'],
  ['rujak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Rujak_Buah_%28Indonesian_Fruit_Salad%29.JPG/960px-Rujak_Buah_%28Indonesian_Fruit_Salad%29.JPG'],
  ['pecel', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Pecel_Asli_Madiun.jpg/960px-Pecel_Asli_Madiun.jpg'],
  ['lontong balap', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/20170125_105849283_Lontong_balap.jpg/960px-20170125_105849283_Lontong_balap.jpg'],
  ['tahu campur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Tahu_Campur.jpg/960px-Tahu_Campur.jpg'],
  ['nasi krawu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Krawu_rice.jpg/960px-Krawu_rice.jpg'],
  ['semanggi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Semanggi_seller.jpg/960px-Semanggi_seller.jpg'],
  ['soto madura', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Soto_Madura_Daging.JPG/960px-Soto_Madura_Daging.JPG'],
  ['bebek sinjay', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/The_Wellknown_%22Bebek_SINJAY%22%2C_Branch_Surabaya_A._Yani_%28New_Branch%29_-_panoramio.jpg/960px-The_Wellknown_%22Bebek_SINJAY%22%2C_Branch_Surabaya_A._Yani_%28New_Branch%29_-_panoramio.jpg'],

  // Jawa Barat
  ['karedok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karedok.JPG/960px-Karedok.JPG'],
  ['lotek', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'],
  ['nasi tutug oncom', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nasi_Tutug_Oncom.jpg/960px-Nasi_Tutug_Oncom.jpg'],
  ['empal gentong', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Empal_gentong_boiled_cow_intestine.JPG/960px-Empal_gentong_boiled_cow_intestine.JPG'],
  ['seblak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Seblak_2.jpg/960px-Seblak_2.jpg'],
  ['batagor', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Batagor_Savoy_Homann_Bandung.jpg/960px-Batagor_Savoy_Homann_Bandung.jpg'],
  ['cuanki', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cuanki_Bandung.jpg/960px-Cuanki_Bandung.jpg'],
  ['mie kocok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mie_Kocok_Bandung.jpg/960px-Mie_Kocok_Bandung.jpg'],
  ['surabi', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Serabi-01.jpg'],
  ['serabi', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Serabi-01.jpg'],
  ['soto bandung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Soto_Bandung.jpg/960px-Soto_Bandung.jpg'],
  ['tahu gejrot', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tahu_gejrot_cirebon.JPG/960px-Tahu_gejrot_cirebon.JPG'],

  // Padang
  ['spaghetti goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mie_Goreng_Natra_Bintan.jpg/960px-Mie_Goreng_Natra_Bintan.jpg'],
  ['spaghetti', 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Spaghetti_served_with_meat_sauce.jpg'],
  ['rendang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rendang_daging_sapi_asli_Padang.JPG/960px-Rendang_daging_sapi_asli_Padang.JPG'],
  ['dendeng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Dendeng_balado.JPG/960px-Dendeng_balado.JPG'],
  ['gulai tunjang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Gulai_tunjang.JPG/960px-Gulai_tunjang.JPG'],
  ['gulai kepala ikan', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Gulai_kepala_ikan_khas_aceh.jpg'],
  ['gulai ikan patin', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Gulai_Ikan_Patin_203932.jpg/960px-Gulai_Ikan_Patin_203932.jpg'],
  ['gulai udang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Shrimp_curry_on_plate.jpg/960px-Shrimp_curry_on_plate.jpg'],
  ['ayam pop', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ayam_Pop_2.jpg/960px-Ayam_Pop_2.jpg'],
  ['sambal ijo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Sambal_Hijau_ijo.jpg/960px-Sambal_Hijau_ijo.jpg'],
  ['soto padang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/SotoPadang.JPG/960px-SotoPadang.JPG'],
  ['telur dadar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/FoodOmelete.jpg/960px-FoodOmelete.jpg'],
  ['sambal goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Sambal_Goreng_Ati.jpg/960px-Sambal_Goreng_Ati.jpg'],
  ['sambel goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Sambal_Goreng_Ati.jpg/960px-Sambal_Goreng_Ati.jpg'],

  // Betawi
  ['soto betawi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG/960px-Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG'],
  ['kerak telor', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Kerak_Telor_Betawi_Vendor.jpg/960px-Kerak_Telor_Betawi_Vendor.jpg'],
  ['asinan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Asinan_Betawi_2.jpg/960px-Asinan_Betawi_2.jpg'],
  ['semur jengkol', 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Semur_jengkol.jpg'],
  ['gabus pucung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Gabus_Pucung_1.jpg/960px-Gabus_Pucung_1.jpg'],

  // Bali
  ['ayam betutu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ayam_Betutu_Bali.jpg/960px-Ayam_Betutu_Bali.jpg'],
  ['sate lilit', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Satay_Lilit.jpg'],
  ['lawar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Lawar_babi_guling.jpg/960px-Lawar_babi_guling.jpg'],
  ['nasi campur bali', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Nasi_Campur_Bali_Sate_Lilit.jpg/960px-Nasi_Campur_Bali_Sate_Lilit.jpg'],
  ['tum ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pepes_ayam.jpg/960px-Pepes_ayam.jpg'],

  // Sulawesi
  ['coto makassar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coto_makassar.jpg/960px-Coto_makassar.jpg'],
  ['pallubasa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pallubasa.jpg/960px-Pallubasa.jpg'],
  ['konro', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Sop_Konro.JPG/960px-Sop_Konro.JPG'],
  ['tinutuan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tinutuan_bubur_Manado.JPG/960px-Tinutuan_bubur_Manado.JPG'],
  ['woku', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Kakap_Woku.JPG/960px-Kakap_Woku.JPG'],

  // Kalimantan
  ['soto banjar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg/960px-Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg'],
  ['ketupat kandangan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Katupat_Kandangan_in_Kandangan.JPG/960px-Katupat_Kandangan_in_Kandangan.JPG'],
  ['juhu singkah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juhu_Umbut_Rotan_Ikan_Nila.jpg/960px-Juhu_Umbut_Rotan_Ikan_Nila.jpg'],

  // Sumatera
  ['pempek', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pempek_campur.JPG/960px-Pempek_campur.JPG'],
  ['tekwan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Tekwan.JPG/960px-Tekwan.JPG'],
  ['mie aceh', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mie_Aceh_with_crab.jpg/960px-Mie_Aceh_with_crab.jpg'],
  ['bika ambon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kue_bika_ambon.JPG/960px-Kue_bika_ambon.JPG'],

  // Umum / basis (hidangan dari data resep pengguna)
  ['nasi goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Nasi_goreng_pattaya_20231028_120535.jpg/960px-Nasi_goreng_pattaya_20231028_120535.jpg'],
  ['sup iga kambing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Sop_Iga_2.jpg/960px-Sop_Iga_2.jpg'],
  ['sup ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chicken_soup_3%2C.JPG/960px-Chicken_soup_3%2C.JPG'],
  ['soto ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['tumis bayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tumis_Bayam_Mempawah.jpg/960px-Tumis_Bayam_Mempawah.jpg'],
  ['ayam glabed', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ayam_goreng_kalasan.JPG/960px-Ayam_goreng_kalasan.JPG'],
  ['taliwang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ayam_bakar_khas_Taliwang_2.JPG/960px-Ayam_bakar_khas_Taliwang_2.JPG'],
  ['ungkep', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ayam_Ungkep_092804.jpg/960px-Ayam_Ungkep_092804.jpg'],
  ['ayam bakar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ayam_bakar_bumbu_rujak.jpg/960px-Ayam_bakar_bumbu_rujak.jpg'],
  ['ayam goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Ayam_Goreng_Lalapan.jpg/960px-Ayam_Goreng_Lalapan.jpg'],
  ['bakso', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bakso_khas_Solo.jpg/960px-Bakso_khas_Solo.jpg'],
  ['rolade', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Unsliced_Flank_Roulade.jpg/960px-Unsliced_Flank_Roulade.jpg'],
  ['iga bakar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Konro_Bakar_3.jpg/960px-Konro_Bakar_3.jpg'],
  ['kambing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Gulai_tongseng_kambing.JPG/960px-Gulai_tongseng_kambing.JPG'],
  ['perkedel', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Perkedel_masakan_Padang.JPG/960px-Perkedel_masakan_Padang.JPG'],
  ['ikan goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Ikan_cakalang_Goreng.jpg/960px-Ikan_cakalang_Goreng.jpg'],
  ['ikan bakar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ikan_kakap_bakar_madu.JPG/960px-Ikan_kakap_bakar_madu.JPG'],
  ['cap cay', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Cap_Cay_%28Sayur_Cap_Chay%29.jpg/960px-Cap_Cay_%28Sayur_Cap_Chay%29.jpg'],
  ['capcai', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Cap_Cay_%28Sayur_Cap_Chay%29.jpg/960px-Cap_Cay_%28Sayur_Cap_Chay%29.jpg'],
  ['mie ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/960px-Mi_ayam_jamur.JPG'],
  ['mi ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/960px-Mi_ayam_jamur.JPG'],
  ['oseng pare', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Tumis_par%C3%A8_teri_5.jpg/960px-Tumis_par%C3%A8_teri_5.jpg'],
  ['ceker', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ceker_Ayam_Pedas.jpg/960px-Ceker_Ayam_Pedas.jpg'],
  ['telur ceplok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Telur_Ceplok.jpg/960px-Telur_Ceplok.jpg'],
  ['sambal tuna', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Tuna_Sambal_Roa_2.jpg/960px-Tuna_Sambal_Roa_2.jpg'],
  ['saus padang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kepiting_saus_padang.jpg/960px-Kepiting_saus_padang.jpg'],
  ['kue cantik', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cantik_Manis_Pandan.jpg/960px-Cantik_Manis_Pandan.jpg'],
  ['cantik manis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cantik_Manis_Pandan.jpg/960px-Cantik_Manis_Pandan.jpg'],
  ['es teler', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Es_teler.jpg/960px-Es_teler.jpg'],
  ['setup buah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sop_buah.jpg/960px-Sop_buah.jpg'],
  ['pisang selimut', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pisang_goreng_fried_banana.JPG/960px-Pisang_goreng_fried_banana.JPG'],
  ['basque', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Burnt_Bake_Cheesecake_Khas_Basque_Spanyol.jpg/960px-Burnt_Bake_Cheesecake_Khas_Basque_Spanyol.jpg'],
  ['keik pisang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Banana_and_chocolate_cake.jpg/960px-Banana_and_chocolate_cake.jpg'],
  ['kartika sari', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Kue_Lapis.jpg/960px-Kue_Lapis.jpg'],
  ['pulut sri muka', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Seri_Muka1.JPG/960px-Seri_Muka1.JPG'],
  ['sri muka', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Seri_Muka1.JPG/960px-Seri_Muka1.JPG'],
  ['kai choi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Choy_Sum_with_Soy_Sauce.jpg/960px-Choy_Sum_with_Soy_Sauce.jpg'],
  ['mustard green', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Choy_Sum_with_Soy_Sauce.jpg/960px-Choy_Sum_with_Soy_Sauce.jpg'],
  ['ubi manis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Boh_rom-rom.jpg/960px-Boh_rom-rom.jpg'],
  ['sari rasa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kue_Ketan_Colet.jpg/960px-Kue_Ketan_Colet.jpg'],
  ['ketan unti', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Ketan_Unti_Ambon_2.jpg/960px-Ketan_Unti_Ambon_2.jpg'],
  ['martabak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Murtabak.jpg/960px-Murtabak.jpg'],
]

// Basis yang aman: nasi goreng (hidangan Indonesia yang paling dikenal).
const DEFAULT_FOTO_MAKANAN = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Nasi_goreng_pattaya_20231028_120535.jpg/960px-Nasi_goreng_pattaya_20231028_120535.jpg'

function normalisasi(teks) {
  return String(teks || '').toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
}

export function fotoMakanan(judul) {
  const teks = normalisasi(judul)
  for (const [kata, url] of FOTO_MAKANAN) {
    if (teks.includes(kata)) return url
  }
  return DEFAULT_FOTO_MAKANAN
}

// Foto representatif per daerah (hidangan ikonik).
export const FOTO_DAERAH = {
  'Jawa Tengah': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gudeg_Ayam.jpg/960px-Gudeg_Ayam.jpg',
  'Yogyakarta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg/960px-Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg',
  'Jawa Timur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rawon_Setan.jpg/960px-Rawon_Setan.jpg',
  'Jawa Barat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karedok.JPG/960px-Karedok.JPG',
  'Padang': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rendang_daging_sapi_asli_Padang.JPG/960px-Rendang_daging_sapi_asli_Padang.JPG',
  'Betawi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG/960px-Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG',
  'Bali': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ayam_Betutu_Bali.jpg/960px-Ayam_Betutu_Bali.jpg',
  'Sumatera': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pempek_campur.JPG/960px-Pempek_campur.JPG',
  'Sulawesi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coto_makassar.jpg/960px-Coto_makassar.jpg',
  'Kalimantan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg/960px-Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg',
}
