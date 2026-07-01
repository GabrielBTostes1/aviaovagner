import Voo from './Voo.js';

export default class Aeroporto {
    constructor(nomeDaBase) {
        this.nome = nomeDaBase;
        this.listaDeVoos = []; // Array vazio aguardando aeronaves
    }

    // DESAFIO 1: Resolvido usando .push()
    adicionarVooNoRadar(novoVoo) {
        // O método .push() empurra o novo objeto voo para o final da nossa lista (array)
        this.listaDeVoos.push(novoVoo);
        
        console.log(`Voo ${novoVoo.codigo} adicionado ao radar do aeroporto ${this.nome}.`);
    }

    // DESAFIO 2: Resolvido usando .find()
    buscarVoo(codigoProcurado) {
        // O .find() percorre o array. Para cada 'v' (voo), ele checa se o código bate com o procurado.
        let vooAchado = this.listaDeVoos.find(v => v.codigo === codigoProcurado);
        
        // Se encontrar ele retorna o objeto, se não, retorna a mensagem de erro pedida
        if (vooAchado) {
            return vooAchado;
        } else {
            return `🚨 Erro: Voo com o código ${codigoProcurado} não foi localizado no radar!`;
        }
    }
}