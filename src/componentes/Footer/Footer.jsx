import React from 'react';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; {currentYear}  Ingeniería en Sistemas - Sistema de Adquisición de Viviendas de Interés Social en Managua.</p>
                <p className="footer-citation">Diseñado para la asignatura de Ingeniería en Sistemas - UNI.</p>
            </div>
        </footer>
    );
}