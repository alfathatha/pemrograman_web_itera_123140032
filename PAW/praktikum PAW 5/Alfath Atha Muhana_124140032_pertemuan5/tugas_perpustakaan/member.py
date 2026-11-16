class Member:
    """Class untuk menyimpan data anggota perpustakaan."""
    def __init__(self, member_id, name):
        self._member_id = member_id
        self._name = name

    def get_info(self):
        return f"Anggota ID: {self._member_id} | Nama: {self._name}"
