
const allowCors = fn => async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

const handler = (req, res) => {
    if(req.method === 'GET'){
  const puppeteer = require("puppeteer");

  async function getVideoUrl() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const query = req.query.url;

    await page.goto(`https://www.google.com/search?q=${query}&biw=1410&bih=715&tbm=vid`, 
    { timeout: 0, waitUntil: "networkidle0" });

    // const content = await (await page.$$eval('a', (El) => El.map((el) => el.getAttribute('href'))))
    // ;
    const content = await page.$$eval(".LC20lb", els => 
      els
      .map(e => ({title: e.innerText, link: e.parentNode.href}))
      .filter(e => e.link.includes ('www.youtube.com/watch?v='))
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
module.exports = allowCors(handler)
