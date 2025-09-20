// Accesibilidad y feedback visual para thumbnails del carrusel de producto Catán

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carouselPlayStation5');
    const thumbs = document.querySelectorAll('[data-bs-target="#carouselPlayStation5"]');

    function setActiveThumb(index) {
        thumbs.forEach((thumb, idx) => {
            if (idx === index) {
                thumb.classList.add('active-thumbnail');
                thumb.setAttribute('aria-current', 'true');
            } else {
                thumb.classList.remove('active-thumbnail');
                thumb.removeAttribute('aria-current');
            }
        });
    }

    // Inicial: activa el primero
    setActiveThumb(0);

    // Evento al cambiar de slide
    carousel.addEventListener('slide.bs.carousel', function (e) {
        setActiveThumb(e.to);
    });

    // Evento click en thumbnails (por si el usuario hace click)
    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', function () {
            setActiveThumb(idx);
        });
    });
});