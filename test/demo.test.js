const expectExport = require("_expect@24.9.0@expect")

/**
 * @description test demo
 * @author 郭蓼
 */

 function sum(a,b){
     return a+b
 }
 test('test demo 1',()=>{
     const res=sum(10,20)
     expect(res).toBe(30)
 })