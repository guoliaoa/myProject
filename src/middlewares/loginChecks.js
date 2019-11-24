/**
 * @description 登录验证的中间件
 * @author 郭蓼
 */

const {loginCheckFailInfo}=require('../model/ErrorInfo')
 const {ErrorModel}=require('../model/ResModel')

 /**
  * API 登录验证
  * @param {Object} ctx koa ctx
  * @param {function} next next
  */
 async function loginCheck(ctx,next){
     if(ctx.session && ctx.session.userInfo){
         //已登录
         await next()
     }
     //未登录
     ctx.body=new ErrorModel(loginCheckFailInfo)
 }

/**
 * 页面登录验证
 * @param {Object} ctx koa ctx
 * @param {function} next next
 */
 async function loginRedirect(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        //已登录
        await next()
    }
    //未登录
    const curUrl=ctx.url
    ctx.redirect('/login?url='+encodeURIComponent(curUrl))

 }

 module.exports={
    loginCheck,
    loginRedirect
 }