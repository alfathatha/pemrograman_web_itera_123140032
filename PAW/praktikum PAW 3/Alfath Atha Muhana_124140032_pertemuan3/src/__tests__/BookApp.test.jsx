import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from '../components/BookForm/BookForm';
import BookList from '../components/BookList/BookList';
import BookFilter from '../components/BookFilter/BookFilter';
import { useBookStats } from '../hooks/useBookStats';
import { renderHook } from '@testing-library/react';

describe('Pengujian Aplikasi Manajemen Buku', () => {
  // Test 1: Validasi form jika input kosong
  test('Menampilkan pesan error jika judul dan penulis kosong', () => {
    const mockSubmit = vi.fn();
    render(<BookForm onSubmit={mockSubmit} />);

    const tombolSimpan = screen.getByRole('button', { name: /simpan buku/i });
    fireEvent.click(tombolSimpan);

    expect(screen.getByText('Judul dan Penulis wajib diisi!')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  // Test 2: Form berhasil submit data valid
  test('Berhasil submit form saat input diisi', () => {
    const mockSubmit = vi.fn();
    render(<BookForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(screen.getByLabelText(/nama penulis/i), { target: { value: 'Andrea Hirata' } });
    
    fireEvent.click(screen.getByRole('button', { name: /simpan buku/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      judul: 'Laskar Pelangi',
      penulis: 'Andrea Hirata',
      status: 'milik',
    });
  });

  // Test 3: List buku menampilkan item
  test('Menampilkan list buku dan tombol hapus', () => {
    const dataBuku = [
      { id: 1, judul: 'Bumi Manusia', penulis: 'Pramoedya', status: 'milik' },
    ];
    const mockEdit = vi.fn();
    const mockDelete = vi.fn();

    render(<BookList books={dataBuku} onEdit={mockEdit} onDelete={mockDelete} />);

    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    
    const tombolHapus = screen.getByRole('button', { name: /hapus/i });
    fireEvent.click(tombolHapus);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  // Test 4: Filter berfungsi merespons event
  test('Filter memanggil fungsi perubahan text', () => {
    const mockStatus = vi.fn();
    const mockCari = vi.fn();

    render(
      <BookFilter
        statusFilter="semua"
        setStatusFilter={mockStatus}
        cariText=""
        setCariText={mockCari}
      />
    );

    const inputCari = screen.getByPlaceholderText(/cari berdasarkan/i);
    fireEvent.change(inputCari, { target: { value: 'Bumi' } });
    expect(mockCari).toHaveBeenCalledWith('Bumi');
  });

  // Test 5: Hook statistik menghitung dengan benar
  test('useBookStats menghitung jumlah status buku', () => {
    const daftarBuku = [
      { id: 1, status: 'milik' },
      { id: 2, status: 'baca' },
      { id: 3, status: 'beli' },
    ];

    const { result } = renderHook(() => useBookStats(daftarBuku));

    expect(result.current).toEqual({
      total: 3,
      milik: 1,
      baca: 1,
      beli: 1,
    });
  });
});
