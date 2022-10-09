const { createEmployee } = require("../../src/controllers/employee.controller");
const { mockRequest, mockResponse } = require("../utils/commons");
import httpStatus from "http-status";
import { employee, files } from "../utils/user";

describe("Create employee controller", () => {
  test("Create employee with validate data. It should response status 201", async () => {
    const req = mockRequest({}, {}, employee, files);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.CREATED);
  });

  test("Create employee with in-validate data (missing email). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["email"];
    const req = mockRequest({}, {}, missingData, files);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  test("Create employee with in-validate data (missing first_name). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["first_name"];
    const req = mockRequest({}, {}, missingData, files);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  test("Create employee with in-validate data (missing last_name). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["last_name"];
    const req = mockRequest({}, {}, missingData, files);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  test("Create employee with in-validate data (missing phone). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["phone"];
    const req = mockRequest({}, {}, missingData, files);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  test("Create employee with in-validate data (missing photo). It should response status 400", async () => {
    const missingData = { ...employee };
    const req = mockRequest({}, {}, missingData, []);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  test("Create employee with email duplicate. It should response status 400", async () => {
    // email duplicate with test 1
    const req = mockRequest({}, {}, employee, files);
    const res = mockResponse();
    await createEmployee(req, res);
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });
});
