import { useState, useEffect } from 'react';

// Hook buatan sendiri untuk simpan data ke local storage
export function useLocalStorage(kunci, nilaiAwal) {
  const [data, setData] = useState(() => {
    const simpanan = localStorage.getItem(kunci);
    if (simpanan) {
      return JSON.parse(simpanan);
    }
    return nilaiAwal;
  });

  useEffect(() => {
    localStorage.setItem(kunci, JSON.stringify(data));
  }, [kunci, data]);

  return [data, setData];
}
