const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context) => {
    for (const { body } of event.Records) {
        let book = JSON.parse(body);

        // console.log(typeof(book));
        // console.log(book);

        const params = {
            Item: {
                id: context.awsRequestId,
                nombre: book.nombre,
                autor: book.autor,
                año: book.año,
                categoria: book.categoria
            },
            TableName: "lab3-francisco"
        };

        console.log(params);

        db.put(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);
        });
    }
    console.log(`processed books: ${event.Records.length}`);
};
