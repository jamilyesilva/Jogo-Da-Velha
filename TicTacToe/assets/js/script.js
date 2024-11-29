const a1 = document.querySelector("#a1 img");
const a2 = document.querySelector("#a2 img");
const a3 = document.querySelector("#a3 img");
const b1 = document.querySelector("#b1 img");
const b2 = document.querySelector("#b2 img");
const b3 = document.querySelector("#b3 img");
const c1 = document.querySelector("#c1 img");
const c2 = document.querySelector("#c2 img");
const c3 = document.querySelector("#c3 img");

const bloco_mensagem = document.querySelector(".bloco_mensagem");
const mensagem_p = document.querySelector(".mensagem_p");


const combinacoesVencedoras = [
    [a1, a2, a3],
    [b1, b2, b3],
    [c1, c2, c3],
    [a1, b1, c1],
    [a2, b2, c2],
    [a3, b3, c3],
    [a1, b2, c3],
    [a3, b2, c1]
];

const X = 'assets/img/X.png'; 
const circulo = 'assets/img/circle.png';

let i = 0; 

const areas = document.querySelectorAll(".area img");

const botao_reiniciar = document.querySelector(".botao_reiniciar")
botao_reiniciar.addEventListener("click", () => {
    console.log("Botão clicado");
    iniciarJogo(areas)
})

let lugares = [];
areas.forEach((area) => {
    lugares.push(area);
})
console.log(lugares)

let local = document.querySelector(".local");
let bot = document.querySelector(".bot");

function turnos() {
    if (i % 2 === 0) {
        AplicarX();
    } else {
        if (local.checked) {
            console.log("Jogando Local")
            
            AplicarCircle();
            
        }

        if(bot.checked) {
            console.log("Jogando bot")
            
            JogarBot()
            
        }
    } 
    
    if (ChecarJogoX()) {
        console.log("O X venceu!");
        i = 0
        areas.forEach((area) => {
            area.removeEventListener("click", handleCircleClick);
            area.removeEventListener("click", handleXClick); 
        })

        bloco_mensagem.classList.remove('hidden');
        mensagem_p.innerText = "A pucca venceu!";

        return i;
    }

    if (ChecarJogoCircle()) {
        console.log("O círculo venceu!");
        areas.forEach((area) => {
            area.removeEventListener("click", handleCircleClick);
            area.removeEventListener("click", handleXClick); 
        })

        bloco_mensagem.classList.remove('hidden');
        mensagem_p.innerText = "O Garu venceu!";

        i = 0
        return i; 
    }

    if (ChecarVelha()) {
        console.log("O jogo deu velha!");
        areas.forEach((area) => {
            area.removeEventListener("click", handleCircleClick);
            area.removeEventListener("click", handleXClick); 
        })

        bloco_mensagem.classList.remove('hidden');
        mensagem_p.innerText = "O jogo deu velha!";

        i = 0
        return i; 
    }
    // if((!ChecarJogoCircle() && !ChecarJogoX()  ))

    i++; // Incrementa o turno após cada jogada
    console.log(i); // Mostra no console o número do turno
}

// Função para aplicar o círculo ("O")
function AplicarCircle() {
    areas.forEach((area) => {
        area.removeEventListener("click", handleXClick); // Remove o evento de "X"
        area.addEventListener("click", handleCircleClick, { once: true }); // Adiciona o evento de "O" apenas uma vez
    });
}

// Função de clique para o círculo ("O")
function handleCircleClick(event) {
    const area = event.target;
    if (area.getAttribute('src') == "assets/img/transp.png") {
        area.removeAttribute('src');
        area.setAttribute('src', circulo); // Define a imagem do círculo
        turnos(); // Chama a função turnos para alternar o turno
    }
}

// Função para aplicar o "X"
function AplicarX() {
    areas.forEach((area) => {
        area.removeEventListener("click", handleCircleClick); // Remove o evento de "O"
        area.addEventListener("click", handleXClick, { once: true }); // Adiciona o evento de "X" apenas uma vez
    });
}

// Função de clique para o "X"
function handleXClick(event) {
    const area = event.target;
    if (area.getAttribute('src') == "assets/img/transp.png") {
        area.removeAttribute('src');
        area.setAttribute('src', X); // Define a imagem do "X"
        turnos(); // Chama a função turnos para alternar o turno
    }
}

// Função inicial para configurar o jogo
function iniciarJogo() {
    areas.forEach((area) => {
        area.removeAttribute('src');
        area.setAttribute('src', 'assets/img/transp.png'); // Inicia todas as células com a imagem transparente
        area.removeEventListener("click", handleXClick); // Remove eventos de clique anteriores para "X"
        area.removeEventListener("click", handleCircleClick); // Remove eventos de clique anteriores para "O"
    });
    bloco_mensagem.classList.add("hidden");
    console.log("Jogo iniciado");

    i = 0; // Certifique-se de que i é uma variável global
    turnos(); // Começa o jogo
}


function ChecarJogoCircle() {
    for (let combinacao of combinacoesVencedoras) {
        if (combinacao.every(area => area.getAttribute('src') === circulo)) {
            return true;
        }
    }
    return false;
}

function ChecarJogoX() {
    for (let combinacao of combinacoesVencedoras) {
        if (combinacao.every(area => area.getAttribute('src') === X)) {
            return true;
        }
    }
    return false;
}

function ChecarVelha() {
    let todasPreenchidas = true
    areas.forEach((area) => {
        if (area.getAttribute('src') === 'assets/img/transp.png') {
            todasPreenchidas = false
        }
        })
    return todasPreenchidas
}

function JogarBot() {
    // Tentar vencer em uma jogada
    for (let combinacao of combinacoesVencedoras) {
        const [area1, area2, area3] = combinacao;
        if (area1.getAttribute('src') === circulo && area2.getAttribute('src') === circulo && area3.getAttribute('src') === 'assets/img/transp.png') {
            area3.setAttribute('src', circulo);
            return;
        }
        if (area1.getAttribute('src') === circulo && area3.getAttribute('src') === circulo && area2.getAttribute('src') === 'assets/img/transp.png') {
            area2.setAttribute('src', circulo);
            return;
        }
        if (area2.getAttribute('src') === circulo && area3.getAttribute('src') === circulo && area1.getAttribute('src') === 'assets/img/transp.png') {
            area1.setAttribute('src', circulo);
            return;
        }
    }

    // Bloquear o jogador se ele estiver prestes a vencer
    for (let combinacao of combinacoesVencedoras) {
        const [area1, area2, area3] = combinacao;
        if (area1.getAttribute('src') === X && area2.getAttribute('src') === X && area3.getAttribute('src') === 'assets/img/transp.png') {
            area3.setAttribute('src', circulo);
            i++
            return i;
        }
        if (area1.getAttribute('src') === X && area3.getAttribute('src') === X && area2.getAttribute('src') === 'assets/img/transp.png') {
            area2.setAttribute('src', circulo);
            i++
            return i;
        }
        if (area2.getAttribute('src') === X && area3.getAttribute('src') === X && area1.getAttribute('src') === 'assets/img/transp.png') {
            area1.setAttribute('src', circulo);
            i++
            return i;
        }
    }

    // Jogar estrategicamente se não puder vencer ou bloquear
    // Priorizar o centro
    if (b2.getAttribute('src') === 'assets/img/transp.png') {
        b2.setAttribute('src', circulo);
        i++
        return i;
    }

    // Depois, priorizar os cantos
    const cantos = [a1, a3, c1, c3];
    for (let canto of cantos) {
        if (canto.getAttribute('src') === 'assets/img/transp.png') {
            canto.setAttribute('src', circulo);
            i++
            return i;
        }
    }

    // Finalmente, jogar nas bordas
    const bordas = [a2, b1, b3, c2];
    for (let borda of bordas) {
        if (borda.getAttribute('src') === 'assets/img/transp.png') {
            borda.setAttribute('src', circulo);
            i++
            return i;
        }
    }
}




// Iniciar o jogo
iniciarJogo();
