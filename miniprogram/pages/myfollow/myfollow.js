// miniprogram/pages/myfollow/myfollow.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    
  },
  getmyfollow(){
    let that = this
    let openid = app.globalData.openid
    let list=[]
    wx.cloud.callFunction({
      name:"Findfollow",
      success(res){
        console.log("success",res)
        for (let i = 0; i < res.result.list.length; i++) {
          
          if(res.result.list[i]._openid==openid){
            //console.log("find!")
            list.push(res.result.list[i].followDetail[0])
          }
          else{
            console.log("notfind!")
          }
        }
        list.reverse()
        //console.log(list)
        that.setData({
          list:list
        })
        
      },
      fail(err){
        console.log("fail",err)
      }
    })
  },
  gotoDetail:function(e){
    //console.log(e)
    let id=e.currentTarget.id
    //console.log(id)
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    this.getmyfollow()

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
    this.getmyfollow()
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