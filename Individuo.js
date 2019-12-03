
class Individuo {
    constructor(energia, velocidade, tamanho, raioDeVisao, posicaoX, posicaoY) {
        this.comidaConsumida = 0;

        this.energiaMax = energia; 
        this.energiaAtual = energia;
        
        this.velocidade = velocidade;
        this.tamanho = tamanho;
        this.raioDeVisao = raioDeVisao;
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;

        this.achouComida = false;
        this.comidaBuscada;
    }

    getQtdComida(){
        return this.comidaConsumida;
    }

    getEnergiaAtual(){
        return this.energiaAtual;
    }

    getVelocidade(){
        return this.velocidade;
    }

    getTamanho(){
        return this.tamanho;
    }

    getRaioDeVisao(){
        return this.raioDeVisao;
    }

    getPosicao(){
        console.log("X: " + this.posicaoX + ", Y: " + this.posicaoY);

        return {
            x: this.posicaoX,
            y: this.posicaoY
        };
    }

    iniciarDia(listaComidas){

        if(this.achouComida == true){
            this.segueComida(this.comidaBuscada);
        } else {
            let versorX = Math.floor((Math.random() * 3) - 1);
            let versorY = Math.floor((Math.random() * 3) - 1);
    
            this.move(versorX, versorY);

            this.procuraComida(listaComidas);
        }
    }

    segueComida(comida){
        let versorX, versorY;

        let vetorDirecaoX = comida.getPosicao().x - this.posicaoX;
        let vetorDirecaoY = comida.getPosicao().y - this.posicaoY;
        
        if(vetorDirecaoX > 0){
            versorX = 1;
        } else if(vetorDirecaoX < 0) {
            versorX = -1;
        } else {
            versorX = 0;
        }

        if(vetorDirecaoY > 0){
            versorY = 1;
        } else if(vetorDirecaoY < 0) {
            versorY = -1;
        } else {
            versorY = 0;
        }
        
        this.move(versorX, versorY);

        if(this.getDistanciaComida(vetorDirecaoX, vetorDirecaoY) == 0 &&
            this.comidaConsumida < 2 && comida.estahDisponivel()){

            this.come(comida);

        }

        return;
    }

    procuraComida(listaComidas){
        listaComidas.forEach(comida => {
            let vetorDirecaoX = comida.getPosicao().x - this.posicaoX;
            let vetorDirecaoY = comida.getPosicao().y - this.posicaoY;

            if(comida.estahDisponivel()){                
                if(this.getDistanciaComida(vetorDirecaoX, vetorDirecaoY) < this.raioDeVisao &&
                    this.comidaConsumida < 2 &&
                    this.achouComida == false){
                        this.comidaBuscada = comida;
                        this.achouComida = true;
                        return;
                }
            }
        });
    }

    move(direcaoX, direcaoY){
        if(this.energiaAtual > 0){
            this.posicaoX = this.posicaoX + direcaoX * this.velocidade; 
            this.posicaoY = this.posicaoY + direcaoY * this.velocidade;
    
            this.perdeEnergia();
        }
    }

    moveCasa(){
        console.log("INDO PARA CASA POR IMPLEMENTAR");
    }
    
    come(comida){
        this.comidaConsumida++;
        comida.consumir();
        this.achouComida = false;
        this.comidaBuscada = null;
    }

    getDistanciaComida(vetorDirecaoX, vetorDirecaoY){
        return Math.sqrt(Math.pow(vetorDirecaoX, 2) + Math.pow(vetorDirecaoY, 2));
    }
    
    perdeEnergia(){
        this.energiaAtual = this.energiaAtual - this.velocidade;
    }

    ganhaEnergia(acressimoEnergia){
        this.energiaAtual = this.energiaAtual + acressimoEnergia;
    }

    reproduz(listaIndividuos){
        
        this.velocidade = this.geraMutacao(5, this.velocidade)

        listaIndividuos.push(new Individuo(this.energiaMax, this.velocidade, this.tamanho, this.raioDeVisao, this.posicaoX, this.posicaoY));
    }

    geraMutacao(chanceDeMutacao, caracteristica){
        let fatorDeMutacao = Math.random() * 100;

        if(fatorDeMutacao < (chanceDeMutacao - 1)){
            return caracteristica + 1;
        } else if(fatorDeMutacao < (chanceDeMutacao * 2 - 1)){
            if(caracteristica - 1 > 0){
                return caracteristica - 1;
            }
            return caracteristica;
        } else {
            return caracteristica;
        }
    }

    reseta(){
        this.comidaConsumida = 0;
        this.energiaAtual = this.energiaMax;
        this.achouComida = false;
        this.comidaBuscada = null;
    }
}
