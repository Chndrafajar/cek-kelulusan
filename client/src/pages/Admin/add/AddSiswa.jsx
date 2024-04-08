import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { useAuth } from '../../../context/auth';
const { Option } = Select;

export default function AddSiswa() {
  const [auth] = useAuth();
  const [nama, setNama] = useState('');
  const [nis, setNis] = useState('');
  const [status, setStatus] = useState('');
  const [jeniskelamin, setJenisKelamin] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [tgllahir, setTgllahir] = useState('');
  const [kelas, setKelas] = useState('');
  const [jurusan, setJurusan] = useState('');

  const [kelasSelect, setKelasSelect] = useState([]);
  const [jurusanSelect, setJurusanSelect] = useState([]);

  const navigate = useNavigate();

  const handleSubmitSiswa = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/siswa/tambah', {
        nama,
        nis,
        status,
        tgllahir,
        kelas,
        jurusan,
        jeniskelamin,
        sekolah,
      });
      if (res && res.data.success) {
        navigate('/dashboard/data-siswa');
        swal('Good Job!', res.data.message, 'success');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      swal('Miss!', 'Login error', 'error');
    }
  };

  //get jurusan
  const getAllDataJurusan = async () => {
    try {
      const { data } = await axios.get('/api/jurusan/get-jurusan');
      if (data?.success) {
        setJurusanSelect(data?.jurusan);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get kelas
  const getAllDataKelas = async () => {
    try {
      const { data } = await axios.get('/api/kelas/get-kelas');
      if (data?.success) {
        setKelasSelect(data?.kelas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllDataKelas(), getAllDataJurusan();
  }, [auth?.token]);

  return (
    <Authenticated>
      <div className="card" style={{ border: 'none', padding: '20px' }}>
        <h5>Tambah Data Siswa</h5>

        {/* form add siswa */}
        <form onSubmit={handleSubmitSiswa}>
          <div>
            <Label forInput="nama">Nama Lengkap</Label>
            <Input variant="black" type="text" placeholder="Nama Lengkap" value={nama} handleChange={(e) => setNama(e.target.value)} />
          </div>
          <div className="mt-3">
            <Label forInput="sekolah">Sekolah</Label>
            <Input variant="black" type="text" placeholder="sekolah" value={sekolah} handleChange={(e) => setSekolah(e.target.value)} />
          </div>
          <div className="mt-3">
            <Label forInput="nis">NIS</Label>
            <Input variant="black" type="number" placeholder="NIS" value={nis} handleChange={(e) => setNis(e.target.value)} />
          </div>
          <div className="mt-3">
            <Label forInput="tgllahir">Tanggal Lahir</Label>
            <Input variant="black" type="date" placeholder="Tanggal Lahir" value={tgllahir} handleChange={(e) => setTgllahir(e.target.value)} min="2000-01-01" max="2009-12-31" />
          </div>
          <div className="mt-3">
            <Label forInput="jeniskelamin">Jenis Kelamin</Label>
            <div>
              <Select
                bordered={false}
                placeholder="Select a jeniskelamin"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setJenisKelamin(value);
                }}
              >
                <Option value="laki-laki">Laki-Laki</Option>
                <Option value="perempuan">Perempuan</Option>
              </Select>
            </div>
          </div>
          <div className="mt-3">
            <Label forInput="kelas">Kelas</Label>
            <div>
              <Select
                bordered={false}
                placeholder="Select a kelas"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setKelas(value);
                }}
              >
                {kelasSelect?.map((k) => (
                  <Option key={k._id} value={k._id}>
                    {k.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-3">
            <Label forInput="jurusan">Jurusan</Label>
            <div>
              <Select
                bordered={false}
                placeholder="Select a jurusan"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setJurusan(value);
                }}
              >
                {jurusanSelect?.map((j) => (
                  <Option key={j._id} value={j._id}>
                    {j.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-3">
            <Label forInput="status">Status</Label>
            <div>
              <Select
                bordered={false}
                placeholder="Select a status"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setStatus(value);
                }}
              >
                <Option value="lulus">Lulus</Option>
                <Option value="tidak lulus">Tidak Lulus</Option>
              </Select>
            </div>
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
