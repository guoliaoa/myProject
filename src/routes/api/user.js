/**
 * @description user  API
 * @author  郭蓼
 */

 const router=require('koa-router')()

 router.prefix('/api/user')
 const {isExist,register,login,deleteCurUser}=require('../../controller/user')
 const userValidate=require('../../validator/user')
 const {genValidator}=require('../../middlewares/validator')
 const {isTest}=require('../../utils/env')
 const {loginCheck}=require('../../middlewares/loginChecks')

 //注册路由  注册
 router.post('/register',genValidator(userValidate),async (ctx,next)=>{
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
//登录
 router.post('/login',async (ctx,next)=>{
     const {userName,password}=ctx.request.body
     //调用controller层的接口
     ctx.body=await login(ctx,userName,password)
 })

 //删除
 router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        // 测试环境下，测试账号登录之后，删除自己
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

 module.exports=router