/**
 * @description 个人主页 API
 * @author 郭蓼
 */

 const router=require('koa-router')()
 const {loginCheck}=require('../../middlewares/loginChecks')
 const {getProfileBlogList}=require('../../controller/blog-profile')
 const {getBlogListStr}=require('../../utils/blog')
 const {follow,unFollower}=require('../../controller/user-relation')

 router.prefix('/api/profile')
 //加载更多
 router.get('/loadMore/:userName/:pageIndex',loginCheck,async (ctx,next)=>{
     let {userName,pageIndex}=ctx.params
     pageIndex=parseInt(pageIndex)
     //调用controller
     const result=await getProfileBlogList(userName,pageIndex)
     result.data.blogListTpl=getBlogListStr(result.data.blogList)
     ctx.body=result

 })

 //关注
 router.post('/follow',loginCheck,async (ctx,next)=>{
     const {id:myUserId}=ctx.session.userInfo//我
     const {userId:curUserId}=ctx.request.body//他
     //我来关注他的逻辑controller
     ctx.body=await follow(myUserId,curUserId)

 })

 //取消关注
 router.post('/unFollow',loginCheck,async (ctx,next)=>{
    const {id:myUserId}=ctx.session.userInfo//我
    const {userId:curUserId}=ctx.request.body//他
    //我来取消关注他的逻辑controller
    ctx.body=await unFollower(myUserId,curUserId)
 })

 module.exports=router
