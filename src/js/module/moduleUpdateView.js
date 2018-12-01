import { setSessionStorage } from "./moduleFunctions";
import { vb,dataString } from "./variables";
export {
  handleWeather,
  handlePrice,
  handleUSDPrice,
  handleNews,
  handleHistory
};


// 页面载入时设置"时间进度"和"日期"
let date = new Date();
(() => {
  // 设置时间进度
  const currentYear = date.getFullYear();
  const initialYear = new Date(currentYear, 0, 1);
  let yearProgress = Math.floor(
      (((date - initialYear) / (1000 * 60 * 60 * 24)) * 100) / 365
    ),
    monthProgress = Math.floor((date.getDate() / date.getMonthDays()) * 100),
    weekProgress = Math.floor((date.getDay() / 7) * 100);
  dataString.yearProgressElem.innerText = yearProgress + "%";
  dataString.yearProgressBar.style.width = yearProgress + "%";
  dataString.monthProgressElem.innerText = monthProgress + "%";
  dataString.monthProgressBar.style.width = monthProgress + "%";
  dataString.weekProgressElem.innerText = weekProgress + "%";
  dataString.weekProgressBar.style.width = weekProgress + "%";

  // 设置日期
  dataString.date.innerHTML = (() => {
    let today = "";
    today += date.getDateParam(".");
    today += "<span>" + vb.weekday[date.getDay()] + "</span>";
    return today;
  })();
})();

// 处理天气请求
function handleWeather(res, origin = "local") {
  let weatherFl, weatherCond, weatherPcpn;
  if (origin == "remote") {
    let weatherRes = res,
      weatherCurrent = weatherRes.HeWeather5[0],
      weatherNow = weatherCurrent.now;
    weatherFl = weatherNow.fl + "° ";
    weatherCond = weatherNow.cond.txt;
    weatherPcpn = weatherNow.pcpn + "%";
    setSessionStorage("weather", [weatherFl, weatherCond, weatherPcpn]);
    console.log("[info] 远端数据");
  } else {
    let localWeatherRes = res;
    weatherFl = localWeatherRes[0];
    weatherCond = localWeatherRes[1];
    weatherPcpn = localWeatherRes[2];
    console.log("[info] 本地数据");
  }

  weather.innerHTML = weatherFl;
  for (let i = 0; i < vb.weatherDescription.length; i++) {
    if (vb.weatherDescription[i].chinese == weatherCond) {
      weather.innerHTML += vb.weatherDescription[i].english + " ";
      break;
    }
    if (i == vb.weatherDescription.length) {
      weather.innerHTML += weatherCond + " ";
    }
  }
  weather.innerHTML += weatherPcpn;
  weather.innerHTML += "<span>" + vb.weatherCity + "</span>";
}

// 处理货币走势
function handlePrice(res) {
  let priceData = res.data,
    priceDataCache,
    priceBTC = [],
    priceETH = [],
    priceBCH = [],
    priceTotal = [];
  for (let i = 0; i < priceData.length; i++) {
    priceDataCache = priceData[i].quote.CNY;
    switch (priceData[i].symbol) {
      case "BTC":
        //priceBTC=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[0] = [
          "BTC",
          priceDataCache.price.toFixed(0),
          priceDataCache.percent_change_24h
        ];
        break;
      case "BCH":
        //priceBCH=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[1] = [
          "BCH",
          priceDataCache.price.toFixed(0),
          priceDataCache.percent_change_24h
        ];
        break;
      case "ETH":
        //priceETH=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[2] = [
          "ETH",
          priceDataCache.price.toFixed(0),
          priceDataCache.percent_change_24h
        ];
        break;
      case "LTC":
        //priceETH=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[3] = [
          "LTC",
          priceDataCache.price.toFixed(0),
          priceDataCache.percent_change_24h
        ];
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < priceTotal.length; i++) {
    switch (priceTotal[i][0]) {
      case "BTC":
        dataString.BTCPrice.innerText = priceTotal[i][1];
        dataString.BTCPercent.innerText = priceTotal[i][2] + "%";
        if (priceTotal[i][2] < 0) {
          dataString.BTCPercent.previousElementSibling.classList.add(
            "icon-caret-down-solid"
          );
          dataString.BTCPercent.parentElement.classList.add("d--color-danger");
        } else {
          dataString.BTCPercent.parentElement.classList.add("d--color-success");
        }
        break;

      case "BCH":
        dataString.BCHPrice.innerText = priceTotal[i][1];
        dataString.BCHPercent.innerText = priceTotal[i][2] + "%";
        if (priceTotal[i][2] < 0) {
          dataString.BCHPercent.previousElementSibling.classList.add(
            "icon-caret-down-solid"
          );
          dataString.BCHPercent.parentElement.classList.add("d--color-danger");
        } else {
          dataString.BCHPercent.parentElement.classList.add("d--color-success");
        }
        break;

      case "ETH":
        dataString.ETHPrice.innerText = priceTotal[i][1];
        dataString.ETHPercent.innerText = priceTotal[i][2] + "%";
        if (priceTotal[i][2] < 0) {
          dataString.ETHPercent.previousElementSibling.classList.add(
            "icon-caret-down-solid"
          );
          dataString.ETHPercent.parentElement.classList.add("d--color-danger");
        } else {
          dataString.ETHPercent.parentElement.classList.add("d--color-success");
        }
        break;
      // case "LTC":
      //   dataString.LTCPrice.innerText = priceTotal[i][1];
      //   dataString.LTCPercent.innerText = priceTotal[i][2] + "%";
      //   if (priceTotal[i][2] < 0) {
      //     dataString.LTCPercent.previousElementSibling.classList.add(
      //       "icon-caret-down-solid"
      //     );
      //     dataString.LTCPercent.parentElement.classList.add("d--color-danger");
      //   } else {
      //     dataString.LTCPercent.parentElement.classList.add("d--color-success");
      //   }
      //   break;
      default:
        break;
    }
  }
}

// 处理美元汇率
function handleUSDPrice(res) {
  let usdPriceYesterday = res.USD_CNY[vb.usdPriceStartDate];
  let usdPriceToday = res.USD_CNY[vb.usdPriceEndDate];
  let usdPricePercent = (usdPriceToday - usdPriceYesterday) / usdPriceToday;
  if (usdPricePercent < 0) {
    dataString.USDPercent.previousElementSibling.classList.add(
      "icon-caret-down-solid"
    );
    dataString.USDPercent.parentElement.classList.add("d--color-danger");
  } else {
    dataString.USDPercent.parentElement.classList.add("d--color-success");
  }
  dataString.USDPercent.innerText = usdPricePercent.toFixed(4) + "%";
  dataString.USDPrice.innerText = usdPriceToday.toFixed(2);
}

// 处理新闻
function handleNews(res) {
  let news = res.news;
  let newsElem = "";
  // 只显示7条新闻
  for (let i = 0; i < 7; i++) {
    newsElem +=
      '<a class="m-weight1__item" target="_blank"  href="' +
      news[i].link +
      '">' +
      (i + 1) +
      ". " +
      news[i].title +
      "</a>";
  }
  dataString.newsContainer.innerHTML = newsElem;
}

// 处理历史上的今天
function handleHistory(res) {
  let history = res.data;
  let historyElem = "";
  for (let i = 0; i < history.length; i++) {
    historyElem +=
      '<p class="m-weight1__item">' +
      history[i].year +
      " " +
      history[i].title +
      "</p>";
    if (i == 5) break;
  }
  dataString.historyContainer.innerHTML = historyElem;
}
