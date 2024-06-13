//declate
var imgRuleta = document.querySelector("#vistaRuleta img")
var alturaRuleta = document.querySelector('#vistaRuleta').clientHeight;
var laterales = document.querySelectorAll('.laterales');
var num = document.querySelectorAll(".tercios > .num");
var numeros = document.querySelectorAll(".num");
var listaNumerosSalidos = document.querySelector("#numerosQueHanSalido");
var contenedorIzquierda = document.querySelector("#contenedorIzquierda");
var numerosQueHanSalido = new Object;
var numeroGrande = document.querySelector('#vistaRuleta #numeroGanadorEnGrande');
var monedero = document.querySelector('#dinero');
var casillas = document.querySelectorAll('.boton');
var fichas = document.querySelectorAll('.ficha');

document.addEventListener('DOMContentLoaded', (event) => {
    //begin
    setAllForNumeros()
    setDataForCasillas()
    setStyleForLaterales()
    monedero.textContent += monedero.getAttribute('data-dineroOriginal')
})

const setAllForNumeros = () => {
    numeros.forEach(numero => {
        numero.id = 'num'+ numero.textContent;
        numerosQueHanSalido[numero.textContent] = 0;
        numero.setAttribute('data-numero', numero.textContent)
    })
}
const setDataForCasillas = () => {
    casillas.forEach(element => {
        element.setAttribute('data-apuesta', 0);
    })
}

const setStyleForLaterales = () => {
    laterales.forEach(function(element){
        element.style.gridTemplateRows = `repeat(3, ${num[0].clientHeight}px)`;
        element.style.gridTemplateColumns = `${num[0].clientHeight}px`;
    })
}