import { useBookContext } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBookContext();
  const statistik = useBookStats(books);

  return (
    <div className="stats-container">
      <h2>Statistik Koleksi Buku</h2>
      
      <div className="kotak-stats">
        <div className="card">
          <h3>Total Buku</h3>
          <p>{statistik.total}</p>
        </div>
        <div className="card">
          <h3>Milik Sendiri</h3>
          <p>{statistik.milik}</p>
        </div>
        <div className="card">
          <h3>Sedang Dibaca</h3>
          <p>{statistik.baca}</p>
        </div>
        <div className="card">
          <h3>Ingin Dibeli</h3>
          <p>{statistik.beli}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
