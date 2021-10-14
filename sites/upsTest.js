const puppeteer = require("puppeteer");

const scrape = async (trackingNumber) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  let url = "https://www.ups.com/WebTracking?loc=en_US&Requester=DAN&tracknum=";
  url += trackingNumber;

  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );

  await page.goto(url);
  const DELIVERED = "#st_App_PkgStsMonthNum";
  await page.waitForSelector(DELIVERED);
  const delivered = await page.$eval(DELIVERED, (el) => el.innerText);

  //array with all info
  const status = [delivered];
  console.log(status[0]);
  await page.close();
  await browser.close();
  return status;
};

scrape("1Z119EA90307662480");
module.exports = {
  scrape: scrape
};