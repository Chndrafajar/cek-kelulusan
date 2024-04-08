import React, { useEffect, useState } from 'react';
import Authenticated from '../../layouts/Authenticated';
import { FaAddressBook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';

export default function Dashboard() {
  const [siswa, setSiswa] = useState([]);
  const [auth] = useAuth();

  const getAllDataSiswa = async () => {
    try {
      const { data } = await axios.get('/api/v1/siswa/get-data');
      setSiswa(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllDataSiswa();
  }, [auth?.token]);

  return (
    <>
      <Authenticated>
        <h2>Data Siswa</h2>
        <div className="col-12 col-md-4 col-lg-4">
          <div class="card card-dash mb-4">
            <div class="item-card">
              <div class="itemCard">
                <h2>{siswa?.length}</h2>
                <p>Data Pesanan</p>
              </div>
              <div class="icons">
                <FaAddressBook />
              </div>
            </div>
            <div class="bgdetail">
              <NavLink to="/dashboard/data-siswa">Detail</NavLink>
            </div>
          </div>
        </div>
      </Authenticated>
    </>
  );
}
