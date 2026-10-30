import { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  const { books, addBook, editBook, deleteBook } = useBookContext();

  const [bukuYangDieedit, setBukuYangDiedit] = useState(null);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [cariText, setCariText] = useState('');

  // Fungsi saat form disubmit (tambah atau edit)
  const handleSimpan = (dataBuku) => {
    if (bukuYangDieedit) {
      editBook(bukuYangDieedit.id, dataBuku);
      setBukuYangDiedit(null);
    } else {
      addBook(dataBuku);
    }
  };

  // Filter dan pencarian buku sederhana
  const bukuDitampilkan = books.filter((buku) => {
    const sesuaiStatus = statusFilter === 'semua' || buku.status === statusFilter;
    const sesuaiCari = 
      buku.judul.toLowerCase().includes(cariText.toLowerCase()) ||
      buku.penulis.toLowerCase().includes(cariText.toLowerCase());
    
    return sesuaiStatus && sesuaiCari;
  });

  return (
    <div className="home-container">
      <h2>Halaman Utama - Daftar Buku</h2>
      
      {/* Form Input Buku */}
      <BookForm onSubmit={handleSimpan} initialData={bukuYangDieedit} />

      {/* Filter dan Pencarian */}
      <BookFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        cariText={cariText}
        setCariText={setCariText}
      />

      {/* List Buku */}
      <BookList
        books={bukuDitampilkan}
        onEdit={(buku) => setBukuYangDiedit(buku)}
        onDelete={deleteBook}
      />
    </div>
  );
}

export default Home;
