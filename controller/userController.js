
const userModel = require('../model/userModel');


let createUser = async function (req, res) {
    try {

        const requestBody = req.body;
        let savedData = requestBody
         
        await userModel.create( savedData);
        res.status(201).send({ status: true, msg: requestBody });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }}
module.exports.createUser = createUser

