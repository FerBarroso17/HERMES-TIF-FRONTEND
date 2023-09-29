class RegistroUsuario {
    constructor() {
        this.boton = document.getElementById("EnviarReg");
        this.mensaje = document.getElementById("mensaje");
        this.boton.addEventListener("click", this.registrarUsuario.bind(this));
    }

    registrarUsuario(event) {
        event.preventDefault();
        const nombre = document.getElementById("Nombre").value;
        const apellido = document.getElementById("Apellido").value;
        const usuario = document.getElementById("Usuario").value;
        const fechaNac = document.getElementById("Fecha_Nac").value;
        const correo = document.getElementById("Correo").value;
        const contraseña = document.getElementById("Contraseña").value;

        
        if (!nombre || !apellido || !usuario || !fechaNac || !correo || !contraseña) {
            this.mostrarMensaje("Por favor, complete todos los campos.", "error");
            return;
        }

        const datosUsuario = {
            'nombre_usuario': usuario,
            'correo_electronico': correo,
            'contrasena': contraseña,
            'fecha_nacimiento': fechaNac,
            'nombre': nombre,
            'apellido': apellido
        };

        fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error en la solicitud:", response.status);
                throw new Error("Error en la solicitud.");
            }
            this.mostrarMensaje("Bienvenido " + usuario, "success");
            window.location.href = '/login';
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            this.mostrarMensaje("Hubo un error al registrar al usuario.", "error");
        });
    }

    mostrarMensaje(texto, tipo) {
        this.mensaje.textContent = texto;
        this.mensaje.classList.remove("success", "error");
        this.mensaje.classList.add(tipo);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const registro = new RegistroUsuario();
});