/**
 * @description 用户关系 sevice
 * @author 郭蓼
 */

 
 const {User,UserRelation}=require('../db/model/index')
 const {formatUser}=require('./_format')
 const Sequelize=require('sequelize')

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
                 followerId,//通过followerId查询出所有的userId,然后在通过userId找到用户信息，这个对应的是User.hansMany(UserRelation,外键是userId),
                 userId:{
                     [Sequelize.Op.ne]:followerId
                 }
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

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
 async function getFollowersByUser(userId){
     const result=await UserRelation.findAndCountAll({
         order:[
             ['id','desc']
         ],
         include:[
             {
                 model:User,
                 attributes:['id','userName','nickName','picture']
             }
         ],
         where:{
            userId,//通过userId查询出所有的followerId,再通过followerId找到用户信息，命中的是UserRelation.belongsTo(User)的关系，它的外键是followerId
            followerId:{
                [Sequelize.Op.ne]:userId
            }
         }
     })
     let userList=result.rows.map(row=>row.dataValues)
     userList=userList.map(item=>{
         let user=item.user
         user=user.dataValues
         user=formatUser(user)
         return user
     })
     return {
         count:result.count,
         userList
     }
 }

 /**
  * 添加关注关系
  * @param {number} userId 当前用户id
  * @param {number} followerId 被关注人id
  */
 async function addFollower(userId,followerId){
     const result=await UserRelation.create({
         userId,
         followerId
     })
     return result.dataValues
 }

 /**
  * 删除关注关系
  * @param {number} userId 当前用户id
  * @param {number} followerId 要被取消关注人id
  */
 async function deleteFollower(userId,followerId){
     const result =await UserRelation.destroy({
         where:{
             userId,
             followerId
         }
     })
     return result>0
 }

 module.exports={
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
 }