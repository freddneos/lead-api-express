const contactModel = require('../models/contactModel.js');
const { validationResult } = require('express-validator');

/**
 * contactController.js
 *
 * @description :: Server-side logic for managing contacts.
 */
class contactController {


    /**
     * contactController.list()
     */
    async list(req, res) {
        try {
            const contacts = await contactModel.find()
            return res.json({ data: contacts });
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    }

    /**
     * contactController.show()
     */
    async show(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const id = req.params.id;
        try {
            const contact = await contactModel.findOne({ _id: id })
            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }
            return res.json(contact);
        } catch (e) {
            return res.status(500).json({
                message: 'Error when getting contact.',
                error: e
            });
        }
    }

    /**
     * contactController.create()
     */
    async create(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const contact = new contactModel({
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            whatsapp: req.body.whatsapp,
            telegram: req.body.telegram,
            sms: req.body.sms,
            phone: req.body.phone,
            level: req.body.level,
            address: {
                country: req.body.address.country,
                zip_code: req.body.address.zip_code,
                city: req.body.address.city,
                district: req.body.address.district,
                address: req.body.address.address,
                number: req.body.address.number,
                complement: req.body.address.complement,
                reference: req.body.address.reference,
                lat: req.body.address.lat,
                long: req.body.address.long

            }

        })
        try {
            const contactSaved = await contact.save()
            return res.status(200).json({ contact: contactSaved })

        } catch (e) {
            res.status(400).json({ errors: [{ msg: e }] })
        }
    }

    /**
     * contactController.update()
     */
    async update(req, res) {
        var id = req.params.id;
        contactModel.findOne({ _id: id }, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact',
                    error: err
                });
            }
            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }

            contact.id = req.body.id ? req.body.id : contact.id;
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.email = req.body.email ? req.body.email : contact.email;
            contact.password = req.body.password ? req.body.password : contact.password;
            contact.active = req.body.active ? req.body.active : contact.active;

            contact.save(function (err, contact) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contact.',
                        error: err
                    });
                }

                return res.json(contact);
            });
        });
    }

    /**
     * contactController.remove()
     */
    async remove(req, res) {
        var id = req.params.id;
        try {
            const removed = await contactModel.findByIdAndRemove(id)
            return res.status(204).json();
        } catch (e) {
            return res.status(500).json({
                error: `Error when deleting the contact.${e}`
            });
        }
    }
};
module.exports = new contactController();