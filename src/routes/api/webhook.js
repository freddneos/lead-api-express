const express = require('express');
const router = express.Router();
const whatsapp = require('../../services/whatsappService')
let email = require('../../services/emailService')

/*
 * GET
 */
router.post('/', (req, res) => {

    if (Array.isArray(req.body)) {
        if (req.body[0] === 'Presence') {
            const number = req.body[1].id.substring(0, 13)
            const type = req.body[1].type
            console.log("é array!", req.body)
            console.log("Enviar mensagem!");
            if (number == '5521986105006' && (type === 'available' || type === 'composing')) {
                let messageInd = Math.floor(Math.random() * 10)
                let message = ['Benção', 'Como esta o beto?', 'Como esta o Daniel?', 'Como esta o Digo?', 'Como esta a kel?', 'falha!']
                console.log(message[messageInd])
                whatsapp.sendMessage(message[messageInd], number)
            }
            if (number == '5521984623153' && (type === 'available' || type === 'composing')) {
                let messageInd = Math.floor(Math.random() * 10)
                let message = ['fala play', 'o que mandas?', 'como esta o devs?', 'e o youpluv vai dar bom ?', 'chora', 'eu escolhi o melhor...']
                console.log(message[messageInd])
                whatsapp.sendMessage(message[messageInd], number)
            }
            if (number == '5521985230245' && (type === 'available' || type === 'composing')) {
                let messageInd = Math.floor(Math.random() * 10)
                let message = ['Partiu portugal?', 'Como esta o Daniel?', 'Como esta o Digo?', 'Como esta a kel?', 'falha!']
                console.log(message[messageInd])
                whatsapp.sendMessage(message[messageInd], number)
            }
        }
    }
    return res.status(200);
});

router.post('/send_message', async (req, res) => {
    const { message, number } = req.body
    //await whatsapp.getStatus()
    const ret = await whatsapp.reload() // (message, number)
    return res.status(200).json({ data: ret });

});


router.post('/send_email', async (req, res) => {
    const {to , message ,subject} = req.body
    const ret = await email.sendEmail(to , message ,subject) // (message, number)
    return res.status(200).json({ data: ret });

});

module.exports = router;