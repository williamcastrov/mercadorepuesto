import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const selectedvehicle = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const regresarAlBuscador = () => {
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };

    return (
        <div className="carroceriasedan">
            <Row>
                <div className="espaciobordecarroceriasedaninteractivo"></div>
                <div >
                    <Col xs lg={10}>
                        <ButtonGroup>
                            <div className="espacioborde">
                                <Row>
                                    <Col xs lg={12} md={{ offset: 0 }}>
                                        <Button className="botondatosbuscadorizquierda">
                                            {
                                                datosbuscadorinteractivo.nombretipovehiculo
                                            }
                                        </Button>

                                        <Button className="botondatosbuscador">
                                            {
                                                datosbuscadorinteractivo.nombrecarroceria
                                            }
                                        </Button>

                                        <Button className="botondatosbuscador">
                                            {
                                                datosbuscadorinteractivo.nombremarca
                                            }
                                        </Button>

                                        <Button className="botondatosbuscador">
                                            {
                                                datosbuscadorinteractivo.nombreaño1
                                            }
                                        </Button>

                                        <Button className="botondatosbuscador">
                                            {
                                                datosbuscadorinteractivo.nombremodelo1
                                            }
                                        </Button>

                                        <Button className="botondatosbuscador">
                                            {
                                                datosbuscadorinteractivo.nombrecilindraje1
                                            }
                                        </Button>

                                        <Button className="botondatosbuscador">
                                            {
                                                datosbuscadorinteractivo.nombreTipoCombustibe
                                            }
                                        </Button>

                                        <Button className="botondatosbuscadorderecha">
                                            {
                                                datosbuscadorinteractivo.nombretransmision
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </ButtonGroup>
                    </Col>
                    <hr />  
                </div>
                {
              /*
                <Col lg={1}>
                    <Button
                        className="botonregresar"
                        onClick={() => regresarAlBuscador()}>
                        <i
                            className="fa fa-2x fa-arrow-left colorflecha"
                            aria-hidden="true"></i>
                    </Button>
                </Col>
                */
                  }
            </Row>
        </div>
    );
};
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default selectedvehicle;
