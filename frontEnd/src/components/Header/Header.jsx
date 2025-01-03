import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favorite food here.</h2>
                <p>Choose from diverse menu featuring a delictable array of dishes crafted with the finest ingrideints and culinary expertise.
                    Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
              <button>View Menu</button>
            </div>
        </div>

    )
}

export default Header;