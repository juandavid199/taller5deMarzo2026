let usuarios = [];

async function cargarUsuarios() {

    let respuesta = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
    );

    usuarios = respuesta.data;

    console.log(usuarios);

    mostrarUsuarios(usuarios);
}


function mostrarUsuarios(lista) {

    $("#usuarios").empty();

    lista.forEach(usuario => {

        $("#usuarios").append(`
            <tr data-id="${usuario.id}">
                <td>${usuario.name}</td>
                <td>${usuario.email}</td>
                <td>${usuario.company.name}</td>
            </tr>
        `);

    });
}


$("#filtro").on("input", function () {

    let texto = $(this).val().toLowerCase();

    let resultado = usuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(texto)
    );

    mostrarUsuarios(resultado);

    console.log(resultado);
});


$("#usuarios").on("click", "tr", function () {

    let id = $(this).data("id");

    let usuario = usuarios.find(usuario =>
        usuario.id == id
    );

    $("#detalle").html(`
        <h2>${usuario.name}</h2>
        <p>Telefono: ${usuario.phone}</p>
        <p>Direccion: ${usuario.address.street}</p>
        <p>Ciudad: ${usuario.address.city}</p>
    `);

    console.log(usuario);
});


cargarUsuarios();
