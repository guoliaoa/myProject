/**
 * @description user model test
 * @author 郭蓼
 */

 const {User}=require('../../src/db/model/index')

 test('User 模型的各个属性符合预期',()=>{
     //build 会构建一个内存中的User实例，但不会提交到数据库中
     const user=User.build({
         userName:'zhangsan',
         password:'p123123',
         nickName:'张三',
         //gender:1,
         picture:'/xxx.png',
         city:'北京'
     })
     //测试属性
     expect(user.userName).toBe('zhangsan')
     expect(user.password).toBe('p123123')
     expect(user.nickName).toBe('张三')
     expect(user.gender).toBe(3)
     expect(user.picture).toBe('/xxx.png')
     expect(user.city).toBe('北京')
 })