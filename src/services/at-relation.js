/**
 * @description 创建 @ 用户关系 service
 * @author 郭蓼
 */

 const {AtRelation,Blog,User}=require('../db/model/index')
 const {formatBlog,formatUser}=require('./_format')
 /**
  * 创建 @ 用户关系
  * @param {number} blogId 微博id
  * @param {number} userId 用户id
  */
 async function createAtRelation(blogId,userId){
     const result=await AtRelation.create({
         blogId,
         userId
     })
     return result.dataValues
 }

 /**
  * 获取 @ userId用户的微博数量
  * @param {number} userId 用户id
  */
 async function getRelationCount(userId){
     const result = await AtRelation.findAndCountAll({
         where:{
             userId,
             isRead:false
         }
     })
     return result.count
 }

 /**
  * 获取 @ 用户 的微博列表
  * @param {Object} param0 {userId,pageIndex=0,pageSize=10}
  */
 async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            // @ 关系
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: { userId }//条件为userId，也就是被@的人的id,通过这个条件找出AtRelation表中对应@这个人的blogId,而Blog表与AtRelation表的外键为blogId,对应去Blog表里面的id，这样就能找到对应的发的微博了
            },
            // User
            {
                model: User,//通过上面关联的表找出了发的微博，现在又要通过Blog与User表的外键关系Blog.belogsTo(User)，外键为userId,既通过以上查出了对应的微博，那么再通过blog表的id对应出userId,所以就可以查询出用户信息了
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    // result.rows
    // result.count

    // 格式化
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

/**
 * 标记为已读
 * @param {Object} param0 需要更新的内容对象
 * @param {Object} param1 条件对象
 */
async function updateAtRelation(
    {newIsRead},//需要更新的内容
    {userId,isRead}
){
    //拼接更新内容
    const updateDate={}
    if(newIsRead){
        updateDate.isRead=newIsRead
    }
    //拼接查询条件
    const whereOpt={}
    if(userId){
        whereOpt.userId=userId
    }
    if(isRead){
        whereOpt.isRead=isRead
    }
    //执行更新
    const result=await AtRelation.update(updateDate,{
        where:whereOpt
    })
    return result[0]>0


}


 module.exports={
    createAtRelation,
    getRelationCount,
    getAtUserBlogList,
    updateAtRelation
 }