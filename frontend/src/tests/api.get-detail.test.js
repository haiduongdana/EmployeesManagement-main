// import axios from "axios";
import EmployeeService from "../services/employee.service.js";

describe("Get detail employee", () => {
  test("Get detail employee with in-correct id", async () => {
    const { status } = await EmployeeService.getOne(0);
    expect(status).toBe(404);
  });

  test("Get detail employee with correct id", async () => {
    const { data: listData } = await EmployeeService.getAll();
    expect(listData.items.length).toBeGreaterThan(0);
    const item = listData.items[0];
    const { status, data } = await EmployeeService.getOne(item.id);
    expect(status).toBe(200);
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("first_name");
    expect(data).toHaveProperty("last_name");
    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("number");
    expect(data).toHaveProperty("photo");
    expect(data).toHaveProperty("gender");
  });
});
