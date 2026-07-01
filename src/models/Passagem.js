/**
 * Classe que representa um Passageiro físico dentro do aeroporto.
 * Ela guarda as informações pessoais e o status do cliente.
 */
class Passagem {
    
    /**
     * O método construtor é chamado quando um novo passageiro chega ao aeroporto.
     * @param {string} nome - O nome completo do passageiro.
     * @param {number} cpf - O documento de identificação único.
     * @param {number} dataNascimento - A data de nascimento para validar maioridade/descontos.
     */
    constructor(nome, cpf, conexao,dataNascimento, horario) {
        // Atributos de identificação
        this.nome = nome;
        this.cpf = cpf;
        this.conexao = conexao;
        this.dataNascimento=dataNascimento
        this.horario=horario
        
        // Atributo de estado: Todo passageiro começa fora da área de embarque
        this.noAeroporto = false;
    }

    /**
     * Método responsável por simular a passagem do cliente pela catraca de segurança.
     * Ação: Muda o status do passageiro para indicar que ele está pronto para voar.
     */
    chegarNoAeroporto() {
        this.noAeroporto = true;
        console.log(`Passageiro ${this.nome} esta no aeroporto`);
    }

    /**
     * Método para atualizar os dados do passageiro caso haja erro de digitação.
     * @param {string} novoNome - O nome corrigido.
     */
    AtualizarPassagem(novoNome) {
        this.nome = novoNome;
        console.log(`Nome atualizado para: ${this.nome}`);
    }
}

// Exporta a classe para ser usada em outros arquivos (Modularização)
export default Passagem;
