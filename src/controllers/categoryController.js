const categoryModel = require('../models/categoryModel.js');
const { validationResult } = require('express-validator');

/**
 * categoryController.js
 *
 * @description :: Server-side logic for managing categorys.
 */
class CategoryController {

    /**
     * categoryController.list()
     */
    async list(req, res) {
        let { page, limit, offset } = req.query

        limit = limit ? limit : 5;
        offset = offset ? offset : 0;
        page = page ? page : 1;


        const options = {
            page,
            limit,
            offset,
        }

        try {
            categoryModel.paginate({}, options, (err, result) => {
            
                res.set('Content-range' , `category ${0}-${result.limit}/${result.totalDocs}`)
                return res.json({ data: result.docs , perPage:result.limit ,page:result.page , totalPages: result.totalPages ,total:result.totalDocs });
            })
            //return res.json({ data: categorys });
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    }

    /**
     * categoryController.show()
     */
    async show(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id;
        try {
            const category = await categoryModel.findOne({ _id: id })
            if (!category) {
                return res.status(404).json({
                    message: 'No such category'
                });
            }
            return res.json({ data: category });
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting category.',
                error: e
            });
        }
    }

    /**
     * categoryController.create()
     */
    async create(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const category = new categoryModel({
            name: req.body.name,
            description: req.body.description,
        })
        try {
            const categorySaved = await category.save()
            return res.status(200).json({ data: categorySaved })

        } catch (e) {
            res.status(400).json({ errors: [{ msg: e }] })
        }
    }

    /**
     * categoryController.update()
     */
    async update(req, res) {
        var id = req.params.id;
        categoryModel.findOne({ _id: id }, function (err, category) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting category',
                    error: err
                });
            }
            if (!category) {
                return res.status(404).json({
                    message: 'No such category'
                });
            }

            category.id = req.body.id ? req.body.id : category.id;
            category.name = req.body.name ? req.body.name : category.name;
            category.description = req.body.description ? req.body.description : category.description;

            category.save(function (err, category) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating category.',
                        error: err
                    });
                }

                return res.json({ data: category });
            });
        });
    }

    /**
     * categoryController.remove()
     */
    async remove(req, res) {
        var id = req.params.id;
        try {
            const removed = await categoryModel.findByIdAndRemove(id)
            return res.status(204).json();
        } catch (e) {
            return res.status(500).json({
                error: `Error when deleting the category.${e}`
            });
        }
    }
};
module.exports = new CategoryController();