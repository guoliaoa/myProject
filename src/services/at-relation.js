/**
 * @description 创建 @ 用户关系 service
 * @author 郭蓼
 */

 const {AtRelation}=require('../db/model/index')
 /**
  * 创建 @ 用户关系
  * @param {number} blogId 微博id
  * @param {number} userId 用户id
  */
 async function createAtRelation(blogId,userId){
     const result=await AtRelation.create({
         blogId,
         userId
     })
     return result.dataValues
 }

 module.exports={
    createAtRelation
 }