exports.handler = async (event, context) => {
    const message = event.Records[0].Sns.Message;
    console.log(message);

    const response = {
        statusCode: 200,
        body: message,
    };
    
    console.log(response);
    return response;
};