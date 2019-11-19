const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {//一步读取模板文件
    title: 'Hello Koa 2!',
    isMe:true,
    blogList:[
      {
        id:1,
        title:'aaa'
      },
      {
        id:2,
        title:'bbb'
      },
      {
        id:3,
        title:'ccc'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // const session=ctx.session;
  // if(session.viewNum==null){
  //   session.viewNum=0;
  // }
  // session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    //viewNum:session.viewNum
  }
})

router.get('/profile/:username',async (ctx,next)=>{//动态路由传参  传递一个参数时
  const {username}=ctx.params;//获取参数的方法
  console.log(ctx.params);
  ctx.body = {//这里的ctx.body就相当于express框架里面得res.writeHead('');就是向页面中打印出信息
    title: 'this is profilePage',
    username,
  }
})

router.get('/loadMore/:username/:pageindex',async (ctx,next)=>{//get请求里面动态传递多个参数的情况
  const {username,pageindex}=ctx.params;//获取参数的方法
  ctx.body = {
    title: 'this is loadMore API',
    username,
    pageindex,
  }
})

module.exports = router
