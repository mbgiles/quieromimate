let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (var i = currentItem; i < currentItem + 4; i++) {
        boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none'
    }
}

const carrito = document.getElementById('carrito');
const lista = document.querySelector('#lista-carrito tbody');
const elementos1 = document.getElementById('lista-1');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Cargar elementos del carrito desde el almacenamiento al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        const carritoLS = obtenerCarritoLocalStorage();
        const carritoSS = obtenerCarritoSessionStorage();

        carritoLS.forEach(elemento => insertarCarrito(elemento));
        carritoSS.forEach(elemento => insertarCarrito(elemento));
    });
}

function comprarElemento(event) {
    event.preventDefault();
    if (event.target.classList.contains('agregar-carrito')) {
        const elemento = event.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);

    // Agregar elemento tanto a Local Storage como a Session Storage
    agregarElementoLocalStorage(infoElemento);
    agregarElementoSessionStorage(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width="100" height="150">
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
    `;

    lista.appendChild(row);
}

function eliminarElemento(event) {
    event.preventDefault();
    let elemento,
        elementoId;

    if (event.target.classList.contains('borrar')) {
        event.target.parentElement.parentElement.remove();
        elemento = event.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');

        // Eliminar elemento tanto de Local Storage como de Session Storage
        eliminarElementoLocalStorage(elementoId);
        eliminarElementoSessionStorage(elementoId);
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    // Vaciar tanto Local Storage como Session Storage
    vaciarLocalStorage();
    vaciarSessionStorage();

    return false;
}

// Funciones para el Local Storage
function obtenerCarritoLocalStorage() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function agregarElementoLocalStorage(elemento) {
    const carrito = obtenerCarritoLocalStorage();
    carrito.push(elemento);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarElementoLocalStorage(id) {
    const carrito = obtenerCarritoLocalStorage();
    const nuevoCarrito = carrito.filter(elemento => elemento.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
}

function vaciarLocalStorage() {
    localStorage.removeItem('carrito');
}

// Funciones para el Session Storage
function obtenerCarritoSessionStorage() {
    return JSON.parse(sessionStorage.getItem('carrito')) || [];
}

function agregarElementoSessionStorage(elemento) {
    const carrito = obtenerCarritoSessionStorage();
    carrito.push(elemento);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarElementoSessionStorage(id) {
    const carrito = obtenerCarritoSessionStorage();
    const nuevoCarrito = carrito.filter(elemento => elemento.id !== id);
    sessionStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
}

function vaciarSessionStorage() {
    sessionStorage.removeItem('carrito');
}


 //alertas btn carrito
document.addEventListener("DOMContentLoaded", function() {
    const productos = [
        {
            id: 1,
            nombre: "Ades",
            imagen: "./images/pr1.png",
            descripcion: "Sabor Natural"
        },
        {
            id: 2,
            nombre: "Liozz Natura",
            imagen: "./images/pr2.png",
            descripcion: "Frutillas"
        },
        {
            id: 3,
            nombre: "Elisium",
            imagen: "./images/pr3.png",
            descripcion: "calidad premium"
        },
        {
            id: 4,
            nombre: "Elisium",
            imagen: "./images/pr4.png",
            descripcion: "calidad premium"
        },
        {
            id: 5,
            nombre: "Elisium",
            imagen: "./images/pr5.png",
            descripcion: "calidad premium"
        },
        {
            id: 6,
            nombre: "Elisium",
            imagen: "./images/pr6.png",
            descripcion: "calidad premium"
        },
        {
            id: 7,
            nombre: "Elisium",
            imagen: "./images/pr7.png",
            descripcion: "calidad premium"
        },
        {
            id: 8,
            nombre: "Elisium",
            imagen: "./images/pr8.png",
            descripcion: "calidad premium"
        },
        {
            id: 9,
            nombre: "Elisium",
            imagen: "./images/pr9.png",
            descripcion: "calidad premium",
        },
        {
            id: 10,
            nombre: "Elisium",
            imagen: "./images/pr10.png",
            descripcion: "calidad premium"
        },
        {
            id: 11,
            nombre: "Elisium",
            imagen: "./images/pr11.png",
            descripcion: "calidad premium"
        },
        {
            id: 12,
            nombre: "Elisium",
            imagen: "./images/pr12.png",
            descripcion: "calidad premium"
        },
    ];

    productos.forEach(producto => {
        const boton = document.getElementById(`compra${producto.id}`);
        boton.addEventListener("click", () => {
            Swal.fire({
                title: 'Agregaste al carrito!',
                text: `Compraste ${producto.nombre}. ${producto.descripcion}`,
                imageUrl: producto.imagen,
                imageWidth: 200,
                imageHeight: 450,
                imageAlt: 'Custom image',
            });
        });
    });
}); 