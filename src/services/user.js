/**
 * @description service user
 * @author 郭蓼
 */

 const {User}=require('../db/model/index')//引用创建的模型
 const {formatUser}=require('./_format')



 /**
  * 获取用户信息
  * @param {string} userName 用户名
  * @param {string} password 用户密码
  */
 async function getUserInfo(userName,password){
     //查询条件
     const whereOpt={
         userName
     }
     if(password){//如果有passwird就把它加到查询条件中来
         Object.assign(whereOpt,{password})
     }

     //查询
     const result=await User.findOne({
         attributes:['id','userName','nickName','city','picture'],
         where:whereOpt
     })

     if(result == null){
         //未找到
         return result
     }
     //格式化
     const formatRes=formatUser(result.dataValues)

     return formatRes
 }

 /**
  * 创建用户
  * @param {string} userName 
  * @param {string} password 
  * @param {number} gender 
  * @param {string} nickName 
  */
 async function createUser({userName,password,gender=3,nickName}){
     const result=await User.create({
         userName,
         password,
         gender,
         nickName:nickName?nickName:userName
     })
     return result.dataValues
 }

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}

/**
 * 修改用户信息
 * @param {Object} param0 要修改的内容
 * @param {Object} param1 修改的条件
 */
async function updateUser({newPassword,newNickName,newCity,newPicture},{password,userName}){
    //拼接修改内容
    updateData={}
    if(newPassword){
        updateData.password=newPassword
    }
    if(newNickName){
        updateData.nickName=newNickName
    }
    if(newCity){
        updateData.city=newCity
    }
    if(newPicture){
        updateData.picture=newPicture
    }
    //拼接查询条件
    const whereData={
        userName
    }
    if(password){
        whereData.password=password
    }
    //进行修改
    const result=await User.update(updateData,{
        where:whereData
    })
    return result[0]>0  //修改的行数 
}

 module.exports={
     getUserInfo,
     createUser,
     deleteUser,
     updateUser
 }