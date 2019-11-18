/**
 * @description 存储配置
 * @author 郭蓼
 */
const {isProd}=require('../utils/env')

let REDIS_CONF={//redis的连接配置
    port:6379,
    host:'127.0.0.1'
}

if(isProd){//是生产环境
    //线上的redis配置
    let REDIS_CONF={//redis的连接配置
        port:6379,
        host:'127.0.0.1'
    }
}

module.exports={
    REDIS_CONF
}