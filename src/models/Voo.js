class Voo {
    #altitude; // Propriedade privada

    constructor(codigo, origem, destino, horario) {
        if (origem === destino) {
            // Isso gera um ERRO VERMELHO e paralisa a criação do objeto!
            throw new Error(`Operação Negada: O voo ${codigo} não pode ter a origem igual ao destino!`);
        }
        if (codigo === "") {
            throw new Error("Erro de Segurança: Todo voo precisa de um código.");
        }

        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.status = 'No portão de embarque';
        this.#altitude = 0;
    }

    // GETTER: Para ler a altitude
    get altitude() {
        return this.#altitude;
    }

    // SETTER: Para mudar a altitude com segurança
    set altitude(valor) {
        if (this.status === 'Em voo 🛫' || valor === 0) {
            this.#altitude = valor;
        }
    }

    // NOVO MÉTODO: Mudar Rota e Destino
    mudarRota(novaOrigem, novoDestino) {
        this.origem = novaOrigem;
        this.destino = novoDestino;
        
        // Se for o voo principal, atualiza o SPAN 'rota' no HTML
        const elementoRota = document.getElementById('rota');
        if (elementoRota && this.codigo === meuVoo.codigo) {
            elementoRota.innerText = `${this.origem} ➔ ${this.destino}`;
        }
        console.log(`Rota alterada: ${this.origem} para ${this.destino}`);
    }

    atualizarStatus(novoStatus, classeCss) {
        this.status = novoStatus;
        const elementoStatus = document.getElementById('status');
        if (elementoStatus) {
            elementoStatus.innerText = this.status;
            elementoStatus.className = ''; 
            if (classeCss) elementoStatus.classList.add(classeCss);
        }
    }

    decolar() {
        if (this.status !== 'Em voo 🛫') {
            this.atualizarStatus('Em voo 🛫', 'status-voando');
            this.altitude = 10000;
            const imgAviao = document.getElementById('imagem-aviao');
            if (imgAviao) imgAviao.classList.add('voando');
        }
    }

    pousar() {
        if (this.status === 'Em voo 🛫') {
            this.atualizarStatus('Pousado com segurança 🛬', 'status-pousado');
            this.altitude = 0;
            const imgAviao = document.getElementById('imagem-aviao');
            if (imgAviao) imgAviao.classList.remove('voando');
        }
    }
}
export default Voo;