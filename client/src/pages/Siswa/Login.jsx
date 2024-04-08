import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useAuth } from '../../context/auth';

export default function Login() {
  const [nis, setNis] = useState('');

  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/v1/siswa/login', {
        nis,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          siswa: res.data.siswa,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        setTimeout(() => {
          setLoading(false);
          navigate('/siswa/informasi-kelulusan');
        }, 1000);
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      swal('Miss!', 'Invalid Nama Or Nis', 'error');
    }
  };

  return (
    <section className="cek-kelulusan">
      <div className="card">
        <h2>Pengumuman Kelulusan</h2>
        <h4>SMK NEGERI PEMALANG</h4>
        <h4>Tahun Ajaran 2023/2024</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input variant="black" type="number" placeholder="NIS" value={nis} handleChange={(e) => setNis(e.target.value)} />
          </div>
          <div>
            {loading ? (
              <Button type="submit" variant="black">
                Loading....
              </Button>
            ) : (
              <Button type="submit" variant="black">
                Cek Kelulusan
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
