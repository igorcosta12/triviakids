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
