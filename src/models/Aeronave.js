class Aeronave {
    constructor(modelo, nivelCombustivel, motor,altitude,local) {
        this.modelo = modelo;
        this.nivelCombustivel = nivelCombustivel;
        this.motor = motor;
        this.altitude=altitude;
        this.local=local

        this.estaNoAr=false
    }

    decolar() {
      if (this.nivelCombustivel>0) {
          this.estaNoAr=true; 
          console.log(`A aeronave está no ar na altiude ${this.altitude}`)
      }else{
        console.log("Avião sem combustivel")
      }
       
    }
    pousar(){
        this.estaNoAr=false
        console.log(`O avião pousou com sucesso em ${this.local}`)
    }
}