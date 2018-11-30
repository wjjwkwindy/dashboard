// 最近7天浏览量
var echarts = require("echarts");
var viewIn7Days = echarts.init(document.getElementById("view_in_7days"),"walden");
var viewByBrowers = echarts.init(document.getElementById("view_by_browers"),"walden");

var viewIn7DaysOption = {
  title: {
    text: "co2oc.com 最近7天浏览量"
  },
  tooltip: {},
  legend: {
    data: ["浏览量"]
  },
xAxis: {
    type: 'category',
    data: ["7天前", "6天前", "5天前", "4天前", "3天前", "昨天", "今天"]
},
yAxis: {
    type: 'value'
},
series: [{
    data: [5, 4, 10, 25, 17, 32, 16],
    type: 'line',
    smooth: true
}]
};

// 浏览量分类
var viewByBrowersOption = {
  // title : {
  //     text: '某站点用户访问来源',
  //     subtext: '纯属虚构',
  //     x:'center'
  // },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
},
// legend: {
//     orient: 'vertical',
//     x: 'left',
//     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
// },
series: [
    {
        name:'访问来源',
        type:'pie',
        radius: ['60%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data:[
            {value:30, name:'Chrome'},
            {value:23, name:'Mobile'},
            {value:15, name:'Firefox'},
            {value:7, name:'Edge'},
            {value:1, name:'IE'}
        ]
    }
]
};

viewIn7Days.setOption(viewIn7DaysOption);
viewByBrowers.setOption(viewByBrowersOption);