/* 
=========================================================
RELATÓRIO DE AUDITORIA DE BIG DATA (Paradigma Funcional)
Auditores: Luiz Gustavo

1. Defina com suas palavras a diferença entre '.filter()' e '.map()'. O que o Array de saída tem de diferente do Array de entrada em cada caso?
R: O 'filter()' literalmente filtra o seu array, fazendo-o diminuir de tamanho. Já o "map()" apenas muda a propriedade do dado para ele aparecer. Não mexendo no tamanho do array.

2. O que o método '.reduce()' faz? Por que ele precisa de um parâmetro extra (o "acumulador") que o map e filter não precisam?
R: Ele junta todos os valores do array em um unico valor. Ele precisa do acumulador para salvar o valor que ele irá somar com o próximo valor do array, e assim por diante, até chegar no final do array.

3. Por que o código usando "filter/map/reduce" (Declarativo) é considerado melhor no mercado de trabalho do que um monte de laços "for" (Imperativo)?
R: Pois é mais limpo e mais fácil de entender, do que o "for", que utiliza varias variaveis e laços, que pode acabar confundindo o programador.
=========================================================
*/

// SISTEMA DE RELATÓRIOS DO AEROPORTO - ESCRITO PELO DEV JÚNIOR
// Problema: Uso excessivo de laços 'for' gerando código imperativo longo.

class Voo {
    constructor(codigo, companhia, status, passageiros) {
        this.codigo = codigo;
        this.companhia = companhia;
        this.status = status;
        this.passageiros = passageiros;
    }
}

// Simulando nosso Array de Objetos já "Hidratados" (Instâncias reais)
const frotaAtiva = [
    new Voo("G3-111", "Gol", "Confirmado", 150),
    new Voo("LA-222", "Latam", "Atrasado", 200),
    new Voo("AD-333", "Azul", "Atrasado", 120),
    new Voo("AF-444", "AirFrance", "No Solo", 300)
];

console.log("=== RELATÓRIO DO DEV JÚNIOR ===");
let codigosAtrasados = frotaAtiva.filter(voo => voo.status=="Atrasado").map(voo=>voo.codigo);
console.log("Voos Atrasados:", codigosAtrasados);


let totalPassageiros = frotaAtiva.reduce((acumulador, voo)=> acumulador+voo.passageiros,0);
console.log("Total de Passageiros voando:", totalPassageiros);