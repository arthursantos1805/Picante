const divItens = document.querySelector('#itens')

const cardapioCompleto = document.getElementById('cardapioCompleto')
const btnFinalizar = document.getElementById('btnFinalizar')
const btnModo = document.getElementById('btnModo')

const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens'))

let modo = localStorage.getItem('modo')
if (modo === null) {
    modo = 'claro'
}

function trocarModo(modo) {
    if (modo == 'escuro') {
        document.querySelector('main').style.backgroundColor = 'rgb(32, 32, 32)'
        document.querySelector('body').style.backgroundColor = 'rgb(32, 32, 32)'
        divsProdutos.forEach((el) => {    
            el.style.backgroundColor = 'rgb(32, 32, 32)'
            el.querySelector('.titulo').style.color = 'white';
            [...el.querySelectorAll('.btnRemover')].forEach((button) => {
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
            el.querySelector('.titulo').style.color = 'black';
            // [...el.querySelector('#container').querySelectorAll('.addCarrinho')].forEach((button) => {
            //     button.classList.toggle('carrinhoEscuro')
            // })
        })
        btnModo.class = 'btnModoClaro'
        btnModo.innerHTML = '<i class="fa-solid fa-sun"></i>'
    }
}

function criarProdutoCarrinho(listaItens) {
    listaItens.forEach((item) => {
        const produto = document.createElement('div')
        produto.classList += 'produto'
        divItens.appendChild(produto)

        const imgProduto = document.createElement('div')
        imgProduto.classList += 'imgProduto'
        const img = document.createElement('img')
        img.src = item.imgSrc
        imgProduto.appendChild(img)
        produto.appendChild(imgProduto)

        const infosProduto = document.createElement('div')
        infosProduto.classList += 'infosProduto'
        produto.appendChild(infosProduto)

        const titulo = document.createElement('h1')
        titulo.classList += 'titulo'
        titulo.innerHTML = item.titulo
        infosProduto.appendChild(titulo)

        const preco = document.createElement('h2')
        preco.classList += 'preco'
        preco.innerHTML = item.preco
        infosProduto.appendChild(preco)

        const btnRemover = document.createElement('button')
        btnRemover.classList += 'btnRemover'
        btnRemover.innerHTML = 'Remover'
        btnRemover.addEventListener('click', (evt) => {
            const indice = [...divItens.children].indexOf(evt.target.parentElement)
            let novoItens = JSON.parse(localStorage.getItem('carrinhoItens'))
            novoItens = novoItens.filter((el , ind) => {
                if (ind != (indice - 1)) {
                    return el
                }
            })
            console.log(novoItens)
            localStorage.setItem('carrinhoItens', JSON.stringify(novoItens))
            divItens.removeChild(evt.target.parentElement)

        })
        produto.appendChild(btnRemover)
    })
}

criarProdutoCarrinho(carrinhoItens)
const divsProdutos = [...document.querySelectorAll('.produto')]

trocarModo(modo)

window.addEventListener('scroll', () => {
    const limite = cardapioCompleto.getBoundingClientRect().bottom;
    const alturaBotao = btnFinalizar.offsetHeight;

    if (limite <= window.innerHeight) {
        btnFinalizar.classList.add('parado');

        btnFinalizar.style.top =
            `${window.scrollY + limite - alturaBotao}px`;
    } else {
        btnFinalizar.classList.remove('parado');
        btnFinalizar.style.top = '';
    }
});

btnModo.addEventListener('click', () => {
    if (modo == 'claro') {
        document.querySelector('main').style.backgroundColor = 'rgb(32, 32, 32)'
        document.querySelector('body').style.backgroundColor = 'rgb(32, 32, 32)'
        divsProdutos.forEach((el) => {    
            el.style.backgroundColor = 'rgb(32, 32, 32)'
            el.querySelector('.titulo').style.color = 'white';
            [...el.querySelectorAll('.btnRemover')].forEach((button) => {
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
            el.querySelector('.titulo').style.color = 'black';
            [...el.querySelectorAll('.btnRemover')].forEach((button) => {
                button.classList.toggle('carrinhoEscuro')
            })
        })
        btnModo.class = 'btnModoClaro'
        btnModo.innerHTML = '<i class="fa-solid fa-sun"></i>'
        modo = 'claro'
        localStorage.setItem('modo', 'claro')
    }
})
