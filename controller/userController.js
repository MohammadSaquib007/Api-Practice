//create user
const validator = require("../validator/validator.js")
const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken")


let createUser = async function (req, res) {
    try {

        const requestBody = req.body;
        let { firstName, lastName, email, Phone } = requestBody
        
        //validation

        if (!validator.isValidEmail(email)) {
           return res.status(400).send({ status: false, msg: "plz provide valid email id" })
       }
       if (!validator.isValid(Phone)) {
           return res.status(400).send({ status: false, msg: "plz provide valid phone no" })
       }
        let savedData = requestBody
        console.log(savedData)
        await userModel.create(savedData);
        res.status(201).send({ status: true, msg: savedData });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

// get Api
const userDetails = async function (req, res) {

    try {
        let identity = req.params.userId
        const getDetails = await userModel.find({ _id: identity })
        return res.status(200).send({ status: true, msg: getDetails })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })

    }
}

// get Api query
const userDetail = async function (req, res) {

    try {
        let identity = req.query.userId
        const getDetails = await userModel.find({ _id: identity })
        return res.status(200).send({ status: true, msg: getDetails })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })

    }
}

//login Api
 const login = async function (req, res) {
    try {
           

            let email = req.body.email;
            if (!validator.isValidEmail(email)) {
                return res.status(400).send({ status: false, msg: "plz provide valid email id" })
            }
            let Phone = req.body.Phone;
            if (!validator.isValidPhone(Phone)) {
                return res.status(400).send({ status: false, msg: "plz provide valid Phone number" })
            }

            if (email && Phone) {
                const userDetails= await userModel.findOne({ email: email, Phone: Phone });
        
                if (userDetails) {
                    token =  jwt.sign({ userId: userDetails._id }, "Helium")//token generation
                    
                    res.send({ status: true, data: userDetails, Token: token });
                }
                else {
                    res.status(404).send({ status: false, msg: "Invalid credentials!" });
                }
            
            
            }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }}

    //update api
    const updateApi = async function (req, res) {

        try {
            let userId = req.params.Id
            let requestBody = req.body
            //let user = await userModel.findOne({_id:userId})
           // if(!user){
                //return res.status(400).send({ status: false, msg: "not a valid user id" })
           // }
            // let{firstName, lastName, email, Phone} = requestBody
           
            // if (!validator.isValidEmail(email)) {
            //     return res.status(400).send({ status: false, msg: "plz provide valid email id" })
            // }
            // if (!validator.isValidPhone(Phone)) {
            //     return res.status(400).send({ status: false, msg: "plz provide valid Phone number" })
            // }
            

            let update = await userModel.findOneAndUpdate({_id:userId},requestBody,{new:true})
            res.status(201).send({ status: true, msg: "succesfull" ,data:update })
        }
        catch (err) {
            res.status(500).send({ status: false, msg: err.message })
    
        }
    }

   // Delete api

   const deleted = async function (req,res){
       try {
           let remove = req.params.Id
           //let requestBody = req.body

           const removeData = await userModel.findOneAndDelete({_id:remove})
           res.status(200).send({status:true, msg: "succesfully deleted",removeData})

       }
       catch (err){res.status(500).send({ status: false, msg: err.message })
    

       }

   }


module.exports = {createUser,userDetails,userDetail,login,updateApi,deleted}


