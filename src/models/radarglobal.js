/* 
=========================================================
DOCUMENTAÇÃO DE DEPLOY E ARQUITETURA - AV1
Auditores: [Seu Nome Completo] e [Nome da sua Dupla]

1. Como você usou o Polimorfismo na função iniciarRadar() para exibir informações diferentes sem precisar usar um monte de IFs na hora de escrever no HTML?
R: Na etapa de mapeamento dos dados da API, instanciamos a classe filha específica (`VooComercial` ou `VooCarga`) de acordo com o tipo do voo. Como ambas herdam de `Voo` e sobrescrevem o método `gerarRelatorio()`, ao renderizar no HTML chamamos apenas `voo.gerarRelatorio()`. Cada objeto executa automaticamente sua própria implementação sem a necessidade de condicionais (if/else) no loop de renderização.

2. O que a IA explicou sobre o perigo de expor API Keys no código Front-end? O que são Variáveis de Ambiente?
R: Deixar API Keys salvas no código client-side expõe credenciais diretamente no navegador do usuário (via DevTools), permitindo roubo de chaves, ataques cibernéticos e uso indevido de cotas pagas. Variáveis de Ambiente (.env) são configurações armazenadas com segurança no ambiente do servidor/build. Plataformas como Vercel e Netlify injetam essas variáveis durante o deploy, mantendo o repositório no GitHub limpo e seguro.
=========================================================
*/

// 1. AS CLASSES (Mãe e Filhas)
class Voo {
    constructor(codigo) { 
        this.codigo = codigo; 
    }
    gerarRelatorio() { 
        return `Voo genérico ${this.codigo}`; 
    }
}

class VooComercial extends Voo {
    constructor(codigo, passageiros) {
        super(codigo);
        this.passageiros = passageiros;
    }
    gerarRelatorio() { 
        return `✈️ Comercial [${this.codigo}] - ${this.passageiros} vidas a bordo.`; 
    }
}

class VooCarga extends Voo {
    constructor(codigo, cargaToneladas) {
        super(codigo);
        this.cargaToneladas = cargaToneladas;
    }
    gerarRelatorio() { 
        return `📦 Cargueiro [${this.codigo}] - ${this.cargaToneladas}T de carga.`; 
    }
}

// 2. A CORREÇÃO DE SEGURANÇA
// A chave secreta API_KEY foi removida do código aberto.

// 3. A SIMULAÇÃO DE DADOS DA INTERNET
const dadosDaAPI = [
    { id: "G3-100", tipo: "comercial", qtd: 150 },
    { id: "AZ-999", tipo: "carga", qtd: 80 },
    { id: "LA-200", tipo: "comercial", qtd: 200 }
];

// 4. CORREÇÃO ARQUITETURAL (POLIMORFISMO + FACTORY PATTERN)
async function iniciarRadar() {
    // Log seguro sem expor credenciais
    console.log("Conectando ao satélite global de forma segura...");
    
    let painel = document.getElementById("telaPainel");
    if (!painel) return;
    painel.innerHTML = "";

    // Instanciação dinâmica da classe correta baseada no tipo da API
    let voosProcessados = dadosDaAPI.map(dado => {
        if (dado.tipo === "comercial") {
            return new VooComercial(dado.id, dado.qtd);
        } else if (dado.tipo === "carga") {
            return new VooCarga(dado.id, dado.qtd);
        } else {
            return new Voo(dado.id);
        }
    });

    // Chamada polimórfica: voo.gerarRelatorio() decide sozinho qual texto/ícone exibir!
    voosProcessados.forEach(voo => {
        let div = document.createElement("div");
        div.className = "card-voo";
        div.innerHTML = `<h3>${voo.gerarRelatorio()}</h3>`;
        painel.appendChild(div);
    });
}

iniciarRadar();