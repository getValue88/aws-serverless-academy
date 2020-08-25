const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event, context) => {
    const { id } = event.pathParameters;

    const response = {
        headers: { "Content-Type": "application/json" }
    };
    
    const params = {
        TableName: "lab3-francisco",
        Key: { id: id },
        ReturnValues: 'ALL_OLD'
    };

    try {
        const book = await db.delete(params).promise();

        if (!book.Attributes) {
            response.statusCode = 404;
            response.body = 'Book not found';
            return response;
        }

        response.statusCode = 200;
        response.body = `Removed book with Id: ${book.Attributes.id}`;
        return response;

    }
    catch (err) {
        response.statusCode = 500;
        response.body = 'Internal server error';
        return response;
    }
};