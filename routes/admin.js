var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/checkAdminLogin", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select * from administrator where adminid=? and password=?",
    [req.body.adminId, req.body.password],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ RESULT: false });
      } else {
        if (result.length == 0) {
          console.log("false with 200");
          return res.status(200).json({ RESULT: false });
        } else {
          return res.status(200).json({ RESULT: true });
        }
      }
    }
  );
});

module.exports = router;
