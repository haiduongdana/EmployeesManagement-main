import EmployeeService from "../services/employee.service.js";

describe("Delete employee controller", () => {
  let item = null;
  beforeEach(async () => {
    const { data } = await EmployeeService.getAll();
    if (data.items.length > 0) {
      item = data.items[0];
    }
  });

  test("Delete employee with id not exists. It should response status 404", async () => {
    const { status } = await EmployeeService.destroy(item.id);
    expect(status).toBe(404);
  });

  test("Delete employee. It should response status 204", async () => {
    const { status } = await EmployeeService.destroy(item.id);
    expect(status).toBe(204);
  });
});
