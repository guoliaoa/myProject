/**
 * @description 微博格式校验
 * @author 郭蓼
 */

const validata=require('./_validator')
 
// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content:{
            type:'string'
        },
        image:{
            type:'string',
            maxLength:255
        }
    }
}

//执行校验
/**
 * 微博数据格式校验
 * @param {Object} data 微博校验数据
 */
function blogValidate(data={}){
    return validata(SCHEMA,data)
}

module.exports=blogValidate