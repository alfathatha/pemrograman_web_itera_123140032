import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({ statusFilter, setStatusFilter, cariText, setCariText }) {
  return (
    <div className="filter-box">
      <input
        type="text"
        placeholder="Cari berdasarkan judul / penulis..."
        value={cariText}
        onChange={(e) => setCariText(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="semua">Semua Status</option>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Baca</option>
        <option value="beli">Ingin Beli</option>
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
  cariText: PropTypes.string.isRequired,
  setCariText: PropTypes.func.isRequired,
};

export default BookFilter;
