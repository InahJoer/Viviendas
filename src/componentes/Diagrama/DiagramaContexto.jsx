import React, { useRef, useEffect, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import '../../../node_modules/reactflow/dist/style.css'; 
import './DiagramaContexto.css'

const initialNodes = [
    {
        id: '1',
        type: 'default',
        data: { label: 'Sistema de Adquisición de casa de interés social en Managua' },
        position: { x: 250, y: 250 },
        style: { 
            background: '#FFC72C', 
            color: '#004A77', 
            width: 150, 
            height: 150, 
            borderRadius: 50, 
            textAlign: 'center', 
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            border: '3px solid #004A77',
        },
    },
    { id: '2', data: { label: 'INVUR' }, position: { x: 100, y: 100 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
    { id: '3', data: { label: 'Bancos' }, position: { x: 450, y: 100 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
    { id: '4', data: { label: 'Familias Solicitantes' }, position: { x: 600, y: 250 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
    { id: '5', data: { label: 'Empresas Constructoras' }, position: { x: 450, y: 400 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
    { id: '6', data: { label: 'Cooperación Internacional' }, position: { x: 250, y: 450 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
    { id: '7', data: { label: 'Alcaldía de Managua' }, position: { x: 100, y: 400 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
    { id: '8', data: { label: 'Gobierno de Nicaragua' }, position: { x: 0, y: 250 }, style: { background: '#004A77', color: 'white', borderRadius: '50%' } },
];


const initialEdges = [
    { id: 'e2-1', source: '2', target: '1', animated: true, style: { stroke: '#FFC72C' } },
    { id: 'e3-1', source: '3', target: '1', animated: true, style: { stroke: '#FFC72C' } },
    { id: 'e4-1', source: '4', target: '1', animated: true, style: { stroke: '#FFC72C' } },
    { id: 'e5-1', source: '5', target: '1', animated: true, style: { stroke: '#FFC72C' } },
    { id: 'e6-1', source: '6', target: '1', animated: true, style: { stroke: '#FFC72C' } },
    { id: 'e7-1', source: '7', target: '1', animated: true, style: { stroke: '#FFC72C' } },
    { id: 'e8-1', source: '8', target: '1', animated: true, style: { stroke: '#FFC72C' } },
];


export default function SistemaDeViviendaFlow() {
    const componentRef = useRef(null);
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
        <div 
            ref={componentRef} 
            className={`diagrama-contenedor-principal scroll-animate ${isVisible ? 'visible' : ''}`}
        > 
            <h2 className="diagrama-titulo">Diagrama de Contexto</h2>
            

            <div className="reactflow-wrapper">
                <ReactFlow 
                    nodes={initialNodes} 
                    edges={initialEdges} 
                    fitView 
                    snapToGrid={true}
                    attributionPosition="bottom-left"
                    proOptions={{ hideAttribution: true }} 
                >
                    <MiniMap />
                    <Controls />
                    <Background variant="dots" gap={12} size={1} /> 
                </ReactFlow>
            </div>
        </div>
    );
}