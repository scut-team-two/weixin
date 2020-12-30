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
    nickname:"",

    isfollow:0,
    
    
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
        flag:1,
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

  clickImg:function(e){
    console.log(e.currentTarget.id)
    let imgUrl = e.currentTarget.id
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  

},
getTime(){
  var time = util.formatTime(new Date());
  //console.log(time)
  return time
},

//关注
  follow:function(e){
    let id = e.currentTarget.id
    let openid = app.globalData.openid
    let that = this
    const db = wx.cloud.database()
    if(that.data.isfollow==0){
      db.collection('t_follow').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          tieziID:id
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res) 
          that.setData({
            isfollow:1
          })
        },    
      })
    }
    else{
      db.collection('t_follow').where({
          // 查询条件
          _openid: openid,
          tieziID:id
        })
        .get()
        .then(res => {
          db.collection('t_follow').doc(res.data[0]._id)
          .remove()
          .then(res => {
            // 删除数据成功
            console.log("删除数据成功",res)
            that.setData({
              isfollow:0
            })
          }).catch(err => {
            // 删除数据失败
            console.log(err)
          })

        }).catch(err => {
          // 查询数据失败
          console.log(err)
        })



        
    }
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
       if(e.detail.value.comment!=""){
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
          
          //清空输入框
          that.setData({
            input:""
          })
          console.log(res)
          that.getComment()
          
        },    
      })
    }
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
  //删除评论
  deleteComment:function(e){
    let that = this
    let openid=app.globalData.openid
    console.log(e)
    if(openid==e.currentTarget.dataset.openid){
      wx.showModal({
        title: '提示',
        content: '请问是否删除本条评论？',
        success: function (res) {
          if (res.confirm) {
          console.log(e.currentTarget)
            wx.cloud.callFunction({
              name: 'deleteComment',
              data: {
                flag:0,
                id: e.currentTarget.id,
              },
              success: function (res) {
                console.log("删除评论成功")
                that.getComment()
              }
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let openid = app.globalData.openid
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
      ////////////////////是否关注
      const db = wx.cloud.database()
      db.collection('t_follow').where({
          // 查询条件
          _openid: openid,
          tieziID:options.id
        })
        .get()
        .then(res => {
          if(res.data.length>0){
            console.log("已关注",res)
            that.setData({
              isfollow:1,    
            })
          }
          else{
            console.log("未关注",res)
          }
          
        }).catch(err => {
          // 查询数据失败
          console.log(err)
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