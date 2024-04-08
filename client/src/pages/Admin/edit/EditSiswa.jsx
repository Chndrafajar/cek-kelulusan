import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Select } from 'antd';
import { useAuth } from '../../../context/auth';
const { Option } = Select;

export default function EditSiswa() {
  const [auth] = useAuth();
  const [nama, setNama] = useState('');
  const [nis, setNis] = useState('');
  const [status, setStatus] = useState('');
  const [tgllahir, setTgllahir] = useState('');
  const [jeniskelamin, setJenisKelamin] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [kelas, setKelas] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [id, setId] = useState('');

  const [kelasSelect, setKelasSelect] = useState([]);
  const [jurusanSelect, setJurusanSelect] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const getSingleDataSiswa = async () => {
    try {
      const { data } = await axios.get(`/api/v1/siswa/get/${params.sid}`);
      setId(data.siswa._id);
      setNama(data.siswa.nama);
      setNis(data.siswa.nis);
      setStatus(data.siswa.status);
      setTgllahir(data.siswa.tgllahir);
      setKelas(data.siswa.kelas);
      setJurusan(data.siswa.jurusan);
      setJenisKelamin(data.siswa.jeniskelamin);
      setSekolah(data.siswa.sekolah);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleDataSiswa();
    //eslint- disable - next - line
  }, []);

  //update
  const handleUpdateSiswa = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/v1/siswa/update/${id}`, {
        nama,
        nis,
        status,
        tgllahir,
        kelas,
        jurusan,
        sekolah,
        jeniskelamin,
      });
      if (res && res.data.success) {
        navigate('/dashboard/data-siswa');
        swal('Good Job!', res.data.message, 'success');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSiswa = async (e) => {
    try {
      const res = await axios.delete(`/api/v1/siswa/delete/${id}`);
      if (res && res.data.success) {
        navigate('/dashboard/data-siswa');
        swal('Good Job!', res.data.message, 'success');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get jurusan
  const getAllDataJurusan = async () => {
    try {
      const { data } = await axios.get('/api/v1/jurusan/get-jurusan');
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
      const { data } = await axios.get('/api/v1/kelas/get-kelas');
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
        <h5>Edit Data Siswa</h5>

        {/* form add siswa */}
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
              value={jeniskelamin}
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
              value={kelas}
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
              value={jurusan}
              onChange={(value) => {
                setJurusan(value);
              }}
            >
              {jurusanSelect?.map((k) => (
                <Option key={k._id} value={k._id}>
                  {k.name}
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
              value={status}
              onChange={(value) => {
                setStatus(value);
              }}
            >
              <Option value="lulus">Lulus</Option>
              <Option value="tidak lulus">Tidak Lulus</Option>
            </Select>
          </div>
        </div>

        <div className="mt-3" style={{ display: 'flex', gap: '20px' }}>
          <Button type="submit" style={{ borderRadius: '5px' }} handleClick={handleUpdateSiswa}>
            Update
          </Button>
          <Button variant="danger" type="submit" style={{ borderRadius: '5px' }} handleClick={handleDeleteSiswa}>
            Delete
          </Button>
        </div>

        {/* form add siswa */}
      </div>
    </Authenticated>
  );
}
