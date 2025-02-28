const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('Script started'); // Added log
    const url = process.argv[2];
    if (!url) {
      throw new Error('Please provide a URL as the first argument');
    }

    // Generate a file name using the current timestamp.
    const fileName = `captures/${new Date().toISOString().replace(/[:.]/g, '-')}.jpeg`;

    // Construct the file path relative to the project root location.
    const filePath = path.join(__dirname, fileName);

    console.log(`File path generated: ${filePath}`); // Added log

    // Launch a headless Chrome instance.
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome-stable', 
      headless: true,
      args: ['--ignore-certificate-errors', '--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Browser launched'); // Added log
    const page = await browser.newPage();

    // Navigate to the desired URL.
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log(`Navigated to URL: ${url}`); // Added log

    const element = await page.$('.frame');
    await element.screenshot({ path: filePath });

    console.log(`Screenshot saved as ${filePath}`);

    // Close the browser instance.
    await browser.close();
    console.log('Browser closed'); // Added log

    // Return the file name
    console.log(filePath);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  }
})();
