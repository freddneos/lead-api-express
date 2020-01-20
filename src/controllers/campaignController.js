const contactModel = require('../models/contactModel.js');
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
            return res.json({ data: campaigns });
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
                const campaignsByDescription = await campaignModel.find({ description: { $regex: query, $options: 'i' } }).populate({
                    path:'contacts',
                    model:'contact'

                })
                if (campaignsByDescription.length == 0) {
                    return res.status(404).json({ message: "not found" });
                } else {
                    campaigns = campaignsByDescription
                }
            } else {
                campaigns = campaignsByName;
            }
            res.status(200).json({data:campaigns})
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
            return res.json({data:campaign});
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
            return res.status(200).json({ data: campaignSaved })

        } catch (e) {
            res.status(400).json({ errors: [{ msg: e }] })
        }
    }

    async addHighlight(req, res) {
        const id = req.params.campaign_id;
        let { highlight } = req.body
        let highArr = [];
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            if (campaign.highlight.length > 0) {
                const promise = campaign.highlight.map(async element => {
                    const found = await highlight.findIndex(product => product.product === element.product.toString())
                    if (found !== undefined && found !== -1) {
                        highlight.splice(found, 1)
                    }
                });

                await Promise.all(promise)
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }

        const promises = highlight.map(async item => {
            try {
                const product = await productModel.findOne({ _id: item.product })
                if (!product) {
                } else {
                    item.product = product._id;
                }
                highArr.push(item)

            } catch (error) {
                console.log(`product ${item.product} not found`)
            }
        })
        await Promise.all(promises);

        campaign.highlight.push(...highArr)

        try {
            const campaignSaved = await campaign.save()
            return res.status(200).json({ campaign: campaignSaved })


        } catch (error) {
            return res.status(400).json({ error })

        }

    }

    async delHighlight(req, res) {
        const id = req.params.campaign_id;
        let { highlight } = req.body
        let highArr = [];
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            if (campaign.highlight.length > 0) {
                const promise = highlight.map(async element => {
                    const found = await campaign.highlight.findIndex(product => product.product.toString() === element.product.toString())
                    if (found !== undefined && found !== -1) {
                        campaign.highlight.splice(found, 1)
                    }
                });
                await Promise.all(promise)
                const campaignSaved = await campaign.save()
                return res.status(200).json({ campaign: campaignSaved })
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }
    }




    async addRecomended(req, res) {
        const id = req.params.campaign_id;
        let { recomended } = req.body
        let recoArr = [];
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            if (campaign.recomended.length > 0) {
                const promise = campaign.recomended.map(async element => {
                    const found = await recomended.findIndex(product => product.product === element.product.toString())
                    if (found !== undefined && found !== -1) {
                        recomended.splice(found, 1)
                    }
                });

                await Promise.all(promise)
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }

        const promises = recomended.map(async item => {
            try {
                const product = await productModel.findOne({ _id: item.product })
                if (!product) {
                } else {
                    item.product = product._id;
                }
                recoArr.push(item)

            } catch (error) {
                console.log(`product ${item.product} not found`)
            }
        })
        await Promise.all(promises);

        campaign.recomended.push(...recoArr)

        try {
            const campaignSaved = await campaign.save()
            return res.status(200).json({ campaign: campaignSaved })


        } catch (error) {
            return res.status(400).json({ error })

        }

    }



    async delRecomended(req, res) {
        const id = req.params.campaign_id;
        let { recomended } = req.body
        let highArr = [];
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            if (campaign.recomended.length > 0) {
                const promise = recomended.map(async element => {
                    const found = await campaign.recomended.findIndex(product => product.product.toString() === element.product.toString())
                    if (found !== undefined && found !== -1) {
                        campaign.recomended.splice(found, 1)
                    }
                });
                await Promise.all(promise)
                const campaignSaved = await campaign.save()
                return res.status(200).json({ campaign: campaignSaved })
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }
    }

    async addContact(req, res) {
        const id = req.params.campaign_id;
        let { contact } = req.body
        let contactArr = [];
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            if (campaign.contacts.length > 0) {
                console.log('chegou aqui')
                const promise = campaign.contacts.map(async element => {
                    const found = await contact.findIndex(contact => contact === element.toString())
                    if (found !== undefined && found !== -1) {
                        contact.splice(found, 1)
                    }
                });
                4
                await Promise.all(promise)
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
        }

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }

        const promises = contact.map(async item => {
            try {
                const contact = await contactModel.findOne({ _id: item })
                if (!contact) {
                    console.log(`contact ${item} not found`)
                } else {
                    item = contact._id;
                    contactArr.push(item)
                }

            } catch (error) {
                console.log(`contact ${item} not found`)
            }
        })
        await Promise.all(promises);

        campaign.contacts.push(...contactArr)

        try {
            const campaignSaved = await campaign.save()
            return res.status(200).json({ campaign: campaignSaved })


        } catch (error) {
            return res.status(400).json({ error })

        }

    }

    async delContact(req, res) {
        const id = req.params.campaign_id;
        let { contact } = req.body
        let highArr = [];
        let campaign = {}
        try {
            campaign = await campaignModel.findOne({ _id: id })
            if (!campaign) {
                return res.status(404).json({
                    message: 'No such campaign'
                });
            }

            console.log('antes', campaign.contacts)
            if (campaign.contacts.length > 0) {
                const promise = contact.map(async element => {
                    const found = await campaign.contacts.findIndex(contact => contact.toString() === element)
                    if (found !== undefined && found !== -1) {
                        campaign.contacts.splice(found, 1)
                    }
                });
                await Promise.all(promise)
                console.log('depois', campaign.contact)

                const campaignSaved = await campaign.save()
                return res.status(200).json({ campaign: campaignSaved })
            }
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting campaign',
                error: e
            });
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