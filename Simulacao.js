
class Simulacao{
    constructor(numeroDeDiasSimulados, energiaBase, qtdInicialDeIndividuos, qtdDeComida, listaIndividuos, listaComida, processadorDeSaida){

        this.numeroDeDiasSimulados = numeroDeDiasSimulados;
        this.energiaBase = energiaBase;
        this.qtdInicialDeIndividuos = qtdInicialDeIndividuos;
        this.qtdDeComida = qtdDeComida;

        this.listaIndividuos = listaIndividuos;
        this.listaComida = listaComida;

        this.processadorDeSaida = processadorDeSaida;

        this.mediaPorGeracao = [];
    }

    getMediaPorGeracao(){
        return this.mediaPorGeracao;
    }

    simula(){
        this.listaIndividuos = this.geraPopulacao(this.qtdInicialDeIndividuos, this.energiaBase);
        this.listaComida = this.geraComida(this.qtdDeComida);

        this.processadorDeSaida.imprimeDadosPopulacao(this.mediaPorGeracao, this.listaIndividuos, -1);
        
        for(let i = 0; i < this.numeroDeDiasSimulados; i++){
            this.populacaoProcuraComida(this.listaIndividuos, this.listaComida);
            this.listaIndividuos = this.fimDoDia(this.listaIndividuos, this.listaComida, i, this.processadorDeSaida, this.mediaPorGeracao);
        }
    }
    
    geraComida(quantidade){
        listaComida = [];
        for (let i = 0; i < quantidade; i++) {
            let posicaoXComida = Math.floor(Math.random() * 100);
            let posicaoYComida = Math.floor(Math.random() * 100);
        
            listaComida.push(new Comida(posicaoXComida, posicaoYComida));
        }
        return listaComida;
    }
    
    geraPopulacao(quantidade){
        let listaIndividuos = [];
        for (let i = 0; i < quantidade; i++){
            let posicaoXIndividuo = Math.floor(Math.random() * 100);
            let posicaoYIndividuo = Math.floor(Math.random() * 100);
        
            listaIndividuos.push(new Individuo(this.energiaBase, 1, 10, 10, posicaoXIndividuo, posicaoYIndividuo));
        }
        return listaIndividuos;
    }
    
    populacaoProcuraComida(listaIndividuos, listaComida){
        for(let i = 0; i < this.energiaBase; i++){
            for(let i = 0; i < listaIndividuos.length; i++){
                listaIndividuos[i].iniciarDia(listaComida);
            }
        }
    }
    
    fimDoDia(listaIndividuos, listaComida, dia, processadorDeSaida, mediaPorGeracao){
        listaIndividuos = this.triagemDaPopulacao(listaIndividuos);
        processadorDeSaida.imprimeDadosPopulacao(mediaPorGeracao, listaIndividuos, dia);
        this.resetaPoupulacao(listaIndividuos)
        this.resetaComidas(listaComida);
    
        return listaIndividuos;
    }
    
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
    
    resetaComidas(listaComida){
        listaComida.forEach(comida => {
            comida.reseta();
        });
    }
    
    resetaPoupulacao(listaIndividuos){
        listaIndividuos.forEach(individuo => {
            individuo.reseta();
        });
    }
}