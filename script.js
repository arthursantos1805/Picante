const btnPop = document.getElementById('btnPop')
const btnMol = document.getElementById('btnMol')
const btnTemp = document.getElementById('btnTemp')
const btnPim = document.getElementById('btnPim')
const moverEsquerda = [...document.querySelectorAll('.esquerda')]
const moverDireita = [...document.querySelectorAll('.direita')]
const addCarrinho = [...document.querySelectorAll('.addCarrinho')]

const divsVenda = [...document.querySelectorAll('.venda')]
const divFavoritos = document.getElementById('populares')
const divMolhos = document.getElementById('molhos')
const divTemperos = document.getElementById('temperos')
const divPimentas = document.getElementById('pimentas')

let divAtual = null
let carrinhoCont = 0 

btnPop.addEventListener('click', () => {
    divFavoritos.scrollIntoView({
        behavior: 'smooth'
    })
})

btnMol.addEventListener('click', () => {
    divMolhos.scrollIntoView({
        behavior: 'smooth'
    })
})                                             //ESSES 4 btn SÃO PRA O SCROLL POR CLICK

btnTemp.addEventListener('click', () => {
    divTemperos.scrollIntoView({
        behavior: 'smooth'
    })
})

btnPim.addEventListener('click', () => {
    divPimentas.scrollIntoView({
        behavior: 'smooth'
    })
})

let vendaVeZ = 0 // O IF É PRA IGNORAR O PRIMEIRO .venda QUE EU TIVE PREGUIÇA DE ARRUMAR A CLASS
for (venda of divsVenda) {
    if (vendaVeZ != 0) {
        venda.style = 'transform: translateX(0px);'
        venda.querySelector('.esquerda').style = 'visibility: hidden'
    }
    vendaVeZ++
}

function mover(varQtdProd, target, dir=-1) { //OLHA NUNCA ENCOSTE NISSO PQ PRA ENTENDER O SENTIDO DESSA ABERRAÇÃO É DIFICIL
    let movX = 0
    divAtual = target.parentElement.querySelector('.listagem')
    let itemList = [...divAtual.children]
    let xAtual = Number(divAtual.style.transform.slice(divAtual.style.transform.lastIndexOf('(')+1, divAtual.style.transform.search('px')))

    if (varQtdProd == 0) {
        movX = 267
    }

    movX *= (dir)
    
    divAtual.style = `transform: translateX(${(xAtual)+(movX)}px);`
    xAtual = Number(divAtual.style.transform.slice(divAtual.style.transform.lastIndexOf('(')+1, divAtual.style.transform.search('px')))

    if (xAtual == (itemList.length-1) * (-267)) {
        target.parentElement.querySelector('.direita').style = 'visibility: hidden'
    } else if (xAtual == 0) {
        target.parentElement.querySelector('.esquerda').style = 'visibility: hidden'
    } else {
        target.parentElement.querySelector('.esquerda').style = 'visibility: visible'
        target.parentElement.querySelector('.direita').style = 'visibility: visible'
    }
}

for (button of moverEsquerda) {
    button.addEventListener('click', (evt) => {
        mover(0, evt.target, 1)
    })
}

for (button of moverDireita) {
    button.addEventListener('click', (evt) => {
        mover(0, evt.target)
    })
}

for (button of addCarrinho) {
    button.addEventListener('click', () => {
        
    })
}