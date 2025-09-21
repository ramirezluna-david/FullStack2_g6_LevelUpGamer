// Referencias a elementos del DOM
const searchInput = document.querySelector('input[type="text"][placeholder="Buscar productos..."]');
const categoryFilter = document.getElementById('categoryFilter');
const applyFiltersBtn = document.querySelector('.btn-custom-verde');
const productCards = document.querySelectorAll('.col-md-4');

// Mapeo de productos por categoría
const productCategories = {
    'catan': 'juegos',
    'carcassonne': 'juegos',
    'controlador xbox series x': 'accesorios',
    'auriculares gamer hyperx cloud ii': 'accesorios',
    'playstation 5': 'consolas',
    'pc gamer asus rog strix': 'computadores',
    'silla gamer secretlab titan': 'sillas',
    'mouse gamer logitech g502 hero': 'mouse',
    'mousepad gaming profesional': 'mousepad',
    'polera gamer personalizada \'level-up\'': 'poleras',
    'poleron gamer personalizado \'level-up\'': 'poleras'
};

// Función para normalizar texto (quitar acentos y convertir a minúsculas)
function normalizeText(text) {
    return text.toLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")
               .trim();
}

// Función para filtrar productos
function filterProducts() {
    const searchTerm = normalizeText(searchInput.value);
    const selectedCategory = categoryFilter.value;
    
    productCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title');
        const cardHeader = card.querySelector('.card-header');
        
        if (!cardTitle || !cardHeader) return;
        
        const productName = normalizeText(cardTitle.textContent);
        const productCategory = normalizeText(cardHeader.textContent);
        
        // Determinar la categoría del producto
        let categoryMatch = true;
        if (selectedCategory !== 'todos') {
            // Mapear nombres de categorías del select con los del HTML
            const categoryMapping = {
                'juegos': 'juegos de mesa',
                'accesorios': 'accesorios',
                'consolas': 'consolas',
                'computadores': 'computadores gamers',
                'sillas': 'sillas gamers',
                'mouse': 'mouse',
                'mousepad': 'mousepad',
                'poleras': 'poleras y polerones'
            };
            
            const expectedCategory = categoryMapping[selectedCategory] || selectedCategory;
            categoryMatch = productCategory.includes(expectedCategory);
        }
        
        // Verificar coincidencia de búsqueda por nombre
        let nameMatch = true;
        if (searchTerm) {
            nameMatch = productName.includes(searchTerm);
        }
        
        // Mostrar u ocultar el producto según los filtros
        if (categoryMatch && nameMatch) {
            card.style.display = 'block';
            // Agregar animación de aparición
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transition = 'opacity 0.3s ease-in-out';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    showNoResultsMessage();
}

// Función para mostrar mensaje de "sin resultados"
function showNoResultsMessage() {
    const catalogColumn = document.querySelector('.col-md-9');
    const productGrid = catalogColumn.querySelector('.row.g-4');
    
    // Remover mensaje anterior si existe
    const existingMessage = catalogColumn.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Verificar si hay productos visibles
    const visibleProducts = Array.from(productCards).filter(card => 
        card.style.display !== 'none'
    );
    
    if (visibleProducts.length === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results-message col-12 text-center py-5';
        noResultsDiv.innerHTML = `
            <div class="card bg-dark text-white border-secondary">
                <div class="card-body py-5">
                    <i class="bi bi-search fs-1 text-muted mb-3"></i>
                    <h4 class="text-muted">No se encontraron productos</h4>
                    <p class="text-muted">
                        Intenta con otros términos de búsqueda o selecciona una categoría diferente.
                    </p>
                    <button class="btn btn-custom-verde" onclick="clearFilters()">
                        <i class="bi bi-arrow-clockwise"></i> Limpiar Filtros
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(noResultsDiv);
    }
}

// Función para limpiar filtros
function clearFilters() {
    searchInput.value = '';
    categoryFilter.value = 'todos';
    filterProducts();
}

// Event listeners
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
applyFiltersBtn.addEventListener('click', function(e) {
    e.preventDefault();
    filterProducts();
});

// Filtro en tiempo real mientras se escribe
searchInput.addEventListener('keyup', function(e) {
    // Filtrar automáticamente después de 300ms de inactividad
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(filterProducts, 300);
});

// Función para resaltar texto encontrado (opcional)
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-warning text-dark">$1</mark>');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Configurar placeholder dinámico
    const placeholders = [
        'Buscar productos...',
        'Ej: Catán, PlayStation, Mouse...',
        'Escribe el nombre del producto'
    ];
    
    let currentPlaceholder = 0;
    setInterval(() => {
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
        searchInput.placeholder = placeholders[currentPlaceholder];
    }, 3000);
});