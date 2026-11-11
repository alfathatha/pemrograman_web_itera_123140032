"""
Program Pengelolaan Data Nilai Mahasiswa
Nama: Alfath Atha Muhana
NIM: 124140032
"""

def hitung_grade(nilai):
    """
    Menentukan grade berdasarkan nilai akhir.
    :param nilai: Nilai akhir mahasiswa (float)
    :return: Grade huruf (string)
    """
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

def main():
    # Data Mahasiswa
    mahasiswa_list = [
        {"nama": "Alfath Atha Muhana", "nim": "124140032", "nilai_uts": 85, "nilai_uas": 88, "nilai_tugas": 90},
        {"nama": "M hanif", "nim": "124140001", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
        {"nama": "Refin Agus Saputra", "nim": "124140015", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 55},
        {"nama": "Arrayan Ihfanul Faqih", "nim": "124140022", "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 40},
        {"nama": "Raka Putra Ariel", "nim": "124140040", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75}
    ]

    # Proses perhitungan nilai akhir dan grade
    for mhs in mahasiswa_list:
        # Nilai Akhir = (30% * UTS) + (40% * UAS) + (30% * Tugas)
        akhir = (0.3 * mhs["nilai_uts"]) + (0.4 * mhs["nilai_uas"]) + (0.3 * mhs["nilai_tugas"])
        mhs["nilai_akhir"] = akhir
        mhs["grade"] = hitung_grade(akhir)

    # Tampilkan Tabel
    print(f"{'='*65}")
    print(f"{'Nama':<20} | {'NIM':<10} | {'Nilai Akhir':<12} | {'Grade':<5}")
    print(f"{'='*65}")
    for mhs in mahasiswa_list:
        print(f"{mhs['nama']:<20} | {mhs['nim']:<10} | {mhs['nilai_akhir']:<12.2f} | {mhs['grade']:<5}")
    print(f"{'='*65}")

    # Cari tertinggi dan terendah
    mhs_tertinggi = max(mahasiswa_list, key=lambda x: x["nilai_akhir"])
    mhs_terendah = min(mahasiswa_list, key=lambda x: x["nilai_akhir"])

    print(f"\nMahasiswa Nilai Tertinggi: {mhs_tertinggi['nama']} ({mhs_tertinggi['nilai_akhir']:.2f})")
    print(f"Mahasiswa Nilai Terendah : {mhs_terendah['nama']} ({mhs_terendah['nilai_akhir']:.2f})")

if __name__ == "__main__":
    main()
