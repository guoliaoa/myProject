/**
 * @description json test
 * @author 郭蓼
 */

 const server=require('./server');

 test("json 返回数据格式正确",async ()=>{
     const res=await server.get('/json');
     expect(res.body).toEqual({
         title:'koa2 json'
     })
 })