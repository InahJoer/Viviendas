import React, { useRef, useState, useEffect } from 'react';
import './Integrantes.css'; 

const integrantesData = [
    {
        tipo: 'Integrantes Físicos y Técnicos',
        icon: '🏗️',
        bgColor: '#333333',
        elementos: [
            'Terrenos urbanizables',
            'Materiales de construcción (cemento, acero, agregados)',
            'Maquinaria y equipos',
            'Infraestructura básica (agua potable, energía, calles)',
            'Normas técnicas (NTON, RNC-07)',
            'Procesos de construcción',
            'Servicios de urbanización',
            'Condiciones ambientales y climáticas',
        ],
        descripcion: 'Elementos físicos, tecnológicos y normativos que hacen posible la urbanización, diseño y construcción de viviendas. Incluye estándares técnicos y las condiciones reales del entorno.',
    },
    {
        tipo: 'Integrantes Económicos y Comerciales',
        icon: '💵',
        bgColor: '#212121', 
        elementos: [
            'Gobierno de Nicaragua (subsidios, políticas)',
            'INVUR',
            'Alcaldía de Managua',
            'Bancos y entidades financieras',
            'Cooperación internacional (BID, BCIE)',
            'Empresas constructoras',
            'Proveedores de materiales',
            'Costos de producción',
            'Precios de venta de vivienda',
            'Actividades comerciales (compras, contratos)',
        ],
        descripcion: 'Representan los recursos económicos, financieros y comerciales que permiten operar el sistema: financiamiento, inversión, precios, operaciones de compra y contratación.',
    },
    {
        tipo: 'Integrantes Sociales',
        icon: '👨‍👩‍👧‍👦',
        bgColor: '#004A77', 
        elementos: [
            'Familias solicitantes y beneficiarias',
            'Comunidades locales',
            'Perfil socioeconómico de la población',
            'Factores humanos (capacidad de pago, cultura de endeudamiento)',
            'Personal técnico y administrativo (INVUR, Alcaldía)',
            'Universidades',
            'Impacto social y expectativas de la comunidad',
        ],
        descripcion: 'Son los actores humanos que interactúan con el sistema: población, instituciones, hábitos, actitudes, limitaciones y necesidades. Influyen directamente en el funcionamiento y aceptación del sistema.',
    },
];

function IntegranteSection({ data, index }) {
    const sectionRef = useRef(null);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenVisible) {
                    setHasBeenVisible(true);
                    observer.unobserve(entry.target); 
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1 
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasBeenVisible]);

    const isImageRight = index % 2 === 0;

    const content = (
        <div className="integrante-content" style={{ backgroundColor: data.bgColor }}>
            <div className="content-inner">
                <p className="integrante-subtitle">Integrantes del Sistema</p>
                <div className="integrante-header">
                    <span className="integrante-icon">{data.icon}</span>
                    <h2 className="integrante-title">{data.tipo}</h2>
                </div>
                
                <div className="integrante-details">
                    <h3>Elementos que contiene:</h3>
                    <ul>
                        {data.elementos.map((el, i) => <li key={i}>{el}</li>)}
                    </ul>
                    
                    <h3>Descripción:</h3>
                    <p>{data.descripcion}</p>
                </div>
            </div>
        </div>
    );

    const imagePlaceholder = (
        <div className="integrante-image-placeholder">
            <p className="image-caption">{data.tipo}</p>
        </div>
    );

    return (
        <section 
            ref={sectionRef}
            className={`integrante-section ${isImageRight ? 'image-right' : 'image-left'} ${hasBeenVisible ? 'active-once' : ''}`}
        >
            {imagePlaceholder} 
            {content}
        </section>
    );
}

export default function IntegrantesScrollReveal() {
    return (
        <div className="integrantes-scroll-container">
            {integrantesData.map((data, index) => (
                <IntegranteSection key={index} data={data} index={index} />
            ))}
        </div>
    );
}