document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const editProductModal = document.getElementById('editProductModal');
    const editProductForm = document.getElementById('edit-product-form');
    let productIdToEdit;

    // Inicializar el modal de Materialize
    M.Modal.init(editProductModal);

    // Cargar productos al cargar la página
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                addProductToList(product);
            });
        });

    // Agregar nuevo producto con AJAX
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const code = document.getElementById('code').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        fetch('/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, code, quantity, price })
        })
        .then(response => response.json())
        .then(product => {
            addProductToList(product);
        });
    });

    // Enviar datos de edición
    editProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('edit-name').value;
        const code = document.getElementById('edit-code').value;
        const quantity = document.getElementById('edit-quantity').value;
        const price = document.getElementById('edit-price').value;

        fetch(`/products/edit/${productIdToEdit}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, code, quantity, price })
        })
        .then(response => response.json())
        .then(() => {
            M.Modal.getInstance(editProductModal).close();
            location.reload(); // Recargar la página para actualizar la lista
        });
    });

    function addProductToList(product) {
        const li = document.createElement('li');
        li.classList.add('collection-item'); // Agregar la clase collection-item
        li.textContent = `${product.name} - ${product.code} - Cantidad: ${product.quantity} - Precio: ${product.price}`;
        
        const buttonContainer = document.createElement('div'); // Contenedor de botones

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'red');
        deleteButton.addEventListener('click', () => {
            fetch(`/products/delete/${product.id}`, { method: 'DELETE' })
                .then(() => li.remove());
        });

        // Botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'blue');
        editButton.addEventListener('click', () => {
            productIdToEdit = product.id;
            document.getElementById('edit-name').value = product.name;
            document.getElementById('edit-code').value = product.code;
            document.getElementById('edit-quantity').value = product.quantity;
            document.getElementById('edit-price').value = product.price;
            M.Modal.getInstance(editProductModal).open();
        });

        // Agregar botones al contenedor
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        li.appendChild(buttonContainer);
        productList.appendChild(li);
    }
});
