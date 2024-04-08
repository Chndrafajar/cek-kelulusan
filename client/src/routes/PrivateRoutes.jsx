import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Outlet } from 'react-router-dom';

import { useAuth } from '../context/auth';
import { Spinner } from '../components/Spinner';

export default function PrivateRoutes() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const siswaCheck = async () => {
      const res = await axios.get('https://cek-kelulusan-api.vercel.app/api/v1/siswa/siswa-auth');
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) siswaCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
