/**
 * @description service user
 * @author 郭蓼
 */

 const {User}=require('../db/model/index')//引用创建的模型
 const {formatUser}=require('./_format')



 /**
  * 获取用户信息
  * @param {string} userName 用户名
  * @param {string} password 用户密码
  */
 async function getUserInfo(userName,password){
     //查询条件
     const whereOpt={
         userName
     }
     if(password){//如果有passwird就把它加到查询条件中来
         Object.assign(whereOpt,{password})
     }

     //查询
     const result=await User.findOne({
         attributes:['id','userName','nickName','city','picture'],
         where:whereOpt
     })

     if(result == null){
         //未找到
         return result
     }
     //格式化
     const formatRes=formatUser(result.dataValues)

     return formatRes
 }

 /**
  * 创建用户
  * @param {string} userName 
  * @param {string} password 
  * @param {number} gender 
  * @param {string} nickName 
  */
 async function createUser({userName,password,gender=3,nickName}){
     const result=await User.create({
         userName,
         password,
         gender,
         nickName:nickName?nickName:userName
     })
     return result.dataValues
 }

 module.exports={
     getUserInfo,
     createUser
 }