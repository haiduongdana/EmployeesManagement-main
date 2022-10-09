// import axios from "axios";
import EmployeeService from "../services/employee.service.js";
import fakeData from "./utils/user";
const employee = fakeData.employeeFormData;

describe("Update employee API", () => {
  let item = null;
  beforeEach(async () => {
    const { status, data } = await EmployeeService.getAll();
    if (data.items.length > 0) {
      item = data.items[0];
    }
  });
  test("Update employee with validate data. It should response status 201", async () => {
    const { status } = await EmployeeService.update(employee, item.id);
    expect(status).toBe(200);
  });

  test("Update employee with in-validate data (missing email). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["email"];
    const { status } = await EmployeeService.create(missingData, item.id);
    expect(status).toBe(400);
  });

  test("Update employee with in-validate data (missing first_name). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["first_name"];
    const { status } = await EmployeeService.create(missingData, item.id);
    expect(status).toBe(400);
  });

  test("Update employee with email duplicate. It should response status 400", async () => {
    // email duplicate with test 1
    const { status } = await EmployeeService.create(employee, item.id);
    expect(status).toBe(400);
  });
});
