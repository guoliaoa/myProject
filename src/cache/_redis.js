/**
 * @description 连接 redis 的方法 get set
 * @author 郭蓼
 */

 const redis=require('redis');
 const {REDIS_CONF}=require('../conf/db')
 //创建一个客户端
 const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host);
 redisClient.on('error',err=>{
     console.error('redis err',err)
 })

 //set
 /**
  * redis set
  * @param {string} key key
  * @param {string} val val
  * @param {number} timeout timeout 过期时间 单位s
  */
 function set(key,val,timeout=60*60){//1小时后自动过期
    if(typeof val ==='object'){
        val=JSON.stringify(val);
    }
    redisClient.set(key,val);//核心代码
    redisClient.expire(key,timeout)//过期的方法
 }

 //get
 /**
  * get
  * @param {string} key 键
  */
 function get(key){
     const promise=new Promise((resolve,reject)=>{
         redisClient.get(key,(err,val)=>{
             if(err){
                 reject(err)
                 return
             }
             if(val==null){
                 resolve(null)
                 return
             }
             
             try {
                 resolve(
                     JSON.parse(val)
                 )
             } catch(ex){
                 resolve(val)
             }
         })
     })
     return promise
 }
 module.exports={
     set,
     get
 }