/**
 * @description user view 路由
 * @author 郭蓼
 */

 const router=require('koa-router')()
 const {loginRedirect}=require('../../middlewares/loginChecks')

/**
 * 获取登录信息
 * @param {Oblect} ctx koa2 ctx
 */
 function getLoginInfo(ctx){
     let data={
         isLogin:false  //默认未登录
     }
     const userInfo=ctx.session.userInfo
     if(userInfo){//登录了
         data={
             isLogin:true,
             userName:userInfo.userName
         }
     }
     return data
 }


 //登录的路由
 router.get('/login',async (ctx,next)=>{
     await ctx.render('login',getLoginInfo(ctx))
 })

 //注册的路由
 router.get('/register',async (ctx,next)=>{
    await ctx.render('register',getLoginInfo(ctx))
})

router.get('/setting',loginRedirect,async (ctx,next)=>{
    await ctx.render('setting',ctx.session.userInfo)
})

 module.exports=router