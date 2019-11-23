/**
 * @description 用户数据模型
 * @author 郭蓼
 */

 const seq=require('../seq')
 const {STRING,DECIMAL}=require('../type')

 //建立出来的就是users，自动变为复数，并且也会覆盖掉上次练习时建立的user表，就得再次修改utf8
 const User=seq.define('user',{
     userName:{
         type:STRING,
         allowNull:false,
         unique:true,
         comment:'用户名，唯一'
     },
     password:{
         type:STRING,
         allowNull:false,
         comment:'密码'
     },
     nickName:{
         type:STRING,
         allowNull:false,
         comment:"昵称"
     },
     gender:{
         type:DECIMAL,
         allowNull:false,
         defaultValue:3,
         comment:'性别，（1 男性，2 女性，3 保密）'
     },
     picture:{
         type:STRING,
         comment:'图片存的是地址'
     },
     city:{
         type:STRING,
         comment:'城市'
     }

 })

 module.exports=User