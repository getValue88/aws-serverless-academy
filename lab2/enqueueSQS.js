const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = (event) => {
    const params = {
        DelaySeconds: 10,
        MessageBody: JSON.stringify(event),
        QueueUrl: "https://sqs.us-west-2.amazonaws.com/509130302659/lab2-ex2-francisco"
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data.MessageId);
        }
    });
};