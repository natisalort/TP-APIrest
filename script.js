
async function mostrarEmpleados(datos) {
    let contenedor = document.getElementById("contenedor");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.className = "container";
        contenedor.id = "contenedor";
        let descripcion = document.createElement("h3");
        descripcion.innerHTML = "Apellido / Area de trabajo";
        contenedor.appendChild(descripcion);
    }

     datos.forEach(emp => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.id = "tag";
        let divApellido = document.createElement("div");
        divApellido.className = "apellido"
        let apellido = document.createElement("h4");
        apellido.innerHTML = emp.apellido;
        let areaTrabajo = document.createElement("h4");
        areaTrabajo.innerHTML = "Area : " + emp.area;
        divApellido.appendChild(apellido)

        let botonVer = document.createElement("button");
        botonVer.innerHTML = "ver";
        botonVer.id = "ver";
        botonVer.className = "verMas";

        // Agregar un evento de clic al botón "Ver"
        botonVer.addEventListener("click", function () {
            // Crear un div desplegable con más información
            let divInfo = document.createElement("div");
            divInfo.className = "divInfo";
            let infoAdicional = document.createElement("div");
            infoAdicional.className = ("info");
            //infoAdicional.className = "infoAdicional";
            infoAdicional.innerHTML = "Nombre: " + emp.nombre + "<br>Direc.: " + emp.domicilio + "<br> Identificacion : " + emp.id + "<br>";

            let divFoto = document.createElement("div");
            divFoto.className = "info"
            let foto = document.createElement("img");
            foto.src = emp.foto;
            divFoto.appendChild(foto);
            divInfo.appendChild(infoAdicional);
            divInfo.appendChild(divFoto);
            // Agregar el div desplegable a la tarjeta
            tarjeta.appendChild(divInfo);

            // Deshabilitar el botón "Ver" después de hacer clic
            botonVer.classList.toggle("displayOf");
            let botonCerrar = document.createElement("button");
            tarjeta.appendChild(botonCerrar);
            botonCerrar.innerHTML = "Cerrar";
            botonCerrar.className = "verMas";
            botonCerrar.addEventListener("click", () => {
                botonVer.classList.toggle("displayOf");
                infoAdicional.classList.toggle("displayOf");
                botonCerrar.classList.toggle("displayOf");
                divInfo.className = ("displayOf");
            })
        });
        tarjeta.appendChild(divApellido);
        tarjeta.appendChild(areaTrabajo);
        tarjeta.appendChild(botonVer);
        contenedor.appendChild(tarjeta);
    })
    document.getElementById("showList").appendChild(contenedor);
}
//_------------------------------------

async function traerEmpleados() {
    return await fetch('https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados')

        .then(datos => datos.json())
        .catch(err => showList.innerHTML = "No se encontro el archivo")
}
//-------------------------------

traerEmpleados().then(data => mostrarEmpleados(data))
    .catch(error => {
        // Maneja el error
        console.error("Ocurrió un error al obtener los datos de empleados:");
    });

function obtenerValoresNuevoEmpleado() {
    const objetoEmpleadoNuevo = {
        nombre: "",
        apellido: "",
        area: "",
        domicilio: "",
        foto: "",
    }
    let nombreObjeto = document.getElementById("nombre").value;
    nombreObjeto = nombreObjeto.charAt(0).toUpperCase() + nombreObjeto.slice(1);
    objetoEmpleadoNuevo.nombre = nombreObjeto;
    let apellidoObjeto = document.getElementById("apellido").value;
    apellidoObjeto = apellidoObjeto.charAt(0).toUpperCase() + apellidoObjeto.slice(1);
    objetoEmpleadoNuevo.apellido = apellidoObjeto;
    let areaObjeto = document.getElementById("area").value;
    areaObjeto = areaObjeto.charAt(0).toUpperCase() + areaObjeto.slice(1);
    objetoEmpleadoNuevo.area = areaObjeto;
    let domicilioObjeto = document.getElementById("domicilio").value;
    domicilioObjeto = domicilioObjeto.charAt(0).toUpperCase() + domicilioObjeto.slice(1);
    objetoEmpleadoNuevo.domicilio = domicilioObjeto;
    objetoEmpleadoNuevo.foto = "https://picsum.photos/200";
    console.log(objetoEmpleadoNuevo)
    return objetoEmpleadoNuevo
}

async function agregarEmpleado() {
    // Realiza una solicitud POST para enviar los datos actualizados
    try {
        const nuevoEmpleado = obtenerValoresNuevoEmpleado();
        console.log(nuevoEmpleado)
        const response = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEmpleado) // Solo envía el nuevo empleado en el cuerpo
        });

        if (response.status == 201) {
            document.getElementById("confirm").innerHTML = "Se agrego el empleado";
            // Luego, llama a traerEmpleados() y muestra los datos obtenidos.
            await traerEmpleados()
                .then(data => mostrarEmpleados(data))
                .catch(error => console.error("Error al mostrar empleados: " + error));
        } else {
            document.getElementById("confirm").innerHTML = "No se pudo agregar el empleado"
        }

    }
    catch (error) {
        console.log("error");
    }
    document.querySelectorAll("#ingreso input").forEach(input => input.value = "");

}

let empleadoNuevo = document.getElementById("new");

empleadoNuevo.addEventListener("click", () => {
    document.getElementById("ingreso").classList.toggle("displayOf");
    let quitar = document.getElementById("formEliminar");
    if (quitar.classList != "displayOf") {
        quitar.classList.add("displayOf")
    }
})
let agregar = document.getElementById("agregar");
agregar.addEventListener("click", () => {
    document.getElementById("contenedor").innerHTML="";
    agregarEmpleado();
})

let botonQuitar = document.getElementById("rest");
botonQuitar.addEventListener("click", async() => {
    document.getElementById("formEliminar").classList.toggle("displayOf");
    let nuevoEmpleado = document.getElementById("ingreso");
    if (nuevoEmpleado.classList != "displayOf") {
        nuevoEmpleado.classList.add("displayOf")
    }
})

let botonQuitar2 = document.getElementById("quitar");
botonQuitar2.addEventListener("click",  () => {
    document.getElementById("contenedor").innerHTML="";
    let id = document.getElementById("eliminar").value;
    
    fetch(`https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados/${id}`,
        {
            method: "DELETE"
        })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("aviso").innerHTML = `Se eliminó el empleado ID=${id} correctamente`;
            } else {
                if(id.length==0){
                    document.getElementById("aviso").innerHTML = "!!! Por favor ingrese apellido";
                }else{
                document.getElementById("aviso").innerHTML = `No se pudo eliminar el empleado ID=${id} correctamente. Revise ID y vuelva a intentar.`;
                }
            }
        })
        .then(data => {
            // Actualizar la lista de empleados
            // llamar a traerEmpleados y mostrar los datos obtenidos
            traerEmpleados()
                .then(data => mostrarEmpleados(data))
                .catch(error => console.error("Error al traer empleados: " + error));
             //mostrarEmpleados(data);
        })
        .catch(err => { console.log(err); });
    document.getElementById("eliminar").value = "";

})

let cerrarForm = document.getElementById("cerrar");
cerrarForm.addEventListener("click", () => {
    document.getElementById("ingreso").classList.toggle("displayOf");
    empleado.classList.toggle("displayOf");
})

let cerrarQuitarEmpleado=document.getElementById("cerrarQuitar");
cerrarQuitarEmpleado.addEventListener("click",()=>{
    document.getElementById("formEliminar").classList.toggle("displayOf");
})


let buscarEmpleado = document.getElementById("buscarEmpleado"); buscarEmpleado.addEventListener("click", () => {
    let contenedor = document.getElementById("contenedor");
    let empleadoBuscado = document.getElementById("buscar").value;
   //Creamos un boton para volver a mostrar todo.
    let verTodos = document.createElement("button");
    verTodos.innerHTML = "Ver todos";
    verTodos.className = "news";
    
    verTodos.addEventListener("click", () => {
        contenedor.innerHTML = "";
        traerEmpleados().then(data => mostrarEmpleados(data))
            .catch(error => {
                // Maneja el error
                console.error("Ocurrió un error al obtener los datos de empleados:", error);
            });
    })
   
   
      
    empleadoBuscado.value = "";
    empleadoBuscado = empleadoBuscado.charAt(0).toUpperCase() + empleadoBuscado.slice(1);
    //Traemos los empleados y los filtramos por las dudas haya mas de uno con el mismo apellido.
    traerEmpleados()
        .then(datos => {
            contenedor.innerHTML="";//vaciamos el contenedor
            
            const resultado = datos.filter(empleado => empleado.apellido == empleadoBuscado);
            if (resultado.length > 0) {
                mostrarEmpleados(resultado);
                contenedor.appendChild(verTodos)
            } else {
                let tarjetas = document.querySelectorAll("#tag")
                // Elimina tarjetas del DOM
                tarjetas.forEach(tarjeta => {
                    tarjeta.parentNode.removeChild(tarjeta);
                })
                contenedor.innerHTML = "<p>No se obtuvieron resultados con el apellido ingresado</p>";
                contenedor.appendChild(verTodos)
            }

        })
        .catch(error => {
            console.error("Error al traer empleados: " + error);
        });
       
        
})









