const customerModel = require("../models/customerModel")
const orderModel = require("../models/orderModel")


const createOrder = async (req, res) => {
    try {
        let data = req.body
     
        let {customerId}=data
        let existCustomer = await customerModel.findById( { _id:customerId} )
        if (!existCustomer) {
            return res.status(400).send({ status: false, msg: "Customer not exist" })
        }

        let oldOrders = await orderModel.find({ customerId: customerId })
        let totalOrder = oldOrders.length+1
       

        data.orderNumber = totalOrder

        let order = await orderModel.create(data)

        if (order.orderNumber == 9) {
             return res.status(201).send({ status: true,message:"Get 10 percent discount by adding 1 more order and become gold member", data: data })
        }

        if (order.orderNumber == 10) {
            let discount= (order.price/100)*10
            order._doc.discount=discount;
            const updated =await customerModel.findOneAndUpdate({ _id: customerId }, {category: "Gold", totalDiscount:discount}, { new: true })
            return res.status(201).send({ status: true, data: updated, order:order })
        }

        if (order.orderNumber == 19) {
            let discount= (order.price/100)*10
            order._doc.discount=discount;
            return res.status(201).send({ status: true,message:"Get 20 percent discount by adding 1 more order and become Platinum member", data: order })
           
        }

        if (order.orderNumber == 20) {
            const update= await customerModel.findOneAndUpdate({ _id: customerId }, { category: "platinum" }, { new: true })
            let discount= (order.price/100)*20
            order._doc.discount=discount;
             return res.status(201).send({ status: true, data:update, order:order})
         }

        if(order.orderNumber>10 && order.orderNumber<20){
           let discount= (order.price/100)*10
            order._doc.discount=discount;
            existCustomer = await customerModel.findById( { _id:customerId} ) 
            let totaldiscount=existCustomer.totalDiscount;
                totaldiscount+=discount;
            const updatedata =await customerModel.findOneAndUpdate({ _id: customerId }, {totalDiscount:totaldiscount}, { new: true })
               return res.status(201).send({ status: true, data: updatedata,order })
         
         }

        if( order.orderNumber>20){
            let discount= (order.price/100)*20
             order._doc.discount=discount;
             existCustomer = await customerModel.findById( { _id:customerId} ) 
             let totaldiscount=existCustomer.totalDiscount;
                 totaldiscount+=discount;
             const updatedata =await customerModel.findOneAndUpdate({ _id: customerId }, {totalDiscount:totaldiscount}, { new: true })
                return res.status(201).send({ status: true, data: updatedata,order })
          }
       

        return res.status(201).send({ status: true, data: order })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports = { createOrder }