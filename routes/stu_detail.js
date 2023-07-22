var express = require("express");
var pool = require("./pool");
var express = require("express");
var router = express.Router();
var upload = require("./multer");
router.post("/addNewRecord", upload.any(), function (req, res, next) {
  console.log("Files", req.files[0].filename);
  console.log("Data", req.body);
  pool.query(
    "insert into student_detail(organizationid,studentname,fathername,birthdate,gender,email,mobile,parentmobileno,phoneno,whatsappnumber,password,address,stustate,stucity,picture,qualification,quaremark,institutename ,courseid , currentdate,remark,batchid)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.organizationid,
      req.body.studentname,
      req.body.fathername,
      req.body.birthdate,
      req.body.gender,
      req.body.email,
      req.body.mobile,
      req.body.parentno,
      req.body.phoneno,
      req.body.Whatsappnumber,
      req.body.password,
      req.body.address,
      req.body.stustate,
      req.body.stucity,
      req.files[0].filename,
      req.body.stuqualification,
      req.body.qualificationremark,
      req.body.institutename,
      req.body.courseid,
      req.body.currentdate,
      req.body.remark,
      req.body.batchid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});

      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Student Submitted.....', result: true});

      }
    }
  );
});

router.post("/displayAll", function (req, res, next) {
  pool.query(
    "select * from student_detail  where studentid not in (select studentid from studentfees where courseid=? and batchid=? and organizationid=?) and organizationid=? and courseid=?",
    [
      req.body.couid,
      req.body.batch,
      req.body.organizationid,
      req.body.organizationid,
      req.body.couid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

      } else {
        console.log(result);
       // return res.status(200).json(result);
      return res.status(200).json({status:true,message:'All Student Found...',data:result});

      }
    }
  );
});

router.post("/displayAllRecord", function (req, res, next) {
  pool.query(
    "select * from student_detail where organizationid=? ",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

      } else {
        console.log(result);
       // return res.status(200).json(result);
      return res.status(200).json({status:true,message:'All Student Found...',data:result});

      }
    }
  );
});

router.get("/displayAllStudent", function (req, res, next) {
  pool.query("select * from student_detail ", function (error, result) {
    if (error) {
      console.log(error);
      //return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

    } else {
      console.log(result);
      //return res.status(200).json(result);
      return res.status(200).json({status:true,message:'All Student Found...',data:result});

    }
  });
});

router.post("/displayById", function (req, res, next) {
  // console(req.body)
  pool.query(
    "select * from student_detail where studentid=? and organizationid=?",
    [req.body.studentid, req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

      } else {
        console.log(result);
        if (result.length == 0) return res.status(500).json(null);
        else 
      return res.status(200).json({status:true,message:'All Student Found...',data:result[0]});

        //return res.status(200).json(result[0]);
      }
    }
  );
});

router.post("/updateRecord", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "update student_detail set studentname=?, fathername=? , birthdate=? , gender=? , email=? , mobile=? , parentmobileno=? , phoneno=? , whatsappnumber=? , address=? , stustate=? , stucity=? ,qualification=? , quaremark=? , institutename=? , courseid=? ,currentdate=? , remark=?, batchid=?  where studentid=? and organizationid=?",
    [
      req.body.studentname,
      req.body.fathername,
      req.body.birthdate,
      req.body.gender,
      req.body.email,
      req.body.mobile,
      req.body.parentno,
      req.body.phoneno,
      req.body.Whatsappnumber,
      //req.body.password,
      req.body.address,
      req.body.stustate,
      req.body.stucity,
      req.body.stuqualification,
      req.body.quaremark,
      req.body.institutename,
      req.body.courseid,
      req.body.currentdate,
      req.body.remark,
      req.body.batchid,
      req.body.studentid,
      req.body.organizationid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});

      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Student Updated.....', result: true});

      }
    }
  );
});

router.post("/deleteRecord", function (req, res, next) {
  pool.query(
    "delete from student_detail where studentid=?",
    [req.body.studentid],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([{ result: false }]);
       return res.status(500).json({status:false,message:error.sqlMessage, result: false});

      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:"Student Deleted....", result: true});

      }
    }
  );
});

router.post("/updateLogo", upload.single("picture"), function (req, res, next) {
  console.log("Data", req.files);
  pool.query(
    "update student_detail set picture=? where studentid=?",
    [req.file.filename, req.body.studentid],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([{ result: false }]);
      return res.status(500).json({status:false,message:error.sqlMessage, result: false});

      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
      return res.status(200).json({status:true,message:"Logo Updated.......", result: true});

      }
    }
  );
});

// router.post('/displayAdmin', function(req, res, next) {
//   pool.query("select * from admintable where emailid=? and password=?",[req.body.emailid , req.body.password],function(error,result){
//    console.log(req.body)

//     // if(error)
//     // {
//     //   // console.log('Data',req.body)
//     //   console.log(result);
//     //   return res.status(200).json(result[0])

//     // }
//     // else
//     // { console.log('error',false)
//     //    return res.status(500).json([])
//     // }
//     if(error) throw error
//     else if(result.length)
//     {
//       return res.status(200).json([{'result':true}])
//       console.log(result);
//     }

//     else
//     {
//       return res.status(500).json([{'result':false}])
//       console.log(error);
//     }

//   })

// });

router.post("/getbtbcs", function (req, res, next) {
  pool.query(
    "select * from batch where coursename=?",
    [req.body.coursename],
    function (error, result) {
      if (error) {
        console.log(error);
        res.json({status:false,data:[] })
      } else {
        res.json({status:true,data:result })
      }
    }
  );
});


module.exports = router;
