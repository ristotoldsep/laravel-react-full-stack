import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);

  const {setUser, setToken} = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    // console.log(payload)
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          // console.log(response.data.errors);

          setErrors(response.data.errors);
          // console.log(errors);
        }
      })
  } 

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Create an account</h1>
        {errors && 
          <div className="alert">
            {Object.keys(errors).map((key, i) => (
              <p key={i}>{errors[key][0]}</p>
            ))}
          </div>}
        <form onSubmit={onSubmit}>
           <input ref={nameRef} type="text" placeholder='Full Name' />
           <input ref={emailRef} type="email" placeholder='Email' />
           <input ref={passwordRef} type="password" placeholder='Password' />
           <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
           <button className="btn btn-block">Signup</button>
           <p className="message">
            Already Registered? <Link to="/login">Login</Link>
           </p>
        </form>
      </div>
    </div>
  )
}

export default Signup