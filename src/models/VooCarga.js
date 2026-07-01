// A SOLUÇÃO ESTÁ NESTA PRIMEIRA LINHA:
import Voo from './Voo.js';

class VooCarga extends Voo {
    constructor(codigo, origem, destino, capacidadeMaxima) {
        super(codigo, origem, destino, 'Noturno');
        this.capacidadeMaxima = capacidadeMaxima;
        this.cargaAtual = 0;
    }

    embarcarCarga(peso) {
        if (this.cargaAtual + peso <= this.capacidadeMaxima) {
            this.cargaAtual += peso;
            alert(`✅ ${peso}kg carregados!`);
        } else {
            alert("❌ Excesso de peso!");
        }
    }
}

export default VooCarga;