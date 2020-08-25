const AWS = require('aws-sdk');
const SQS = new AWS.SQS();
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {
    const { id } = event.pathParameters;
    let message;

    const response = {
        headers: { "Content-Type": "application/json" }
    };

    try {
        const data = await db.get({
            'TableName': 'lab3-francisco',
            'Key': { 'id': id }
        }).promise();

        if (!data.Item) {
            response.statusCode = 404;
            response.body = 'Book not found';
            return response;
        }

        message = JSON.parse(event.body);
        message.id = id;

        const params = {
            DelaySeconds: 10,
            MessageBody: JSON.stringify(message),
            QueueUrl: 'https://sqs.us-west-2.amazonaws.com/509130302659/lab3-put-francisco'
        };

        await SQS.sendMessage(params).promise();
        response.body = `Book updated`;
        response.statusCode = 200;
    }
    catch (err) {
        console.log(err);
        response.body = 'Internal server error';
        response.statusCode = 500;
    }

    return response;
};
