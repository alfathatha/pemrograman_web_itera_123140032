"""
Program Penghitung BMI (Body Mass Index)
Nama: Alfath Atha Muhana
NIM: 124140032
"""

def main():
    # Input data
    print("--- Program Penghitung BMI ---")
    try:
        berat = float(input("Masukkan berat badan (kg): "))
        tinggi = float(input("Masukkan tinggi badan (m): "))
        
        # Hitung BMI
        bmi = berat / (tinggi ** 2)
        
        # Penentuan kategori
        if bmi < 18.5:
            kategori = "Berat badan kurang"
        elif 18.5 <= bmi < 25:
            kategori = "Berat badan normal"
        elif 25 <= bmi < 30:
            kategori = "Berat badan berlebih"
        else:
            kategori = "Obesitas"
            
        # Output hasil
        print(f"\nNilai BMI Anda: {bmi:.2f}")
        print(f"Kategori: {kategori}")
        
    except ValueError:
        print("Error: Harap masukkan angka yang valid.")
    except ZeroDivisionError:
        print("Error: Tinggi badan tidak boleh nol.")

if __name__ == "__main__":
    main()
