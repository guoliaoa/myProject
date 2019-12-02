/**
 * @description 微博 view 路由
 * @author 郭蓼
 */

 const router=require('koa-router')()

 const {loginRedirect}=require('../../middlewares/loginChecks')
 const {getProfileBlogList}=require('../../controller/blog-profile')
 const {isExist}=require('../../controller/user')
 const {getSquareBlogList}=require('../../controller/blog-square')
 const {getFans,getFollowers}=require('../../controller/user-relation')
 const {getHomeBlogList}=require('../../controller/blog-home')
 const {getAtMeCount,getAtMeBlogList,markAsRead}=require('../../controller/blog-at')

 //首页
 router.get('/',loginRedirect,async (ctx,next)=>{
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    //获取微博首页第一页的数据
    //调用controller
    const result =await getHomeBlogList(userId)
    const {isEmpty,blogList,pageIndex,pageSize,count}=result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    //获取@数量
    const atCountResult=await getAtMeCount(userId)
    const {count:atCount}=atCountResult.data

     await ctx.render('index',{
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData:{
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        }
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

     //获取粉丝数据
     const fansResult= await getFans(curUserInfo.id)
     const {count:fansCount,fansList}=fansResult.data

     //获取关注人列表
     //controller
     const followersResult=await getFollowers(curUserInfo.id)
     const {count :followersCount,followersList}=followersResult.data

     //获取@数量
    const atCountResult=await getAtMeCount(myUserInfo.id)
    const {count:atCount}=atCountResult.data

     //我是否关注了此人  如果粉丝列表中有我的用户名，那我就关注了此人
     const amIFollowed=fansList.some(item=>{
         return item.userName === myUserName
     })

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
            isMe,
            fansData:{
                count:fansCount,
                list:fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed,
            atCount
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

 //atMe路由
 router.get('/at-me', loginRedirect, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo

    // 获取 @ 数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    // 获取第一页列表
    const result = await getAtMeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 渲染页面
    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })

    // 标记为已读
    if(atCount>0){
        //调用controller
        await markAsRead(userId)
    }

})

 module.exports=router