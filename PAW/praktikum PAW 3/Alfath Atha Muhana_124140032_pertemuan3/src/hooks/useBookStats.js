export function useBookStats(daftarBuku = []) {
  // Hitung jumlah manual biar gampang dipahami
  let total = daftarBuku.length;
  let milik = 0;
  let baca = 0;
  let beli = 0;

  daftarBuku.forEach(buku => {
    if (buku.status === 'milik') milik++;
    if (buku.status === 'baca') baca++;
    if (buku.status === 'beli') beli++;
  });

  return { total, milik, baca, beli };
}
