import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedVehicle from "../../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";

//Importar Carrusel
import GruaLatoneria from "../../../CarruselVehiculos/Camionestrompa/GruaConTrompa/GruaLatoneria";

const GruaLatoneriaCentro = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

    // Definicion Latoneria
    const [marcaBotonIzquierdo, setMarcaBotonIzquierdo] = useState(
        "botoncarroceriaexterior"
    );
    const [marcaBotonCentro, setMarcaBotonCentro] = useState(
        "botoncarroceriaexterior"
    );
    const [marcaBotonDerecho, setMarcaBotonDerecho] = useState(
        "botoncarroceriaexteriordos"
    );
    const [informacionMarcaBotonIzquierdo, setInformacionMarcaBotonIzquierdo] =
        useState("informacionbotoncarroceriaexterior");
    const [informacionMarcaBotonCentro, setInformacionMarcaBotonCentro] =
        useState("informacionbotoncarroceriaexterior");
    const [informacionMarcaBotonDerecho, setInformacionMarcaBotonDerecho] =
        useState("informacionbotoncarroceriaexteriordos");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);

    // Asignamos Datos seleccionado en el exterior vehículo
    const datoseleccinoexterior = useSelector(
        (state) => state.dataselectedexternal.dataselectedexternal
    );
    const [controlFijar, setControlFijar] = useState("mt-50");
    const [closeWindow, setCloseWindow] = useState(false);

    console.log(
        "LADO DEL VEHICULO SELECCIONADO : ",
        datoseleccinoexterior.exterior
    );

    useEffect(() => {
        setMarcaBotonCentro("botoncarroceriasedanseleccionadados");
        setInformacionMarcaBotonCentro(
            "informacionbotoncarroceriasedanseleccionada"
        );

        setMarcaBotonIzquierdo("botoncarroceriaexterior");
        setInformacionMarcaBotonIzquierdo("informacionbotoncarroceriaexterior");

        setMarcaBotonDerecho("botoncarroceriaexteriordos");
        setInformacionMarcaBotonDerecho("informacionbotoncarroceriaexteriordos");
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
        router.push(
            "/searchinteractive/camionestrompa/gruacontrompa/searchgrualatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        router.push(
            "/searchinteractive/camionestrompa/gruacontrompa/searchgruahabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        router.push(
            "/searchinteractive/camionestrompa/gruacontrompa/searchgruamotorelectrico"
        );
    };

    const irLatoneriaIzquierda = () => {
        router.push(
            "/searchinteractive/camionestrompa/gruacontrompa/searchgrualatoneriaizquierda"
        );
    };

    const irLatoneriaCentro = () => {
        router.push(
            "/searchinteractive/camionestrompa/gruacontrompa/searchgrualatoneriacentro"
        );
    };

    const irLatoneriaDerecha = () => {
        router.push(
            "/searchinteractive/camionestrompa/gruacontrompa/searchgrualatoneriaderecha"
        );
    };

    useEffect(() => {
        if (maximizarOption != 0) setControlFijar("mt-20 fijardatosvehiculo");
        else setControlFijar("");
    }, [maximizarOption]);

    const minimizar = () => {
        if (maximizarOption != 0) {
            setMaximizarOption(0);
        }
    };

    const cerrarVenta = () => {
        setCloseWindow(true);
    };

    // Restaura datos del buscador interactivo
    useEffect(() => {
        if (maximizarOption == 0) setCloseWindow(false);
    }, [maximizarOption]);

    return (
        <Container title="Mi Cuenta">
            <div className="row ps-page ps-page--inner" id="searchmr">
                <div className={zoomTipoVehiculo}>
                    {!closeWindow ? (
                        <div className={controlFijar}>
                            {maximizarOption != 0 ? (
                                <Row>
                                    <Col xs={1} sm={2} md={2} lg={2}>
                                        <a
                                            className="tamanoiconocerrarsearch tamañomaximizaricon"
                                            onClick={() => minimizar()}>
                                            <i
                                                className="mt-3 fa fa-2x fa fa-arrows-alt"
                                                aria-hidden="true"></i>
                                        </a>
                                    </Col>
                                    <Col xs={1} sm={2} md={2} lg={2}>
                                        <div className="bordecajaiconcerrar apuntador">
                                            <CloseIcon
                                                className="mlmenos3"
                                                style={{
                                                    fontSize: 90,
                                                    color: "#2D2E83",
                                                }}
                                                onClick={() =>
                                                    cerrarVenta()
                                                }></CloseIcon>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}

                            <div className="ml-20">
                                <SelectedVehicle />
                            </div>
                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosposicionproductocarroceriaexterior">
                                            <Row>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="botoncarroceriasedanseleccionada"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneria
                                                        }>
                                                        Exterior
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriasedanseleccionada"
                                                        variant="outline-light"
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
                                                        className="botoncarroceriaexterior"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoHabitaculo
                                                        }>
                                                        Interior
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriaexteriortres"
                                                        variant="outline-light"
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
                                                        className="botoncarroceriaexteriorcentrodos"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoMotorElectrico
                                                        }>
                                                        Tren Motriz
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriaexterior"
                                                        variant="outline-light"
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
                            <h3 className="mt-3 centrartextosexterior">
                                Elige en que parte del exterior está ubicado tu repuesto
                            </h3>
                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosposicionproductocarroceriaexterior">
                                            <Row>
                                                <Col xs lg={2} className="ml-1">
                                                     {/*
                                                    <Button
                                                        className={
                                                            marcaBotonIzquierdo
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            irLatoneriaIzquierda
                                                        }>
                                                        Izquierda
                                                    </Button>
                                                      */}
                                                </Col>
                                                <Col xs={3} md={3} lg={3}>
                                                     {/*
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonIzquierdo
                                                        }
                                                        variant="outline-light"
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
                                                      */}
                                                </Col>

                                                <Col xs={3} md={3} lg={3} className="ml-19" >
                                                    <Button
                                                        className={
                                                            marcaBotonCentro
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            irLatoneriaCentro
                                                        }>
                                                        Unica selección
                                                    </Button>
                                                </Col>
                                                <Col xs={2} md={2} lg={2} className="mlmenos10">
                                                    <Button
                                                       className="informacionbotonarticuladostrompados"
                                                        variant="outline-light"
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
                                                      {/*
                                                    <Button
                                                        className={
                                                            marcaBotonDerecho
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            irLatoneriaDerecha
                                                        }>
                                                        Derecha
                                                    </Button>
                                                */}
                                                </Col>
                                                <Col xs lg={1}>
                                                      {/*
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonDerecho
                                                        }
                                                        variant="outline-light"
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
                                                       */}
                                                </Col>
                                            </Row>
                                        </div>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <div>
                                <Row>
                                    <Col xs lg={6}>
                                        <div className="cajaimagenlatoneriachasissencillo auth__box-logo ">
                                            <GruaLatoneria
                                                ubicacion={"centro"}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <h1 className="textobuscadorintecractivomessage">
                                            ** Las imágenes a continuación son
                                            con fines ilustrativos, por ello
                                            pueden no corresponder exactamente
                                            con tu vehículo.
                                        </h1>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <img
                                            className="logobuscadormr"
                                            src={logo.src}
                                            alt="First slide"
                                        />
                                    </Col>
                                </Row>
                        </div>
                    ) : null}
                    {maximizarOption != 0 ? (
                        <div className="fijarfiltros mt-90 maximizarbusquedafiltros">
                            <SidebarShopInteractiveSearch />
                        </div>
                    ) : null}
                </div>

                <div className={zoomBusquedaProductos}>
                    <div className="espacioiconosderechamotorelectrico">
                        <SearchInteractiveItems
                            productoBuscar={productoBuscar}
                            zoomTipoVehiculo={zoomTipoVehiculo}
                            setZoomTipoVehiculo={setZoomTipoVehiculo}
                            zoomBusquedaProductos={zoomBusquedaProductos}
                            setZoomBusquedaProductos={setZoomBusquedaProductos}
                            zoomBusquedaItems={zoomBusquedaItems}
                            setZoomBusquedaItems={setZoomBusquedaItems}
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            setMaximizarOption={setMaximizarOption}
                            maximizarOption={maximizarOption}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default GruaLatoneriaCentro;
