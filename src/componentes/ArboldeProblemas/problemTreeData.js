export const getProblemTreeElements = () => {
    const nodes = [];
    const edges = [];
    
    let nodeCounter = 0;
    let edgeCounter = 0;

    const createNode = (label, type, className = '') => {
        nodeCounter++;
        return {
            id: `node-${nodeCounter}`,
            data: { label: label },
            position: { x: 0, y: 0 },
            className: `problem-node ${type} ${className}`,
            style: { width: 250, minHeight: 150 }, // Tamaño consistente con Dagre Layout
        };
    };

    const createEdge = (sourceId, targetId, label = '', animated = true, markerEnd = true) => {
        edgeCounter++;
        return {
            id: `edge-${edgeCounter}`,
            source: sourceId,
            target: targetId,
            label: label,
            animated: animated,
            type: 'smoothstep',
            markerEnd: markerEnd ? { type: 'arrowclosed' } : undefined,
            style: { strokeWidth: 2, stroke: '#888' },
        };
    };

    // ----------------------------------------------------------------------
    // --- 1. DEFINICIÓN Y REGISTRO DE TODOS LOS NODOS ---
    // (Declaramos primero todas las variables de nodo para asegurar el alcance)
    // ----------------------------------------------------------------------
    
    // NODO CENTRAL
    const problemCentral = createNode('Las familias con ingresos bajos no pueden acceder a cuotas mensuales de US$187 para viviendas de interés social; representando el 73.2% de su ingreso mensual.', 'problem-central');
    nodes.push(problemCentral);

    // Nivel 1: Causas Directas (Amarillo Inferior)
    const causa1_costos = createNode('Altos costos de materiales y terrenos para la construcción de viviendas', 'cause-level-1');
    const causa2_escasez = createNode('Escasez de proyectos habitacionales asequibles', 'cause-level-1');
    const causa3_educacion = createNode('Bajos niveles de educación financiera en familias de bajos ingresos', 'cause-level-1');
    const causa4_subsidios = createNode('Subsidios habitacionales insuficientes y fondos agotados rápidamente', 'cause-level-1');
    nodes.push(causa1_costos, causa2_escasez, causa3_educacion, causa4_subsidios);

    // Nivel 1: Efectos Directos (Amarillo Superior)
    const efecto1_adquisicion = createNode('Baja adquisición de viviendas de interés social', 'effect-level-1');
    const efecto2_deficit = createNode('Incremento del déficit habitacional urbano y rural', 'effect-level-1');
    const efecto3_alquileres = createNode('Aumento en la demanda de alquileres informales', 'effect-level-1');
    const efecto4_asentamientos = createNode('Crecimiento de asentamientos espontáneos o precarios', 'effect-level-1');
    const efecto5_dificultad = createNode('Dificultad en el acceso a oportunidades urbanas y servicios básicos', 'effect-level-1');
    nodes.push(efecto1_adquisicion, efecto2_deficit, efecto3_alquileres, efecto4_asentamientos, efecto5_dificultad);

    // Nivel 2: Causas Subyacentes (Púrpura Medio)
    const subcausa1_1_precios = createNode('Incremento de precios internacionales de materiales de construcción', 'cause-level-2');
    const subcausa1_2_planificacion = createNode('Débil planificación urbana y deficiente gestión del suelo habitacional', 'cause-level-2');
    const subcausa2_1_inversion = createNode('Escasa inversión privada en vivienda social', 'cause-level-2');
    const subcausa2_2_procesos = createNode('Procesos lentos y falta de digitalización institucional', 'cause-level-2');
    const subcausa3_1_cultura = createNode('Escasa cultura del ahorro habitacional', 'cause-level-2');
    const subcausa3_2_ingresos = createNode('Bajos ingresos familiares y alta informalidad laboral', 'cause-level-2');
    nodes.push(subcausa1_1_precios, subcausa1_2_planificacion, subcausa2_1_inversion, subcausa2_2_procesos, subcausa3_1_cultura, subcausa3_2_ingresos);

    // Nivel 2: Efectos Secundarios (Púrpura Superior)
    const secefecto1_1_deterioro = createNode('Deterioro de la calidad de vida', 'effect-level-2');
    const secefecto1_2_marginacion = createNode('Aumento de la marginación y exclusión social', 'effect-level-2');
    const secefecto2_1_expansion = createNode('Expansión desordenada del área urbana', 'effect-level-2');
    const secefecto2_2_presion = createNode('Presion sobre servicios públicos', 'effect-level-2');
    const secefecto3_1_reduccion = createNode('Reducción del impacto y credibilidad de los programas de vivienda', 'effect-level-2');
    const secefecto4_1_inseguridad = createNode('Aumento de la inseguridad social', 'effect-level-2');
    const secefecto4_2_enfermedades = createNode('Aumento de enfermedades por malas condiciones de vivienda', 'effect-level-2');
    const secefecto5_1_desempleo = createNode('Incremento del desempleo y migración por falta de estabilidad habitacional', 'effect-level-2');
    nodes.push(secefecto1_1_deterioro, secefecto1_2_marginacion, secefecto2_1_expansion, secefecto2_2_presion, secefecto3_1_reduccion, secefecto4_1_inseguridad, secefecto4_2_enfermedades, secefecto5_1_desempleo);

    // Nivel 3: Causas Profundas (Púrpura Inferior)
    const deepcausa1_1 = createNode('Limitada oferta de terrenos urbanizables con servicios básicos', 'cause-level-3');
    const deepcausa1_2 = createNode('Falta de control estatal sobre precios del suelo urbano y materiales', 'cause-level-3');
    const deepcausa2_1 = createNode('Requisitos financieros inflexibles para el acceso a crédito', 'cause-level-3');
    const deepcausa2_2 = createNode('Falta de incentivos financieros para promotores de vivienda social', 'cause-level-3');
    const deepcausa2_3 = createNode('Débil coordinación entre INVUR, alcaldías y bancos', 'cause-level-3');
    const deepcausa3_1 = createNode('Déficit de programas financieros adaptados a trabajadores informales', 'cause-level-3');
    nodes.push(deepcausa1_1, deepcausa1_2, deepcausa2_1, deepcausa2_2, deepcausa2_3, deepcausa3_1);

    // ----------------------------------------------------------------------
    // --- 2. CONEXIONES (ARISTAS) ---
    // ----------------------------------------------------------------------
    
    // A. Nivel 1 (Causas -> Central)
    edges.push(
        createEdge(causa1_costos.id, problemCentral.id),
        createEdge(causa2_escasez.id, problemCentral.id),
        createEdge(causa3_educacion.id, problemCentral.id),
        createEdge(causa4_subsidios.id, problemCentral.id)
    );

    // B. Nivel 1 (Central -> Efectos)
    edges.push(
        createEdge(problemCentral.id, efecto1_adquisicion.id),
        createEdge(problemCentral.id, efecto2_deficit.id),
        createEdge(problemCentral.id, efecto3_alquileres.id),
        createEdge(problemCentral.id, efecto4_asentamientos.id),
        createEdge(problemCentral.id, efecto5_dificultad.id)
    );

    // C. Nivel 2 Causas (Medio -> Nivel 1)
    edges.push(
        createEdge(subcausa1_1_precios.id, causa1_costos.id),
        createEdge(subcausa1_2_planificacion.id, causa1_costos.id),
        createEdge(subcausa2_1_inversion.id, causa2_escasez.id),
        createEdge(subcausa2_2_procesos.id, causa2_escasez.id),
        createEdge(subcausa3_1_cultura.id, causa3_educacion.id),
        createEdge(subcausa3_2_ingresos.id, causa3_educacion.id)
    );

    // D. Nivel 3 Causas (Profundo -> Nivel 2/1)
    edges.push(
        // Costos (Nivel 3 -> Nivel 2)
        createEdge(deepcausa1_1.id, subcausa1_1_precios.id),
        createEdge(deepcausa1_2.id, subcausa1_2_planificacion.id),

        // Escasez (Nivel 3 -> Nivel 2)
        createEdge(deepcausa2_1.id, subcausa2_1_inversion.id),
        createEdge(deepcausa2_2.id, subcausa2_1_inversion.id),
        createEdge(deepcausa2_3.id, subcausa2_2_procesos.id),
        
        // Subsidios (Nivel 3 -> Nivel 1)
        createEdge(deepcausa3_1.id, causa4_subsidios.id)
    );

    // E. Nivel 2 Efectos (Secundario <- Nivel 1)
    edges.push(
        createEdge(efecto1_adquisicion.id, secefecto1_1_deterioro.id),
        createEdge(efecto1_adquisicion.id, secefecto1_2_marginacion.id),
        createEdge(efecto2_deficit.id, secefecto2_1_expansion.id),
        createEdge(efecto2_deficit.id, secefecto2_2_presion.id),
        createEdge(efecto3_alquileres.id, secefecto3_1_reduccion.id),
        createEdge(efecto4_asentamientos.id, secefecto4_1_inseguridad.id),
        createEdge(efecto4_asentamientos.id, secefecto4_2_enfermedades.id),
        createEdge(efecto5_dificultad.id, secefecto5_1_desempleo.id)
    );
    
    return { nodes, edges };
};