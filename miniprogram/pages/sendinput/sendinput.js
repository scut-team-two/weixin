const app = getApp()
var util = require('../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    detail:"",
    time:"",
    image:"",
    flag:"",
    path:""

  },

  getTitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  getDetail:function(e){
    this.setData({
        detail:e.detail.value
    })
  },
  getTime(){
    var time = util.formatTime(new Date());
    console.log(time)
    return time
  },
  addImage:function(){
    let that = this
      wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
       console.log("选择图片成功",res,res.tempFilePaths[0])
       that.setData({
        path:res.tempFilePaths[0]
       })
      }
    })

   

  },
  sendwithImage:function(){
    let that=this
    let title=this.data.title
    let detail=this.data.detail
    let time=this.getTime()
    let nickname = app .globalData.nickname
    let userAvatarUrl= app.globalData.userAvatarUrl
    console.log(title,detail)
    wx.cloud.uploadFile({
      cloudPath:nickname+ new Date().getTime()+".png",
      filePath:that.data.path,
      success:res=>{
        console.log("上传成功",res.fileID)
        that.setData({
          image:res.fileID
        })
        const db = wx.cloud.database()
        db.collection('t_List').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        nickname:nickname,
        userAvatarUrl:userAvatarUrl,
        time:time,
        title:that.data.title,
        detail:that.data.detail,
        image:that.data.image,
        flag:that.data.flag,  
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
       
      }
      
    })
      },
      fail:console.error
    })

  },
  sendwithText:function(){
    let that=this
    let title=this.data.title
    let detail=this.data.detail
    let time=this.getTime()
    let nickname = app .globalData.nickname
    let userAvatarUrl= app.globalData.userAvatarUrl
    const db = wx.cloud.database()
        db.collection('t_List').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        nickname:nickname,
        userAvatarUrl:userAvatarUrl,
        time:time,
        title:that.data.title,
        detail:that.data.detail,
        image:that.data.image,
        flag:that.data.flag,  
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        
      },    
    })
  },
    
    
  //发表
send:function(){
    if(this.data.path==""){
      this.sendwithText()
      
    }
    else{
      this.sendwithImage()
    }
    wx.switchTab({
      url: '../list/list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.flag)
    this.setData({
      flag:options.flag
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

  }
})