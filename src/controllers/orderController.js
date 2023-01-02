const customerModel = require("../models/customerModel")
const orderModel = require("../models/orderModel")


const createOrder = async (req, res) => {
    try {
        let data = req.body
        let {customerId,orderNumber}=data
        let existCustomer = await customerModel.findById( { _id:customerId} )
        if (!existCustomer) {
            return res.status(400).send({ status: false, msg: "Customer not exist" })
        }

        let numberOfOrders = await orderModel.find({ customerId: customerId })
        let totalOrder = numberOfOrders.length+1
       
       

        data.orderNumber = totalOrder

      
        let order = await orderModel.create(data)

        if(order.orderNumber>10){
            let discount= (order.price /100)*10
            order.discount=+discount;
         }

        if (order.orderNumber == 9) {
             return res.status(201).send({ status: true,message:"Get 10 percent discount by adding 1 more order and become gold member", data: data })
        }

        if (order.orderNumber == 10) {
            const updated =await customerModel.findOneAndUpdate({ _id: customerId }, { category: "Gold" }, { new: true })
            return res.status(201).send({ status: true, data: updated, order:order })
        }
       
        
        
        if (order.orderNumber == 19) {
            return res.status(201).send({ status: true,message:"Get 20 percent discount by adding 1 more order and become Platinum member", data: data })
           
        }

        if (order.orderNumber == 20) {
           const update= await customerModel.findOneAndUpdate({ _id: customerId }, { category: "platinum" }, { new: true })
            return res.status(201).send({ status: true, data:update, order:order})
        }
       
        return res.status(201).send({ status: true, data: order })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports = { createOrder }