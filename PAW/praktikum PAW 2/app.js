// Alamat API cuaca (Open-Meteo) untuk daerah ITERA
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true';

// Class untuk satu data tugas
class TaskItem {
  constructor(title, deadline, category) {
    this.id = Date.now();
    this.title = title;
    this.deadline = deadline;
    this.category = category;
    this.done = false;
  }
}

// Class utama untuk mengelola aplikasi
class DashboardApp {
  constructor() {
    this.tasks = [];
    this.loadTasks();
  }

  // Ambil data dari localStorage
  loadTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    }
  }

  // Simpan data ke localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Tambah tugas baru
  addTask(title, deadline, category) {
    const task = new TaskItem(title, deadline, category);
    this.tasks = [...this.tasks, task];
    this.update();
  }

  // Ubah judul tugas
  editTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    const newTitle = prompt('Ubah nama tugas:', task.title);
    if (newTitle) {
      this.tasks = this.tasks.map((item) => (item.id === id ? { ...item, title: newTitle } : item));
      this.update();
    }
  }

  // Tandai selesai / belum selesai
  toggleTask(id) {
    this.tasks = this.tasks.map((item) => (item.id === id ? { ...item, done: !item.done } : item));
    this.update();
  }

  // Hapus tugas
  deleteTask(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.update();
  }

  // Simpan lalu tampilkan ulang
  update() {
    this.saveTasks();
    this.render();
  }

  // Ambil data cuaca (fungsi asinkron)
  async loadWeather() {
    const weatherElement = document.getElementById('weather');
    try {
      const response = await fetch(WEATHER_URL);
      const data = await response.json();
      const { temperature, windspeed } = data.current_weather;
      weatherElement.textContent = `Cuaca ITERA: ${temperature}°C, angin ${windspeed} km/jam`;
    } catch (error) {
      weatherElement.textContent = 'Cuaca gagal dimuat';
    }
  }

  // Tampilkan semua tugas ke halaman
  render() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    this.tasks.forEach(({ id, title, deadline, category = 'Kuliah', done }) => {
      const li = document.createElement('li');
      if (done) {
        li.classList.add('done');
      }
      li.innerHTML = `
        <input type="checkbox" ${done ? 'checked' : ''} onchange="app.toggleTask(${id})">
        <div class="info">
          <strong>${title}</strong><br>
          <small>${category} | Tenggat: ${deadline || 'tidak ada'}</small>
        </div>
        <button onclick="app.editTask(${id})">Ubah</button>
        <button onclick="app.deleteTask(${id})">Hapus</button>
      `;
      list.appendChild(li);
    });

    let finished = 0; // let: nilainya bertambah
    this.tasks.forEach((task) => {
      if (task.done) finished++;
    });
    document.getElementById('summary').textContent = `Selesai ${finished} dari ${this.tasks.length} tugas`;
  }
}

// Jalankan aplikasi
const app = new DashboardApp();
app.render();
app.loadWeather();

// Event untuk form tambah tugas
document.getElementById('taskForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const deadline = document.getElementById('deadline').value;
  const category = document.getElementById('category').value;
  app.addTask(title, deadline, category);
  event.target.reset();
});