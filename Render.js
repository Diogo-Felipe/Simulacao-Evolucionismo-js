/**
 * Classe que renderiza elementos na tela
 * @author Diogo L.C. Felipe <dlcfelipp@gmail.com>
 */
class Render{

    constructor(){
        this.tela = document.querySelector(".campo-de-simulacao");
        this.altura = this.tela.offsetHeight;
        this.largura = this.tela.offsetWidth;

        this.escala = this.tela.offsetWidth / 100;
    }

    geraImagemIndividuo(posicaoX, posicaoY){
        let imagemIndividuo = document.createElement("div");
        imagemIndividuo.classList.add("individuo");

        imagemIndividuo.style.left = posicaoX * this.escala + "px";
        imagemIndividuo.style.top = posicaoY * this.escala + "px";

        this.tela.appendChild(imagemIndividuo);

        return imagemIndividuo;
    }

    geraImagemComida(posicaoX, posicaoY){
        let imagemComida = document.createElement("div");
        imagemComida.classList.add("comida");

        imagemComida.style.left = posicaoX * this.escala + "px";
        imagemComida.style.top = posicaoY * this.escala + "px";

        this.tela.appendChild(imagemComida);

        return imagemComida;
    }

    renderizaElemento(elemento, posicaoX, posicaoY){
        elemento.style.left = posicaoX * this.escala + "px";
        elemento.style.top = posicaoY * this.escala + "px";
    }

    removeElemento(elemento){
        this.tela.removeChild(elemento);

    }

}
