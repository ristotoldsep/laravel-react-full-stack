import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const onSubmit = (event) => {
    event.preventDefault()
  } 

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
           <input type="email" placeholder='Email' />
           <input type="password" placeholder='Password' />
           <button className="btn btn-block">Login</button>
           <p className="message">
            Not Registered? <Link to="/signup">Create an account</Link>
           </p>
        </form>
      </div>
    </div>
  )
}

export default Login