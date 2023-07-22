var express = require('express');
var pool=require('./pool')
var router = express.Router();


router.post('/getRecord',function(req,res,next){
    console.log('body',req.body)
    pool.query("select J.*,(select studentname from student_detail E where E.studentid=J.studentid )as name , (select coursename from course C where C.courseid=J.courseid )as cou from jointransaction J where J.organizationid=? and J.courseid=? and J.batchid=?",[req.body.organization,req.body.courseid,req.body.batch],function(error,result){
    
        if(error)
        {
            console.log("Error:",error)
            return res.status(500).json([])
  
        }
        else
        {
            console.log('Result11',result)
            return res.status(200).json(result)
          
        }
    })
  })
  
  

  router.post('/getRecord1',function(req,res,next){
    console.log('body',req.body)
    pool.query("select J.*,(select studentid from student_detail E where E.studentid=J.studentid )as studentid,(select studentname from student_detail E where E.studentid=J.studentid )as name , (select coursename from course C where C.courseid=J.courseid )as cou from studentfees J where J.organizationid=? and J.courseid=? and J.batchid=?",[req.body.organization,req.body.courseid,req.body.batch],function(error,result){
    
        if(error)
        {
            console.log("Error:",error)
            return res.status(500).json([])
  
        }
        else
        {
            console.log('Result11',result)
            return res.status(200).json(result)
          
        }
    })
  })

module.exports=router