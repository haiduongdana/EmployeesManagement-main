const express = require("express");
const EmployeeController = require("../controllers/employee.controller");
const { validator } = require("../middlewares/validate");
const { EmployeeSchema } = require("../validator/employee.validator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file) cb(null, __basedir + "/public/");
  },
  filename: (req, file, cb) => {
    if (file) cb(null, "image/" + file.originalname);
  },
});

const upload = multer({ storage });
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/employee", EmployeeController.getListEmployee);
  router.post(
    "/employee",
    upload.array("photo", 12),
    validator(EmployeeSchema, "body"),
    EmployeeController.createEmployee
  );
  router.get("/employee/:empId", EmployeeController.employeeDetail);
  router.put(
    "/employee/:empId",
    upload.array("photo", 12),
    validator(EmployeeSchema, "body"),
    EmployeeController.updateEmployee
  );
  router.delete("/employee/:empId", EmployeeController.deleteEmployee);
  return app.use("/", router);
};

export default initWebRoute;
