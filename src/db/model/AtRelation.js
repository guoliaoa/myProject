/**
 * @description 微博 @ 用户的·关系
 * @author 郭蓼
 */

 const seq=require('../seq')
 const {INTEGER,BOOLEAN}=require('../type')

 const AtRelation=seq.define('atRelation',{
     userId:{
         type:INTEGER,
         allowNull:false,
         comment:'用户 id'
     },
     blogId:{
         type:INTEGER,
         allowNull:false,
         comment:'微博 id'
     },
     isRead:{
         type:BOOLEAN,
         allowNull:false,
         defaultValue:false,//默认未读
         comment:'是否已读'
     }
 })


 module.exports=AtRelation