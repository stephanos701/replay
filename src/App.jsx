/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
// importando los modulos de firebase
import appFirebase from '../src/credenciales'


import {getAuth, onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(appFirebase)

// importar los componentes
import Home from './components/Home'
import Login from './components/Login'



function App() {
  
  const [usuario,setUsuario] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase)
    }
    else
    {setUsuario(null)}
  })

  return (
    
    
   <div>
    
    
    
      {usuario ? <Home correoUsuario = {usuario.email} /> : <Login/>}
    
     
   </div>
   
  )
}

export default App
