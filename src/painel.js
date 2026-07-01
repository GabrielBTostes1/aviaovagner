// ==========================================
// 1. IMPORTS (Sempre no topo do arquivo!)
// ==========================================
import Voo from './models/Voo.js';
import JatoExecutivo from './models/Voorapido.js';
import VooCarga from './models/VooCarga.js';

// =========================================
// 2. INICIALIZAÇÃO DOS OBJETOS
// =========================================
const meuVoo = new Voo('JS1024', 'São Paulo', 'Tóquio', '14:30');
const meuJato = new JatoExecutivo('JT-001', 'Rio', 'Nova York');
const meuCargueiro = new VooCarga('CG-999', 'Manaus', 'Miami', 50000);
    

function carregarDadosIniciais() {
    // Painel Principal
    document.getElementById('codigo').innerText = meuVoo.codigo;
    document.getElementById('rota').innerText = `${meuVoo.origem} ➔ ${meuVoo.destino}`;
    document.getElementById('horario').innerText = meuVoo.horario;
    document.getElementById('status').innerText = meuVoo.status;

    // Painel Jato
    document.getElementById('jato-codigo').innerText = meuJato.codigo;
    atualizarPainelJato();

    // Painel Carga
    document.getElementById('carga-codigo').innerText = meuCargueiro.codigo;
    document.getElementById('carga-max').innerText = meuCargueiro.capacidadeMaxima;
    document.getElementById('carga-atual').innerText = meuCargueiro.cargaAtual;
}

function atualizarPainelJato() {
    document.getElementById('jato-altitude').innerText = meuJato.altitude;
    document.getElementById('jato-status-super').innerText = meuJato.modoSupersonico ? 'Ativado 🔥' : 'Desativado';
}

document.getElementById('btn-registrar').addEventListener('click', () => {
    let origemDigitada = document.getElementById('input-origem').value;
    let destinoDigitado = document.getElementById('input-destino').value;
    let mensagemTela = document.getElementById('avisoSistema');

    try {
        const novoVoo = new Voo("NEW-777", origemDigitada, destinoDigitado, "12:00"); 

        
        meuVoo.origem = novoVoo.origem;
        meuVoo.destino = novoVoo.destino;
        meuVoo.codigo = novoVoo.codigo;

        // 3. MANDAMOS A TELA SE ATUALIZAR
        carregarDadosIniciais();

        mensagemTela.innerText = "Voo cadastrado com sucesso!";
        mensagemTela.style.color = "green";

        // Limpa os campos para o próximo registro
        document.getElementById('input-origem').value = "";
        document.getElementById('input-destino').value = "";

    }
    catch (erro) {
        console.error("Ops, algo deu errado. A equipe de resgate foi acionada.");
        // Mostra o erro na tela (Pega a mensagem que escrevemos lá no throw)
        mensagemTela.innerText = erro.message; 
        mensagemTela.style.color = "red";
    } 
    finally {
        console.log("Tentativa de registro finalizada no sistema.");
    }
});

// Painel Principal
document.getElementById('btn-decolar').addEventListener('click', () => meuVoo.decolar());
document.getElementById('btn-pousar').addEventListener('click', () => meuVoo.pousar());

// Painel Jato
document.getElementById('btn-jato-decolar').addEventListener('click', () => {
    meuJato.decolar();
    atualizarPainelJato();
});
document.getElementById('btn-jato-pousar').addEventListener('click', () => {
    meuJato.pousar();
    atualizarPainelJato();
});
document.getElementById('btn-super-on').addEventListener('click', () => {
    meuJato.ativarSupersonico();
    atualizarPainelJato();
});
document.getElementById('btn-super-off').addEventListener('click', () => {
    meuJato.desativarSupersonico();
    atualizarPainelJato();
});

// Painel Carga
document.getElementById('btn-embarcar').addEventListener('click', () => {
    const peso = parseInt(document.getElementById('input-peso').value);
    if (peso > 0) {
        meuCargueiro.embarcarCarga(peso);
        document.getElementById('carga-atual').innerText = meuCargueiro.cargaAtual;
        document.getElementById('input-peso').value = '';
    }
});

// Inicializa tudo ao carregar a página
carregarDadosIniciais();