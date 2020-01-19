const userModel = require('../models/userModel.js');
const {validationResult} = require('express-validator');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
class UserController {


    /**
     * userController.list()
     */
    async list(req, res) {
        try {
            const users = await userModel.find()
            return res.json({ data: users });
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    }

    /**
     * userController.show()
     */
    async show(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const id = req.params.id;
        try {
            const user = await userModel.findOne({ _id: id })
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        }catch(e){
            return res.status(500).json({
                message: 'Error when getting user.',
                error: e
            });
        }
    }

    /**
     * userController.create()
     */
    async create(req, res) {
        console.log(req.body);
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,  
        })
        try {
           const  userSaved = await user.save()
           return res.status(200).json({user:userSaved}) 

        }catch(e){
            res.status(400).json({errors:[{msg:e}]})
        }
    }

    /**
     * userController.update()
     */
    async update(req, res) {
        var id = req.params.id;
        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.id = req.body.id ? req.body.id : user.id;
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;
            user.active = req.body.active ? req.body.active : user.active;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    }

    /**
     * userController.remove()
     */
    async remove(req, res) {
        var id = req.params.id;
        try {
            const removed = await userModel.findByIdAndRemove(id)
            return res.status(204).json();
        } catch (e) {
            return res.status(500).json({
                error: `Error when deleting the user.${e}`            });
        }
    }
};
module.exports = new UserController();