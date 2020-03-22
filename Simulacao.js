/**
 * Classe responsavel pelas simulacoes
 * @author Diogo L.C. Felipe <dlcfelipp@gmail.com>
 */
class Simulacao{
    /**
     * Criacao de uma simulacao
     * @param {number} numeroDeDiasSimulados - Numero de geracoes a serem simuladas
     * @param {number} energiaBase - Energia base disponivel para populacao
     * @param {number} qtdInicialDeIndividuos - Quantidade de individuos iniciais
     * @param {number} qtdDeComida - Quantidade de comidas disponiveis
     * @param {Object[]} listaIndividuos - Lista contendo os individuos iniciais
     * @param {Object[]} listaComida - Lista contendo as comidas
     * @param {Object} processadorDeSaida - Instancia do processador que sera usado para saida de dados
     */
    constructor(numeroDeDiasSimulados, energiaBase, qtdInicialDeIndividuos, qtdDeComida, listaIndividuos, listaComida, processadorDeSaida){

        /** @private */
        this.numeroDeDiasSimulados = numeroDeDiasSimulados;
        /** @private */
        this.energiaBase = energiaBase;
        /** @private */
        this.qtdInicialDeIndividuos = qtdInicialDeIndividuos;
        /** @private */
        this.qtdDeComida = qtdDeComida;

        /** @private */
        this.listaIndividuos = listaIndividuos;
        /** @private */
        this.listaComida = listaComida;

        /** @private */
        this.processadorDeSaida = processadorDeSaida;

        /** @private */
        this.mediaPorGeracao = [];
    }

    /**
     * Retorna a media das velocidades de uma geracao
     * @returns {number[]} Medias das velocidades por geracao
     */
    getMediaPorGeracao(){
        return this.mediaPorGeracao;
    }

    /**
     * Metodo que realiza a simulacao baseado nos parametros de entrada
     */
    simula(){
        this.listaIndividuos = this.geraPopulacao(this.qtdInicialDeIndividuos, this.energiaBase);
        this.listaComida = this.geraComida(this.qtdDeComida);

        this.processadorDeSaida.imprimeDadosPopulacao(this.mediaPorGeracao, this.listaIndividuos, -1);
        
        for(let i = 0; i < this.numeroDeDiasSimulados; i++){
            this.populacaoProcuraComida(this.listaIndividuos, this.listaComida);
            this.listaIndividuos = this.fimDoDia(this.listaIndividuos, this.listaComida, i, this.processadorDeSaida, this.mediaPorGeracao);
        }
    }
    
    /**
     * Metodo que popula a lista de comidas com instancias de Comida
     * @param {number} quantidade - Quantidade de comidas a serem geradas
     * @returns {Object[]} Lista de comidas
     */
    geraComida(quantidade){
        listaComida = [];
        for (let i = 0; i < quantidade; i++) {
            let posicaoXComida = Math.floor(Math.random() * 100);
            let posicaoYComida = Math.floor(Math.random() * 100);
        
            listaComida.push(new Comida(posicaoXComida, posicaoYComida));
        }
        return listaComida;
    }
    
    /**
     * Metodo que popula a simulacao com indiviuos da especie
     * @param {number} quantidade 
     * @returns {Object[]} Lista de individuos
     */
    geraPopulacao(quantidade){
        let listaIndividuos = [];
        for (let i = 0; i < quantidade; i++){
            let posicaoXIndividuo = Math.floor(Math.random() * 100);
            let posicaoYIndividuo = Math.floor(Math.random() * 100);
        
            listaIndividuos.push(new Individuo(this.energiaBase, 1, 10, 10, posicaoXIndividuo, posicaoYIndividuo));
        }
        return listaIndividuos;
    }
    
    /**
     * Parte da simulacao onde os individuos procuram comida e comem pelo mapa
     * @param {Object[]} listaIndividuos Lista de individuos
     * @param {Object[]} listaComida Lista de comidas
     */
    populacaoProcuraComida(listaIndividuos, listaComida){
        for(let i = 0; i < this.energiaBase; i++){
            for(let j = 0; j < listaIndividuos.length; j++){
                listaIndividuos[j].iniciarDia(listaComida); 
            }
        }
    }
    
    /**
     * Etapa da simulacao apos a etapa de procura de comida
     * @param {Object[]} listaIndividuos Lista de individuos
     * @param {Object[]} listaComida Lista de comidas
     * @param {number} dia Dia atual da simulacao
     * @param {Object} processadorDeSaida Processador responsavel pela saida de dados
     * @param {number[]} mediaPorGeracao Medias das velocidades por geracao
     * @returns {Object[]} Lista de individuos atualizada com mortes e reproducoes
     */
    fimDoDia(listaIndividuos, listaComida, dia, processadorDeSaida, mediaPorGeracao){
        listaIndividuos = this.triagemDaPopulacao(listaIndividuos);
        processadorDeSaida.imprimeDadosPopulacao(mediaPorGeracao, listaIndividuos, dia);
        this.resetaPoupulacao(listaIndividuos)
        this.resetaComidas(listaComida);
    
        return listaIndividuos;
    }
    
    /**
     * Metodo que remove individuos que nao conseguiram comer e
     * reproduz individuos que conseguiram consumir dois alimentos
     * @param {Object[]} listaIndividuos Lista de individuos
     * @returns {Object[]} Lista de individuos atualizada com mortes e reproducoes
     */
    triagemDaPopulacao(listaIndividuos){

        let novaLista = listaIndividuos.filter(individuo => {
            return individuo.getQtdComida() > 0;
        });
    
        for(let i = 0; i < novaLista.length; i++){
            if(novaLista[i].getQtdComida() == 2){
                novaLista[i].reproduz(novaLista);
            } 
        }
    
        return novaLista;
    }
    
    /**
     * Redisponibiliza e reordena todas as comidas no mapa
     * @param {Object[]} listaComida Lista de comidas
     */
    resetaComidas(listaComida){
        listaComida.forEach(comida => {
            comida.reseta();
        });
    }
    
    /**
     * Reseta cada individuo para seu estado inicial
     * @param {Object[]} listaIndividuos 
     */
    resetaPoupulacao(listaIndividuos){
        listaIndividuos.forEach(individuo => {
            individuo.reseta();
        });
    }
}