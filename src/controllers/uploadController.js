const fs = require('fs');
const productModel = require('../models/productModel')
const util = require('util');
const config = require('config')

const rename = util.promisify(fs.rename);

class uploadController {

    async upload(req, res) {
        const type = req.body.type
        let product = {}
        let folder = "./uploads/"
        if (type == 'product') {
            const product_id = req.body.product_id
            console.log(product_id)
            folder = './uploads/products/'
            try {
                product = await productModel.findOne({ _id: product_id })
                if (!product) {
                    return res.status(400).json({ message: 'product does not exist' })
                }
            } catch (e) {
                return res.status(400).json({ message: "error to find a product", error: e })
            }
        } else {
            res.status(400).json({ message: 'please review your request body , type must be (product , contact or user)' })
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        var arquivo = req.files.file;
        var temporario = req.files.file.path;
        var rand = Math.floor(Math.random() * 100000) + '_'
        var newName = rand + req.files.file.name
        var newPlace = folder + newName
        var novo = newPlace;
        console.log(config.get("APP_PORT") , req.hostname)
        try {
            await rename(temporario, novo)
            product.image = `http://${req.hostname}:${config.get('APP_PORT')}/uploads/products/${newName}`;
            const editedProduct = await product.save()
            res.json({ message: "enviado com sucesso.", file: product.image });
        } catch (e) {
            return res.status(400).json({ message: "error on rename", error: product.image })
        }
    }
}

module.exports = new uploadController()