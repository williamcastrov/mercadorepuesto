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

import ModalComentariosCategorias from "./ModalComentariosCategorias";

function CategoriasProductosGenericos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        abrirCerrarCategoriasGenerico,
        setAbrirCerrarCategoriasGenerico,
        categoria,
        setCategoria,
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);

    const [nombreEstetico, setnombreEstetico] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreInterior, setnombreInterior] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreExterior, setnombreExterior] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreSonido, setnombreSonido] = useState("botoncategoriasgenerico");
    const [nombreIluminacion, setnombreIluminacion] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreLubricantes, setnombreLubricantes] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreLlantas, setnombreLlantas] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreBaterias, setnombreBaterias] = useState(
        "botoncategoriasgenerico"
    );
    const [nombrePlumillas, setnombrePlumillas] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreKit, setnombreKit] = useState("botoncategoriasgenerico");

    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("botonpartesvehiculoinfo mt-2");

    const [modalLubricantesFluidos, setmodalLubricantesFluidos] =
        useState(false);
    const [modalEsteticos, setmodalEsteticos] = useState(false);
    const [modalLlantasRines, setmodalLlantasRines] = useState(false);
    const [modalIluminacion, setmodalIluminacion] = useState(false);
    const [modalKitCarretera, setmodalKitCarretera] = useState(false);
    const [modalBaterias, setmodalBaterias] = useState(false);
    const [modalPlumillas, setmodalPlumillas] = useState(false);
    const [modalInterior, setmodalInterior] = useState(false);
    const [modalExterior, setmodalExterior] = useState(false);
    const [modalSonido, setmodalSonido] = useState(false);

    const [lubricantesFluidos, setLubricantesFluidos] = useState(false);

    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);
    const [showModalComentariosCategoria, setShowModalComentariosCategoria] =
        useState(false);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    useEffect(() => {
        console.log("CATEGORIA : ", categoria);
        if (categoria == 1) {
            setCategoriaSeleccionada("Estéticos y cuidados del vehículo");
        } else if (categoria == 2) {
            setCategoriaSeleccionada("Accesorios interior ");
        } else if (categoria == 3) {
            setCategoriaSeleccionada("Accesorios exterior");
        } else if (categoria == 4) {
            setCategoriaSeleccionada("Sistemas de sonido y entretenimiento");
        } else if (categoria == 5) {
            setCategoriaSeleccionada(
                "Iluminación, exploradoras y partes eléctricas"
            );
        } else if (categoria == 6) {
            setCategoriaSeleccionada("Lubricantes y fluidos");
        } else if (categoria == 7) {
            setCategoriaSeleccionada("Llantas y rines");
        } else if (categoria == 8) {
            setCategoriaSeleccionada("Baterías");
        } else if (categoria == 9) {
            setCategoriaSeleccionada("Plumillas");
        } else if (categoria == 10) {
            setCategoriaSeleccionada("Herramientas y kit de carreteras");
            4;
        } else
            setCategoriaSeleccionada(
                "Suegerencia: Aquí puedes ingresar información relacionada con tu producto."
            );
    }, [categoria]);

    const comentarioEsteticos = () => {
        setShowModalComentariosCategoria(true);
        setCategoriaSeleccionada("Estéticos y cuidados del vehículo");
        setCategoria(1);
    };

    const onEsteticos = () => {
        setnombreEstetico("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(1);
    };

    const comentarioInterior = () => {
        setShowModalComentariosCategoria(true);
        setCategoriaSeleccionada("Accesorios interior ");
        setCategoria(2);
    };

    const onInterior = () => {
        setnombreInterior("botoncategoriasgenerico colorseleccionboton");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(2);
    };

    const comentarioExterior = () => {
        setCategoriaSeleccionada("Accesorios exterior");
        setShowModalComentariosCategoria(true);
        setCategoria(3);
    };

    const onExterior = () => {
        setnombreExterior("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(3);
    };

    const comentarioSonido = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(4);
        setCategoriaSeleccionada("Sistemas de sonido y entretenimiento");
    };

    const onSonido = () => {
        setnombreSonido("botoncategoriasgenerico   colorseleccionboton");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(4);
    };

    const comentarioIluminacion = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(5);
        setCategoriaSeleccionada(
            "Iluminación, exploradoras y partes eléctricas"
        );
    };

    const onIluminacion = () => {
        setnombreIluminacion("botoncategoriasgenerico  colorseleccionboton");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(5);
    };

    const comentarioLubricantesFluidos = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(6);
        setCategoriaSeleccionada("Lubricantes y fluidos");
    };

    const onLubricantesFluidos = () => {
        setnombreLubricantes("botoncategoriasgenerico colorseleccionboton");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(6);
    };

    const comentarioLlantasRines = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(7);
        setCategoriaSeleccionada("Llantas y rines");
    };

    const onLlantasRines = () => {
        setnombreLlantas("botoncategoriasgenerico colorseleccionboton");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(7);
    };

    const comentarioBaterias = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(8);
        setCategoriaSeleccionada("Baterías");
    };

    const onBaterias = () => {
        setnombreBaterias("botoncategoriasgenerico colorseleccionboton");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(8);
    };

    const comentarioPlumillas = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(9);
        setCategoriaSeleccionada("Plumillas");
    };

    const onPlumillas = () => {
        setnombrePlumillas("botoncategoriasgenerico colorseleccionboton");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setCategoria(9);
    };

    const comentarioKitCarretera = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(10);
        setCategoriaSeleccionada("Herramientas y kit de carreteras");
    };

    const onKitCarretera = () => {
        setnombreKit("botoncategoriasgenerico colorseleccionboton");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setCategoria(10);
    };

    const mostrarModalDatosProducto = () => {
        setShowDatosProductos(!showDatosProductos);
        setAbrirCerrarCategoriasGenerico(!abrirCerrarCategoriasGenerico);
    };

    const onEsteticosOver = () => {
        setnombreEstetico("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onInteriorOver = () => {
        setnombreInterior("botoncategoriasgenerico colorseleccionboton");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onExteriorOver = () => {
        setnombreExterior("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onSonidoOver = () => {
        setnombreSonido("botoncategoriasgenerico   colorseleccionboton");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onIluminacionOver = () => {
        setnombreIluminacion("botoncategoriasgenerico  colorseleccionboton");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onLubricantesFluidosOver = () => {
        setnombreLubricantes("botoncategoriasgenerico colorseleccionboton");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onLlantasRinesOver = () => {
        setnombreLlantas("botoncategoriasgenerico colorseleccionboton");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onBateriasOver = () => {
        setnombreBaterias("botoncategoriasgenerico colorseleccionboton");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onPlumillasOver = () => {
        setnombrePlumillas("botoncategoriasgenerico colorseleccionboton");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
    };

    const onKitCarreteraOver = () => {
        setnombreKit("botoncategoriasgenerico colorseleccionboton");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
    };

    return (
        <div>
            {abrirCerrarCategoriasGenerico ? (
                <div>
                    <h3 className="tituloadvertenciaproductos">
                        Escoge la categoría
                    </h3>
                    <Row>
                        <Col xl={12} lg={12} md={12} xs={12}>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreEstetico}
                                        onClick={onEsteticos}
                                        onMouseOver={onEsteticosOver}>
                                        Estéticos y cuidados del vehículo
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={nombreUbicacionInteriorInfo}
                                        onClick={comentarioEsteticos}>
                                        {!modalEsteticos ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreInterior}
                                        onClick={onInterior}
                                        onMouseOver={onInteriorOver}>
                                        Accesorios interior
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioInterior}>
                                        {!modalInterior ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreExterior}
                                        onClick={onExterior}
                                        onMouseOver={onExteriorOver}>
                                        Accesorios exterior
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioExterior}>
                                        {!modalExterior ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreSonido}
                                        onClick={onSonido}
                                        onMouseOver={onSonidoOver}>
                                        Sistemas de sonido y entretenimiento
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioSonido}>
                                        {!modalSonido ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreIluminacion}
                                        onClick={onIluminacion}
                                        onMouseOver={onIluminacionOver}>
                                        Iluminación, exploradoras y partes
                                        eléctricas genéricas
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioIluminacion}>
                                        {!modalIluminacion ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreLubricantes}
                                        onClick={onLubricantesFluidos}
                                        onMouseOver={onLubricantesFluidosOver}>
                                        Lubricantes y fluidos
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={nombreUbicacionExteriorInfo}
                                        onClick={comentarioLubricantesFluidos}>
                                        {!modalLubricantesFluidos ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreLlantas}
                                        onClick={onLlantasRines}
                                        onMouseOver={onLlantasRinesOver}>
                                        Llantas y rines
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioLlantasRines}>
                                        {!modalLlantasRines ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreBaterias}
                                        onClick={onBaterias}
                                        onMouseOver={onBateriasOver}>
                                        Baterías
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioBaterias}>
                                        {!modalBaterias ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombrePlumillas}
                                        onClick={onPlumillas}
                                        onMouseOver={onPlumillasOver}>
                                        Plumillas
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioPlumillas}>
                                        {!modalPlumillas ? (
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <Button
                                        className={nombreKit}
                                        onClick={onKitCarretera}
                                        onMouseOver={onKitCarreteraOver}>
                                        Herramientas y kit de carreteras
                                    </Button>
                                </Col>
                                <Col xl={1} lg={1} md={1} xs={1}>
                                    <Button
                                        className={
                                            nombreUbicacionTrenMotrizInfo
                                        }
                                        onClick={comentarioKitCarretera}>
                                        {!modalKitCarretera ? (
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
                        </Col>
                    </Row>
                    <div className="mt-20 ml-450">
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <Button
                                    className="ps-btn"
                                    onClick={() => mostrarModalDatosProducto()}>
                                    {" "}
                                    Siguiente
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    <Row>
                        <Col xl={7} lg={7} md={7} xs={7}>
                            <div className="mt-1 datoscerrados" disabled={true}>
                                <h3 className="textoubicacionproducto">
                                    {categoriaSeleccionada}
                                </h3>
                            </div>
                        </Col>
                        <Col
                            xl={1}
                            lg={1}
                            md={1}
                            xs={1}
                            className="ml-53 mtmenos2">
                            <div className="showcerrarabrir">
                                <i
                                    class="mt-2 fa fa-angle-down d-flex justify-content-center"
                                    onClick={() => mostrarModalDatosProducto()}
                                    aria-hidden="true"
                                    ref={targetshow}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
                            </div>

                            <Overlay
                                className=""
                                target={targetshow.current}
                                show={showEdit}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Ubicación de producto{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            )}

            {
                //console.log("CATEGORIA : ", categoria)
            }

            <div className="App">
                <ModalComentariosCategorias
                    shown={showModalComentariosCategoria}
                    close={() => {
                        setShowModalComentariosCategoria(false);
                    }}
                    categoria={categoria}
                />
            </div>
        </div>
    );
}

export default CategoriasProductosGenericos;
