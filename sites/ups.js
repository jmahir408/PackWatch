const puppeteer = require("puppeteer");
const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];
const scrape = async (trackingNumber) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: minimal_args,
    userDataDir: "../cache/",
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
  const INVALID_NUMBER = "#stApp_lblInfoNotice";
  let eta;
  let delivered;
  let invalid_number;
  try {
    invalid_number = await page.$eval(INVALID_NUMBER, (el) => el.innerText);
  } catch (e) {
    invalid_number = null;
    console.log("Tracking id assumed to be valid. Skipping invalid selector.")
  }
  console.log(invalid_number);
  if (invalid_number == "Please provide a tracking number." && invalid_number != null) {
    const invalid = "Invalid tracking id!";
    await page.close();
    await browser.close();
    return invalid;
  } else {
    if ((await page.$(ETA)) !== null) {
      await page.waitForSelector(ETA);
      eta = await page.$eval(ETA, (el) => el.innerText);
    } else if ((await page.$(DELIVERED)) !== null) {
      await page.waitForSelector(DELIVERED);
      delivered = await page.$eval(DELIVERED, (el) => el.innerText);
    }

    //array with all info
    const status = [eta, delivered];

    //array with actual defined info
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
  }
};

module.exports = {
  scrape: scrape,
};
