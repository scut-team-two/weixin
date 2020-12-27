// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  if(event.flag==1){
    try {
      return await db.collection('t_comment').where({
        tiezi:event.id
      }).remove()
    } catch(e) {
      console.error(e)
    }
  }
  else{
    try {
      return await db.collection('t_comment').where({
        _id:event.id
      }).remove()
    } catch(e) {
      console.error(e)
    }
  }
}