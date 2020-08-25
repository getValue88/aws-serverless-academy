const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async(event, context) => {
    const params = {
        TableName: 'lab2-ex2-francisco'
    };

    const data = await documentClient.scan(params, (err, data) => {
        if (err) console.log(err);
        else console.log(data);
    }).promise();

    if (data.Items) {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        }
        return response;
    }
};