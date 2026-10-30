import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

function BookForm({ onSubmit, initialData }) {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [status, setStatus] = useState('milik');
  
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul);
      setPenulis(initialData.penulis);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input sederhana
    if (judul.trim() === '' || penulis.trim() === '') {
      setPesanError('Judul dan Penulis wajib diisi!');
      return;
    }

    // Kirim data jika valid
    onSubmit({ judul, penulis, status });

    // Reset form
    setJudul('');
    setPenulis('');
    setStatus('milik');
    setPesanError('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>{initialData ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>

      {pesanError && <div className="error-msg">{pesanError}</div>}

      <div className="form-group">
        <label htmlFor="judul">Judul Buku:</label>
        <input
          id="judul"
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Masukkan judul buku"
        />
      </div>

      <div className="form-group">
        <label htmlFor="penulis">Nama Penulis:</label>
        <input
          id="penulis"
          type="text"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          placeholder="Masukkan nama penulis"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="milik">Milik Saya</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <button type="submit" className="btn-simpan">
        {initialData ? 'Update Data' : 'Simpan Buku'}
      </button>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default BookForm;
