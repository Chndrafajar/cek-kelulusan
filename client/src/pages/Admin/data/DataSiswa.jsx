import React, { useEffect, useState } from 'react';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import axios from 'axios';
import { useAuth } from '../../../context/auth';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { Select } from 'antd';
import Authenticated from '../../../layouts/Authenticated';
const { Option } = Select;

export default function DataSiswa() {
  const [siswa, setSiswa] = useState([]);
  const [auth] = useAuth();

  //get kelas
  const [siswaKelas, setSiswaKelas] = useState([]);
  const [kelasSelect, setKelasSelect] = useState([]);
  const [selectKelas, setSelectKelas] = useState('');

  //get jurusan
  const [siswaJurusan, setSiswaJurusan] = useState([]);
  const [selectJurusan, setSelectJurusan] = useState('');
  const [jurusanSelect, setJurusanSelect] = useState([]);

  // //get siswa search
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  //search
  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/v1/siswa/search/${keyword}`);
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error searching siswa:', error);
    }
  };

  const getAllDataSiswa = async () => {
    try {
      const { data } = await axios.get('/api/v1/siswa/get-data');
      setSiswa(data);
    } catch (error) {
      console.log(error);
    }
  };

  // //get kelas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/siswa/get-kelas/${selectKelas}`);
        setSiswaKelas(response.data.siswa); // Mengambil data siswa dari respons API
      } catch (error) {
        console.error('Error fetching siswa data:', error);
      }
    };

    if (selectKelas) {
      fetchData(); // Panggil fungsi fetchData hanya jika kelas terpilih
    }
  }, [selectKelas]);

  //get jurusan
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/siswa/get-jurusan/${selectJurusan}`);
        setSiswaJurusan(response.data.siswa); // Mengambil data siswa dari respons API
      } catch (error) {
        console.error('Error fetching siswa data:', error);
      }
    };

    if (selectJurusan) {
      fetchData(); // Panggil fungsi fetchData hanya jika kelas terpilih
    }
  }, [selectJurusan]);

  useEffect(() => {
    if (auth?.token) getAllDataSiswa();
  }, [auth?.token]);

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

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
    getAllDataKelas(), getAllDataJurusan();
  }, []);

  return (
    <Authenticated>
      <h2>Data Siswa</h2>
      <div className="card" style={{ border: 'none', padding: '20px', overflowY: 'auto' }}>
        <NavLink to="/dashboard/add-siswa">
          <Button style={{ width: '170px', borderRadius: '5px' }}>Tambah Data Siswa</Button>
        </NavLink>

        <div className="mt-3 mb-2" style={{ display: 'flex', gap: '20px' }}>
          <Select
            bordered={false}
            placeholder="Select a kelas"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setSelectKelas(value);
            }}
          >
            {kelasSelect?.map((k) => (
              <Option key={k._id} value={k.slug}>
                {k.name}
              </Option>
            ))}
          </Select>
          <Select
            bordered={false}
            placeholder="Select a jurusan"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setSelectJurusan(value);
            }}
          >
            {jurusanSelect?.map((k) => (
              <Option key={k._id} value={k.slug}>
                {k.name}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Input variant="black" placeholder="Search siswa" value={keyword} handleChange={(e) => setKeyword(e.target.value)} />
          <Button variant="black" handleClick={handleSearch} style={{ width: '100px' }}>
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </div>

        {/* tabel data siswa */}
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">Sekolah</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">Nis</th>
              <th scope="col">Tanggal Lahir</th>
              <th scope="col">Kelas</th>
              <th scope="col">Jurusan</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {siswaKelas.length > 0
              ? // Jika ada data siswa kelas, tampilkan data siswa kelas
                siswaKelas.map((s, i) => (
                  <tr key={s._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{s.nama}</td>
                    <td>{s.sekolah}</td>
                    <td style={{ textTransform: 'capitalize' }}>{s.jeniskelamin}</td>
                    <td>{s.nis}</td>
                    <td>{formatDate(s.tgllahir)}</td>
                    <td>{s.kelas.name}</td>
                    <td>{s.jurusan.name}</td>
                    <td>{s.status}</td>
                    <td colspan="2">
                      <NavLink to={`/dashboard/edit-siswa/${s._id}`}>
                        <div className="btn-edit">
                          <FaEdit />
                        </div>
                      </NavLink>
                    </td>
                  </tr>
                ))
              : siswaJurusan.length > 0
              ? // Jika tidak ada data siswa kelas tapi ada data siswa jurusan, tampilkan data siswa jurusan
                siswaJurusan.map((s, i) => (
                  <tr key={s._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{s.nama}</td>
                    <td>{s.sekolah}</td>
                    <td style={{ textTransform: 'capitalize' }}>{s.jeniskelamin}</td>
                    <td>{s.nis}</td>
                    <td>{formatDate(s.tgllahir)}</td>
                    <td>{s.kelas.name}</td>
                    <td>{s.jurusan.name}</td>
                    <td>{s.status}</td>
                    <td colspan="2">
                      <NavLink to={`/dashboard/edit-siswa/${s._id}`}>
                        <div className="btn-edit">
                          <FaEdit />
                        </div>
                      </NavLink>
                    </td>
                  </tr>
                ))
              : searchResult.length > 0
              ? // Jika tidak ada data siswa kelas tapi ada data siswa pencarian, tampilkan data siswa pencarian
                searchResult.map((s, i) => (
                  <tr key={s._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{s.nama}</td>
                    <td>{s.sekolah}</td>
                    <td style={{ textTransform: 'capitalize' }}>{s.jeniskelamin}</td>
                    <td>{s.nis}</td>
                    <td>{formatDate(s.tgllahir)}</td>
                    <td>{s.kelas.name}</td>
                    <td>{s.jurusan.name}</td>
                    <td>{s.status}</td>
                    <td colspan="2">
                      <NavLink to={`/dashboard/edit-siswa/${s._id}`}>
                        <div className="btn-edit">
                          <FaEdit />
                        </div>
                      </NavLink>
                    </td>
                  </tr>
                ))
              : // Jika tidak ada data siswa kelas, siswa jurusan, dan siswa pencarian, tampilkan data siswa biasa
                siswa.map((s, i) => (
                  <tr key={s._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{s.nama}</td>
                    <td>{s.sekolah}</td>
                    <td style={{ textTransform: 'capitalize' }}>{s.jeniskelamin}</td>
                    <td>{s.nis}</td>
                    <td>{formatDate(s.tgllahir)}</td>
                    <td>{s.kelas.name}</td>
                    <td>{s.jurusan.name}</td>
                    <td>{s.status}</td>
                    <td colspan="2">
                      <NavLink to={`/dashboard/edit-siswa/${s._id}`}>
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
