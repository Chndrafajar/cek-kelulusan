import React from 'react';
import { BsSpeedometer2 } from 'react-icons/bs';
import { FaAddressBook, FaGraduationCap, FaSchool } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useAuth } from '../context/auth';

export default function Sidebar({ menuOpen, setMenuOpen }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      admin: null,
      token: '',
    });
    navigate('/l_0_9_1_n');
    localStorage.removeItem('auth');
    swal('Good Job!', 'Logout successfully', 'success');
  };

  return (
    <>
      <nav className={menuOpen ? 'sidebar active' : 'sidebar'} id="sidebar">
        <ul className="nav">
          <li className="nav-brand">
            <h5 className="nav-link .nav-brand-link">
              Cek <b>Kelulusan</b>
            </h5>
            <IoMdClose onClick={() => setMenuOpen(!menuOpen)} />
          </li>
          <li className="nav-category">DASHBOARD</li>
          <li className="nav-item">
            <NavLink to="/dashboard/index" className="nav-link">
              <BsSpeedometer2 />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-category">DATA MASTER</li>
          <li className="nav-item">
            <NavLink to="/dashboard/data-siswa" className="nav-link">
              <FaAddressBook />
              Data Siswa
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/data-kelas" className="nav-link">
              <FaSchool />
              Data Kelas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/data-jurusan" className="nav-link">
              <FaGraduationCap />
              Data Jurusan
            </NavLink>
          </li>
          <li className="nav-item" onClick={handleLogout}>
            <span className="nav-link">
              <IoLogOut />
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
