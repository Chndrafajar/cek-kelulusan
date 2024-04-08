import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditKelas() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  const getSingleDataKelas = async () => {
    try {
      const { data } = await axios.get(`/api/v1/kelas/get/${params.kid}`);
      setId(data.kelas._id);
      setName(data.kelas.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleDataKelas();
    //eslint- disable - next - line
  }, []);

  //update
  const handleUpdateKelas = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/kelas/update/${id}`, {
        name,
      });
      if (res && res.data.success) {
        navigate('/dashboard/data-kelas');
        swal('Good Job!', res.data.message, 'success');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteKelas = async (e) => {
    try {
      const res = await axios.delete(`/api/kelas/delete/${id}`);
      if (res && res.data.success) {
        navigate('/dashboard/data-kelas');
        swal('Good Job!', res.data.message, 'success');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Authenticated>
      <div className="card" style={{ border: 'none', padding: '20px' }}>
        <h5>Edit Data Jurusan</h5>

        {/* form edit jurusan */}
        <div>
          <Label forInput="name">Name</Label>
          <Input variant="black" type="text" placeholder="Name" value={name} handleChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mt-3" style={{ display: 'flex', gap: '20px' }}>
          <Button type="submit" style={{ borderRadius: '5px' }} handleClick={handleUpdateKelas}>
            Update
          </Button>
          <Button variant="danger" type="submit" style={{ borderRadius: '5px' }} handleClick={handleDeleteKelas}>
            Delete
          </Button>
        </div>

        {/* form add siswa */}
      </div>
    </Authenticated>
  );
}
