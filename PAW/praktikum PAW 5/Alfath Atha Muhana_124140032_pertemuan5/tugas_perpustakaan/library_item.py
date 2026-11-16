from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """Abstract class dasar untuk item perpustakaan."""
    def __init__(self, item_id, title):
        self._item_id = item_id  # Protected
        self._title = title      # Protected
        self._is_borrowed = False # Encapsulation (Protected)

    @property
    def is_borrowed(self):
        """Property decorator untuk status peminjaman."""
        return self._is_borrowed

    @is_borrowed.setter
    def is_borrowed(self, value):
        self._is_borrowed = value

    @abstractmethod
    def get_detail(self):
        """Method abstract untuk detail item."""
        pass

class Book(LibraryItem):
    """Subclass Buku."""
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.author = author

    def get_detail(self):
        return f"[Buku] ID: {self._item_id} | Judul: {self._title} | Penulis: {self.author} | Status: {'Dipinjam' if self._is_borrowed else 'Tersedia'}"

class Magazine(LibraryItem):
    """Subclass Majalah."""
    def __init__(self, item_id, title, issue):
        super().__init__(item_id, title)
        self.issue = issue

    def get_detail(self):
        return f"[Majalah] ID: {self._item_id} | Judul: {self._title} | Edisi: {self.issue} | Status: {'Dipinjam' if self._is_borrowed else 'Tersedia'}"
