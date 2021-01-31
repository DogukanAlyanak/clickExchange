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
            //demandRate,
            manufacturedJeans,
            price,
            buyCotton,
            UnitCottonMoneyCost,
            cotton,
            currentJeans,
            soldJeans,
            money,
            earnedMoney,
            buyingCottonAmount
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
                            > + </button>&nbsp;
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

                    {/* <tr>
                        <td>
                            Halkın Talebi :
                        </td>
                        <td>
                            %{demandRate}
                        </td>
                    </tr> */}

                    <tr>
                        <td>
                            Satılan Jeans :
                        </td>
                        <td>
                            {soldJeans}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Kazanılan Para :
                        </td>
                        <td>
                            {earnedMoney} ₺
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
                                {buyingCottonAmount / 1000} Kg Pamuk Al ({UnitCottonMoneyCost}₺)
                            </button>
                        </td>
                    </tr>
                </table>

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
                            {this.game.Generators.WorkerManufactureRate} jeans/sn
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
                        {this.game.Generators.WorkerCount !== 0 && (
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
                        )}
                    </tr>

                    <tr>
                        <td>
                            Uzman :
                        </td>
                        <td>
                            {this.game.Generators.ForemanCount}
                        </td>
                        <td>
                            {this.game.Generators.ForemanManufactureRate} jeans/sn
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
                        {this.game.Generators.ForemanCount !== 0 && (
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
                        )}
                    </tr>

                    <tr>
                        <td>
                            Usta :
                        </td>
                        <td>
                            {this.game.Generators.MasterCount}
                        </td>
                        <td>
                            {this.game.Generators.MasterManufactureRate} jeans/sn
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
                        {this.game.Generators.MasterCount !== 0 && (
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
                        )}
                    </tr>

                </table>

                <br />
                <table className="part-header">
                    <tr>
                        <td>
                            <h3>Malzeme Alımı</h3>
                        </td>
                        <td>
                            <div style={{ float: "right" }}>
                                {null//Çalışan Sayısı : {this.game.StuffCount
                                }
                            </div>
                        </td>
                    </tr>
                </table>
                <hr />


                <table className="tl-body">
                    {this.game.soldJeans
                        >= this.game.SalesLimitForBuyAutoBuyer
                        && (

                            <tr>
                                <td title="Satın Alma Müdürü" className="tl-2">
                                    Satın Alma Müdürü :
                                </td>

                                <td className="tl-4">
                                    {this.game.hasAutoBuyer === false
                                        && (
                                            <button
                                                className="bt-block"
                                                disabled={!this.game.canBuyAutoBuyer()}
                                                onClick={() => this.game.BuyAutoBuyer()}
                                            >
                                                İşe Al
                                <br />
                                                {this.game.AutoBuyerCost} ₺ Öde
                                    </button>
                                        )}
                                </td>

                                <td className="tl-4">
                                    {this.game.hasAutoBuyer === true
                                        && (
                                            <button
                                                className="bt-block"
                                                disabled={!this.game.canFireAutoBuyer()}
                                                onClick={() => this.game.FireAutoBuyer()}
                                                title="Tazminat Öde"
                                            >
                                                Kov
                                <br />
                                                {this.game.indemnityCost(
                                                    this.game.AutoBuyerCost
                                                )} ₺ Öde
                                    </button>
                                        )}
                                </td>
                            </tr>
                        )
                    }
                </table>

                <table className="tl-body">
                    {this.game.soldJeans >= this.game.SalesLimitForBuyAutoBuyer
                        && this.game.hasAutoBuyer === true &&
                        (
                            <tr>
                                <td style={{ width: "40%" }}>
                                    Otomatik Pamuk 
                                    <br />
                                    Alma Üst Limiti :
                                    <br />
                                    Almaya Başlama Fiyatı :
                                </td>
                                <td style={{ width: "30%" }}>
                                    {this.game.AutoBuyerBuyCottonTopLimit} gr
                                    <br />
                                    {this.game.AutoBuyerBuyMoneyTopLimit} ₺
                                    <br />
                                    {this.game.AutoBuyerBuyMoneyStartPrice} ₺
                                </td>
                                <td style={{ width: "30%" }}>
                                    <button
                                        onClick={() => this.game.increaseAutoBuyingTopLimit()}
                                    >
                                        +
                                    </button>&nbsp;
                                     <button
                                        disabled={!this.game.canDecreaseAutoBuyingTopLimit()}
                                        onClick={() => this.game.decreaseAutoBuyingTopLimit()}
                                    >
                                        -
                                    </button>&nbsp;
                                    <button
                                        disabled={null}
                                        onClick={() => this.game.AutoBuyerWorkStatusToggle()}
                                        title="Otomatik Pamuk Satın Alma"
                                    >
                                        {this.game.AutoBuyerWorkStatus
                                            ? "Durdur"
                                            : "Başlat"
                                        }
                                    </button>

                                    <br />

                                    <button
                                        onClick={() => this.game.AutoBuyerIncreaseMoneyLimit()}
                                    >
                                        +
                                     </button>&nbsp;
                                     <button
                                        disabled={!this.game.canAutoBuyerDecreaseMoneyLimit()}
                                        onClick={() => this.game.AutoBuyerDecreaseMoneyLimit()}
                                    >
                                        -
                                    </button>

                                    <br />

                                    <button
                                        onClick={() => this.game.AutoBuyerIncreaseStartingMoneyLimit()}
                                    >
                                        +
                                     </button>&nbsp;
                                     <button
                                        disabled={!this.game.canAutoBuyerStartingDecreaseMoneyLimit()}
                                        onClick={() => this.game.AutoBuyerDecreaseStartingMoneyLimit()}
                                    >
                                        -
                                    </button>
                                </td>
                            </tr>
                        )}

                </table>



            </div>
        )
    }
}
export default home;
