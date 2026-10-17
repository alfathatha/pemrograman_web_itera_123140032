/* ==========================================================================
   Mini POS Kantin Kampus
   Fitur: validasi form, kalkulator (subtotal, diskon, kembalian),
   manajemen keranjang dengan localStorage.
   ========================================================================== */

// ---------- Konstanta ----------
const STORAGE_KEY = "miniPosKeranjang";
const MIN_PANJANG_NAMA = 3;
const MIN_HARGA = 500;
const MIN_QTY = 1;
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 0.1;
const KODE_PROMO = "HEMAT10";

// ---------- State ----------
let keranjang = muatKeranjang();

// ---------- Referensi elemen DOM ----------
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama-barang");
const inputHarga = document.getElementById("harga-barang");
const inputQty = document.getElementById("qty-barang");
const errorNama = document.getElementById("error-nama");
const errorHarga = document.getElementById("error-harga");
const errorQty = document.getElementById("error-qty");

const isiKeranjang = document.getElementById("isi-keranjang");
const elTotalBelanja = document.getElementById("total-belanja");
const elNominalDiskon = document.getElementById("nominal-diskon");
const elTotalAkhir = document.getElementById("total-akhir");
const elKembalian = document.getElementById("kembalian");
const elStatusBayar = document.getElementById("status-bayar");
const elInfoDiskon = document.getElementById("info-diskon");
const inputKodePromo = document.getElementById("kode-promo");
const inputUangBayar = document.getElementById("uang-bayar");
const btnReset = document.getElementById("btn-reset");

const PESAN_INFO_DISKON =
  "Diskon 10% otomatis untuk belanja minimal Rp 50.000, atau gunakan kode HEMAT10.";

// ==========================================================================
// UTILITAS
// ==========================================================================

/** Format angka ke Rupiah, contoh: 15000 menjadi "Rp 15.000". */
function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toLocaleString("id-ID");
}

// ==========================================================================
// LOCALSTORAGE
// ==========================================================================

/** Memuat keranjang dari localStorage (JSON.parse) dengan pengecekan data. */
function muatKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item) =>
        item &&
        typeof item.nama === "string" &&
        Number.isFinite(item.harga) &&
        Number.isInteger(item.qty)
    );
  } catch (error) {
    console.error("Gagal memuat keranjang:", error);
    return [];
  }
}

/** Menyimpan keranjang ke localStorage (JSON.stringify). */
function simpanKeranjang() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
  } catch (error) {
    console.error("Gagal menyimpan keranjang:", error);
  }
}

// ==========================================================================
// VALIDASI FORM
// ==========================================================================

function tampilkanError(input, elError, pesan) {
  elError.textContent = pesan;
  input.classList.add("invalid");
}

function bersihkanError() {
  [
    [inputNama, errorNama],
    [inputHarga, errorHarga],
    [inputQty, errorQty],
  ].forEach(([input, elError]) => {
    elError.textContent = "";
    input.classList.remove("invalid");
  });
}

/**
 * Memvalidasi seluruh input form.
 * @returns {{valid: boolean, data: object|null}}
 */
function validasiForm() {
  bersihkanError();
  let valid = true;

  const nama = inputNama.value.trim();
  const hargaMentah = inputHarga.value.trim();
  const qtyMentah = inputQty.value.trim();
  const harga = Number(hargaMentah);
  const qty = Number(qtyMentah);

  // Nama barang: wajib, minimal 3 karakter
  if (nama === "") {
    tampilkanError(inputNama, errorNama, "Nama barang wajib diisi.");
    valid = false;
  } else if (nama.length < MIN_PANJANG_NAMA) {
    tampilkanError(inputNama, errorNama, `Nama barang minimal ${MIN_PANJANG_NAMA} karakter.`);
    valid = false;
  }

  // Harga: wajib angka, minimal Rp 500
  if (hargaMentah === "" || !Number.isFinite(harga)) {
    tampilkanError(inputHarga, errorHarga, "Harga wajib diisi dengan angka.");
    valid = false;
  } else if (harga < MIN_HARGA) {
    tampilkanError(inputHarga, errorHarga, `Harga minimal ${formatRupiah(MIN_HARGA)}.`);
    valid = false;
  }

  // Qty: wajib bilangan bulat minimal 1
  if (qtyMentah === "" || !Number.isFinite(qty)) {
    tampilkanError(inputQty, errorQty, "Jumlah wajib diisi dengan angka.");
    valid = false;
  } else if (!Number.isInteger(qty)) {
    tampilkanError(inputQty, errorQty, "Jumlah harus berupa bilangan bulat.");
    valid = false;
  } else if (qty < MIN_QTY) {
    tampilkanError(inputQty, errorQty, `Jumlah minimal ${MIN_QTY}.`);
    valid = false;
  }

  return { valid, data: valid ? { nama, harga, qty } : null };
}

// ==========================================================================
// KALKULATOR
// ==========================================================================

/** Subtotal satu baris = harga satuan x qty. */
function hitungSubtotal(item) {
  return item.harga * item.qty;
}

/** Total belanja = jumlah seluruh subtotal. */
function hitungTotalBelanja() {
  return keranjang.reduce((total, item) => total + hitungSubtotal(item), 0);
}

/**
 * Menghitung diskon. Diskon 10% berlaku jika total >= Rp 50.000
 * ATAU kode promo HEMAT10 valid. Keduanya tidak ditumpuk.
 */
function hitungDiskon(totalBelanja) {
  const promoValid = inputKodePromo.value.trim().toUpperCase() === KODE_PROMO;
  const diskonOtomatis = totalBelanja >= BATAS_DISKON;
  const berhak = totalBelanja > 0 && (promoValid || diskonOtomatis);

  return {
    nominal: berhak ? totalBelanja * PERSEN_DISKON : 0,
    promoValid,
    diskonOtomatis,
  };
}

// ==========================================================================
// RENDER TAMPILAN
// ==========================================================================

function renderTabel() {
  isiKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.className = "empty";
    td.textContent = "Keranjang masih kosong. Tambahkan barang melalui form.";
    tr.appendChild(td);
    isiKeranjang.appendChild(tr);
    return;
  }

  keranjang.forEach((item, index) => {
    const tr = document.createElement("tr");

    const kolom = [
      { teks: index + 1 },
      { teks: item.nama },
      { teks: formatRupiah(item.harga), kelas: "num" },
      { teks: item.qty, kelas: "num" },
      { teks: formatRupiah(hitungSubtotal(item)), kelas: "num" },
    ];

    kolom.forEach(({ teks, kelas }) => {
      const td = document.createElement("td");
      td.textContent = teks; // textContent mencegah injeksi HTML
      if (kelas) td.className = kelas;
      tr.appendChild(td);
    });

    const tdAksi = document.createElement("td");
    const btnHapus = document.createElement("button");
    btnHapus.type = "button";
    btnHapus.className = "btn btn-hapus";
    btnHapus.textContent = "Hapus";
    btnHapus.addEventListener("click", () => hapusBarang(index));
    tdAksi.appendChild(btnHapus);
    tr.appendChild(tdAksi);

    isiKeranjang.appendChild(tr);
  });
}

function renderRingkasan() {
  const totalBelanja = hitungTotalBelanja();
  const { nominal, promoValid, diskonOtomatis } = hitungDiskon(totalBelanja);
  const totalAkhir = totalBelanja - nominal;

  elTotalBelanja.textContent = formatRupiah(totalBelanja);
  elNominalDiskon.textContent = nominal > 0 ? "- " + formatRupiah(nominal) : formatRupiah(0);
  elTotalAkhir.textContent = formatRupiah(totalAkhir);

  // Informasi status diskon
  elInfoDiskon.classList.remove("aktif");
  if (nominal > 0) {
    elInfoDiskon.classList.add("aktif");
    elInfoDiskon.textContent = promoValid
      ? "Kode promo HEMAT10 aktif: diskon 10%."
      : "Diskon 10% aktif karena belanja mencapai Rp 50.000.";
  } else if (inputKodePromo.value.trim() !== "" && !promoValid) {
    elInfoDiskon.textContent = "Kode promo tidak valid.";
  } else {
    elInfoDiskon.textContent = PESAN_INFO_DISKON;
  }

  renderPembayaran(totalAkhir);
}

function renderPembayaran(totalAkhir) {
  const mentah = inputUangBayar.value.trim();
  elStatusBayar.className = "status";

  if (keranjang.length === 0) {
    elKembalian.textContent = formatRupiah(0);
    elStatusBayar.textContent = "";
    return;
  }

  if (mentah === "" || !Number.isFinite(Number(mentah))) {
    elKembalian.textContent = formatRupiah(0);
    elStatusBayar.textContent = "Masukkan nominal uang bayar.";
    return;
  }

  const uangBayar = Number(mentah);
  const kembalian = uangBayar - totalAkhir;

  if (kembalian < 0) {
    elKembalian.textContent = formatRupiah(0);
    elStatusBayar.textContent = `Uang belum mencukupi. Kurang ${formatRupiah(Math.abs(kembalian))}.`;
    elStatusBayar.classList.add("bad");
  } else {
    elKembalian.textContent = formatRupiah(kembalian);
    elStatusBayar.textContent = "Pembayaran mencukupi.";
    elStatusBayar.classList.add("ok");
  }
}

/** Render ulang seluruh tampilan dan sinkronkan ke localStorage. */
function perbarui() {
  simpanKeranjang();
  renderTabel();
  renderRingkasan();
}

// ==========================================================================
// AKSI KERANJANG
// ==========================================================================

function tambahBarang(event) {
  event.preventDefault();

  const { valid, data } = validasiForm();
  if (!valid) return; // barang tidak masuk keranjang

  keranjang.push(data);
  formBarang.reset(); // form otomatis di-reset
  inputNama.focus();
  perbarui();
}

function hapusBarang(index) {
  keranjang.splice(index, 1);
  perbarui(); // total, diskon, dan kembalian terhitung ulang
}

function resetTransaksi() {
  if (keranjang.length > 0 && !confirm("Kosongkan keranjang dan mulai transaksi baru?")) {
    return;
  }
  keranjang = [];
  localStorage.removeItem(STORAGE_KEY);
  formBarang.reset();
  bersihkanError();
  inputKodePromo.value = "";
  inputUangBayar.value = "";
  perbarui();
}

// ==========================================================================
// EVENT LISTENER & INISIALISASI
// ==========================================================================

formBarang.addEventListener("submit", tambahBarang);
inputKodePromo.addEventListener("input", renderRingkasan);
inputUangBayar.addEventListener("input", renderRingkasan);
btnReset.addEventListener("click", resetTransaksi);

// Hapus pesan error saat pengguna mulai memperbaiki input
[
  [inputNama, errorNama],
  [inputHarga, errorHarga],
  [inputQty, errorQty],
].forEach(([input, elError]) => {
  input.addEventListener("input", () => {
    elError.textContent = "";
    input.classList.remove("invalid");
  });
});

perbarui();
