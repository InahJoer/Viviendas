import React, { useEffect, useState } from 'react';
import './BarraDeNavegacion.css';
import { Link } from 'react-router-dom';
import Logo from '../../Imagenes/Logo.png'; 

export const BarraDeNavegacion = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); 
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`ContenedorHeader ${isScrolled ? 'scrolled' : ''}`}>
            <div className='header-logo'>
                {/* Enlace al inicio */}
                <Link to="/"> 
                    <img src={Logo} alt="Logo Vivienda Digna" />
                </Link>
            </div>

            <nav className='navegador'>
                {/* 1. Definicion -> ANCLA #definicion */}
                <Link to="/#definicion" className="nav-link">Definición</Link> 
                
                {/* 2. Desagregacion -> ANCLA #problema */}
                <Link to="/#problema" className="nav-link">Desagregacion</Link>
                
                {/* 3. Árbol de Problemas -> ANCLA #propuesta */}
                <Link to="/#propuesta" className="nav-link">Arbol</Link>
                
                {/* 4. Integrantes -> ANCLA #sistema */}
                <Link to="/#sistema" className="nav-link">Integrantes</Link>

                {/* 5. Trilogía de Hall -> ANCLA #trilogia */}
                <Link to="/#trilogia" className="nav-link">Trilogía</Link>
            </nav>

            <div>
                {/* Botón CTA -> ANCLA #solicitar */}
                <Link to="/#solicitar" className="CTA-botton">Objetivos del Proyecto</Link>
            </div>
        </header>
    );
};

export default BarraDeNavegacion;