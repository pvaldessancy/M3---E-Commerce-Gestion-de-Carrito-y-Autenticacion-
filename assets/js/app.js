/* Variables de estado */
const catalogo = [
    { id: 1, nombre: "Umbral de Luz", precio: 120000, descuentoAplicado: false },
    { id: 2, nombre: "Horizonte en calma", precio: 145000, descuentoAplicado: false },
    { id: 3, nombre: "Refugio en el sur", precio: 160000, descuentoAplicado: false },
    { id: 4, nombre: "Alma", precio: 155000, descuentoAplicado: false },
    { id: 5, nombre: "Jardín secreto", precio: 50000, descuentoAplicado: false },
    { id: 6, nombre: "El granero", precio: 50000, descuentoAplicado: false },
    { id: 7, nombre: "Latido del Villarrica", precio: 170000, descuentoAplicado: false },
    { id: 8, nombre: "Tierra Viva", precio: 800000, descuentoAplicado: false },
    { id: 9, nombre: "Duo de flores", precio: 42000, descuentoAplicado: false },
    { id: 10, nombre: "Nubeluz", precio: 150000, descuentoAplicado: false },
    { id: 11, nombre: "Caleidoscopio", precio: 50000, descuentoAplicado: false },
    { id: 12, nombre: "Colores de Pucón", precio: 80000, descuentoAplicado: false }
];

let carrito = [];
let descuentoGlobal = 0;

/* Autenticación */
const PASSWORD_MAESTRA = "1234";
let usuarioLogueado = false;

/* Funciones del Carrito */

function agregarProducto(idProducto) {
    const producto = catalogo.find(p => p.id === idProducto);
    if (producto) {
        carrito.push({ ...producto });
        renderizarCarrito();
        alert(`Producto "${producto.nombre}" agregado al carrito.`);
    } else {
        console.error("Producto no encontrado");
    }
}

function quitarProducto(idProducto) {
    const index = carrito.findIndex(p => p.id === idProducto);
    if (index !== -1) {
        carrito.splice(index, 1);
        renderizarCarrito();
    }
}

function aplicarDescuento() {
    const input = document.getElementById("codigoDescuento");
    const codigo = input.value;
    if (codigo === "DESC15") {
        descuentoGlobal = 0.15;
        carrito.forEach(p => p.descuentoAplicado = true);
        alert("Descuento del 15% aplicado correctamente.");
        renderizarCarrito();
    } else {
        alert("Código inválido. Intente con DESC15");
    }
}

function calcularTotal() {
    let suma = carrito.reduce((acc, p) => acc + p.precio, 0);
    if (descuentoGlobal > 0) {
        suma = suma * (1 - descuentoGlobal);
    }
    return suma;
}

function renderizarCarrito() {
    const tbody = document.getElementById("carrito-body");
    const totalEl = document.getElementById("carrito-total");

    if (!tbody || !totalEl) return;

    tbody.innerHTML = "";

    carrito.forEach((prod) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prod.nombre}</td>
            <td>$${prod.precio.toLocaleString()}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="quitarProducto(${prod.id})">Quitar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const total = calcularTotal();
    totalEl.textContent = `$${total.toLocaleString()}`;
}

/* Funciones de Autenticación */

function mostrarModal(tipo) {
    let modalId;
    if (tipo === 'login') modalId = 'loginModal';
    if (tipo === 'registro') modalId = 'registroModal';

    if (modalId) {
        const modalEl = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalEl); // O bootstrap.Modal.getOrCreateInstance(modalEl)
        modal.show();
    }
}

function iniciarSesion(usuario, password) {
    // Compatibilidad: Si se llama desde HTML sin argumentos, obtenerlos del DOM
    if (usuario === undefined || password === undefined) {
        if (document.getElementById("loginEmail")) {
            usuario = document.getElementById("loginEmail").value;
        }
        if (document.getElementById("loginPassword")) {
            password = document.getElementById("loginPassword").value;
        }
    }

    if (password === PASSWORD_MAESTRA) {
        usuarioLogueado = true;
        alert("Inicio de sesión exitoso");
        console.log("Usuario logueado: ", usuarioLogueado);

        // Actualizar Navbar
        const loginBtn = document.getElementById("nav-login");
        const registroBtn = document.getElementById("nav-registro");
        const logoutBtn = document.getElementById("nav-logout");

        if (loginBtn) loginBtn.classList.add('d-none');
        if (registroBtn) registroBtn.classList.add('d-none');
        if (logoutBtn) logoutBtn.classList.remove('d-none');

        // Cerrar modal si está abierto y se usó el DOM
        const modalEl = document.getElementById('loginModal');
        if (modalEl) {
            // Intentar obtener instancia existente o crear una para ocultarlo
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        }
    } else {
        alert("Contraseña incorrecta");
    }
}

function cerrarSesion() {
    usuarioLogueado = false;
    document.getElementById("nav-login").classList.remove('d-none');
    document.getElementById("nav-registro").classList.remove('d-none');
    document.getElementById("nav-logout").classList.add('d-none');
    alert("Sesión cerrada");
}

/* Scroll Top */
function irArriba() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function () {
    const btn = document.getElementById("btn-ir-arriba");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};
