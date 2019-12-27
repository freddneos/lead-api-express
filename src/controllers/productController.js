const productModel = require('../models/productModel.js');
const categoryModel = require('../models/categoryModel.js');

const { validationResult } = require('express-validator');

/**
 * productController.js
 *
 * @description :: Server-side logic for managing products.
 */
class ProductController {


    /**
     * productController.list()
     */
    async list(req, res) {
        try {
            const products = await productModel.find().populate('category', 'name')
            return res.json({ products: products });
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    }

    async find(req, res) {
        const query = req.params.query
        let products = [];
        if (query.length <= 3) {
            return res.status(400).json({ message: "At least 4 characters" });
        }
        try {
            const productsByName = await productModel.find({ name: { $regex: query, $options: 'i' } })
            if (productsByName.length == 0) {
                const productsByDescription = await productModel.find({ description: { $regex: query, $options: 'i' } })
                if (productsByDescription.length == 0) {
                    return res.status(404).json({ message: "not found" });
                } else {
                    products = productsByDescription
                }
            } else {
                products = productsByName;
            }
            res.status(200).json(products)
        } catch (e) {
            return res.status(500).json({ error: e })
        }

    }

    /**
     * productController.show()
     */
    async show(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id;
        try {
            const product = await productModel.findOne({ _id: id })
            if (!product) {
                return res.status(404).json({
                    message: 'No such product'
                });
            }
            return res.json(product);
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting product.',
                error: e
            });
        }
    }

    /**
     * productController.create()
     */
    async create(req, res) {
        console.log(req.body);
        let category = {};
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            category = await categoryModel.findOne({ _id: req.body.category_id })

        } catch (e) {
            console.log('error =>', e)
            res.status(400).json({ errors: [{ msg: e }] })
        }

        const product = new productModel({
            name: req.body.name,
            description: req.body.description,
            ean13: req.body.ean13,
            //image: req.body.image,
            blackstripe: req.body.blackstripe,
            category: category
        })
        try {
            const productSaved = await product.save()
            return res.status(200).json({ product: productSaved })

        } catch (e) {
            res.status(400).json({ errors: [{ msg: e }] })
        }
    }

    /**
     * productController.update()
     */
    async update(req, res) {
        const id = req.params.id;
        let product = {}
        console.log(id)
        try {
            product = await productModel.findOne({ _id: id })
            console.log('product -> ', product)
            if (!product) {
                return res.status(404).json({
                    message: 'No such product'
                });
            }
        } catch (e) {
            console.log('error->', e)
            return res.status(500).json({
                message: 'Error when getting product',
                error: e
            });
        }
        product.id = req.body.id ? req.body.id : product.id;
        product.name = req.body.name ? req.body.name : product.name;
        product.description = req.body.description ? req.body.description : product.description;
        product.ean13 = req.body.ean13 ? req.body.ean13 : product.ean13;
        product.category_id = req.body.category_id ? req.body.category_id : product.category_id;

        try {
            const category = await categoryModel.findOne({_id: req.body.category_id})
            console.log('cat->',category)
            if(!category){
                return res.status(500).json({
                    message: 'category not found',
                });
            }
        }catch(e){
            return res.status(500).json({
                message: 'Error when getting category',
                error: e
            });
        }

        try {
            const result = await product.save()
            return res.json(result);
        } catch (e) {
            console.log('error -> ', e)
            return res.status(500).json({
                message: 'Error when updating product.',
                error: e
            });
        }
    }

    /**
     * productController.remove()
     */
    async remove(req, res) {
        var id = req.params.id;
        try {
            const removed = await productModel.findByIdAndRemove(id)
            return res.status(204).json();
        } catch (e) {
            return res.status(500).json({
                error: `Error when deleting the product.${e}`
            });
        }
    }
};
module.exports = new ProductController();