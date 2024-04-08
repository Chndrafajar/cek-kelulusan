import React, { useState } from 'react';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { useAuth } from '../../context/auth';

export default function LoginAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', {
        username,
        password,
      });
      if (res && res.data.success) {
        swal('Good Job!', res.data.message, 'success');
        setAuth({
          ...auth,
          admin: res.data.admin,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/dashboard/index');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      swal('Miss!', 'Login error', 'error');
    }
  };

  return (
    <>
      <section className="auth">
        <div className="auth-items">
          <div className="card">
            <h4 className="text-center">Login</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Label forInput="username">Username</Label>
                <Input type="text" placeholder="Username" value={username} handleChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-4">
                <Label forInput="password">Password</Label>
                <Input type="password" placeholder="Password" value={password} handleChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
