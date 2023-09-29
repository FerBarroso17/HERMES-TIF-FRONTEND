class InicioSesionUsuario {
    constructor() {
        this.boton = document.getElementById("EnviarLogin");
        this.mensaje = document.getElementById("mensaje");
        this.boton.addEventListener("click", this.iniciarSesion.bind(this));
    }

    iniciarSesion(event) {
        event.preventDefault();
        const usuario = document.getElementById("Usuario").value;
        const contraseña = document.getElementById("Contraseña").value;

        
        if (!usuario || !contraseña) {
            this.mostrarMensaje("Por favor, completa todos los campos.", "error");
            return;
        }

        const datosInicioSesion = {
            'nombre_usuario': usuario,
            'contrasena': contraseña
        };

        fetch('/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosInicioSesion)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error en la solicitud:", response.status);
                throw new Error("Error en la solicitud.");
            }
            return response.json(); 
        })
        .then(data => {
            
            const usuarioID = data.usuario_id; 
            sessionStorage.setItem('nombreUsuario', usuario);
            sessionStorage.setItem('usuario_id', usuarioID); 
            
            this.mostrarMensaje("Bienvenido " + usuario, "success");
            
            
            window.location.href = '/chatbox';
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            this.mostrarMensaje("HUBO UN ERROR AL INICIAR SESION", "error");
        });
    }

    mostrarMensaje(texto, tipo) {
        this.mensaje.textContent = texto;
        this.mensaje.classList.remove("success", "error");
        this.mensaje.classList.add(tipo);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const inicioSesion = new InicioSesionUsuario();
});
