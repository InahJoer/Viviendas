
import React, { useRef, useEffect, useState } from 'react';
import './Interpretacion.css'; 
export default function Interpretacion() {
    const interpretacionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setIsVisible(true);
        
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1, 
            }
        );


        if (interpretacionRef.current) {
            observer.observe(interpretacionRef.current);
        }

  
        return () => {
            if (interpretacionRef.current) {
                observer.unobserve(interpretacionRef.current);
            }
        };
    }, []); 

    return (
        <blockquote 
            ref={interpretacionRef} 
            className={`interpretacion-caja-unica ${isVisible ? 'visible' : ''}`}
        >
            <h3 className="interpretacion-subtitulo-unica">Interpretación</h3>
            <p>
                El Sistema de Adquisición de Viviendas de Interés Social en Managua se clasifica como un Sistema Suave, ya que aborda una situación problemática social, involucra múltiples actores humanos (familias, instituciones y empresas) y requiere del uso de metodologías de Sistemas Suaves como la Figura Rica, la Definición Raíz y el Modelo Conceptual para su análisis y diseño.
            </p>
            <p>
                El acceso a una vivienda digna y asequible en Nicaragua se ve limitado por diversos factores económicos, institucionales y sociales que dificultan la adquisición de hogares adecuados, especialmente para las familias de bajos ingresos. Esta situación ha provocado un incremento del déficit habitacional y el surgimiento de asentamientos precarios, afectando la calidad de vida.
            </p>
        </blockquote>
    );
}