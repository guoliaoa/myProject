/**
 * @description 用户关系 单元测试
 * @author 郭蓼
 */

 const server=require('../server')
 const {getFans,getFollowers}=require('../../src/controller/user-relation')
 const {
    L_ID,
    L_USER_NAME,
    L_COOKIE,
    Z_ID,
    Z_USER_NAME,
    Z_COOKIE,
 }=require('../testUserInfo')

 //李四取关张三
 test('无论如何，先取消关注',async ()=>{
     const res=await server
                    .post('/api/profile/unFollow')
                    .send({userId:Z_ID})
                    .set('cookie',L_COOKIE)
    expect(12).toBe(12)
 })

 //李四关注张三
 test('李四关注张三，应该成功',async ()=>{
     const res=await server
                    .post('/api/profile/follow')
                    .send({userId:Z_ID})
                    .set('cookie',L_COOKIE)
    expect(res.body.errno).toBe(0)
 })

 //获取粉丝
 test('获取张三的粉丝，应该有李四',async ()=>{
     const result=await getFans(Z_ID)
     const {count,fansList}=result.data
     const hasUserName=fansList.some(fanInfo=>{
         return fanInfo.userName === L_USER_NAME
     })
     expect(count>0).toBe(true)
     expect(hasUserName).toBe(true)
 })

 //获取关注人
 test('获取李四的关注人，应该有张三',async ()=>{
     const result=await getFollowers(L_ID)
     const {count,followersList}=result.data
     const hasUserName=followersList.some(follower=>{
         return follower.userName === Z_USER_NAME
     })
     expect(count>0).toBe(true)
     expect(hasUserName).toBe(true)
 })

 //取消关注
 test('李四取消关注张三，应该成功',async ()=>{
    const res=await server
    .post('/api/profile/unFollow')
    .send({userId:Z_ID})
    .set('cookie',L_COOKIE)
expect(res.body.errno).toBe(0)
 })