const axios = require('axios')

const url = async (req, res) => {
    try {

        let result

        await axios.get('https://api.binance.com/api/v1/time')
            .then((res) => result = res)
            .catch((error) => console.log(error))

        console.log(result);
        return res.status(200).send({ status: true, data: result.data })

    } catch (error) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports = url 
