import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl, post } from '../services/Endpoint';
import { removeUser } from '../redux/AuthSlice';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const request = await post('/auth/logout');
      const response = request.data;
      if (request.status === 200) {
        navigate('/');  // Cambia esto a '/' para redirigir a la página de inicio
        dispatch(removeUser());
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Mi Portal AE</Link>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto"> {/* Agrupa los elementos de navegación a la izquierda */}
              <li className="nav-item">
                <Link className="navbar-brand" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/">Sobre Mí</Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/">Proyectos</Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/">Contacto</Link>
              </li>
            </ul>
            <ul className="navbar-nav"> {/* Agrupa "Iniciar sesión" a la derecha */}
              {!user ? (
                <li className="nav-item">
                  <Link className="navbar-brand" to="/login">Iniciar sesión/registrarse</Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <div
                    className="avatar-container pointer rounded-circle overflow-hidden bg-info"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: '40px', height: '40px', cursor: "pointer" }}
                  >
                    <img
                      className="img-fluid h-100 w-100"
                      src={`${BaseUrl}/images/${user.profile}`}
                      alt="Profile"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                    {user.role === 'admin' && (
                      <li><Link className="dropdown-item" to="/dashboard">Panel</Link></li>
                    )}
                    <li><Link className="dropdown-item" to={`/profile/${user._id}`}>Perfil</Link></li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>Cerrar sesión</a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
