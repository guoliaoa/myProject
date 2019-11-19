/**
 * @description 环境变量
 * @author 郭蓼
 */

 const ENV=process.env.NODE_ENV;//获取dev和production的方式

 module.exports={
     isDev:ENV==='dev',
     notDev:ENV!=='dev',
     isProd:ENV==='production',
     notProd:ENV!=='production',
     isTest:ENV==='test',
     notTest:ENV!=='test',
 }