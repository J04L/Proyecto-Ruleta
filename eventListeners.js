fichas.forEach(ficha => {
    ficha.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', ficha.id)
    })
})
casillas.forEach(casilla => {
    casilla.addEventListener('dragover', (event) => {
        event.preventDefault();
    })
    casilla.addEventListener('drop', (event) => {
        event.preventDefault();
        let idficha = event.dataTransfer.getData('text');
        let valorFicha = parseInt(document.querySelector('#'+ idficha).getAttribute('data-value'));
        addFichaToCasilla(casilla, valorFicha)
    })
})

imgRuleta.addEventListener('transitionend',  (envent) =>{
    let numeroAleatorio = parseInt(Math.random()*37);
    numerosQueHanSalido[numeroAleatorio+""] += 1;
    document.querySelector('#cantidadDeVecesTiradas').textContent = 'TIRADAS = ' + sumaVecesTiradas();
    addNumerosCalienteFrio(numerosQueHanSalido)
    let numeroGanador = new NumeroGanador(numeroAleatorio, getColor(getElementoNum(numeroAleatorio)))
    addNumToList(numeroGanador);
    setNumeroEnGrande(numeroGanador);
    actualizarBote(numeroGanador);
});