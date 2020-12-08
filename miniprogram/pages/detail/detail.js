const app = getApp()
var util = require('../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdetail:{},
    commentlist:[{
      detail:"还没有评论哦"
    }],
    id:"",
    height:"",
    height_1:"",
   
    openid:"",
    comment:"",
    nickname:""
    
  },
  delete:function(e){
    console.log(e.currentTarget.id)
    let id = e.currentTarget.id
    wx.cloud.callFunction({
      //删帖子
      name: 'delete',
      data: {
        id: id,
      },

    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
    wx.cloud.callFunction({
      //删评论
      name: 'deleteComment',
      data: {
        id: id,
      },

    }).then(res => {
      wx.switchTab({
        url: '../list/list',
      })
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
    
},
  follow:function(){
},
getTime(){
  var time = util.formatTime(new Date());
  //console.log(time)
  return time
},
//提交表单
  formSubmit: function (e){
    //console.log(e.detail.value)
    let that =this
    let comment=e.detail.value.comment
    let nickname=app.globalData.nickname
    let userAvatarUrl=app.globalData.userAvatarUrl
    let time=that.getTime()
    let id=this.data.id

    const db = wx.cloud.database()
        db.collection("t_comment").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        tiezi:id,
        nickname:nickname,
        userAvatarUrl:userAvatarUrl,
        time:time,
        detail:comment, 
        
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        //清空输入框
        that.setData({
          input:""
        })
        console.log(res)
        
      },    
    })
  },
  //获取评论
  getComment:function(){
    
    let that = this
    const db = wx.cloud.database()
    db.collection('t_comment').where({
      tiezi: that.data.id,
    })
    .get({
      success: function(res) {
        if(res.data.length>0){
          let list = res.data.reverse()
          that.setData({
            commentlist:list
          })
        }
        
        //console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.id)
    that.setData({
      openid:app.globalData.openid,
      id:options.id
    })

   //获取帖子的详细信息
    wx.cloud.callFunction({
      // 云函数名称
      name: 'findlist',
      // 传给云函数的参数
      data: {
        id: options.id,
      },
      success: function(res) {
        //console.log(res.result)
        let length = res.result.data[0].detail.length
        //动态wxss参数
        let height =480+40*(length/22)
        let height_1=250+40*(length/22)
        
        that.setData({
          listdetail:res.result.data[0],
          height:height,
          height_1:height_1
        })
        //console.log(that.data.listdetail)
      },
      fail: console.error
    })
    //获取评论
        that.getComment()
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
    this.getComment()
    wx.stopPullDownRefresh()
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

  }
})