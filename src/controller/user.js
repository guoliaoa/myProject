/**
 * @description user controller
 * @author  郭蓼
 */
const {getUserInfo,createUser}=require('../services/user')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {registerUserNameNotExistInfo,
       registerUserNameExistInfo,
       registerFailInfo,
       loginFailInfo}=require('../model/ErrorInfo')

const doCrpyto=require('../utils/crpy')

 /**
  * 用户名是否存在
  * @param {string} userName 用户名
  */

 async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // { errno: 0, data: {....} }
        return new SuccessModel(userInfo)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender (1 男 2 女 3 保密) 
 */
async function register({userName,password,gender}){
    const userInfo=await getUserInfo(userName)
    if(userInfo){
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    //注册 service
    try{
        await createUser({
            userName,
            password:doCrpyto(password),
            gender
        })
        //注册成功
        return new SuccessModel()
    }catch(ex){
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 用户密码
 */
async function login(ctx,userName,password){
    //ctx的作用是  登录成功之后ctx.session.userInfo=xxx

    //获取用户信息
    const userInfo=await getUserInfo(userName,doCrpyto(password))
    if(!userInfo){
        //登录失败
        return new ErrorModel(loginFailInfo)
    }
    //登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

 module.exports={
     isExist,
     register,
     login
 }