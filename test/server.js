/**
 * @description jest server
 * @author 郭蓼
 */

 const request=require('supertest');
 const server=require('../src/app').callback();//能产生请求的app

 module.exports=request(server)
