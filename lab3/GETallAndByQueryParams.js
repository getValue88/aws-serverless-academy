exports.handler = async(event) => {
    const query = event.queryStringParameters;
    const params = { TableName: "lab3-francisco" };

    const response = {
        headers: { "Content-Type": "application/json" }
    };

    try {
        if (!query) {
            const data = await db.scan(params).promise();
            response.body = JSON.stringify(data);
            response.statusCode = 200;
            return response;
        }

        if (!query.categoria) {
            response.body = 'Bad request';
            response.statusCode = 400;
            return response;
        }

        params.IndexName = 'categoria-index';
        params.KeyConditionExpression = 'categoria = :hashKey';
        params.ExpressionAttributeValues = { ':hashKey': query.categoria };

        const data = await db.query(params).promise();

        if (data.Items.length === 0) {
            response.body = 'Books for this category not found';
            response.statusCode = 404;
            return response;
        }

        response.body = JSON.stringify(data);
        response.statusCode = 200;
    }
    catch (err) {
        response.body = 'Internal server error';
        response.statusCode = 500;
    }

    return response;
};