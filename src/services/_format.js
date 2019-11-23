/**
 * @description  数据格式化
 * @author 郭蓼
 */

 const {DEFAULT_PICTURE}=require('../conf/constant')//引用常量

 /**
  * 替换用户未传递的头像   用户默认头像
  * @param {Object} obj 用户对象
  */
 function _formatUserPicture(obj){
     if(obj.picture== null){
         obj.picture=DEFAULT_PICTURE
     }
     return obj
 }


 /**
  * 格式化用户信息
  * @param {Array|Object} list 用户列表或单个用户对象
  */
 function formatUser(list){
     if(list == null){
         return list
     }
     if(list instanceof Array){
         //数组，也就是用户列表
         return list.map(_formatUserPicture)
     }

     //如果是单个对象
     return _formatUserPicture(list)

 }

 module.exports={
     formatUser
 }