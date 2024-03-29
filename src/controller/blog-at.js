/**
 * @description 微博 @ 关系 controller
 * @author 郭蓼
 */

 const {getRelationCount,
        getAtUserBlogList,
        updateAtRelation
}=require('../services/at-relation')
 const {SuccessModel}=require('../model/ResModel')
 const {PAGE_SIZE}=require('../conf/constant')

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

 /**
  * 获取 @ 用户 的微博列表
  * @param {number} userId 用户id
  * @param {number} pageIndex 当前页数
  */
 async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * 标记为已读
 * @param {number} userId 用户id
 */
async function markAsRead(userId){
    try{
        await updateAtRelation({newIsRead:true},{userId,isRead:false})
    }catch(ex){
        console.error(ex)
    }
}

 module.exports={
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
 }