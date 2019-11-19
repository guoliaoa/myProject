/**
 * @description 存储配置
 * @author 郭蓼
 */
const {isProd}=require('../utils/env')

let REDIS_CONF={//redis的连接配置
    port:6379,
    host:'127.0.0.1'
}

let MYSQL_CONF={//mysql连接的配置
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'koa2_weibo'

}

if(isProd){//是生产环境
    //线上的redis配置
    let REDIS_CONF={//redis的连接配置
        port:6379,
        host:'127.0.0.1'
    }

    //线上的mysql配置
    let MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'123456',
        port:'3306',
        database:'koa2_weibo'
    
    }
}

module.exports={
    REDIS_CONF,
    MYSQL_CONF
}