import React from "react";

const CategoriasRecomendadas = () => {



    return (
        <div className="mainContCategoriasRecomendadas">
            <div className="titleCatRec">
                <h2 className="titleCatRecHDOS">Categorías recomendadas</h2>
            </div>
            <div className="CatRecomendadasBalls">
                <div className="contBall">
                    <div className="BallcontBall">
                        <img src="https://i.postimg.cc/QMnY90yW/volante.png" alt="" className="ImgBall" />
                    </div>
                    <div className="contBallName">
                        <p>Accesorios <br />
                            interior</p>
                    </div>
                </div>

                <div className="contBall">
                    <div className="BallcontBall">
                        <img src="https://i.postimg.cc/brvTnH8W/Carro.png" alt="" className="ImgBall" />
                    </div>
                    <div className="contBallName">
                        <p>Accesorios <br />
                            exterior</p>
                    </div>
                </div>

                <div className="contBall">
                    <div className="BallcontBall">
                        <img src="https://i.postimg.cc/x8j6f3Bc/Farola.png" alt="" className="ImgBall" />
                    </div>
                    <div className="contBallName">
                        <p>Iluminación</p>
                    </div>
                </div>

                <div className="contBall">
                    <div className="BallcontBall">
                        <img src="https://i.postimg.cc/G2gyDPHB/Parlante.png" alt="" className="ImgBall" />
                    </div>
                    <div className="contBallName">
                        <p>Sonido</p>
                    </div>
                </div>

                <div className="contBall">
                    <div className="BallcontBall">
                        <img src="https://i.postimg.cc/85zvsXPQ/Gasolina.png" alt="" className="ImgBall" />
                    </div>
                    <div className="contBallName">
                        <p>Lubricantes</p>
                    </div>
                </div>

                <div className="contBall">
                    <div className="BallcontBall">
                        <img src="https://i.postimg.cc/Rh0T5Vnt/llantas.png" alt="" className="ImgBall" />
                    </div>
                    <div className="contBallName">
                        <p>Llantas y rines</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriasRecomendadas;
