import React, { Component } from 'react'
import Game from '../components/game'

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
            UnitJeansCottonCost,
            UnitCottonMoneyCost,
            cotton,
            currentJeans,
            soldJeans,
            produceJeans,
            money
        } = this.game;

        return (
            <div>
                <table style={{ width: "100%" }}>
                    <tr>
                        <td style={{ width: "33%" }}>
                        </td>
                        <td style={{ width: "33%" }}>
                            <button
                                disabled={!this.game.canProduceJean()}
                                onClick={produceJeans}
                            >
                                Jeans Üret
                            </button>
                        </td>
                        <td style={{ width: "33%" }}>
                        </td>
                    </tr>
                </table>

                <h3>İşletme</h3>

                <table style={{ width: "100%" }}>

                    <tr>
                        <td style={{ width: "33%" }}>
                            Kasadaki Para :
                        </td>
                        <td style={{ width: "33%" }}>
                            {money} ₺
                        </td>
                        <td style={{ width: "33%" }}></td>
                    </tr>

                    <tr>
                        <td>
                            Depodaki Jeans :
                        </td>
                        <td>
                            {currentJeans}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Üretilen Jeans :
                        </td>
                        <td>
                            {manufacturedJeans}
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
                            Pamuk Mâaliyeti :
                        </td>
                        <td>
                            {UnitJeansCottonCost} Pamuk
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

                </table>

                <h3>Üretim</h3>

                <table style={{ width: "100%" }}>

                    <tr>
                        <td style={{ width: "33%" }}>
                            Jeans / Saniye :
                        </td>
                        <td style={{ width: "33%" }}>
                            {lastManufacturedRate}
                        </td>
                        <td style={{ width: "33%" }}></td>
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
                                disabled={!this.game.canBuyCotton()}
                                onClick={buyCotton}
                            >
                                Satın Al
                            </button>
                            <br/>
                            Maaliyet(Pamuk): 
                            <br/> 1000 gr = {UnitCottonMoneyCost} ₺ 
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