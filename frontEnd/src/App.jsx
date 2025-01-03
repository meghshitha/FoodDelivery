import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './screens/Home/Home';
import Cart from './screens/Cart/Cart';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LogInPopUp from './components/LogInPopUp/LogInPopUp';
import { useState } from 'react';
import Verify from './screens/Verify/verify';
import MyOrder from './screens/MyOrder/MyOrder';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return(
    <>
      {
      showLogin ? <LogInPopUp setShowLogin={setShowLogin}/>:<></>
      }
    
    <div className='app'> 
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/Cart' element={<Cart/>}></Route>
        <Route path='/order' element={<PlaceOrder/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/myorder' element={<MyOrder/>}></Route>
    </Routes>
    </div>
    <Footer/>
    </>
  )
  
}

export default App;
