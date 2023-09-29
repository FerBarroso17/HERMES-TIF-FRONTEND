class CrearCanal {
    constructor() {
        this.formulario = document.querySelector(".addchannel");
        this.boton_canal = document.getElementById("openAddChannel");
        this.boton_cerrar = document.getElementById("closeAddChannel");
        this.form = document.getElementById("channelForm");

        this.usuarioSpan = document.getElementById("nombreUsuario");
        this.nombreUsuario = sessionStorage.getItem('nombreUsuario');

        this.mostrarNombreUsuario();
        this.boton_canal.addEventListener("click", this.mostrarFormulario.bind(this));
        this.boton_cerrar.addEventListener("click", this.cerrarFormulario.bind(this));
        this.form.addEventListener("submit", this.crearCanal.bind(this));
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

    crearCanal(event) {
        event.preventDefault();
        const channelNameInput = document.getElementById("channelName").value;
    
        if (!channelNameInput) {
            console.error("Por favor, complete el nombre del canal.");
            return;
        }
    
        
        console.log("Contenido de sessionStorage:", sessionStorage);
        const propietarioId = sessionStorage.getItem('usuario_id');
        console.log("ID del usuario:", propietarioId);
    
        if (!propietarioId) {
            console.error("El usuario no está autenticado.");
            return;
        }
    
        const datosCanal = {
            'channelName': channelNameInput,
            'channelID': propietarioId,
        };
    
        fetch('/procesar_formulario_de_canal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosCanal)
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
    cargarCanales() {
        fetch('/obtener_canales')
            .then(response => response.json())
            .then(data => {
                console.log("Datos de canales recibidos del servidor:", data);
                const canales = data.canales;
                const listaCanales = document.getElementById('listaCanales');
    
                canales.forEach(canal => {
                    const canalItem = document.createElement('li');
                    const canalSpan = document.createElement('span');
                    canalSpan.textContent = canal.nombre_canal;
                    canalItem.appendChild(canalSpan);
                    listaCanales.appendChild(canalItem);
                });
            })
            .catch(error => {
                console.error("Error al cargar los canales:", error);
            });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const canal = new CrearCanal();
    canal.cargarCanales();
    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
    
        window.location.href = "/mensajesht";
    });
});
