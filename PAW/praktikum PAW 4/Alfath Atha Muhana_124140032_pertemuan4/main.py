"""
Program Utama Pengguna Modul math_operations
Nama: Alfath Atha Muhana
NIM: 124140032
"""

# Cara Import 1
import math_operations

# Cara Import 2
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

def main():
    print("--- Demonstrasi Modul math_operations ---\n")

    # Pengujian Geometri menggunakan import cara 1
    s = 10
    p, l = 8, 5
    r = 7

    print("[ Geometri ]")
    print(f"Persegi (s={s}):")
    print(f"  Luas     : {math_operations.luas_persegi(s)}")
    print(f"  Keliling : {math_operations.keliling_persegi(s)}")
    
    print(f"Persegi Panjang (p={p}, l={l}):")
    print(f"  Luas     : {math_operations.luas_persegi_panjang(p, l)}")
    print(f"  Keliling : {math_operations.keliling_persegi_panjang(p, l)}")
    
    print(f"Lingkaran (r={r}, PI={math_operations.PI}):")
    print(f"  Luas     : {math_operations.luas_lingkaran(r):.2f}")
    print(f"  Keliling : {math_operations.keliling_lingkaran(r):.2f}")

    # Pengujian Konversi Suhu menggunakan import cara 2
    temp_c = 25
    print("\n[ Konversi Suhu ]")
    print(f"Suhu: {temp_c} Celsius")
    print(f"  Fahrenheit : {celsius_ke_fahrenheit(temp_c)} F")
    print(f"  Kelvin     : {celsius_ke_kelvin(temp_c)} K")

if __name__ == "__main__":
    main()
