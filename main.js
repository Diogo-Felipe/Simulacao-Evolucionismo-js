var listaIndividuos = [];
var listaComida = [];

let mediaPorGerracao = [];

const energiaBase = 500;
const numeroDeDiasSimulados = 1000;

listaComida = geraComida(100);
listaIndividuos = geraPopulacao(20, energiaBase);

imprimeDadosPopulacao(listaIndividuos, -1);

for(let i = 0; i < numeroDeDiasSimulados; i++){
    populacaoProcuraComida(energiaBase, listaIndividuos, listaComida);
    listaIndividuos = fimDoDia(listaIndividuos, listaComida, i);
}

saidaDeDados();

function saidaDeDados(){
    var csv = 'Velocidade\n';
        
    mediaPorGerracao.forEach(media => {
        csv += media;
        csv += '\n';
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'velocidades.txt';
    hiddenElement.click();
}

function geraComida(quantidade){
    let listaComida = [];
    for (let i = 0; i < quantidade; i++) {
        let posicaoXComida = Math.floor(Math.random() * 100);
        let posicaoYComida = Math.floor(Math.random() * 100);
    
        listaComida.push(new Comida(posicaoXComida, posicaoYComida));
    }
    return listaComida;
}

function geraPopulacao(quantidade, energiaBase){
    let listaIndividuos = [];
    for (let i = 0; i < quantidade; i++){
        let posicaoXIndividuo = Math.floor(Math.random() * 100);
        let posicaoYIndividuo = Math.floor(Math.random() * 100);
    
        listaIndividuos.push(new Individuo(energiaBase, 1, 10, 10, posicaoXIndividuo, posicaoYIndividuo));
    }
    return listaIndividuos;
}

function populacaoProcuraComida(energiaBase, listaIndividuos, listaComida){
    for(let i = 0; i < energiaBase; i++){
        for(let i = 0; i < listaIndividuos.length; i++){
            listaIndividuos[i].iniciarDia(listaComida);
        }
    }
}

function fimDoDia(listaIndividuos, listaComida, dia){
    listaIndividuos = triagemDaPopulacao(listaIndividuos);
    imprimeDadosPopulacao(listaIndividuos, dia);
    resetaPoupulacao(listaIndividuos)
    resetaComidas(listaComida);

    return listaIndividuos;
}

function triagemDaPopulacao(listaIndividuos){
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

function resetaComidas(listaComida){
    listaComida.forEach(comida => {
        comida.reseta();
    });
}

function resetaPoupulacao(listaIndividuos){
    listaIndividuos.forEach(individuo => {
        individuo.reseta();
    });
}


function imprimeDadosPopulacao(listaIndividuos, dia){
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

    mediaPorGerracao.push(mediaVelocidade);

    console.log("Media da Velocidade da Populacao no dia " + (dia + 1) + " :" + mediaVelocidade);
    //console.log("Qtd de comida consumida da Populacao no dia " + (dia + 1) + " :" + qtdComidaConsumida); 

    // for(let i = 0; i < velocidade.length; i++){
    //     console.log("Qtd de individuos com velocidade: " + (i) + ": " + velocidade[i]);
    // }
}