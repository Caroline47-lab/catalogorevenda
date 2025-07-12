exports.handler = async function(event, context) {
    // Recebe o token via query string
    const token = event.queryStringParameters.token;
    
    if (!token) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Token não fornecido" })
        };
    }

    const API_ENDPOINT = 'https://api.facilzap.app.br/produtos';

    try {
        const response = await fetch(API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        // ... resto do código permanece igual ...
    }
};
