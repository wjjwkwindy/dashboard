// 最近7天浏览量
import { vb } from "./variables";
import { handleWebsiteData } from "./moduleUpdateView";

var echarts = require("echarts");
let butterflyKnife = require('butterfly-knife');
var viewIn7Days = echarts.init(
  document.getElementById("view_in_7days"),
  "walden"
);
var viewByBrowers = echarts.init(
  document.getElementById("view_by_browers"),
  "walden"
);

var viewIn7DaysOption = {
  title: {
    text: "co2oc.com 最近7天浏览量"
  },
  tooltip: {},
  legend: {
    data: ["浏览量"]
  },
  xAxis: {
    type: "category",
    data: ["7天前", "6天前", "5天前", "4天前", "3天前", "昨天", "今天"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      type: "line",
      smooth: true
    }
  ]
};

// 浏览量分类
var viewByBrowersOption = {
  // title : {
  //     text: '某站点用户访问来源',
  //     subtext: '纯属虚构',
  //     x:'center'
  // },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  // legend: {
  //     orient: 'vertical',
  //     x: 'left',
  //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  // },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["60%", "70%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "15",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 0, name: "Chrome" },
        { value: 0, name: "Mobile" },
        { value: 0, name: "Firefox" },
        { value: 0, name: "Edge" },
        { value: 0, name: "IE" }
      ]
    }
  ]
};

viewIn7Days.setOption(viewIn7DaysOption);
viewByBrowers.setOption(viewByBrowersOption);

(() => {
  butterflyKnife.initialRequest(vb.websiteDataUrl)
    .then(res => {
      handleWebsiteData(res);
      handleEchartsData(res);
    })
    .catch(error => {
      console.log("[error]" + error);
    });
})();

function handleEchartsData(res) {
  let websiteData = res.data[0];
  viewIn7DaysOption.series[0].data = websiteData.websiteView;
  viewByBrowersOption.series[0].data = websiteData.pageViews;
  viewIn7Days.setOption(viewIn7DaysOption);
  viewByBrowers.setOption(viewByBrowersOption);
}