/**
 * @description utils controller
 * @author 郭蓼
 */

 const path=require('path')
 const {uploadFileSizeFailInfo}=require('../model/ErrorInfo')
 const {ErrorModel,SuccessModel}=require('../model/ResModel')
 const fse=require('fs-extra')

 //存储目录
 const DIST_FOLDER_PATH=path.join(__dirname,'..','..','uploadFiles')//和src是同一级目录
//文件最大体积为1M
const MIX_SIZE=1024*1024*1024

//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist=>{
    if(!exist){
        //如果目录不存在，就创建一个
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */
 async function saveFile({name,type,size,filePath}){
     if(size>MIX_SIZE){
         //文件过大，需要删除
         await fse.remove(filePath)
         return new ErrorModel(uploadFileSizeFailInfo)
     }
     //移动文件
     const fileName=Date.now()+'.'+name //防止重名
     const distFilePath=path.join(DIST_FOLDER_PATH,fileName)  //文件最终保存的目的地，第一个参数是文件夹名称，第二个参数是要存储的文件名称
     await fse.move(filePath,distFilePath)//移动，第一个参数是原始位置，第二个参数是目的地位置

     //返回信息
     return new SuccessModel({
         url:'/'+fileName
     })
 }


 module.exports={
     saveFile
 }