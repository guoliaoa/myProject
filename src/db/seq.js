/**
 * @description sequelize 实例
 * @author 郭蓼
 */

const Sequelize=require('sequelize');//引用
const {isProd,isTest}=require('../utils/env');

const {MYSQL_CONF}=require('../conf/db');
const {host,user,password,database}=MYSQL_CONF;

const conf={
    host,
    dialect:'mysql'
}// dialect是要操作的数据库类型


if(isTest){
    conf.logging=()=>{}//作用是使用sequelize的时候不要打印出sql语句
}

if(isProd){
    conf.pool={
            max:5,//连接池中的最大连接数量
            min:0,//最小连接数量
            idle:1000//如果一个连接池10s之内没有被使用，则释放掉它
     }
}

//线上的连接，通过连接池的方式
// conf.pool={
//     max:5,//连接池中的最大连接数量
//     min:0,//最小连接数量
//     idle:1000//如果一个连接池10s之内没有被使用，则释放掉它
// }

const seq=new Sequelize(database,user,password,conf);//创建一个实例 

//测试连接
// seq.authenticate().then(()=>{
//     console.log('ok')
// }).catch(()=>{
//     console.log('error')
// })
module.exports=seq;