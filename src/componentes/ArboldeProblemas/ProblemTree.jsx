import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { 
    MiniMap, 
    Controls, 
    Background, 
    useNodesState, 
    useEdgesState, 
    addEdge,
    useReactFlow,
} from 'reactflow'; 

import '../../../node_modules/reactflow/dist/style.css'; 

import { getProblemTreeElements } from './problemTreeData';
import { getLayoutedElements } from '../Utilidades/dagreLayout.js';
import './ProblemTree.css'; 


const { nodes: rawNodes, edges: initialEdges } = getProblemTreeElements();


const ProblemTree = () => {

    const componentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);



    const [nodes, setNodes, onNodesChange] = useNodesState(rawNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    

    const instance = useReactFlow(); 


    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    useEffect(() => {
        
        const applyLayout = () => {
            try {

                const { nodes: layoutedNodes } = getLayoutedElements(rawNodes, initialEdges, 'BT');
                
   
                setNodes(layoutedNodes);
                

                setTimeout(() => {
                    instance.fitView({ padding: 0.2, duration: 500 });
                }, 50);

            } catch (error) {
                console.error("Fallo definitivo en el cálculo de Dagre. Los nodos están superpuestos.", error);
                
  
                instance.setViewport({ x: 0, y: 0, zoom: 0.5 }, { duration: 500 });
            }
        };

        applyLayout();


    }, []); 
    

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

    
  
    const onNodeClick = useCallback((event, node) => {
        const x = node.position.x + node.width / 2;
        const y = node.position.y + node.height / 2;

        instance.setViewport({ x: -x + 300, y: -y + 300, zoom: 1.5 }, { duration: 800 }); 
    }, [instance]);


    return (
        <div 
            ref={componentRef} 
            className={`problem-tree-container scroll-animate ${isVisible ? 'visible' : ''}`}
        >
            <h2 className="problem-tree-title">Árbol de Problemas: Déficit Habitacional</h2>
            <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}> 
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick} 
                    fitView 
                    attributionPosition="top-right"
                >
                    <MiniMap />
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    );
};

export default ProblemTree;