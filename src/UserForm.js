import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserForm({ onSubmit, user, onClear }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: user ? user.id : null, name, email });
    setName('');
    setEmail('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className='container'>
      <div class="input-group mb-3">
      <input
        type="text"
        placeholder="Name"
        class="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      </div>
      
      <input
        type="email"
        placeholder="Email"
        class="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <button type="submit" class="btn btn-success">{user ? 'Update' : 'Create'} User</button> &nbsp;
      {user && <button onClick={onClear} class="btn btn-danger">Cancel</button>}
    </form>
  );
}

export default UserForm;
