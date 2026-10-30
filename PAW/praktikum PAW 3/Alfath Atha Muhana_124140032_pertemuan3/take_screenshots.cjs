const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  
  // Screenshot Home kosong
  await page.screenshot({ path: 'screenshot_home.png' });

  // Input buku
  await page.fill('#judul', 'Laskar Pelangi');
  await page.fill('#penulis', 'Andrea Hirata');
  await page.selectOption('#status', 'milik');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(500);

  // Input buku kedua
  await page.fill('#judul', 'Bumi Manusia');
  await page.fill('#penulis', 'Pramoedya Ananta Toer');
  await page.selectOption('#status', 'baca');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(500);

  // Screenshot dengan data buku
  await page.screenshot({ path: 'screenshot_list_buku.png' });

  // Pindah ke halaman Statistik
  await page.click('text=Statistik');
  await page.waitForTimeout(1000);

  // Screenshot halaman Statistik
  await page.screenshot({ path: 'screenshot_stats.png' });

  console.log('Semua screenshot berhasil dibuat!');
  await browser.close();
})();
