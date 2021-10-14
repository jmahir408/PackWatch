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
  const DELIVERED = "#st_App_PkgStsMonthNum";
  let eta;
  let delivered;

  if ((await page.$(ETA)) !== null) {
    await page.waitForSelector(ETA);
    eta = await page.$eval(ETA, (el) => el.innerText);
    console.log("in eta");
  } else {
    await page.waitForSelector(DELIVERED);
    delivered = await page.$eval(DELIVERED, (el) => el.innerText);
    console.log("in delivered");
  }

  //array with all info
  const status = [eta, delivered];
  let holder = [];

  await page.close();
  await browser.close();
  
  for (let i = 0; i < status.length; i++) {
    if (status[i] != undefined) {
      holder[i] = status[i];
      console.log(holder[i]);
      if (holder.length == 0) {
        holder[0] = "No information found";
      }
    }
  }
  return holder;
};

module.exports = {
  scrape: scrape,
};
