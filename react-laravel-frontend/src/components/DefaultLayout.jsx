// import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Logo from '../assets/logo.png'


const DefaultLayout = () => {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    event.preventDefault();
  }

  return (
    <div id="defaultLayout">
      <aside>
        <img className="logo" src={Logo} alt="logo" />
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
          Hello, {user.name}
            <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout;