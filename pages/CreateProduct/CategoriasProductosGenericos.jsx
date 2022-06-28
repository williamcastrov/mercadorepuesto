import React, { useState, useEffect, useRef } from "react";

import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
    Tooltip,
    Overlay,
} from "react-bootstrap";

function CategoriasProductosGenericos(props) {
    const [nombreUbicacionExterior, setnombreUbicacionExterior] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionInterior, setnombreUbicacionInterior] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionTrenMotriz, setnombreUbicacionTrenMotriz] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");

    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);

    const prueba = () => {};

    return (
        <div>
            <Row>
                <Col xl={4} lg={4} md={4} xs={4} className="mlmenos5">
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <Button
                                className={nombreUbicacionExterior}
                                onClick={prueba}>
                                EXTERIOR
                            </Button>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1} className="mlmenos25">
                            <Button
                                className={nombreUbicacionExteriorInfo}
                                onClick={prueba}>
                                {!ubicarProductoLatoneria ? (
                                    <i
                                        class="fa fa-info d-flex justify-content-center"
                                        aria-hidden="true"></i>
                                ) : (
                                    <i
                                        class="fa fa-check-square-o d-flex justify-content-center"
                                        aria-hidden="true"></i>
                                )}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <Button
                                className={nombreUbicacionInterior}
                                onClick={prueba}>
                                INTERIOR
                            </Button>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1} className="mlmenos25">
                            <Button
                                className={nombreUbicacionInteriorInfo}
                                onClick={prueba}>
                                {!ubicarProductoHabitaculo ? (
                                    <i
                                        class="fa fa-info d-flex justify-content-center"
                                        aria-hidden="true"></i>
                                ) : (
                                    <i
                                        class="fa fa-check-square-o d-flex justify-content-center"
                                        aria-hidden="true"></i>
                                )}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={10} xs={10}>
                            <Button
                                className={nombreUbicacionTrenMotriz}
                                onClick={prueba}>
                                TREN MOTRIZ
                            </Button>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1} className="mlmenos25">
                            {/*
                                        <Button
                                            className={
                                                nombreUbicacionTrenMotrizInfo
                                            }
                                            onClick={prueba}>
                                            {!ubicarProductoMotor ? (
                                                <i
                                                    class="fa fa-info d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </Button>
*/}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default CategoriasProductosGenericos;
