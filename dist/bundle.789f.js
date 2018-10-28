/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/normalize.css":
/*!*******************************!*\
  !*** ./src/css/normalize.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/css/normalize.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/style.scss */ \"./src/sass/style.scss\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/normalize.css */ \"./src/css/normalize.css\");\n/* harmony import */ var _css_normalize_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_normalize_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/main.js */ \"./src/js/main.js\");\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconsole.log('[index.js] 这里是打包文件入口-index.js');\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var doc = document,\n    url = 'https://free-api.heweather.com/v5/weather',\n    key = '987bc68871c94142ae815b39a1081e63',\n    city = 'chengdu',\n    weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],\n    weatherDescription = [{\n  chinese: '阴',\n  english: 'cloudy'\n}, {\n  chinese: '多云',\n  english: 'partly cloudy'\n}, {\n  chinese: '晴',\n  english: 'sunny'\n}],\n    dataString = {\n  date: doc.getElementById('date'),\n  weather: doc.getElementById('weather'),\n  yearProgressElem: doc.getElementById('yearProgress'),\n  monthProgressElem: doc.getElementById('monthProgress'),\n  weekProgressElem: doc.getElementById('weekProgress')\n}; // 获取某个月份总天数\n\nDate.prototype.getMonthDays = function () {\n  var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);\n  return d.getDate();\n}; // 拼接url\n\n\nfunction addUrlParam(url, name, value) {\n  for (var i = 0; i < name.length; i++) {\n    url += url.indexOf('?') == -1 ? '?' : '&';\n    url += encodeURIComponent(name[i]) + '=' + encodeURIComponent(value[i]);\n  }\n\n  return url;\n} // 存储session字段\n\n\nfunction setSessionStorage(key, value) {\n  var str = '';\n  sessionStorage.removeItem(key);\n\n  for (var i = 0; i < value.length; i++) {\n    str += value[i] + '&';\n  }\n\n  str = str.slice(0, str.length - 1);\n  sessionStorage.setItem(key, str);\n} // 解析session字段\n\n\nfunction getSessionStorage(key) {\n  var str = sessionStorage.getItem(key);\n  return str.split('&');\n} // 初始化天气请求\n\n\nfunction initialWeatherRequest() {\n  var weatherUrl = addUrlParam(url, ['city', 'key'], [city, key]);\n  console.log('[info] ' + weatherUrl);\n  return new Promise(function (resolve, reject) {\n    var now = Date.now();\n    var client = new XMLHttpRequest();\n    client.open('GET', weatherUrl);\n    client.onreadystatechange = handler;\n    client.responseType = 'json';\n    client.setRequestHeader('Accept', 'application/json');\n    client.send();\n\n    function handler() {\n      if (this.readyState !== 4) {\n        return;\n      }\n\n      if (this.status === 200) {\n        resolve(this.response);\n      } else {\n        reject(new Error(this.statusText));\n      }\n    }\n  });\n} // 处理天气请求\n\n\nvar starWeatherRequest = function starWeatherRequest() {\n  initialWeatherRequest().then(function (res) {\n    console.log('[info] Get weather information succeed.');\n    sessionStorage.setItem('requestTime', Date.now());\n    handleWeather(res, 'remote');\n  }).catch(function (error) {\n    console.log(error);\n  });\n}; // 设置时间\n\n\nvar date = new Date();\n\ndataString.date.innerHTML = function () {\n  var today = '';\n\n  for (var i = 1; i <= 3; i++) {\n    switch (i) {\n      case 1:\n        today += date.getFullYear() + '.';\n        break;\n\n      case 2:\n        today += date.getMonth() + 1 + '.';\n        break;\n\n      case 3:\n        today += date.getDate();\n        break;\n    }\n  }\n\n  today += '<span>' + weekday[date.getDay()] + '</span>';\n  return today;\n}(); // 页面载入时判断是否发起天气请求\n\n\nvar lastRequestTime = sessionStorage.getItem('requestTime'),\n    restTime = 10,\n    // 请求间隔时间\nintervalTime; // 距离上次请求已过时间\n\nif (lastRequestTime) {\n  var now = Date.now();\n  intervalTime = (now - lastRequestTime) / (1000 * 60);\n  console.log('[info] 距离上次请求: ' + intervalTime.toFixed(2) + '  分钟');\n\n  if (intervalTime <= restTime) {\n    // 据离上次请求小于\"请求间隔时间\"，读取 sessionStorage 中的数据\n    console.log('[info] 据离上次请求小于 ' + restTime + ' 分钟');\n    handleWeather(getSessionStorage('weather'), 'local');\n  } else {\n    // 据离上次请求大于\"请求间隔时间\"，发起天气请求\n    console.log('[info] 据离上次请求大于' + restTime + '分钟');\n    starWeatherRequest();\n  }\n} else {\n  starWeatherRequest();\n} // 处理天气请求\n\n\nfunction handleWeather(res) {\n  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';\n  var weatherFl, weatherCond, weatherPcpn;\n\n  if (origin == 'remote') {\n    var weatherRes = res,\n        weatherCurrent = weatherRes.HeWeather5[0],\n        weatherNow = weatherCurrent.now;\n    weatherFl = weatherNow.fl + '° ';\n    weatherCond = weatherNow.cond.txt;\n    weatherPcpn = weatherNow.pcpn + '%';\n    setSessionStorage('weather', [weatherFl, weatherCond, weatherPcpn]);\n    console.log('[info] 远端数据');\n  } else {\n    var localWeatherRes = res;\n    weatherFl = localWeatherRes[0];\n    weatherCond = localWeatherRes[1];\n    weatherPcpn = localWeatherRes[2];\n    console.log('[info] 本地数据');\n  }\n\n  weather.innerHTML = weatherFl;\n\n  for (var i = 0; i < weatherDescription.length; i++) {\n    if (weatherDescription[i].chinese == weatherCond) {\n      weather.innerHTML += weatherDescription[i].english + ' ';\n      break;\n    }\n\n    if (i == weatherDescription.length) {\n      weather.innerHTML += weatherCond + ' ';\n    }\n  }\n\n  weather.innerHTML += weatherPcpn;\n  weather.innerHTML += '<span>' + city + '</span>';\n} // 计算时间进度\n\n\nvar currentYear = date.getFullYear();\nvar initialYear = new Date(currentYear, 0, 1);\nvar yearProgress = Math.floor((date - initialYear) / (1000 * 60 * 60 * 24) * 100 / 365),\n    monthProgress = Math.floor(date.getDate() / date.getMonthDays() * 100);\nweekProgress = Math.floor(date.getDay() / 7 * 100);\nyearProgressElem.value = yearProgress;\nyearProgressElem.nextElementSibling.innerText = yearProgress + '%';\nmonthProgressElem.value = monthProgress;\nmonthProgressElem.nextElementSibling.innerText = monthProgress + '%';\nweekProgressElem.value = weekProgress;\nweekProgressElem.nextElementSibling.innerText = weekProgress + '%';\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/sass/style.scss?");

/***/ })

/******/ });