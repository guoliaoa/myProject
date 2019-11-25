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
    //登录失败
    loginFailInfo:{
        errno:10004,
        message:'登录失败，用户名或密码错误'
    },
    loginCheckFailInfo:{
        errno:10005,
        message:'您尚未登录'
    },
    //上传文件失败
    uploadFileSizeFailInfo:{
        errno:10007,
        message:'上传文件尺寸过大'
    },
    //修改用户信息失败
    changeInfoFailInfo:{
        errno:10008,
        message:'修改信息失败'
    },
    //json schema 校验失败
    jsonSchemaFailInfo:{
        errno:10009,
        message:'数据格式校验失败'
    },
    //删除用户失败
    deleteUserFailInfo:{
        errno:10010,
        message:'删除用户失败'
    }

 }