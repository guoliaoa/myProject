/**
 * @description json schema 校验
 * @author 郭蓼
 */

 const Ajv=require('ajv')
 const ajv=new Ajv({
     //allErrors:true 会输出所有的错误，比较慢
 })

/**
 * json schema 校验
 * @param {object} schema  json schema的规则
 * @param {*object} data 要校验的数据
 */
 function validata(schema,data={}){
     const valid=ajv.validate(schema,data)
     if(!valid){
         return ajv.errors[0]
     }
 }

 module.exports=validata