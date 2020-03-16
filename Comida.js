/** 
 * Classe que representa uma comida na simulacao 
 * @author Diogo L.C. Felipe <dlcfelipp@gmail.com>
 */
class Comida {
    /**
     * Criacao de uma comida
     * @param {number} posicaoX - Posicao da comida no eixo x
     * @param {number} posicaoY - Posicao da comida no eico y
     */
    constructor(posicaoX, posicaoY) {

        /** @private */
        this.disponivel = true;
        
        /** @private */
        this.posicaoX = posicaoX;

        /** @private */
        this.posicaoY = posicaoY;

        this.imagem = render.geraImagemComida(this.posicaoX, this.posicaoY);
    }

    /**
     * Verifica se a comida ja foi consumida ou nao
     * @returns {boolean} Disponibilidade da comida 
     */
    estahDisponivel(){
        return this.disponivel;
    }

    /**
     * Pega a posicao cartesiana da comida
     * @returns {number[]} .x e .y da comida
     */
    getPosicao(){
        return {
            x: this.posicaoX,
            y: this.posicaoY
        };
    }

    /**
     * Consome a comida, deixando-a indisponivel
     */
    consumir(){
        this.disponivel = false;
    }

    /**
     * Restaura comida, colocando-a em uma nova posicao
     */
    reseta(){
        this.disponivel = true;
        this.posicaoX = Math.floor(Math.random() * 100);
        this.posicaoY = Math.floor(Math.random() * 100);

        render.renderizaElemento(this.imagem, this.posicaoX, this.posicaoY);
    }
}
