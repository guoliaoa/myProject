/**
 * @description 首页 创建微博
 * @author 郭蓼
 */

const {createBlog}=require('../services/blog')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {createBlogFailInfo}=require('../model/ErrorInfo')
const xss=require('xss')
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

 module.exports={
     create
 }