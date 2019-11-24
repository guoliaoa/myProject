/**
 * @description json schema 检验中间件
 * @author 郭蓼
 */

 const {jsonSchemaFailInfo}=require('../model/ErrorInfo')
 const {ErrorModel}=require('../model/ResModel')
 /**
  * 生成 json schema 验证中间件
  * @param {function} validateFn 验证函数
  */
 function genValidator(validateFn){
     //定义中间件函数
    async function validator(ctx,next){
        //校验
        const data=ctx.request.body
        const error=validateFn(data)
        if(error){
            //校验失败
            ctx.body= new ErrorModel(jsonSchemaFailInfo)
            return
        }
        //验证成功，继续
        await next()
    }
    //返回中间件
    return validator
 }

 module.exports={
    genValidator
 }