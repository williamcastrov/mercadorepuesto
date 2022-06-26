import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import SelectedVehicle from "./selectedvehicle";

//Importafotos
import sedangris from "../../../public/imgcarrusel/sedan/prueba/Baseexterior.jpg";
import { getDataSelectedExternal } from "../../../store/dataselectedexternal/action";
import SearchInteractive from "../../search/searchinteractive.jsx";
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";

const SearchInteractiveSedanLatoneria = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [productoBuscar, setProductoBuscar] = useState("BMW");
    // Definicion Latoneria
    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalHabitaculo, setShowModalhabitaculo] = useState(false);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalMotorElectrico, setShowModalMotorElectrico] =
        useState(false);
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Asignamos Datos al arreglo de Tipos de Vehiculos desde el state
    const tiposvehiculos = useSelector(
        (state) => state.typesvehicles.typesvehicles
    );
    // Asignamos Datos al arrego de Marcas de Vehiculos desde el state
    const marcasvehiculos = useSelector(
        (state) => state.vehiclesbrands.vehiclesbrands
    );
    // Asignamos Datos al arrego de Años de los Vehiculos desde el state
    const annosvehiculos = useSelector(
        (state) => state.yearsvehicles.yearsvehicles
    );
    // Asignamos Datos al arrego de modelos segun marca de los Vehiculos desde el state
    const modelosvehiculos = useSelector(
        (state) => state.modelsvehicles.modelsvehicles
    );
    // Asignamos Datos al arrego de carrocerias segun tipo de Vehiculos desde el state
    const carroceriasvehiculos = useSelector(
        (state) => state.bodiesvehicles.bodiesvehicles
    );
    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    //console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
    };

    const seleccionaUbicarProductoLatoneriaIzquierda = () => {
        const DatoSeleccionadoLatoneria = {
            exterior: 1,
        };

        console.log(`SELECCIONO LADO IZQUIERDO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push("/searchinteractive/sedan/searchsedanlatoneriaizquierda");
    };

    const seleccionaUbicarProductoLatoneriaCentro = () => {
        const DatoSeleccionadoLatoneria = {
            exterior: 2,
        };

        //console.log(`SELECCIONO EL CENTRO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push("/searchinteractive/sedan/searchsedanlatoneriacentro");
    };

    const seleccionaUbicarProductoLatoneriaDerecha = () => {
        const DatoSeleccionadoLatoneria = {
            exterior: 3,
        };

        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push("/searchinteractive/sedan/searchsedanlatoneriaderecha");
    };

    const seleccionaUbicarProductoLatoneria = () => {};

    const seleccionaUbicarProductoHabitaculo = () => {
        router.push("/searchinteractive/sedan/searchsedanhabitaculo");
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        router.push("/searchinteractive/sedan/searchsedanmotorelectrico");
    };

    // Lee de la base de datos los años de los Vehiculos
    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner">
                <Row>
                    <Col lg={6}>
                        <SelectedVehicle />
                        <Row>
                            <Col xs lg={11}>
                                <ButtonGroup>
                                    <div className="espaciosuperiorbordecarroceriasedan">
                                        <Row>
                                            <Col xs lg={2}>
                                                <Button className="botoncarroceriasedanseleccionada">
                                                    Exterior
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedanseleccionada"
                                                    onClick={
                                                        mostrarComentariolatoneria
                                                    }>
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
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedan"
                                                    onClick={
                                                        seleccionaUbicarProductoHabitaculo
                                                    }>
                                                    Interior
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedan"
                                                    onClick={
                                                        mostrarComentariohabitaculo
                                                    }>
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
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedan"
                                                    onClick={
                                                        seleccionaUbicarProductoMotorElectrico
                                                    }>
                                                    Tren Motriz
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedan"
                                                    onClick={
                                                        mostrarComentariomotor
                                                    }>
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
                                            </Col>
                                        </Row>
                                    </div>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <h3 className="ml-170">
                            En que parte de la latonería está ubicado tu
                            producto
                        </h3>
                        <Row>
                            <Col xs lg={11}>
                                <ButtonGroup>
                                    <div className="espaciosuperiorbordecarroceriasedan">
                                        <Row>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanlatoneriaeit"
                                                    onClick={
                                                        seleccionaUbicarProductoLatoneriaIzquierda
                                                    }>
                                                    Izquierda
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedancdidos"
                                                    onClick={
                                                        mostrarComentariolatoneria
                                                    }>
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

                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanlatoneriaeit"
                                                    onClick={
                                                        seleccionaUbicarProductoLatoneriaCentro
                                                    }>
                                                    Centro
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedancdidos"
                                                    onClick={
                                                        mostrarComentariohabitaculo
                                                    }>
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
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanlatoneriaeit"
                                                    onClick={
                                                        seleccionaUbicarProductoLatoneriaDerecha
                                                    }>
                                                    Derecha
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedancdidos"
                                                    onClick={
                                                        mostrarComentariomotor
                                                    }>
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
                                            </Col>
                                        </Row>
                                    </div>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <div className="cajasedanimagenlatoneria">
                            <div className="auth__box-logo">
                                <img src={sedangris.src} />
                            </div>
                            <div className="espaciologomrsedan">
                                <img src={logo.src} alt="First slide" />
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="espacioiconosderechamotorelectrico">
                            <SearchInteractive
                                productoBuscar={productoBuscar}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};
//className="tamañoimagenmotorelectricobase"
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default SearchInteractiveSedanLatoneria;
