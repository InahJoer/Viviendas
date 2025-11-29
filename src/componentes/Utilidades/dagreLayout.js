// src/Utilidades/dagreLayout.js

import dagre from 'dagre';

const nodeWidth = 250; 
const nodeHeight = 150; 

export const getLayoutedElements = (nodes, edges, direction = 'BT') => {
    
    const g = new dagre.graphlib.Graph();
    
    // 🚨 CORRECCIÓN CLAVE: Configuraciones de robustez 🚨
    g.setGraph({ 
        rankdir: direction, 
        ranksep: 120, 
        nodesep: 60,
        // Agregamos estas líneas para estabilizar el cálculo en grafos complejos
        // Esto le dice a Dagre que espere un grafo dirigido.
        ranker: "network-simplex", 
        compound: false // Aseguramos que no se espera lógica de nodos compuestos
    }); 
    
    // Configuramos Dagre para grafos dirigidos (obligatorio para Dagre)
    g.setDefaultEdgeLabel(() => ({})); 


    // 1. Añadir Nodos
    nodes.forEach((node) => {
        g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // 2. Añadir Aristas
    edges.forEach((edge) => {
        // Usamos try/catch para proteger la ejecución de Dagre
        try {
            g.setEdge(edge.source, edge.target);
        } catch (e) {
            console.error("Fallo crítico: Error de ID huérfano en la arista.", edge);
            throw e; // Detiene el proceso, pero al menos da un error claro
        }
    });

    // 3. Ejecutar el Layout
    dagre.layout(g); // Si esto falla, los nodos se amontonan.

    // 4. Aplicar Posiciones Calculadas
    const layoutedNodes = nodes.map((node) => {
        const nodeWithLayout = g.node(node.id);
        
        node.position = {
            x: nodeWithLayout.x - nodeWidth / 2,
            y: nodeWithLayout.y - nodeHeight / 2,
        };
        
        return node;
    });

    return { nodes: layoutedNodes, edges };
};  