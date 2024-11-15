import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_BASE_URL = 'https://supabase-node-crud-sample.vercel.app/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async (user) => {
    try {
      await axios.post(`${API_BASE_URL}`, user);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (user) => {
    try {
      await axios.put(`${API_BASE_URL}/${user.id}`, user);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div class="container">
      <br />
            
      <h2>User Management</h2>
      <UserForm
        onSubmit={selectedUser ? handleUpdate : handleCreate}
        user={selectedUser}
        onClear={() => setSelectedUser(null)}
      />
      <br />
            
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} &nbsp;&nbsp;&nbsp;
            <button onClick={() => handleSelectUser(user)} className='btn btn-primary btn-sm'>Edit</button> &nbsp;&nbsp;
            <button onClick={() => handleDelete(user.id)} className='btn btn-primary btn-sm'>Delete</button>
            <br />
            <br />
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
