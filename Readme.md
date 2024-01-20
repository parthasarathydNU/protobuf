# Protobuf

Protocol buffer is a message format.

Example of writing a sample json object to disk.
```js
const fs = require("fs");

const employees = [];

employees.push({
    "name": "Hussein",
    "salary" : 1000,
    "id" : 1001
});

const ahmed = {
    "name": "Ahmed",
    "salary": 9000,
    "id" : 1002
}
employees.push(ahmed);

employees.push({
    "name": "Rick",
    "salary" : 5000,
    "id" : 1003
});

// 157B - file size
fs.writeFileSync("jsondata.json", JSON.stringify(employees));

console.log(JSON.stringify(employees));
```

Writing a simple json object to a file, we notice that the file size is 157 Bytes
```json
[
  { "name": "Hussein", "salary": 1000, "id": 1001 },
  { "name": "Ahmed", "salary": 9000, "id": 1002 },
  { "name": "Rick", "salary": 5000, "id": 1003 }
]
```

Protocol buffer is a representation of structured data, while JSON is not structured data. The proto file can be used for all languages and it is the developer's responsibility to use the proto schema file to generate the data types to be used in the program.

`.proto` is the extension for protocol file. It is just a schema definition for our structured data. 

**Here is the syntax of a proto file.**

```proto
syntax = "proto3";

message Employee {
	int32 id = 1;
	string name = 2;
	float salary = 3;
}

message Emplyees {
	repeated Employee employees = 1;
}

// 1 refers to the position of the field in the type Employee
```

### Protoc

Compiler built by google to compile a proto file to a given language.
We install the executable from this [link](https://github.com/protocolbuffers/protobuf/releases?q=20&expanded=true)
We run the following command to compile a .proto file to a js schema: 
`.../protoc-3/bin/protoc --js_out=import_style=commonjs,binary:. employees.proto`

How the generated schema is used:
```js
// employees_pb.js is the generated js file
const Schema = require("./employees_pb");

const hussein = new Schema.Employee();

hussein.setId(1001);
hussein.setName("Hussein");
hussein.setSalary(1001);

console.log(" My name is " + hussein.getName());

const employees = new Schema.Employees();

employees.addEmployees(hussein);
employees.addEmployees(ahmed);
employees.addEmployees(rick);
...
```

#### But what is the advantage here ? 

The advantage here is that this employees object can be serialized to a binary and then stored to disk. It is this binary that is sent across the wire! And the data size will be significantly smaller. 

```js
const bytes = employees.serializeBinary();
console.log("binary " + bytes);

// 52B - file size
fs.writeFileSync("employeesProtoBytes", bytes );

// binary 10,17,8,233,7,18,7,72,117,115,115,101,105,110,29,0,64,122,68,10,15,8,234,7,18,5,97,104,109,101,100,29,0,160,12,70,10,14,8,235,7,18,4,114,105,99,107,29,0,64,156,69
```

**We notice that the binary file is only 52B whereas the json file stored to disk is 157B**

This is a significant improvement in size of the stored data and can translate to faster data transfer speeds across network! 

3 X less data to transfer.

**Deserializing the binary to get back the data**

```js
const employees2 = Schema.Emplyees.deserializeBinary(bytes);
console.log(employees2.toString());

// 1001,Hussein,1001,1002,ahmed,9000,1003,rick,5000
```

#### Advantages of protobuf

- Having a schema helps get our data structured
- Having a schema helps with making optimizations as we can store data more efficiently as we know how to read the data and this leads to less errors during execution / compilation
- Smaller disk and network footprint + compression added by HTTP
- Language neutral protocol format - can output the pb file to any language to build classes in that language
- grpc is built on top of protobuf

#### Cons of protobuf

- Time taken to set up schema and compiling it to the output language
- The protofile needs to be recompiled every time we have an update to the schema
- The protoc binary needs to be regularly updated to get lates patches from google
- New code schema might break our code that was dependent on the previous schema / protoc compiler
- Overkill for building smaller applications




