var express = require("express");
var pool = require("./pool");
var router = express.Router();
var upload = require("./multer");
router.post("/adminCheck", function (req, res, next) {
  pool.query(
    "select * from admins where emailid=? and password=?",
    [req.body.emailid, req.body.password],
    function (error, result) {
      if (error) {
        console.log("ll", body);
        return res.status(500).json({status:false,message:error.sqlMessage});
      } else {
        console.log(result);
        if (result.length == 0) return res.status(500).json(null);
        else return res.status(200).json({status:true,message:'Admin Login Successfully.....',data:result[0]});
      }
    }
  );
});
module.exports = router;
