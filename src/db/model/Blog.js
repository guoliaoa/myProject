/**
 * @description  Bolg模型
 * @author 郭蓼
 */

const seq=require('../seq')
const {STRING,INTEGER,TEXT}=require('../type')

const Blog=seq.define('blog',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    content:{
        type:TEXT,
        allowNull:false,
        comment:'微博内容'
    },
    image:{
        type:STRING,
        comment:'图片地址'
    }
})

module.exports=Blog