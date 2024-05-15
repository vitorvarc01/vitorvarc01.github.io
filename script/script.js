const olho = document.getElementById('clique')
const olhoFechado = document.getElementById('olho-fechado')
const olhoAberto = document.getElementById('olho-aberto')

const pontosDiv2 = document.getElementById('pontos-div-2')
const valorDiv2 = document.getElementById('valor-div-2')

const pontosDiv4 = document.getElementById('pontos-div-4')
const valorDiv4 = document.getElementById('valor-div-4')


const fechando = () => {
    olhoFechado.classList.toggle('oculto')
    olhoAberto.classList.toggle('oculto')

    pontosDiv2.classList.toggle('oculto')
    valorDiv2.classList.toggle('oculto')

    pontosDiv4.classList.toggle('oculto')
    valorDiv4.classList.toggle('oculto')

}
olho.addEventListener('click', fechando)