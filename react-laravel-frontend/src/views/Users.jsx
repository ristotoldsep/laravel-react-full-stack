import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from "react-icons/ri";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
    .then(({data}) => {
      setLoading(false);
      console.log(data);
      setUsers(data.data);
      console.log(users);
    })
    .catch(() => {
      setLoading(false);
    })
  }

  const onDelete = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        // Show notification

        // Fetch users again and update user table
        getUsers(); 
      });
  }

  return (
      <div>
          <div
              style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
              }}
          >
              <h1>Users</h1>
              <Link to="/users/new" className="btn-add">
                  Add new
              </Link>
          </div>
          <div className="card animated fadeInDown">
              <table>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Create Date</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  {loading && (
                      <tbody>
                          <tr>
                              <td colSpan="5" className="text-center">
                                  Loading...
                              </td>
                          </tr>
                      </tbody>
                  )}
                  {!loading && (
                      <tbody>
                          {users.map((user, index) => (
                              <tr key={user.id}>
                                  <td>{user.id}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.created_at}</td>
                                  <td>
                                      <Link
                                          to={"/users/" + user.id}
                                          className="btn-edit"
                                      >
                                          <FaRegEdit />
                                      </Link>
                                      &nbsp;
                                      <button
                                          onClick={(event) => {
                                              onDelete(user);
                                          }}
                                          className="btn-delete"
                                      >
                                          <RiDeleteBinLine />
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  )}
              </table>
          </div>
      </div>
  );
}

export default Users