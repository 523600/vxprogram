
var app = getApp()
Page({

  data: {
      question:"",
      ans:"",

  },

 

  show: function (options) {
    
const db = wx.cloud.database()
    var q="",a=""
    db.collection('rengezhangai').where({id:app.globalData.can}).get({
      success: function(res) {
        app.globalData.can++
        // res.data 包含该记录的数据
        q=res.data[0].faq[1].question
        a=res.data[0].faq[1].anwser
        _this.setData({
          question:q,
          ans:a
        });
        console.log(res) 
      }
    }) 
  },
  f:function(e)
  {var that=this
    wx.navigateTo({
      url: '../Q3/8?can='+that.data.can,
    })
  },
})