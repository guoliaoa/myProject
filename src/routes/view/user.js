/**
 * @description user view 路由
 * @author 郭蓼
 */

 const router=require('koa-router')()

 //登录的路由
 router.get('/login',async (ctx,next)=>{
     await ctx.render('login',{})
 })

 //注册的路由
 router.get('/register',async (ctx,next)=>{
    await ctx.render('register',{})
})

 module.exports=router