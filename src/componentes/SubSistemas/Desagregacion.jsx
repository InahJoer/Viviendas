import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Layers, Settings, DollarSign, Home, Zap, Shield, BookOpen } from 'lucide-react';
import './Desagregacion.css'

const subsistemasData = [
    {
      id: 1,
      nombre: 'Subsistema Planificación y Ordenamiento Habitacional',
      icon: Layers,
      colorClass: 'bg-teal', 
      descripcion: 'Define las necesidades, selecciona terrenos aptos y diseña los proyectos de urbanización.',
      detalles: [
        { nombre: 'Subsistema Diagnóstico y Evaluación de Necesidades', microsistemas: ['Microsistema Identificación de la demanda habitacional', 'Microsistema Caracterización socioeconómica de solicitantes'] },
        { nombre: 'Subsistema Planificación Urbana', microsistemas: ['Microsistema Selección de terrenos y zonas urbanizables', 'Microsistema Diseño de proyectos habitacionales'] },
      ],
    },
    {
      id: 2,
      nombre: 'Subsistema Gestión Institucional y Administrativa',
      icon: Settings,
      colorClass: 'bg-blue',
      descripcion: 'Coordinación entre el Gobierno Central, Municipal y entidades interinstitucionales (INVUR, MARENA, ENACAL).',
      detalles: [
        { nombre: 'Sub-subsistema Gobierno Central', microsistemas: ['Microsistema INVUR', 'Microsistema MARENA'] },
        { nombre: 'Sub-subsistema Gobierno Municipal', microsistemas: ['Microsistema Alcaldías Municipal', 'Microsistema Dirección de Urbanismo y Construcción'] },
        { nombre: 'Sub-subsistema Coordinación Interinstitucional', microsistemas: ['Microsistema ENACAL', 'Microsistema MTI', 'Microsistema DISSNORTE-DISSUR'] },
      ],
    },
    {
      id: 3,
      nombre: 'Subsistema Financiamiento y Economía',
      icon: DollarSign,
      colorClass: 'bg-green',
      descripcion: 'Administra y asegura los recursos financieros necesarios a través de fuentes nacionales e internacionales.',
      detalles: [
        { nombre: 'Sub-subsistema Fuentes Nacionales', microsistemas: ['Microsistema Presupuesto municipal', 'Microsistema Créditos hipotecarios locales'] },
        { nombre: 'Sub-subsistema Fuentes Internacionales', microsistemas: ['Microsistema Cooperación multilateral y fondos externos', 'Microsistema Programas de subsidio habitacional'] },
      ],
    },
    {
      id: 4,
      nombre: 'Subsistema Construcción e Infraestructura',
      icon: Home,
      colorClass: 'bg-yellow',
      descripcion: 'Ejecución de las obras civiles, incluyendo urbanización, construcción de viviendas y servicios básicos.',
      detalles: [
        { nombre: 'Sub-subsistema Obras Civiles', microsistemas: ['Microsistema Urbanización y trazado de lotes', 'Microsistema Construcción de viviendas'] },
        { nombre: 'Sub-subsistema Servicios Básicos', microsistemas: ['Microsistema Agua potable y alcantarillado', 'Microsistema Energía eléctrica y alumbrado público'] },
        { nombre: 'Sub-subsistema Suministros y Logística', microsistemas: ['Microsistema Proveedores de materiales', 'Microsistema Transporte y maquinaria'] },
      ],
    },
    {
      id: 5,
      nombre: 'Subsistema Regulación y Control',
      icon: Shield,
      colorClass: 'bg-red',
      descripcion: 'Verifica el cumplimiento de normas legales, técnicas y ambientales para garantizar la calidad y seguridad.',
      detalles: [
        { nombre: 'Sub-subsistema Normativo', microsistemas: ['Microsistema Marco legal de vivienda social', 'Microsistema Normas urbanas y de construcción'] },
        { nombre: 'Sub-subsistema Ambiental', microsistemas: ['Microsistema Evaluación de impacto ambiental', 'Microsistema Monitoreo y mitigación ecológica'] },
        { nombre: 'Sub-subsistema Supervisión Técnica', microsistemas: ['Microsistema Inspección de obras', 'Microsistema Control de calidad estructural'] },
      ],
    },
    {
      id: 6,
      nombre: 'Subsistema Gestión Habitacional',
      icon: BookOpen,
      colorClass: 'bg-purple',
      descripcion: 'Registro de solicitantes, selección de beneficiarios, asignación y seguimiento post-entrega de viviendas.',
      detalles: [
        { nombre: 'Sub-subsistema Selección y Asignación', microsistemas: ['Microsistema Registro de solicitantes', 'Microsistema Asignación de viviendas'] },
        { nombre: 'Sub-subsistema Seguimiento', microsistemas: ['Microsistema Entrega de viviendas', 'Microsistema Educación financiera y comunitaria', 'Microsistema Mantenimiento y reparación de viviendas'] },
      ],
    },
];


const Desagregacion = () => {

    const [activeIndex, setActiveIndex] = useState(null);

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



    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (

        <div 
            id="sistema" 
            className={`desagregacion-container fade-section ${isVisible ? 'is-visible' : ''}`}
            ref={componentRef} 
        >
            <h2 className="main-title">
                Desagregación del sistema en Subsistema, Sub-subsistema y Microsistema
            </h2>
            
            <div className="accordion-wrapper">
                {subsistemasData.map((subsistema, index) => {
                    const isOpen = activeIndex === index;
                    const IconComponent = subsistema.icon;

                    return (
                        <div 
                            key={subsistema.id} 
                            className="subsistema-card-wrapper"
                        >
                            
                            <button
                                onClick={() => handleToggle(index)}
                                className={`toggle-btn ${subsistema.colorClass}`}
                            >
                                <div className="header-content">
                                    <IconComponent className="icon-main" />
                                    <div>
                                        <h3 className="subsistema-title">{subsistema.id}. {subsistema.nombre}</h3>
                                        <p className="subsistema-description">{subsistema.descripcion}</p>
                                    </div>
                                </div>
                                <ChevronDown className={`toggle-icon ${isOpen ? 'open' : ''}`} />
                            </button>


                            <div
                                className={`content-wrapper ${isOpen ? 'open' : 'closed'}`}
                            >
                                <div className="grid-content">
                                    {subsistema.detalles.map((subSubsistema, idx) => (
                                        <div key={idx} className="sub-subsistema-card">
                                            <h4 className="sub-subsistema-title">{subSubsistema.nombre}</h4>
                                            <ul className="microsistema-list">
                                                {subSubsistema.microsistemas.map((microsistema, i) => (
                                                    <li key={i}>{microsistema}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Desagregacion;