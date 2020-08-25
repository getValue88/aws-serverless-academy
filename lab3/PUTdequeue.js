const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {
    for (const { body } of event.Records) {
        let book = JSON.parse(body);

        let params = {
            TableName: 'lab3-francisco',
            Key: { 'id': book.id },
            UpdateExpression: `SET nombre = :nombre, autor = :autor, #anio = :year, categoria = :categoria`,
            ConditionExpression: 'attribute_exists(id)',
            ExpressionAttributeNames: { '#anio': 'año' },
            ExpressionAttributeValues: {
                ':nombre': book.nombre,
                ':autor': book.autor,
                ':year': book.año,
                ':categoria': book.categoria
            },
            ReturnValues: "ALL_NEW"
        };

        const data = await db.update(params).promise();
        console.log(data);
    }
    return `Successfully processed ${event.Records.length} messages.`;
};
