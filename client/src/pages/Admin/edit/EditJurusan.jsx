import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditJurusan() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  const getSingleDataJurusan = async () => {
    try {
      const { data } = await axios.get(`/api/jurusan/get/${params.jid}`);
      setId(data.jurusan._id);
      setName(data.jurusan.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleDataJurusan();
    //eslint- disable - next - line
  }, []);

  //update
  const handleUpdateJurusan = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/jurusan/update/${id}`, {
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
    }
  };

  const handleDeleteJurusan = async (e) => {
    try {
      const res = await axios.delete(`/api/jurusan/delete/${id}`);
      if (res && res.data.success) {
        navigate('/dashboard/data-jurusan');
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
          <Button type="submit" style={{ borderRadius: '5px' }} handleClick={handleUpdateJurusan}>
            Update
          </Button>
          <Button variant="danger" type="submit" style={{ borderRadius: '5px' }} handleClick={handleDeleteJurusan}>
            Delete
          </Button>
        </div>

        {/* form add siswa */}
      </div>
    </Authenticated>
  );
}
