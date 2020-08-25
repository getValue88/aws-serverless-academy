const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();

exports.handler = (event) => {
    for (const { body } of event.Records) {
        const employee = JSON.parse(body);
        let params = {
            TableName: 'lab2-ex2-francisco',
            Item: {
                id: employee.apellidos[0] + Date.now().toString(),
                nombres: employee.nombres,
                apellidos: employee.apellidos,
                direccion: employee.direccion,
                telefono: employee.telefono,
                edad: employee.edad,
                cargo: employee.cargo
            }
        }

        dynamodb.put(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);
        });
    }
    return `Successfully processed ${event.Records.length} employees.`;
};