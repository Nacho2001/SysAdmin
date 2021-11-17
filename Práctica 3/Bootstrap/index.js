function mostrar ()
{
    let info = {
        nombre:'Ignacio',
        apellido:'Migoni',
        correos: {
            gmail:'nachomigoni@gmail.com',
            outlook:'nachomigoni2001@hotmail.com'
        }
    }

//este uso de comillas se llaman Template String
    console.log(`
        Mi nombre es: ${info.nombre}
        Mi apellido es: ${info.apellido}
        Mi correo es: ${info.correos.gmail}
    `)


}

function mostrar_elementos_arreglo()
{
    let valores = [44,10,8,99]
    console.log(valores[2]);
}

function mostrar_array_objetos()
{
    let arreglo_objetos = [
        {
            taller:'Programación 1',
            año:'5to',
            escuela:'cet30'
        },
        {
            taller:'Web 2',
            año:'6to',
            escuela:'cet30'

        }
    ]

    //arreglo_objetos.forEach(objeto => {
      //  console.log(`
     //   Escuela: ${objeto.escuela}
       // Taller: ${objeto.taller}
       // Año: ${objeto.año}
       // `)

    //})

    let totalidad_filas = [];
    arreglo_objetos.forEach(objeto => {

        let fila = `
            <tr>
                <td>${objeto.escuela}</td>
                <td>${objeto.taller}</td>
                <td>${objeto.año}</td>

            <tr>
        `
        totalidad_filas.push(fila);
    });

    document.querySelector("#tb_datos").innerHTML = totalidad_filas.join("");
}