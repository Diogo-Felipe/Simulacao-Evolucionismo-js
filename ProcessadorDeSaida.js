
class ProcessadorDeSaida{
    
    geraArquivoDeDados(mediaDeVelocidadePorGerracao){
        var csv = 'Velocidade\n';
            
        mediaDeVelocidadePorGerracao.forEach(media => {
            csv += media;
            csv += '\n';
        });
    
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'velocidades.txt';
        hiddenElement.click();
    }
    
    imprimeDadosPopulacao(mediaDeVelocidadePorGerracao, listaIndividuos, dia){
        let somaVelocidade = 0;
        let mediaVelocidade;
        let qtdComidaConsumida = 0;
        let velocidade = [];
    
        for(let i = 0; i < 12; i++){
            velocidade[i] = 0;
        }
    
        listaIndividuos.forEach(individuo => {
            for(let i = 0; i < 12; i++){
                if(individuo.getVelocidade() == i){
                    velocidade[i]++;
                }
            }
        });
    
        console.log("_________________________________________________")
        console.log("Numero de Individuos: " + listaIndividuos.length);
    
        listaIndividuos.forEach(individuo => {
            somaVelocidade = somaVelocidade + individuo.getVelocidade();
            qtdComidaConsumida = qtdComidaConsumida + individuo.getQtdComida();
        });
    
        mediaVelocidade = somaVelocidade / listaIndividuos.length;
    
        mediaDeVelocidadePorGerracao.push(mediaVelocidade);
    
        console.log("Media da Velocidade da Populacao no dia " + (dia + 1) + " :" + mediaVelocidade);
        //console.log("Qtd de comida consumida da Populacao no dia " + (dia + 1) + " :" + qtdComidaConsumida); 
    
        // for(let i = 0; i < velocidade.length; i++){
        //     console.log("Qtd de individuos com velocidade: " + (i) + ": " + velocidade[i]);
        // }
    }
}