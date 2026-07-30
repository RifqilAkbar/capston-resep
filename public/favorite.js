var loadingEl = document.getElementById('loading');
var contentEl = document.getElementById('content');
var emptyEl = document.getElementById('empty');
var gridEl = document.getElementById('favorit-grid');

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

function tambahCard(container, resep, isFavorit) {
  var inisial = (resep.judul_resep && resep.judul_resep.charAt(0).toUpperCase()) || '?';

  var persentase = resep.persentase || 0;
  var progressColor =
    persentase > 75 ? 'from-emerald-400 to-emerald-500' :
    persentase > 50 ? 'from-orange-400 to-orange-500' :
    persentase > 0 ? 'from-yellow-400 to-yellow-500' :
    'from-gray-300 to-gray-400';
  var badgeColor =
    persentase > 75 ? 'bg-emerald-100 text-emerald-700' :
    persentase > 50 ? 'bg-orange-100 text-orange-700' :
    persentase > 0 ? 'bg-yellow-100 text-yellow-700' :
    'bg-gray-100 text-gray-500';

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
      '<button class="absolute top-3 left-3 text-2xl leading-none transition-transform duration-200 hover:scale-110 active:scale-90" ' +
              'aria-label="Hapus dari favorit" data-fav="' + resep.id + '">' +
        (isFavorit ? '\u2764\uFE0F' : '\uD83E\uDD0D') +
      '</button>' +
      '<span class="absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ' + badgeColor + '">' +
        'Cocok: ' + persentase + '%' +
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
      '<div>' +
        '<div class="flex justify-between text-xs mb-1.5">' +
          '<span class="text-gray-400">Kecocokan</span>' +
          '<span class="font-semibold text-gray-600">' + persentase + '%</span>' +
        '</div>' +
        '<div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">' +
          '<div class="h-full bg-gradient-to-r ' + progressColor + ' rounded-full transition-all duration-700" ' +
               'style="width:' + persentase + '%"></div>' +
        '</div>' +
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
    var favoritIds = window.Favorit ? window.Favorit.getAll() : [];
    if (favoritIds.length === 0) {
      showEmpty();
      return;
    }

    var response = await fetch('/api/public/data');
    if (!response.ok) throw new Error('Gagal mengambil data.');

    var data = await response.json();
    var semuaResep = data.resep || [];

    var favoritResep = semuaResep.filter(function (r) {
      return favoritIds.indexOf(Number(r.id)) !== -1;
    });

    if (favoritResep.length === 0) {
      showEmpty();
      return;
    }

    favoritResep.forEach(function (resep) {
      tambahCard(gridEl, resep, true);
    });

    showContent();
  } catch (err) {
    console.error('Error:', err);
    showEmpty();
  }
}

init();
