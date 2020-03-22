class Plotter2D{
    constructor(rangeX, rangeY){
        this.plotArea = document.querySelector(".plot-area");
        this.altura = this.plotArea.offsetHeight;
        this.largura = this.plotArea.offsetWidth;

        this.redutorX = rangeX + 1;
        this.redutorY = rangeY;

        this.escalaX = this.plotArea.offsetWidth / this.redutorX;
        this.escalaY = this.plotArea.offsetHeight / this.redutorY;

        this.plotArea.style.backgroundSize = this.escalaX * 5 + "px " + this.escalaY * 5 + "px";

        for (let i = 0; i <= rangeX + 1; i++) {
            let valorX = document.createElement("div");
            valorX.classList.add("valor-eixo-x");
            valorX.style.left = i * this.escalaX + "px";
            valorX.style.top = this.altura + "px";
            valorX.innerText = i;  
            this.plotArea.appendChild(valorX);
        }
        
        for (let j = 0; j <= rangeY; j++) {
            let valorY = document.createElement("div");
            valorY.classList.add("valor-eixo-y");
            valorY.style.left = 0 + "px";
            valorY.style.top = ( this.redutorY - j ) * this.escalaY + "px";
            valorY.innerText = j;
            this.plotArea.appendChild(valorY);
        }
    }

    plotarPonto(xPonto, yPonto){
        let ponto = document.createElement("div");
        ponto.classList.add("ponto");
        ponto.style.left = xPonto * this.escalaX + "px";
        ponto.style.top = ( this.redutorY - yPonto ) * this.escalaY + "px";

        this.plotArea.appendChild(ponto);
    }

    plotarGrafico(vetorDeValores){
        for (let i = 1; i <= vetorDeValores.length; i++) {
            this.plotarPonto(i, vetorDeValores[i-1]);            
        }
    }
}