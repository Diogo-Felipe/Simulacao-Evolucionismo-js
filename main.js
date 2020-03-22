/**
 * @file Local ideal para realizar as simulacoes. Contem um exemplo de simulacao
 * @author Diogo L.C. Felipe <dlcfelipp@gmail.com>
 */

/** @type {number[]} */
var listaIndividuos = [];
/** @type {number[]}*/
var listaComida = [];

/** @const {number} */
const energiaBase = 500;
/** @const {number} */
const numeroDeDiasSimulados = 100;
/** @const {number} */
const qtdInicialDeIndividuos = 20;
/** @const {number} */
const qtdDeComida = 100;

/** @type {Object} */
let processadorDeSaida = new ProcessadorDeSaida();

/** @type {Object} */
let simulador = new Simulacao(numeroDeDiasSimulados, energiaBase, qtdInicialDeIndividuos, qtdDeComida, listaIndividuos, listaComida, processadorDeSaida);

let plotter2D = new Plotter2D(numeroDeDiasSimulados, qtdInicialDeIndividuos + 10);

/** Inicia a simulacao */
simulador.simula(numeroDeDiasSimulados, energiaBase, qtdInicialDeIndividuos, qtdDeComida);

plotter2D.plotarGrafico(simulador.getMediaPorGeracao(), "black", "Media de Velocidade");
plotter2D.plotarGrafico(simulador.getTotalIndividuosPorGeracao(), "red", "Qtd de Individuos");

/** Gera arquivo com a saida de dados do simulador */
//processadorDeSaida.geraArquivoDeDados(simulador.getMediaPorGeracao());