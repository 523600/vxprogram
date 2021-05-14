var util = require("../../utils/util.js");

Page({
  data:{
    registBtnTxt:"提交",
    registBtnBgBgColor:"#1CBCB4",
    getSmsCodeBtnTxt:"获取验证码",
    getSmsCodeBtnColor:"#1CBCB4",
    // getSmsCodeBtnTime:60,
    btnLoading:false,
    registDisabled:false,
    smsCodeDisabled:false,
    phoneNum: '',
    re_password:'',
   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
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
    
  },
  getPhoneNum:function(e){
   var value  = e.detail.value;
   this.setData({
    phoneNum: value     
   });
  },
  getPassword:function(e){
    var value  = e.detail.value;
    this.setData({
      re_password: value     
    });
   },
  formSubmit:function(e){
    var param = e.detail.value;
    this.mysubmit(param);
  },
  getsmsCode:function(e){
    var value  = e.detail.value;
    this.setData({
      smsCode: value     
    });
   },
  mysubmit:function (param){
    var num = param.username.trim();
    var flag = this.checkUserName(num)&&this.checkPassword(param)&&this.checkSmsCode(param)
    var that = this;

    if(flag){
       // 数据库查询
       const db = wx.cloud.database()
       var res = db.collection('register').field({number:true}).get().then(
         res =>{
           //对数据库中的手机号进行遍历
           var flag_;
           flag_ = res.data.some(item=>{
             if(item.number == num)
               return true;
           })
           //如果数据库没有这个手机号
          if(!flag_){
             wx.showModal({
               title: '提示',
               showCancel:false,
               content: '该手机尚未注册！'
             });
             return false;
          }else{
            //如果有这个手机号,则成功
              this.setregistData1();
              setTimeout(function(){
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 1500
                });
                that.setregistData2();
                that.redirectTo(param);
              },2000);
              //将手机号记录更新
              db.collection('register').where({
                number:num,
              }).update({
                data: {
                  number:this.data.phoneNum,
                  inputpassword:this.data.re_password,
                }
              })
            }
         }
       )

    } 
  },
  setregistData1:function(){
    this.setData({
      registBtnTxt:"提交中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
  },
  setregistData2:function(){
    this.setData({
      registBtnTxt:"提交",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor:"#ff9900",
      btnLoading:!this.data.btnLoading
    });
  },
  checkUserName:function(num){ 
    var phone = util.regexConfig().phone;
    // var inputUserName = param.username.trim();
    if(phone.test(num)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  // checkPhoneIsRegist:function(phoneNum){
  //     
  //     var email = util.regexConfig().email; 
  //     var phone = util.regexConfig().phone;
  //     var num;
      
  // },
  checkPassword:function(param){
    var userName = param.username.trim();
    var password = param.password.trim();
    if(password.length<=0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请设置新密码'
      });
      return false;
    }else if(password.length<6||password.length>20){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '密码长度为6-20位字符'
      });
      return false;
    }else{
      return true;
    }
  },
  getSmsCode:function(){
    var phoneNum = this.data.phoneNum;
    var inputPassword =this.data.inputPassword;
    var that = this;
    var count = 60;
    
    //按钮60秒计数
    if(this.checkUserName(phoneNum)){
      var si = setInterval(function(){
      if(count > 0){
        count--;
        that.setData({
          getSmsCodeBtnTxt:count+' s',
          getSmsCodeBtnColor:"#999",
          smsCodeDisabled: true
        });
      }else{
        that.setData({
          getSmsCodeBtnTxt:"获取验证码",
          getSmsCodeBtnColor:"#ff9900",
          smsCodeDisabled: false
        });
          count = 60;
          clearInterval(si);
        }
      },1000);
    }

    var number = phoneNum;//手机号码
    
    //调用云函数生成短信验证码
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'createCode',
        number: number,//手机号码
        inputPassword:inputPassword,
        seconds: 300,//验证码有效期(秒)
        length: 4,//验证码位数
        intervalTime: 10 * 1000//两条短信间隔时间(毫秒)，<=0 时无间隔
      }
    }).then((res) => {
      if(res.result.code != 'success'){
        that.showToast(res.result.data);
        return ;
      }
      // that.showToast('验证码:'+res.result.data);
      var captcha = res.result.data;
      var templateParams = [captcha, '5分钟'];
      //调用云函数发送短信
      wx.cloud.callFunction({
        name: 'zhenzisms',
        data: {
          $url: 'send',
          apiUrl: 'https://sms_developer.zhenzikj.com',
          number: number,
          inputPassword:this.data.inputPassword,
          templateId: '3455',
          templateParams: templateParams
        }
      }).then((res) => {
        console.log(res.result);
        if(res.result.code == 0)
          that.showToast('发送成功');
      })
    }).catch((e) => {
      console.log(e);
    });
  },

  checkSmsCode:function(param){
    var smsCode = param.smsCode.trim();
    param = JSON.stringify(param);
    var tempSmsCode = this.data.smsCode;
    // var tempSmsCode = '000000';//演示效果临时变量，正式开发需要通过wx.request获取
    var that = this;
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'validateCode',
        number: this.data.phoneNum,
        code: tempSmsCode,
        inputPassword:this.data.inputPassword
      }
    }).then((res) => {
      that.showToast(res.result.code + ' ' +res.result.data);
      if(res.result.code =="success"){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        });
        // wx.navigateTo({
        //   url: '../main/index?param='+ param, //参数只能是字符串形式，不能为json对象,
        // })
      }
    }).catch((e) => {
      console.log(e);
    });
    if(smsCode!=tempSmsCode){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的短信验证码'
      });
      return false;
    }else{
      return true;
    }
  },




  redirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  },
  showToast: function(title){
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  }


})