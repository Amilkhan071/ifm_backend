var express = require("express");
var pool = require("./pool");
var router = express.Router();
var upload = require("./multer");

router.post("/addNewCourse", upload.any(), function (req, res, next) {
  console.log("Files", req.files[0].filename);
  console.log("Data", req.body);
  pool.query(
    "insert into course(organizationid , coursename , courseduration , coursefees , description , courselogo) values(?,?,?,?,?,?)",
    [
      req.body.organizationid,
      req.body.courseName,
      req.body.courseDuration,
      req.body.courseFees,
      req.body.description,
      req.files[0].filename,
    ],
    function (error, result) {
      console.log("D", req.body);
      if (error) {
        console.log("kk", error);
        // return res.status(500).json([{ result: false }]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage, result: false });
      } else {
        // return res.status(200).json([{ result: true }]);
        return res.status(200).json({
          status: true,
          message: "Course Submitted.....",
          result: true,
        });
      }
    }
  );
});
router.post("/updateRecord", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "update course set coursename=? , courseduration=? , coursefees=? , description=? where courseid=? and organizationid=?",
    [
      req.body.courseName,
      req.body.courseDuration,
      req.body.courseFees,
      req.body.description,
      req.body.courseId,
      req.body.organizationid,
    ],
    function (error, result) {
      if (error) {
        // return res.status(500).json([{ result: false }]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage, result: false });
      } else {
        //  return res.status(200).json([{ result: true }]);
        return res
          .status(200)
          .json({ status: true, message: "Course Updated.....", result: true });
      }
    }
  );
});

router.post("/deleteCourse", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "delete from course  where courseid=?",
    [req.body.courseId],
    function (error, result) {
      if (error) {
        console.log(error);
        //   return res.status(500).json([{ result: false }]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage, result: false });
      } else {
        console.log(result);
        //return res.status(200).json([{ result: true }]);
        return res
          .status(200)
          .json({ status: true, message: "Course Deleted.....", result: true });
      }
    }
  );
});

router.post("/displayAll", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select * from course where organizationid=?",
    [req.body.organizationid],
    function (error, result) {
      if (error) {
        console.log(error);
        // return res.status(500).json([]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage });
      } else {
        console.log("xxxxx", result);
        // return res.status(200).json(result);
        return res
          .status(200)
          .json({ status: true, message: "All Course Found...", data: result });
      }
    }
  );
});

router.get("/displayAllCourse", function (req, res, next) {
  pool.query("select * from course ", function (error, result) {
    if (error) {
      console.log(error);
      //return res.status(500).json([]);
      return res.status(500).json({ status: false, message: error.sqlMessage });
    } else {
      console.log(result[0]);
      // return res.status(200).json(result);
      return res
        .status(200)
        .json({ status: true, message: "All Course Found...", data: result });
    }
  });
});

router.post("/demoid", function (req, res, next) {
  pool.query(
    "select B.*,(select coursename from course C where C.courseid=B.coursename)as cname from course C,batch B where C.courseid=?",
    [req.body.cid],
    function (error, result) {
      if (error) {
        console.log(error);
        //  return res.status(500).json([]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage });
      } else {
        console.log(result);
        if (result.length == 0) return res.status(200).json(null);
        else
          return res.status(200).json({
            status: true,
            message: "Course Found......",
            data: result[0],
          });

        // return res.status(200).json(result[0]);
      }
    }
  );
});

router.post("/displayById", function (req, res, next) {
  console.log("req.body",req.body)
  pool.query(
    "select * from course where courseid=?",
    [req.body.courseid],
    function (error, result) {
      if (error) {
        console.log(error);
        //  return res.status(500).json([]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage });
      } else {
        console.log(result);
        if (result.length == 0) return res.status(200).json(null);
        else
          return res.status(200).json({
            status: true,
            message: "Course Found......",
            data: result[0],
          });

        // return res.status(200).json(result[0]);
      }
    }
  );
});

router.post(
  "/updateCourseLogo",
  upload.single("courseLogo"),
  function (req, res, next) {
    console.log("Data", req.body);
    console.log("Files", req.file);
    pool.query(
      "update course set courselogo=? where courseid=?",
      [req.file.filename, req.body.courseId],
      function (error, result) {
        if (error) {
          console.log(error);
          //     return res.status(500).json([{ result: false }]);
          return res
            .status(500)
            .json({ status: false, message: error.sqlMessage, result: false });
        } else {
          console.log(result);
          // return res.status(200).json([{ result: true }]);
          return res.status(200).json({
            status: true,
            message: "Course Logo Updated......",
            result: true,
          });
        }
      }
    );
  }
);

router.post("/fetchFee", function (req, res, next) {
  console.log("Data", req.body);
  pool.query(
    "select * from course where courseid=?",
    [req.body.courseid],
    function (error, result) {
      if (error) {
        console.log(error);
        // return res.status(500).json([]);
        return res
          .status(500)
          .json({ status: false, message: error.sqlMessage });
      } else {
        console.log(result);
        //   return res.status(200).json(result);
        return res
          .status(200)
          .json({ status: true, message: "fees Found.......", data: result });
      }
    }
  );
});
module.exports = router;
