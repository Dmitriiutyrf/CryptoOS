
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Low-Current Systems</div>
      <nav>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
