// --- CONEXIÓN DE BOTONES (Event Listeners) ---
// Este archivo es el "Controlador". Escucha eventos de la "Vista" (HTML)
// y da órdenes al "Modelo" (BinarySearchTree).

document.addEventListener('DOMContentLoaded', () => {
    
    // Creamos una instancia de nuestro árbol.
    // Le pasamos los IDs del contenedor del árbol y la consola
    // para que la clase sepa dónde dibujar y escribir.
    const bst = new BinarySearchTree('tree-container', 'output-console');

    const nodeValueInput = document.getElementById('node-value');

    // --- Funciones con Input ---
    document.getElementById('btn-insert').addEventListener('click', () => {
        const value = parseInt(nodeValueInput.value, 10);
        if (!isNaN(value)) {
            bst.insert(value);
            nodeValueInput.value = '';
        } else {
            bst.log("Error: Ingrese un valor numérico válido.");
        }
        nodeValueInput.focus();
    });

    document.getElementById('btn-delete').addEventListener('click', () => {
        const value = parseInt(nodeValueInput.value, 10);
        if (!isNaN(value)) {
            bst.delete(value);
            nodeValueInput.value = '';
        } else {
            bst.log("Error: Ingrese un valor numérico para borrar.");
        }
        nodeValueInput.focus();
    });

    document.getElementById('btn-search').addEventListener('click', () => {
        const value = parseInt(nodeValueInput.value, 10);
        if (!isNaN(value)) {
            bst.search(value);
        } else {
            bst.log("Error: Ingrese un valor numérico para buscar.");
        }
        nodeValueInput.focus();
    });

    document.getElementById('btn-node-level').addEventListener('click', () => {
        const value = parseInt(nodeValueInput.value, 10);
        if (!isNaN(value)) {
            bst.getNodeLevel(value);
        } else {
            bst.log("Error: Ingrese un valor numérico para buscar su nivel.");
        }
        nodeValueInput.focus();
    });

    // --- Recorridos ---
    document.getElementById('btn-inorder').addEventListener('click', () => bst.inOrder());
    document.getElementById('btn-preorder').addEventListener('click', () => bst.preOrder());
    document.getElementById('btn-postorder').addEventListener('click', () => bst.postOrder());
    document.getElementById('btn-levelorder').addEventListener('click', () => bst.levelOrder());

    // --- Otras Operaciones ---
    document.getElementById('btn-height').addEventListener('click', () => bst.getHeight());
    document.getElementById('btn-op1').addEventListener('click', () => bst.op1_CountLeaves());
    document.getElementById('btn-op2').addEventListener('click', () => bst.op2_GetMaxValue());

    // --- Consola ---
    document.getElementById('btn-clear-console').addEventListener('click', () => bst.clearConsole());
});