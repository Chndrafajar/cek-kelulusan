import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export default function AdminRoute() {
  const [oke, setOke] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('/api/admin/admin-auth');
      if (res.data.oke) {
        setOke(true);
      } else {
        setOke(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return oke ? <Outlet /> : <Spinner path="login" />;
}
