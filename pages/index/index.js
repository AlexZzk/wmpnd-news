//index.js
const typeList = {
  "国内": "guonei",
  "国际": "guoji",
  "财经": "caijing",
  "娱乐": "yule",
  "军事": "junshi",
  "体育": "tiyu",
  "其它": "keji",
}
//获取应用实例
const app = getApp()
Page({
  data: {
    news_title:["国内","国际","财经","娱乐","军事","体育","其它"],
    news_list:[],
    activeIndex:'0'
  },
  onPullDownRefresh: function () {
    console.log("下拉刷新");
    this.getTempNews(() => {
      wx.stopPullDownRefresh();
    });
  },
  getTempNews(callBack){
    var that = this;
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index',
      data: {
        key: '53e2fcd492c11160441a6412b00e379f',
        type: that.data.news_title[that.data.activeIndex]
      },
      success(res) {
        console.log(res.data);
        let forecast_list = [];
        let news_item = res.data.result.data;
        for (let i = 0; i < news_item.length; i++) {
          forecast_list.push({
            title: news_item[i].title,
            date: news_item[i].date,
            img_url: news_item[i].thumbnail_pic_s,
            news_src: news_item[i].author_name,
            link_url: news_item[i].url,
          })
        }
        that.setData({
          news_list: forecast_list
        })
        callBack && callBack();
      }
    })
  },
  onLoad: function () {
    this.getTempNews();
  },
  itemclick : function(event) {
    var that = this;
    var index;
    var tempObj = event.currentTarget.dataset;
    index = tempObj.index;
    that.setData({
      activeIndex: index
    })
    var eventType = event.currentTarget.dataset.item;
    console.log("点击了" + event.currentTarget.dataset.item);
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index',
      data: {
        key: '53e2fcd492c11160441a6412b00e379f',
        type: typeList[eventType]
      },
      success(res) {
        console.log(res.data);
        let forecast_list = [];
        let news_item = res.data.result.data;
        for (let i = 0; i < news_item.length; i++) {
          forecast_list.push({
            title: news_item[i].title,
            date: news_item[i].date,
            img_url: news_item[i].thumbnail_pic_s,
            news_src: news_item[i].author_name,
            link_url: news_item[i].url,
          })
        }
        that.setData({
          news_list: forecast_list
        })
      }
    })
  },
  newsOnclick:function(event){
    wx.navigateTo({
      url: "../../pages/jump/jump?link_url="+event.currentTarget.dataset.item
    })
    console.log(event.currentTarget.dataset.item);
  }
})
