const express = require("express")
const router = express.Router()

const {createCustomer}  = require("../controllers/customerController")
const {createOrder} = require("../controllers/orderController")

router.post("/customer",createCustomer )
router.post("/order", createOrder)

module.exports= router