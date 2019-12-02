/**
 * @description 微博 @ 关系 controller
 * @author 郭蓼
 */

 const {getRelationCount}=require('../services/at-relation')
 const {SuccessModel}=require('../model/ResModel')

 /**
  * 获取 @ userId用户的微博数量
  * @param {number} userId 用户id
  */
 async function getAtMeCount(userId){
     const count=await getRelationCount(userId)
     return new SuccessModel({
         count
     })
 }

 module.exports={
    getAtMeCount
 }