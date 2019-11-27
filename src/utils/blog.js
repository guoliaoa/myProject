/**
 * @description 微博数据相关的工具方法
 * @author 郭蓼
 */

 const fs=require('fs')
 const path=require('path')
 const ejs=require('ejs')

 //获取blog-list.ejs的内容
 const BLOG_LIST_TPL=fs.readFileSync(
     path.join(__dirname,'..','views','widgets','blog-list.ejs')
 ).toString()

/**
 * 根据blogList渲染出html 字符串
 * @param {Array} blogList 微博数据列表
 * @param {boolean} canReply 是否可以回复
 */
 function getBlogListStr(blogList=[],canReply=false){
     return ejs.render(BLOG_LIST_TPL,{
         blogList,
         canReply
     })
 }

 module.exports={
    getBlogListStr
 }