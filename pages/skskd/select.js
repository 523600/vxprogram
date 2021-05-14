const db = wx.cloud.database({});
Page({
   data:{
        ne:[], 
    }, 
  f1:function(options){
    wx.navigateTo({
      url: '../Q1/6?id=1',
    })
  },
  f2:function(options){
    wx.navigateTo({
      url: '../Q1/6?id=2',
    })
  },
  f3:function(options){
    wx.navigateTo({
      url: '../Q1/6?id=3',
    })
  },
  f4:function(options){
    wx.navigateTo({
      url: '../Q1/6?id=4',
    })
  },
  f5:function(options){
    wx.navigateTo({
      url: '../Q6/11?id=5',
    })
  },
  f6:function(options){
    wx.navigateTo({
      url: '../Q6/11?id=6',
    })
  },
  f7:function(options){
    wx.navigateTo({
      url: '../Q1/6?id=7',
    })
  },
  f8:function(options){
    wx.navigateTo({
      url: '../Q6/11?id=8',
    })
  },
  f9:function(options){
    wx.navigateTo({
      url: '../Q6/11?id=9',
    })
  },
  f10:function(options){
    wx.navigateTo({
      url: '../Q1/6?id=10',
    })
  },
})
