import { createContext,useState,useEffect } from "react";
import axios from "axios";
export const StoreContext = createContext();


const StoreContextProvider =(props) =>{
    const [token,setToken]=useState("");
   

    const url= "https://fooddelivery-vr8a.onrender.com"
    const [cartItems,setCartItems] = useState({});
    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems({...cartItems,[itemId]:1})
        }
        else{
                setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }
    }

    const removeFromCart =async(itemId)=>{
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1})
        if(token)
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
     }

     const getTotalCartAmount=()=>{
        let total = 0;
        for(let item in cartItems)
            {
                if(cartItems[item]>0){
            let itemInfo = food_list.find((food)=>food._id===item)
            total += itemInfo.price * cartItems[item];
            }}
            return total;
        }

        const [food_list,setFood_list]=useState([]);

        const fetchFoodList = async () => {
            const response = await axios.get(url+'/api/food/foodlist');
            setFood_list(response.data.data);
        }

        const loadCartData=async(token)=>{
            const response=await axios.post(url+'/api/cart/get',{},{headers:{token}})
            setCartItems(response.data.data)
        }
        useEffect(()=>{
            async function loadData()
            {
                await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
               
            }
        }
        loadData()
    },[])
    const ContextValue={
                 token,       
                 url,
                food_list,
                cartItems,
                setToken,
                setCartItems,
                addToCart,
                removeFromCart,
                getTotalCartAmount
    }
    
    return(
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export {StoreContextProvider}