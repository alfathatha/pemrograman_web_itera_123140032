const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Asumsi aplikasi running di 5173
  await page.goto('http://localhost:5173');
  
  // Tunggu sejenak agar konten ter-render
  await page.waitForTimeout(2000); 
  
  // Screenshot
  await page.screenshot({ path: 'screenshot_home.png' });
  console.log('Screenshot saved: screenshot_home.png');
  
  await browser.close();
})();
