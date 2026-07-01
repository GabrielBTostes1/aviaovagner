class Passageiro{
    constructor(nome,cpf,dataNascimento,email){
        this.nome=nome;
        this.cpf=cpf;
        this.dataNascimento=dataNascimento;
        this.email=email;

        this.estaNoEmbarque=false;
    }

    estanoAvião(){
        this.estaNoEmbarque=true;
        console.log(`O passageiro ${this.nome} está no embarque!`)
    }
    


}export default Passageiro