import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const LoadingBar = () => {
  return (
    <>
      <div className="loading-item">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingBar;
