/**
 * @description 用户关系表
 * @author 郭蓼
 */

const seq=require('../seq')
const {INTEGER}=require('../type')

const UserRelation=seq.define('userRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    followerId:{
        type:INTEGER,
        allowNull:false,
        comment:'被关注人的id'
    }
})

module.exports=UserRelation