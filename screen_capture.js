const puppeteer = require('puppeteer');
const path = require('path');

// Check Node.js version
const [major] = process.versions.node.split('.').map(Number);
if (major < 20) {
  throw new Error('This script requires Node.js version 20 or higher.');
}

(async () => {
  try {
    console.log('Script started');
    const url = process.argv[2];
    if (!url) {
      throw new Error('Please provide a URL as the first argument');
    }
    console.log(`Url is: ${url}`); // Added log

    // Generate a file name using the current timestamp.
    const fileName = `captures/${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;

    // Construct the file path relative to the project root location.
    const filePath = path.join(__dirname, fileName);

    // Launch a headless Chrome instance.
    const browser = await puppeteer.launch({
      // To do tests under linux, add the path:
      // emojis won't look good, but the program can be troubleshoot
      // executablePath: '/usr/bin/google-chrome-stable', 
      headless: true,
      args: ['--ignore-certificate-errors', '--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('Browser launched'); // Added log
    const page = await browser.newPage();
    await page.setViewport({
      width: 800,
      height: 600,
      deviceScaleFactor: 2 // Increase to 2 or 3 for higher DPI
    });


    // Navigate to the desired URL.
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log(`Navigated to URL: ${url}`); // Added log

    // After the js script adjusts font sizes, it will set body.done
    const element = await page.$('.done');

    // This is for testing image capture. It kind of works but doesn't provide nice scaling as pdf does.
    // await element.screenshot({ path: filePath, type: 'jpeg', quality: 100});

    await page.pdf({
      path: filePath,
      format: 'A6',
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0cm',
        right: '0cm',
        bottom: '0cm',
        left: '0cm'
      }
    });

    // Close the browser instance.
    await browser.close();

    // Return the file name
    // NOTE: This needs to be the last log line as it is used by the caller
    // to know the name of the file generated.
    console.log(filePath);
  } catch (error) {
    console.error('Error capturing file:', error);
  }
})();
