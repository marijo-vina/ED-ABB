// --- ESQUELETO DE LÓGICA DEL ÁRBOL BINARIO DE BÚSQUEDA ---
// Esta es la clase "Modelo". Contiene toda la lógica y datos del árbol.

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        // Coordenadas para el dibujo (opcional pero útil)
        this.x = 0;
        this.y = 0;
    }
}

class BinarySearchTree {
    
    // El constructor ahora recibe los IDs de los elementos del DOM
    // con los que necesita interactuar.
    constructor(treeContainerId, consoleId) {
        this.root = null;
        this.treeContainer = document.getElementById(treeContainerId);
        this.console = document.getElementById(consoleId);
        this.log("Árbol inicializado. Listo para operar.");
    }

    // --- Helper para la consola ---
    log(message) {
        if (this.console) {
            this.console.innerHTML += `> ${message}\n`;
            this.console.scrollTop = this.console.scrollHeight;
        } else {
            console.log(`(Consola no encontrada) ${message}`);
        }
    }

    clearConsole() {
        if (this.console) {
            this.console.innerHTML = "";
            this.log("Consola limpiada.");
        }
    }

    // --- TAREA 1: Insertar un Elemento ---
    insert(value) {
        // TODO: Implementar lógica de inserción
        // 1. Crear un nuevo nodo
        // 2. Si el árbol está vacío, el nodo es la raíz
        // 3. Si no, buscar la posición correcta (recursiva o iterativamente)
        
        // Placeholder:
        if (this.root === null) {
            this.root = new Node(value);
        } else {
            // ... Lógica para encontrar dónde insertar ...
            this.log(`(Simulación) Buscando posición para ${value}...`);
        }
        
        this.log(`Nodo ${value} insertado correctamente.`);
        this.draw(); // Actualizar la visualización
    }

    // --- TAREA 2: Borrar un Elemento ---
    delete(value) {
        // TODO: Implementar lógica de borrado (La más compleja)
        // 1. Buscar el nodo a borrar
        // 2. Caso 1: Nodo hoja (sin hijos) -> Simplemente borrar
        // 3. Caso 2: Nodo con un hijo -> Reemplazar con el hijo
        // 4. Caso 3: Nodo con dos hijos -> Buscar sucesor (ej: el menor del subárbol derecho)
        
        this.log(`Intentando borrar nodo ${value}... (Lógica no implementada)`);
        this.draw(); // Actualizar la visualización
    }

    // --- TAREA 3: Buscar un Elemento ---
    search(value) {
        // TODO: Implementar lógica de búsqueda
        // 1. Empezar desde la raíz
        // 2. Si el valor es menor, ir a la izquierda
        // 3. Si el valor es mayor, ir a la derecha
        // 4. Si es igual, se encontró. Si se llega a null, no existe.
        
        this.log(`Buscando nodo ${value}... (Lógica no implementada)`);
        // Simulación
        const found = Math.random() > 0.5; // Simulación aleatoria
        if (found) {
            this.log(`¡Nodo ${value} encontrado!`);
        } else {
            this.log(`Nodo ${value} no se encuentra en el árbol.`);
        }
    }
    
    // --- TAREA 4: Recorrido en Inorden ---
    inOrder() {
        // TODO: Implementar recorrido Inorden (Izquierda, Raíz, Derecha)
        // 1. Crear una función recursiva auxiliar
        // 2. Acumular los valores en un array
        const result = "[Lógica no implementada]";
        this.log(`Recorrido Inorden: ${result}`);
    }

    // --- TAREA 5: Recorrido en Preorden ---
    preOrder() {
        // TODO: Implementar recorrido Preorden (Raíz, Izquierda, Derecha)
        const result = "[Lógica no implementada]";
        this.log(`Recorrido Preorden: ${result}`);
    }

    // --- TAREA 6: Recorrido en Postorden ---
    postOrder() {
        // TODO: Implementar recorrido Postorden (Izquierda, Derecha, Raíz)
        const result = "[Lógica no implementada]";
        this.log(`Recorrido Postorden: ${result}`);
    }

    // --- TAREA 7: Recorrido en Amplitud (Por Niveles) ---
    levelOrder() {
        // TODO: Implementar recorrido por niveles (Usar una Cola - Queue)
        // 1. Crear una cola y añadir la raíz
        // 2. Mientras la cola no esté vacía:
        //    a. Sacar un nodo
        //    b. Añadir su valor al resultado
        //    c. Añadir hijos (izquierdo, derecho) a la cola
        const result = "[Lógica no implementada]";
        this.log(`Recorrido en Amplitud: ${result}`);
    }

    // --- TAREA 8: Número de Niveles del Árbol (Altura) ---
    getHeight() {
        // TODO: Implementar cálculo de altura (función recursiva)
        // 1. Altura(nodo) = 1 + max(Altura(nodo.izquierda), Altura(nodo.derecha))
        // 2. Altura(null) = -1 o 0 (depende de la definición, usualmente -1 para nodos nulos)
        const height = -1; // Placeholder
        this.log(`Niveles totales (Altura): ${height} (Lógica no implementada)`);
    }

    // --- TAREA 9: Nivel de un Nodo Específico ---
    getNodeLevel(value) {
        // TODO: Implementar búsqueda de nivel
        // 1. Buscar el nodo como en search(), pero contando los niveles
        // 2. Nivel(raíz) = 0 o 1 (defínalo con su equipo)
        this.log(`Buscando nivel de ${value}... (Lógica no implementada)`);
    }

    // --- TAREA 10: Operación 1 Libre (Ej: Contar Hojas) ---
    op1_CountLeaves() {
        // TODO: Implementar conteo de hojas
        // 1. Una hoja es un nodo donde left es null Y right es null
        // 2. Recorrer el árbol y sumar
        this.log(`Operación Libre 1 (Contar Hojas): [Lógica no implementada]`);
    }

    // --- TAREA 11: Operación 2 Libre (Ej: Valor Máximo) ---
    op2_GetMaxValue() {
        // TODO: Implementar búsqueda de valor máximo
        // 1. En un ABB, es el nodo que esté más a la derecha
        // 2. Empezar en la raíz e ir siempre a la derecha hasta llegar a null
        this.log(`Operación Libre 2 (Valor Máximo): [Lógica no implementada]`);
    }

    // --- TAREA 12: Dibujar el Árbol (La parte visual) ---
    draw() {
        this.log("Actualizando visualización...");
        if (!this.treeContainer) return; // Salir si no hay contenedor
        
        this.treeContainer.innerHTML = ''; // Limpiar el lienzo
        
        if (this.root === null) {
            this.treeContainer.innerHTML = '<p class="text-gray-400 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">El árbol está vacío. Inserta un nodo para comenzar.</p>';
            return;
        }

        // TODO: Esta es la parte más difícil de la visualización.
        // 1. Necesitan una función recursiva que calcule las posiciones (x, y)
        //    de cada nodo para que no se solapen.
        // 2. Una vez con posiciones, crear divs (nodos) y svg (líneas)
        //    y añadirlos a 'this.treeContainer'.

        // --- Simulación de Dibujo (Placeholder) ---
        // Esto solo dibuja la raíz como ejemplo
        this.drawNode(this.root.value, '50%', '50px');
        
        this.log("¡Dibujo no implementado! Se requiere algoritmo de posicionamiento.");
    }
    
    // --- Helper de Dibujo (Ejemplo) ---
    drawNode(value, x, y) {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'tree-node';
        nodeDiv.style.left = x;
        nodeDiv.style.top = y;
        nodeDiv.textContent = value;
        this.treeContainer.appendChild(nodeDiv);
    }

    // (Aquí pueden añadir más helpers para dibujar líneas, etc.)
}

// Exportamos la clase para que main.js pueda importarla
export default BinarySearchTree;