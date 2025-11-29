import React, { useRef, useState, useEffect } from 'react';
import './FiguraRica.css';

import FiguraRicaImage from '../../Imagenes/FiguraRica.png'; 

export default function FiguraRicaYDefinicion() {
    const definicionRaiz = "Un Sistema de Adquisición de Viviendas de Interés Social para reducir la carga económica mensual que impide el acceso a una vivienda digna en familias de bajos ingresos en Managua, a través de un mecanismo financiero que combine subsidios directos, créditos con tasas preferenciales y plazos extendidos; a fin de disminuir la proporción del ingreso familiar destinado al pago de vivienda desde el 73.2% actual hasta un 25% o menos, a partir del 10 de enero de 2027.";

    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [isVisible]);

    return (
        <div 
            ref={containerRef}
            className={`figura-rica-container ${isVisible ? 'revealed' : ''}`}
        >
            <h2 className="section-title">Figura Rica</h2>
            <div className="figura-rica-wrapper">
                <img 
                    src={FiguraRicaImage} 
                    alt="Figura Rica del Sistema de Adquisición de Viviendas de Interés Social"
                    className="figura-rica-image"
                />
            </div>

            <hr className="divider" />

            <h2 className="section-title">Definición Raíz del Problema</h2>
            <blockquote className="definicion-raiz-block">
                {definicionRaiz}
            </blockquote>

            <p className="definicion-nota">
                La Definición Raíz establece el objetivo central del sistema desde una perspectiva W (Weltanschauung) de transformación.
            </p>
        </div>
    );
}
