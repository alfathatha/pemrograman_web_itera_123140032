import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="app">
          <nav className="navigasi">
            <h1>Aplikasi Buku Pribadi</h1>
            <div>
              <Link to="/">Home</Link> | <Link to="/stats">Statistik</Link>
            </div>
          </nav>

          <div className="konten">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;
