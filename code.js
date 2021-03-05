const puppeteer = require('puppeteer');

(async () => {
    const browser = puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com.br/');
    await page.screenshot({ path: './Assets/Images/teste.png' });

    await browser.close();
})();