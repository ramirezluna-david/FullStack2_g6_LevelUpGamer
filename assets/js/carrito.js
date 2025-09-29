document.addEventListener('DOMContentLoaded', () => {
    const carritoBody = document.querySelector('#carrito-body');
    const carritoResumen = document.querySelector('#carrito-resumen');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function renderizarCarrito() {
        carritoBody.innerHTML = '';
        if (carrito.length === 0) {
            carritoBody.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío</td></tr>';
            actualizarResumen();
            return;
        }

        carrito.forEach((producto, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                </td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toLocaleString('es-CL')}</td>
                <td>
                    <input type="number" class="form-control cantidad" value="${producto.cantidad}" min="1" data-index="${index}">
                </td>
                <td>$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn btn-danger btn-sm eliminar-producto" data-index="${index}">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            `;
            carritoBody.appendChild(tr);
        });

        actualizarResumen();
        agregarEventListeners();
    }

    function actualizarResumen() {
        const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        carritoResumen.innerHTML = `
            <div class="card border border-primary border-3">
              <div class="card-header">
                Resumen
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h5>Total</h5>
                  </div>
                  <div class="col text-end">
                    <h5>$${total.toLocaleString('es-CL')} CLP</h5>
                  </div>
                </div>
                <div class="my-3 d-grid gap-2">
                  <button class="btn btn-primary">Ir a Pagar</button>
                  <a href="catalogo-productos.html" class="btn btn-secondary">Seguir Comprando</a>
                </div>
              </div>
            </div>
        `;
    }

    function agregarEventListeners() {
        const inputsCantidad = document.querySelectorAll('.cantidad');
        inputsCantidad.forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                const nuevaCantidad = parseInt(e.target.value);
                if (nuevaCantidad > 0) {
                    carrito[index].cantidad = nuevaCantidad;
                    guardarCarrito();
                    renderizarCarrito();
                }
            });
        });

        const botonesEliminar = document.querySelectorAll('.eliminar-producto');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                // Use currentTarget to get the button, then find the icon if needed
                const button = e.currentTarget;
                const index = button.dataset.index;
                
                // If the icon is clicked, e.target might be the <i> element.
                // We need to get the index from the button.
                const itemIndex = index || button.closest('.eliminar-producto').dataset.index;

                carrito.splice(itemIndex, 1);
                guardarCarrito();
                renderizarCarrito();
            });
        });
    }
    
    // Función para añadir productos (será llamada desde otras páginas)
    window.agregarAlCarrito = function(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        actualizarIndicadorCarrito();
        alert('¡Producto añadido al carrito!');
    }

    // Actualizar el numerito en el ícono del carrito en el navbar
    window.actualizarIndicadorCarrito = function() {
        const indicador = document.querySelector('#carrito-indicador');
        if (indicador) {
            const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            indicador.textContent = totalItems;
            indicador.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }


    if (carritoBody) {
        renderizarCarrito();
    }
    
    actualizarIndicadorCarrito();
});
