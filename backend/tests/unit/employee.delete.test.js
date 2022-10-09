const {
  updateEmployee,
  employeeDetail,
  getListEmployee,
  deleteEmployee,
} = require("../../src/controllers/employee.controller");
const { mockRequest, mockResponse } = require("../utils/commons");
import httpStatus from "http-status";
import { employee, files } from "../utils/user";

describe("Delete employee controller", () => {
  let item = null;
  beforeEach(async () => {
    let _req = mockRequest({}, {}, {}, []);
    let _res = mockResponse();
    await getListEmployee(_req, _res);
    if (_res.body.items.length > 0) {
      item = _res.body.items[0];
    }
  });

  test("Delete employee with id not exists. It should response status 404", async () => {
    const req = mockRequest({}, { empId: -1 }, employee, []);
    const res = mockResponse();
    await deleteEmployee(req, res);
    expect(res.status).toBe(httpStatus.NOT_FOUND);
  });

  test("Delete employee. It should response status 204", async () => {
    if (item) {
      const req = mockRequest({}, { empId: item.id }, {}, []);
      const res = mockResponse();
      await deleteEmployee(req, res);
      expect(res.status).toBe(httpStatus.NO_CONTENT);
    }
  });
});
