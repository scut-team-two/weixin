// miniprogram/pages/index/index.js
const app = getApp()
Page({

  data: {
   openid:"",
   nickname:""
  },
  //获取用户信息并上传
  getUserInfo:function(e){
    let that=this
    var info = e.detail.userInfo
    console.log(info)
    app.globalData.userAvatarUrl=info.avatarUrl
    app.globalData.nickname=info.nickName
    wx.cloud.callFunction(
      {
      // 需要调用的云函数名
      name: 'openid',
      // 传给云函数的参数
      data: {
       
      },
      success: function(res) {
        app.globalData.openid=res.result.openid
        const db = wx.cloud.database()
        const collection=db.collection("t_account")
         collection.where({
           _openid:res.result.openid,
         }).get().then(res=>{
           //console.log(res)
           if(res.data.length){
             console.log("成功")
           }
           else{
            collection.add({
                data:{
                  nickName:info.nickName,
                  userAvatarUrl:info.avatarUrl
                }
              })
           }
         })
         
      },
      fail: function(err) {
          console.log(err)
      }
    }
    )
    wx.switchTab({
      url: '../list/list',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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