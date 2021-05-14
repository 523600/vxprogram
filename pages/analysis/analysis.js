// pages/analysis/analysis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myanswer:"",
    analysis:"",
    can:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    _this.setData({
      can: options.can,
      myanswer:options.myanswer
    }) 
    const db = wx.cloud.database()
    var ana=""
    db.collection('rengezhangai').where({id:options.can}).get({
      success: function(res) {
        // res.data 包含该记录的数据
        ana=res.data[0].analysis
        _this.setData({
          analysis:ana
        });
        console.log(res) 
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toindex:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  }
})