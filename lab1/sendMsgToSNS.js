const aws = require('aws-sdk');
const sns = new aws.SNS();

exports.handler = (event, context) => {
    const params = {
        TopicArn: 'arn:aws:sns:us-west-2:509130302659:SNSTopicTest2_sendEmail',
        Subject: 'Email from SNS',
        Message: 'Hi from SNS'
    }
    
    sns.publish(params, (err, data) => {
        if (err) console.log(err, err.stack); 
        else     console.log(data);           
    });
};