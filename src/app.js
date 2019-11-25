const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session =require('koa-generic-session')
const redisStore=require('koa-redis')
const koaStatic=require('koa-static')
const path=require('path')

const {REDIS_CONF}=require('./conf/db')
const {isProd}=require('./conf/db')//判断当前环境
const {SESSION_SECRET_KEYS}=require('./conf/secretkeys')

//路由
const errorViewRouter=require('./routes/view/error')//错误信息页和404页
const userViewRouter=require('./routes/view/user')
const userApirouter=require('./routes/api/user')
const utilsApiRouter=require('./routes/api/utils')
const index = require('./routes/index')


// error handler

let onerrorConf={}

if(isProd){//如果是线上环境，就暴露出错误页
  onerrorConf={
    redirect:'/error'//重定向到error的路由
  }
}

onerror(app,onerrorConf)//是在页面上显示错误的信息

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))//koa-static 将public目录下的文件可以当静态资源文件来访问
app.use(koaStatic(path.join(__dirname,'..','uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'//注册ejs，因为ejs是后端编译的语言，他必须要注册一下才能使用后边编译的功能，否则识别不了ejs的语法
}))

//session 的配置
/**
 * 用户每一次登录都会生成一个cookie,它的名字是weibo.sid,然后把它给客户端，当客户端再次访问的时候，就会带着这个cookie
 */
app.keys=[SESSION_SECRET_KEYS];
app.use(session({
  key:'weibo.sid' , //cookie 的name   它默认是'koa.sid'
  prefix:'weibo:sess:', // redis 的key的前缀，默认是'koa:sess:'
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60*1000//过期时间是一天
  },
  store:redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`  ,//127.0.0.1:6379
  })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })手写的koa2中间件的功能

// routes  注册
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())
app.use(userApirouter.routes(),userApirouter.allowedMethods())
app.use(utilsApiRouter.routes(),utilsApiRouter.allowedMethods())

app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())//404 的路由一定要注册到最下面，不然它就把所有的路由都匹配了

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)//是在控制台打印输出错误的信息
});

module.exports = app
