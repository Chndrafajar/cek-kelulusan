import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Button from '../../../components/Button';
import axios from 'axios';
import { useAuth } from '../../../context/auth';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

export default function DataKelas() {
  const [kelas, setKelas] = useState([]);
  const [auth] = useAuth();

  const getAllDataKelas = async () => {
    try {
      const { data } = await axios.get('/api/v1/kelas/get-kelas');
      if (data?.success) {
        setKelas(data?.kelas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllDataKelas();
  }, [auth?.token]);

  return (
    <Authenticated>
      <h2>Data Siswa</h2>
      <div className="card" style={{ border: 'none', padding: '20px', overflowY: 'auto' }}>
        <NavLink to="/dashboard/add-kelas">
          <Button style={{ width: '170px', borderRadius: '5px' }}>Tambah Data Kelas</Button>
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
            {kelas.map((k, i) => (
              <tr key={k._id}>
                <th scope="row">{i + 1}</th>
                <td>{k.name}</td>
                <td colspan="2">
                  <NavLink to={`/dashboard/edit-kelas/${k._id}`}>
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
