const cityModel = require("../models/cityModel.js")
const validation = require("../validation/validator")

const createcity = async function (req, res) {
    try {
        let data = req.body

        let { cityName } = data
        if (validation.isValidBody(data)) {
            return res.status(300).send({ status: false, message: "Invalid!! please provide some data" });
        }
        if (!validation.isValid(cityName)) {
            return res.status(300).send({ status: false, message: `cityname is required` });
        }
        if (!validation.isValidName(cityName)) return res.status(300).send({ status: false, message: "City name should allow only Alphabets in upper/ small case." })
        let checkCity = await cityModel.findOne({ cityName: cityName })
        if (checkCity) return res.status(300).send({ status: false, msg: "cityname already exist" })
        data.cityName = cityName.toLowerCase()
        const newCity = await cityModel.create(data);
        res.status(200).send({ status: true, message: "city name inserted", data: newCity });
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const cityList = async function (req, res) {
    try {
        const city = await cityModel.find()
        if (!city) {
            return res.status(404).send({ status: false, message: ` No city found!!` })
        }
        res.status(200).send({ status: true, data: city })
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports = { createcity, cityList }