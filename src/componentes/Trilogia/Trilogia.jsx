import React, { useState, useEffect, useRef } from 'react';
import './Trilogia.css';


import ImageCajaNegra from '../../Imagenes/Situacion.jpg'; 
import ImageFuncional from '../../Imagenes/objetivo.png';
import ImageEstructural from '../../Imagenes/alternativa.jpg'; 

export default function TrilogiaScroll() {
    const sectionsData = [
        {
            id: 'caja-negra',
            title: 'Situación Problémica',
            content: '"Las familias con ingresos bajos no pueden acceder a cuotas mensuales de US$187 para viviendas de interés social; representando el 73.2% de su ingreso mensual”.',
            bgColor: '#333333',
            imageSrc: ImageCajaNegra, 
        },
        {
            id: 'funcional',
            title: 'Objetivo',
            content: 'Reducir la carga económica mensual para la adquisición de viviendas de interés social en las familias de bajos ingresos de Managua, por lo menos en un 25% con respecto al salario mínimo actual de C$9,359.46 mensuales; a partir del 10 de Enero de 2027.',
            bgColor: '#004A77',
            imageSrc: ImageFuncional, 
        },
        {
            id: 'Alternativa',
            title: 'Alternativa',
            content: 'Implementar programas de vivienda social específicamente para familias nicaragüenses con ingresos de C$9,359.46  mediante un mecanismo financiero de costo total de $9,500 USD, aporte de la familia $4,500 con una cuota mensual de $60 por 25 años y un subsidio de $5,000.',
            bgColor: '#212121',
            imageSrc: ImageEstructural, 
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const triggerRefs = useRef([]);


    const handleScroll = () => {
        let newIndex = 0;
        const viewportCenter = window.innerHeight / 2;

        triggerRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();

                if (rect.top <= viewportCenter) { 
                    newIndex = index;
                }
            }
        });
        setActiveIndex(newIndex);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    return (
        <div className="trilogia-master-container">
            <div className="trilogia-sticky-wrapper">
 
                <div className="sticky-content-wrap">
                    <div 
                        className="sticky-content" 
                        style={{ backgroundColor: sectionsData[activeIndex].bgColor }}
                    >
                        <h1 className="sticky-title">Trilogía de Hall</h1>
                        <div key={activeIndex} className="panel-text-animated"> 
                            <h2 className="panel-title">{sectionsData[activeIndex].title}</h2>
                            <p className="panel-content">{sectionsData[activeIndex].content}</p>
                        </div>
                    </div>
                </div>

                <div className="image-stack-wrap">
                    {sectionsData.map((data, index) => (
                        <div 
                            key={data.id}
                            className={`image-panel ${activeIndex === index ? 'is-active' : ''}`}
                        >
                            <img 
                                src={data.imageSrc} 
                                alt={`Visual para ${data.title}`} 
                                className="trilogia-image"
                            />
                        </div>
                    ))}
                </div>
            </div>


            <div className="scroll-trigger-area">
                {sectionsData.map((data, index) => (
                    <div 
                        key={data.id} 
                        ref={el => triggerRefs.current[index] = el}
                        className="scroll-trigger-panel"
                    >
       
                    </div>
                ))}
            </div>
        </div>
    );
}