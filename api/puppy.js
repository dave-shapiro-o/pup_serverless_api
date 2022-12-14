module.exports = (req, res) => {
    if(req.method === 'GET'){
        const resultsUrl = req.query.url;
  const puppeteer = require("puppeteer");

  async function getVideoUrl() {
    const browser = await puppeteer.launch(
      {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    }
    );
    const page = await browser.newPage();
    await page.goto(resultsUrl, { timeout: 0, waitUntil: "networkidle0" });

    const title = await page.title();
    const [url] = await page.evaluate(() => 
      Array.from(document.querySelectorAll('a[href*="www.youtube.com/watch?v="]'), element => element.href));

    return url ? url : `No useful results found in search: ${title}`;
  }
  getVideoUrl().then((videoUrl) => {
    res.send(`{"videoUrl": "${videoUrl}"}`);
  });

        // res.json([
        //     {url: "https://www.youtube.com/watch?v=BhArBPtW6Ms"}
        // ])
    }else {
        res.send("Das is verboten!!")
    }
}