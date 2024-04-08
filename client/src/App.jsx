import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Siswa/Login';
import LoginAdmin from './pages/Admin/LoginAdmin';
import AdminRoute from './routes/AdminRoute';
import Dashboard from './pages/Admin/Dashboard';
import AddSiswa from './pages/Admin/add/AddSiswa';
import AddJurusan from './pages/Admin/add/AddJurusan';
import AddKelas from './pages/Admin/add/AddKelas';
import EditSiswa from './pages/Admin/edit/EditSiswa';
import EditJurusan from './pages/Admin/edit/EditJurusan';
import EditKelas from './pages/Admin/edit/EditKelas';
import DataSiswa from './pages/Admin/data/DataSiswa';
import DataJurusan from './pages/Admin/data/DataJurusan';
import DataKelas from './pages/Admin/data/DataKelas';
import PrivateRoutes from './routes/PrivateRoutes';
import Kelulusan from './pages/Siswa/Kelulusan';
import LoadingBar from './components/LoadingBar';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const handleRouteChange = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    handleRouteChange();
  }, [location]);

  return (
    <>
      {isLoading && <LoadingBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/l_0_9_1_n" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="index" element={<Dashboard />} />
          <Route path="add-siswa" element={<AddSiswa />} />
          <Route path="add-jurusan" element={<AddJurusan />} />
          <Route path="add-kelas" element={<AddKelas />} />
          <Route path="edit-siswa/:sid" element={<EditSiswa />} />
          <Route path="edit-jurusan/:jid" element={<EditJurusan />} />
          <Route path="edit-kelas/:kid" element={<EditKelas />} />
          <Route path="data-siswa" element={<DataSiswa />} />
          <Route path="data-jurusan" element={<DataJurusan />} />
          <Route path="data-kelas" element={<DataKelas />} />
        </Route>
        <Route path="/siswa" element={<PrivateRoutes />}>
          <Route path="informasi-kelulusan" element={<Kelulusan />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
