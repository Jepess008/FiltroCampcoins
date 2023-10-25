const btnAbrirModal1= document.querySelector("#btn-abrir-modal-1");
const btnCerrarModal1= document.querySelector("#btn-cerrar-modal-1");
const modal1= document.querySelector("#modal-gestCamper");

btnAbrirModal1.addEventListener('click',()=>{
    modal1.showModal();
});

btnCerrarModal1.addEventListener('click', ()=>{
    modal1.close();
});

// GESTION DE CAMPERS
const btnregistrar= document.getElementById("registro");
const inputId= document.getElementById("id");
const inputName= document.getElementById("names");
const inputPhone= document.getElementById("phones");
const inputEmail= document.getElementById("emails");
const selectGrupo= document.getElementById("grupo");
const form= document.getElementById('form');
const btnModificarCamper= document.getElementById('modificarCamper');
const btnDelCamper= document.getElementById('delCamper');

let campers=[];

function AgregarCamper(){
    form.addEventListener('submit', e=>{
        e.preventDefault()

        let regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        
        if(inputId.value.length<6){
            alert("Documento muy corto");         
        }
        if(inputName.value.length<3){
            alert("Nombre muy corto");            
        }
        if(!regexEmail.test(inputEmail.value)){
            alert("Email Invalido");
            
        }
        if(inputPhone.value.length<10 || inputPhone.value.length>10){
            alert("Celular no cumple con las caracteristicas");
        }
        
        if(selectGrupo.value==""){
            alert("Seleccione un grupo para el camper");
        }
        
        else{


            /* Falta crear una validacion que me permita impedir que se registre un usuario ya registrado */
            let camper={
            id: inputId.value,
            name: inputName.value,
            email:inputEmail.value,
            phone:inputPhone.value,
            grupo:selectGrupo.value,
            campcoins:0

            }

            campers.push(camper);
            console.log(campers);
            inputId.value="";
            inputName.value="";
            inputEmail.value="";
            inputPhone.value="";
            selectGrupo.value="";
            ActualizarCamper();
            guardarCampersLocalStorage();
            
        };
    });
};

btnregistrar.addEventListener('click', AgregarCamper);


function ActualizarCamper(){
    const tableCampers= document.getElementById('list-campers');
    
    tableCampers.innerHTML=`
        <tr>
            <th>Documento</th>
            <th>Nombre Completo</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Grupo Campus</th>
            <th>Campcoins Acumulados</th>
        </tr>
    
    `;
    campers.forEach(camper=>{
        tableCampers.innerHTML+=`
            <tr>
                <th>${camper.id}</th>
                <th>${camper.name}</th>
                <th>${camper.phone}</th>
                <th>${camper.email}</th>
                <th>${camper.grupo}</th>
                <th>${camper.campcoins}</th>
            </tr>
        
        `;
    });

    const tableCampers2=document.getElementById('list-campers2');
    tableCampers2.innerHTML=`
        <tr>
            <th>Documento</th>
            <th>Nombre Completo</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Grupo Campus</th>
            <th>Campcoins Acumulados</th>
        </tr>
    
    `;
    campers.forEach(camper=>{
        tableCampers2.innerHTML+=`
            <tr>
                <th>${camper.id}</th>
                <th>${camper.name}</th>
                <th>${camper.phone}</th>
                <th>${camper.email}</th>
                <th>${camper.grupo}</th>
                <th>${camper.campcoins}</th>
            </tr>
        
        `;
    });
};

function ModificarCamper() {
    let idMod = prompt("Ingrese el ID a modificar: ");
    const index = campers.findIndex(camper => camper.id === idMod);

    if (index !== -1) {
        
        let opcion = prompt(
            "Seleccione el campo a modificar:\n" +
            "1. Nombres\n" +
            "2. Telefono\n" +
            "3. Email\n" +
            "4. Grupo\n" 
        );
        if (opcion >= '1' && opcion <= '4') {
            let nuevoValor = prompt(`Ingrese el nuevo valor para ${obtenerNombreCampo1(opcion)}:`);

            campers[index][obtenerCampoPorOpcion1(opcion)] = nuevoValor;


            ActualizarCamper();
            guardarCampersLocalStorage();
        }
        else {
            alert("Opción no válida");
        }
    }
        else {
        alert("Usuario no encontrado");
    }
};

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerNombreCampo1(opcion) {
    switch (opcion) {
        case '1': return 'Nombres';
        case '2': return 'Telefono';
        case '3': return 'Email';
        case '4': return 'Grupo';
        default: return '';
    }
};

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerCampoPorOpcion1(opcion) {
    switch (opcion) {
        case '1': return 'name';
        case '2': return 'phone';
        case '3': return 'email';
        case '4': return 'grupo';
        default: return '';
    }
};
    //Funcion para Eliminar Usuario
function EliminarCamper() {
    let idEliminar = prompt("Ingrese el ID del usuario a eliminar: ");
    const index = campers.findIndex(camper => camper.id === idEliminar);

    if (index !== -1) {
       
        let confirmacion = confirm(`¿Estás seguro de que deseas eliminar al camper con ID ${idEliminar}?`);

        if (confirmacion) {
            campers.splice(index, 1);
            ActualizarCamper();
            guardarCampersLocalStorage();
            alert("Camper eliminado exitosamente.");
        } else {
            alert("Eliminación cancelada.");
        }
    } else {
        alert("Camper no encontrado");
    }
};

btnModificarCamper.addEventListener('click', ModificarCamper);
btnDelCamper.addEventListener('click', EliminarCamper);


function guardarCampersLocalStorage(){
    localStorage.setItem('campers', JSON.stringify(campers));
};


window.addEventListener('load', function(){
    const dataCampers= localStorage.getItem('campers');

    if(dataCampers){
        campers=JSON.parse(dataCampers);

        ActualizarCamper();
    }
});




//GESTION DE CONCEPTOS
const btnAbrirModal2= document.querySelector("#btn-abrir-modal-2");
const btnCerrarModal2= document.querySelector("#btn-cerrar-modal-2");
const modal2= document.querySelector("#modal-gestConcept");

btnAbrirModal2.addEventListener('click',()=>{
    modal2.showModal();
})

btnCerrarModal2.addEventListener('click', ()=>{
    modal2.close();
})


let conceptos=[];
const inputDescripcion= document.getElementById('descripcion');
const inputValor= document.getElementById('valor');
const btnIngresarConcepto= document.getElementById('ingresar');
const btnAbrirModal3= document.querySelector("#btn-abrir-modal-3");
const btnCerrarModal3= document.querySelector("#btn-cerrar-modal-3");
const modal3= document.querySelector("#modal-listConcepto");
const form2=document.getElementById('form2')
btnAbrirModal3.addEventListener('click',()=>{
    modal3.showModal();
});

btnCerrarModal3.addEventListener('click', ()=>{
    modal3.close();
});

function AgregarConcepto(){
    form2.addEventListener('submit', e=>{
        e.preventDefault()
        
        if(inputDescripcion.value.length<4){
            alert("Concepto muy corto");         
        }
        if(inputValor.value.length ==""){
            alert("ingrese un valor");            
        }
        
        else{

            function condigoConcpeto(){
                return Math.random().toString(36).substr(4,4);
            };
            let concepto={
                idConcept: condigoConcpeto(),
                descripcion: inputDescripcion.value,
                valor: inputValor.value
            }

            conceptos.push(concepto);
            console.log(conceptos);
            inputDescripcion.value="";
            inputValor.value="";

            ActualizarConceptos();
            guardarConceptosLocalStorage();
            
        };
    });
};

btnIngresarConcepto.addEventListener('click', AgregarConcepto);


function ActualizarConceptos(){
    const tableConceptos= document.getElementById('listConceptos');
    tableConceptos.innerHTML=`
        <tr>
            <th>Codigo</th>
            <th>Descripción</th>
            <th>Valor</th>
        </tr>
    
    `;
    conceptos.forEach(concepto=>{
        tableConceptos.innerHTML+=`
            <tr>
                <th>${concepto.idConcept}</th>
                <th>${concepto.descripcion}</th>
                <th>${concepto.valor}</th>

            </tr>
        `;
    });

    const tableConceptos2=document.getElementById('listConceptos2');
    tableConceptos2.innerHTML=`
        <tr>
            <th>Codigo</th>
            <th>Descripción</th>
            <th>Valor</th>
        </tr>
    
    `;
    conceptos.forEach(concepto=>{
        tableConceptos2.innerHTML+=`
            <tr>
                <th>${concepto.idConcept}</th>
                <th>${concepto.descripcion}</th>
                <th>${concepto.valor}</th>

            </tr>
        `;
    });

};
const btnModificarConcepto= document.getElementById("modificarConcepto");
const btnEliminarConcepto= document.getElementById("delConcepto");

function ModificarConcepto() {
    let idMod = prompt("Ingrese el ID a modificar: ");
    const index = conceptos.findIndex(concepto => concepto.idConcept === idMod);

    if (index !== -1) {
        
        let opcion = prompt(
            "Seleccione el campo a modificar:\n" +
            "1. Descripcion\n" +
            "2. Valor\n" 

        );
        if (opcion >= '1' && opcion <= '2') {
            let nuevoValor = prompt(`Ingrese el nuevo valor para ${obtenerNombreCampo2(opcion)}:`);

            conceptos[index][obtenerCampoPorOpcion2(opcion)] = nuevoValor;


            ActualizarConceptos();
            guardarConceptosLocalStorage();
        }
        else {
            alert("Opción no válida");
        }
    }
        else {
        alert("Concepto no encontrado");
    }
};

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerNombreCampo2(opcion) {
    switch (opcion) {
        case '1': return 'Descripción';
        case '2': return 'Valor';
        default: return '';
    }
};

    // Función para obtener el nombre del campo a partir de la opción del menú
function obtenerCampoPorOpcion2(opcion) {
    switch (opcion) {
        case '1': return 'descripcion';
        case '2': return 'valor';
        default: return '';
    }
};
    //Funcion para Eliminar Usuario
function EliminarConcepto() {
    let idEliminar = prompt("Ingrese el ID del Concepto a eliminar: ");
    const index = conceptos.findIndex(concepto => concepto.idConcept === idEliminar);

    if (index !== -1) {
       
        let confirmacion = confirm(`¿Estás seguro de que deseas eliminar el concepto con ID ${idEliminar}?`);

        if (confirmacion) {
            conceptos.splice(index, 1);
            ActualizarConceptos();
            guardarConceptosLocalStorage();
            alert("Concepto eliminado exitosamente.");
        } else {
            alert("Eliminación cancelada.");
        }
    } else {
        alert("Concepto no encontrado");
    }
    
};

btnModificarConcepto.addEventListener('click', ModificarConcepto);
btnEliminarConcepto.addEventListener('click', EliminarConcepto);

function guardarConceptosLocalStorage(){
    localStorage.setItem('conceptos', JSON.stringify(conceptos));
};


window.addEventListener('load', function(){
    const dataConceptos= localStorage.getItem('conceptos');

    if(dataConceptos){
        conceptos=JSON.parse(dataConceptos);

        ActualizarConceptos();
    }
});


//Gestion de Asignacion de puntos
const btnAbrirModal4= document.querySelector("#btn-abrir-modal-4");
const btnCerrarModal4= document.querySelector("#btn-cerrar-modal-4");
const modal4= document.querySelector("#modal-campcoins");
btnAbrirModal4.addEventListener('click',()=>{
    modal4.showModal();
});

btnCerrarModal4.addEventListener('click', ()=>{
    modal4.close();
});
const inputIdCamper= document.getElementById('idCamper');
const inputIdConcepto= document.getElementById('idConcepto');
const btnAddCampcoins= document.getElementById('add-puntos');
const btnRestCampcoins= document.getElementById('rest-puntos');



function AsignarCampcoins(){
    
    let idBuscarCamper = inputIdCamper.value;
    const index = campers.findIndex(camper => camper.id === idBuscarCamper);
    let idBuscarConcepto= inputIdConcepto.value;
    const index2 = conceptos.findIndex(concepto => concepto.idConcept === idBuscarConcepto);

    if (index !== -1 && index2 !==-1){
        
        campers.forEach(function(x){
            if(x.id=idBuscarCamper){
                
                conceptos.forEach(function(y){
                    alert("entra")
                    if(y.idConcept==idBuscarConcepto){
                        x.campcoins= x.campcoins+ parseInt(y.valor);
                        ActualizarCamper();
                        guardarCampersLocalStorage();
                    }
                })
            
            
            }

            else{
                alert("error");
            }
        })


    }
    else if( index ==-1){
        alert("No se Encontro el Usuario en la base de datos, por favor registrelo para poder comprar")
    }

    else{
        alert("No se encontro el id del Juego, verifique y vuelva a intentar")
    }

}

btnAddCampcoins.addEventListener('click',AsignarCampcoins);

function DescontarCampcoins(){
    let idBuscarCamper = inputIdCamper.value;
    const index = campers.findIndex(camper => camper.id === idBuscarCamper);
    let idBuscarConcepto= inputIdConcepto.value;
    const index2 = conceptos.findIndex(concepto => concepto.idConcept === idBuscarConcepto);

    if (index !== -1 && index2 !==-1){
        
        campers.forEach(function(x){
            if(x.id=idBuscarCamper){
                
                conceptos.forEach(function(y){
                    alert("entra")
                    if(y.idConcept==idBuscarConcepto){
                        x.campcoins= x.campcoins- parseInt(y.valor);
                        ActualizarCamper();
                        guardarCampersLocalStorage();
                    }
                })
            
            
            }

            else{
                alert("error");
            }
        })


    }
    else if( index ==-1){
        alert("No se Encontro el Usuario en la base de datos, por favor registrelo para poder comprar")
    }

    else{
        alert("No se encontro el id del Juego, verifique y vuelva a intentar")
    }
}

btnRestCampcoins.addEventListener('click',DescontarCampcoins);