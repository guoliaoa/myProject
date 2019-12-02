/**
 * @description 入口文件
 * @author 郭蓼
 */

 const User=require('./User')
 const Blog=require('./Blog')
 const UserRelation=require('./UserRelation')
 const AtRelation=require('./AtRelation')

 //创建外键关系，许多blogs属于一个user,可以通过查询微博来查询出对应的用户
 Blog.belongsTo(User,{
     foreignKey:'userId'
 })

 UserRelation.belongsTo(User,{
     foreignKey:'followerId'
 })

 User.hasMany(UserRelation,{
     foreignKey:'userId'
 })

 Blog.belongsTo(UserRelation,{
     foreignKey:'userId',
     targetKey:'followerId'
 })

 Blog.hasMany(AtRelation,{
     foreignKey:'blogId'
 })

 module.exports={
     User,
     Blog,
     UserRelation,
     AtRelation
 }