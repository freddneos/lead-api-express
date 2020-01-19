require('dotenv/config');
const util = require('util');
const mainUrl = process.env.WHATSAPP_URL
const token = process.env.WHATSAPP_TOKEN

const headers = {
    'cache-control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: token,
    accept: 'application/json'
}

const request = util.promisify(require("request"));

class whatsappService {
    async sendMessage(message, number) {
        const api = '/send_message';

        const options = {
            method: 'POST',
            url: mainUrl + api,
            headers,
            body:
            {
                menssage: message,
                number: number
            },
            json: true
        };

        const response = await request(options, body)

        return response
    }


    async sendFile(fileObject) {
        /*
        {
            "caption": "string",
            "number": "string",
            "url": "string"
        }
         */
        const api = '/send_message_file_from_url';
        const options = {
            method: 'POST',
            url: mainUrl + api,
            headers,
            body:
                fileObject,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }
    async getContacts() {

        const api = '/contacts'
        const options = {
            method: 'GET',
            url: mainUrl + api,
            headers:
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                Authorization: token,
                accept: 'application/json'
            },
            json: true
        };
        const response = await request(options)
        return response.body;
    }

    async generateQrCode() {
        const api = '/generate_qrcode'
        const options = {
            method: 'GET',
            url: mainUrl + api,
            headers,
            json: true
        };
        const response = await request(options);
        console.log(response.body)
        return response.body
    }

    async reload() {
        const api = '/reload'
        const options = {
            method: 'GET',
            url: mainUrl + api,
            headers,
            json: true
        };
        const response = await request(options);
        console.log(response.body)
        return response.body
    }


    async sendLocation(location) {
        /*
        {
            "address": "string",
            "lat": 0,
            "lng": 0,
            "name": "string",
            "number": "string"
        }
        */
        const api = '/send_location'
        const options = {
            method: 'POST',
            url: mainUrl + api,
            headers,
            body:
                location,
            json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }
    async getStatus() {
        const api = '/status'

        const options = {
            method: 'GET',
            url: mainUrl + api,
            headers,
            json: true
        };

        const response = request(options)
        return response.body
    }
}

module.exports = new whatsappService();