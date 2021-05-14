//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '开始训练',
    username:''
  },
  //事件处理函数
  toTypeView:function(){
     wx.navigateTo({
      url: '../typeview/typeview'
    })
  },
  tohistory:function(){
    wx.navigateTo({
     url: '../history/history'
   })
 },
  onLoad:function(option){
    // 页面初始化 options为页面跳转所带来的参数
    var param = JSON.parse(option.param); 
    this.setData({
      username:param.username
    });
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})
