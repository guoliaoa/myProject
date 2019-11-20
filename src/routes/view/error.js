/**
 * @description error 404
 * @author  郭蓼
 */

const router = require('koa-router')();

//error的路由
router.get('/error',async (ctx,next)=>{
    await ctx.render('error')//这里的error是views文件夹下面的error.ejs文件，之所以可以这样写是因为在app.js里面注册的时候就写的是views文件夹
})

//404的路由
router.get('*',async (ctx,next)=>{
    await ctx.render('404')
})



module.exports=router