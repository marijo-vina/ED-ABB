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
        this.log(`Buscando nivel del nodo ${value}...`);
        let currentNode = this.root;
        let level = 0;

        while (currentNode !== null) {
            if (value === currentNode.value) {
                this.log(`El nodo ${value} se encuentra en el nivel ${level}.`);
                return;
            }
            
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
            level++;
        }

        this.log(`Error: El nodo ${value} no se encuentra en el árbol.`);
    }

    // --- TAREA 10: Operación 1 Libre (Ej: Contar Hojas) ---
    op1_CountLeaves() {
        const count = this._countLeavesRecursive(this.root);
        this.log(`El árbol tiene ${count} hoja(s).`);
    }

    _countLeavesRecursive(node) {
        if (node === null) {
            return 0;
        }
        if (node.left === null && node.right === null) {
            return 1; // Es una hoja
        }
        return this._countLeavesRecursive(node.left) + this._countLeavesRecursive(node.right);
    }

    // --- TAREA 11: Operación 2 Libre (Ej: Valor Máximo) ---
    op2_GetMaxValue() {
        if (this.root === null) {
            this.log("El árbol está vacío, no hay valor máximo.");
            return;
        }
        let currentNode = this.root;
        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        this.log(`El valor máximo en el árbol es: ${currentNode.value}`);
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

        // 1. Calcular las posiciones de todos los nodos antes de dibujar
        this._calculatePositions(this.root, 0, 0, this.treeContainer.clientWidth);

        // 2. Dibujar los nodos y las líneas de forma recursiva
        this._drawTreeRecursive(this.root);
    }

    // Asigna coordenadas (x, y) a cada nodo.
    _calculatePositions(node, level, minX, maxX) {
        if (node === null) return;

        node.x = (minX + maxX) / 2;
        node.y = level * 70 + 40; // 70px de separación vertical por nivel

        this._calculatePositions(node.left, level + 1, minX, node.x);
        this._calculatePositions(node.right, level + 1, node.x, maxX);
    }

    // Dibuja el árbol usando las coordenadas pre-calculadas.
    _drawTreeRecursive(node) {
        if (node === null) return;

        // Dibuja los hijos primero para que las líneas queden por debajo
        if (node.left) {
            this.drawLine(node.x, node.y, node.left.x, node.left.y);
            this._drawTreeRecursive(node.left);
        }
        if (node.right) {
            this.drawLine(node.x, node.y, node.right.x, node.right.y);
            this._drawTreeRecursive(node.right);
        }

        // Dibuja el nodo actual
        this.drawNode(node.value, node.x, node.y);
    }
    
    // --- Helper de Dibujo (Ejemplo) ---
    drawNode(value, x, y) {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'tree-node';
        nodeDiv.textContent = value;
        nodeDiv.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        this.treeContainer.appendChild(nodeDiv);
    }

    drawLine(x1, y1, x2, y2) {
        const svgNS = "http://www.w3.org/2000/svg";
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'tree-line');
        
        // Si no hay un SVG, lo crea.
        const svg = this.treeContainer.querySelector('svg') || document.createElementNS(svgNS, 'svg');
        if (!this.treeContainer.querySelector('svg')) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.style.position = 'absolute';
            svg.style.left = '0';
            svg.style.top = '0';
            this.treeContainer.prepend(svg);
        }
        svg.appendChild(line);
    }
}

export default BinarySearchTree;