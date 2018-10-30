var echarts = require("echarts");
var myChart = echarts.init(document.getElementById("main"),"walden");

var option = {
  title: {
    text: "co2oc.com 最近7天浏览量"
  },
  tooltip: {},
  legend: {
    data: ["浏览量"]
  },
  xAxis: {
    data: ["7天前", "6天前", "5天前", "4天前", "3天前", "昨天", "今天"]
  },
  yAxis: {},
  series: [
    {
      name: "浏览量",
      type: "bar",
      data: [5, 4, 10, 25, 17, 32, 16]
    }
  ]
};

myChart.setOption(option);


