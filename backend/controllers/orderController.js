
const orderModel= require('../model/orderModel')
const userModel=require('../model/userModel')
const Stripe= require('stripe')

const stripe=new Stripe(process.env.SK_SECRET)
const PlaceOrder = async (req,res)=>{
    const frontend_url="https://fooddelivery-user.onrender.com"
    try{
        const newOrder = await orderModel.create({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        
        })
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map(item=>({
            price_data:{
                currency:'usd',
                product_data:{
                    name:'Delivery Charge'
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'usd',
                product_data:{
                    name:'Delivery Fee'
                },
                unit_amount:2*100,
            },
            quantity:1
        })
            const session= await stripe.checkout.sessions.create({
                line_items,
                mode:'payment',
                success_url:`${frontend_url}/verify?success=true&order_Id=${newOrder._id}`,
                cancel_url:`${frontend_url}/verify?success=false&order_Id=${newOrder._id}`,
            })
            res.status(200).json({success:true,session_url:session.url})

    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}
const verifyOrder=async(req,res)=>{
    const {orderId,success} = req.body
    try{
        if(success=="true"){
            console.log(req.body)
            const order=await orderModel.findById(orderId)
            order.payment="true"
            await order.save()
            console.log(order)
            res.json({success:true,message:"Paid successfully"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
const userOrders = async(req,res) => {
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"err"})
    }
}
const listOrders=async(req,res)=>{
    try{
    const orders=await orderModel.find()
    res.json({success:true,data:orders})
    } catch(error){
        console.log(error)
        res.json({success:false,message:"cannot fetch orders"})
    }
}

const updateState = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{state:req.body.state})
        res.json({success:true,message:"state updated"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}


module.exports= {PlaceOrder,verifyOrder,userOrders,listOrders,updateState}