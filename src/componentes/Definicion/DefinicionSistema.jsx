import React, { useState, useEffect, useRef } from 'react';
import './DefinicionSistema.css'; 
import LogoSistema from '../../Imagenes/martillo.png'

const DefinicionSistema = () => {
    const [isVisible, setIsVisible] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '0px 0px -100px 0px', 
            }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);
    
    return (
        <section 
            id="definicion-sistema" 
            className={`sistema-container fade-section ${isVisible ? 'is-visible' : ''}`}
            ref={componentRef}
        >
            <h2 className="title-section">
                Definición y Alcance del Sistema
            </h2>
            
            <div className="definicion-layout-wrapper">
                
                
                <div className="definicion-content-grid">
                    

                    <div className="info-card card-teal">
                        <h3 className="card-title">¿Qué es un Sistema?</h3>
                        <p className="card-text">
                            Una serie de elementos u objetos con determinada relación entre esos objetos y entre sus atributos.
                        </p>
                    </div>
                    

                    <div className="info-card card-blue">
                        <h3 className="card-title">Objeto de Estudio</h3>
                        <p className="card-subtitle">(Suprasistema)</p>
                        <p className="card-value">Sistema Nacional de Vivienda en Nicaragua.</p>
                    </div>
                    
                    <div className="info-card card-green">
                        <h3 className="card-title">Campo de Acción</h3>
                        <p className="card-subtitle">(Sistema de Interés)</p>
                        <p className="card-value">Sistema de Adquisición de Viviendas de Interés Social en Managua.</p>
                    </div>
                    
                    <div className="info-card card-yellow">
                        <h3 className="card-title">Nombre del Sistema</h3>
                        <p className="card-value">Sistema de Adquisición de Viviendas de Interés Social en Managua, Nicaragua.</p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default DefinicionSistema;