export { vb, dataString };
let butterflyKnife = require('butterfly-knife');
let doc = document;
const vb = {
    weatherUrlBase: "https://free-api.heweather.com/v5/weather",
    weatherKey: "987bc68871c94142ae815b39a1081e63",
    weatherCity: "chengdu",
    priceUrlBase:
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    priceKey: "297fbec3-e209-40f1-9efa-1a067af4e3fe",
    priceStart: 1,
    priceLimit: 7,
    priceConvert: "CNY",
    usdPriceUrlBase:
      "https://free.currencyconverterapi.com/api/v6/convert?q=USD_CNY&compact=ultra",
    usdPriceStartDate: butterflyKnife.getSeparatorDate("-", new Date(Date.now() - 86400000)),
    usdPriceEndDate: butterflyKnife.getSeparatorDate("-", new Date(Date.now())),
    websiteDataUrl: "https://easy-mock.com/mock/5c022c886574b14de00eb66d/dashboard/website_data",
    newsUrl:
      "https://easy-mock.com/mock/5c022c886574b14de00eb66d/dashboard/news#!method=get",
    todayInHistoryUrl:
      "https://easy-mock.com/mock/5c022c886574b14de00eb66d/dashboard/history#!method=get",
    weekday: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    weatherDescription: [
      {
        chinese: "阴",
        english: "cloudy"
      },
      {
        chinese: "多云",
        english: "partly cloudy"
      },
      {
        chinese: "晴",
        english: "sunny"
      }
    ]
  },
  dataString = {
    date: doc.getElementById("date"),
    weather: doc.getElementById("weather"),
    yearProgressElem: doc.getElementById("yearProgress"),
    yearProgressBar: doc.getElementById("yearProgressBar"),
    monthProgressElem: doc.getElementById("monthProgress"),
    monthProgressBar: doc.getElementById("monthProgressBar"),
    weekProgressElem: doc.getElementById("weekProgress"),
    weekProgressBar: doc.getElementById("weekProgressBar"),
    USDPrice: doc.getElementById("USD-price"),
    USDPercent: doc.getElementById("USD-percent"),
    BTCPercent: doc.getElementById("BTC-percent"),
    BTCPrice: doc.getElementById("BTC-price"),
    BCHPercent: doc.getElementById("BCH-percent"),
    BCHPrice: doc.getElementById("BCH-price"),
    ETHPercent: doc.getElementById("ETH-percent"),
    ETHPrice: doc.getElementById("ETH-price"),
    LTCPercent: doc.getElementById("LTC-percent"),
    LTCPrice: doc.getElementById("LTC-price"),
    userRightNow: doc.getElementById("userRightNow"),
    mostViewPage: doc.getElementById("mostViewPage"),
    newsContainer: doc.getElementById("news"),
    historyContainer: doc.getElementById("history")
  };
