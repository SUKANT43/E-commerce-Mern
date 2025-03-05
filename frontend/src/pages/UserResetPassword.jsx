import React from 'react'
import Link from 'react-router-dom'
function UserResetPassword() {
  return (
    <div>
      <input type='email' placeholder='email'/>
      <input type='password' placeholder='enter old password'/>
      <input type='password' placeholder='new password'/>
      <input type='password' placeholder='Confirm new password'/>
      <p>Login <Link to='/user-login'>Login</Link></p>
    </div>
  )
}

export default UserResetPassword
