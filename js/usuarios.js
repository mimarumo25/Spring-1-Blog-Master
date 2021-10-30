const API_URL = 'http://localhost:3000/api/usuarios';



const getUsuarios = async(url) => {

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
getUsuarios(API_URL)