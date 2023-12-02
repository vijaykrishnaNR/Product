import React, { useEffect, useState } from 'react';
import iphone from "./iphone.jpg";
import ipad from "./ipad.jpg";
import laptop from "./laptop.jpg";
import './Product.css';

const Products = () => {
  const productList = [
    { name: "iphone", price: 249, img: iphone, description: "worthy smartphone" },
    { name: "ipad", price: 99, img: laptop, description: "student ipad" },
    { name: "laptop", price: 125, img: ipad, description: "gamming laptop" }
  ];

  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  useEffect(() => { 
    setTotalPrice(getPrice());
  }, [cartList]);
  function getPrice() {
    return cartList.reduce((total, item) => total + item.price, 0);
  }
  function addItem(index) {
    const selectedProduct = productList[index];
    setCartList((prevCartList) => [...prevCartList, selectedProduct]);
  }
  function deleteItem(index) {
    const updatedCartList = cartList.filter((item, i) => i !== index);
    setCartList(updatedCartList);
  }
  const handlePlaceOrder = () => {
    const confirmation = window.confirm(`Your total products price is $${totalPrice}. Are you sure you want to place the order?`);
    if (confirmation) {
      alert("Order Submitted");
      setCartList([]);
    }
  };
  const toggleCartVisibility = () => {
    setShowCart(!showCart);
  };
  return (
    <div className='container'>
      <h1 className='heading'>Products</h1>
      <ol className='product-list'>
        {productList.map((item, index) => (
          <li key={index} className='product-item'>

            <div>
              <p>{item.name} &nbsp; ${item.price}</p>
              <p>{item.description}</p>
              <img src={item.img} alt={item.name} className='product-image' />
            </div>
            <button onClick={() => addItem(index)} className='add-to-cart'>Add To Cart</button>
          </li>
        ))}
      </ol>
      <div className='cart-section' style={{ display: showCart ? 'block' : 'none' }}>
        <h2 className='heading'>Shopping Cart</h2>
        <ul className='cart-list'>
          {cartList.map((cartItem, index) => (
            <li key={index} className='cart-item'>
              <div>
                <p>{cartItem.name} &nbsp; ${cartItem.price}&nbsp;{cartItem.description}</p>
                <img src={cartItem.img} alt={cartItem.name} className='cart-image' />
              </div>
              <button onClick={() => deleteItem(index)} className='remove-button'>Remove</button>
            </li>
          ))}
        </ul>
        <p className='total-price'>Total Price: ${totalPrice}</p>
        <button onClick={handlePlaceOrder} id='order'>Place Order</button>
      </div>
      <button onClick={toggleCartVisibility} className='view-cart-button'>
        {showCart ? 'Hide Cart' : 'View Cart'} {cartList.length}
      </button>
    </div>
  );
};
export default Products;