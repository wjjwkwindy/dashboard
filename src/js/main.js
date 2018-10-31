let doc = document,
  weatherUrlBase = 'https://free-api.heweather.com/v5/weather',
  weatherKey = '987bc68871c94142ae815b39a1081e63',
  weatherCity = 'chengdu',
  priceUrlBase =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  priceKey = '297fbec3-e209-40f1-9efa-1a067af4e3fe',
  priceStart = 1,
  priceLimit = 4,
  priceConvert = 'CNY',
  newsUrl = 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html',
  weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  weatherDescription = [
    {
      chinese: '阴',
      english: 'cloudy'
    },
    {
      chinese: '多云',
      english: 'partly cloudy'
    },
    {
      chinese: '晴',
      english: 'sunny'
    }
  ],
  dataString = {
    date: doc.getElementById('date'),
    weather: doc.getElementById('weather'),
    yearProgressElem: doc.getElementById('yearProgress'),
    monthProgressElem: doc.getElementById('monthProgress'),
    weekProgressElem: doc.getElementById('weekProgress'),
    USDPrice: doc.getElementById('USD-price'),
    BTCPercent: doc.getElementById('BTC-percent'),
    BCHPercent: doc.getElementById('BCH-percent'),
    ETHPercent: doc.getElementById('ETH-percent'),
    BTCPrice: doc.getElementById('BTC-price'),
    BCHPrice: doc.getElementById('BCH-price'),
    ETHPrice: doc.getElementById('ETH-price')
  };

// 获取某个月份总天数
Date.prototype.getMonthDays = function() {
  var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
  return d.getDate();
};

// 拼接url
function addUrlParam(url, name, value) {
  for (let i = 0; i < name.length; i++) {
    url += url.indexOf('?') == -1 ? '?' : '&';
    url += encodeURIComponent(name[i]) + '=' + encodeURIComponent(value[i]);
  }
  return url;
}

// 存储session字段
function setSessionStorage(key, value) {
  let str = '';
  sessionStorage.removeItem(key);
  for (let i = 0; i < value.length; i++) {
    str += value[i] + '&';
  }
  str = str.slice(0, str.length - 1);
  sessionStorage.setItem(key, str);
}

// 解析session字段
function getSessionStorage(key) {
  let str = sessionStorage.getItem(key);
  return str.split('&');
}

// 初始化请求
function initialRequest(url) {
  console.log('[info] ' + url);

  return new Promise((resolve, reject) => {
    reject(new Error('故意的'));

    let client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
}
// 初始化天气请求
function initialWeatherRequest() {
  const weatherUrl = addUrlParam(
    weatherUrlBase,
    ['city', 'key'],
    [weatherCity, weatherKey]
  );
  console.log('[info] ' + weatherUrl);

  return new Promise((resolve, reject) => {
    const now = Date.now();
    let client = new XMLHttpRequest();
    client.open('GET', weatherUrl);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
}

// 处理天气请求
let starWeatherRequest = function() {
  const weatherUrl = addUrlParam(
    weatherUrlBase,
    ['city', 'key'],
    [weatherCity, weatherKey]
  );
  initialRequest(weatherUrl)
    .then(res => {
      console.log('[info] Get weather information succeed.');
      sessionStorage.setItem('requestTime', Date.now());
      handleWeather(res, 'remote');
    })
    .catch(error => {
      console.log(error);
      console.log('[error] 重置上次请求时间为0');
      sessionStorage.setItem('requestTime', 0);
    });
};

// 设置时间
let date = new Date();
dataString.date.innerHTML = (() => {
  let today = '';
  for (let i = 1; i <= 3; i++) {
    switch (i) {
      case 1:
        today += date.getFullYear() + '.';
        break;
      case 2:
        today += date.getMonth() + 1 + '.';
        break;
      case 3:
        today += date.getDate();
        break;
    }
  }
  today += '<span>' + weekday[date.getDay()] + '</span>';
  return today;
})();

// 页面载入时判断是否发起天气请求
let lastRequestTime = sessionStorage.getItem('requestTime'),
  restTime = 10, // 请求间隔时间
  intervalTime; // 距离上次请求已过时间
if (lastRequestTime) {
  const now = Date.now();
  intervalTime = (now - lastRequestTime) / (1000 * 60);
  console.log('[info] 距离上次请求: ' + intervalTime.toFixed(2) + '  分钟');

  if (intervalTime <= restTime) {
    // 据离上次请求小于"请求间隔时间"，读取 sessionStorage 中的数据
    console.log('[info] 据离上次请求小于 ' + restTime + ' 分钟');
    handleWeather(getSessionStorage('weather'), 'local');
  } else {
    // 据离上次请求大于"请求间隔时间"，发起天气请求
    console.log('[info] 据离上次请求大于 ' + restTime + ' 分钟');
    starWeatherRequest();
  }
} else {
  starWeatherRequest();
}

// 处理天气请求
function handleWeather(res, origin = 'local') {
  let weatherFl, weatherCond, weatherPcpn;
  if (origin == 'remote') {
    let weatherRes = res,
      weatherCurrent = weatherRes.HeWeather5[0],
      weatherNow = weatherCurrent.now;
    weatherFl = weatherNow.fl + '° ';
    weatherCond = weatherNow.cond.txt;
    weatherPcpn = weatherNow.pcpn + '%';
    setSessionStorage('weather', [weatherFl, weatherCond, weatherPcpn]);
    console.log('[info] 远端数据');
  } else {
    let localWeatherRes = res;
    weatherFl = localWeatherRes[0];
    weatherCond = localWeatherRes[1];
    weatherPcpn = localWeatherRes[2];
    console.log('[info] 本地数据');
  }

  weather.innerHTML = weatherFl;
  for (let i = 0; i < weatherDescription.length; i++) {
    if (weatherDescription[i].chinese == weatherCond) {
      weather.innerHTML += weatherDescription[i].english + ' ';
      break;
    }
    if (i == weatherDescription.length) {
      weather.innerHTML += weatherCond + ' ';
    }
  }
  weather.innerHTML += weatherPcpn;
  weather.innerHTML += '<span>' + weatherCity + '</span>';
}

// 初始化货币走势请求
function initialPriceRequest() {
  const priceUrl = addUrlParam(
    priceUrlBase,
    ['CMC_PRO_API_KEY', 'start', 'limit', 'convert'],
    [priceKey, priceStart, priceLimit, priceConvert]
  );
  console.log('[info] ' + priceUrl);

  return new Promise((resolve, reject) => {
    const now = Date.now();
    let client = new XMLHttpRequest();
    client.open('GET', priceUrl);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
}
// 获取货币走势
(() => {
  const priceUrl = addUrlParam(
    priceUrlBase,
    ['CMC_PRO_API_KEY', 'start', 'limit', 'convert'],
    [priceKey, priceStart, priceLimit, priceConvert]
  );
  initialRequest(priceUrl)
    .then(res => {
      handlePrice(res);
    })
    .catch(error => {
      console.log(error);
    });
})();

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
      case 'BTC':
        //priceBTC=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[0] = [
          'BTC',
          priceDataCache.price.toFixed(2),
          priceDataCache.percent_change_24h
        ];
        break;
      case 'BCH':
        //priceBCH=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[1] = [
          'BCH',
          priceDataCache.price.toFixed(2),
          priceDataCache.percent_change_24h
        ];
        break;
      case 'ETH':
        //priceETH=[priceDataCache.price.toFixed(2),priceDataCache.percent_change_24h]
        priceTotal[2] = [
          'ETH',
          priceDataCache.price.toFixed(2),
          priceDataCache.percent_change_24h
        ];
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < priceTotal.length; i++) {
    switch (priceTotal[i][0]) {
      case 'BTC':
        dataString.BTCPrice.innerText = priceTotal[i][1];
        dataString.BTCPercent.innerText = priceTotal[i][2] + '%';
        if (priceTotal[i][2] < 0) {
          dataString.BTCPercent.previousElementSibling.classList.add(
            'arrow-down'
          );
          dataString.BTCPercent.parentElement.classList.add('data-down');
        } else {
          dataString.BTCPercent.parentElement.classList.add('data-up');
        }
        break;

      case 'BCH':
        dataString.BCHPrice.innerText = priceTotal[i][1];
        dataString.BCHPercent.innerText = priceTotal[i][2] + '%';
        if (priceTotal[i][2] < 0) {
          dataString.BCHPercent.previousElementSibling.classList.add(
            'arrow-down'
          );
          dataString.BCHPercent.parentElement.classList.add('data-down');
        } else {
          dataString.BCHPercent.parentElement.classList.add('data-up');
        }
        break;

      case 'ETH':
        dataString.ETHPrice.innerText = priceTotal[i][1];
        dataString.ETHPercent.innerText = priceTotal[i][2] + '%';
        if (priceTotal[i][2] < 0) {
          dataString.ETHPercent.previousElementSibling.classList.add(
            'arrow-down'
          );
          dataString.ETHPercent.parentElement.classList.add('data-down');
        } else {
          dataString.ETHPercent.parentElement.classList.add('data-up');
        }
        break;
      default:
        break;
    }
  }
}

// 获取美元汇率
(() => {
  const usdPriceUrl =
    'http://free.currencyconverterapi.com/api/v3/convert?q=USD_CNY&compact=ultra';
  initialRequest(usdPriceUrl)
    .then(res => {
      handleUSDPrice(res);
    })
    .catch(error => {
      console.log('[error] ' + error);
    });
})();

// 处理美元汇率
function handleUSDPrice(res) {
  let usdPrice = res.USD_CNY.toFixed(2);
  dataString.USDPrice.innerText = usdPrice;
}

// 计算时间进度
const currentYear = date.getFullYear();
const initialYear = new Date(currentYear, 0, 1);
let yearProgress = Math.floor(
    (((date - initialYear) / (1000 * 60 * 60 * 24)) * 100) / 365
  ),
  monthProgress = Math.floor((date.getDate() / date.getMonthDays()) * 100);
weekProgress = Math.floor((date.getDay() / 7) * 100);
yearProgressElem.value = yearProgress;
yearProgressElem.nextElementSibling.innerText = yearProgress + '%';
monthProgressElem.value = monthProgress;
monthProgressElem.nextElementSibling.innerText = monthProgress + '%';
weekProgressElem.value = weekProgress;
weekProgressElem.nextElementSibling.innerText = weekProgress + '%';
