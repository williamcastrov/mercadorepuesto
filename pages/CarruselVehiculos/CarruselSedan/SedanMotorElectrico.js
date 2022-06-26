import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";
import refrigeracion1 from "../../../public/imgcarrusel/refrigeracion1.jpg";
import refrigeracion2 from "../../../public/imgcarrusel/refrigeracion2.jpg";

import electrico1 from "../../../public/imgcarrusel/electrico1.jpg";
import electrico2 from "../../../public/imgcarrusel/electrico2.jpg";

function SedanMotorElectrico(props) {
    const { motorelectrico } = props;
    //console.log("IMAGEN : ", imagen1)
    const [imagen1, setImagen1] = useState("");
    const [imagen2, setImagen2] = useState("");
    const [fotos, setFotos] = useState(false);

    useEffect(() => {
        if (motorelectrico === "refrigeracion") {
            setImagen1(refrigeracion1)
            setImagen2(refrigeracion2)
        }

        if (motorelectrico === "electrico") {
            setImagen1(electrico1)
            setImagen2(electrico2)
        }
    }, [fotos]);

    return (
        <div>
            <Carousel className='textocarrusel' prevLabel="" nextLabel="" >
                <Carousel.Item interval={2500} controls="false">
                    <div className='pr-15'>
                        <img
                             width="532px"
                             height="340px"
                            src={imagen1.src}
                            alt="First slide"
                        />
                    </div>
                    <div className="espaciologomrmotorelectrico">
                        <img
                            src={logo.src}

                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={2500} controls="false">
                    <div className='pr-15'>
                        <img
                             width="532px"
                             height="340px"
                            src={imagen2.src}
                            alt="Second slide"
                        />
                    </div>
                    <div className="espaciologomrmotorelectrico">
                        <img
                            src={logo.src}
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default SedanMotorElectrico;