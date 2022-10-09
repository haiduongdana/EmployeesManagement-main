const db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const getEmployeeById = (employee_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let employee = await db.Employee.findOne({
        where: { id: employee_id },
      });
      if (!employee) {
        reject(new Error("Sorry, Employee not found !"));
      }
      resolve(employee);
    } catch (error) {
      reject(error);
    }
  });
};

const addEmployee = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let new_employee = await db.Employee.create({
        ...data,
      });
      resolve(new_employee);
    } catch (error) {
      reject(error);
    }
  });
};
const listEmployee = (page, size, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { sort_type, sort_key } = sort;
      const filter_condition = {
        ...(filter && filter.trim().length > 0
          ? {
              where: {
                [Op.or]: [
                  { first_name: { [Op.like]: "%" + filter + "%" } },
                  { last_name: { [Op.like]: "%" + filter + "%" } },
                  { email: { [Op.like]: "%" + filter + "%" } },
                ],
              },
            }
          : {}),
      };
      let condition = {
        ...(sort_key && sort_type ? { order: [[sort_key, sort_type]] } : {}),
        ...filter_condition,
      };
      if (page && size) {
        const offset = 0 + (page - 1) * size;
        condition = {
          ...condition,
          limit: size,
          offset: offset,
        };
      }
      const { count, rows } = await db.Employee.findAndCountAll({
        ...condition,
      });
      resolve({ count, rows });
    } catch (error) {
      reject(error);
    }
  });
};

const updateEmployeeById = (data, instance) => {
  return new Promise(async (resolve, reject) => {
    try {
      await instance.update({
        ...data,
      });
      resolve(instance);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteEmployeeById = (employee_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let delete_Employee = await db.Employee.destroy({
        where: { id: employee_id },
      });
      if (!delete_Employee) {
        reject(new Error("Employee not found"));
      }
      resolve(delete_Employee);
    } catch (error) {
      reject(error);
    }
  });
};

const getOneBy = async (filters) => {
  try {
    const records = await db.Employee.findAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) return record;
    }
  } catch (error) {
    return error;
  }
};

const checkEmailExist = (emailEmployee, instance = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let condition = {
        where: { email: emailEmployee },
      };
      // exclude current instance
      if (instance) {
        condition = {
          ...condition,
          where: {
            ...condition.where,
            id: { [Op.notIn]: [instance.id] },
          },
        };
      }
      let check_email_exist = await db.Employee.findAll({
        ...condition,
      });
      if (check_email_exist.length != 0) {
        reject(new Error("Sorry, Email already exists !"));
      }
      resolve(check_email_exist);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  listEmployee,
  addEmployee,
  deleteEmployeeById,
  updateEmployeeById,
  getEmployeeById,
  getOneBy,
  checkEmailExist,
};
