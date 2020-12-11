// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//多表联查
exports.main = async (event, context) => {
  return cloud.database().collection("t_follow").aggregate() 
          .lookup({
            from:"t_List", 
            localField: 'tieziID', 
            foreignField: '_id', 
            as: 'followDetail' 
          }).end({
            success:function(res){
              return res;
            },
            fail(error) {
              return error;
            }
          })
}