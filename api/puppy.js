module.exports = (req, res) => {
    if(req.method === 'GET'){
  const puppeteer = require("puppeteer-core");

  async function getVideoUrl() {
    // const browser = await puppeteer.launch()
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      })
    const page = await browser.newPage();
    const query = req.query.url;

    await page.goto(`https://www.google.com/search?q=${query}&biw=1410&bih=715&tbm=vid`, 
    { timeout: 0, waitUntil: "networkidle0" });

    // const content = await (await page.$$eval('a', (El) => El.map((el) => el.getAttribute('href'))));
    const content = await page.$$eval(".LC20lb", els => 
      els.map(e => ({title: e.innerText, link: e.parentNode.href}))
    );
    const link = content[0].link
    // const [url] = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('a[href*="www.youtube.com/watch?v="]'), element => element.href));
    return link ? link : `No useful results found in search: ${title}`;
  }
  getVideoUrl().then((videoUrl) => {
    res.send(`{"videoUrl": "${videoUrl}"}`);
  });
    }else {
        res.send("Das is verboten!!")
    }

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }
}