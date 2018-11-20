Page({
  data:{
    link_url:''
  },
  onLoad: function (options) {
    this.setData({
      link_url: options.link_url
    })
    console.log("123131");
  }
})