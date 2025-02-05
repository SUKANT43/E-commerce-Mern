import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import add_product_icon from '../Assets/shopping-cart.png';
import list_product_icon from '../Assets/shopping-list.png';
import logo from '../Assets/click.png';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-left'>
        <img src={logo} alt='Logo' className='logo' style={{ height: '70px' }} />
      </div>
      <div className='sidebar-right'>
        <Link to='/addproduct' className='sidebar-link'>
          <div className='sidebar-item'>
            <img src={add_product_icon} alt='Add Product' className='add'/>
            <p>Add Product</p>
          </div>
        </Link>
        <Link to='/listproduct' className='sidebar-link'>
          <div className='sidebar-item'>
            <img src={list_product_icon} alt='Product List' className='list'/>
            <p>Product List</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;