const campaignModel = require('../models/campaignModel.js');
const productModel = require('../models/productModel.js');

const { validationResult } = require('express-validator');

/**
 * campaignController.js
 *
 * @description :: Server-side logic for managing campaigns.
 */
class campaignController {


    /**
     * campaignController.list()
     */
    async list(req, res) {
        try {
            const campaigns = await campaignModel.find().populate('product')
            return res.json({ campaigns: campaigns });
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    }

    async find(req, res) {
        const query = req.params.query
        let campaigns = [];
        if (query.length <= 3) {
            return res.status(400).json({ message: "At least 4 characters" });
        }
        try {
            const campaignsByName = await campaignModel.find({ name: { $regex: query, $options: 'i' } })
            if (campaignsByName.length == 0) {
                const campaignsByDescription = await campaignModel.find({ description: { $regex: query, $options: 'i' } })
                if (campaignsByDescription.length == 0) {
                    return res.status(404).json({ message: "not found" });
                } else {
                    campaigns = campaignsByDescription
                }
            } else {
                campaigns = campaignsByName;
            }
            res.status(200).json(campaigns)
        } catch (e) {
            return res.status(500).json({ error: e })
        }

    }

    /**
     * campaignController.show()
     */
    async show(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id;
        try {
            const campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }
            return res.json(campaign);
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign.',
                error: e
            });
        }
    }

    /**
     * campaignController.create()
     */
    async create(req, res) {
        console.log(req.body);
        let category = {};
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const campaign = new campaignModel({

            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            sms: req.body.sms,
            email: req.body.email,
            whatsapp: req.body.whatsapp,
            telegram: req.body.telegram,
            facebook: req.body.facebook,
            instagram: req.body.instagram

        })
        try {
            const campaignSaved = await campaign.save()
            return res.status(200).json({ campaign: campaignSaved })

        } catch (e) {
            res.status(400).json({ errors: [{ msg: e }] })
        }
    }

    async addHighlight(req, res) {
        const id = req.params.campaign_id;
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            console.log('campaign -> ', campaign)
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }
        } catch (e) {
            console.log('error->', e)
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }

        const { highlight } = req.body

        highlight.forEach(async item => {
            console.log('item -> ', item)
            try {
                const product = await productModel.findOne({ id: item.product })
               
                if (!product){
                    console.log('produto não existe!')
                }else{
                    item.product = product._id;
                }
                campaign.highlight.push(item)

            } catch (e) {
                console.log('erro no add product',e)
                return true
            }
        })

        try {
            const campaignSaved = await campaign.save()
            campaignSaved.populate('product')
            return res.status(200).json({ campaign: campaignSaved })

        } catch (e) {
            res.status(400).json({ errors: [{ msg: e }] })
        }
    }

    /**
     * campaignController.update()
     */
    async update(req, res) {
        const id = req.params.id;
        let campaign = {}
        console.log(id)
        try {
            campaign = await campaignModel.findOne({ _id: id })
            console.log('campaign -> ', campaign)
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }
        } catch (e) {
            console.log('error->', e)
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }
        campaign.id = req.body.id ? req.body.id : campaign.id;
        campaign.name = req.body.name ? req.body.name : campaign.name;
        campaign.description = req.body.description ? req.body.description : campaign.description;
        campaign.ean13 = req.body.ean13 ? req.body.ean13 : campaign.ean13;
        campaign.category_id = req.body.category_id ? req.body.category_id : campaign.category_id;

        try {
            const category = await categoryModel.findOne({ _id: req.body.category_id })
            console.log('cat->', category)
            if (!category) {
                return res.status(500).json({
                    message: 'category not found',
                });
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting category',
                error: e
            });
        }

        try {
            const result = await campaign.save()
            return res.json(result);
        } catch (e) {
            console.log('error -> ', e)
            return res.status(500).json({
                message: 'Error when updating campaign.',
                error: e
            });
        }
    }

    /**
     * campaignController.remove()
     */
    async remove(req, res) {
        var id = req.params.id;
        try {
            const removed = await campaignModel.findByIdAndRemove(id)
            return res.status(204).json();
        } catch (e) {
            return res.status(500).json({
                error: `Error when deleting the campaign.${e}`
            });
        }
    }
};
module.exports = new campaignController();