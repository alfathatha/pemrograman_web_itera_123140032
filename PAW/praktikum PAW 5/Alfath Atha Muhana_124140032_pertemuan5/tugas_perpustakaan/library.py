class Library:
    """Class untuk mengelola koleksi perpustakaan."""
    def __init__(self):
        self.__koleksi = []  # Private attribute (Encapsulation)

    def tambah_item(self, item):
        """Menambahkan item ke koleksi."""
        self.__koleksi.append(item)
        print(f"Item '{item._title}' berhasil ditambahkan.")

    def tampilkan_katalog(self):
        """Menampilkan semua item (Polymorphism)."""
        print("\n--- Katalog Perpustakaan ---")
        if not self.__koleksi:
            print("Katalog kosong.")
        for item in self.__koleksi:
            print(item.get_detail()) # Polymorphism: get_detail() berperilaku beda tiap subclass

    def cari_item(self, query):
        """Mencari item berdasarkan ID atau Judul."""
        print(f"\nHasil pencarian untuk: '{query}'")
        found = False
        for item in self.__koleksi:
            if query.lower() in item._title.lower() or query == str(item._item_id):
                print(item.get_detail())
                found = True
        if not found:
            print("Item tidak ditemukan.")
