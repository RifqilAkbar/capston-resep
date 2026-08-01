// ============================================
// Ikon SVG 2D (bukan emoji)
// ============================================
var ICON_HEART_OUTLINE = '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z"/></svg>';
var ICON_HEART_FILLED = '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z"/></svg>';
var ICON_MOON = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
var ICON_SUN = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

// ============================================
// Inisialisasi parameter dan elemen DOM
// ============================================
var params = new URLSearchParams(window.location.search);
var id = params.get('id');

// Referensi elemen DOM
var loadingEl = document.getElementById('loading');
var errorEl = document.getElementById('error');
var contentEl = document.getElementById('content');

// Ambil bahan user dari localStorage (FITUR 1)
// Data ini disimpan oleh halaman utama (React) saat user memilih bahan
var bahanUser = [];
if (window.Kulkas) {
  bahanUser = window.Kulkas.getAll();
}

// ============================================
// Fungsi bantuan cek kepemilikan bahan
// ============================================
function userPunyaBahan(ingredientId) {
  return bahanUser.indexOf(Number(ingredientId)) !== -1;
}

// ============================================
// Fungsi tampilan (lama — tidak diubah)
// ============================================
function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  contentEl.classList.add('hidden');
}

function showError() {
  loadingEl.classList.add('hidden');
  errorEl.classList.remove('hidden');
  contentEl.classList.add('hidden');
}

function showContent() {
  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  contentEl.classList.remove('hidden');
}

// Perbarui ikon hati dan tombol theme sesuai status
function updateFavoritIcon() {
  var btn = document.getElementById('btn-favorit');
  if (!btn) return;
  var isFav = window.Favorit && window.Favorit.isFavorit(id);
  btn.innerHTML = isFav ? ICON_HEART_FILLED : ICON_HEART_OUTLINE;
  btn.setAttribute('aria-label', isFav ? 'Hapus dari favorit' : 'Tambah ke favorit');
}

// ============================================
// Enrich data resep dengan field default (FITUR 4)
// ============================================
function updateThemeIcon() {
  var btn = document.getElementById('btn-theme');
  if (!btn) return;
  var isDark = document.documentElement.classList.contains('dark');
  btn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
}

updateThemeIcon();

function enrichRecipe(resep) {
  // Tingkat kesulitan berdasarkan jumlah langkah
  var jumlahLangkah = (resep.langkah_memasak || []).length;
  if (!resep.tingkat_kesulitan) {
    if (jumlahLangkah <= 3) {
      resep.tingkat_kesulitan = 'Mudah';
    } else if (jumlahLangkah <= 6) {
      resep.tingkat_kesulitan = 'Sedang';
    } else {
      resep.tingkat_kesulitan = 'Sulit';
    }
  }

  // Estimasi kalori default
  if (!resep.estimasi_kalori) {
    resep.estimasi_kalori = Math.floor(Math.random() * 200 + 200) + ' kkal';
  }

  // Porsi default
  if (!resep.porsi_default) {
    resep.porsi_default = 1;
  }

  // Waktu memasak default
  if (!resep.durasi) {
    resep.durasi = '30 menit';
  }

  // Tips memasak default (FITUR 5)
  if (!resep.tips_memasak) {
    var tipsDefault = [
      'Gunakan bahan-bahan segar untuk hasil masakan yang lebih nikmat.',
      'Siapkan semua bahan sebelum mulai memasak agar proses lebih efisien.',
      'Atur api sesuai petunjuk — api besar untuk menumis, api kecil untuk merebus.',
      'Cicipi masakan sebelum disajikan untuk memastikan rasa sudah pas.',
      'Gunakan peralatan bersih agar cita rasa masakan tidak tercampur.'
    ];
    resep.tips_memasak = tipsDefault;
  }

  return resep;
}

// ============================================
// Render info badges (FITUR 4)
// ============================================
function renderInfoBadges(resep) {
  document.getElementById('recipe-kategori').textContent = resep.kategori || 'Makanan';
  document.getElementById('recipe-tingkat-kesulitan').textContent = resep.tingkat_kesulitan || '-';
  document.getElementById('recipe-estimasi-kalori').textContent = resep.estimasi_kalori || '-';
  document.getElementById('recipe-porsi').textContent = resep.porsi_default ? resep.porsi_default + ' porsi' : '-';
  document.getElementById('recipe-durasi').textContent = resep.durasi || '-';
}

// ============================================
// Render bahan list dengan status kepemilikan (FITUR 1)
// ============================================
function renderBahanList(resep) {
  var bahanList = document.getElementById('bahan-list');
  bahanList.innerHTML = '';

  if (resep.recipe_ingredients && resep.recipe_ingredients.length > 0) {
    resep.recipe_ingredients.forEach(function (bahan) {
      var dimiliki = userPunyaBahan(bahan.ingredient_id);

      // Tanda ✔ (hijau) jika dimiliki, ✖ (merah) jika tidak
      var statusIcon = dimiliki ? '\u2714' : '\u2716';
      var statusClass = dimiliki ? 'text-green-600' : 'text-red-500';

      var li = document.createElement('li');
      li.className = 'flex items-center justify-between py-3 first:pt-0 last:pb-0';
      li.innerHTML =
        '<span class="flex items-center gap-2 text-sm">' +
          '<span class="font-bold text-base ' + statusClass + '">' + statusIcon + '</span>' +
          '<span class="text-gray-700 dark:text-gray-300">' +
            '<span class="font-medium">' + bahan.nama_bahan + '</span>' +
            '<span class="text-gray-400 dark:text-gray-500 mx-1">\u2014</span>' +
            '<span class="text-gray-500 dark:text-gray-400">' + bahan.kuantitas + ' ' + bahan.satuan + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full capitalize">' + (bahan.kategori || '') + '</span>';
      bahanList.appendChild(li);
    });
  } else {
    bahanList.innerHTML = '<li class="text-sm text-gray-400 italic py-3">Tidak ada data bahan.</li>';
  }
}

// ============================================
// Render daftar bahan yang kurang (FITUR 2)
// ============================================
var bahanKurangTerakhir = [];

function renderBahanKurang(resep) {
  var section = document.getElementById('bahan-kurang-section');
  var list = document.getElementById('bahan-kurang-list');
  list.innerHTML = '';

  if (!resep.recipe_ingredients || resep.recipe_ingredients.length === 0) {
    section.classList.add('hidden');
    return;
  }

  // Filter bahan yang tidak dimiliki user
  var bahanKurang = resep.recipe_ingredients.filter(function (bahan) {
    return !userPunyaBahan(bahan.ingredient_id);
  });

  // Simpan untuk dipakai tombol "Tambah ke Daftar Belanja"
  bahanKurangTerakhir = bahanKurang;
  var btnBelanja = document.getElementById('btn-belanja');
  if (btnBelanja) {
    var semuaAda = bahanKurang.length === 0;
    btnBelanja.disabled = semuaAda;
    btnBelanja.classList.toggle('opacity-50', semuaAda);
    btnBelanja.classList.toggle('cursor-not-allowed', semuaAda);
  }

  if (bahanKurang.length === 0) {
    // Semua bahan tersedia
    list.innerHTML = '<span class="text-sm text-green-600 font-semibold">\u2714 Semua bahan sudah tersedia.</span>';
  } else {
    // Tampilkan daftar bahan yang kurang
    bahanKurang.forEach(function (bahan) {
      var span = document.createElement('span');
      span.className = 'px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200';
      span.textContent = bahan.nama_bahan;
      list.appendChild(span);
    });
  }

  section.classList.remove('hidden');
}

// ============================================
// Render progress bar kecocokan (FITUR 3)
// ============================================
function renderProgress(resep) {
  var section = document.getElementById('progress-section');
  var blocksEl = document.getElementById('progress-blocks');
  var textEl = document.getElementById('progress-text');
  blocksEl.innerHTML = '';

  var totalBahan = (resep.recipe_ingredients || []).length;

  if (totalBahan === 0) {
    section.classList.add('hidden');
    return;
  }

  // Hitung jumlah bahan yang dimiliki
  var dimiliki = 0;
  resep.recipe_ingredients.forEach(function (bahan) {
    if (userPunyaBahan(bahan.ingredient_id)) {
      dimiliki++;
    }
  });

  var persentase = Math.round((dimiliki / totalBahan) * 100);
  var totalBlok = 10;
  var blokTerisi = Math.round((persentase / 100) * totalBlok);

  // Buat blok progress
  for (var i = 0; i < totalBlok; i++) {
    var block = document.createElement('div');
    block.className = 'progress-block';
    if (i < blokTerisi) {
      block.classList.add('bg-green-500');
    } else {
      block.classList.add('bg-gray-200');
    }
    blocksEl.appendChild(block);
  }

  textEl.textContent = persentase + '%';

  section.classList.remove('hidden');
}

// ============================================
// Render tips memasak (FITUR 5)
// ============================================
function renderTips(resep) {
  var tipsList = document.getElementById('tips-list');
  tipsList.innerHTML = '';

  var tips = resep.tips_memasak || [];

  if (tips.length === 0) {
    tipsList.innerHTML = '<li class="text-sm text-gray-400 italic">Tidak ada tips untuk resep ini.</li>';
    return;
  }

  tips.forEach(function (tip, index) {
    var li = document.createElement('li');
    li.className = 'flex items-start gap-3';
    li.innerHTML =
      '<span class="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold text-xs">' + (index + 1) + '</span>' +
      '<p class="text-sm text-gray-700 flex-1 pt-0.5">' + tip + '</p>';
    tipsList.appendChild(li);
  });
}

// ============================================
// Render seluruh resep (logika lama dipertahankan)
// ============================================
function renderRecipe(resep) {
  // Enrich data resep dengan field default (FITUR 4)
  resep = enrichRecipe(resep);

  // --- LOGIKA LAMA (tidak diubah) ---
  var initial = resep.judul_resep?.charAt(0)?.toUpperCase() || '?';
  document.getElementById('recipe-initial').textContent = initial;
  document.getElementById('recipe-judul').textContent = resep.judul_resep || '-';

  var deskripsiEl = document.getElementById('recipe-deskripsi');
  var jumlahBahan = resep.recipe_ingredients?.length || 0;
  var jumlahLangkah = resep.langkah_memasak?.length || 0;
  deskripsiEl.textContent = resep.deskripsi ||
    'Resep ' + resep.judul_resep + ' terdiri dari ' + jumlahBahan + ' bahan dan ' + jumlahLangkah + ' langkah memasak.';

  // Render info badges diperbarui (FITUR 4)
  renderInfoBadges(resep);

  // Render bahan-bahan dengan status (FITUR 1)
  renderBahanList(resep);

  // Render bahan yang kurang (FITUR 2)
  renderBahanKurang(resep);

  // Render progress (FITUR 3)
  renderProgress(resep);

  // --- LOGIKA LAMA (tidak diubah) ---
  var langkahList = document.getElementById('langkah-list');
  langkahList.innerHTML = '';
  if (resep.langkah_memasak && resep.langkah_memasak.length > 0) {
    resep.langkah_memasak.forEach(function (langkah, index) {
      var li = document.createElement('li');
      li.className = 'flex items-start gap-4';
      li.innerHTML =
        '<span class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full flex items-center justify-center font-bold text-sm">' + (index + 1) + '</span>' +
        '<div class="flex-1 pt-1">' +
          '<p class="text-sm text-gray-700 dark:text-gray-300">' + langkah.instruksi + '</p>' +
        '</div>';
      langkahList.appendChild(li);
    });
  } else {
    langkahList.innerHTML = '<li class="text-sm text-gray-400 italic">Tidak ada langkah memasak.</li>';
  }

  // Render tips memasak (FITUR 5)
  renderTips(resep);

  // --- LOGIKA LAMA (tidak diubah) ---
  var btnVideo = document.getElementById('btn-video');
  if (resep.video && resep.video.trim() !== '') {
    btnVideo.href = resep.video;
    btnVideo.removeAttribute('disabled');
    btnVideo.classList.remove('bg-gray-300', 'dark:bg-gray-600', 'cursor-not-allowed');
  } else {
    btnVideo.removeAttribute('href');
    btnVideo.setAttribute('disabled', 'disabled');
    btnVideo.classList.add('bg-gray-300', 'dark:bg-gray-600', 'cursor-not-allowed');
  }

  updateFavoritIcon();

  // Simpan ke riwayat
  if (window.Riwayat) {
    window.Riwayat.tambah(resep);
  }
}

// ============================================
// Event listener utama
// ============================================
document.addEventListener('click', function (e) {
  // --- LOGIKA LAMA: Favorit ---
  var favBtn = e.target.closest('#btn-favorit');
  if (favBtn) {
    if (!window.Favorit) return;
    var ditambahkan = window.Favorit.toggle(id);
    updateFavoritIcon();
    if (window.Toast) {
      if (ditambahkan) {
        window.Toast.show('Ditambahkan ke favorit', 'success');
      } else {
        window.Toast.show('Dihapus dari favorit', 'info');
      }
    }
    return;
  }

  // --- FITUR 6: Bagikan Resep ---
  var bagikanBtn = e.target.closest('#btn-bagikan');
  if (bagikanBtn) {
    var judul = document.getElementById('recipe-judul').textContent;
    var url = window.location.href;
    var teks = 'Lihat resep ' + judul + ' di Buku Resep Pintar!';

    if (navigator.share) {
      navigator.share({
        title: judul,
        text: teks,
        url: url
      }).catch(function () {
        // User membatalkan share — tidak perlu aksi
      });
    } else {
      // Fallback: copy link ke clipboard
      var textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        if (window.Toast) {
          window.Toast.show('Link resep disalin ke clipboard!', 'success');
        }
      } catch (err) {
        if (window.Toast) {
          window.Toast.show('Gagal menyalin link.', 'error');
        }
      }
      document.body.removeChild(textarea);
    }
    return;
  }

  // Tombol theme
  var themeBtn = e.target.closest('#btn-theme');
  if (themeBtn) {
    if (!window.Theme) return;
    window.Theme.toggle();
    updateThemeIcon();
    var isDark = document.documentElement.classList.contains('dark');
    if (window.Toast) {
      window.Toast.show('Tema ' + (isDark ? 'gelap' : 'terang') + ' diterapkan', 'info');
    }
    return;
  }

  // --- FITUR 7: Cetak Resep ---
  var cetakBtn = e.target.closest('#btn-cetak');
  if (cetakBtn) {
    window.print();
    return;
  }

  // --- Daftar Belanja: simpan bahan yang kurang ke localStorage ---
  var belanjaBtn = e.target.closest('#btn-belanja');
  if (belanjaBtn) {
    if (belanjaBtn.disabled) return;

    if (!bahanKurangTerakhir || bahanKurangTerakhir.length === 0) {
      if (window.Toast) {
        window.Toast.show('Tidak ada bahan yang perlu dibeli.', 'info');
      }
      return;
    }

    var items = bahanKurangTerakhir.map(function (bahan) {
      return {
        id: bahan.ingredient_id,
        nama: bahan.nama_bahan,
        kuantitas: bahan.kuantitas,
        satuan: bahan.satuan
      };
    });

    var ditambah = 0;
    if (window.ShoppingList) {
      ditambah = window.ShoppingList.tambah(items);
    }

    belanjaBtn.disabled = true;
    belanjaBtn.classList.add('opacity-60', 'cursor-not-allowed');
    belanjaBtn.innerHTML =
      '<i class="fa-solid fa-check"></i>' +
      'Sudah di Daftar Belanja';

    if (window.Toast) {
      if (ditambah > 0) {
        window.Toast.show(
          ditambah + ' bahan ditambahkan ke daftar belanja.',
          'success'
        );
      } else {
        window.Toast.show('Semua bahan ini sudah ada di daftar belanja.', 'info');
      }
    }
    return;
  }
});

// ============================================
// Inisialisasi halaman
// ============================================
async function init() {
  if (!id || isNaN(id) || Number(id) <= 0) {
    showError();
    return;
  }

  showLoading();

  try {
    var response = await fetch('/api/public/recipes/' + id);

    if (!response.ok) {
      if (response.status === 404) {
        showError();
        return;
      }
      throw new Error('Gagal mengambil data resep.');
    }

    var data = await response.json();

    if (!data.resep) {
      showError();
      return;
    }

    renderRecipe(data.resep);
    showContent();
  } catch (err) {
    console.error('Error fetch detail resep:', err);
    showError();
  }
}

init();
