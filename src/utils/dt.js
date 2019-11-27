/**
 * @description 时间相关的工具函数
 * @author 郭蓼
 */

 const {format}=require('date-fns')

 /**
  * 格式时间字符串 如：09.03 14:12
  * @param {string} str 时间字符串
  */
 function timeFormat(str){
     return format(new Date(str),'MM.dd HH:mm')
 }

 module.exports={
     timeFormat
 }