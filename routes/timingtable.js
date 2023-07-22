var express = require("express");
var pool = require("./pool");
var router = express.Router();
var upload = require("./multer");

/* GET home page. */
router.post("/addNewRecord", function (req, res, next) {
  try {
    console.log("Data", req.body);
    pool.query(
      "insert into timingtable (organizationid ,btstart,btend)values(?,?,?)",
      [req.body.organizationid, req.body.btStart, req.body.btEnd],
      function (error, result) {
        if (error) {
          console.log("xxxxxxx", error);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});
          
          //return res.status(500).json({ result: false });
        } else {
          console.log("zzzzzz", result);
          //return res.status(200).json({ result: true });
          return res.status(200).json({status:true,message:'Time Submitted.....', result: true});
        
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/displayAll", function (req, res, next) {
  pool.query(
    "select * from timingtable where organizationid=? ",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([]);
        return res.status(500).json({status:false,message:error.sqlMessage});
      
      } else {
        console.log(result[0]);
        //return res.status(200).json(result);
        return res.status(200).json({status:true,message:'All Time Found...',data:result});
      
      }
    }
  );
});

router.get("/displayAlltimingtable", function (req, res, next) {
  pool.query("select * from timingtable ", function (error, result) {
    if (error) {
      console.log(error);
      //return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});
    
    } else {
      console.log(result[0]);
     // return res.status(200).json(result);
     return res.status(200).json({status:true,message:'All Time Found...',data:result});
    
    }
  });
});

router.post("/updateRecord", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "update timingtable set btstart=?,btend=? where transactionid=?",
    [req.body.btStart, req.body.btEnd, req.body.transactionid],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([{ result: false }]);
        return res.status(500).json({status:false, message:error.sqlMessage, result: false});
      
      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
        return res.status(200).json({status:true,message:'Time Updated.....', result: true});
      
      }
    }
  );
});

router.post("/deleteRecord", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "delete from timingtable where transactionid=?",
    [req.body.transactionid],
    function (error, result) {
      if (error) {
        console.log(error);
       // return res.status(500).json([{ result: false }]);
       return res.status(500).json({status:false,message:error.sqlMessage, result: false});
      
      } else {
        console.log(result);
       // return res.status(200).json([{ result: true }]);
       return res.status(200).json({status:true,message:"Time Deleted....", result: true});
      
      }
    }
  );
});

router.post("/displayById", function (req, res, next) {
  pool.query(
    "select * from timingtable where transactionid=?",
    [req.body.transactionid],
    function (error, result) {
      if (error) {
        console.log(error);
        //return res.status(500).json([]);
      return res.status(500).json({status:false,message:error.sqlMessage});

      } else {
        console.log(result);
        if (result.length == 0) return res.status(200).json(null);
        else
        return res.status(200).json({status:true,message:'All Time Found...',data:result[0]});

        // return res.status(200).json(result[0]);
      }
    }
  );
});
module.exports = router;
