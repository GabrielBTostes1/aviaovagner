/* =========================================================
RELATÓRIO DE AUDITORIA OOP (Mapeamento e Delegação)
Auditores: Luiz e [Nome do Colega]

1. Por que um dado JSON (ex: {id: "123"}) que vem da internet não possui os métodos da nossa classe Voo? Como o comando 'new' resolve isso?
R: Porque O JSON é apenas um texto bruto, não tem regras dentro dele, como se fosse uma caixa de papelão. Quando usamos o comando "new Voo(..)",
O JavaScript pega esse dado bruto e o coloca na estrutura da classe, esse dado bruto agora tem métodos a seguir, e regras.

2. O que aconteceria com a manutenção do sistema se tivéssemos 15 arquivos diferentes avaliando a velocidade do vento manualmente com "IFs", e amanhã a regra mudasse para "ventos > 100"? Por que colocar essa regra dentro do método da Classe Voo salva a nossa vida?
R: Seria muito mais desorganizado, e complicado para fazer alterações, já que teriamos que mexer em cada 1 desses 15 arquivos. Entretanto, na classe Voo, salva a nossas vidas, porque temos um único local para mudar no código.
=========================================================
*/

class Voo {
    #status;

    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
        this.#status = "Aguardando Leitura do Radar";
    }

    get status() { return this.#status; }

    avaliarCondicoesClimaticas(velocidadeDoVento) {
        if (velocidadeDoVento > 80) {
            this.#status = "CANCELADO - Risco de Ciclone";
        } else {
            this.#status = "Liberado para Decolagem";
        }
    }
}

// ---------------------------------------------------------
// SIMULAÇÃO DO SISTEMA PRINCIPAL (Refatorado pelo Auditor Sênior)
// ---------------------------------------------------------

const dadosDaApi = [
    { id_voo: "G3-111", cidade: "Curitiba", vento_kmh: 90 },
    { id_voo: "LA-222", cidade: "São Paulo", vento_kmh: 40 }
];

console.log("Processando dados do Radar...");

// CRIAÇÃO DO ARRAY DE OBJETOS RICOS (Hidratação)
let listaDeVoos = [];

for (let i = 0; i < dadosDaApi.length; i++) {
    let dadoBruto = dadosDaApi[i];
    
    // Mapeamento: Transformando o JSON cru em uma instância da classe Voo
    let novoVoo = new Voo(dadoBruto.id_voo, dadoBruto.cidade);
    
    // Delegação: Deixando a classe decidir o próprio status
    novoVoo.avaliarCondicoesClimaticas(dadoBruto.vento_kmh);
    
    listaDeVoos.push(novoVoo);
}

// EXIBIÇÃO
listaDeVoos.forEach(voo => {
    console.log(`Voo ${voo.codigo} para ${voo.destino} | Status: ${voo.status}`);
});