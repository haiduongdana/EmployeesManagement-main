import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import FormData from "form-data";

const employee = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  number: faker.phone.number(),
  gender: false,
  photo: "photo",
};

const employeeFormData = new FormData();
employeeFormData.append("first_name", faker.name.firstName());
employeeFormData.append("last_name", faker.name.lastName());
employeeFormData.append("email", faker.internet.email().toLowerCase());
employeeFormData.append("number", faker.phone.number());
employeeFormData.append("gender", false);
employeeFormData.append("photo", fs.createReadStream("demo_pic.png"));

const files = [
  {
    originalname: "file.name",
    mimetype: "file.type",
    path: "file.url",
    buffer: Buffer.from("file"),
  },
];

const fakeData = {
  employee,
  files,
  employeeFormData,
};

export default fakeData;
