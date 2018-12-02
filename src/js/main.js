import {
  addUrlParam,
  getSessionStorage,
  initialRequest
} from "./module/moduleFunctions";
import {
  handleWeather,
  handlePrice,
  handleUSDPrice,
  handleNews,
  handleHistory,
} from "./module/moduleUpdateView";
import { vb } from "./module/variables";

// 处理天气请求
let starWeatherRequest = function() {
  const weatherUrl = addUrlParam(
    vb.weatherUrlBase,
    ["city", "key"],
    [vb.weatherCity, vb.weatherKey]
  );
  initialRequest(weatherUrl)
    .then(res => {
      console.log("[info] Get weather information succeed.");
      sessionStorage.setItem("requestTime", Date.now());
      handleWeather(res, "remote");
    })
    .catch(error => {
      console.log(error);
      console.log("[error] 重置上次请求时间为0");
      sessionStorage.setItem("requestTime", 0);
    });
};

// 页面载入时判断是否发起天气请求
let lastRequestTime = sessionStorage.getItem("requestTime"),
  restTime = 10, // 请求间隔时间
  intervalTime; // 距离上次请求已过时间
if (lastRequestTime) {
  const now = Date.now();
  intervalTime = (now - lastRequestTime) / (1000 * 60);
  console.log("[info] 距离上次请求: " + intervalTime.toFixed(2) + "  分钟");

  if (intervalTime <= restTime) {
    // 据离上次请求小于"请求间隔时间"，读取 sessionStorage 中的数据
    console.log("[info] 据离上次请求小于 " + restTime + " 分钟");
    handleWeather(getSessionStorage("weather"), "local");
  } else {
    // 据离上次请求大于"请求间隔时间"，发起天气请求
    console.log("[info] 据离上次请求大于 " + restTime + " 分钟");
    starWeatherRequest();
  }
} else {
  starWeatherRequest();
}

// 获取货币走势
(() => {
  const priceUrl = addUrlParam(
    vb.priceUrlBase,
    ["CMC_PRO_API_KEY", "start", "limit", "convert"],
    [vb.priceKey, vb.priceStart, vb.priceLimit, vb.priceConvert]
  );
  initialRequest(priceUrl)
    .then(res => {
      handlePrice(res);
    })
    .catch(error => {
      console.log(error);
    });
})();

// 获取美元汇率
let usdPriceUrl = addUrlParam(
  vb.usdPriceUrlBase,
  ["date", "endDate"],
  [vb.usdPriceStartDate, vb.usdPriceEndDate]
);
(() => {
  initialRequest(usdPriceUrl)
    .then(res => {
      handleUSDPrice(res);
      // console.log(res);
    })
    .catch(error => {
      console.log("[error] " + error);
    });
})();

// 获取新闻
(() => {
  initialRequest(vb.newsUrl)
    .then(res => {
      handleNews(res);
    })
    .catch(error => {
      console.log("[error]" + error);
    });
})();

// 获取历史上的今天
(() => {
  initialRequest(vb.todayInHistoryUrl)
    .then(res => {
      handleHistory(res);
    })
    .catch(error => {
      console.log("[error]" + error);
    });
})();
