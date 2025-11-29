import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { ReactFlowProvider } from 'reactflow'; 

import BarraDeNavegacion from './componentes/Barra_Nav/BarraDeNavegacion.jsx'; 

import Inicio from './componentes/Inicio/Inicio.jsx';
import DefinicionSistema from './componentes/Definicion/DefinicionSistema.jsx';
import DiagramaContexto from './componentes/Diagrama/DiagramaContexto.jsx';
import Desagregacion from './componentes/SubSistemas/Desagregacion.jsx';
import ProblemTree from './componentes/ArboldeProblemas/ProblemTree.jsx';
import Integrantes from './componentes/Intregrantes/Integrantes.jsx';
import FiguraRica from './componentes/FiguraRica/FiguraRica.jsx';
import Trilogia from './componentes/Trilogia/Trilogia.jsx';
import Interpretacion from './componentes/Interpretacion/Interpratacion.jsx';
import Factores from './Factores/Factores.jsx';
import Footer from './componentes/Footer/Footer.jsx';


const ScrollableContent = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]); 

    return (
        <>
            
            <Inicio /> 

            <div id="definicion">
                <DefinicionSistema/>
                <DiagramaContexto/>
            </div>
            
            <div id="problema">
                <Desagregacion />
            </div>
            <Interpretacion></Interpretacion>
            
            <div id="propuesta">
                <ReactFlowProvider>
                    <ProblemTree />
                </ReactFlowProvider>
            </div>
            
            <div id="sistema">
                <Integrantes />
            </div>
            
            
            <div id="solicitar">
                <FiguraRica />
            </div>
            <div id="trilogia">
                <Trilogia />
            </div>

            <Factores></Factores>
            <Footer></Footer>
        </>
    );
};


function App() {
    return (
        <>
            <BarraDeNavegacion />
            
            <Routes>
                <Route path="/" element={<ScrollableContent />} /> 
            </Routes>
        </>
    );
}

export default App;