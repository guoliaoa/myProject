/**
 * @description 微博 service
 * @author 郭蓼
 */

 const {Blog,User,UserRelation}=require('../db/model/index')
 const {formatUser,formatBlog}=require('./_format')


 /**
  * 创建微博
  * @param {Object} param0 创建微博的数据
  */
 async function createBlog({userId,content,image}){
     const result=await Blog.create({
         userId,
         content,
         image
     })
     return result.dataValues
 }

 /**
  * 根据用户获取微博列表
  * @param {Object} param0 {userName,pageIndex=0,pageSize=10}
  */
 async function getBlogListByUser({userName,pageIndex=0,pageSize=10}){
      // 拼接查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组

     //获取dataValues
     let blogList = result.rows.map(row => row.dataValues)
     blogList=formatBlog(blogList)
     blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
 }

 /**
  * 获取关注人微博列表（首页）
  * @param {Object} param0 查询条件
  */
 async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: { userId }//通过userId查询出的就是这个用户对应的所有关注人foloowerId,然后再通过这个followerId被关注人的id查询出blog,对应方法就是因为followerId和blog表有外键关系
            }
        ]
    })

    // 格式化数据
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}
 module.exports={
     createBlog,
     getBlogListByUser,
     getFollowersBlogList
 }