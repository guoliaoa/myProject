/**
 * @description 首页 创建微博
 * @author 郭蓼
 */

const {createBlog,getFollowersBlogList}=require('../services/blog')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {createBlogFailInfo}=require('../model/ErrorInfo')
const xss=require('xss')
const {PAGE_SIZE}=require('../conf/constant')
 /**
  * 创建微博
  * @param {Object} param0 创建微博需要传递的参数{userId,content,image}
  */
 async function create({userId,content,image}){
     //调用service
     try{
         //创建微博
        const blog= await createBlog({
             userId,
             content:xss(content),
             image
         })
         return new SuccessModel(blog)
     } catch(ex){
         console.error(ex.message,ex.stack)
         return new ErrorModel(createBlogFailInfo)
     }
 }

 /**
  * 获取首页微博列表
  * @param {number} userId 
  * @param {number} pageIndex 
  */
 async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
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

 module.exports={
     create,
     getHomeBlogList
 }