/**
 * @description 微博首页API
 * @author 郭蓼
 */

 const router=require('koa-router')()
 const {loginCheck}=require('../../middlewares/loginChecks')
 const {create}=require('../../controller/blog-home')
 const blogValidate=require('../../validator/blog')
 const {genValidator}=require('../../middlewares/validator')

 router.prefix('/api/blog')

 //创建微博
 router.post('/create',loginCheck,genValidator(blogValidate),async (ctx,next)=>{
     const {content,image}=ctx.request.body
     const {id:userId}=ctx.session.userInfo//从session中获取当前登录用户的信息
     ctx.body=await create({userId,content,image})
 })

 module.exports=router