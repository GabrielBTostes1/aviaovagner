/* 
=========================================================
RELATÓRIO DE CONSULTORIA ARQUITETURAL
Consultores: Luiz 

1. O que é uma Classe Abstrata e por que a classe genérica 'Voo' não deve ser instanciada no nosso sistema do aeroporto?
R: A classe abstrata é apenas o molde para as classes filhas. Porque como não esta definido o avião, como um cargueiro ou comercial. Dai se instaciarmos, vira um avião fantasma.

2. Como o JavaScript usa a propriedade 'new.target' para simular a proteção de uma classe abstrata?
R: Como o new.target revela a classe, quando tentamos instaciar uma classe abstrata o new vê que é abstrato e não deixa a criação.

3. Defina Polimorfismo com suas palavras e explique como ele resolveu o problema das taxas do Cargueiro e do Voo Comercial.
R: O Polimorfismo atua como sobrescrita de método, para que cada classe tenha sua taxa.
=========================================================
*/


// CLASSE MÃE (ABSTRATA)
class Voo {
    constructor(codigo) {
        // CORREÇÃO 1: Simulação de Classe Abstrata bloqueando o Voo Fantasma
        if (new.target === Voo) {
            throw new Error("Erro de Arquitetura: A classe Voo é abstrata. Não é permitido registrar voos genéricos no radar!");
        }
        this.codigo = codigo;
    }

    calcularTaxaEmbarque() {
        return 50.00; // Taxa base de segurança caso não seja sobrescrita
    }
}

// SUBCLASSE: VOO COMERCIAL
class VooComercial extends Voo {
    constructor(codigo, qtdPassageiros) {
        super(codigo);
        this.qtdPassageiros = qtdPassageiros;
    }

    // CORREÇÃO 2: Polimorfismo aplicado (Sobrescrita de Método)
    calcularTaxaEmbarque() {
        return this.qtdPassageiros * 50.00;
    }
}

// SUBCLASSE: VOO DE CARGA
class VooCarga extends Voo {
    constructor(codigo, toneladas) {
        super(codigo);
        this.toneladas = toneladas;
    }

    // CORREÇÃO 3: Polimorfismo aplicado (Sobrescrita de Método)
    calcularTaxaEmbarque() {
        return this.toneladas * 120.00;
    }
}

// ==========================================
// SEÇÃO DE TESTES E AUDITORIA DO RADAR
// ==========================================

// Teste 1: Testando o bloqueio da Aeronave Fantasma
try {
    console.log("--- TESTE 1: Tentando criar um Voo Genérico ---");
    let vooFantasma = new Voo("GEN-000"); 
    console.log(`Taxa Voo Fantasma: R$ ${vooFantasma.calcularTaxaEmbarque()}`);
} catch (erro) {
    console.error("Segurança do Radar:", erro.message); // Deve barrar aqui!
}

console.log("\n---------------------------------------------\n");

// Teste 2: Testando o Polimorfismo das classes reais
try {
    console.log("--- TESTE 2: Calculando taxas com Polimorfismo ---");
    
    let comercial = new VooComercial("AZUL-10", 150); // 150 passageiros
    let cargueiroPesado = new VooCarga("CARGO-99", 500); // 500 toneladas

    console.log(`Taxa Voo Comercial (${comercial.codigo}): R$ ${comercial.calcularTaxaEmbarque().toFixed(2)}`);
    console.log(`Taxa Voo Cargueiro (${cargueiroPesado.codigo}): R$ ${cargueiroPesado.calcularTaxaEmbarque().toFixed(2)}`);

} catch (erro) {
    console.error("Erro inesperado no sistema:", erro.message);
}