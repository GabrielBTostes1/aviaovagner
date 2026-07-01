// A SOLUÇÃO ESTÁ NESTA PRIMEIRA LINHA:
import Voo from './Voo.js';

class JatoExecutivo extends Voo {
    constructor(codigo, origem, destino) {
        super(codigo, origem, destino, 'Imediato');
        this.modoSupersonico = false;
    }

    ativarSupersonico() {
        if (this.status === 'Em voo 🛫') {
            this.modoSupersonico = true;
            this.altitude = 60000;
        } else {
            alert('Decole o jato primeiro!');
        }
    }

    desativarSupersonico() {
        this.modoSupersonico = false;
        this.altitude = 10000;
    }

    pousar() {
        super.pousar();
        this.modoSupersonico = false;
    }
}

export default JatoExecutivo;