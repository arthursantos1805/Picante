const btnPop = document.getElementById('btnPop')
const btnMol = document.getElementById('btnMol')
const btnTemp = document.getElementById('btnTemp')
const btnPim = document.getElementById('btnPim')
const moverEsquerda = [...document.querySelectorAll('.esquerda')]
const moverDireita = [...document.querySelectorAll('.direita')]
const addCarrinho = [...document.querySelectorAll('.addCarrinho')]
const tituloMedia = document.getElementById('tituloMedia')
const btnModo = document.getElementById('btnModo')

const divsVenda = [...document.querySelectorAll('.venda')]
const divsProdutos = [...document.querySelectorAll('.produto')]
const divFavoritos = document.getElementById('populares')
const divMolhos = document.getElementById('molhos')
const divTemperos = document.getElementById('temperos')
const divPimentas = document.getElementById('pimentas')
const numPedido = document.getElementById('numPedido')

let divAtual = null
try {
    let carrinhoCont = JSON.parse(localStorage.getItem('carrinhoItens')).length
} catch {
    let carrinhoCont = 0
}

numPedido.innerHTML = carrinhoCont
let carrinhoArray = new Array()

let modo = localStorage.getItem('modo')
if (modo === null) {
    modo = 'claro'
}

console.log(modo)

if (window.innerWidth >= 992) {
        tituloMedia.innerHTML = 'Veja nossos principais produtos'
    } 
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        tituloMedia.innerHTML = 'Veja nossos principais produtos'
    } else {
        tituloMedia.innerHTML = ''
    }
})

function trocarModo(modo) {
    if (modo == 'escuro') {
        document.querySelector('main').style.backgroundColor = 'rgb(32, 32, 32)'
        document.querySelector('body').style.backgroundColor = 'rgb(32, 32, 32)'
        divsProdutos.forEach((el) => {    
            el.style.backgroundColor = 'rgb(32, 32, 32)'
            el.querySelector('#container').querySelector('h3').style.color = 'white';
            [...el.querySelector('#container').querySelectorAll('.addCarrinho')].forEach((button) => {
                button.classList.toggle('carrinhoEscuro')
            })
        })
        btnModo.class = 'btnModoEscuro'
        btnModo.innerHTML = '<i class="fa-solid fa-moon"></i>'
    } else if (modo == 'claro') {
        document.querySelector('main').style.backgroundColor = 'white'
        document.querySelector('body').style.backgroundColor = 'white'
        divsProdutos.forEach((el) => {
            el.style.backgroundColor = 'white'
            el.querySelector('#container').querySelector('h3').style.color = 'black';
            // [...el.querySelector('#container').querySelectorAll('.addCarrinho')].forEach((button) => {
            //     button.classList.toggle('carrinhoEscuro')
            // })
        })
        btnModo.class = 'btnModoClaro'
        btnModo.innerHTML = '<i class="fa-solid fa-sun"></i>'
    }
}

trocarModo(modo)

btnModo.addEventListener('click', () => {
    if (modo == 'claro') {
        document.querySelector('main').style.backgroundColor = 'rgb(32, 32, 32)'
        document.querySelector('body').style.backgroundColor = 'rgb(32, 32, 32)'
        divsProdutos.forEach((el) => {    
            el.style.backgroundColor = 'rgb(32, 32, 32)'
            el.querySelector('#container').querySelector('h3').style.color = 'white';
            [...el.querySelector('#container').querySelectorAll('.addCarrinho')].forEach((button) => {
                button.classList.toggle('carrinhoEscuro')
            })
        })
        btnModo.class = 'btnModoEscuro'
        btnModo.innerHTML = '<i class="fa-solid fa-moon"></i>'
        modo = 'escuro'
        localStorage.setItem('modo', 'escuro')
    } else if (modo == 'escuro') {
        document.querySelector('main').style.backgroundColor = 'white'
        document.querySelector('body').style.backgroundColor = 'white'
        divsProdutos.forEach((el) => {
            el.style.backgroundColor = 'white'
            el.querySelector('#container').querySelector('h3').style.color = 'black';
            [...el.querySelector('#container').querySelectorAll('.addCarrinho')].forEach((button) => {
                button.classList.toggle('carrinhoEscuro')
            })
        })
        btnModo.class = 'btnModoClaro'
        btnModo.innerHTML = '<i class="fa-solid fa-sun"></i>'
        modo = 'claro'
        localStorage.setItem('modo', 'claro')
    }
})

btnPop.addEventListener('click', () => {
    window.scrollTo({
    top: divFavoritos.getBoundingClientRect().top + window.scrollY - 200,
    behavior: "smooth"
    });
})

btnMol.addEventListener('click', () => {
    window.scrollTo({
    top: divMolhos.getBoundingClientRect().top + window.scrollY - 200,
    behavior: "smooth"
    });
})                                             //ESSES 4 btn SÃO PRA O SCROLL POR CLICK

btnTemp.addEventListener('click', () => {
    window.scrollTo({
    top: divTemperos.getBoundingClientRect().top + window.scrollY - 200,
    behavior: "smooth"
    });
})

btnPim.addEventListener('click', () => {
    window.scrollTo({
    top: divPimentas.getBoundingClientRect().top + window.scrollY - 200,
    behavior: "smooth"
    });
})

window.addEventListener('scroll', () => {
    if (window.scrollY >= 260 && window.innerWidth < 992) {
        document.querySelector('header').style.position = 'fixed'
    } else {
        document.querySelector('header').style.position = 'static'
    }
})

let vendaVeZ = 0 // O IF É PRA IGNORAR O PRIMEIRO .venda QUE EU TIVE PREGUIÇA DE ARRUMAR A CLASS
for (venda of divsVenda) {
    if (vendaVeZ != 0) {
        venda.style = 'transform: translateX(0px);'
        venda.querySelector('.esquerda').style = 'visibility: hidden'
    }
    vendaVeZ++
}

function mover(varQtdProd, target, dir=-1) { //OLHA NUNCA ENCOSTE NISSO PQ PRA ENTENDER O SENTIDO DESSA ABERRAÇÃO É DIFICIL obs2: por favor, nunca mais tente fazer isso denovo, isso é completamente quebrado
    let movX = 0
    divAtual = target.parentElement.querySelector('.listagem')
    let itemList = [...divAtual.children]
    let xAtual = Number(divAtual.style.transform.slice(divAtual.style.transform.lastIndexOf('(')+1, divAtual.style.transform.search('px')))



    let direction = null;

    for (classe of [...target.classList]) {
        if (classe == 'direita') {
            direction = 'direita'
            break
        } else {
            direction = 'esquerda'
        }
    }

    let areaVisivel = divAtual.parentElement;

    let maxDir = Math.min(
        0,
        areaVisivel.clientWidth - divAtual.scrollWidth
    );

    let maxEsq = 0

    if (varQtdProd == 0) {
        movX = 267
    }

    if (movX > (xAtual) - (maxDir) && direction == 'direita') {
        movX = (xAtual) - (maxDir) +16.5
    } // -534 -801

    if ((movX) + (xAtual) > maxEsq && direction == 'esquerda') {
        movX -= (movX) + (xAtual) 
    }

    movX *= (dir)

    divAtual.style = `transform: translateX(${(xAtual)+(movX)}px);`
    xAtual = Number(divAtual.style.transform.slice(divAtual.style.transform.lastIndexOf('(')+1, divAtual.style.transform.search('px')))

    if (xAtual == maxDir - 16.5) {
        target.parentElement.querySelector('.direita').style = 'visibility: hidden'
    } else if (xAtual == maxEsq) {
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
    button.addEventListener('click', (evt) => {
        carrinhoCont++
        document.querySelector('#numPedido').innerHTML = carrinhoCont

        let produtoInfos = {}
        produtoInfos['titulo'] = evt.target.parentElement.querySelector('h3').innerHTML
        produtoInfos['preco'] = evt.target.parentElement.querySelector('.preco').innerHTML
        produtoInfos['imgSrc'] = evt.target.parentElement.querySelector('.imgProduto').src

        carrinhoArray.push(produtoInfos)
        window.localStorage.removeItem('carrinhoItens')
        window.localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoArray))
        carrinhoCont = JSON.parse(localStorage.getItem('carrinhoItens')).length
    })
}


