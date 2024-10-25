import React, { useEffect, useState } from 'react';
import LatestPost from '../Components/LatestPost';
import { get } from '../services/Endpoint';

export default function Home() {
  return (
    <>
      

      {/* Hero Section */}
      <div className="container-fluid bg-dark hero-section text-center">
        <h1 className="fs-1 fw-bold text-light">BIENVENIDO A MI PORTAL AELISBAN</h1>
        <p className="text-light fs-5 mt-3">
          Mi espacio personal donde podrás ver las actividades que realizo en mi tiempo libre.
        </p>
      </div>

      {/* Latest Posts Section */}
      <div className='container-fluid p-5'>
        <h2 className="text-center">Últimos Posts</h2>
        <LatestPost />
      </div>

      {/* Services/Interests Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Mis Servicios e Intereses</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card p-3">
              <i className="bi bi-code-slash fs-1"></i>
              <h3 className="mt-3">Desarrollo Web</h3>
              <p>Sitios web dinámicos y modernos usando las últimas tecnologías como React, Node.js.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <i className="bi bi-cpu fs-1"></i>
              <h3 className="mt-3">Proyectos IoT</h3>
              <p>Desarrollo proyectos que integran dispositivos inteligentes con la nube para automatización y monitoreo.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <i className="bi bi-bar-chart-line fs-1"></i>
              <h3 className="mt-3">Data Science</h3>
              <p>Me apasiona el análisis de datos y la creación de modelos predictivos con herramientas de ciencia de datos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container-fluid bg-light p-5">
        <h2 className="text-center mb-4">Galería de Imágenes</h2>
        <div className="row g-3">
          <div className="col-md-3">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" className="img-fluid rounded" alt="img1" />
          </div>
          <div className="col-md-3">
            <img src="https://images.unsplash.com/photo-1497302347632-904729bc24aa" className="img-fluid rounded" alt="img2" />
          </div>
          <div className="col-md-3">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" className="img-fluid rounded" alt="img3" />
          </div>
          <div className="col-md-3">
            <img src="https://images.unsplash.com/photo-1497302347632-904729bc24aa" className="img-fluid rounded" alt="img4" />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Contáctame</h2>
        <form>
          <div className="mb-3">
            <label for="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" />
          </div>
          <div className="mb-3">
            <label for="message" className="form-label">Mensaje</label>
            <textarea className="form-control" id="message" rows="3" placeholder="Escribe tu mensaje aquí..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center p-3">
        <p className="mb-0">© 2024 Mi Portal AE.</p>
      </footer>
    </>
  );
}
