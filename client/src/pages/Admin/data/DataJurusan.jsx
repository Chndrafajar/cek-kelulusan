import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Button from '../../../components/Button';

import axios from 'axios';
import { useAuth } from '../../../context/auth';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

export default function DataJurusan() {
  const [jurusan, setJurusan] = useState([]);
  const [auth] = useAuth();

  const getAllDataJurusan = async () => {
    try {
      const { data } = await axios.get('https://cek-kelulusan-api.vercel.app/api/v1/jurusan/get-jurusan');
      if (data?.success) {
        setJurusan(data?.jurusan);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllDataJurusan();
  }, [auth?.token]);

  return (
    <Authenticated>
      <h2>Data Siswa</h2>
      <div className="card" style={{ border: 'none', padding: '20px', overflowY: 'auto' }}>
        <NavLink to="/dashboard/add-jurusan">
          <Button style={{ width: '170px', borderRadius: '5px' }}>Tambah Data Jurusan</Button>
        </NavLink>

        {/* tabel data siswa */}
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {jurusan.map((j, i) => (
              <tr key={j._id}>
                <th scope="row">{i + 1}</th>
                <td>{j.name}</td>
                <td colspan="2">
                  <NavLink to={`/dashboard/edit-jurusan/${j._id}`}>
                    <div className="btn-edit">
                      <FaEdit />
                    </div>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* tabel data siswa */}
      </div>
    </Authenticated>
  );
}
