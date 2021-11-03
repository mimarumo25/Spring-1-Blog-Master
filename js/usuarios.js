const API_URL = 'http://localhost:4001/usuario';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/didwrtnme/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'dptl1zsm';
const imageUploadbar = document.getElementById('img-upload-bar');



/*const getUsuarios = async(url) => {

    const data = await fetch(url);
    const usuario = await data.json()
    let table = document.querySelector('tbody');
    //console.log(table);
    usuario.forEach(usuario => {
        const { id, identifica, nombres, apellidos, direccion, telefono, correo } = usuario;

        table.innerHTML += `<tr>
                            <td> ${id} </td> 
                            <td> ${identifica} </td> 
                            <td> ${nombres} </td>
                            <td> ${apellidos} </td> 
                            <td> ${direccion} </td> 
                            <td> ${telefono} </td>
                            <td> ${correo} </td>
                            <td>
                            <button type="button" class="btn btn-warning rounded-pill">ACTUALIZAR</button>
                            <button type="button" class="btn btn-danger rounded-pill">ELIMINAR</button>
                            </td>
                            </tr>
                            `
    });

    //console.log(resultado)
}
getUsuarios(API_URL)*/

const getFotos = () => {
    //0.- Recuperar datos
    let file = document.getElementById("inputFotos").files[0];

    return file;
}
const guardarDatos = async() => {
    let identifica = document.getElementById('identifica').value;
    let nombre = document.getElementById('nombres').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;


    let file = getFotos();
    if (identifica !== "" && nombre !== "" && direccion !== "" && telefono !== "" && correo !== "") {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        // Send to cloudianry
        const res = await axios.post(
            CLOUDINARY_URL,
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress(e) {
                    let progress = Math.round((e.loaded * 100.0) / e.total);
                    console.log(progress);
                    imageUploadbar.setAttribute('value', progress);
                }
            }
        );
        let imgUrl = res.data.secure_url;
        if (imgUrl != "") {
            let user = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({
                    identifica,
                    nombre,
                    direccion,
                    telefono,
                    correo,
                    'imagen': imgUrl
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }

            })

            if (user.status === 201) {
                alert('Los datos de cargaron correctamente')
            } else {
                alert('Problemas al cargar los datos')
            }
        } else {
            alert('Problemas al cargar al foto')
        }
    } else {
        alert('Todos los campos son requeridos')
    }
}
document.addEventListener("click", (e) => {
    if (e.target.matches(".guardaData")) {

        guardarDatos()

    }
})
document.addEventListener("click", (e) => {
    if (e.target.matches("#seccion")) {

        inicioseccion()

    }
})
const inicioseccion = async() => {
    let user = document.getElementById('user').value
    let pass = document.getElementById('password').value
    let data = await getdata();
    let arrr = data.find(p => p.identifica === pass);
    let {
        identifica,
        nombre,
        telefono,
        correo,
        imagen,
        id
    } = arrr

    if (user === correo && pass === identifica) {
        document.getElementById('inicioSeccio').setAttribute('hidden', '')
        document.getElementById('Perfil').removeAttribute('hidden')
        let pefiles = document.querySelector('.pefiles');
        pefiles.innerHTML = `<div class="d-flex justify-content-center">
        <div class="rounded-pill h-50 w-50">
            <img src="${imagen}" class="rounded-pill" alt="">
        </div>
    </div>
    <div class="row ">
        <div class="col-12 text-center my-2">
            <h5>${nombre}</h5>
            <p id="correo">Correo: <small id="corr">${correo}</small></p>
            <p id="telefono">Telefono: <small id="nun">${telefono}</small></p>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary mx-2 actualizar" id="${id}" data-bs-toggle="modal" data-bs-target="#modalRegistro">Actualizar</button>
            <button class="btn btn-danger eliminar" id="${id}">Eliminar Perfil</button>
        </div>
    </div>`


    } else {
        alert('Usuario y/o contraseña incorrectos')
    }



}
const getdata = async() => {
    let data = await fetch(API_URL);
    let res = await data.json();
    return res;

}
document.addEventListener("click", async(e) => {
    if (e.target.matches(".actualizar")) {

        let id = e.target.id
        let data = await getdata();
        let arrr = data.find(p => p.id === id);
        let {
            identifica,
            nombre,
            telefono,
            correo,
            direccion
        } = arrr;

        document.getElementById('identifica').value = identifica
        document.getElementById('nombres').value = nombre
        document.getElementById('direccion').value = direccion
        document.getElementById('telefono').value = 'telefono'
        document.getElementById('correo').value = correo
        document.getElementById('identifica').setAttribute('readonly', 'true');
        document.getElementById("inputFotos").setAttribute('readonly', 'true');


    }
})