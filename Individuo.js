/**
 * Classe que representa um individuo na simulacao
 * @author Diogo L.C. Felipe <dlcfelipp@gmail.com>
 */
class Individuo {
    /**
     * Cria um individuo da especie
     * @param {number} energia - Energia disponivel para o individuo
     * @param {number} velocidade - Quantidade de unidades de espaco que o individuo se move por unidade de tempo
     * @param {number} tamanho - Tamanho do individuo
     * @param {number} raioDeVisao - Distancia limite de deteccao de comida do individuo
     * @param {number} posicaoX - Posicao no eixo x do individuo
     * @param {number} posicaoY - Posicao no eixo y do individuo
     */
    constructor(energia, velocidade, tamanho, raioDeVisao, posicaoX, posicaoY) {
        /** @private */
        this.comidaConsumida = 0;

        /** @private */
        this.energiaMax = energia; 
        /** @private */
        this.energiaAtual = energia;
        
        /** @private */
        this.velocidade = velocidade;
        /** @private */
        this.tamanho = tamanho;
        /** @private */
        this.raioDeVisao = raioDeVisao;
        /** @private */
        this.posicaoX = posicaoX;
        /** @private */
        this.posicaoY = posicaoY;

        /** @private */
        this.achouComida = false;
        /** @private */
        this.comidaBuscada;

        /** @private */
        this.possuiCaminhoBusca = false;
        /** @private */
        this.direcaoBuscaX;
        /** @private */
        this.direcaoBuscaY;

        /** @private */
        this.chanceDeMutacao = 5;
    }

    /**
     * Retorna quantidade de comida consumida pelo individuo
     * @returns {number} Quantidade de comida consumida
     */
    getQtdComida(){
        return this.comidaConsumida;
    }

    /**
     * Retorna quantidade de energia disponivel 
     * @returns {number} Energia atual (Disponivel)
     */
    getEnergiaAtual(){
        return this.energiaAtual;
    }

    /**
     * Retorna velocidade 
     * @returns {number} Velocidade
     */
    getVelocidade(){
        return this.velocidade;
    }

    /**
     * Retorna o tamanho 
     * @returns {number} Tamanho
     */
    getTamanho(){
        return this.tamanho;
    }

    /**
     * Retorna o limite de deteccao de uma comida 
     * @returns {number} Raio de visao
     */
    getRaioDeVisao(){
        return this.raioDeVisao;
    }

    /**
     * Pega a posicao cartesiana do individuo
     * @returns {number[]} .x e .y do individuo
     */
    getPosicao(){
        console.log("X: " + this.posicaoX + ", Y: " + this.posicaoY);

        return {
            x: this.posicaoX,
            y: this.posicaoY
        };
    }

    /**
     * Metodo que faz a acao do "turno" do individuo
     * @param {Object[]} listaComidas - Lista de Comidas
     */
    iniciarDia(listaComidas){

        if(this.achouComida == true){
            this.segueComida(this.comidaBuscada);
        } else {
            if(this.possuiCaminhoBusca){
                this.segueDiracaoBusca()
            } else {
                this.setaDireacaoBusca();
            }
            this.procuraComida(listaComidas);
        }
    }

    /**
     * Metodo que move o individuo na direcao de uma comida ou a come se ele ja estiver sobre a mesma
     * @param {Object} comida - Objeto do tipo comida
     */
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

        if(this.getDistancia(vetorDirecaoX, vetorDirecaoY) <= ( 0 + this.velocidade) &&
            this.comidaConsumida < 2 && comida.estahDisponivel()){
            
            this.move(versorX, versorY);
            this.come(comida);

        }
    }

    /**
     * Metodo que verifica qual comida esta proxima do individuo para que ele a persiga
     * @param {Object[]} listaComidas - Lista de comidas
     */
    procuraComida(listaComidas){
        listaComidas.forEach(comida => {
            let vetorDirecaoX = comida.getPosicao().x - this.posicaoX;
            let vetorDirecaoY = comida.getPosicao().y - this.posicaoY;

            if(comida.estahDisponivel()){                
                if(this.getDistancia(vetorDirecaoX, vetorDirecaoY) < this.raioDeVisao &&
                    this.comidaConsumida < 2 &&
                    this.achouComida == false){
                        this.comidaBuscada = comida;
                        this.achouComida = true;
                        return;
                }
            }
        });
    }

    /**
     * Metodo que move o individuo para uma localizacao pre-determinada
     * em busca de comida
     */
    segueDiracaoBusca(){
        let versorX, versorY;

        let vetorDirecaoBuscaX = this.direcaoBuscaX - this.posicaoX;
        let vetorDirecaoBuscaY = this.direcaoBuscaX - this.posicaoY;
        
        if(vetorDirecaoBuscaX > 0){
            versorX = 1;
        } else if(vetorDirecaoBuscaX < 0) {
            versorX = -1;
        } else {
            versorX = 0;
        }

        if(vetorDirecaoBuscaY > 0){
            versorY = 1;
        } else if(vetorDirecaoBuscaY < 0) {
            versorY = -1;
        } else {
            versorY = 0;
        }
        
        this.move(versorX, versorY);

        if(this.getDistancia(vetorDirecaoBuscaX, vetorDirecaoBuscaY) == 0){
            this.possuiCaminhoBusca = false;
        }
    }

    /**
     * Metodo que define a direcao para onde o individuo deve buscar comida
     */
    setaDireacaoBusca(){
        this.direcaoBuscaX = Math.floor(Math.random() * 100);
        this.direcaoBuscaY = Math.floor(Math.random() * 100);

        this.possuiCaminhoBusca = true;

        this.segueDiracaoBusca();
    }

    /**
     * Metodo unitario de movimentacao do individuo.
     * Pode ser encarado como um 'Passo'
     * @param {number} direcaoX - Versor (vetor unitario) que define o passo em x
     * @param {number} direcaoY - Versor (vetor unitario) que define o passo em y
     */
    move(direcaoX, direcaoY){
        if(this.energiaAtual > 0){
            this.posicaoX = this.posicaoX + direcaoX * this.velocidade; 
            this.posicaoY = this.posicaoY + direcaoY * this.velocidade;
    
            this.perdeEnergia();
        }
    }

    /**
     * @todo Implementar metodo
     */
    moveCasa(){
        console.log("INDO PARA CASA POR IMPLEMENTAR");
    }
    
    /**
     * Metodo que consome uma comida pelo individuo
     * @param {Object} comida 
     */
    come(comida){
        this.comidaConsumida++;
        comida.consumir();
        this.achouComida = false;
        this.comidaBuscada = null;
    }

    /**
     * Metodo que calcula uma distancia entre dois pontos.
     * Normalmente entre o individuo e a comida ou entre o individuo e seu objetivo de busca
     * @param {number} vetorDirecaoX - Componente x do vetor que liga os pontos
     * @param {number} vetorDirecaoY - Componente y do vetor que liga os pontos
     * @returns {number} Distancia entre dois pontos
     */
    getDistancia(vetorDirecaoX, vetorDirecaoY){
        return Math.sqrt(Math.pow(vetorDirecaoX, 2) + Math.pow(vetorDirecaoY, 2));
    }
    
    /**
     * Metodo que retira energia do individuo
     */
    perdeEnergia(){
        this.energiaAtual = this.energiaAtual - this.velocidade;
    }

    /**
     * Metodo que cede energia ao individuo
     * @param {number} acressimoEnergia - Quantidade de energia fornecida
     */
    ganhaEnergia(acressimoEnergia){
        this.energiaAtual = this.energiaAtual + acressimoEnergia;
    }

    /**
     * Reproducao de um individuo com chance de mutacao
     * @param {Object[]} listaIndividuos - Lista de individuos
     */
    reproduz(listaIndividuos){
        let velocidade = this.geraMutacao(this.chanceDeMutacao, this.velocidade)

        listaIndividuos.push(new Individuo(this.energiaMax, velocidade, this.tamanho, this.raioDeVisao, this.posicaoX, this.posicaoY));
    }

    /**
     * Metodo que verifica e faz uma mutacao randomica 
     * @param {number} chanceDeMutacao - Porcentagem de chance de mutacao
     * @param {number} caracteristica - Valor da caracteristica a ser mudada
     */
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

    /**
     * Metodo que reinicia o ciclo de um individuo. Pode ser encarado como 'Sono'
     */
    reseta(){
        this.comidaConsumida = 0;
        this.energiaAtual = this.energiaMax;
        this.achouComida = false;
        this.comidaBuscada = null;
    }
}
