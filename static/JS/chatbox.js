class CrearServidor {
    constructor() {
        this.formulario = document.querySelector(".addserver");
        this.boton_servidor = document.getElementById("openAddServer");
        this.boton_cerrar = document.getElementById("closeAddServer");
        this.form = document.getElementById("serverForm");

        this.usuarioSpan = document.getElementById("nombreUsuario");
        this.nombreUsuario = sessionStorage.getItem('nombreUsuario'); 

        this.mostrarNombreUsuario();
        this.boton_servidor.addEventListener("click", this.mostrarFormulario.bind(this));
        this.boton_cerrar.addEventListener("click", this.cerrarFormulario.bind(this));
        this.form.addEventListener("submit", this.subirServidor.bind(this));
    }

    mostrarNombreUsuario() {
        if (this.nombreUsuario) {
            console.log(`Usuario recuperado de sessionStorage: ${this.nombreUsuario}`);
            this.usuarioSpan.textContent = `Usuario: ${this.nombreUsuario}`;
        } else {
            console.log('Usuario no encontrado en sessionStorage');
            this.usuarioSpan.textContent = 'Usuario logueado';
        }
    }

    mostrarFormulario() {
        this.formulario.style.display = 'block'; 
    }

    cerrarFormulario(event) {
        event.preventDefault();
        this.formulario.style.display = 'none'; 
        this.form.reset();
    }

    subirServidor(event) {
        event.preventDefault();
        const serverNameInput = document.getElementById("serverName").value;
        const serverDescriptionInput = document.getElementById("serverDescription").value;
    
        if (!serverNameInput || !serverDescriptionInput) {
            console.error("Por favor, complete todos los campos.");
            return;
        }
    
        
        console.log("Contenido de sessionStorage:", sessionStorage);
        const propietarioId = sessionStorage.getItem('usuario_id');
        console.log("ID del usuario:", propietarioId);
    
        if (!propietarioId) {
            console.error("El usuario no está autenticado.");
            return;
        }
    
        const datosServidor = {
            'serverName': serverNameInput,
            'serverDescription': serverDescriptionInput,
            'serverID': propietarioId,
        };
    
        fetch('/procesar_formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosServidor)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error en la solicitud:", response.status);
                throw new Error("Error en la solicitud.");
            }
            return response.json(); 
        })
        .then(data => {
            
            console.log("Respuesta del servidor:", data);
            this.cerrarFormulario(event);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }
    cargarServidores() {
        fetch('/obtener_servidores')
            .then(response => response.json())
            .then(data => {
                console.log("Datos de servidores recibidos del servidor:", data); 
                const servidores = data.servidores;
                const listaServidores = document.getElementById('listaServidores'); 
    
                servidores.forEach(servidor => {
                    const servidorItem = document.createElement('li');
                    const servidorSpan = document.createElement('span');
                    servidorSpan.textContent = servidor.nombre_servidor;
                    servidorItem.appendChild(servidorSpan);
                    listaServidores.appendChild(servidorItem);
                });
            })
            .catch(error => {
                console.error("Error al cargar los servidores:", error);
            });
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    const servidor = new CrearServidor();
    servidor.cargarServidores();

    
    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
        
        window.location.href = "/Canales";
    });
});