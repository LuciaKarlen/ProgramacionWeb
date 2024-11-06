document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const editUserModal = document.getElementById('editUserModal');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const deleteSuccessModal = document.getElementById('deleteSuccessModal');
    let userIdToEdit;
    let userIdToDelete; // ID del usuario a eliminar
    let userNameToDelete; // Nombre del usuario a eliminar

    M.Modal.init(editUserModal);
    M.Modal.init(confirmDeleteModal);
    M.Modal.init(deleteSuccessModal);

    // Cargar usuarios al cargar la página
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => addUserToList(user));
        });

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(user => addUserToList(user));
    });

    document.getElementById('edit-user-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;

        fetch(`/users/edit/${userIdToEdit}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(() => {
            M.Modal.getInstance(editUserModal).close();
            location.reload();
        });
    });

    function addUserToList(user) {
        const li = document.createElement('li');
        li.classList.add('collection-item');
        li.setAttribute('data-id', user.id); // Agregar atributo data-id
        li.textContent = `${user.name} - ${user.email}`;
    
        const buttonContainer = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'red');
        deleteButton.addEventListener('click', () => {
            userIdToDelete = user.id; // Guardar el ID del usuario a eliminar
            userNameToDelete = user.name; // Guardar el nombre del usuario a eliminar
            document.getElementById('user-name-to-delete').innerText = userNameToDelete; // Mostrar el nombre en el modal
            M.Modal.getInstance(confirmDeleteModal).open(); // Abrir modal de confirmación
        });
    
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'blue');
        editButton.addEventListener('click', () => {
            userIdToEdit = user.id;
            document.getElementById('edit-name').value = user.name;
            document.getElementById('edit-email').value = user.email;
            M.Modal.getInstance(editUserModal).open();
        });
    
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        li.appendChild(buttonContainer);
        userList.appendChild(li);
    }

    // Confirmar eliminación de usuario
    document.getElementById('confirm-delete').addEventListener('click', () => {
        fetch(`/users/delete/${userIdToDelete}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    M.Modal.getInstance(confirmDeleteModal).close();
                    document.getElementById('user-name-deleted').innerText = userNameToDelete; // Mostrar el nombre en el modal de éxito
                    M.Modal.getInstance(deleteSuccessModal).open();
                    // Eliminar el usuario de la lista sin recargar la página
                    const userItem = document.querySelector(`li[data-id="${userIdToDelete}"]`);
                    if (userItem) {
                        userItem.remove();
                    }
                } else {
                    console.error('Error al eliminar el usuario');
                }
            });
    });
});