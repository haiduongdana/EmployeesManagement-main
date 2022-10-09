const {
  updateEmployee,
  employeeDetail,
  getListEmployee,
  createEmployee,
} = require("../../src/controllers/employee.controller");
const { mockRequest, mockResponse } = require("../utils/commons");
import httpStatus from "http-status";
import { employee, files } from "../utils/user";

describe("Update employee controller", () => {
  let item = null;
  beforeEach(async () => {
    let _req = mockRequest({}, {}, {}, []);
    let _res = mockResponse();
    await getListEmployee(_req, _res);
    if (_res.body.items.length > 0) {
      item = _res.body.items[0];
    }
  });

  test("Update employee with validate data. It should response status 200", async () => {
    if (item) {
      const updateData = {
        first_name: "Update",
        last_name: item.last_name,
        email: item.email,
        number: item.number,
        gender: item.gender,
      };
      const req = mockRequest({}, { empId: item.id }, updateData, []);
      const res = mockResponse();
      await updateEmployee(req, res);
      expect(res.status).toBe(httpStatus.OK);
      // Check update data
      expect(res.body.first_name).toBe("Update");
    }
  });

  test("Update employee with id not exists. It should response status 400", async () => {
    const req = mockRequest({}, { empId: -1 }, employee, []);
    const res = mockResponse();
    await updateEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  test("Update employee with in-validate data (missing email). It should response status 400", async () => {
    if (item) {
      const updateData = {
        first_name: "Update",
        last_name: item.last_name,
        number: item.number,
        gender: item.gender,
      };
      const req = mockRequest({}, { empId: item.id }, updateData, []);
      const res = mockResponse();
      await updateEmployee(req, res);
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    }
  });

  test("Update employee with in-validate data (missing first_name). It should response status 400", async () => {
    if (item) {
      const updateData = {
        last_name: item.last_name,
        number: item.number,
        gender: item.gender,
      };
      const req = mockRequest({}, { empId: item.id }, updateData, []);
      const res = mockResponse();
      await updateEmployee(req, res);
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    }
  });

  test("Update employee with in-validate data (missing last_name). It should response status 400", async () => {
    if (item) {
      const updateData = {
        first_name: "Update",
        number: item.number,
        gender: item.gender,
      };
      const req = mockRequest({}, { empId: item.id }, updateData, []);
      const res = mockResponse();
      await updateEmployee(req, res);
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    }
  });

  test("Update employee with in-validate data (missing number). It should response status 400", async () => {
    if (item) {
      const updateData = {
        first_name: "Update",
        last_name: item.last_name,
        gender: item.gender,
      };
      const req = mockRequest({}, { empId: item.id }, updateData, []);
      const res = mockResponse();
      await updateEmployee(req, res);
      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    }
  });
});
