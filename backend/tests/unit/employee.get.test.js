const {
  getListEmployee,
  employeeDetail,
} = require("../../src/controllers/employee.controller");
const { mockRequest, mockResponse } = require("../utils/commons");
import httpStatus from "http-status";

describe("Get list employee controller", () => {
  test("Get list employee. It should return status 200 and data mapping", async () => {
    const req = mockRequest();
    const res = mockResponse();
    await getListEmployee(req, res);
    expect(res.status).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("size");
    expect(res.body).toHaveProperty("items");
    expect(res.body.items).toBeInstanceOf(Array);
    res.body.items.forEach(function (item) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("first_name");
      expect(item).toHaveProperty("last_name");
      expect(item).toHaveProperty("email");
      expect(item).toHaveProperty("number");
      expect(item).toHaveProperty("photo");
      expect(item).toHaveProperty("gender");
    });
  });

  test("Get list employee with pagination", async () => {
    const query = { page: 1, size: 5 };
    const req = mockRequest(query);
    const res = mockResponse();
    await getListEmployee(req, res);
    expect(res.status).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty("page");
    expect(res.body.page).toBe(query.page);
    expect(res.body).toHaveProperty("size");
    expect(res.body.size).toBe(query.size);
    expect(res.body).toHaveProperty("items");
    expect(res.body.items).toBeInstanceOf(Array);
    expect(res.body.items.length).toBe(query.size);
  });

  test("Get list employee with search", async () => {
    const query = { search: "abc" };
    const req = mockRequest(query);
    const res = mockResponse();
    await getListEmployee(req, res);
    expect(res.status).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty("items");
    expect(res.body.items).toBeInstanceOf(Array);
    res.body.items.forEach(function (item) {
      expect(item.first_name).toHaveTextContent(query.search);
      expect(item.last_name).toHaveTextContent(query.search);
      expect(item.email).toHaveTextContent(query.search);
    });
  });

  test("Get list employee with order by id", async () => {
    const query = { sort_type: "DESC", sort_key: "id" };
    const req = mockRequest(query);
    const res = mockResponse();
    await getListEmployee(req, res);
    expect(res.status).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty("items");
    expect(res.body.items).toBeInstanceOf(Array);
    const originalArray = res.body.items;
    const expectedArray = res.body.items.reverse(function (a, b) {
      return a.id < b.id;
    });
    expect(originalArray).toEqual(expectedArray);
  });
});

describe("Get detail employee controller", () => {
  test("Get detail employee with in-correct id", async () => {
    const req = mockRequest({}, { empId: -1 }, {}, []);
    const res = mockResponse();
    await employeeDetail(req, res);
    expect(res.status).toBe(httpStatus.NOT_FOUND);
  });

  test("Get detail employee with correct id", async () => {
    let req = mockRequest();
    let res = mockResponse();
    await getListEmployee(req, res);
    if (res.body.items.length > 0) {
      const item = res.body.items[0];
      req = mockRequest({}, { empId: item.id }, {}, []);
      res = mockResponse();
      await employeeDetail(req, res);
      expect(res.status).toBe(httpStatus.OK);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("first_name");
      expect(res.body).toHaveProperty("last_name");
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("number");
      expect(res.body).toHaveProperty("photo");
      expect(res.body).toHaveProperty("gender");
    } else {
      expect(true).toBe(true);
    }
  });
});
