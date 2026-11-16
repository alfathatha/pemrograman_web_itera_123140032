from library_item import Book, Magazine
from library import Library

def main():
    # Inisialisasi perpustakaan
    my_library = Library()

    # Tambah item (Buku dan Majalah)
    book1 = Book(101, "Pemrograman Python", "Guido van Rossum")
    book2 = Book(102, "OOP dalam Java", "James Gosling")
    mag1 = Magazine(201, "National Geographic", "Nov 2026")
    mag2 = Magazine(202, "Tech World", "Edisi Khusus AI")

    print("--- Inisialisasi Data ---")
    my_library.tambah_item(book1)
    my_library.tambah_item(book2)
    my_library.tambah_item(mag1)
    my_library.tambah_item(mag2)

    # Ubah status salah satu item menggunakan property setter
    book1.is_borrowed = True

    # Tampilkan katalog
    my_library.tampilkan_katalog()

    # Cari item
    my_library.cari_item("Python")
    my_library.cari_item("201")
    my_library.cari_item("Non-existent")

if __name__ == "__main__":
    main()
