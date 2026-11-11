"""
Modul Matematika Kustom
Nama: Alfath Atha Muhana
NIM: 124140032
"""

# Konstanta
PI = 3.14159

def luas_persegi(sisi):
    """
    Menghitung luas persegi.
    :param sisi: Panjang sisi persegi (float/int)
    :return: Luas persegi (float/int)
    """
    return sisi * sisi

def keliling_persegi(sisi):
    """
    Menghitung keliling persegi.
    :param sisi: Panjang sisi persegi (float/int)
    :return: Keliling persegi (float/int)
    """
    return 4 * sisi

def luas_persegi_panjang(panjang, lebar):
    """
    Menghitung luas persegi panjang.
    :param panjang: Panjang (float/int)
    :param lebar: Lebar (float/int)
    :return: Luas (float/int)
    """
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    """
    Menghitung keliling persegi panjang.
    :param panjang: Panjang (float/int)
    :param lebar: Lebar (float/int)
    :return: Keliling (float/int)
    """
    return 2 * (panjang + lebar)

def luas_lingkaran(jari_jari):
    """
    Menghitung luas lingkaran.
    :param jari_jari: Jari-jari lingkaran (float/int)
    :return: Luas lingkaran (float)
    """
    return PI * (jari_jari ** 2)

def keliling_lingkaran(jari_jari):
    """
    Menghitung keliling lingkaran.
    :param jari_jari: Jari-jari lingkaran (float/int)
    :return: Keliling lingkaran (float)
    """
    return 2 * PI * jari_jari

def celsius_ke_fahrenheit(celsius):
    """
    Konversi temperatur Celsius ke Fahrenheit.
    :param celsius: Suhu Celsius (float/int)
    :return: Suhu Fahrenheit (float)
    """
    return (celsius * 9/5) + 32

def celsius_ke_kelvin(celsius):
    """
    Konversi temperatur Celsius ke Kelvin.
    :param celsius: Suhu Celsius (float/int)
    :return: Suhu Kelvin (float)
    """
    return celsius + 273.15
