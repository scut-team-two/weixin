// miniprogram/pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
      id:1,
      nickname:"NANGO",
      userAvatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/ceHMaibqQR3crLBTv5RsrnQux6FRq6XU0ZkibXIqd2NSFCEoVl2cJFAx7j2d0IBN2cpqJHEEusQLT40xFkYkGRpw/132",
      text:"12312312312312312312312"
      },
      {
        id:2,
        nickname:"NANGO",
        userAvatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/ceHMaibqQR3crLBTv5RsrnQux6FRq6XU0ZkibXIqd2NSFCEoVl2cJFAx7j2d0IBN2cpqJHEEusQLT40xFkYkGRpw/132",
        text:"123"
      },
      {
        id:3,
        nickname:"NANGO",
        userAvatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/ceHMaibqQR3crLBTv5RsrnQux6FRq6XU0ZkibXIqd2NSFCEoVl2cJFAx7j2d0IBN2cpqJHEEusQLT40xFkYkGRpw/132",
        text:"123"
      }


    ]
    

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
    // let nickname =app.globalData.nickname
    // let userAvatarUrl=app.globalData.userAvatarUrl
    // //console.log(userAvatarUrl,nickname)
    // this.setData({
    //   nickname:nickname,
    //   userAvatarUrl:userAvatarUrl
    // })

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