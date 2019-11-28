/**
 * @description 用户关系 controller
 * @author 郭蓼
 */

 const {getUsersByFollower}=require('../services/user-relation')
 const {SuccessModel,ErrorModel}=require('../model/ResModel')

 /**
  * 根据用户id获取粉丝
  * @param {number} userId 用户id
  */
 async function getFans(userId){
     const {count,userList} = await getUsersByFollower(userId)
     return new SuccessModel({
         count,
         fansList:userList
     })
 }

 module.exports={
    getFans
 }