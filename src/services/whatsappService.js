const request = require("request");
require('dotenv/config');

const mainUrl = process.env.WHATSAPP_URL
const token = process.env.WHATSAPP_TOKEN

class whatsappService {
    async sendMessage(message, number) {

        const options = {
            method: 'POST',
            url: mainUrl,
            headers:
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                Authorization: token,
                accept: 'application/json'
            },
            body:
            {
                menssage: message,
                number: number
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }
}

module.exports = new whatsappService();