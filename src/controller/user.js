/**
 * @description user controller
 * @author  郭蓼
 */
const {getUserInfo}=require('../services/user')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {registerUserNameNotExistInfo}=require('../model/ErrorInfo')

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

//  async function isExist(userName){
//      //业务逻辑处理（无）
//      //调用services 获取数据
//      //返回统一格式
//      const userInfo=await getUserInfo(userName)
//      if(userInfo){
//          //已存在(成功)
//          return new SuccessModel(userInfo)
//          //{errno:0,data:{...}}  返回的数据格式
//      }else{
//          //不存在(失败)  {errno:10003,message:'用户名未存在'}
//          return new ErrorModel(registerUserNameNotExistInfo)
//      }
//  }
 module.exports={
     isExist
 }