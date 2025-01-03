import React, { useContext, useEffect } from 'react'
import './LogInPopUp.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from'react-toastify'

const LogInPopUp = ({setShowLogin}) => {
    const {url,setToken} =useContext(StoreContext)
   const [curState,setState] = useState('signup')
   const [data,setData]=useState(
    {
        name:"",
        email:"",
        password:"",
    }
   )
   const onChangeHandler =(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value});
   }/*
   useEffect(()=>{
    console.log(data)
},[data])*/
   const onLogin = async(e)=>{
    e.preventDefault();
    let newUrl = url;
    if(curState==='signup'){
        newUrl+='/api/user/register'
    }
    else{
        newUrl+='/api/user/login'
    }
    try{
        const response = await axios.post(newUrl,data)
       
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
            setShowLogin(false);
        }
        catch(error){
            toast.error(error.response.data.message) 
        }
        
    }
   
    return (
        <div className='login-popup'>
           <form onSubmit={onLogin} action='' className='login-popup-container'>
              <div className="login-popup-title">
                <h2>{curState}</h2>
                <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt=""/>
              </div>
              <div className="login-popup-inputs">
                {curState!=="login" ? <input name="name" onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />:<></>}
               <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="E-mail" required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
              </div>
              <button type='submit' className='btn'>{curState ==='signup'? 'Create Account' : 'Log In'}</button>
              <div className="login-popup-condition">
                <input type="checkbox"/>
                <p>By continuing, I agree to the terms and conditions</p>
              </div>
    
            {
                curState === 'signup'
            ?<p>Already have an account?<span onClick={()=>setState('login')}><b>Log In</b> </span></p>
            :<p>Do not have an account?<span onClick={()=>setState('signup')}> <b>Create Account.</b></span></p>
            
            
        }
        </form>
        </div>
    )
}

export default LogInPopUp;