const formA = document.getElementById('formAgregar');
const formE = document.getElementById('formEditar');
const vistaVehiculos = document.getElementById('vistaVehiculos');
const tablaVista = document.getElementById('tablaVista');



//Traer la información a la tabla principal
const URL = 'https://semillero-sas-backend-project.herokuapp.com/api/vehiculos';
const traerVehiculos =() => {
    fetch(URL)
        .then(response => response.json())
        .then(data =>{
            tablaVista.innerHTML = ''
            data.forEach(vehiculo => {
                const {placa, modelo, venc_seguro, venc_tecnicomecanica, color, id_linea} = vehiculo;
                
                tablaVista.innerHTML += `
                    <tr>
                        <td>${placa}</td>
                        <td>${modelo}</td>
                        <td>${venc_seguro}</td>
                        <td>${venc_tecnicomecanica}</td>
                        <td>${color}</td>
                        <td>${id_linea}</td>
                        <td><button class="btnDel" id="${placa}")>Borrar</button></td>
                    </tr>
                `
            })
        });
}
traerVehiculos();

//Agregar un vehiculo
formA.addEventListener('submit', (e) => {
    e.preventDefault();
    const placaA = document.getElementById('placaA').value;
    const modeloA = document.getElementById('modeloA').value;
    const seguroA = document.getElementById('seguroA').value;
    const tecnicoA = document.getElementById('tecnicoA').value;
    const colorA = document.getElementById('colorA').value;
    const lineaA = document.getElementById('lineaA').value;

    let datosVehiculo = {
        placa: placaA.toUpperCase(), 
        modelo: Number(modeloA), 
        venc_seguro: seguroA, 
        venc_tecnicomecanica: tecnicoA, 
        color: colorA, 
        id_linea: Number(lineaA)
    };

    console.log(datosVehiculo);
    const URLadd = 'https://semillero-sas-backend-project.herokuapp.com/api/vehiculos'
    fetch(URLadd,{
        method: 'POST',
        body: JSON.stringify(datosVehiculo),
        headers:{
            "Content-type": "application/json"              //Importante para realizar el POST
        }
    })
        .then(res => res.json())
        .then(data =>console.log(data))
            
    setTimeout(() => {
        traerVehiculos();
    }, 100);
})

//Editar un vehiculo
formE.addEventListener('submit', (e) => {
    e.preventDefault();
    const placaE = document.getElementById('placaE').value;
    const modeloE = document.getElementById('modeloE').value;
    const seguroE = document.getElementById('seguroE').value;
    const tecnicoE = document.getElementById('tecnicoE').value;
    const colorE = document.getElementById('colorE').value;
    const lineaE = document.getElementById('lineaE').value;

    let datosVehiculo = {
        placa: placaE.toUpperCase(), 
        modelo: Number(modeloE), 
        venc_seguro: seguroE, 
        venc_tecnicomecanica: tecnicoE, 
        color: colorE, 
        id_linea: Number(lineaE)
    };
    // Intento de recorrer un arreglo FALLIDO
    // let datosEditados = {};
    // for(const propiedad in datosVehiculo){
    //     if(datosVehiculo[propiedad] != ""){
    //         datosEditados.propiedad = datosVehiculo[propiedad];
    //         console.log(`${propiedad}: ${datosVehiculo[propiedad]} `);
    //     }
    // }
    // console.log(datosEditados);

    delete datosVehiculo.placa;

    if (!datosVehiculo.modelo){
        delete datosVehiculo.modelo
    }
    if (!datosVehiculo.venc_seguro){
        delete datosVehiculo.venc_seguro
    }
    if (!datosVehiculo.venc_tecnicomecanica){
        delete datosVehiculo.venc_tecnicomecanica
    }
    if (!datosVehiculo.color){
        delete datosVehiculo.color
    }
    if (!datosVehiculo.id_linea){
        delete datosVehiculo.id_linea
    }
    console.log(datosVehiculo);
    const URLEd = `https://semillero-sas-backend-project.herokuapp.com/api/vehiculos/${placaE}`
    fetch(URLEd,{
        method: 'PATCH',
        body: JSON.stringify(datosVehiculo),
        headers:{
            "Content-type": "application/json"              //Importante para realizar el PATCH
        }
    })
        .then(res => res.json())
        .then(data =>console.log(data))
    
        setTimeout(() => {
        traerVehiculos();
    }, 5);  
    
})

// const eliminarVehiculo = (placa) =>{
    //     console.log(`Hola es la placa: ${placa}`);
    // }

//Eliminar un vehículo
const btnDel = document.querySelector(".btnDel");
document.addEventListener("click", ({target}) => {
    if(target.classList.contains('btnDel')){
        
        let placaDel = target.id;
        let confirmar = confirm(`Seguro quíeres eliminar el vehículos con placa: ${placaDel}`);

        if(confirmar){
            const URLDel = `https://semillero-sas-backend-project.herokuapp.com/api/vehiculos/${placaDel}`
            fetch(URLDel,{
                method: 'DELETE'
            })
            setTimeout(() => {
                traerVehiculos()
            }, 50);
        }
    }
})
