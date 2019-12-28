const fs = require('fs');
const productModel = require('../models/productModel')
const util = require('util');
const mv = require('mv')

const rename = util.promisify(mv);

class uploadController {

    async upload(req, res) {
        const type = req.body.type
        let product = {}
        let folder = "./uploads/"
        let subfolder = ""
        if (type == 'product') {
            const product_id = req.body.product_id
            console.log(product_id)
            subfolder = 'files/products/'
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
        var newPlace = folder + 'products/'+ newName
        var novo = newPlace;
        var host = process.env.APP_HOST || `http://${req.hostname}:${process.env.APP_PORT||5000}`
        var imgUrl = `${host}/${subfolder}${newName}`;
        try {
            console.log('temp->',temporario)
            console.log('new->',novo)
            console.log('img->' , imgUrl)
            await rename(temporario, novo)
            product.image = imgUrl;
            const editedProduct = await product.save()
            res.json({ message: "enviado com sucesso.", file: product.image });
        } catch (e) {
            return res.status(400).json({ message: "error on rename", error: e })
        }
    }
}

module.exports = new uploadController()