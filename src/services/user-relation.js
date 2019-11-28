/**
 * @description 用户关系 sevice
 * @author 郭蓼
 */

 
 const {User,UserRelation}=require('../db/model/index')
 const {formatUser}=require('./_format')

 /**
  * 获取关注该用户的用户列表 ,通过被关注人的id,来获取有多少人关注了这个人，此列表就是这个被关注人粉丝列表
  * @param {number} followerId 被关注人的id
  */
 async function getUsersByFollower(followerId){
     const result=await User.findAndCountAll({
         attributes:['id','userName','nickName','picture'],
         order:[
             ['id','desc']
         ],
         include:{
             model:UserRelation,
             where:{
                 followerId
             }
         }
     })
     //result.count 总数
     //result.rows  结果 数组

     //格式化信息
     let userList=result.rows.map(row=>row.dataValues)
     userList=formatUser(userList)

     return {
         count:result.count,
         userList
     }
 }

 module.exports={
    getUsersByFollower
 }