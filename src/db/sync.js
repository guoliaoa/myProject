/**
 * @description sequelize  同步数据库
 * @author 郭蓼
 */


const seq=require('./seq')

require('./model/index')//引入数据模型入口文件

//测试连接
 seq.authenticate().then(()=>{
    console.log('ok')
 }).catch(()=>{
     console.log('error')
 })

 //执行同步
 seq.sync({ force:true }).then(()=>{//这里的force是每一次执行的时候要重新建一个表，会把之前的同名的表覆盖掉
     console.log('sync ok');
     process.exit()
 })