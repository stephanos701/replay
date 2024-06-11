/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import appFirebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import AppMovie from './MovieApp';
import './Home.css';
 // Asegúrate de crear y usar este archivo CSS para los estilos personalizados

const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
  return (
    <div className="home-container">
      <div className="user-info">
        <div className="user-logo">
          <img src="../src/assets/ReplayLogPrin.png" alt="User Logo" className='imglogo' />
        </div>
        <div className="username">{correoUsuario.slice(0, 6)}</div>
      </div>
      <button onClick={() => signOut(auth)} className="logout-btn">Logout</button>
      <AppMovie />
    </div>
  );
}

export default Home;
