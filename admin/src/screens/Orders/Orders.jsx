import {React,useEffect,useState} from 'react'
import './Orders.css'
import axios from "axios"
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets'

const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async()=>{
    const response = await axios.get("http://localhost:4000/api/order/list")
    if(response.data.success){
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else{
      toast.error("error")
    }
  }

  const statusHandler = async(e,orderId)=>{
    const response = await axios.post(url+"/api/order/status",
      {orderId,
      status:e.target.value})
    if(response.data.success)
    {
      await fetchAllOrders()
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length-1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p className='order-item-name'>{order.firstName+" "+order.lastName}</p>
              <div className='order-item-address'>
                <p>{order.street+", "}</p>
                <p>{order.city+", "+order.state+", "+order.country+", "+order.zipCode}</p>
              </div>
              <p className='order-item-phone'>{order.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default Orders