// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdetail:{},
    height:"520",
    id:""
  },
delete:function(){

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id:options.id
    })
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
        that.setData({
          listdetail:res.result.data[0],
          height:height
        })
        //console.log(that.data.listdetail)
      },
      fail: console.error
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