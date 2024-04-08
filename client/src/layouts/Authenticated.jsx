import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Authenticated({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section className="authenticated">
        <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="content">
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div class="main-panel">
            <div class="content-wrapper">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
