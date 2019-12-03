
class Comida {
    constructor(posicaoX, posicaoY) {
        this.disponivel = true;
        
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
    }

    estahDisponivel(){
        return this.disponivel;
    }

    getPosicao(){
        return {
            x: this.posicaoX,
            y: this.posicaoY
        };
    }

    consumir(){
        this.disponivel = false;
    }

    reseta(){
        this.disponivel = true;
        this.posicaoX = Math.floor(Math.random() * 100);
        this.posicaoY = Math.floor(Math.random() * 100);
    }
}
