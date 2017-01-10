//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },


  globalData:{
    userInfo:null,
    isDebug:true,
    apiHeadUrl: 'https://api.qxinli.com/api/',//"https://api.qxinli.com/api/",//'http://www.qxinli.com:9001/api/',//todo 增加切换服务器的功能
    qiNiuHeadUrl:"http://static.qxinli.com/",//'http://static.qxinli.com/',
    defaultPageSize:10
  }
})