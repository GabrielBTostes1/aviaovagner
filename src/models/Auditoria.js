

/* RELATÓRIO DE AUDITORIA VIP
Auditores: [Luiz Gustavo] 

1. Por que o código quebrou na linha do constructor do PassageiroVIP? O que faltava e para que serve?
R: Quebrou porque quando usamos herança (extends), a subclasse é obrigada a chamar o método super() antes de usar a palavra this. O super() serve para disparar o construtor da classe mãe (Passageiro) e inicializar as propriedades herdadas como o nome e o CPF.

2. Por que o método exibirCredencial() deu erro de privacidade? Como resolvemos isso usando o concept de Getter?
R: Deu erro porque o atributo #cpf possui a hashtag (#), o que o torna privado da classe Passageiro. Subclasses não podem acessá-lo diretamente. Resolvemos isso chamando o Getter 'lerCpf' que foi criado justamente para permitir a leitura desse dado.

3. Por que a linha cliente1.#cpf = "000..." é considerada uma falha de segurança (Encapsulamento)?
R: É uma falha porque viola o princípio do encapsulamento. Dados privados não podem ser alterados diretamente por fora da classe. Se qualquer um puder mudar o CPF à força, o sistema perde a confiabilidade e abre brechas de segurança.
*/

class Passageiro {
    #cpf; // Dado sensível, protegido por lei!
    
    constructor(nome, cpfPassado) {
        this.nome = nome;
        this.#cpf = cpfPassado;
    }

    // Getter correto para ler o atributo privado
    get lerCpf() {
        return this.#cpf;
    }
}

class PassageiroVIP extends Passageiro {
    constructor(nome, cpfPassado, categoriaLounge) {
        // CORREÇÃO 1: Adicionado o super() para construir a classe mãe primeiro
        super(nome, cpfPassado); 
        this.categoriaLounge = categoriaLounge; 
    }

    exibirCredencial() {
        // CORREÇÃO 2: Mudado de this.#cpf para o getter: this.lerCpf
        console.log(`Passageiro VIP: ${this.nome} | CPF: ${this.lerCpf} | Lounge: ${this.categoriaLounge}`);
    }
}

try {
    console.log("Iniciando sistema de embarque VIP...");
    
    let cliente1 = new PassageiroVIP("Ana Souza", "111.222.333-44", "Diamante");
    
    
    cliente1.exibirCredencial();

} catch (erro) {
    console.error("ALERTA CRÍTICO NO PORTÃO DE EMBARQUE:", erro.message);
}