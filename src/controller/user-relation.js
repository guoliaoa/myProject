/**
 * @description 用户关系 controller
 * @author 郭蓼
 */

 const {getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
}=require('../services/user-relation')
 const {SuccessModel,ErrorModel}=require('../model/ResModel')
 const {addFollowerFailInfo,deleteFollowerFailInfo}=require('../model/ErrorInfo')

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

 /**
  * 根据userid获取关注人列表
  * @param {number} userId 当前登录用户id
  */
 async function getFollowers(userId){
     //service
     const {count,userList}=await getFollowersByUser(userId)
     return new SuccessModel({
         count,
         followersList:userList
     })
 }

 /**
  * 关注
  * @param {number} myUserId 当前登录用户的id
  * @param {number} curUserId 要被关注人的id
  */
 async function follow(myUserId,curUserId){
     //service
     try{
         await addFollower(myUserId,curUserId)
         return new SuccessModel()
     }catch(ex){
         return new ErrorModel(addFollowerFailInfo)
     }
 }

 /**
  * 取消关注
  * @param {number} myUserId 当前登录用户的id
  * @param {number} curUserId 要被取消关注人的id
  */
 async function unFollower(myUserId,curUserId){
     const result=await deleteFollower(myUserId,curUserId)
     if(result){
         return new SuccessModel
     }
     return new ErrorModel(deleteFollowerFailInfo)
 }

 module.exports={
    getFans,
    follow,
    unFollower,
    getFollowers
 }