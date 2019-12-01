/**
 * @description 微博首页API
 * @author 郭蓼
 */

 const router=require('koa-router')()
 const {loginCheck}=require('../../middlewares/loginChecks')
 const {create}=require('../../controller/blog-home')
 const blogValidate=require('../../validator/blog')
 const {genValidator}=require('../../middlewares/validator')
 const {getHomeBlogList}=require('../../controller/blog-home')
 const {getBlogListStr}=require('../../utils/blog')

 router.prefix('/api/blog')

 //创建微博
 router.post('/create',loginCheck,genValidator(blogValidate),async (ctx,next)=>{
     const {content,image}=ctx.request.body
     const {id:userId}=ctx.session.userInfo//从session中获取当前登录用户的信息
     ctx.body=await create({userId,content,image})
 })

 //加载更多
 router.get('/loadMore/:pageIndex',loginCheck,async (ctx,next)=>{
     let {pageIndex}=ctx.params
     pageIndex=parseInt(pageIndex)
     const {id:userId}=ctx.session.userInfo
     const result=await getHomeBlogList(userId,pageIndex)
     //渲染模板
     result.data.blogListTpl=getBlogListStr(result.data.blogList)
     ctx.body=result
 })

 module.exports=router