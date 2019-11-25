/**
 * @description user controller
 * @author  郭蓼
 */
const {getUserInfo,
    createUser,
    deleteUser,
    updateUser
}=require('../services/user')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {registerUserNameNotExistInfo,
       registerUserNameExistInfo,
       registerFailInfo,
       loginFailInfo,
       deleteUserFailInfo,
       changeInfoFailInfo,
       changePasswordFailInfo
    }=require('../model/ErrorInfo')

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
 * 注册用户
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
 * 登录
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


/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {Object} ctx koa ctx
 * @param {string} nickName 用户昵称
 * @param {string} city 用户城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx,{nickName,city,picture}){
    const {userName}=ctx.session.userInfo 
    if(!nickName){
        //昵称没有上传的话就默认为用户名
        nickName=userName
    }
    //service层作修改
    const result=await updateUser({
        newNickName:nickName,
        newCity:city,
        newPicture:picture
    },{
        userName
    })

    if(result){
        //执行成功
        Object.assign(ctx.session.userInfo,{
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    //失败
    return new ErrorModel(changeInfoFailInfo)

}

/**
 * 修改密码
 * @param {string} userName 要修改密码的用户名
 * @param {string} password 修改之前的密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName,password,newPassword){
    const result=await updateUser({
        newPassword:doCrpyto(newPassword)
    },
    {
        userName,
        password:doCrpyto(password)
    })
    if(result){
        //修改成功
        return new SuccessModel()
    }
    //修改失败
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx koa ctx
 */
async function logout(ctx){
    delete ctx.session.userInfo
    return new SuccessModel()
}

 module.exports={
     isExist,
     register,
     login,
     deleteCurUser,
     changeInfo,
     changePassword,
     logout
 }