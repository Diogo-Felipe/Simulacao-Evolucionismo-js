var listaIndividuos = [];
var listaComida = [];

for (let i = 0; i < 100; i++) {
    let posicaoXComida = Math.floor(Math.random() * 100);
    let posicaoYComida = Math.floor(Math.random() * 100);

    listaComida.push(new Comida(posicaoXComida, posicaoYComida));
}

let posicaoXIndividuo = Math.floor(Math.random() * 100);
let posicaoYIndividuo = Math.floor(Math.random() * 100);

listaIndividuos.push(new Individuo(500, 1, 10, 10, posicaoXIndividuo, posicaoYIndividuo));

for(let i = 0; i < 500; i++){
    listaIndividuos[0].procuraComida(listaComida);
}
