// O "handler" é a função principal que a Netlify irá executar.
exports.handler = async function(event, context) {
    // Pega o token da API que vamos guardar de forma segura na Netlify.
    const FACILZAP_TOKEN = process.env.FACILZAP_TOKEN;
    const API_ENDPOINT = 'https://api.facilzap.app.br/produtos';

    try {
        const response = await fetch(API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${FACILZAP_TOKEN}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            // Se a API da FacilZap der erro, repassamos o erro.
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Erro na API FacilZap: ${response.statusText}` })
            };
        }

        const data = await response.json();

        // Se tudo der certo, retornamos os dados com sucesso.
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Permite que qualquer domínio acesse nosso proxy
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        // Se houver um erro de rede, retornamos um erro genérico.
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Erro ao conectar com a API: ${error.message}` })
        };
    }
};
