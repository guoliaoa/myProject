const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//模拟一个post请求
// router.post('/login',async (ctx,next)=>{
//   const {username,password}=ctx.request.body;
//   ctx.body = {
//     username,
//     password,
//   }
// })

module.exports = router
