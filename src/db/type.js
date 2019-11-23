/**
 * @description  封装Sequelize 的数据模型的类型
 * @author 郭蓼
 */

 const Sequelize=require('sequelize')

 module.exports={
     STRING:Sequelize.STRING,
     TEXT:Sequelize.TEXT,
     BOOLEAN:Sequelize.BOOLEAN,
     INTEGER:Sequelize.INTEGER,
     DECIMAL:Sequelize.DECIMAL
 }