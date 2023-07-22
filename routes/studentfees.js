var express = require("express");
var pool = require("./pool");
var router = express.Router();

// router.post('/addNewRecord',function(req,res,next)
// {

//   // pool.query('insert into studentfees (studentid , courseid ,batchtime , fees , dateadmission , feespaid , status)values(?,?,?,?,?,?,?)',[req.body.studentid , req.body.courseid , req.body.timing , req.body.fees , req.body.dateadmission, req.body.feespaid , req.body.status ],function(result,error)
//   pool.query('insert into studentfees (organizationid , studentid , courseid , batchtime , fees , dateadmission , feespaid , status) values(?,?,?,?,?,?,?,?)'[req.body.organizationid , req.body.studentid , req.body.courseid , req.body.timing , req.body.fees , req.body.dateadmission, req.body.feespaid , req.body.status],function(error , result)
//   {

//       if(error)
//       {
//         console.log('data', req.body);
//         return res.status(500).json([{'result':false}])
//       }

//       else
//       {
//           console.log('result',result)
//         return res.status(200).json([{'result':true}])
//       }
//   })
// })

router.post("/joincourse", function (req, res, next) {
  console.log("nn", req.body.time);
  pool.query(
    "insert into studentfees (studentid , courseid ,  fees , dateadmission , feespaid , status , organizationid , feesremain , batchid ) values (?,?,?,?,?,?,?,?,?)",
    [
      req.body.studentid,
      req.body.courseid,
      req.body.fees,
      req.body.dateadmission,
      req.body.feespaid,
      req.body.status,
      req.body.organizationid,
      req.body.feesremain,
      req.body.batchid,
    ],
    function (error, result) {
      if (error) {
        console.log("error", error);
        return res.status(500).json([{ error: false }]);
      } else {
        console.log("result", error);
        return res.status(200).json([{ result: true }]);
      }
    }
  );
});

router.post("/jointransaction", function (req, res, next) {
  pool.query(
    "insert into jointransaction (studentid , organizationid , courseid , fees , depositdate , feesdeposit , feesremain ,  status , batchid ) values (?,?,?,?,?,?,?,?,?)",
    [
      req.body.studentid,
      req.body.organizationid,
      req.body.courseid,
      req.body.fees,
      req.body.dateadmission,
      req.body.feespaid,
      req.body.feesremain,
      req.body.status,
      //req.body.time,
      req.body.batchid
    ],
    function (error, result) {
      console.log(req.body);
      if (error) {
          console.log(error) 
        return res.status(500).json([{ result: false }]);
      } else {
        return res.status(200).json([{ result: true }]);
      }
    }
  );
});

router.post("/displayById", function (req, res, next) {
  pool.query(
    "select * from jointransaction where transactionid=?  ",
    [req.body.transactionid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([]);
      } else {
        console.log(result);
        if (result.length == 0) return res.status(200).json(null);
        else return res.status(200).json(result[0]);
      }
    }
  );
});

router.get("/displayAll", function (req, res, next) {
  pool.query("select * from jointransaction ", function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json([]);
    } else {
      console.log(result[0]);
      return res.status(200).json(result);
    }
  });
});

router.post("/getRecord", function (req, res, next) {
  console.log("body", req.body);
  pool.query(
    "select J.*,(select studentname from student_detail E where E.studentid=J.studentid )as name , (select coursename from course C where C.courseid=J.courseid )as cou from studentfees J where J.organizationid=? and J.courseid=? and J.batchid=?",
    [req.body.organization, req.body.courseid, req.body.batch],
    function (error, result) {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json([]);
      } else {
        console.log("Result11", result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/getRecordByBatch", function (req, res, next) {
  console.log("body", req.body);
  pool.query(
    "select J.*,(select studentname from student_detail E where E.studentid=J.studentid )as studentname  from studentfees J where J.organizationid=?  and J.batchid=?",
    [req.body.organizationid, req.body.batchtime],
    function (error, result) {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json([]);
      } else {
        console.log("Result11", result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/getStudentFees", function (req, res, next) {
  console.log("body", req.body);
  pool.query(
    "select sum(feesdeposit) as feesdeposit  from jointransaction where organizationid=?  and batchid=? and studentid=?",
    [req.body.organizationid, req.body.batchtime, req.body.studentid],
    function (error, result) {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json([]);
      } else {
        console.log("Result11", result);
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/displayById2", function (req, res, next) {
  pool.query(
    "select S.*,(select studentname from student_detail E where E.studentid=S.studentid) as name , (select coursename from course C where C.courseid=S.courseid)as CName , (select batchname from batch B where B.batchid=S.batchid) as BName  from studentfees S where studentid=?",
    [req.body.stuid],
    function (error, result) {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json([]);
      } else {
        console.log("RESULT", result);

        if (result.length == 0) return res.status(500).json(null);
        else return res.status(200).json(result[0]);
      }
    }
  );
});

router.post("/updateCourse", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "update studentfees set feespaid=?,feesremain=?,status=? where studentid=?",
    [req.body.feesPaid, req.body.feesRemain, req.body.status, req.body.sId],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([{ result: false }]);
      } else {
        console.log(result);
        return res.status(200).json([{ result: true }]);
      }
    }
  );
});
router.post("/joinTransaction1", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "insert into jointransaction(organizationid,studentid,courseid,fees,depositdate,feesdeposit,batchid,feesremain,status)values(?,?,?,?,?,?,?,?,?)",
    [
      req.body.organizationId,
      req.body.studentId,
      req.body.courseId,
      req.body.courseFees,
      req.body.currentDate,
      req.body.feesPaid,
      req.body.batchName,
      req.body.feesRemain,
      req.body.status,
      
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json([{ result: false }]);
      } else {
        console.log(result);
        return res.status(200).json([{ result: true }]);
      }
    }
  );
});

router.post("/feeStatus", function (req, res, next) {
  pool.query(
    "select S.*,(select studentid from studentfees E where E.studentid=S.studentid) as name   from jointransaction S where organizationid=?",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json([]);
      } else {
        console.log("RESULT", result);

        if (result.length == 0) return res.status(500).json(null);
        else return res.status(200).json(result[0]);
      }
    }
  );
});

module.exports = router;
