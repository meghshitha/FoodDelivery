/*import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'


const PlaceOrder = () => {
  const { cartItems, food_list}=useContext(StoreContext);
  const[data,setData]=useState
  ({
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    zip_code: '',
    city: '',
    state: '',
    country:'',
    phone: ''
  })
  /*useEffect(()=>{
    console.log(data)
},[data])
  const onChangeHandler=(e)=>{
    const { name, value } = e.target
    setData({...data, [name]: value})
  }
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    let orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo.quantity=cartItems[item._id]
        orderItems.push(itemInfo)
      }
      })
      console.log(orderItems)
    }

  

    const {getTotalCartAmount}=useContext(StoreContext);
    return (
        <div className="checkout-container">
        {/* Delivery Information }
        <div className="delivery-info">
          <h2 className='title'>Delivery Information</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="form-row">
              <input type="text" placeholder="First Name"  name="first_name" value={data.first_name} 
              onChange={(e)=>onChangeHandler(e)} className="form-input" required/>
              <input type="text" placeholder="Last Name" name="last_name" value={data.last_name} 
              onChange={(e)=>onChangeHandler(e)} className="form-input" required />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email address" name="email" value={data.email} 
              onChange={(e)=>onChangeHandler(e)} className="form-input-full" required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Street" name="street" value={data.street} 
              onChange={(e)=>onChangeHandler(e)} className="form-input-full" required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="City"  name="city" value={data.city} 
              onChange={(e)=>onChangeHandler(e)} className="form-input" required/>
              <input type="text" placeholder="State" name="state" value={data.state} 
              onChange={(e)=>onChangeHandler(e)} className="form-input" required/>
            </div>
            <div className="form-row">
              <input type="text" placeholder="Zip Code"  name="zip_code" value={data.zip_code} 
              onChange={(e)=>onChangeHandler(e)}className="form-input" required/>
              <input type="text" placeholder="Country"  name="country" value={data.country} 
              onChange={(e)=>onChangeHandler(e)} className="form-input" required/>
            </div>
            <div className="form-row">
              <input type="tel" placeholder="Phone" name="phone" value={data.phone} 
              onChange={(e)=>onChangeHandler(e)} className="form-input-full" required/>
            </div>
          </form>
        </div>
      
        {/* Cart Totals }
        <div className='cart-right'>
                  <div className='cart-total'>
                      <h2>Cart Total</h2>
                      <div className='cart-total-details'>
                          <p>Subtotal</p>
                          <p>${getTotalCartAmount()}</p>
                      </div>
                       <hr/>
                      <div className='cart-total-details'>
                          <p>Delivary Fee</p>
                          <p>${getTotalCartAmount()==0?0:2}</p>
                      </div>
                      <hr/>
                      <div className='cart-total-details'>
                          <p>Total</p>
                          <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
                      </div>
                  <button onclick={onSubmitHandler}>Proceed to Payment</button>
                  </div>
              </div>
      </div>

    )
  }

export default PlaceOrder;*/

import React, { useState, useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {
  const navigate = useNavigate()
  const { getTotalCartAmount,food_list,cartItems,url ,token} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipCode: "",
    country: "",
    city:"",
    state:"",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleProceedToPayment = async(e) => {
    e.preventDefault(); // Prevent form submission
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
   let orderData = {
      address: data,
      items: orderItems,
      amount:getTotalCartAmount()+2
   }
 
  try{
      let response = await axios.post(url+'/api/order/place', orderData, {headers:{token}});
      console.log(response.data)
      const {session_url}=response.data
      window.location.replace(session_url)
  }
  catch(err)
  {
        console.log(err)
  }
}

useEffect(() => {
  if(!token){
    navigate('/cart')

  }
  else if(getTotalCartAmount()===0)
    navigate('/cart') 
},[token])
 /* const deliveryFee = getTotalCartAmount() === 0 ? 0 : 29;
  const total = getTotalCartAmount() + deliveryFee;*/

  return (
    <div className="place-order">
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <form onSubmit={handleProceedToPayment}>
          <div className="row">
            <input type="text" name="firstName" placeholder="First Name" value={data.firstName} 
            onChange={(e)=>onChangeHandler(e)} required />
            <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} 
            onChange={(e)=>onChangeHandler(e)} required/>
          </div>
          <input type="email" name="email" placeholder="Email address" value={data.email} 
          onChange={(e)=>onChangeHandler(e)} required/>
          <input type="text" name="street" placeholder="Street" value={data.street} 
          onChange={(e)=>onChangeHandler(e)} required/>
          <div className="row">
            <input type="text" name="zipCode" placeholder="Zip Code" value={data.zipCode} 
            onChange={(e)=>onChangeHandler(e)} required/>
            <input type="text" name="country" placeholder="Country" value={data.country} onChange={(e)=>onChangeHandler(e)} required />
          </div>
          <div className="row">
            <input type="text" name="city" placeholder="City" value={data.city} 
            onChange={(e)=>onChangeHandler(e)} required/>
            <input type="text" name="state" placeholder="State" value={data.state} 
            onChange={(e)=>onChangeHandler(e)} required />
          </div>
          <input type="text" name="phone" placeholder="Phone" value={data.phone} 
          onChange={(e)=>onChangeHandler(e)} required />
        </form>
      </div>
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount()==0?0:2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
        </div>
        <hr />
        <br />
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default PlaceOrder