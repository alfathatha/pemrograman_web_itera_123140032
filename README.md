# Mini POS Kantin Kampus (Pertemuan 1: JavaScript Dasar)

## Identitas

| Keterangan | Isi |
| --- | --- |
| Nama Lengkap | **[ISI NAMA LENGKAP]** |
| NIM | 124140032 |
| Kelas Praktikum | **[ISI RA / RB]** |

## Deskripsi Aplikasi

Mini POS Kantin Kampus adalah aplikasi web kasir dan keranjang belanja sederhana untuk kantin atau toko kampus. Kasir memasukkan barang, aplikasi menghitung subtotal, total, diskon, dan kembalian secara otomatis, lalu menyimpan keranjang ke `localStorage` agar tidak hilang saat halaman di-refresh.

Studi kasus: **kasir kantin kampus**. Aplikasi ini menyatukan tiga kompetensi dasar praktikum: validasi input form, perhitungan kalkulator otomatis, dan manajemen keranjang berbasis `localStorage`.

## Panduan Menjalankan

1. Clone repository ini atau unduh sebagai ZIP, lalu ekstrak.
2. Buka folder `atha_124140032_pertemuan1` di VS Code.
3. Pasang ekstensi **Live Server**, klik kanan `index.html`, lalu pilih **Open with Live Server**.
4. Alternatif tanpa Live Server: buka `index.html` langsung di browser (double click).
5. Latihan modul ada di folder `modul/`, mulai dari `modul/index.html`.

## Struktur Folder

```
atha_124140032_pertemuan1/
├── index.html      # Struktur HTML aplikasi
├── style.css       # Styling antarmuka
├── script.js       # Logika JavaScript
├── README.md       # Dokumentasi
├── screenshots/    # Tangkapan layar aplikasi
└── modul/          # Latihan selama praktikum
    ├── index.html
    ├── modul.css
    ├── latihan-1-variabel-kondisional.html
    ├── latihan-2-loop-fungsi.html
    ├── latihan-3-array-objek.html
    └── latihan-4-dom-api.html
```

## Daftar Fitur

**Validasi Form**
- [x] Nama barang wajib diisi, minimal 3 karakter
- [x] Harga satuan wajib angka, minimal Rp 500
- [x] Qty wajib bilangan bulat, minimal 1
- [x] Pesan error merah di bawah input yang salah
- [x] Barang tidak masuk keranjang jika data tidak valid
- [x] Form otomatis di-reset setelah berhasil

**Kalkulator**
- [x] Subtotal per baris (harga x qty)
- [x] Total belanja otomatis
- [x] Diskon 10% otomatis jika total minimal Rp 50.000
- [x] Kode promo `HEMAT10` (diskon 10%, tidak ditumpuk dengan diskon otomatis)
- [x] Total akhir setelah diskon
- [x] Uang bayar, kembalian otomatis, dan keterangan jika uang kurang

**Keranjang dan localStorage**
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi)
- [x] Tombol Hapus per baris dengan perhitungan ulang otomatis
- [x] Penyimpanan persisten dengan `JSON.stringify()` dan `JSON.parse()`
- [x] Tombol Transaksi Baru / Reset (kosongkan keranjang dan `localStorage`)

**Lainnya**
- [x] Format Rupiah dan tampilan responsif (desktop dan mobile)

## Tangkapan Layar

### 1. Form input utama
![Form input utama](screenshots/01-form-input.png)

### 2. Validasi error
![Validasi error](screenshots/02-validasi-error.png)

### 3. Hasil perhitungan kalkulator dan tabel keranjang
![Hasil perhitungan](screenshots/03-hasil-perhitungan.png)

## Penjelasan Teknis Singkat

### 1. Penanganan validasi input
Fungsi `validasiForm()` dipanggil saat form di-submit (`event.preventDefault()` mencegah reload). Fungsi ini membersihkan error lama, lalu memeriksa tiga input: nama (`trim()` dan panjang minimal 3), harga (`Number()`, harus angka dan minimal 500), serta qty (`Number.isInteger()` dan minimal 1). Input yang salah diberi kelas `invalid` dan pesan merah di elemen `<small class="error">`. Fungsi mengembalikan `{ valid, data }`, sehingga `tambahBarang()` hanya memasukkan barang ke keranjang jika `valid === true`, lalu me-reset form.

### 2. Algoritma kalkulator
- `hitungSubtotal(item)` menghitung `harga * qty`.
- `hitungTotalBelanja()` menjumlahkan semua subtotal dengan `reduce()`.
- `hitungDiskon(total)` memberi diskon 10% jika `total >= 50000` atau kode promo `HEMAT10` valid. Diskon tidak ditumpuk.
- Total akhir = total belanja - diskon.
- Kembalian = uang bayar - total akhir. Jika hasilnya negatif, ditampilkan keterangan uang belum mencukupi beserta kekurangannya.
- Semua nilai dihitung ulang oleh `perbarui()` setiap keranjang berubah, dan oleh `renderRingkasan()` setiap kode promo atau uang bayar berubah.

### 3. Mekanisme serialisasi localStorage
Keranjang disimpan sebagai array objek `{ nama, harga, qty }`. Karena `localStorage` hanya menyimpan string, `simpanKeranjang()` memakai `JSON.stringify(keranjang)`, dan `muatKeranjang()` memakai `JSON.parse()` saat halaman dimuat. `muatKeranjang()` dibungkus `try...catch` dan memfilter data agar data rusak tidak membuat aplikasi error. Setiap perubahan (tambah, hapus) memanggil `perbarui()` yang menyimpan ulang data. Tombol reset memanggil `localStorage.removeItem()`.

Teks barang dirender dengan `textContent`, bukan `innerHTML`, sehingga input pengguna tidak dieksekusi sebagai HTML.
