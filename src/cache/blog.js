/**
 * @description 微博缓存
 * @author 郭蓼
 */

 const { set,get }=require('./_redis')
 const {getBlogListByUser}=require('../services/blog')

 //redis key 前缀
 const KEY_PREFIX='weibo:square:'

/**
 * 获取广场页的缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
 async function getSquareCacheList(pageIndex,pageSize){
     const key=`${KEY_PREFIX}${pageIndex}_${pageSize}`

     //尝试获取缓存
     const cacheResult=await get(key)
     if(cacheResult!=null){
         return cacheResult
     }
     //没有缓存就读取数据库
     const result =await getBlogListByUser(pageIndex,pageSize)
     //第一次读取没有缓存，或者缓存时间过期，就得重新设置缓存
     //过期时间为1分钟
     set(key,result,60)

     return result
 }

 module.exports={
    getSquareCacheList
 }