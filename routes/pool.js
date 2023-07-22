var mysql=require('mysql')
var pool=mysql.createPool({

  host:'localhost',
  port:3306,
  user:'root',
  password:'amil1234',
  database:'ifm',
  connectionLimit:100,
  multipleStatements:true


})
module.exports=pool
