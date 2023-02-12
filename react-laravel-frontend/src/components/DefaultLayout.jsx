// import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Logo from '../assets/logo.png'
import { useEffect } from 'react';
import axiosClient from '../axios-client';
import { RxDashboard } from 'react-icons/rx';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineWavingHand, MdLogout } from "react-icons/md";



const DefaultLayout = () => {
  const {user, token, setUser, setToken, notification} = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    event.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  return (
      <div id="defaultLayout">
          <aside>
              <img className="logo" src={Logo} alt="logo" />
              <Link
                  to="/dashboard"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                  <RxDashboard />
                  Dashboard
              </Link>
              <Link
                  to="/users"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                  <FiUsers />
                  Users
              </Link>
          </aside>
          <div className="content">
              <header>
                  <div>Header</div>
                  <div>
                      <span>
                          Hello, {user.name} <MdOutlineWavingHand />
                      </span>
                      <a href="#" className="btn-logout" onClick={onLogout}>
                          Logout <MdLogout />
                      </a>
                  </div>
              </header>
              <main>
                  <Outlet />
              </main>
          </div>
          
          {notification && 
            <div className="notification">
            {notification}
          </div>
          }
          
      </div>
  );
}

export default DefaultLayout;