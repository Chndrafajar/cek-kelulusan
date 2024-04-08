import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '../context/auth';

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [auth] = useAuth();

  return (
    <>
      <nav className="navbar">
        <div className="items-nav">
          <div className="bar" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </div>
          <h5 style={{ textTransform: 'lowercase' }}>
            Welcome <b>{auth?.admin?.username}</b> cek kelulusan!
          </h5>
          <div className="left">
            <span>{auth?.admin?.username}</span>
          </div>
        </div>
      </nav>
    </>
  );
}
