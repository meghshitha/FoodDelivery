import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
const Navbar = ({setShowLogin}) =>
{  
     const {token,setToken,getTotalCartAmount}=useContext(StoreContext)
    const [menu,setMenu] =useState('home')
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        setToken("")
        navigate("/")
    }

    return (
        <div className='navbar'>
           <Link to='/'  onClick={()=>setMenu('home')}><img className="logo" src={assets.logo} alt=""/></Link> 
            <ul className="navbar-menu">
                <Link to='/' className={menu==='home'?'active':''} onClick={()=>setMenu('home')}>Home</Link>
                <a href='#explore-menu' className={menu==='menu'?'active':''} onClick={()=>setMenu('menu')}>Menu</a>
                <a href='#app-download' className={menu==='mobile-app'?'active':''} onClick={()=>setMenu('mobile-app')}>Mobile-app</a>
                <a href='#footer'className={menu==='contact-us'?'active':''} onClick={()=>setMenu('contact-us')}>Contact-us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt=""></img>
                <div className='navbar-cart-icon'>
                <Link to='/cart'>    <img src={assets.basket_icon} alt=""/></Link>
                    <div className='dot'></div>
                </div>
               {
                !token
                    ?<button onClick={()=>setShowLogin(true)}>Sign Up</button>
                 :<div className='navbar-profile'>
                        <img src={assets.profile_icon} alt=""/>
                        <ul className='navbar-profile-dropdown'>
                        <li onClick={()=>navigate('/myorder')}><img src={assets.bag_icon} alt=""/>Orders</li>
                        <hr/>
                        <li onClick={logout}><img src={assets.logout_icon} alt=''/>LogOut</li>
                        </ul>
                    </div>
               }

            </div>
        </div>
    )
}

export default Navbar;