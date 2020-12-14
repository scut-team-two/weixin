const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    openid:""
  },
  getmyList(){
    let that = this
    let list_reverse=[]
    let openid= app.globalData.openid
    const db = wx.cloud.database()
    db.collection('t_List').where({
      _openid: openid,
    })
    .get({
      success: function(res) {
          let list = res.data.reverse()
          that.setData({
            list:list
          })
        
        
        //console.log(res.data)
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
    
    
    this.getmyList()

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
    this.getmyList()
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