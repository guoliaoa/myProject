/**
 * @description  密码的加密模块
 * @author 郭蓼
 */

 const crpyto=require('crypto')
 const {CRPYTO_SECRET_KEYS}=require('../conf/secretkeys')//密钥

 /**
  * md5加密
  * @param {string} content 明文
  */
 function _md5(content){
     const md5=crpyto.createHash('md5')
     return md5.update(content).digest('hex')
 }

 /**
  * 加密方法
  * @param {string} content 明文
  */
 function doCrpyto(content){
     const str=`password=${content}&key=${CRPYTO_SECRET_KEYS}`
     return _md5(str)
 }

 module.exports=doCrpyto

