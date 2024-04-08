import React, { useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const { Option } = Select;

export default function AddJurusan() {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmitSiswa = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/jurusan/create', {
        name,
      });
      if (res && res.data.success) {
        navigate('/dashboard/data-jurusan');
        swal('Good Job!', res.data.message, 'success');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      swal('Miss!', 'Login error', 'error');
    }
  };

  return (
    <Authenticated>
      <div className="card" style={{ border: 'none', padding: '20px' }}>
        <h5>Tambah Data Siswa</h5>

        {/* form add siswa */}
        <form onSubmit={handleSubmitSiswa}>
          <div>
            <Label forInput="name">Name</Label>
            <Input variant="black" type="text" placeholder="Name" value={name} handleChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mt-3">
            <Button type="submit" data-bs-dismiss="modal">
              Save
            </Button>
          </div>
        </form>

        {/* form add siswa */}
      </div>
    </Authenticated>
  );
}
