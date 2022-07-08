import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
} from "react-bootstrap";

function ModalComentariosUbicacionProducto({ shown, close, texto }) {
    const [textoExterior, setTextoExterior] = useState(
        "Productos ubicados en la parte exterior del vehículo"
    );
    const [textoInterior, setTextoInterior] = useState(
        "Productos ubicados en la parte exterior de los vehículos"
    );
    const [textoTrenMotriz, setTextoTrenMotriz] = useState(
        "Productos ubicados en los diferentes sistemas ubicados en tren motriz"
    );
    const [textoIzquierda, setTextoIzquierda] = useState(
        "Productos ubicados en la parte izquierda la latoneria"
    );
    const [textoCentro, setTextoCentro] = useState(
        "Productos ubicados en el centro del la latoneria"
    );
    const [textoDerecha, setTextoDerecha] = useState(
        "Productos ubicados en la parte derecha de la latoneria"
    );

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col
                            xl={7}
                            lg={7}
                            md={7}
                            sm={7}
                            className="ml-130 mb-10">
                            <div className="tamañotextocrearproductoinfo">
                                {texto == 1 ? (
                                    <h2>Productos Latoneria</h2>
                                ) : texto == 2 ? (
                                    <h2>Productos Habitaculo</h2>
                                ) : texto == 3 ? (
                                    <h2>Productos Tren Motriz</h2>
                                ) : texto == 4 ? (
                                    <h2>Productos Latoneria Izquierda</h2>
                                ) : texto == 5 ? (
                                    <h2>Productos Latoneria Centro</h2>
                                ) : texto == 6 ? (
                                    <h2>Productos Latoneria Derecha</h2>
                                ) : null}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-50"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>

                <div className="ml-20 mr-30 textomodalinfoproductos">
                    {texto == 1 ? (
                        <h2 className="textomodalinfpocategorias">{textoExterior}</h2>
                    ) : texto == 2 ? (
                        <h2 className="textomodalinfpocategorias">{textoInterior}</h2>
                    ) : texto == 3 ? (
                        <h2 className="textomodalinfpocategorias">{textoTrenMotriz}</h2>
                    ) : texto == 4 ? (
                        <h2 className="textomodalinfpocategorias">{textoIzquierda}</h2>
                    ) : texto == 5 ? (
                        <h2 className="textomodalinfpocategorias">{textoCentro}</h2>
                    ) : texto == 6 ? (
                        <h2 className="textomodalinfpocategorias">{textoDerecha}</h2>
                    ) : null}
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalComentariosUbicacionProducto;
