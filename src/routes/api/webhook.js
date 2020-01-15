const express = require('express');
const router = express.Router();
const whatsapp = require('../../services/whatsappService')

/*
 * GET
 */
router.post('/', (req, res) => {

    if (Array.isArray(req.body)) {
        if (req.body[0] === 'Presence') {
            const number = req.body[1].id.substring(0, 13)
            const message = "Testing api"
            const type = req.body[1].type
            console.log("Enviar mensagem!");
            whatsapp.sendMessage(message, number)

        }
    }
    return res.status(200);
});

module.exports = router;
