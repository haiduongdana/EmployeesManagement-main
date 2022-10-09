// import axios from "axios";
import EmployeeService from "../services/employee.service.js";

describe("get list employee", () => {
  test("Get list employee. It should return status 200 and data mapping", async () => {
    const { status, data } = await EmployeeService.getAll();
    expect(status).toBe(200);
    expect(data).toHaveProperty("total");
    expect(data).toHaveProperty("page");
    expect(data).toHaveProperty("size");
    expect(data).toHaveProperty("items");
    expect(data.items).toBeInstanceOf(Array);
    data.items.forEach(function (item) {
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
    const params = { page: 1, size: 5 };
    const { status, data } = await EmployeeService.getAll(params);
    expect(status).toBe(200);
    expect(data).toHaveProperty("page");
    expect(data.page).toBe(params.page);
    expect(data).toHaveProperty("size");
    expect(data.size).toBe(params.size);
    expect(data).toHaveProperty("items");
    expect(data.items).toBeInstanceOf(Array);
    expect(data.items.length).toBe(params.size);
  });

  test("Get list employee with search", async () => {
    const params = { search: "abc" };
    const { status, data } = await EmployeeService.getAll(params);
    expect(status).toBe(200);
    expect(data).toHaveProperty("items");
    expect(data.items).toBeInstanceOf(Array);
    data.items.forEach(function (item) {
      expect(item.first_name).toHaveTextContent(params.search);
      expect(item.last_name).toHaveTextContent(params.search);
      expect(item.email).toHaveTextContent(params.search);
    });
  });

  test("Get list employee with order by id", async () => {
    const params = { sort_type: "DESC", sort_key: "id" };
    const { status, data } = await EmployeeService.getAll(params);
    expect(status).toBe(200);
    expect(data).toHaveProperty("items");
    expect(data.items).toBeInstanceOf(Array);
    const originalArray = data.items;
    const expectedArray = data.items.reverse(function (a, b) {
      return a.id < b.id;
    });
    expect(originalArray).toEqual(expectedArray);
  });
});
