/**
 * @description 首页 创建微博
 * @author 郭蓼
 */

const {createBlog,getFollowersBlogList}=require('../services/blog')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {createBlogFailInfo}=require('../model/ErrorInfo')
const xss=require('xss')
const {PAGE_SIZE,REG_FOR_AT_WHO}=require('../conf/constant')
const {getUserInfo}=require('../services/user')
const {createAtRelation}=require('../services/at-relation')
 /**
  * 创建微博
  * @param {Object} param0 创建微博需要传递的参数{userId,content,image}
  */
 async function create({userId,content,image}){
     //分析收集数据 content 中的 @ 用户
     //content 格式如 哈喽 @李四 - lisi 你好
     const atUserNameList=[]
     content=content.replace(
        REG_FOR_AT_WHO,
        (matchStr,nickName,userName)=>{
            //目的不是替换，而是获取userName
            atUserNameList.push(userName)
            return matchStr //替换而不生效，符合预期
        }
     )
     //根据 @ 用户名查询用户信息
     const atUserList=await Promise.all(
         atUserNameList.map(userName=>getUserInfo(userName))
     )
     //最终根据用户信息获得用户id
     const atUserIdList=atUserList.map(user=>user.id)

     //调用service
     try{
         //创建微博
        const blog= await createBlog({
             userId,
             content:xss(content),
             image
         })
         //创建 @ 关系 AtUserRelation   谁发的此条微博
         //blog.id
         //调用service
         await Promise.all(atUserIdList.map(
             userId=>createAtRelation(blog.id,userId)
         ))
         //返回

         return new SuccessModel(blog)
     } catch(ex){
         console.error(ex.message,ex.stack)
         return new ErrorModel(createBlogFailInfo)
     }
 }

 /**
  * 获取首页微博列表
  * @param {number} userId 
  * @param {number} pageIndex 
  */
 async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

 module.exports={
     create,
     getHomeBlogList
 }