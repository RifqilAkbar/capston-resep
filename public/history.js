// Halaman Riwayat Resep — menampilkan resep yang pernah dilihat

var ICON_HEART_OUTLINE = '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z"/></svg>';
var ICON_HEART_FILLED = '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z"/></svg>';
var ICON_MOON = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
var ICON_SUN = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

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

function updateThemeIcon() {
  var btn = document.getElementById('btn-theme');
  if (!btn) return;
  var isDark = document.documentElement.classList.contains('dark');
  btn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
}

updateThemeIcon();

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
  card.className = 'card-enter bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden ' +
                    'hover:shadow-lg dark:hover:shadow-gray-900/50 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer ' +
                    'transition-all duration-300';
  card.onclick = function () {
    window.location.href = 'detail.html?id=' + resep.id;
  };

  card.innerHTML =
    '<div class="relative h-44 bg-gradient-to-br from-orange-100 dark:from-orange-900/40 to-orange-200 dark:to-orange-800/40 flex items-center justify-center">' +
      '<span class="text-6xl font-bold text-orange-300/60 dark:text-orange-400/40 select-none">' + inisial + '</span>' +
      '<button class="absolute top-3 left-3 transition-transform duration-200 hover:scale-110 active:scale-90" ' +
              'aria-label="' + (isFavorit ? 'Hapus dari favorit' : 'Tambah ke favorit') + '" data-fav="' + resep.id + '">' +
        (isFavorit ? ICON_HEART_FILLED : ICON_HEART_OUTLINE) +
      '</button>' +
      '<span class="absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">Dilihat</span>' +
    '</div>' +
    '<div class="p-5 space-y-3">' +
      '<h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">' + (resep.judul_resep || '') + '</h4>' +
      '<div class="flex flex-wrap gap-1.5 items-center">' +
        (isFavorit ? '<span class="text-xs px-2.5 py-1 bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 rounded-lg font-semibold">Favorit</span>' : '') +
        '<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">' + kategori + '</span>' +
        '<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">\u2014</span>' +
        '<span class="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">' + jumlahBahan + ' bahan</span>' +
      '</div>' +
      '<button class="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 ' +
                    'text-white font-semibold py-2.5 px-4 rounded-xl text-sm ' +
                    'transition-all duration-200 active:scale-95" data-detail="' + resep.id + '">' +
        'Lihat Detail' +
      '</button>' +
    '</div>';

  container.appendChild(card);
}

document.addEventListener('click', function (e) {
  var favBtn = e.target.closest('[data-fav]');
  if (favBtn) {
    e.stopPropagation();
    var resepId = favBtn.getAttribute('data-fav');
    if (window.Favorit) {
      var ditambahkan = window.Favorit.toggle(resepId);
      if (window.Toast) {
        if (ditambahkan) {
          window.Toast.show('Ditambahkan ke favorit', 'success');
        } else {
          window.Toast.show('Dihapus dari favorit', 'info');
        }
      }
      init();
    }
    return;
  }

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

  var detailBtn = e.target.closest('[data-detail]');
  if (detailBtn) {
    e.stopPropagation();
    window.location.href = 'detail.html?id=' + detailBtn.getAttribute('data-detail');
  }
});

async function init() {
  showLoading();
  gridEl.innerHTML = '';

  try {
    var riwayatList = window.Riwayat ? window.Riwayat.getAll() : [];
    if (riwayatList.length === 0) {
      showEmpty();
      return;
    }

    var favoritIds = window.Favorit ? window.Favorit.getAll() : [];

    var response = await fetch('/api/public/data');
    if (!response.ok) throw new Error('Gagal mengambil data.');

    var data = await response.json();
    var semuaResep = data.resep || [];

    var historyIds = riwayatList.map(function (item) { return Number(item.id); });
    var sortedResep = [];
    historyIds.forEach(function (id) {
      for (var i = 0; i < semuaResep.length; i++) {
        if (Number(semuaResep[i].id) === id) {
          sortedResep.push(semuaResep[i]);
          break;
        }
      }
    });

    if (sortedResep.length === 0) {
      showEmpty();
      return;
    }

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

init();
