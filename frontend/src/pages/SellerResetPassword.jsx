import React from 'react'
import { Link } from 'react-router-dom'
function SellerResetPassword() {
  return (
    <div>
      <input type='email' placeholder='email'/>
      <input type='password' placeholder='enter old password'/>
      <input type='password' placeholder='new password'/>
      <input type='password' placeholder='Confirm new password'/>
      <p> <Link to='/seller-login'>Login</Link></p>
      
    </div>
  )
}

export default SellerResetPassword
