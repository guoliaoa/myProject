/**
 * @description user  API
 * @author  郭蓼
 */

 const router=require('koa-router')()

 router.prefix('/api/user')
 const {isExist,register}=require('../../controller/user')

 //注册路由  注册
 router.post('/register',async (ctx,next)=>{
     const {userName,password,gender}=ctx.request.body;
     //调用controller里面的方法
     ctx.body=await register({
         userName,
         password,
         gender
     })

 })

 //判断用户名是否存在
 router.post('/isExist',async (ctx,next)=>{
     const {userName}=ctx.request.body;//获取post请求数据的方法

     //controller
     ctx.body=await isExist(userName)
     

 })

 module.exports=router