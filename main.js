const limpiarTablero = () => {
    casillas.forEach(casilla => {
        fichasEliminar = casilla.querySelectorAll('div')
        fichasEliminar.forEach(ficha => {
            casilla.removeChild(ficha)
        })
        casilla.setAttribute('data-apuesta', 0)
    })
    monedero.textContent = 'TOTAL: ' + monedero.getAttribute('data-dineroOriginal')
}

const girarRuedaLento = () => {
    imgRuleta.style.transitionDuration = '6s';
    girarRueda()
};
const girarRueda = () => {
    imgRuleta.style.transform = `rotate(${Math.random()*10000 + 1000}deg)`;
}
const girarRuedaRapido = () => {
    imgRuleta.style.transitionDuration = '0.5s';
    girarRueda()
}
let sumaVecesTiradas = () => {
    let suma =0;
    Object.values(numerosQueHanSalido).forEach(element => suma+=element)
    return suma;
}
const addNumerosCalienteFrio = (numerosSalidos) => {
    numerosSalidos = Object.entries(numerosSalidos)
    let numerosCalientes = document.querySelectorAll(".numerosCalientes");
    let numerosFrios = document.querySelectorAll(".numerosFrios");

    for(let i =0; i< numerosCalientes.length && numerosSalidos[i] != undefined; i++){
        numerosCalientes[i].textContent = numerosSalidos[i][0] + " ---> " + numerosSalidos[i][1]
        numerosFrios[i].textContent = numerosSalidos[numerosSalidos.length-i-1][0] + " ---> " + numerosSalidos[numerosSalidos.length-i-1][1]
    }
}

const addNumToList = (numeroGanador) => {
    let elementoLi = document.createElement("li");
    elementoLi.textContent = numeroGanador.numero;
    elementoLi.classList.add(numeroGanador.color);

    if(numeroGanador.color === "black"){
        elementoLi.style.alignSelf = "flex-end";
    }
    else if(numeroGanador.color === 'verde'){
        elementoLi.style.alignSelf = 'center';
    }
    listaNumerosSalidos.appendChild(elementoLi);
    listaNumerosSalidos.scrollTop = listaNumerosSalidos.scrollHeight;
}

const setNumeroEnGrande = (numeroGanador) => {
    if(numeroGrande.classList[0]){
        numeroGrande.classList.remove(numeroGrande.classList[0])
    }
    numeroGrande.classList.add(numeroGanador.color)
    numeroGrande.textContent = numeroGanador.numero;
}

const actualizarBote = (numeroGanador) => {
    monedero.setAttribute('data-dineroOriginal', getDineroGanado(numeroGanador));  
    monedero.textContent = 'TOTAL: ' + monedero.getAttribute('data-dineroOriginal');
    monedero.setAttribute('data-dineroTotal', monedero.getAttribute('data-dineroOriginal'));
}

const getFichaByValor = (valorFicha) => {
    let elementoFicha;
    fichas.forEach(element => {
        if(element.getAttribute('data-value') == valorFicha){
            elementoFicha = element
        }
    })
    return elementoFicha;
}
function getColor(num){
    if(num.classList.contains("red")) return "red";
    else if(num.classList.contains("black"))return "black";
    return "verde";
}

function getElementoNum(num){
    return Object.values(numeros).find(element => {
        return element.getAttribute('data-numero') == num
    });

}

class NumeroGanador{
    constructor(numero, color){
        this.numero = numero;
        this.color = color;
    }
    esPar(){
        let parImpar = document.querySelectorAll('.parImparButton')
        if(this.numero%2==0) return parImpar[0]
        else return parImpar[1];
    }
    esMenor(){
        let mayorMenor = document.querySelectorAll('.mayorMenorButton');
        if(this.numero <19) return mayorMenor[0]
        else return mayorMenor[1];
    }
    getTercio(){
        let tercios = document.querySelectorAll('.tercioButton');
        if( this.numero < 13) return tercios[0];
        else if (this. numero < 25) return tercios[1];
        else return tercios[2];
    }
    getFila(){
        let filas = document.querySelectorAll('.fila');
        if (Array.from(document.querySelectorAll('.tercios > .num:nth-child(-n+4)')).includes(getElementoNum(this.numero))) return filas[0];
        else if(Array.from(document.querySelectorAll('.tercios > .num:nth-child(n+4):nth-child(-n+8)')).includes(getElementoNum(this.numero))) return filas[1];
        else return filas[2];
    }
}