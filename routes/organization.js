var express = require("express");
var pool = require("./pool");
var router = express.Router();
var upload = require("./multer");
var jwt = require("jsonwebtoken")
/* GET home page. */
router.post("/addNewRecord", upload.any(), function (req, res, next) {
  // console.log("Files", req.files[0].filename, req.files[1].filename);
  // console.log("Data", req.body);
  pool.query(
    "insert into organization(organizationname,ownername,birthdate,gender,address,orgstate,orgcity,mobile,phone,email,picture,logo,password,status)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.organizationName,
      req.body.ownerName,
      req.body.birthdate,
      req.body.gender,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.mobile,
      req.body.phone,
      req.body.email,
      req.files[0].filename,
      req.files[1].filename,
      req.body.password,
      req.body.status,


    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});

       // return res.status(500).json([{ result: false }]);

      } else {
        // console.log(result);
        return res.status(200).json({status:true,message:'Organization Submitted.....', result: true});

        //return res.status(200).json([{ result: true }]);
      }
    }
  );
});

router.get("/displayAll", function (req, res, next) {
  pool.query("select * from organization", function (error, result) {
    if (error) {
      console.log(error);
     // return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

    } else {
      console.log(result);
      //return res.status(200).json(result);
      return res.status(200).json({status:true,message:'All Organization Found...',data:result});

    }
  });
});

router.post("/displayById", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "select * from organization where organizationid=?",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

      } else {
        console.log(result);
        console.log(result);
        if (result.length == 0) return res.status(500).json(null);
        else 
      return res.status(200).json({status:true,message:'All Organization Found...',data:result[0]});

       // return res.status(200).json(result[0]);
      }
    }
  );
});

router.post("/updateRecord", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "update organization set organizationname=?,ownername=?,birthdate=?,gender=?,address=?,orgstate=?,orgcity=?,mobile=?,phone=?,email=?,password=?,status=? where organizationid=?",
    [
      req.body.organizationName,
      req.body.ownerName,
      req.body.birthdate,
      req.body.gender,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.mobile,
      req.body.phone,
      req.body.email,
      req.body.password,
      req.body.status,
      req.body.organizationid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});

      } else {
        console.log(result);
       // return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Organization Updated.....', result: true});

      }
    }
  );
});


router.post("/updateLogo", upload.single("logo"), function (req, res, next) {
  console.log("Data", req.files);
  pool.query(
    "update organization set logo=? where organizationid=?",
    [req.file.filename, req.body.organizationid],
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

router.post(
  "/updatePicture",
  upload.single("picture"),
  function (req, res, next) {
    console.log("Data", req.files);
    pool.query(
      "update organization set picture=? where organizationid=?",
      [req.file.filename, req.body.organizationid],
      function (error, result) {
        if (error) {
          console.log(error);
          //return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false,message:error.sqlMessage, result: false});
  
        } else {
          console.log(result);
          //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:"Picture Updated.......", result: true});
  
        }
      }
    );
  }
);

router.post("/deleteRecord", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "delete from organization where organizationid=?",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false,message:error.sqlMessage, result: false});

      } else {
        console.log(result);
       // return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:"organization Deleted....", result: true});

      }
    }
  );
});

router.post("/checkLogin", function (req, res, next) {
  console.log("kk", res);
  pool.query(
    "select * from organization where email=? and password=? and status = 'Valid' ",
    [req.body.organizationid, req.body.password],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([]);
        return res.status(500).json({status:false,message:error.sqlMessage,});

      } else {
        console.log(result);
        if (result.length == 0 ) {
          return res.status(500).json(null);
        } else {
          let token = jwt.sign({id:req.body.organizationid,pwd:req.body.password},"not-so-secret",{expiresIn:'1d'})
        return res.status(200).json({status:true,message:'Organization Login Successfully...',data:result[0], accessToken:token});

          //return res.status(200).json(result[0]);
        }
      }
    }
  );
});

module.exports = router;
