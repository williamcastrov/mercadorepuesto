import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedVehicle from "./selectedvehicle";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

//Importar Carrusel
import SedanLatoneria from "../../CarruselVehiculos/CarruselSedan/SedanLatoneria";
import imagen1 from "../../../public/imgcarrusel/sedan/sedanlatoneriaderecha1.png";
import imagen2 from "../../../public/imgcarrusel/sedan/sedanlatoneriaderecha2.png";
import SearchInteractive from "../../search/searchinteractive.jsx";

const SearchInteractiveSedanLatoneriaDerecha = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    let derecha = 3;
    // Definicion Latoneria
    const [marcaBotonIzquierdo, setMarcaBotonIzquierdo] = useState(
        "botoncarroceriasedan"
    );
    const [marcaBotonCentro, setMarcaBotonCentro] = useState(
        "botoncarroceriasedan"
    );
    const [marcaBotonDerecho, setMarcaBotonDerecho] = useState(
        "botoncarroceriasedan"
    );
    const [informacionMarcaBotonIzquierdo, setInformacionMarcaBotonIzquierdo] =
        useState("informacionbotoncarroceriasedan");
    const [informacionMarcaBotonCentro, setInformacionMarcaBotonCentro] =
        useState("informacionbotoncarroceriasedan");
    const [informacionMarcaBotonDerecho, setInformacionMarcaBotonDerecho] =
        useState("informacionbotoncarroceriasedan");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [
        ubicarProductoLatoneriaIzquierda,
        setUbicarProductoLatoneriaIzquierda,
    ] = useState(false);
    const [ubicarProductoLatoneriaCentro, setUbicarProductoLatoneriaCentro] =
        useState(false);
    const [ubicarProductoLatoneriaDerecha, setUbicarProductoLatoneriaDerecha] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    const [
        ubicarCategoriaSedanLatoneriaDerechaMetalica,
        setubicarCategoriaSedanLatoneriaDerechaMetalica,
    ] = useState(false);
    const [
        ubicarCategoriaSedanLatoneriaDerechaVidrio,
        setubicarCategoriaSedanLatoneriaDerechaVidrio,
    ] = useState(false);
    const [
        ubicarCategoriaSedanLatoneriaDerechaPlasticas,
        setubicarCategoriaSedanLatoneriaDerechaPlasticas,
    ] = useState(false);
    const [
        ubicarCategoriaSedanLatoneriaDerechaCaucho,
        setubicarCategoriaSedanLatoneriaDerechaCaucho,
    ] = useState(false);

    // Definicion Habitácuolo
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [annos, setAnnos] = useState([]);

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);

    // Asignamos Datos seleccionado en el exterior vehículo
    const datoseleccinoexterior = useSelector(
        (state) => state.dataselectedexternal.dataselectedexternal
    );

    console.log(
        "LADO DEL VEHICULO SELECCIONADO : ",
        datoseleccinoexterior.exterior
    );

    useEffect(() => {
        if (datoseleccinoexterior.exterior === 1) {
            setMarcaBotonIzquierdo("botoncarroceriasedanseleccionada");
            setInformacionMarcaBotonIzquierdo(
                "informacionbotoncarroceriasedanseleccionada"
            );
        } else if (datoseleccinoexterior.exterior === 2) {
            setMarcaBotonCentro("botoncarroceriasedanseleccionada");
            setInformacionMarcaBotonCentro(
                "informacionbotoncarroceriasedanseleccionada"
            );
        } else if (datoseleccinoexterior.exterior === 3) {
            setMarcaBotonDerecho("botoncarroceriasedanseleccionada");
            setInformacionMarcaBotonDerecho(
                "informacionbotoncarroceriasedanseleccionada"
            );
        }
    }, []);

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
    };

    const seleccionaUbicarProductoLatoneria = () => {
        router.push("/searchinteractive/sedan/searchsedanlatoneria");
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        router.push("/searchinteractive/sedan/searchsedanhabitaculo");
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        router.push("/searchinteractive/sedan/searchsedanmotorelectrico");
    };

    const irLatoneriaIzquierda = () => {
        router.push("/searchinteractive/sedan/searchsedanlatoneriaizquierda");
    };

    const irLatoneriaCentro = () => {
        router.push("/searchinteractive/sedan/searchsedanlatoneriacentro");
    };

    const irLatoneriaDerecha = () => {
        router.push("/searchinteractive/sedan/searchsedanlatoneriaderecha");
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner">
                <Row>
                    <Col lg={6}>
                        <SelectedVehicle />
                        <hr />
                        <Row>
                            <Col xs lg={11}>
                                <ButtonGroup>
                                    <div className="espaciosuperiorbordecarroceriasedan">
                                        <Row>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="botoncarroceriasedanseleccionada"
                                                    onClick={
                                                        seleccionaUbicarProductoLatoneria
                                                    }>
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

                        <Row>
                            <Col xs lg={11}>
                                <ButtonGroup>
                                    <div className="espaciosuperiorbordecarroceriasedan">
                                        <Row>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        marcaBotonIzquierdo
                                                    }
                                                    onClick={
                                                        irLatoneriaIzquierda
                                                    }>
                                                    Izquierda
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        informacionMarcaBotonIzquierdo
                                                    }
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
                                                    className={marcaBotonCentro}
                                                    onClick={irLatoneriaCentro}>
                                                    Centro
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        informacionMarcaBotonCentro
                                                    }
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
                                                    className={
                                                        marcaBotonDerecho
                                                    }
                                                    onClick={
                                                        mostrarComentariomotor
                                                    }>
                                                    Derecha
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        informacionMarcaBotonDerecho
                                                    }
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
                        <Row>
                            <Col xs lg={7}>
                                <div className="tamañoimagenessedanlatoneria auth__box-logo">
                                    <SedanLatoneria ubicacion={"derecha"} />
                                </div>
                            </Col>
                        </Row>
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
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default SearchInteractiveSedanLatoneriaDerecha;
