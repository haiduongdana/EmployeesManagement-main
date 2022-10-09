const {
  listEmployee,
  addEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
  checkEmailExist,
} = require("../services/employee.service");
const { EmployeeSchema } = require("../validator/employee.validator");

const createEmployee = async (req, res) => {
  try {
    let employee = req.body;
    employee["photo"] = req.files[0].filename;
    const { error } = EmployeeSchema.validate(req.body);
    if (error) return res.status(400).json(response({}, error.message, 0));
    await checkEmailExist(employee.email);
    let instance = await addEmployee(employee);
    return res.status(201).json(instance);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getListEmployee = async (req, res) => {
  try {
    const params = req.query || {};
    let { page, size } = params;
    size = size ? parseInt(size) : null;
    page = page ? parseInt(page) : null;

    const sort = {
      sort_type: params.sort_type,
      sort_key: params.sort_key,
    };
    let { count, rows } = await listEmployee(page, size, sort, params.search);
    const data = {
      total: count,
      page: page,
      size: size,
      items: rows,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const employeeDetail = async (req, res) => {
  try {
    let employeeId = req.params.empId;
    let employee = await getEmployeeById(employeeId);

    return res.status(200).json(employee);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    let employeeId = req.params.empId;
    let instance = await getEmployeeById(employeeId);

    let employee_data = req.body;
    if (req.files.length > 0) {
      employee_data["photo"] = req.files[0].filename;
    }

    const { error } = EmployeeSchema.validate(employee_data);
    if (error) return res.status(400).json(response({}, error.message, 0));

    await checkEmailExist(employee_data.email, instance);

    let result = await updateEmployeeById(employee_data, instance);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    let id = req.params.empId;
    await deleteEmployeeById(id);

    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  getListEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  employeeDetail,
};
