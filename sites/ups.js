const puppeteer = require("puppeteer");

const scrape = async (trackingNumber) => {
  const browser = await puppeteer.launch({
    headless: true,
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
  const ETA = "#st_App_PkgStsTimeDayMonthNum";
  await page.waitForSelector(ETA);
  const eta = await page.$eval(ETA, (el) => el.innerText);

  //array with all info
  const status = [eta];
  await page.close();
  await browser.close();
  return status;
};

module.exports = {
  scrape: scrape
};
