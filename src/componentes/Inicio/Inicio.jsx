import React from 'react';
import './Inicio.css'; 
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <section className="inicio">
      <div 
        className="slider-item" 
      ></div>

      <div className="contenido-inicio">
        <h1 className="texto-superpuesto">Sistema de Adquisición de Viviendas de Interés Social en Managua, Nicaragua.</h1>
        <p className="texto-superpuesto">
            Este proyecto tiene como objetivo proporcionar viviendas accesibles y de calidad para familias de bajos ingresos en Nicaragua, especialmente en áreas vulnerables. A través de un modelo integral que incluye la construcción de viviendas sostenibles y la mejora de la infraestructura local, buscamos mejorar las condiciones de vida, generar empleo y fomentar el desarrollo económico y social.
          </p>

        <div className="botones-inicio">
          <Link to="/solicitar" className="btn-primario">Objetivos del Proyecto</Link>
          <button
            className="btn-secundario"
            onClick={() => document.getElementById('propuesta-seccion').scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Propuesta
          </button>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
