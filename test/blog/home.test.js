/**
 * @description 首页 test
 * @author 郭蓼
 */

 const server=require('../server')
 const {L_COOKIE}=require('../testUserInfo')
 let BLOG_ID=''

 test('创建一条微博，应该成功',async ()=>{
     //定义测试内容
     const content='这是测试自动创建的一条微博_'+Date.now()
     const image='/xxx.png'
     //开始测试
     const res=await server.post('/api/blog/create').send({
         content,
         image
     }).set('cookie',L_COOKIE)
     expect(res.body.errno).toBe(0)
     expect(res.body.data.content).toBe(content)
     expect(res.body.data.image).toBe(image)
     BLOG_ID=res.body.data.id
 })

 
test('首页，加载第一页数据', async () => {
    const res = await server
                    .get(`/api/blog/loadMore/0`)
                    .set('cookie', L_COOKIE)  // 设置 cookie
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})
