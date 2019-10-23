class Game {
    currentJeans = 0;           // Mevcut Kot Miktarı
    manufacturedJeans = 0;      // Üretilen Jans
    soldJeans = 0;              // Satılan Kot

    money = 3000;               // Para (Kasadaki)

    cotton = 0;                 // Pamuk

    UnitJeansCottonCost = 400;  // Kotun birim Pamuk kullanım miktarı
    UnitCottonMoneyCost = 30;   // Pamuk Bedeli
    price = 70;                 // fiyat

    demandRate = 0              // Halkın Talebi

    lastManufacturedCount = 0;
    lastManufacturedRate = 0;
    lastManufacturedRateTs = Date.now();

    update = () => {
        // Saniyelik Üretim
        if(Date.now() - this.lastManufacturedRateTs > 5000) {
            this.lastManufacturedRateTs = Date.now();
            this.lastManufacturedRate = Math.floor(
                (this.manufacturedJeans - this.lastManufacturedCount) / 5
            );
            this.lastManufacturedCount = this.manufacturedJeans;
        }

        this.updateDemand();

        if ((Math.random() * 100) < this.demandRate && this.currentJeans > 0) {
            this.purchaseCigKofte()
        }
    }

    produceJeans = () => {
        this.currentJeans++;
        this.manufacturedJeans++;
        this.cotton -= this.UnitJeansCottonCost;
    }

    canProduceJean = () => {
        return this.cotton >= this.UnitJeansCottonCost
    }

    canBuyCotton = () => {
        return this.money >= this.UnitCottonMoneyCost
    }

    buyCotton = () => {
        this.cotton += 1000;
        this.money -= this.UnitCottonMoneyCost;
    }

    canDecreasePrice = () => {
        return this.price > 1
    }

    increasePrice = () => {
        this.price += 1;
    }

    decreasePrice = () => {
        this.price -= 1;
    }

    updateDemand = () => {
        const rate = 100 - (this.price / 70) * 100;
        this.demandRate = Math.floor(Math.min(Math.max(0, rate), 100));
    }

    purchaseCigKofte = () => {
        this.currentJeans -= 1;
        this.soldJeans += 1;
        this.money += this.price
    }

}
export default Game;