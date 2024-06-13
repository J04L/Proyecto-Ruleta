const totalDineroApostado = () => {
    let sumaTotal = 0;
    casillas.forEach(casilla => {
        sumaTotal += parseInt(casilla.getAttribute('data-apuesta'));
    })
    return sumaTotal;
}

const ordenarFichas = (fichas) => Array.from(fichas).sort((a,b) => {
    let valorFichaA = parseInt(a.getAttribute('data-value'))
    let valorFichaB = parseInt(b.getAttribute('data-value'))
    
    if ( valorFichaA < valorFichaB ) return 1;
    else if (valorFichaA > valorFichaB) return -1;
    else return 0;
})
const getFichaMenorPosible = (fichas, total) => fichas.find((ficha)=> parseInt(ficha.getAttribute('data-value')) <= total);

const getOrganizacionOptimaDeFichasSegunLaApuestaEnLaCasilla = (apuestaCasilla, fichas) => {
    let objetoValorDeTodasLaFichas = new Object;
    let resto = apuestaCasilla;
    for(let i =0; i< fichas.length && resto!=0; i++){
        valor = parseInt(fichas[i].getAttribute('data-value'));
        if (valor <= resto){
            objetoValorDeTodasLaFichas[valor+""] = parseInt(resto/valor);
            resto -= valor*objetoValorDeTodasLaFichas[valor+""]
        }
    }
    return objetoValorDeTodasLaFichas;
}
const deleteFichasFromCasilla = (casilla) => document.querySelectorAll(`#${casilla.id} .fichaEnNumero`).forEach(element => {
    casilla.removeChild(element)
});
const addFichas = (casilla, fichas) => {
    let altura = 50;
    Object.entries(fichas).sort((a, b) => {
        valorA = parseInt(a[0]);
        valorB = parseInt(b[0]);
        if (valorA > valorB) return -1;
        else if (valorA < valorB) return 1;
        else return 0;
    }).forEach(element => {
        for(let i = 0; i<element[1]; i++){
            let ficha = getFichaByValor(element[0]);
            let elementoCirucoluFicha = document.createElement('div');
            elementoCirucoluFicha.style.backgroundColor = ficha.style.backgroundColor;
            elementoCirucoluFicha.textContent = ficha.textContent;
            elementoCirucoluFicha.style.top = altura+"%";
            elementoCirucoluFicha.classList.add('fichaEnNumero');

            altura -= 5;
            casilla.appendChild(elementoCirucoluFicha)
        }
    })
}
const apuestaTotalDeCasilla = (casilla) => {
    apuestaTotal = 0;
    casilla.querySelectorAll('.fichaEnNumero').forEach(element => {
        apuestaTotal += parseInt(element.textContent)
    })
    return apuestaTotal;
}
const addFichaToCasilla = (casilla, valorFicha) => {
    let fichasOrdenadas = ordenarFichas(fichas);

    //100
    let dineroOriginal = parseInt(monedero.getAttribute('data-dineroOriginal'))

    //0 + 50
    let apuestaTotal = totalDineroApostado() + valorFicha;
    let dineroTotal = dineroOriginal - totalDineroApostado();
    //150 > 100 
    let apuesta = apuestaTotal > dineroOriginal ? dineroTotal + parseInt(casilla.getAttribute('data-apuesta')) : (apuestaTotalDeCasilla(casilla) + valorFicha);
                                                                                //0 + 50
    casilla.setAttribute('data-apuesta', apuesta);
    //100 - 50

    monedero.setAttribute('data-dineroTotal', dineroOriginal - totalDineroApostado())
    monedero.textContent = 'TOTAL: ' + monedero.getAttribute('data-dineroTotal');

    deleteFichasFromCasilla(casilla)
    addFichas(casilla, getOrganizacionOptimaDeFichasSegunLaApuestaEnLaCasilla(apuesta, fichasOrdenadas));
}

const getCasillasApostadas = () => {
    let casillasApostadas = new Object();
    casillas.forEach(element => {
        let apuestaCasilla = element.getAttribute('data-apuesta');
        if (apuestaCasilla != '0'){
            casillasApostadas[element.id] = parseInt(apuestaCasilla);
        }
    })
    return casillasApostadas;

}
const getDineroGanado = (numeroGanador) => {
    let dineroGanado = dineroGanadoConApuestas(getCasillasApostadas(), numeroGanador);

    return parseInt(monedero.getAttribute('data-dineroOriginal')) +  (dineroGanado);
}

const dineroGanadoConApuestas = (casillasApostadas, numeroGanador) => {
    let dineroGanado = 0;
    Object.keys(casillasApostadas).forEach(casillaId => {
        if (numeroGanador.getTercio().id === casillaId || numeroGanador.getFila().id == casillaId){
            dineroGanado += casillasApostadas[casillaId]*3;
            delete casillasApostadas[casillaId];
        }
        else if (getElementoNum(numeroGanador.numero).id == casillaId){
            dineroGanado += casillasApostadas[casillaId]*36;
            delete casillasApostadas[casillaId];
        }
        else if (numeroGanador.color == casillaId || numeroGanador.esPar().id == casillaId || numeroGanador.esMenor().id == casillaId){
            dineroGanado += casillasApostadas[casillaId]*2;
            delete casillasApostadas[casillaId];
        }
    })
    return dineroGanado - totalDineroApostado();
}