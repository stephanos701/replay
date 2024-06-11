/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Imagen from '../assets/IconLogo.png';
import ImageProfile from '../assets/profile1.jpg';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';


const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [recuperando, setRecuperando] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const functAutenticacion = async (e) => {
    e.preventDefault();
    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert('Asegúrese de que la contraseña tenga más de 8 caracteres');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        alert('El correo o la contraseña son incorrectos');
      }
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Se ha enviado un correo para restablecer tu contraseña.');
    } catch (error) {
      alert('Hubo un error al enviar el correo de restablecimiento.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow">
              <img src={Imagen} alt="" className="estilo-profile" />
              {!recuperando ? (
                <form onSubmit={functAutenticacion}>
                  <input
                    type="text"
                    placeholder="Ingresar email"
                    className="cajatexto"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Ingresar contraseña"
                    className="cajatexto"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="btnform form-control">
                    {registrando ? 'Registrarse' : 'Iniciar Sesión'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePasswordReset}>
                  <input
                    type="text"
                    placeholder="Ingresar email"
                    className="cajatexto"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btnform form-control">
                    Enviar correo de recuperación
                  </button>
                </form>
              )}
              {!recuperando && (
                <h4 className="texto">
                  {registrando ? 'Si ya tienes cuenta' : 'No tienes cuenta?'}{' '}
                  <button className="btnswitch" onClick={() => setRegistrando(!registrando)}>
                    {registrando ? 'Inicia Sesión' : 'Registrate'}
                  </button>
                </h4>
              )}
              {!registrando && (
                <h4 className="texto">
                  ¿Olvidaste tu contraseña?{' '}
                  <button className="btnswitch" onClick={() => setRecuperando(!recuperando)}>
                    {recuperando ? 'Inicia Sesión' : 'Recuperar Contraseña'}
                  </button>
                </h4>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <img src={Imagen} alt="" className="tamaño-imagen" />
        </div>
      </div>
    </div>
  );
};

export default Login;
