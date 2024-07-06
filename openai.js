const { OpenAIAPIKey } = require('./config'); // Asegúrate de tener config.js con tu clave de API

class OpenAIAPI {
    static async generateResponse(userMessage) {
        const fetch = (await import('node-fetch')).default;
        const apiKey = OpenAIAPIKey;
        const endpoint = 'https://api.openai.com/v1/chat/completions'; // Cambia el endpoint
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Asegúrate de especificar el modelo
                messages: [{ role: 'user', content: userMessage }], // Cambia el formato del mensaje
                max_tokens: 150,
            }),
        });
        const responseData = await response.json();
        // Log the entire API response for debugging
        console.log('Response from OpenAI API:', responseData);
        // Check if choices array is defined and not empty
        if (responseData.choices && responseData.choices.length > 0) {
            return responseData.choices[0].message.content.trim();
        } else {
            // Handle the case where choices array is undefined or empty
            console.error('Error: No valid response from OpenAI API');
            return 'Sorry, I couldn\'t understand that.';
        }
    }
}

module.exports = { OpenAIAPI };
