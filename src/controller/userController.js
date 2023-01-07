const axios = require("axios")
const userModel = require('../models/userModel')
const cityModel = require("../models/cityModel.js")
const validation = require("../validation/validator")

const createUser = async (req, res) => {
    try {
        let data = req.body
        let { name, city, mobile, mediaurl } = data
        if (validation.isValidBody(data)) return res.status(300).send({ status: false, msg: "please provide  details" })
        if (!validation.isValid(name)) return res.status(300).send({ status: false, message: "name is required" })
        if (!validation.isValidName(name)) return res.status(400).send({ status: false, message: "Name parameter should allow only Alphabets in upper/ small case." })
        if (!validation.isValid(city)) return res.status(300).send({ status: false, message: "city is required" })
        let checkName = await userModel.findOne({ name: name })
        if (checkName) return res.status(409).send({ status: false, msg: "name already exist" })
        if (!validation.isValidMobile(mobile)) return res.status(400).send({ status: false, message: "Mobile parameter should allow only numeric characters." })
        let checkMobile = await userModel.findOne({ mobile: mobile })
        if (checkMobile) return res.status(409).send({ status: false, msg: "mobile already exist" })
        // if (!validation.validUrl(mediaurl)) return res.status(400).send({ status: false, message: "mediaUrl is not valid" })
        let findCity = await cityModel.findOne({ cityName: city })
        if (!findCity) return res.status(300).send({ status: false, message: `This City name : ${city} is not applicable!` })
        await axios.get('https://api.binance.com/api/v1/time')
            .then((res) => req.body.ID = res.data.serverTime)
            .catch((error) => console.log(error))

        let createData = await userModel.create(data)
        return res.status(200).send({ status: true, data: createData })
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

const userList = async function (req, res) {
    try {
        const user = await userModel.find()
        if (!user) {
            return res.status(404).send({ status: false, message: ` No user found!!` })
        }
        res.status(200).send({ status: true, data: user })
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const updateuser=async function(req,res){
    try {
        let data = req.body
        let ID = req.params.ID
        let { name, city, mobile, mediaurl } = data 
        if (validation.isValidBody(data)) return res.status(300).send({ status: false, msg: "please provide  details" })
        let updatedata = await userModel.findOneAndUpdate({ID:ID},{ name:name,cityName: city, mobile: mobile, mediaurl: mediaurl},{new:true})
        return res.status(200).send({ status: true, message: "userData Updated Sucessfully!", data: updatedata })
        
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })  
    }
}

module.exports = { createUser, userList,updateuser }