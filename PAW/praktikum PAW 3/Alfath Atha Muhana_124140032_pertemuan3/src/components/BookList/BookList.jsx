import PropTypes from 'prop-types';
import './BookList.css';

function BookList({ books, onEdit, onDelete }) {
  // Kalau buku kosong
  if (books.length === 0) {
    return <p>Daftar buku masih kosong nih.</p>;
  }

  return (
    <div className="book-list">
      {books.map((buku) => (
        <div key={buku.id} className="card-buku">
          <h4>{buku.judul}</h4>
          <p>Penulis: {buku.penulis}</p>
          <p>Status: <strong>{buku.status}</strong></p>
          
          <div className="aksi-btn">
            <button onClick={() => onEdit(buku)}>Edit</button>
            <button onClick={() => onDelete(buku.id)} className="hapus">Hapus</button>
          </div>
        </div>
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
