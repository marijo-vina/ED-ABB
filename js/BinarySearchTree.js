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
        const newNode = new Node(value);

        // 1. Si el árbol está vacío, el nuevo nodo es la raíz.
        if (this.root === null) {
            this.root = newNode;
            this.log(`Nodo ${value} insertado como raíz.`);
            this.draw();
            return;
        }

        // 2. Si no, buscar la posición correcta de forma iterativa.
        let currentNode = this.root;
        while (true) {
            if (value < currentNode.value) {
                // Ir a la izquierda
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    break; // Salir del bucle una vez insertado
                }
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                // Ir a la derecha
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    break; // Salir del bucle una vez insertado
                }
                currentNode = currentNode.right;
            } else {
                // El valor ya existe, no se permiten duplicados.
                this.log(`Error: El nodo ${value} ya existe en el árbol.`);
                return; // Terminar la función
            }
        }

        this.log(`Nodo ${value} insertado correctamente.`);
        this.draw();
    }

    // --- TAREA 2: Borrar un Elemento ---
    delete(value) {
        // Llama a la función auxiliar recursiva para manejar la lógica.
        // La variable 'deleted' nos ayuda a saber si el nodo fue encontrado y borrado.
        const { root, deleted } = this._deleteNode(this.root, value);
        this.root = root;

        if (deleted) {
            this.log(`Nodo ${value} borrado correctamente.`);
        } else {
            this.log(`Error: El nodo ${value} no se encuentra en el árbol.`);
        }
        this.draw();
    }

    // Función auxiliar recursiva para borrar un nodo.
    _deleteNode(node, value) {
        let deleted = true;
        // Caso base: Si el nodo es nulo, el valor no está en el árbol.
        if (node === null) {
            return { root: null, deleted: false };
        }

        // Buscar el nodo a borrar.
        if (value < node.value) {
            const result = this._deleteNode(node.left, value);
            node.left = result.root;
            deleted = result.deleted;
        } else if (value > node.value) {
            const result = this._deleteNode(node.right, value);
            node.right = result.root;
            deleted = result.deleted;
        } else {
            // --- Nodo encontrado. Ahora manejamos los 3 casos de borrado ---

            // Caso 1: El nodo es una hoja (no tiene hijos).
            if (node.left === null && node.right === null) {
                return { root: null, deleted: true }; // Simplemente lo eliminamos.
            }

            // Caso 2: El nodo tiene un solo hijo.
            if (node.left === null) {
                return { root: node.right, deleted: true }; // Lo reemplazamos con su hijo derecho.
            }
            if (node.right === null) {
                return { root: node.left, deleted: true }; // Lo reemplazamos con su hijo izquierdo.
            }

            // Caso 3: El nodo tiene dos hijos.
            // 1. Encontrar el sucesor inorden (el nodo más pequeño en el subárbol derecho).
            const successor = this._findMinNode(node.right);
            // 2. Copiar el valor del sucesor al nodo actual.
            node.value = successor.value;
            // 3. Borrar el sucesor de su ubicación original en el subárbol derecho.
            const result = this._deleteNode(node.right, successor.value);
            node.right = result.root;
        }

        return { root: node, deleted: deleted };
    }

    // Función auxiliar para encontrar el nodo con el valor mínimo en un subárbol.
    _findMinNode(node) {
        let current = node;
        while (current && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // --- TAREA 3: Buscar un Elemento ---
    search(value) {
        this.log(`Buscando nodo ${value}...`);

        let currentNode = this.root;
        const path = [];

        // 1. Empezar desde la raíz
        while (currentNode !== null) {
            path.push(currentNode.value);

            // 4. Si es igual, se encontró.
            if (value === currentNode.value) {
                this.log(`Ruta de búsqueda: ${path.join(' -> ')}`);
                this.log(`¡Nodo ${value} encontrado!`);
                // En una implementación más avanzada, aquí se podría resaltar el nodo en la UI.
                return;
            } else if (value < currentNode.value) {
                // 2. Si el valor es menor, ir a la izquierda
                currentNode = currentNode.left;
            } else {
                // 3. Si el valor es mayor, ir a la derecha
                currentNode = currentNode.right;
            }
        }

        // 4. Si se llega a null, no existe.
        this.log(`Ruta de búsqueda: ${path.join(' -> ')} -> (null)`);
        this.log(`Nodo ${value} no se encuentra en el árbol.`);
    }
    
    // --- TAREA 4: Recorrido en Inorden ---
    inOrder() {
        const result = [];
        // 1. Llamar a la función recursiva auxiliar comenzando desde la raíz.
        this._inOrderRecursive(this.root, result);
        // 2. El array 'result' se llena con los valores acumulados.
        this.log(`Recorrido Inorden: ${result.join(', ')}`);
    }

    // Función auxiliar para el recorrido Inorden (Izquierda, Raíz, Derecha).
    _inOrderRecursive(node, result) {
        if (node !== null) {
            this._inOrderRecursive(node.left, result); // Visita subárbol izquierdo
            result.push(node.value);                   // Visita la raíz (agrega el valor)
            this._inOrderRecursive(node.right, result); // Visita subárbol derecho
        }
    }

    // --- TAREA 5: Recorrido en Preorden ---
    preOrder() {
        const result = [];
        this._preOrderRecursive(this.root, result);
        this.log(`Recorrido Preorden: ${result.join(', ')}`);
    }

    // Función auxiliar para Preorden (Raíz, Izquierda, Derecha)
    _preOrderRecursive(node, result) {
        if (node !== null) {
            result.push(node.value); // 1. Visita la Raíz
            this._preOrderRecursive(node.left, result); // 2. Visita subárbol izquierdo
            this._preOrderRecursive(node.right, result); // 3. Visita subárbol derecho
        }
    }

    // --- TAREA 6: Recorrido en Postorden ---
    postOrder() {
        const result = [];
        this._postOrderRecursive(this.root, result);
        this.log(`Recorrido Postorden: ${result.join(', ')}`);
    }

    // Función auxiliar para Postorden (Izquierda, Derecha, Raíz)
    _postOrderRecursive(node, result) {
        if (node !== null) {
            this._postOrderRecursive(node.left, result); // 1. Visita subárbol izquierdo
            this._postOrderRecursive(node.right, result); // 2. Visita subárbol derecho
            result.push(node.value); // 3. Visita la Raíz
        }
    }

    // --- TAREA 7: Recorrido en Amplitud (Por Niveles) ---
    levelOrder() {
        // 1. Usar una Cola (Queue)
        const queue = [];
        const result = [];

        // Si el árbol está vacío, no hay nada que hacer
        if (this.root === null) {
            this.log("Recorrido en Amplitud: (Árbol vacío)");
            return;
        }

        // 1. Añadir la raíz a la cola
        queue.push(this.root);

        // 2. Mientras la cola no esté vacía
        while (queue.length > 0) {
            // a. Sacar un nodo
            const currentNode = queue.shift(); // .shift() saca el primer elemento (FIFO)

            // b. Añadir su valor al resultado
            result.push(currentNode.value);

            // c. Añadir hijos (izquierdo, derecho) a la cola
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }

        this.log(`Recorrido en Amplitud: ${result.join(', ')}`);
    }

    // --- TAREA 8: Número de Niveles del Árbol (Altura) ---
    getHeight() {
        // Llama a la función recursiva auxiliar
        const height = this._calculateHeight(this.root);
        this.log(`Niveles totales (Altura): ${height}`);
        return height;
    }

    // Función auxiliar para calcular la altura
    _calculateHeight(node) {
        // 2. Altura(null) = -1. 
        // (Esto hace que un árbol con solo la raíz tenga altura 0)
        if (node === null) {
            return -1;
        }

        // 1. Altura(nodo) = 1 + max(Altura(izq), Altura(der))
        const leftHeight = this._calculateHeight(node.left);
        const rightHeight = this._calculateHeight(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
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

    // (Aquí pueden añadir más helpers para dibujar líneas y los demás nodos, etc.)
}

export default BinarySearchTree;