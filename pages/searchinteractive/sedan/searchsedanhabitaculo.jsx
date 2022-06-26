import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import SelectedVehicle from "./selectedvehicle";

//Importafotos
import sedanhabitaculo from "../../../public/imgcarrusel/sedan/Sedanhabitaculobase.jpg";
import sedanhabitaculoconsola from "../../../public/imgcarrusel/sedan/Sedanhabitaculoconsola.jpg";
import sedanhabitaculoasientos from "../../../public/imgcarrusel/sedan/Sedanhabitaculoasientos.jpg";
import sedanhabitaculotecho from "../../../public/imgcarrusel/sedan/Sedanhabitaculotecho.jpg";
import SearchInteractive from "../../search/searchinteractive.jsx";
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";

const SearchInteractiveSedanHabitaculo = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();

    // Definicion Latoneria
    const [marcaBotonConsola, setMarcaBotonConsola] = useState(
        "botoncarroceriasedanlatoneriaeit"
    );
    const [marcaBotonAsiento, setMarcaBotonAsiento] = useState(
        "botoncarroceriasedanlatoneriaeit"
    );
    const [marcaBotontecho, setMarcaBotontecho] = useState(
        "botoncarroceriasedanlatoneriaeit"
    );
    const [informacionMarcaBotonConsola, setInformacionMarcaBotonConsola] =
        useState("informacionbotoncarroceriasedancdidos");
    const [informacionMarcaBotonAsiento, setInformacionMarcaBotonAsiento] =
        useState("informacionbotoncarroceriasedancdidos");
    const [informacionMarcaBotontecho, setInformacionMarcaBotontecho] =
        useState("informacionbotoncarroceriasedancdidos");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);

    const [ubicarProductoConsola, setUbicarProductoConsola] = useState(false);
    const [ubicarProductoAsientoGeneral, setUbicarProductoAsientoGeneral] =
        useState(false);
    const [ubicarProductoTecho, setUbicarProductoTecho] = useState(false);

    const [habilitarMarcacion, setHabilitarMarcacion] = useState(false);

    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(true);
    const [marcarHabitaculo, setMarcarHabitaculo] = useState(false);

    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    const [habilitarCategoriaHabitaculo, setHabilitarCategoriaHabitaculo] =
        useState(true);

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
    const [showModalHabitaculo, setShowModalhabitaculo] = useState(false);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [marcas, setMarcas] = useState([]);
    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda
    const [modelos, setModels] = useState([]);
    // Arreglo carrocerias de los Vehiculos segun Tipo Selecciondo
    const [carrocerias, setCarrocerias] = useState([]);
    // Disparar procedimiento que lee los Tipos de Vehiculos

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

    const seleccionaParteConsola = () => {
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);

        setUbicarProductoConsola(true);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoTecho(false);

        setMarcaBotonConsola("botonsedanizquierdaderechacentromarcado");
        setMarcaBotonAsiento("botoncarroceriasedanlatoneriaeit");
        setMarcaBotontecho("botoncarroceriasedanlatoneriaeit");

        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedanseleccionada"
        );
        setInformacionMarcaBotonAsiento(
            "informacionbotoncarroceriasedancdidos"
        );
        setInformacionMarcaBotontecho("informacionbotoncarroceriasedancdidos");
    };

    const seleccionaParteAsientosGeneral = () => {
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoAsientoGeneral(true);
        setUbicarProductoConsola(false);
        setUbicarProductoTecho(false);
        setMarcaBotonConsola("botoncarroceriasedanlatoneriaeit");
        setMarcaBotonAsiento("botonsedanizquierdaderechacentromarcado");
        setMarcaBotontecho("botoncarroceriasedanlatoneriaeit");

        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedancdidos"
        );
        setInformacionMarcaBotonAsiento(
            "informacionbotoncarroceriasedanseleccionada"
        );
        setInformacionMarcaBotontecho("informacionbotoncarroceriasedancdidos");
    };

    const seleccionaParteTecho = () => {
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoTecho(true);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoConsola(false);
        setMarcaBotonConsola("botoncarroceriasedanlatoneriaeit");
        setMarcaBotonAsiento("botoncarroceriasedanlatoneriaeit");
        setMarcaBotontecho("botonsedanizquierdaderechacentromarcado");
        //router.push("/searchinteractive/sedan/searchsedanlatoneriaderecha");

        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedancdidos"
        );
        setInformacionMarcaBotonAsiento(
            "informacionbotoncarroceriasedancdidos"
        );
        setInformacionMarcaBotontecho(
            "informacionbotoncarroceriasedanseleccionada"
        );
    };

    const seleccionaUbicarProductoLatoneria = () => {
        router.push("/searchinteractive/sedan/searchsedanlatoneria");
    };

    const seleccionaUbicarProductoHabitaculo = () => {};

    const seleccionaUbicarProductoMotorElectrico = () => {
        router.push("/searchinteractive/sedan/searchsedanmotorelectrico");
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
                                                    className="botoncarroceriasedan"
                                                    onClick={
                                                        seleccionaUbicarProductoLatoneria
                                                    }>
                                                    Exterior
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedan"
                                                    onClick={
                                                        mostrarComentariolatoneria
                                                    }>
                                                    {!ubicarProductoLatoneria ? (
                                                        <i
                                                            className="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            v="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button className="botoncarroceriasedanseleccionada">
                                                    Interior
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedanseleccionada"
                                                    onClick={
                                                        mostrarComentariohabitaculo
                                                    }>
                                                    {
                                                        /*!ubicarProductoHabitaculo ? (*/
                                                        <i
                                                            className="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                        /*) : (
                                                    <i
                                                        class="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )*/
                                                    }
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
                                                            className="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            className="fa fa-check-square-o d-flex justify-content-center"
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
                            En que parte del interior está ubicado tu repuesto
                        </h3>
                        <Row>
                            <Col xs lg={11}>
                                <ButtonGroup>
                                    <div className="espaciosuperiorbordecarroceriasedan">
                                        <Row>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        marcaBotonConsola
                                                    }
                                                    onClick={
                                                        seleccionaParteConsola
                                                    }>
                                                    Consola
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        informacionMarcaBotonConsola
                                                    }
                                                    onClick={
                                                        mostrarComentariolatoneria
                                                    }>
                                                    {!habilitarMarcacion ? (
                                                        <i
                                                            className="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            className="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        marcaBotonAsiento
                                                    }
                                                    onClick={
                                                        seleccionaParteAsientosGeneral
                                                    }>
                                                    Asientos
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        informacionMarcaBotonAsiento
                                                    }
                                                    onClick={
                                                        mostrarComentariohabitaculo
                                                    }>
                                                    {!habilitarMarcacion ? (
                                                        <i
                                                            className="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            className="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={marcaBotontecho}
                                                    onClick={
                                                        seleccionaParteTecho
                                                    }>
                                                    Techo
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className={
                                                        informacionMarcaBotontecho
                                                    }
                                                    onClick={
                                                        mostrarComentariomotor
                                                    }>
                                                    {!habilitarMarcacion ? (
                                                        <i
                                                            className="fa fa-info d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    ) : (
                                                        <i
                                                            className="fa fa-check-square-o d-flex justify-content-center"
                                                            aria-hidden="true"></i>
                                                    )}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <br />
                        <div className="espaciocajafotoshabitaculo">
                            <Row>
                                <Col xs lg={12}>
                                    {ubicarProductoHabitaculo ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculo"
                                                src={sedanhabitaculo.src}
                                            />
                                            <div className="espaciologomr">
                                                <img
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        </div>
                                    ) : ubicarProductoConsola ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculo"
                                                src={sedanhabitaculoconsola.src}
                                            />
                                            <div className="espaciologomr">
                                                <img
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        </div>
                                    ) : ubicarProductoAsientoGeneral ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculo"
                                                src={
                                                    sedanhabitaculoasientos.src
                                                }
                                            />
                                            <div className="espaciologomr">
                                                <img
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        </div>
                                    ) : ubicarProductoTecho ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculo"
                                                src={sedanhabitaculotecho.src}
                                            />
                                            <div className="espaciologomr">
                                                <img
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
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

export default SearchInteractiveSedanHabitaculo;
