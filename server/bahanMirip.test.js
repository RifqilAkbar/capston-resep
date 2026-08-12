import test from 'node:test'
import assert from 'node:assert/strict'
import { bahanMirip, kecocokan, leven, normalisasiNama } from './bahanMirip.js'

const BAHAN = ['Kacang Tolo', 'Cabai Rawit Merah', 'Bawang Putih', 'Tomat']

test('normalisasiNama merapikan teks', () => {
  assert.equal(normalisasiNama('  Cabai    RAWIT Merah! '), 'cabai rawit merah')
  assert.equal(normalisasiNama('kacang tholo'), 'kacang tholo')
})

test('leven menghitung jarak edit', () => {
  assert.equal(leven('tolo', 'tholo'), 1)
  assert.equal(leven('tolo', 'merah'), 5)
})

test('bahanMirip menangkap varian ejaan', () => {
  assert.equal(bahanMirip('Kacang tholo', BAHAN), 'Kacang Tolo')
  assert.equal(bahanMirip('kacang tolo', BAHAN), 'Kacang Tolo')
})

test('bahanMirip menangkap urutan kata berbeda', () => {
  assert.equal(bahanMirip('cabai merah rawit', BAHAN), 'Cabai Rawit Merah')
})

test('bahanMirip mengizinkan bahan yang beda', () => {
  assert.equal(bahanMirip('Bayam', BAHAN), null)
  assert.equal(bahanMirip('Kacang Panjang', BAHAN), null)
})

test('kecocokan membedakan eksak vs mirip vs unik', () => {
  assert.deepEqual(kecocokan('kacang tolo', BAHAN), { tipe: 'eksak', nama: 'Kacang Tolo' })
  assert.deepEqual(kecocokan('Kacang tholo', BAHAN), { tipe: 'mirip', nama: 'Kacang Tolo' })
  assert.deepEqual(kecocokan('cabai merah rawit', BAHAN), { tipe: 'mirip', nama: 'Cabai Rawit Merah' })
  assert.equal(kecocokan('Bayam', BAHAN), null)
})

test('kecocokan menerima baris objek { nama_bahan }', () => {
  const baris = BAHAN.map((nama_bahan) => ({ nama_bahan }))
  assert.deepEqual(kecocokan('kacang tholo', baris), { tipe: 'mirip', nama: 'Kacang Tolo' })
  assert.equal(kecocokan('Bayam', baris), null)
})