const formRangoSeguro = document.getElementById("vehiculoRangoSeguro");
const formRangoModelo = document.getElementById("vehiculoRangoModelo");
const contRangos = document.getElementById('contRangos');

// Carga de la información segú Placa/Modelo/Des. Línea/Des. Marca
const URLInicio = 'https://semillero-sas-backend-project.herokuapp.com/api/consulta/pla-mod-desl-desm'
const cargaInicial = () => {
    fetch(URLInicio)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        contRangos.innerHTML = `
            <thead>
            <tr><th colspan="4">Vehículos</th></tr>
            <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Descripción de la Línea</th>
            <th>Descripción de la Marca</th>

            </tr>
            </thead>
            `
            data.forEach(vehiculo => {
                const {placa, modelo, desLinea, desMarca} = vehiculo;
                contRangos.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${placa}</td>
                            <td>${modelo}</td>
                            <td>${desLinea}</td>
                            <td>${desMarca}</td>
                        </tr>
                    </tbody>
                `
            })
        })
}

setTimeout(() => {
    cargaInicial();
}, 200);


//Trar vehículos según el rango del seguro
formRangoSeguro.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inicialFecha = document.getElementById('fechaInicialSeguro').value;
    const finalFecha = document.getElementById('fechaFinalSeguro').value;

    const URLRangoSeguro = `https://semillero-sas-backend-project.herokuapp.com/api/consulta/entre-fechas-seguro/${inicialFecha}/${finalFecha}`;

    fetch(URLRangoSeguro)
        .then(response => response.json())
        .then(data =>{
        contRangos.innerHTML = `
            <thead>
            <tr><th colspan="6">Vehículos según el rango de la fecha del Seguro</th></tr>
            <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Venc. Seguro</th>
            <th>Venc. Técnico mecánica</th>
            <th>Color</th>
            <th>Linea</th>
            </tr>
            </thead>
            `
            data.forEach(vehiculo => {
                const {placa, modelo, venc_seguro, venc_tecnicomecanica, color, id_linea} = vehiculo;
                contRangos.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${placa}</td>
                            <td>${modelo}</td>
                            <td>${venc_seguro}</td>
                            <td>${venc_tecnicomecanica}</td>
                            <td>${color}</td>
                            <td>${id_linea}</td>
                        </tr>
                    </tbody>
                `
            })
        });
})

//Trar vehículos según el rango modelos
formRangoModelo.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inicialFecha = document.getElementById('fechaInicialModelo').value;
    const finalFecha = document.getElementById('fechaFinalModelo').value;
    
    const URLRangoSeguro = `https://semillero-sas-backend-project.herokuapp.com/api/consulta/entre-modelos/${inicialFecha}/${finalFecha}`;

    fetch(URLRangoSeguro)
        .then(response => response.json())
        .then(data =>{
        contRangos.innerHTML = `
            <thead>
            <tr><th colspan="6">Vehículos según el rango del Modelo</th></tr>
            <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Venc. Seguro</th>
            <th>Venc. Técnico mecánica</th>
            <th>Color</th>
            <th>Linea</th>
            </tr>
            </thead>
            `
            data.forEach(vehiculo => {
                const {placa, modelo, venc_seguro, venc_tecnicomecanica, color, id_linea} = vehiculo;
                contRangos.innerHTML += `
                    <tbody>
                        <tr>
                            <td>${placa}</td>
                            <td>${modelo}</td>
                            <td>${venc_seguro}</td>
                            <td>${venc_tecnicomecanica}</td>
                            <td>${color}</td>
                            <td>${id_linea}</td>
                        </tr>
                    </tbody>
                `
            })
        });
})

const maximoModelo = document.getElementById("maxModelo");
const minimoModelo = document.getElementById("maxMinimo");
const sumaModelo = document.getElementById("sumaModelo");
const promedioModelo = document.getElementById("promModelo");

// Maximo modelo almacenado
const URLMaxModelo = 'https://semillero-sas-backend-project.herokuapp.com/api/consulta/maxmodelo'
fetch(URLMaxModelo)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const {maxModelo} = data[0];
        maximoModelo.value = maxModelo;
    });

// Maximo modelo almacenado
const URLMinModelo = 'https://semillero-sas-backend-project.herokuapp.com/api/consulta/minmodelo'
fetch(URLMinModelo)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const {minModelo} = data[0];
        minimoModelo.value = minModelo;
    });

    // Maximo modelo almacenado
const URLSumModelo = 'https://semillero-sas-backend-project.herokuapp.com/api/consulta/suma-modelo'
fetch(URLSumModelo)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const {sumModelo} = data[0];
        sumaModelo.value = sumModelo;
    });

// Maximo modelo almacenado
const URLPromModelo = 'https://semillero-sas-backend-project.herokuapp.com/api/consulta/prom-modelo'
fetch(URLPromModelo)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const {promModelo} = data[0];
        promedioModelo.value = Math.round(promModelo);
    });

const lineaActiva = document.getElementById("lineaActiva");
const lineaInactiva = document.getElementById("lineaInactiva");

// Líneas activas - Inactivas
const URLLinea = 'https://semillero-sas-backend-project.herokuapp.com/api/consulta/linea-activa-inactiva'
fetch(URLLinea)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const {Activos, Inactivos} = data[0];
        lineaActiva.value = Activos;
        lineaInactiva.value = Inactivos;
    });

