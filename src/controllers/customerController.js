const customerModel = require("../models/customerModel")

const { isValidBody, isValidstring, isValidEmail, isValidphone, isValidPassword } = require("../validations/validation.js")

const createCustomer = async (req, res) => {
    try {
        let data = req.body
        if (!isValidBody(data)) {
            return res.status(400).send({ status: false, mag: " Enter data in body" })
        }

        let { name, email, mobile, age, password, gender, category } = data
        if (!name) {
            return res.status(400).send({ status: false, mag: " name is required" })
        }

        if (!isValidstring(name)) {
            return res.status(400).send({ status: false, mag: " name should be in onlyalphabate" })
        }

        if (!email) {
            return res.status(400).send({ status: false, mag: " email is required" })
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, mag: " invalid Email" })
        }

        let uniqueEmail = await customerModel.findOne({ email: email })
        if (uniqueEmail) {
            return res.status(400).send({ status: false, mag: " this email already exist" })
        }

        if (!mobile) {
            return res.status(400).send({ status: false, mag: " phone is required" })
        }

        if (!isValidphone(mobile)) {
            return res.status(400).send({ status: false, mag: " invalid phone" })
        }

        if (!gender) {
            return res.status(400).send({ status: false, mag: " age is required" })
        }


        let arr = ["Male", "Female"]
        if (!arr.includes(gender)) {
            return res.status(400).send({ status: false, mag: " gender should be enum  Male or Female" })
        }
        if (category) {
            let array = ["Regular", "Gold", "Platinum"]
            if (!array.includes(category)) {
                return res.status(400).send({ status: false, mag: ` category should be enum  ["Regular", "Gold", "Platinum"] only` })
            }
        }
        if (!age) {
            return res.status(400).send({ status: false, mag: " age is required" })
        }
        if (!password) {
            return res.status(400).send({ status: false, mag: " password is required" })
        }

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: " password contain atleast one spacial character, Number, Alphabet, length should be 8 to 15 " })
        }

        let savedData = await customerModel.create(data)
        return res.status(201).send({ status: true, data: savedData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }


}

module.exports = { createCustomer }