// Ambil parameter id dari URL
var params = new URLSearchParams(window.location.search);
var id = params.get('id');

// Referensi elemen DOM
var loadingEl = document.getElementById('loading');
var errorEl = document.getElementById('error');
var contentEl = document.getElementById('content');

// Fungsi untuk menampilkan/menyembunyikan section
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

// Perbarui tampilan ikon hati berdasarkan status favorit
function updateFavoritIcon() {
  var btn = document.getElementById('btn-favorit');
  if (!btn) return;
  var isFav = window.Favorit && window.Favorit.isFavorit(id);
  btn.textContent = isFav ? '❤️' : '🤍';
  btn.setAttribute('aria-label', isFav ? 'Hapus dari favorit' : 'Tambah ke favorit');
}

// Render detail resep ke dalam DOM
function renderRecipe(resep) {
  // Header: gambar placeholder dengan inisial
  var initial = resep.judul_resep?.charAt(0)?.toUpperCase() || '?';
  document.getElementById('recipe-initial').textContent = initial;
  document.getElementById('recipe-judul').textContent = resep.judul_resep || '-';

  // Kategori (belum ada di DB, default "Makanan")
  var kategoriEl = document.getElementById('recipe-kategori');
  kategoriEl.textContent = resep.kategori || 'Makanan';

  // Durasi (belum ada di DB, default "-")
  var durasiEl = document.getElementById('recipe-durasi');
  durasiEl.textContent = resep.durasi || '-';

  // Porsi
  var porsiEl = document.getElementById('recipe-porsi');
  porsiEl.textContent = resep.porsi_default ? resep.porsi_default + ' porsi' : '-';

  // Deskripsi (belum ada di DB, default deskripsi umum)
  var deskripsiEl = document.getElementById('recipe-deskripsi');
  var jumlahBahan = resep.recipe_ingredients?.length || 0;
  var jumlahLangkah = resep.langkah_memasak?.length || 0;
  deskripsiEl.textContent = resep.deskripsi ||
    'Resep ' + resep.judul_resep + ' terdiri dari ' + jumlahBahan + ' bahan dan ' + jumlahLangkah + ' langkah memasak.';

  // Bahan-bahan
  var bahanList = document.getElementById('bahan-list');
  bahanList.innerHTML = '';
  if (resep.recipe_ingredients && resep.recipe_ingredients.length > 0) {
    resep.recipe_ingredients.forEach(function (bahan) {
      var li = document.createElement('li');
      li.className = 'flex items-center justify-between py-3 first:pt-0 last:pb-0';
      li.innerHTML =
        '<span class="text-sm text-gray-700">' +
          '<span class="font-medium">' + bahan.nama_bahan + '</span>' +
          '<span class="text-gray-400 mx-1">\u2014</span>' +
          '<span class="text-gray-500">' + bahan.kuantitas + ' ' + bahan.satuan + '</span>' +
        '</span>' +
        '<span class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full capitalize">' + (bahan.kategori || '') + '</span>';
      bahanList.appendChild(li);
    });
  } else {
    bahanList.innerHTML = '<li class="text-sm text-gray-400 italic py-3">Tidak ada data bahan.</li>';
  }

  // Langkah memasak
  var langkahList = document.getElementById('langkah-list');
  langkahList.innerHTML = '';
  if (resep.langkah_memasak && resep.langkah_memasak.length > 0) {
    resep.langkah_memasak.forEach(function (langkah, index) {
      var li = document.createElement('li');
      li.className = 'flex items-start gap-4';
      li.innerHTML =
        '<span class="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-sm">' + (index + 1) + '</span>' +
        '<div class="flex-1 pt-1">' +
          '<p class="text-sm text-gray-700">' + langkah.instruksi + '</p>' +
        '</div>';
      langkahList.appendChild(li);
    });
  } else {
    langkahList.innerHTML = '<li class="text-sm text-gray-400 italic">Tidak ada langkah memasak.</li>';
  }

  // Tombol video
  var btnVideo = document.getElementById('btn-video');
  if (resep.video && resep.video.trim() !== '') {
    btnVideo.href = resep.video;
    btnVideo.removeAttribute('disabled');
    btnVideo.classList.remove('bg-gray-300', 'cursor-not-allowed');
  } else {
    btnVideo.removeAttribute('href');
    btnVideo.setAttribute('disabled', 'disabled');
    btnVideo.classList.add('bg-gray-300', 'cursor-not-allowed');
  }

  // Perbarui ikon hati favorit
  updateFavoritIcon();

  // Simpan ke riwayat
  if (window.Riwayat) {
    window.Riwayat.tambah(resep);
  }
}

// Event listener untuk tombol favorit
document.addEventListener('click', function (e) {
  var btn = e.target.closest('#btn-favorit');
  if (!btn) return;
  if (!window.Favorit) return;
  window.Favorit.toggle(id);
  updateFavoritIcon();
});

// Inisialisasi: fetch data resep berdasarkan id
async function init() {
  // Validasi parameter id
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

// Jalankan
init();
