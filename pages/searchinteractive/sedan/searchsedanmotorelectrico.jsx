import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { getTypesVehicles } from "../../../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";

import { getYearsVehicles } from "../../../store/yearsvehicles/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";
import SelectedVehicle from "./selectedvehicle";

//Importafotos
import imagenaireacondicionadomotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagenfrenosmotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagenmotorcajamotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagenrefrigeracioncajamotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagensistemadearranquemotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagensistemadeembraguemotorelectrico from "../../../public/imgcarrusel/electrico1.jpg";
import imagensistemadeinyeccionmotorelectrico from "../../../public/imgcarrusel/electrico1.jpg";

import imagensistemadeescapemotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagendireccionmotorelectrico from "../../../public/imgcarrusel/electrico1.jpg";

import imagensistemaderefrigeracionmotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagensistemaderefrigeracionmotorelectrico1 from "../../../public/imgcarrusel/refrigeracion2.jpg";

import imagensistemaelectricomotorelectrico from "../../../public/imgcarrusel/electrico1.jpg";
import imagensistemaelectricomotorelectrico1 from "../../../public/imgcarrusel/electrico2.jpg";

import imagensuspensionmotorelectrico from "../../../public/imgcarrusel/electrico1.jpg";
import imagenmotormotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagenparabrisasmotorelectrico from "../../../public/imgcarrusel/refrigeracion1.jpg";
import imagensistematrasmision from "../../../public/imgcarrusel/electrico1.jpg";

//Importacion Iconos Motor / ELéctrico - Inicial
import aireacondicionado from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/aireacondicionado.png";
import direccion from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/direccion.png";
import frenos from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/frenos.png";
import cajamotor from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/caja.png";
import sistemadeenfriamientomotor from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/refrigeracioncaja.png";
import sistemaarranque from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/arranque.png";
import sistemaembrague from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/embrague.png";
import sistemadeescape from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/escape.png";
import sistemadeinyeccion from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/inyeccion.png";
import refrijeracionvehiculo from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/refrigeracion.png";
import sistemaelectricomotor from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/sistemaelectricomotor.png";
import sistemaelectricovehiculo from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/sistemaelectrico.png";
import sistemasuspension from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/suspension.png";
import sistematransmision from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/transmision.png";
import sistemaparabrisas from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/parabrisas.png";
import sistemamotor from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosInicial/motor.png";

//Importacion Iconos Motor / ELéctrico - Seleccionado
import aireacondicionado2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/aireacondicionado.png";
import direccion2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/direccion.png";
import frenos2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/frenos.png";
import cajamotor2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/caja.png";
import sistemadeenfriamientomotor2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/refrigeracioncaja.png";
import sistemaarranque2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/arranque.png";
import sistemaembrague2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/embrague.png";
import sistemadeescape2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/escape.png";
import sistemadeinyeccion2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/inyeccion.png";
import refrijeracionvehiculo2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/refrigeracion.png";
import sistemaelectricomotor2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/sistemaelectricomotor.png";
import sistemaelectricovehiculo2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/sistemaelectrico.png";
import sistemasuspension2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/suspension.png";
import sistematransmision2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/transmision.png";
import sistemaparabrisas2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/parabrisas.png";
import sistemamotor2 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosSeleccion/motor.png";

//Importacion Iconos Motor / ELéctrico - Descarte
import aireacondicionado3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/aireacondicionado.png";
import direccion3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/direccion.png";
import frenos3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/frenos.png";
import cajamotor3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/caja.png";
import sistemadeenfriamientomotor3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/refrigeracioncaja.png";
import sistemaarranque3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/arranque.png";
import sistemaembrague3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/embrague.png";
import sistemadeescape3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/escape.png";
import sistemadeinyeccion3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/inyeccion.png";
import refrijeracionvehiculo3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/refrigeracion.png";
import sistemaelectricomotor3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/sistemaelectricomotor.png";
import sistemaelectricovehiculo3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/sistemaelectrico.png";
import sistemasuspension3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/suspension.png";
import sistematransmision3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/transmision.png";
import sistemaparabrisas3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/parabrisas.png";
import sistemamotor3 from "../../../public/imgcarrusel/sedan/iconosmotorelectrico/IconosDescarte/motor.png";

//Importar Carrusel
import SedanMotorElectrico from "../../CarruselVehiculos/CarruselSedan/SedanMotorElectrico";
import imagen1 from "../../../public/imgcarrusel/motorgeneral.jpg";
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";

import SearchInteractive from "../../search/searchinteractive.jsx";

const SearchInteractiveMotorElectrico = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();

    // Definicion Latoneria
    const [showModalLatoneria, setShowModalLatoneria] = useState(false);
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
        useState(true);
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

    const [showImagenMotorElectrico, setShowImagenMotorElectrico] =
        useState(true);
    const [onClickImagenMotorElectrico, setOnClickImagenMotorElectrico] =
        useState(false);

    const [showAirecondicionado, setShowAirecondicionado] = useState(false);
    const [onClickAirecondicionado, setOnClickAirecondicionado] = useState(false);

    const [showDireccion, setShowDireccion] = useState(false);
    const [showFrenos, setShowFrenos] = useState(false);
    const [showMotorcaja, setShowMotorcaja] = useState(false);
    const [showRefrigeracioncaja, setShowRefrigeracioncaja] = useState(false);
    const [showSistemadearranque, setShowSistemadearranque] = useState(false);
    const [showSistemaparabrisas, setShowSistemaparabrisas] = useState(false);
    const [showSistemamotor, setShowSistemamotor] = useState(false);
    const [showSistemadeEmbrague, setShowSistemadeEmbrague] = useState(false);
    const [showSistemadeEscpape, setShowSistemadeEscpape] = useState(false);
    const [showSistemadeInyeccion, setShowSistemadeInyeccion] = useState(false);

    const [showSistemadeRefrigeracion, setShowSistemadeRefrigeracion] =
        useState(false);
    const [onClickSistemadeRefrigeracion, setOnClickSistemadeRefrigeracion] =
        useState(false);

    const [showSistemadeElectrico, setShowSistemadeElectrico] = useState(false);
    const [onClickSistemadeElectrico, setOnClickSistemadeElectrico] =
        useState(false);

    const [showSistemadeElectricoMotor, setShowSistemadeElectricoMotor] =
        useState(false);
    const [showSuspension, setShowSuspension] = useState(false);
    const [showSistemaTrasmision, setShowSistemaTrasmision] = useState(false);

    //Asigna Icono Seleccionado
    const [showaireacondicionado, setAireacondicionado] =
        useState(aireacondicionado);
    const [showarranque, setArranque] = useState(sistemaarranque);
    const [showcaja, setCaja] = useState(cajamotor);
    const [showdireccion, setDireccion] = useState(direccion);
    const [showembrague, setEmbrague] = useState(sistemaembrague);
    const [showescape, setEscape] = useState(sistemadeescape);
    const [showfrenos, setFrenos] = useState(frenos);
    const [showinyeccion, setInyeccion] = useState(sistemadeinyeccion);
    const [showmotor, setMotor] = useState(sistemamotor);
    const [showparabrisas, setParabrisas] = useState(sistemaparabrisas);
    const [showrefrigeracion, setRefrigeracion] = useState(
        refrijeracionvehiculo
    );
    const [showrefrigeracioncaja, setRefrigeracioncaja] = useState(
        sistemadeenfriamientomotor
    );
    const [showsistemaelectrico, setSistemaelectrico] = useState(
        sistemaelectricovehiculo
    );
    const [showsistemaelectricomotor, setSistemaelectricomotor] = useState(
        sistemaelectricomotor
    );
    const [showsuspension, setSuspension] = useState(sistemasuspension);
    const [showtransmision, setTransmision] = useState(sistematransmision);

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
    console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);

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
        setShowModalLatoneria(true);
        setUbicarProductoLatoneria(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        router.push("/searchinteractive/sedan/searchsedanlatoneria");
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        setShowModalhabitaculo(true);
        setUbicarProductoHabitaculo(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        router.push("/searchinteractive/sedan/searchsedanhabitaculo");
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        setShowModalMotorElectrico(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(true);
    };

    // Lee de la base de datos los años de los Vehiculos
    useEffect(() => {
        async function yearsvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const YearsVehicles =
                await YearsVehiclesRepository.getYearsVehicles(0);
            //console.log("YEARS VEHICLES : ", YearsVehicles);
            setAnnos(YearsVehicles);

            // Coloca los datos en state arreglo de años de los vehiculos
            dispatch(getYearsVehicles(YearsVehicles));
        }
        yearsvehicles(0);
    }, [tipos]);

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0].header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    const mostrarAireAcondicionadoSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowAirecondicionado(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarAireAcondicionadoSedan = () => {
        setShowAirecondicionado(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarDireccionSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowDireccion(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarDireccionSedan = () => {
        setShowDireccion(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarFrenosSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowFrenos(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarFrenosSedan = () => {
        setShowFrenos(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarMotorcajaSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowMotorcaja(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarMotorcajaSedan = () => {
        setShowMotorcaja(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarRefrigeracioncajaSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowRefrigeracioncaja(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarRefrigeracioncajaSedan = () => {
        setShowRefrigeracioncaja(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadearranqueSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadearranque(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadearranqueSedan = () => {
        setShowImagenMotorElectrico(true);
        setShowSistemadearranque(false);
    };

    const mostrarSistemaparabrisasSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemaparabrisas(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemaparabrisasSedan = () => {
        setShowImagenMotorElectrico(true);
        setShowSistemaparabrisas(false);
    };

    const mostrarSistemamotorSedan = () => {
        setShowSistemamotor(true);
        setShowImagenMotorElectrico(false);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemamotorSedan = () => {
        setShowSistemamotor(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadeEmbragueSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadeEmbrague(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadeEmbragueSedan = () => {
        setShowSistemadeEmbrague(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadeEscpapeSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadeEscpape(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadeEscpapeSedan = () => {
        setShowSistemadeEscpape(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadeInyeccionSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadeInyeccion(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadeInyeccionSedan = () => {
        setShowSistemadeInyeccion(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadeRefrigeracionSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadeRefrigeracion(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadeRefrigeracionSedan = () => {
        setShowSistemadeRefrigeracion(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadeElectricoSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadeElectrico(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadeElectricoSedan = () => {
        setShowSistemadeElectrico(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemadeElectricoMotorSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemadeElectricoMotor(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemadeElectricoMotorSedan = () => {
        setShowSistemadeElectricoMotor(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSuspensionSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSuspension(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSuspensionSedan = () => {
        setShowSuspension(false);
        setShowImagenMotorElectrico(true);
    };

    const mostrarSistemaTrasmisionSedan = () => {
        setShowImagenMotorElectrico(false);
        setShowSistemaTrasmision(true);
        setOnClickImagenMotorElectrico(false);
    };

    const cerrarSistemaTrasmisionSedan = () => {
        setShowSistemaTrasmision(false);
        setShowImagenMotorElectrico(true);
    };

    const prdAireacondicionadoSedan = () => {
        setOnClickImagenMotorElectrico(true);
        setOnClickSistemadeElectrico(false);
        setOnClickSistemadeRefrigeracion(false);
        setOnClickAirecondicionado(true);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado2);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracion(refrijeracionvehiculo3);
        setArranque(sistemaarranque3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setSistemaelectricomotor(sistemaelectricomotor3);
        setSistemaelectrico(sistemaelectricovehiculo3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
    };

    const prdDireccionSedan = () => {
        router.push("/search?keyword=sensores de la dirección");
    };

    const prdFrenosSedan = () => {
        router.push("/search?keyword=pastillas de freno");
    };

    const prdCajaMotorSedan = () => {
        router.push("/search?keyword=Unidad De Control Caja Del Motor");
    };

    const prdEnframientoMotorSedan = () => {
        router.push("/search?keyword=manguera refrigeracion X5");
    };

    const prdArranqueSedan = () => {
        router.push("/search?keyword=motor de arranque");
    };

    const prdParabrisasSedan = () => {
        router.push("/search?keyword=parabrisas chevrolet corsa");
    };

    const prdmotorSedan = () => {
        router.push("/search?keyword=bloque motor");
    };

    const prdEmbragueSedan = () => {
        router.push("/search?keyword=palanca del embraque");
    };

    const prdEscapeSedan = () => {
        router.push("/search?keyword=catalizador turnier 186749482");
    };

    const prdInyeccionSedan = () => {
        router.push(
            "/search?keyword=Fitech sistema de inyección de combustible"
        );
    };

    const prdRefrijeracionSedan = () => {
        setOnClickImagenMotorElectrico(true);
        setOnClickSistemadeElectrico(false);
        setOnClickSistemadeRefrigeracion(true);
        setOnClickAirecondicionado(false);

        // Asigna Color Icono Seleccionado y Marca los  No seleccionados por el usuario
        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracion(refrijeracionvehiculo2);
        setArranque(sistemaarranque3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setSistemaelectricomotor(sistemaelectricomotor3);
        setSistemaelectrico(sistemaelectricovehiculo3);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        /*
        router.push(
            "/search?keyword=Tanque de desbordamiento del refrigerante del radiador"
        );
        */
    };

    const prdElectricoVehiculoSedan = () => {
        setOnClickImagenMotorElectrico(true);
        setOnClickSistemadeRefrigeracion(false);
        setOnClickSistemadeElectrico(true);
        setOnClickAirecondicionado(false);

        setAireacondicionado(aireacondicionado3);
        setDireccion(direccion3);
        setFrenos(frenos3);
        setCaja(cajamotor3);
        setRefrigeracion(refrijeracionvehiculo3);
        setArranque(sistemaarranque3);
        setEmbrague(sistemaembrague3);
        setEscape(sistemadeescape3);
        setInyeccion(sistemadeinyeccion3);
        setRefrigeracioncaja(sistemadeenfriamientomotor3);
        setSistemaelectricomotor(sistemaelectricomotor3);
        setSistemaelectrico(sistemaelectricovehiculo2);
        setSuspension(sistemasuspension3);
        setTransmision(sistematransmision3);
        setParabrisas(sistemaparabrisas3);
        setMotor(sistemamotor3);
        /*
        router.push(
            "/search?keyword=Sonda de alimentación 12V/24V Sistema Eléctrico"
        );
        */
    };

    const prdElectricoMotorSedan = () => {
        alert("Vehiculo MOTOR electrico");
        /*
        router.push(
            "/search?keyword=Sistema DE CABLEADO ELÉCTRICO Carretes 2015"
        );
        */
    };

    const prdSuspensionSedan = () => {
        router.push(
            "/search?keyword=Sistema DE CABLEADO ELÉCTRICO Carretes 2015"
        );
    };

    const prdTrasmisionSedan = () => {
        router.push("/search?keyword=Piñones Engranaje Cigueñal");
    };

    const regresarAlBuscador = () => {
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner">
                <Row>
                    <Col lg={6}>
                        <div className="espacioizquierdoselectdvehicle">
                            <SelectedVehicle />
                        </div>
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
                                                    className="botoncarroceriasedanseleccionada"
                                                    onClick={
                                                        seleccionaUbicarProductoMotorElectrico
                                                    }>
                                                    Tren Motriz
                                                </Button>
                                            </Col>
                                            <Col xs lg={2}>
                                                <Button
                                                    className="informacionbotoncarroceriasedanseleccionada"
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
                        <hr />
                        <div className="espaciobordemotorelectrico">
                            <Row>
                                <Col xs lg={1}>
                                    <Row xs={2} md={4} lg={12}>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarAireAcondicionadoSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarAireAcondicionadoSedan
                                                    }
                                                    onClick={() =>
                                                        prdAireacondicionadoSedan()
                                                    }
                                                    src={
                                                        showaireacondicionado.src
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarDireccionSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarDireccionSedan
                                                    }
                                                    onClick={() =>
                                                        prdDireccionSedan()
                                                    }
                                                    src={showdireccion.src}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarFrenosSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarFrenosSedan
                                                    }
                                                    onClick={() =>
                                                        prdFrenosSedan()
                                                    }
                                                    src={showfrenos.src}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarMotorcajaSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarMotorcajaSedan
                                                    }
                                                    onClick={() =>
                                                        prdCajaMotorSedan()
                                                    }
                                                    src={showcaja.src}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarRefrigeracioncajaSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarRefrigeracioncajaSedan
                                                    }
                                                    onClick={() =>
                                                        prdEnframientoMotorSedan()
                                                    }
                                                    src={
                                                        showrefrigeracioncaja.src
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarSistemadearranqueSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarSistemadearranqueSedan
                                                    }
                                                    onClick={() =>
                                                        prdArranqueSedan()
                                                    }
                                                    src={showarranque.src}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarSistemaparabrisasSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarSistemaparabrisasSedan
                                                    }
                                                    onClick={() =>
                                                        prdParabrisasSedan()
                                                    }
                                                    src={showparabrisas.src}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs lg={12}>
                                            <div className="bordediviconomotorelectrico">
                                                <img
                                                    className="tamañoimagensedamotorelectrico"
                                                    onMouseOver={
                                                        mostrarSistemamotorSedan
                                                    }
                                                    onMouseOut={
                                                        cerrarSistemamotorSedan
                                                    }
                                                    onClick={() =>
                                                        prdmotorSedan()
                                                    }
                                                    src={
                                                        showsistemaelectricomotor.src
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xs lg={9}>
                                    {!onClickImagenMotorElectrico ? (
                                        showImagenMotorElectrico ? (
                                            <Row>
                                                <Col xs lg={12}>
                                                    <div className="cajasedanimagenesmotorelectrico">
                                                        <h2 className="seccionesvehiculotexto">
                                                            {" "}
                                                            .
                                                        </h2>
                                                        <img
                                                            width="532px"
                                                            height="340px"
                                                            src={imagen1.src}
                                                        />
                                                        <img
                                                            className="espaciologomrmotorelectrico"
                                                            src={logo.src}
                                                            alt="First slide"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        ) : showAirecondicionado ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema Aire Acondicionado
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagenaireacondicionadomotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showDireccion ? (
                                            <div className="cajasedanimagenesmotorelectrico espaciosuperior">
                                                <div className=" espaciosuperior">
                                                    <h2 className="seccionesvehiculotexto">
                                                        Sistema Dirección
                                                    </h2>
                                                    <img
                                                        width="532px"
                                                        height="340px"
                                                        src={
                                                            imagendireccionmotorelectrico.src
                                                        }
                                                    />
                                                    <img
                                                        className="espaciologomrmotorelectrico"
                                                        src={logo.src}
                                                        alt="First slide"
                                                    />
                                                </div>
                                            </div>
                                        ) : showFrenos ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Frenos
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagenfrenosmotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showMotorcaja ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Caja Motor
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagenmotorcajamotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showRefrigeracioncaja ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Refrigeración
                                                    Motor
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagenrefrigeracioncajamotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showSistemadearranque ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Arranque Motor
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistemadearranquemotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showSistemadeEmbrague ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Embrague Motor
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistemadeembraguemotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showSistemadeEscpape ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <div className=" espaciosuperior">
                                                    <h2 className="seccionesvehiculotexto">
                                                        Sistema de Escape
                                                    </h2>
                                                    <img
                                                        width="532px"
                                                        height="340px"
                                                        src={
                                                            imagensistemadeescapemotorelectrico.src
                                                        }
                                                    />
                                                    <img
                                                        className="espaciologomrmotorelectrico"
                                                        src={logo.src}
                                                        alt="First slide"
                                                    />
                                                </div>
                                            </div>
                                        ) : showSistemadeInyeccion ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Inyección
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistemadeinyeccionmotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showSistemadeRefrigeracion ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Refrigeración
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistemaderefrigeracionmotorelectrico.src
                                                    }
                                                />
                                                <img
                                                    className="espaciologomrmotorelectrico"
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        ) : showSistemadeElectrico ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema Eléctrico Vehículo
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistemaelectricomotorelectrico.src
                                                    }
                                                />
                                                <img
                                                    className="espaciologomrmotorelectrico"
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        ) : showSistemadeElectricoMotor ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema Eléctrico Motor
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensuspensionmotorelectrico.src
                                                    }
                                                />
                                                <img
                                                    className="espaciologomrmotorelectrico"
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        ) : showSuspension ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Suspensión
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistemaelectricomotorelectrico.src
                                                    }
                                                />
                                                <img
                                                    className="espaciologomrmotorelectrico"
                                                    src={logo.src}
                                                    alt="First slide"
                                                />
                                            </div>
                                        ) : showSistemaparabrisas ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema Parabrisas
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagenparabrisasmotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showSistemamotor ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema Motor
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagenmotormotorelectrico.src
                                                    }
                                                />
                                            </div>
                                        ) : showSistemaTrasmision ? (
                                            <div className="cajasedanimagenesmotorelectrico">
                                                <h2 className="seccionesvehiculotexto">
                                                    Sistema de Trasmisión
                                                </h2>
                                                <img
                                                    width="532px"
                                                    height="340px"
                                                    src={
                                                        imagensistematrasmision.src
                                                    }
                                                />
                                            </div>
                                        ) : null
                                    ) : onClickSistemadeRefrigeracion ? (
                                        <div className="cajasedanimagenesmotorelectrico">
                                            <h2 className="seccionesvehiculotexto">
                                                Sistema de Refrigeración
                                            </h2>
                                            <SedanMotorElectrico
                                                motorelectrico={"refrigeracion"}
                                            />
                                        </div>
                                    ) : onClickSistemadeElectrico ? (
                                        <div className="cajasedanimagenesmotorelectrico">
                                            <h2 className="seccionesvehiculotexto">
                                                Sistema Eléctrico
                                            </h2>
                                            <SedanMotorElectrico
                                                motorelectrico={"electrico"}
                                            />
                                        </div>
                                    ) : onClickAirecondicionado ? (
                                        <div className="cajasedanimagenesmotorelectrico">
                                            <h2 className="seccionesvehiculotexto">
                                                Aire Acondicionado
                                            </h2>
                                            <SedanMotorElectrico
                                                motorelectrico={"electrico"}
                                            />
                                        </div>
                                    ) : null}
                                </Col>
                                <Col xs lg={1}></Col>
                                <Col xs lg={1}>
                                    <Row xs={2} md={4} lg={12}>
                                        <div>
                                            <Col xs lg={2}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemadeEmbragueSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemadeEmbragueSedan
                                                        }
                                                        onClick={() =>
                                                            prdEmbragueSedan()
                                                        }
                                                        src={showembrague.src}
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemadeEscpapeSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemadeEscpapeSedan
                                                        }
                                                        onClick={() =>
                                                            prdEscapeSedan()
                                                        }
                                                        src={showescape.src}
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemadeInyeccionSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemadeInyeccionSedan
                                                        }
                                                        onClick={() =>
                                                            prdInyeccionSedan()
                                                        }
                                                        src={showinyeccion.src}
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemadeRefrigeracionSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemadeRefrigeracionSedan
                                                        }
                                                        onClick={() =>
                                                            prdRefrijeracionSedan()
                                                        }
                                                        src={
                                                            showrefrigeracion.src
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemadeElectricoMotorSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemadeElectricoMotorSedan
                                                        }
                                                        onClick={() =>
                                                            prdElectricoMotorSedan()
                                                        }
                                                        src={
                                                            showsistemaelectricomotor.src
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemadeElectricoSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemadeElectricoSedan
                                                        }
                                                        onClick={() =>
                                                            prdElectricoVehiculoSedan()
                                                        }
                                                        src={
                                                            showsistemaelectrico.src
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSuspensionSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSuspensionSedan
                                                        }
                                                        onClick={() =>
                                                            prdSuspensionSedan()
                                                        }
                                                        src={showsuspension.src}
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs lg={12}>
                                                <div className="bordediviconomotorelectrico">
                                                    <img
                                                        className="tamañoimagensedamotorelectrico"
                                                        onMouseOver={
                                                            mostrarSistemaTrasmisionSedan
                                                        }
                                                        onMouseOut={
                                                            cerrarSistemaTrasmisionSedan
                                                        }
                                                        onClick={() =>
                                                            prdTrasmisionSedan()
                                                        }
                                                        src={
                                                            showtransmision.src
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </div>
                                    </Row>
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

export default SearchInteractiveMotorElectrico;
