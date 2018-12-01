export {
  addUrlParam,
  setSessionStorage,
  getSessionStorage,
  initialRequest
};

// 获取某个月份总天数
Date.prototype.getMonthDays = function() {
  var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
  return d.getDate();
};

// 获取前一天日期
Date.prototype.getDateParam = function(separator) {
  let separateDate = "";
  separateDate += this.getFullYear() + separator;
  separateDate += this.getMonth() + 1 + separator;
  if (this.getDate() < 10) {
    separateDate += "0" + this.getDate();
  } else {
    separateDate += this.getDate();
  }
  return separateDate;
};

// 拼接url
function addUrlParam(url, name, value) {
  for (let i = 0; i < name.length; i++) {
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += encodeURIComponent(name[i]) + "=" + encodeURIComponent(value[i]);
  }
  return url;
}

// 存储session字段
function setSessionStorage(key, value) {
  let str = "";
  sessionStorage.removeItem(key);
  for (let i = 0; i < value.length; i++) {
    str += value[i] + "&";
  }
  str = str.slice(0, str.length - 1);
  sessionStorage.setItem(key, str);
}

// 解析session字段
function getSessionStorage(key) {
  let str = sessionStorage.getItem(key);
  return str.split("&");
}

// 初始化请求
function initialRequest(url) {
  console.log("[info] " + url);

  return new Promise((resolve, reject) => {
    //reject(new Error('故意的'));

    let client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
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
// function initialWeatherRequest() {
//   const weatherUrl = addUrlParam(
//     weatherUrlBase,
//     ["city", "key"],
//     [weatherCity, weatherKey]
//   );
//   console.log("[info] " + weatherUrl);

//   return new Promise((resolve, reject) => {
//     const now = Date.now();
//     let client = new XMLHttpRequest();
//     client.open("GET", weatherUrl);
//     client.onreadystatechange = handler;
//     client.responseType = "json";
//     client.setRequestHeader("Accept", "application/json");
//     client.send();

//     function handler() {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.status === 200) {
//         resolve(this.response);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     }
//   });
// }

// 初始化货币走势请求
// function initialPriceRequest() {
//   const priceUrl = addUrlParam(
//     priceUrlBase,
//     ['CMC_PRO_API_KEY', 'start', 'limit', 'convert'],
//     [priceKey, priceStart, priceLimit, priceConvert]
//   );
//   console.log('[info] ' + priceUrl);

//   return new Promise((resolve, reject) => {
//     const now = Date.now();
//     let client = new XMLHttpRequest();
//     client.open('GET', priceUrl);
//     client.onreadystatechange = handler;
//     client.responseType = 'json';
//     client.setRequestHeader('Accept', 'application/json');
//     client.send();

//     function handler() {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.status === 200) {
//         resolve(this.response);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     }
//   });
// }
