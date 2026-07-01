/* =========================================================
RELATÓRIO DE CONECTIVIDADE (Async/Await & UX)
Auditores: Aluno A e Aluno B

1. Por que é impossível conectar um sistema na internet sem lidar com o "Assincronismo" (espera)? O que o "await" faz literalmente com a execução do código?
R: A internet não é algo que acontece instantaneamente e as respostas levam um tempo para chegar. Se o código fosse escrito de forma síncrona, o navegador inteiro ficaria travado, esperando a resposta chegar. É aí que entra o papel do “await". Ele faz com que o código pare naquela linha específica e espere o resultado chegar antes de continuar executando a próxima linha.

2. O que acontece com a Experiência do Usuário (UX) se não colocarmos uma mensagem de "Loading..." antes do fetch? 
R: A tela parece que travou ou que o sistema parou de funcionar. O usuário fica na dúvida se o clique foi efetivo ou se a página simplesmente congelou. Isso causa bastante frustração.

3. Para que serve o bloco 'finally' em uma requisição de internet? Por que ele é o lugar perfeito para esconder a animação/texto de "Loading"?
R: O finally é muito útil para garantir que um código específico seja executado independentemente do resultado da operação anterior. Isso é especialmente importante quando se trata de remover o indicador de “Loading” da tela, pois é essencial que ele desapareça tanto quando os dados são carregados com sucesso quanto quando ocorre um erro. Dessa forma, o finally nos permite ter certeza de que o aviso de carregamento será removido em qualquer situação.
=========================================================
*/

class Voo {
    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
    }
}

class RadarService {
    async buscarVoosGlobais() {
        try {
            let resposta = await fetch("https://jsonplaceholder.typicode.com/todos");
            
            if (!resposta.ok) {
                throw new Error("Erro na rede");
            }
            
            let dadosJson = await resposta.json();
            
            let dadosCortados = dadosJson.slice(0, 5);
            
            let voosRicos = dadosCortados.map(dado => new Voo(dado.id, "Destino " + dado.title.substring(0, 10)));
            
            return voosRicos;
        } catch (erro) {
            throw erro;
        }
    }
}

let painelDOM = document.getElementById("telaPainel");
let radar = new RadarService();

async function iniciarSistema() {
    painelDOM.innerHTML = "Buscando dados no satélite... 📡";
    
    try {
        let listaPronta = await radar.buscarVoosGlobais();
        painelDOM.innerHTML = `Sucesso! Temos ${listaPronta.length} voos no radar.`;
    } catch (erro) {
        painelDOM.innerHTML = "Falha de Conexão com o Satélite! ❌";
    }
}

iniciarSistema();