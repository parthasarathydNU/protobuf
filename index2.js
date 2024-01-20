const Schema = require("./employees_pb");
const fs = require("fs");

const hussein = new Schema.Employee();
hussein.setId(1001);
hussein.setName("Hussein");
hussein.setSalary(1001);

const ahmed = new Schema.Employee();
ahmed.setId(1002);
ahmed.setName("ahmed");
ahmed.setSalary(9000);

const rick = new Schema.Employee();
rick.setId(1003);
rick.setName("rick");
rick.setSalary(5000);

const employees = new Schema.Emplyees();
employees.addEmployees(hussein);
employees.addEmployees(ahmed);
employees.addEmployees(rick);


console.log(" My name is " + hussein.getName());

const bytes = employees.serializeBinary();
console.log("binary " + bytes);

fs.writeFileSync("employeesProtoBytes", bytes );

const employees2 = Schema.Emplyees.deserializeBinary(bytes);

console.log(employees2.toString());