// Penyimpanan lokal untuk Favorit dan Riwayat menggunakan localStorage.
// Fungsi-fungsi ini tersedia melalui window.Favorit dan window.Riwayat
// sehingga bisa dipakai oleh halaman React maupun halaman vanilla HTML.

;(function () {
  var KEY_FAVORIT = 'skripsi_favorites'
  var KEY_RIWAYAT = 'skripsi_history'
  var MAX_RIWAYAT = 10

  // ==================== FAVORIT ====================

  window.Favorit = {
    // Mengembalikan array ID resep favorit
    getAll: function () {
      try {
        return JSON.parse(localStorage.getItem(KEY_FAVORIT) || '[]')
      } catch (e) {
        return []
      }
    },

    // Cek apakah resep dengan ID tertentu sudah difavoritkan
    isFavorit: function (id) {
      return this.getAll().indexOf(Number(id)) !== -1
    },

    // Toggle status favorit. Kembalikan true jika ditambahkan, false jika dihapus
    toggle: function (id) {
      var list = this.getAll()
      var numId = Number(id)
      var idx = list.indexOf(numId)

      if (idx === -1) {
        list.push(numId)
      } else {
        list.splice(idx, 1)
      }

      localStorage.setItem(KEY_FAVORIT, JSON.stringify(list))
      return idx === -1
    },

    // Tambah resep ke favorit (tidak duplikat)
    tambah: function (id) {
      var list = this.getAll()
      var numId = Number(id)

      if (list.indexOf(numId) === -1) {
        list.push(numId)
        localStorage.setItem(KEY_FAVORIT, JSON.stringify(list))
      }
    },

    // Hapus resep dari favorit
    hapus: function (id) {
      var list = this.getAll()
      var numId = Number(id)
      var idx = list.indexOf(numId)

      if (idx !== -1) {
        list.splice(idx, 1)
        localStorage.setItem(KEY_FAVORIT, JSON.stringify(list))
      }
    }
  }

  // ==================== RIWAYAT ====================

  window.Riwayat = {
    // Mengembalikan array riwayat (terbaru di index 0)
    getAll: function () {
      try {
        return JSON.parse(localStorage.getItem(KEY_RIWAYAT) || '[]')
      } catch (e) {
        return []
      }
    },

    // Tambahkan resep ke riwayat. Jika sudah ada, pindahkan ke atas.
    // Hanya menyimpan maksimal MAX_RIWAYAT item.
    tambah: function (resep) {
      if (!resep || !resep.id) return

      var list = this.getAll()
      var numId = Number(resep.id)

      // Hapus duplikat jika sudah ada
      list = list.filter(function (item) {
        return item.id !== numId
      })

      // Tambah ke posisi paling atas (terbaru)
      list.unshift({
        id: numId,
        judul: resep.judul_resep || resep.judul || 'Resep',
        dilihat: new Date().toISOString()
      })

      // Batasi jumlah maksimal
      if (list.length > MAX_RIWAYAT) {
        list = list.slice(0, MAX_RIWAYAT)
      }

      localStorage.setItem(KEY_RIWAYAT, JSON.stringify(list))
    }
  }

  // ==================== KULKAS (Bahan User) ====================
  // Menyimpan ID bahan yang dipilih user di halaman utama
  // agar bisa diakses oleh halaman detail resep.

  window.Kulkas = {
    KEY: 'skripsi_kulkas',

    // Mengembalikan array ID bahan yang dipilih user
    getAll: function () {
      try {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]')
      } catch (e) {
        return []
      }
    },

    // Simpan daftar ID bahan ke localStorage
    simpan: function (ids) {
      localStorage.setItem(this.KEY, JSON.stringify(ids))
    },

    // Cek apakah user memiliki bahan tertentu berdasarkan ID
    punya: function (ingredientId) {
      return this.getAll().indexOf(Number(ingredientId)) !== -1
    }
  }

  // ==================== DAFTAR BELANJA (Shopping List) ====================
  // Menyimpan bahan yang belum dimiliki user (dari halaman detail resep)
  // di localStorage karena backend belum menyediakan endpoint khusus.

  window.ShoppingList = {
    KEY: 'skripsi_shopping_list',

    // Mengembalikan array item { id, nama, kuantitas, satuan }
    getAll: function () {
      try {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]')
      } catch (e) {
        return []
      }
    },

    // Tambahkan daftar item. Item dengan id yang sama tidak akan duplikat.
    // Kembalikan jumlah item baru yang benar-benar ditambahkan.
    tambah: function (items) {
      if (!items || !items.length) return 0
      var list = this.getAll()
      var ditambah = 0
      items.forEach(function (item) {
        if (!item || !item.id) return
        var ada = list.some(function (existing) {
          return Number(existing.id) === Number(item.id)
        })
        if (!ada) {
          list.push({
            id: Number(item.id),
            nama: item.nama || 'Bahan',
            kuantitas: item.kuantitas || 0,
            satuan: item.satuan || ''
          })
          ditambah++
        }
      })
      localStorage.setItem(this.KEY, JSON.stringify(list))
      return ditambah
    },

    // Hapus item dari daftar belanja berdasarkan id
    hapus: function (id) {
      var list = this.getAll()
      var numId = Number(id)
      list = list.filter(function (item) {
        return Number(item.id) !== numId
      })
      localStorage.setItem(this.KEY, JSON.stringify(list))
    },

    // Kosongkan seluruh daftar belanja
    clear: function () {
      localStorage.setItem(this.KEY, JSON.stringify([]))
    },

    // Cek apakah item sudah ada di daftar belanja
    cek: function (id) {
      return this.getAll().some(function (item) {
        return Number(item.id) === Number(id)
      })
    }
  }
})()
