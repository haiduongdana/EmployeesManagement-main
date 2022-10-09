import { faker } from '@faker-js/faker';
const db = require("../../src/models/index")

const employee = {
    first_name:	faker.name.firstName(),
    last_name: 	faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    number: faker.phone.number(),
    gender: false,
};

const files = [
    {
      originalname: 'file.name',
      mimetype: 'file.type',
      path: 'file.url',
      buffer: Buffer.from('file'), 
    },
]

const insertEmployees = async (employees) => {
    await db.Employee.bulkCreate(employees.map((employee) => ({ ...employee })));
};


module.exports = {
    employee,
    files,
    insertEmployees,
};
