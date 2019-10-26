import React, { Component } from 'react'
import Game from '../components/game'
import '../css/button.css'
import '../css/header.css'

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.game = new Game()
    }

    componentDidMount() {
        setInterval(() => {
            this.game.update()
            this.setState({})
        }, 100)
    }

    update = () => {
        this.game.update();
    }

    render() {

        const {
            lastManufacturedRate,
            demandRate,
            manufacturedJeans,
            price,
            buyCotton,
            UnitCottonMoneyCost,
            cotton,
            currentJeans,
            soldJeans,
            money
        } = this.game;

        return (
            <div>

                <div className="text-center">
                    <button
                        className="jeans-manu"
                        disabled={!this.game.canProduceJean()}
                        onClick={() => this.game.produceJeans()}
                    >
                        Jeans Üret
                    </button>
                </div>

                <table className="part-header">
                    <tr>
                        <td>
                            <h3>İşletme</h3>
                        </td>
                        <td>
                            <div style={{ float: "right" }}>
                                Para : {money} ₺
                            </div>
                        </td>
                    </tr>
                </table>
                <hr />

                <table className="tl-body">

                    <tr>
                        <td className="tl-3">
                            Depodaki Jeans :
                        </td>
                        <td className="tl-3">
                            {currentJeans}
                        </td>
                        <td className="tl-3"></td>
                    </tr>

                    <tr>
                        <td>
                            Jeans Fiyatı :
                        </td>
                        <td>
                            {price} ₺
                        </td>
                        <td>
                            <button
                                onClick={this.game.increasePrice}
                            > + </button>
                            <button
                                disabled={!this.game.canDecreasePrice()}
                                onClick={this.game.decreasePrice}
                            > - </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {/*
                           Pamuk Mâaliyeti :
                        </td>
                        <td>
                            {UnitJeansCottonCost} Pamuk
                            */}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Halkın Talebi :
                        </td>
                        <td>
                            %{demandRate}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Satılan Jeans :
                        </td>
                        <td>
                            {soldJeans}
                        </td>
                    </tr>

                </table>


                <br />
                <table className="part-header">
                    <tr>
                        <td>
                            <h3>Üretim</h3>
                        </td>
                        <td>
                            <div style={{ float: "right" }}>
                                Jeans Üretimi : {lastManufacturedRate}/sn
                            </div>
                        </td>
                    </tr>
                </table>
                <hr />

                <table className="tl-body">

                    <tr>
                        <td className="tl-3">
                            Üretilen Jeans :
                        </td>
                        <td className="tl-3">
                            {manufacturedJeans}
                        </td>
                        <td className="tl-3">
                            <button
                                className="bt-block"
                                disabled={!this.game.canBuyCotton()}
                                onClick={() => this.game.AutoManufactureStatusToggle()}
                                title="Çalışanların Jeans Üretmesini Durdurup / Devam Ettirir."
                            >
                                {
                                    this.game.AutoManufactureStatus
                                        ? "Üretimi DURDUR"
                                        : "Üretime DEVAM"
                                } !
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Pamuk :
                        </td>
                        <td>
                            {cotton} gr
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canBuyCotton()}
                                onClick={buyCotton}
                            >
                                1 Kg Pamuk Al ({UnitCottonMoneyCost}₺)
                            </button>
                        </td>
                    </tr>

                </table>

                <br />
                <table className="part-header">
                    <tr>
                        <td>
                            <h3>Çalışanlar</h3>
                        </td>
                        <td>
                            <div style={{ float: "right" }}>
                                Çalışan Sayısı : {this.game.StuffCount}
                            </div>
                        </td>
                    </tr>
                </table>
                <hr />

                <table className="tl-body">

                    <tr>
                        <th style={{ width: "20%" }}>
                            Rütbesi
                        </th>
                        <th style={{ width: "10%" }}>
                            Kişi
                        </th>
                        <th style={{ width: "20%" }}>
                            üretim
                        </th>
                        <th style={{ width: "25%" }}>
                        </th>
                        <th style={{ width: "25%" }}>

                        </th>
                    </tr>

                    <tr>
                        <td>
                            Çalışan :
                        </td>
                        <td>
                            {this.game.Generators.WorkerCount}
                        </td>
                        <td>
                            {this.game.Generators.WorkerManufactureRate}/sn
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canBuyGenerator("WORKER")}
                                onClick={() => this.game.BuyGenerator("WORKER")}
                            >
                                İşe Al
                                <br />
                                {this.game.Generators.WorkerCost} ₺ Öde
                        </button>
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canFireGenerator("WORKER")}
                                onClick={() => this.game.FireGenerator("WORKER")}
                                title="Tazminat Öde"
                            >
                                Kov
                                <br />
                                {this.game.indemnityCost(
                                    this.game.Generators.WorkerCost
                                )} ₺ Öde
                        </button>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Uzman :
                        </td>
                        <td>
                            {this.game.Generators.ForemanCount}
                        </td>
                        <td>
                            {this.game.Generators.ForemanManufactureRate}/sn
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canBuyGenerator("FOREMAN")}
                                onClick={() => this.game.BuyGenerator("FOREMAN")}
                            >
                                İşe Al
                                <br />
                                {this.game.Generators.ForemanCost} ₺ Öde
                        </button>
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canFireGenerator("FOREMAN")}
                                onClick={() => this.game.FireGenerator("FOREMAN")}
                                title="Tazminat Öde"
                            >
                                Kov
                                <br />
                                {this.game.indemnityCost(
                                    this.game.Generators.ForemanCost
                                )} ₺ Öde
                        </button>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Usta :
                        </td>
                        <td>
                            {this.game.Generators.MasterCount}
                        </td>
                        <td>
                            {this.game.Generators.MasterManufactureRate}/sn
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canBuyGenerator("MASTER")}
                                onClick={() => this.game.BuyGenerator("MASTER")}
                            >
                                İşe Al
                                <br />{this.game.Generators.MasterCost} ₺ Öde
                        </button>
                        </td>
                        <td>
                            <button
                                className="bt-block"
                                disabled={!this.game.canFireGenerator("MASTER")}
                                onClick={() => this.game.FireGenerator("MASTER")}
                                title="Tazminat Öde"
                            >
                                Kov
                                <br />
                                {this.game.indemnityCost(
                                    this.game.Generators.MasterCost
                                )} ₺ Öde
                        </button>
                        </td>
                    </tr>

                </table>

            </div>
        )
    }
}
export default home;


// min 10 talep tavan
// max 70 talep yok