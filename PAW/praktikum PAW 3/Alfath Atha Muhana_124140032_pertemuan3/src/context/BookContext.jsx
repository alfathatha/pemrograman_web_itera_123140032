import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export function BookProvider({ children }) {
  // Panggil custom hook local storage
  const [books, setBooks] = useLocalStorage('buku_saya', []);

  // Tambah buku baru
  const addBook = (newBook) => {
    const bukuBaru = { ...newBook, id: Date.now() };
    setBooks([...books, bukuBaru]);
  };

  // Edit buku
  const editBook = (id, updatedData) => {
    const bukuBaru = books.map(buku => {
      if (buku.id === id) {
        return { ...buku, ...updatedData };
      }
      return buku;
    });
    setBooks(bukuBaru);
  };

  // Hapus buku
  const deleteBook = (id) => {
    const sisaBuku = books.filter(buku => buku.id !== id);
    setBooks(sisaBuku);
  };

  return (
    <BookContext.Provider value={{ books, addBook, editBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBookContext = () => useContext(BookContext);
