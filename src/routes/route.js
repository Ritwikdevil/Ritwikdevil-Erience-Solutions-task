const express = require("express")
const router = express.Router();
const cityController = require("../controller/cityController.js")
const  url  = require('../controller/axios')
const {createUser,userList,updateuser} = require('../controller/userController')

router.post("/insertCity", cityController.createcity)
router.get("/getCities",cityController.cityList)
router.get("/axios", url)
router.post("/createUser", createUser)
router.get("/getUser",userList)
router.patch("/updateuser/:ID",updateuser)




module.exports = router;
