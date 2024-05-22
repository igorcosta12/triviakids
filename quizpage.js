let perguntas = [];
let quantidadeCertas = 0;
let perguntasRespondidas = 0;

async function carregarPerguntas() {
    try {
        const response = await fetch('perguntas.txt');
        perguntas = await response.json();
        gerarPerguntas();
    } catch (error) {
        console.error('Erro ao carregar as perguntas:', error);
    }
}

function obterTema() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tema');
}

function gerarPerguntas() {
    const tema = obterTema();
    const gradePerguntas = document.querySelector('.question-grid');
    const perguntasFiltradas = perguntas.filter(pergunta => pergunta.tema === tema);

    perguntasFiltradas.forEach((pergunta, indice) => {
        const cartaoPergunta = document.createElement('div');
        cartaoPergunta.className = 'cartao-pergunta';
        cartaoPergunta.innerHTML = `
            <h2>Pergunta ${indice + 1}:</h2>
            <p>${pergunta.pergunta}</p>
            <ul class="lista-respostas">
                ${pergunta.respostas.map((resposta, i) => `<li><button data-resposta="${resposta}" onclick="verificarResposta(this, ${indice})">${resposta}</button></li>`).join('')}
            </ul>
        `;
        gradePerguntas.appendChild(cartaoPergunta);
    });
}

function verificarResposta(botao, indicePergunta) {
    const tema = obterTema();
    const perguntasFiltradas = perguntas.filter(pergunta => pergunta.tema === tema);
    const respostaCerta = perguntasFiltradas[indicePergunta].correta;
    const respostaUsuario = botao.getAttribute('data-resposta');
    const estaCorreta = respostaUsuario === respostaCerta;

    const todasRespostas = botao.closest('.cartao-pergunta').querySelectorAll("button");

    todasRespostas.forEach(function(resposta) {
        resposta.disabled = true;
        resposta.classList.remove("correta", "incorreta");
        if (resposta.getAttribute('data-resposta') === respostaCerta) {
            resposta.classList.add("correta");
        } else if (resposta.getAttribute('data-resposta') === respostaUsuario && !estaCorreta) {
            resposta.classList.add("incorreta");
        }
    });

    if (estaCorreta) {
        quantidadeCertas++;
    } else {
        const respostaCorreta = Array.from(todasRespostas).find(resposta => resposta.getAttribute('data-resposta') === respostaCerta);
        respostaCorreta.classList.add("correta");
    }

    perguntasRespondidas++;
    atualizarPlacar();
}

function atualizarPlacar() {
    const tema = obterTema();
    const totalPerguntas = perguntas.filter(pergunta => pergunta.tema === tema).length;
    if (perguntasRespondidas === totalPerguntas) {
        document.getElementById('quantidade-certas').innerText = quantidadeCertas;
        document.getElementById('quantidade-total').innerText = totalPerguntas;
        document.getElementById('resultado').style.display = 'block';
    }
}

carregarPerguntas();
