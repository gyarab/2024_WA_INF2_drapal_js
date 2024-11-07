class Pexeso {

    constructor() {
        let app = document.getElementById("app");

        let header = document.createElement("h1");
        header.innerText = "PEXESO";
        app.appendChild(header);

        let info = document.createElement("div");
        info.classList.add("info");

        let player1Label = document.createElement("label");
        let player2Label = document.createElement("label");
        player1Label.id = "player1";
        player2Label.id = "player2";

        let statusLabel = document.createElement("label");
        statusLabel.id = "status";

        info.appendChild(player1Label);
        info.appendChild(statusLabel);
        info.appendChild(player2Label);

        app.appendChild(info);

        let grid = document.createElement("div");
        grid.id = "grid";
        grid.classList.add("grid");
        app.appendChild(grid);

        let menu = document.createElement("div");
        
        let startBtn = document.createElement("button");
        startBtn.innerText = "Spustit hru";
        startBtn.addEventListener("click", () => {
            this.startGame(imageDropdown.value);
        });
        menu.appendChild(startBtn);

        let imageDropdown = document.createElement("select");
        let imageOption1 = document.createElement("option");
        let imageOption2 = document.createElement("option");
        let imageOption3 = document.createElement("option");
        imageOption1.value = "ovoce";
        imageOption1.text = "Ovoce";
        imageOption2.value = "zvirata";
        imageOption2.text = "Zvířata";
        imageOption3.value = "emoji";
        imageOption3.text = "Emoji";
        imageDropdown.appendChild(imageOption1);
        imageDropdown.appendChild(imageOption2);
        imageDropdown.appendChild(imageOption3);
        menu.appendChild(imageDropdown);

        app.appendChild(menu);
    }   

    startGame(imageSet) {
        switch (imageSet) {
            case "ovoce":
                this.images = ["🍉", "🍌", "🍊", "🍎", "🍇", "🍓", "🍒", "🍑"];
                break;
            case "zvirata":
                this.images = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
                break;
            case "emoji":
                this.images = ["😀", "😂", "😍", "😜", "😎", "😇", "😡", "😱"];
                break;
        }

        this.images = this.images.concat(this.images);
        this.images.sort(() => Math.random() - 0.5);

        let grid = document.getElementById("grid");
        grid.innerHTML = "";
        for (let i = 0; i < 16; i++) {
            let card = document.createElement("div");
            card.id = "card";
            card.classList.add("card");
            card.innerHTML = `<div class="front"></div><div class="back">${this.images[i]}</div>`;
            card.addEventListener("click", () => {
                this.flipCard(card);
            });
            grid.appendChild(card);
        }

        this.flippedAmount = 0;
        this.currentPlayer = 1;
        this.player1Score = 0;
        this.player2Score = 0;
        this.player1Turn = 1;
        this.player2Turn = 0;

        let player1Label = document.getElementById("player1");
        let player2Label = document.getElementById("player2");
        let statusLabel = document.getElementById("status");

        player1Label.innerText = `Hráč 1: ${this.player1Score} bodů`;
        player2Label.innerText = `Hráč 2: ${this.player2Score} bodů`;
        statusLabel.innerText = `Hráč 1: ${this.player1Turn}. tah`;
    }

    flipCard(card) {
        if (this.flippedAmount < 2 && !card.classList.contains("flip") && !card.classList.contains("taken")) {  
            card.classList.add("flip");
            this.flippedAmount++;
            if (this.flippedAmount == 2) {
                this.endTurn();
            }
        }
    }

    endTurn() {

        let player1Label = document.getElementById("player1");
        let player2Label = document.getElementById("player2");
        let statusLabel = document.getElementById("status");

        let flippedCards = Array.from(document.getElementsByClassName("flip"));
        setTimeout(() => {
            if (flippedCards[0].innerText == flippedCards[1].innerText) {
                if (this.currentPlayer == 1) {
                    this.player1Score++;
                    this.player1Turn++;
                    player1Label.innerText = `Hráč 1: ${this.player1Score} bodů`;
                } else {
                    this.player2Score++;
                    this.player2Turn++;
                    player2Label.innerText = `Hráč 2: ${this.player2Score} bodů`;
                }

                for (let i = 0; i < 2; i++) {
                    flippedCards[i].classList.add("taken");
                    flippedCards[i].classList.remove("flip");
                }
            } else {
                for (let i = 0; i < 2; i++) {
                    flippedCards[i].classList.remove("flip");
                }

                if (this.currentPlayer == 1) {
                    this.player2Turn++;
                    this.currentPlayer = 2;
                } else {
                    this.player1Turn++;
                    this.currentPlayer = 1;
                }
            }

            if (this.player1Score + this.player2Score == 8) {
                if (this.player1Score > this.player2Score) {
                    statusLabel.innerText = "Vyhrál hráč 1";
                } else if (this.player1Score < this.player2Score) {
                    statusLabel.innerText = "Vyhrál hráč 2";
                } else {
                    statusLabel.innerText = "Remíza";
                }
                return;
            }

            this.flippedAmount = 0;
            statusLabel.innerText = `Hráč ${this.currentPlayer}: ${this.currentPlayer == 1 ? this.player1Turn : this.player2Turn}. tah`;
        }, 1000);
    }
}
