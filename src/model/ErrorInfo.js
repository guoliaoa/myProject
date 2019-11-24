/**
 * @description  失败信息集合
 * @author 郭蓼
 */

 module.exports={
    //注册时用户名已存在
    registerUserNameExistInfo:{
        errno:10001,
        message:'用户名已存在'
    },
    //注册失败
    registerFailInfo:{
        errno:10002,
        message:'注册失败，请重试'
    },
    //注册之前检测用户名是否可用时，用户名可用
    registerUserNameNotExistInfo:{
        errno:10003,
        message:'用户名未存在'
    },
    //json schema 校验失败
    jsonSchemaFailInfo:{
        errno:10009,
        message:'数据格式校验失败'
    }

 }