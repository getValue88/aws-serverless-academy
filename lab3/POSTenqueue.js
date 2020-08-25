const AWS = require('aws-sdk');
const SQS = new AWS.SQS();

exports.handler = async(event) => {
   const response = {
      headers: { "Content-Type": "application/json" }
   };

   const params = {
      DelaySeconds: 10,
      MessageBody: event.body,
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/509130302659/lab3-post-francisco'
   };


   try {
      await SQS.sendMessage(params).promise();
      response.body = 'New book added';
      response.statusCode = 201;
   }
   catch (err) {
      response.body = 'Internal server error';
      response.statusCode = 500;
   }

   return response;
};