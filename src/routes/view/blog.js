/**
 * @description 微博 view 路由
 * @author 郭蓼
 */

 const router=require('koa-router')()

 const {loginRedirect}=require('../../middlewares/loginChecks')
 const {getProfileBlogList}=require('../../controller/blog-profile')
 const {isExist}=require('../../controller/user')
 const {getSquareBlogList}=require('../../controller/blog-square')

 //首页
 router.get('/',loginRedirect,async (ctx,next)=>{
     await ctx.render('index',{

     })
 })

 //个人主页
 //用户访问自己的个人主页
 router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
 //用户访问别人的个人主页
 router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
     //已登录用户的信息
     const myUserInfo=ctx.session.userInfo
     const myUserName=myUserInfo.userName

     //从路由中获取的用户名
     let curUserInfo
     const { userName: curUserName } = ctx.params
     //判断从session中取得用户名与从路由中取得用户名是不是一个，是一个的话就是isMe
     const isMe=myUserName===curUserName
     if(isMe){
         curUserInfo=myUserInfo
     }else{
         //不是当前登录的用户，就要从数据库中找当前用户名对应的用户信息
         const existResult=await isExist(curUserName)
         if(existResult.errno!==0){
             return
         }
         curUserInfo=existResult.data
     }
     //获取微博第一页数据
     //调用controller层的处理方法
     const result = await getProfileBlogList(curUserName, 0)
     const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
     await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData:{
            userInfo:curUserInfo,
            isMe
        }
     })
     
 })

 //广场
 router.get('/square',loginRedirect,async (ctx,next)=>{
     //获取微博数据第一页
     const result=await getSquareBlogList(0)
     const {isEmpty,blogList,pageIndex,pageSize,count}=result.data
     await ctx.render('square',{
         blogData:{
             isEmpty,
             blogList,
             pageIndex,
             pageSize,
             count
         }
     })
 })

 module.exports=router