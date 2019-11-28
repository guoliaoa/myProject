/**
 * @description 微博广场页api
 * @author 郭蓼
 */

 const router=require('koa-router')()
 const {loginCheck}=require('../../middlewares/loginChecks')
 const {getSquareBlogList}=require('../../controller/blog-square')
 const {getBlogLIstStr}=require('../../utils/blog')

 router.prefix('/api/square')

 router.get('/loadMore/:pageIndex',loginCheck,async (ctx,next)=>{
     let {pageIndex}=ctx.params
     pageIndex=parseInt(pageIndex)
     const result=await getSquareBlogList(pageIndex)
     result.data.blogListTpl=await getBlogLIstStr(result.data.blogList)
     ctx.body=result
 })

 module.exports=router