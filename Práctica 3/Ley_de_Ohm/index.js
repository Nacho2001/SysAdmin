//Calculo de Tensión

const Tensión = () => {
    const t1 = parseFloat(document.querySelector("#a1").value);
    const t2 = parseFloat(document.querySelector("#a2").value);
    const tr = t1 * t2;
    document.querySelector("#a3").value = tr;
}

const calc_tension = document.querySelector("#btn1");
calc_tension.addEventListener("click", Tensión);
document.querySelector("#btn1a").reset()


//Calculo de Intensidad

const Intensidad = () => {
    const i1 = parseFloat(document.querySelector("#b1").value);
    const i2 = parseFloat(document.querySelector("#b2").value);
    const ir = i1 / i2;
    document.querySelector("#b3").value = ir;
}

const calc_intensidad = document.querySelector("#btn2");
calc_intensidad.addEventListener("click", Intensidad);
document.querySelector("#btn2a").reset()


//Calculo de Resistencia

const Resistencia = () => {
    const r1 = parseFloat(document.querySelector("#c1").value);
    const r2 = parseFloat(document.querySelector("#c2").value);
    const rr = r2 / r1;
    document.querySelector("#c3").value = rr;
}

const calc_resistencia = document.querySelector("#btn3");
calc_resistencia.addEventListener("click", Resistencia);
document.querySelector("#btn3a").reset()
