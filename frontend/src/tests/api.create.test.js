// import axios from "axios";
import EmployeeService from "../services/employee.service.js";
import fakeData from "./utils/user";
const employee = fakeData.employeeFormData;

describe("Create employee controller", () => {
  test("Create employee with validate data. It should response status 201", async () => {
    const { status } = await EmployeeService.create(employee);
    expect(status).toBe(200);
  });

  test("Create employee with in-validate data (missing email). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["email"];
    const { status } = await EmployeeService.create(missingData);
    expect(status).toBe(400);
  });

  test("Create employee with in-validate data (missing first_name). It should response status 400", async () => {
    const missingData = { ...employee };
    delete missingData["first_name"];
    const { status } = await EmployeeService.create(missingData);
    expect(status).toBe(400);
  });

  test("Create employee with email duplicate. It should response status 400", async () => {
    // email duplicate with test 1
    const { status } = await EmployeeService.create(employee);
    expect(status).toBe(400);
  });
});
