const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();
    
exports.handler = (event, context) => {
    console.log(JSON.stringify(event));
    const object = event.Records[0];
    const nameAndType = object.s3.object.key.split('.');
    
    const params = {
        Item: {
            nombre: nameAndType[0],
            tipo: nameAndType[1],
            fecha: Date.now().toString(),
            tamanio: object.s3.object.size.toString()
        },
        TableName: 'lab2-ex1-francisco'
    }
    
    dynamodb.put(params, (err, data) => {
        if (err) console.log(err, err.stack); 
        else     console.log(data);
    });
};