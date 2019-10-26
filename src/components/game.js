class Game {
    // Product Status - Ürün Durumu
    currentJeans = 0;           // Mevcut Kot Miktarı
    manufacturedJeans = 0;      // Üretilen Jans
    soldJeans = 0;              // Satılan Kot

    // Materials - Materialler
    cotton = 0;                 // Pamuk
    money = 3000;               // Para (Kasadaki)

    // Pricing - Fiyatlandırma
    price = 70;                 // Jeans Ürün fiyatı
    UnitJeansCottonCost = 600;  // Jeans'in Pamuk Bedeli
    firstUnitCottonMoneyCost = 30;   // Pamuğun İlk TL Bedeli
    UnitCottonMoneyCost = this.firstUnitCottonMoneyCost;  // anlık

    // Halkın Talebi
    demandRate = 0;

    // Manufacture Rate - Üretim Oranı
    lastManufacturedCount = 0;
    lastManufacturedRate = 0;
    lastManufacturedRateTs = Date.now();

    // Satın Alınan Pamuk
    cottonCostLastUpdated = Date.now()
    cottonBuyCount = 0;
    lastCottonBuyCount = 0;
    cottonBuyingRate = 0;

    // Oyun Döngüsü
    update = () => {
        // Üreticilerin Jeans Üretimi
        if (Date.now() - this.GeneratorsLastGeneratedAt > 1000
            && this.AutoManufactureStatus) {
            this.produceJeans(
                this.Generators.WorkerManufactureRate *
                this.Generators.WorkerCount
            );
            this.produceJeans(
                this.Generators.ForemanManufactureRate *
                this.Generators.ForemanCount
            );
            this.produceJeans(
                this.Generators.WorkerManufactureRate *
                this.Generators.MasterCount
            );
            this.GeneratorsLastGeneratedAt = Date.now()
        }

        // Çalışan Sayısını bi daha hesapla
        this.StuffCount = this.Generators.WorkerCount
            + this.Generators.ForemanCount
            + this.Generators.MasterCount;






        // Malzeme Satın alma Oranı Hesapla - Calculate Material Buying Rate
        if (Date.now() - this.cottonCostLastUpdated > 4000) {
            if (this.cottonBuyingRate === 0) {
                if (this.UnitCottonMoneyCost > 30) {
                    this.UnitCottonMoneyCost -= Math.floor(Math.random() * 6)   // Update Material Price
                    if (this.UnitCottonMoneyCost < 30) {
                        this.UnitCottonMoneyCost = this.firstUnitCottonMoneyCost
                    }
                }

            } else {
                this.UnitCottonMoneyCost += Math.floor((this.cottonBuyingRate + 2));    // Update Material Price
            }

            this.cottonCostLastUpdated = Date.now();
            this.cottonBuyingRate = Math.floor(
                (this.cottonBuyCount - this.lastCottonBuyCount) / 4
            )
            this.lastCottonBuyCount = this.cottonBuyCount;
        }




        // Üretim Güncelleme Oranı - Update Manufacture Rate
        if (Date.now() - this.lastManufacturedRateTs > 5000) {
            this.lastManufacturedRateTs = Date.now();
            this.lastManufacturedRate = Math.floor(
                (this.manufacturedJeans - this.lastManufacturedCount) / 5
            );
            this.lastManufacturedCount = this.manufacturedJeans;
        }

        // Halkın Talebini Güncelle - Update Demand
        this.updateDemand();


        // Müşterilerin Satın Alması - Consumers Purchase Goods
        if ((Math.random() * 100) < this.demandRate && this.currentJeans > 0) {
            this.purchaseJeans()
        }
    }




    // Üreticiler
    Generators = {
        WorkerCount: 0,
        WorkerCost: 9600,
        WorkerManufactureRate: 1,
        ForemanCount: 0,
        ForemanCost: 14400,
        ForemanManufactureRate: 4,
        MasterCount: 0,
        MasterCost: 24000,
        MasterManufactureRate: 6
    }
    // Üreticilerin - Çalışanların En Son Üretme Zamanı
    GeneratorsLastGeneratedAt = Date.now()
    // Çalışan Sayısı
    StuffCount = this.Generators.WorkerCount
        + this.Generators.ForemanCount
        + this.Generators.MasterCount;

    //  Üretici - Çalışan alınabilir mi?
    canBuyGenerator = type => {
        switch (type) {
            case "WORKER":
                return this.money >= this.Generators.WorkerCost;
            case "FOREMAN":
                return this.money >= this.Generators.ForemanCost;
            case "MASTER":
                return this.money >= this.Generators.MasterCost;

            default:
                return false;
        }
    }

    //  Üretici - Çalışan Alımı
    BuyGenerator = type => {
        switch (type) {
            case "WORKER":
                this.money -= this.Generators.WorkerCost;
                this.Generators.WorkerCount++;
                return;
            case "FOREMAN":
                this.money -= this.Generators.ForemanCost;
                this.Generators.ForemanCount++;
                return;
            case "MASTER":
                this.money -= this.Generators.MasterCost;
                this.Generators.MasterCount++;
                return;

            default:
                return false;
        }
    }

    // Üretici - Çalışan Kovulabilir mi?
    canFireGenerator = type => {
        switch (type) {
            case "WORKER":
                return this.money >= this.indemnityCost(this.Generators.WorkerCost) 
                && this.Generators.WorkerCount !== 0;
            case "FOREMAN":
                return this.money >= this.indemnityCost(this.Generators.ForemanCost) 
                && this.Generators.ForemanCount !== 0;
            case "MASTER":
                return this.money >= this.indemnityCost(this.Generators.MasterCost) 
                && this.Generators.MasterCount !== 0;

            default:
                return false;
        }
    }

    // Üretici - Çalışan Tazminat Hesaplama
    indemnityCost = (cost = 0) => {
        return (cost / 3) * 2;
    }

    //  Üretici - Çalışan Kovumu
    FireGenerator = type => {
        switch (type) {
            case "WORKER":
                this.money -= (this.Generators.WorkerCost / 3) * 2;
                this.Generators.WorkerCount--;
                return;
            case "FOREMAN":
                this.money -= (this.Generators.ForemanCost / 3) * 2;
                this.Generators.ForemanCount--;
                return;
            case "MASTER":
                this.money -= (this.Generators.MasterCost / 3) * 2;
                this.Generators.MasterCount--;
                return;

            default:
                return false;
        }
    }

    // Üretim Durumu
    AutoManufactureStatus = true

    // Üretim Durumu Toggle
    AutoManufactureStatusToggle = () => {
        this.AutoManufactureStatus =
            !this.AutoManufactureStatus
    }




    // Jeans Üretilebilir mi?
    canProduceJean = (count = 1) => {
        return this.cotton >= this.UnitJeansCottonCost * count
    }

    // Jeans Üret - Produce Jeans 
    produceJeans = (count = 1) => {
        if (this.canProduceJean(count)) {
            this.currentJeans += count;    // Mevcut Jeans'i 1 arttır
            this.manufacturedJeans += count;   //  Üretilen Jeans'i 1 arttır
            this.cotton -= this.UnitJeansCottonCost * count;
        }
    }





    // Pamuk Satın alınabilir mi?
    canBuyCotton = () => {
        return this.money >= this.UnitCottonMoneyCost
    }

    // Pamuk Satın Al!
    buyCotton = () => {
        this.cotton += 1000;
        this.cottonBuyCount++;
        this.money -= this.UnitCottonMoneyCost;
    }




    // Fiyat Düşürülebilir mi?
    canDecreasePrice = () => {
        return this.price > 1
    }

    // Fiyat Arttır!
    increasePrice = () => {
        this.price += 1;
    }

    // Fiyat Düşür!
    decreasePrice = () => {
        this.price -= 1;
    }




    // Halk Talebi Güncelle!
    updateDemand = () => {
        const rate = 100 - (this.price / 70) * 100;
        this.demandRate = Math.floor(Math.min(Math.max(0, rate), 100));
    }




    // Jeans Sat!
    purchaseJeans = () => {
        this.currentJeans -= 1;
        this.soldJeans += 1;
        this.money += this.price
    }

}
export default Game;