function carga_producto(){
    let producto = document.getElementById("articulo")
    let costo = parseFloat(document.getElementById("precioIn").value);
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let precio = costo*cantidad
    document.getElementById("resumen").innerHTML = 
    "$"+precio+" "+" "+producto+" ("+cantidad+")"
    continuacion = confirm("Cargar más productos?")
    if (continuacion) {
        producto = ""
        costo = ""
        cantidad = ""
        precio = ""
    } else {
        
    }
}