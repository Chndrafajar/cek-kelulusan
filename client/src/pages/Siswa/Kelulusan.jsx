import React from 'react';
import { useAuth } from '../../context/auth';

export default function Kelulusan() {
  const [auth] = useAuth();

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  return (
    <section className="kelulusan">
      <div className="card">
        <div className={`header-kelulusan ${auth?.siswa?.status === 'lulus' ? 'bg-success' : 'bg-danger'}`}>
          <span>
            {auth?.siswa?.status === 'lulus' ? 'Selamat!' : ''} anda dinyatakan {auth?.siswa?.status}
          </span>
        </div>
        <div className="detail-kelulusan">
          <h1>{auth?.siswa?.nama}</h1>
          <div className="detail-row">
            <div className="detail-row-item">
              <span>Sekolah</span>
              <h6>{auth?.siswa?.sekolah}</h6>
            </div>
            <div className="detail-row-item">
              <span>NIS</span>
              <h6>{auth?.siswa?.nis}</h6>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-row-item">
              <span>Tanggal Lahir</span>
              <h6>{formatDate(auth?.siswa?.tgllahir)}</h6>
            </div>
            <div className="detail-row-item">
              <span>Jenis Kelamin</span>
              <h6 style={{ textTransform: 'capitalize' }}>{auth?.siswa?.jeniskelamin}</h6>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-row-item">
              <span>Kelas</span>
              <h6>{auth?.siswa?.kelas?.name}</h6>
            </div>
            <div className="detail-row-item">
              <span>Jurusan</span>
              <h6>{auth?.siswa?.jurusan?.name}</h6>
            </div>
          </div>
          <p>
            Pendidikan adalah sebuah perjalanan yang panjang dan menantang, tetapi juga merupakan tonggak sejarah dalam kehidupan setiap individu. Hari ini, kita mengenang perjalanan itu dengan bangga dan bersyukur. Setiap ujian, tugas
            rumah, proyek, dan ujian telah membentuk kalian menjadi orang yang kalian ada saat ini. Kalian telah menunjukkan ketekunan, ketabahan, dan keberanian yang luar biasa dalam menghadapi setiap tantangan.
          </p>
        </div>
      </div>
    </section>
  );
}
