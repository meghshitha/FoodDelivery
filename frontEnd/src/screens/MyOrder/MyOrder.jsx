/* import React,{useState,useContext, useEffect} from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {
  
  const [data,setData] = useState([])
  const {url,token} = useContext(StoreContext)

  const fetchOrders = async () => {
    console.log(url+'api/order/userorders')
    const response = await axios.post(url+'/api/order/userorders',{},{headers:{token}})
    setData(response.data.data)
    console.log(response.data.data)
  }
  useEffect(()=>{
    if(token)
      fetchOrders()
  },[])
  return (
    
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {
          data.map((order,index)=>{
            return(
              <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {
                      order.items.map((item,index)=>{
                        if(index===order.items.length-1)
                          return item.name+'x'+item.quantity
                        else
                        return item.name+'x'+item.quantity+', '
                      })
                    }
                  </p>
                  <p>${order.amount}</p>
                  <p>Items{order.items.length}</p>
                  <p><span>&#x25cf;</span><b>{order.status}</b></p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders */


import React,{useState,useContext, useEffect} from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrder = () => {
    const [data,setData] = useState([])
    const {url,token} = useContext(StoreContext)
    const fetchOrders = async () => {
        console.log("data"+data)
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
    }
    useEffect(() => {   
        if(token){
            fetchOrders()
        }
    },[])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{
                                order.items.map((item,index)=>{
                                    if(index===order.items.length-1)
                                        return item.name+" x "+item.quantity
                                    else
                                        return item.name+" x "+item.quantity+" , "
                                })
                            }</p>
                            <p>${order.amount}</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrder