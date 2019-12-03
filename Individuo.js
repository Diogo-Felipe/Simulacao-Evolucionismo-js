
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
    }

    getQtdComida(){
        return this.comida;
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

    procuraComida(listaComidas){
        let versorX, versorY;

        listaComidas.forEach(comida => {
            if(comida.estahDisponivel()){
                let vetorDirecaoX = comida.getPosicao().x - this.posicaoX;
                let vetorDirecaoY = comida.getPosicao().y - this.posicaoY;
    
                if(this.getDistanciaComida(vetorDirecaoX, vetorDirecaoY) == 0 && this.comidaConsumida < 2){

                    this.come(comida);

                } else if(this.getDistanciaComida(vetorDirecaoX, vetorDirecaoY) < this.raioDeVisao){
                    
                    if(this.comidaConsumida < 2){
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
                        return;
                    } else {
                        this.moveCasa();
                        this.energiaAtual = 0;
                        return;
                    }
                }
            }
        });

        versorX = Math.floor((Math.random() * 3) - 1);
        versorY = Math.floor((Math.random() * 3) - 1);

        this.move(versorX, versorY);
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
        } else {
            return caracteristica;
        }
    }
}
