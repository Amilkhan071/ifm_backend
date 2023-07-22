var express = require("express");
var pool = require("./pool");
var router = express.Router();

router.post("/addNewRecord", function (req, res, next) {
  console.log("data", req.body);
  pool.query(
    "insert into batch (organizationid , coursename ,batchtime , status , batchname )values(?,?,?,?,?)",
    [
      req.body.organizationid,
      req.body.coursename,
      req.body.timing,
      req.body.status,
      req.body.batchname,
    ],
    function (error, result) {
      if (error) {
        //return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});

      } else {
        //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Batch Submitted.....', result: true});

      }
    }
  );
});

router.post("/displayAll", function (req, res, next) {
  pool.query(
    "select * from batch where organizationid=?",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status:false,
          message:error.sqlMessage,
        });
      } else {
        console.log(result);
        return res.status(200).json({
          status:true,
          message:'Batch Data Found........',
          data:result,
          });
      }
    }
  );
});

router.post("/getResult", function (req, res, next) {
  console.log("body", req.body);
  var q =
    "select * from batch where organizationid=? and coursename=? and batchname LIKE '%" +
    req.body.batch +
    "%'";
  pool.query(
    q,
    [req.body.organizationid, req.body.courseid],
    function (error, result) {
     
      if (error) {
        console.log(error);
        return res.status(500).json({
          status:false,
          message:error.sqlMessage,
        });
      } else {
        console.log(result);
        return res.status(200).json({
          status:true,
          message:'Data Found........',
          data:result,
          });
      }
   
    }
  );
});

router.post("/displayById", function (req, res, next) {
  pool.query(
    "select B.*,(select coursename from course C where C.courseid=B.coursename)as tempcoursename,(select BT.btstart from timingtable BT where BT.transactionid=B.batchtime)as starttime,(select BT.btend from timingtable BT where BT.transactionid=B.batchtime)as endtime from batch B where batchid=?",
    [req.body.batchid],
    function (error, result) {
   
      if (error) {
        return res.status(500).json({
          status:false,
          message:error.sqlMessage,
        });
      } 
      
       else {
        console.log(result);
        if (result.length == 0)
         return res.status(200).json(null);
        else
        // return res.status(200).json(result[0]);
         return res.status(200).json({
           status:true,
           message:'Data Found........',
           data:result[0],
           });

      }
   
   
    }
  );
});

router.post("/updateBatch", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "update batch set coursename=?,batchtime=?,status=?,batchname=? where batchid=?",
    [
      req.body.courseid,
      req.body.timings,
      req.body.status,
      req.body.batchname,
      req.body.batchid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});

      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Batch Updated......', result: true});

      }
    }
  );
});

router.post("/deleteBatch", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "delete from batch where batchid=?",
    [req.body.batchid],
    function (error, result) {
      if (error) {
        //return res.status(500).json([{ result: false }]);
    return res.status(500).json({status:false, message:error.sqlMessage, result: false});
     
      } else {
        console.log(result);
     //   return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Batch Deleted......', result: true});

      }
    }
  );
});
router.get("/batchdisplayAll", function (req, res, next) {
  pool.query(
    "select * from batch where batchid=? and  organizationid=? ",
    [req.body.batchid, req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([]);

        return res.status(500).json({
          status:false,
          message:error.sqlMessage,
        });
      } else {
        console.log(result[0]);
       // return res.status(200).json(result);
        return res.status(200).json({
          status:true,
          message:'All Batch Found........',
          data:result,
          });

      }
    }
  );
});

router.post("/getCourseBatch", function (req, res, next) {
  pool.query(
    "select * from batch where organizationid=? and coursename=?",
    [req.body.organizationid, req.body.coursename],
    function (error, result) {
      console.log("jj", req.body);
      if (error) {
        console.log(error);
      //  return res.status(500).json([]);
        return res.status(500).json({
          status:false,
          message:error.sqlMessage,
        });
      } else {
        //console.log(result);
        //return res.status(200).json(result);
        return res.status(200).json({
          status:true,
          message:'Cousre Found......',
          data:result,
          });
      }
    }
  );
});

module.exports = router;
