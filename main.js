var listaIndividuos = [];
var listaComida = [];

const energiaBase = 500;
const numeroDeDiasSimulados = 1000;
const qtdInicialDeIndividuos = 20;
const qtdDeComida = 100;

let processadorDeSaida = new ProcessadorDeSaida();

let simulador = new Simulacao(numeroDeDiasSimulados, energiaBase, qtdInicialDeIndividuos, qtdDeComida, listaIndividuos, listaComida, processadorDeSaida);

simulador.simula(numeroDeDiasSimulados, energiaBase, qtdInicialDeIndividuos, qtdDeComida)

processadorDeSaida.geraArquivoDeDados(simulador.getMediaPorGeracao());