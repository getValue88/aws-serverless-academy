const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event, context) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: "lab3-francisco",
        Key: { id: id }
    };

    const response = {
        headers: { "Content-Type": "application/json" }
    };

    try {
        const data = await db.get(params).promise();
        if (!data.Item) {
            response.body = 'Book not found';
            response.statusCode = 404;
            return response;
        }

        response.body = JSON.stringify(data);
        response.statusCode = 200;
        return response;
    }
    catch (err) {
        response.body = `Internal server error`;
        response.statusCode = 500;
    }
};