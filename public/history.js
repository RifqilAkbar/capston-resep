// Halaman Riwayat Resep
// Menampilkan resep-resep yang pernah dilihat user (dari localStorage).
// Urutan terbaru di atas. Maksimal 10 resep.

var loadingEl = document.getElementById('loading');
var contentEl = document.getElementById('content');
var emptyEl = document.getElementById('empty');
var gridEl = document.getElementById('history-grid');

function showLoading() {
  loadingEl.classList.remove('hidden');
  contentEl.classList.add('hidden');
  emptyEl.classList.add('hidden');
}

function showContent() {
  loadingEl.classList.add('hidden');
  contentEl.classList.remove('hidden');
  emptyEl.classList.add('hidden');
}

function showEmpty() {
  loadingEl.classList.add('hidden');
  contentEl.classList.add('hidden');
  emptyEl.classList.remove('hidden');
}

// Render satu card resep (sama style dengan halaman utama)
function tambahCard(container, resep, isFavorit) {
  var inisial = (resep.judul_resep && resep.judul_resep.charAt(0).toUpperCase()) || '?';

  var kategoriList = [];
  if (resep.recipe_ingredients) {
    resep.recipe_ingredients.forEach(function (ri) {
      if (ri.kategori && kategoriList.indexOf(ri.kategori) === -1) {
        kategoriList.push(ri.kategori);
      }
    });
  }
  var kategori = kategoriList.length > 0 ? kategoriList.join(', ') : 'Makanan';
  var jumlahBahan = (resep.recipe_ingredients && resep.recipe_ingredients.length) || 0;

  var card = document.createElement('div');
  card.dataset.id = resep.id;
  card.className = 'card-enter bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden ' +
                    'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer ' +
                    'transition-all duration-300';
  card.onclick = function () {
    window.location.href = 'detail.html?id=' + resep.id;
  };

  card.innerHTML =
    '<div class="relative h-44 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">' +
      '<span class="text-6xl font-bold text-orange-300/60 select-none">' + inisial + '</span>' +

      /* Ikon hati */
      '<button class="absolute top-3 left-3 text-2xl leading-none transition-transform duration-200 hover:scale-110 active:scale-90" ' +
              'aria-label="' + (isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit') + '" data-fav="' + resep.id + '">' +
        (isFavorit ? '❤️' : '🤍') +
      '</button>' +

      '<span class="absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm bg-gray-100 text-gray-500">' +
        'Dilihat' +
      '</span>' +
    '</div>' +

    '<div class="p-5 space-y-3">' +
      '<h4 class="text-lg font-bold text-gray-900 truncate">' + (resep.judul_resep || '') + '</h4>' +

      '<div class="flex flex-wrap gap-1.5 items-center">' +
        (isFavorit ? '<span class="text-xs px-2.5 py-1 bg-red-50 text-red-600 rounded-lg font-semibold">Favorit</span>' : '') +
        '<span class="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">' + kategori + '</span>' +
        '<span class="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">\u2014</span>' +
        '<span class="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">' + jumlahBahan + ' bahan</span>' +
      '</div>' +

      '<button class="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' +
                    'text-white font-semibold py-2.5 px-4 rounded-xl text-sm ' +
                    'transition-all duration-200 active:scale-95" ' +
              'data-detail="' + resep.id + '">' +
        'Lihat Detail' +
      '</button>' +
    '</div>';

  container.appendChild(card);
}

// Event delegation untuk tombol hati dan tombol detail
document.addEventListener('click', function (e) {
  var favBtn = e.target.closest('[data-fav]');
  if (favBtn) {
    e.stopPropagation();
    var resepId = favBtn.getAttribute('data-fav');
    if (window.Favorit) {
      window.Favorit.toggle(resepId);
      init();
    }
    return;
  }

  var detailBtn = e.target.closest('[data-detail]');
  if (detailBtn) {
    e.stopPropagation();
    window.location.href = 'detail.html?id=' + detailBtn.getAttribute('data-detail');
  }
});

// Inisialisasi
async function init() {
  showLoading();
  gridEl.innerHTML = '';

  try {
    // Ambil riwayat dari localStorage
    var riwayatList = window.Riwayat ? window.Riwayat.getAll() : [];
    if (riwayatList.length === 0) {
      showEmpty();
      return;
    }

    // Ambil daftar favorit
    var favoritIds = window.Favorit ? window.Favorit.getAll() : [];

    // Fetch semua resep dari API
    var response = await fetch('/api/public/data');
    if (!response.ok) throw new Error('Gagal mengambil data.');

    var data = await response.json();
    var semuaResep = data.resep || [];

    // Urutkan resep sesuai urutan riwayat (terbaru di atas)
    var historyIds = riwayatList.map(function (item) { return Number(item.id); });
    var sortedResep = [];
    historyIds.forEach(function (id) {
      var found = null;
      for (var i = 0; i < semuaResep.length; i++) {
        if (Number(semuaResep[i].id) === id) {
          found = semuaResep[i];
          break;
        }
      }
      if (found) sortedResep.push(found);
    });

    if (sortedResep.length === 0) {
      showEmpty();
      return;
    }

    // Render card
    sortedResep.forEach(function (resep) {
      var isFav = favoritIds.indexOf(Number(resep.id)) !== -1;
      tambahCard(gridEl, resep, isFav);
    });

    showContent();
  } catch (err) {
    console.error('Error:', err);
    showEmpty();
  }
}

// Jalankan
init();
