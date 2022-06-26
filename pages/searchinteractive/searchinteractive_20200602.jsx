import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { getTypesVehicles } from "../../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import ReadTypeVehicleRepository from "~/repositories/ReadTypeVehicleRepository";

import { getVehiclesBrands } from "../../store/vehiclesbrands/action";
import VehiclesBrandsRepository from "~/repositories/VehicleBrandsRepository";
import ReadBrandRepository from "~/repositories/ReadBrandRepository";

import { getYearsVehicles } from "../../store/yearsvehicles/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";

import { getModelsVehicles } from "../../store/modelsvehicles/action";
import ModelsVehiclesRepository from "~/repositories/ModelsVehiclesRepository";

import { getBodiesVehicles } from "../../store/bodiesvehicles/action";
import BodiesVehiclesRepository from "~/repositories/BodiesVehiclesRepository";
import ReadBodieVehicleRepository from "~/repositories/ReadBodieVehicleRepository";

import { MultiSelect } from "react-multi-select-component";

import { getVersionMotor } from "../../store/versionmotor/action";
import VersionMotorRepository from "~/repositories/VersionMotorRepository";

import { getDataSearchInteractive } from "../../store/datasearchinteractive/action";

//Importar carrocerias
import CarroceriaSedan from "./sedan/searchsedan";

const SearchInteractive = () => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();

    const [listTiposVehiculos, setListtiposVehiculos] = useState([]);
    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );
    const [listAnnosVehiculos, setListAnnosVehiculos] = useState([]);
    const [listModelosVehiculos, setListModelosVehiculos] = useState([]);
    const [listCilindrajeVehiculos, setListCilindrajeVehiculos] = useState([]);

    const [tipoVehiculo, setTipoVehiculo] = useState(0);
    const [carroceriaVehiculo, setCarroceriaVehiculo] = useState(0);
    const [marcaVehiculo, setMarcaVehiculo] = useState(0);
    const [nombreMarcaVehiculo, setNombreMarcaVehiculo] = useState("");
    const [nombreTipoVehiculo, setNombreTipoVehiculo] = useState("");
    const [nombreCarroceriaVehiculo, setNombreCarroceriaVehiculo] =
        useState("");

    const [annoVehiculo, setAnnoVehiculo] = useState([]);
    const [modeloVehiculo, setModeloVehiculo] = useState([]);
    const [cilindradaMotor, setCilindradaMotor] = useState([]);
    // Arreglo version de motores segun modelo Selecciondo
    const [versionMotor, setVersionMotor] = useState([]);
    const [tipoCombustible, setTipoCombustible] = useState(false);
    const [tipoTransmision, setTipoTransmision] = useState(false);

    const [showModalVideoSedan, setShowModalVideoSedan] = useState(true);

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

    const datosmodelosvehiculos = useSelector(
        (state) => state.datafindproducts.datafindproducts.vgl_modelosvehiculos
    );

    const datoscilindrajevehiculos = useSelector(
        (state) => state.datafindproducts.datafindproducts.vgl_cilindrajesvehiculos
    );

    useEffect(() => {
        setListtiposVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));
        setListMarcasVehiculos(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));
        setListCarroceriasVehiculos(JSON.parse(localStorage.getItem("datoscarroceriasvehiculos")));
        setListAnnosVehiculos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        /*
        setListModelosVehiculos(data.vgl_modelosvehiculos);
        setListCilindrajeVehiculos(data.vgl_cilindrajesvehiculos);
        */
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
    }, []);

    const colocarDatosState = () => {
        localStorage.removeItem("datasearchinteractive");
        //setSelectedOption(selectedOption);
        // Definie los modelos de vehiculos con el cual es compatible el repuesto
        let codigomodelo1 = 0;
        let nombremodelo1 = "";
        let codigomodelo2 = 0;
        let nombremodelo2 = "";
        let codigomodelo3 = 0;
        let nombremodelo3 = "";
        // Define para que años del vehiculo es compatible el repuesto
        let codigoaño1 = 0;
        let nombreaño1 = "";
        let codigoaño2 = 0;
        let nombreaño2 = "";
        let codigoaño3 = 0;
        let nombreaño3 = "";
        // Define para que cilindrajes del motor del vehiculo es compatible el repuesto
        let codigocilindraje1 = 0;
        let nombrecilindraje1 = "";
        let codigocilindraje2 = 0;
        let nombrecilindraje2 = "";
        let codigocilindraje3 = 0;
        let nombrecilindraje3 = "";

        if (modeloVehiculo.length == 1) {
            (codigomodelo1 = modeloVehiculo[0].value),
                (nombremodelo1 = modeloVehiculo[0].label);
        } else if (modeloVehiculo.length == 2) {
            (codigomodelo1 = modeloVehiculo[0].value),
                (nombremodelo1 = modeloVehiculo[0].label),
                (codigomodelo2 = modeloVehiculo[1].value),
                (nombremodelo2 = modeloVehiculo[1].label);
        } else if (modeloVehiculo.length == 3) {
            (codigomodelo1 = modeloVehiculo[0].value),
                (nombremodelo1 = modeloVehiculo[0].label),
                (codigomodelo2 = modeloVehiculo[1].value),
                (nombremodelo2 = modeloVehiculo[1].label),
                (codigomodelo3 = modeloVehiculo[2].value),
                (nombremodelo3 = modeloVehiculo[2].label);
        }

        if (annoVehiculo.length == 1) {
            (codigoaño1 = annoVehiculo[0].value),
                (nombreaño1 = annoVehiculo[0].label);
        } else if (annoVehiculo.length == 2) {
            (codigoaño1 = annoVehiculo[0].value),
                (nombreaño1 = annoVehiculo[0].label),
                (codigoaño2 = annoVehiculo[1].value),
                (nombreaño2 = annoVehiculo[1].label);
        } else if (annoVehiculo.length == 3) {
            (codigoaño1 = annoVehiculo[0].value),
                (nombreaño1 = annoVehiculo[0].label),
                (codigoaño2 = annoVehiculo[1].value),
                (nombreaño2 = annoVehiculo[1].label),
                (codigoaño3 = annoVehiculo[2].value),
                (nombreaño3 = annoVehiculo[2].label);
        }

        if (versionMotor.length == 1) {
            (codigocilindraje1 = versionMotor[0].value),
                (nombrecilindraje1 = versionMotor[0].label);
        } else if (versionMotor.length == 2) {
            (codigocilindraje1 = versionMotor[0].value),
                (nombrecilindraje1 = versionMotor[0].label),
                (codigocilindraje2 = versionMotor[1].value),
                (nombrecilindraje2 = versionMotor[1].label);
        } else if (versionMotor.length == 3) {
            (codigocilindraje1 = versionMotor[0].value),
                (nombrecilindraje1 = versionMotor[0].label),
                (codigocilindraje2 = versionMotor[1].value),
                (nombrecilindraje2 = versionMotor[1].label),
                (codigocilindraje3 = versionMotor[2].value),
                (nombrecilindraje3 = versionMotor[2].label);
        }

        let nombreTipoCombustibe = "";

        if (tipoCombustible == 1) nombreTipoCombustibe = "Gasolina";
        else if (tipoCombustible == 2) nombreTipoCombustibe = "Diesel";
        else if (tipoCombustible == 3) nombreTipoCombustibe = "Gasolina – Gas";
        else if (tipoCombustible == 4)
            nombreTipoCombustibe = "Gasolina – Eléctrico";
        else nombreTipoCombustibe = "Gasolina";

        let nombreTipoTransmisión = "";

        if (tipoTransmision == 1) nombreTipoTransmisión = "Automática";
        else if (tipoTransmision == 2) nombreTipoTransmisión = "Manual";
        else nombreTipoTransmisión = "Manual";

        const DatosBuscadorInteractivo = {
            idvehiculo: tipoVehiculo,
            nombretipovehiculo: nombreTipoVehiculo[0].text,
            idcarrorecia: carroceriaVehiculo,
            nombrecarroceria: nombreCarroceriaVehiculo[0].carroceria,
            idmarca: marcaVehiculo,
            nombremarca: nombreMarcaVehiculo[0].text,
            codigomodelo1: codigomodelo1,
            nombremodelo1: nombremodelo1,
            codigomodelo2: codigomodelo2,
            nombremodelo2: nombremodelo2,
            codigomodelo3: codigomodelo3,
            nombremodelo3: nombremodelo3,
            codigoaño1: codigoaño1,
            nombreaño1: nombreaño1,
            codigoaño2: codigoaño2,
            nombreaño2: nombreaño2,
            codigoaño3: codigoaño3,
            nombreaño3: nombreaño3,
            codigocilindraje1: codigocilindraje1,
            nombrecilindraje1: nombrecilindraje1,
            codigocilindraje2: codigocilindraje2,
            nombrecilindraje2: nombrecilindraje2,
            codigocilindraje3: codigocilindraje3,
            nombrecilindraje3: nombrecilindraje3,
            codigocombustible: tipoCombustible,
            nombreTipoCombustibe: nombreTipoCombustibe,
            codigotransmision: tipoTransmision,
            nombretransmision: nombreTipoTransmisión,
        };

        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatosBuscadorInteractivo);
        dispatch(getDataSearchInteractive(DatosBuscadorInteractivo));
        localStorage.setItem('datasearchinteractive', JSON.stringify(DatosBuscadorInteractivo));
        mostrarCarroceria();
    };

    const mostrarCarroceria = () => {
        if (carroceriaVehiculo == 24) {
            router.push("/searchinteractive/sedan/searchsedan#searchmr");
        }
        //setBuscar(true);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setCarroceriaVehiculo(selectedOptions);

        const carroceria = {
            idvehiculo: tipoVehiculo,
            idcarroceria: selectedOptions,
        };

        //console.log("CARROCERIA : ", carroceria);

        async function readbodie(carroceria) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const MarcaVehiculo =
                await ReadBodieVehicleRepository.getReadBodieVehicle(
                    carroceria
                );
            setNombreCarroceriaVehiculo(MarcaVehiculo);
        }
        readbodie(carroceria);

        console.log("MARCAS VEHICULOS: ", listMarcasVehiculos);
        const newDet = [];
        listMarcasVehiculos && listMarcasVehiculos.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehiculo) &&
                Number.parseInt(row.carroceria) ===
                    Number.parseInt(selectedOptions)
            ) {
                //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                let item = {
                    id: row.id,
                    text: row.text,
                    tipovehiculo: row.tipovehiculo,
                    carroceria: row.carroceria,
                    estado: row.estado,
                    url: row.url,
                };
                newDet.push(item);
            }
        });
        setMarcas(newDet);
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        if (selectedOptions.length > 0) {
            console.log("VERSION MOTOR SELECCIONADO : ", selectedOptions);
            setCilindradaMotor(selectedOptions);
        }
    };

    const handleChangeCombustible = (selectedOptions) => {
        //console.log("COMBUSTIBLE : ", selectedOptions);
        setTipoCombustible(selectedOptions);
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTipoTransmision(selectedOptions);
    };

    const combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    const transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    const handleChange = (selectedOptions) => {
        //console.log("TIPO DE VEHICULO SELECCIONADO : ", selectedOptions);
        // Asignamos el tipo de Vehiculo Seleccionado por el usuario
        setTipoVehiculo(selectedOptions);

        const tipovehiculo = {
            idtipovehiculo: selectedOptions
        };

        async function readtypevehicle(tipovehiculo) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const LeeTipoVehiculo =
                await ReadTypeVehicleRepository.getReadTypeVehicle(
                    tipovehiculo
                );
            //console.log("NOMBRE TIPO VEHICULO: ", LeeTipoVehiculo);
            setNombreTipoVehiculo(LeeTipoVehiculo);
        }
        readtypevehicle(tipovehiculo);

        const newModels = [];
        datosmodelosvehiculos.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(selectedOptions)
            ) {
                let item = {
                    id: row.id,
                    modelo: row.modelo,
                    tipovehiculo: row.tipovehiculo,
                    marca: row.marca,
                    carroceria: row.carroceria,
                    estado: row.estado,
                    value: row.id,
                    label: row.modelo,
                };
                newModels.push(item);
            }
        });
        setListModelosVehiculos(newModels);
        console.log("DATOS MODELOS : ", newModels);

        const newCilindrajes = [];
        datoscilindrajevehiculos.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(selectedOptions)
            ) {
                let item = {
                    id: row.id,
                    cilindraje: row.cilindraje,
                    tipovehiculo: row.tipovehiculo,
                    marca: row.marca,
                    carroceria: row.carroceria,
                    modelo: row.modelo,
                    estado: row.estado,
                    value: row.id,
                    label: row.cilindraje,
                };
                newCilindrajes.push(item);
            }
        });
        setListCilindrajeVehiculos(newCilindrajes);
        console.log("DATOS CILINDRAJES : ", newCilindrajes);

        const newDet = [];
        listCarroceriasVehiculos.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(selectedOptions)
            ) {
                //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                let item = {
                    id: row.id,
                    carroceria: row.carroceria,
                    tipovehiculo: row.tipovehiculo,
                    estado: row.estado,
                    value: row.id,
                    label: row.carroceria,
                };
                newDet.push(item);
            }
        });
        setCarrocerias(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        //console.log("MARCA SELECCIONADA : ", selectedOptions);
        //console.log("CARROCERIA SELECCIONADA : ", carroceriaVehiculo);

        // Asignamos la marca del Vehiculo Seleccionado por el usuario
        setMarcaVehiculo(selectedOptions);

        const marca = {
            idvehiculo: tipoVehiculo,
            idmarca: selectedOptions,
        };
        //console.log("MARCA : ", marca);

        async function readbrand(marca) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const MarcaVehiculo = await ReadBrandRepository.getReadBrand(marca);

            console.log("MARCA VEHICULO: ", MarcaVehiculo);
            setNombreMarcaVehiculo(MarcaVehiculo);
        }
        readbrand(marca);

        const newDet = [];
        listModelosVehiculos.forEach((row) => {
            if (
                Number.parseInt(row.marca) ===
                    Number.parseInt(selectedOptions) &&
                Number.parseInt(row.carroceria) ===
                    Number.parseInt(carroceriaVehiculo)
            ) {
                //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                let item = {
                    id: row.id,
                    modelo: row.modelo,
                    tipovehiculo: row.tipovehiculo,
                    marca: row.marca,
                    carroceria: row.carroceria,
                    estado: row.estado,
                    value: row.id,
                    label: row.modelo,
                };
                newDet.push(item);
            }
        });
        setModels(newDet);
        console.log("MODELOS SELECCIONADOS : ", newDet);
    };

    const handleChangeModels = (selectedOptions) => {
        setModeloVehiculo(selectedOptions);
        //console.log("MODELO SELECCIONADO : ", selectedOptions[0].id);
        //console.log("TIPO VEHICULO SELECCIONADO : ",tipoVehiculo);
        //console.log("MARCA SELECCIONADA : ",marcaVehiculo);
        //console.log("CARROCERIA SELECCIONADA : ",carroceriaVehiculo);

        if (selectedOptions.length > 0) {
            const newDet = [];
            listCilindrajeVehiculos.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVehiculo) &&
                    Number.parseInt(row.marca) ===
                        Number.parseInt(marcaVehiculo) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVehiculo) &&
                    Number.parseInt(row.modelo) ===
                        Number.parseInt(selectedOptions[0].id)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        cilindraje: row.cilindraje,
                        tipovehiculo: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        modelo: row.modelo,
                        estado: row.estado,
                        value: row.id,
                        label: row.cilindraje,
                    };
                    newDet.push(item);
                }
            });
            setVersionMotor(newDet);
            console.log("CILINDRAJES SELECCIONADOS : ", newDet);
        }
    };

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

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-account">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <form>
                                    <div className="ps-form--review">
                                        <h2 className="ps-form__title">
                                            Buscador Interactivo
                                        </h2>
                                        <div className="ps-form__group searchContainer">
                                            <div className="searchContainerMargin">
                                                <label className="ps-form__label searchContainerFont ">
                                                    La mejor forma de buscar el
                                                    producto para tu Vehiculo!
                                                </label>

                                                <div className="form-control ps-form__input">
                                                    <Row>
                                                        <Col
                                                            xs={{
                                                                order: "firts",
                                                            }}
                                                            lg={3}>
                                                            <select
                                                                //disabled="disabled"
                                                                className="custom-select ps-form__labelselect"
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    selected
                                                                    className="select-fontsize ps-form__label">
                                                                    Tipo
                                                                </option>
                                                                {listTiposVehiculos &&
                                                                    listTiposVehiculos.map(
                                                                        (
                                                                            itemselect
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        itemselect.id
                                                                                    }>
                                                                                    {itemselect.icon +
                                                                                        " " +
                                                                                        itemselect.text}
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </Col>
                                                        <Col xs lg={3}>
                                                            <select
                                                                //disabled="disabled"
                                                                className="custom-select ps-form__labelselect"
                                                                onChange={(e) =>
                                                                    handleChangeCarroceria(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    selected
                                                                    className="select-fontsize ps-form__label">
                                                                    Carroceria
                                                                </option>
                                                                {carrocerias &&
                                                                    carrocerias.map(
                                                                        (
                                                                            itemselect
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        itemselect.value
                                                                                    }>
                                                                                    {
                                                                                        itemselect.label
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </Col>
                                                        <Col xs lg={3}>
                                                            <select
                                                                //disabled="disabled"
                                                                className="custom-select ps-form__labelselect"
                                                                onChange={(e) =>
                                                                    handleChangeBrand(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    selected
                                                                    className="select-fontsize ps-form__label">
                                                                    Marca
                                                                </option>
                                                                {marcas &&
                                                                    marcas.map(
                                                                        (
                                                                            itemselect
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        itemselect.id
                                                                                    }>
                                                                                    {
                                                                                        itemselect.text
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </Col>
                                                        <Col xs lg={3}>
                                                            <MultiSelect
                                                                isMulti
                                                                options={annos}
                                                                value={
                                                                    annoVehiculo
                                                                }
                                                                onChange={
                                                                    setAnnoVehiculo
                                                                }
                                                                overrideStrings={{
                                                                    allItemsAreSelected:
                                                                        "All items are selected.",
                                                                    clearSearch:
                                                                        "Limpiar",
                                                                    noOptions:
                                                                        "No options",
                                                                    search: "Buscar",
                                                                    selectAll:
                                                                        "Todos",
                                                                    selectAllFiltered:
                                                                        "Select All (Filtered)",
                                                                    selectSomeItems:
                                                                        "Año...",
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <br />
                                                <div className="form-control ps-form__input">
                                                    <Row>
                                                        <Col xs lg={3}>
                                                            <MultiSelect
                                                                isMulti
                                                                options={
                                                                    modelos
                                                                }
                                                                value={
                                                                    modeloVehiculo
                                                                }
                                                                onChange={
                                                                    handleChangeModels
                                                                }
                                                                overrideStrings={{
                                                                    allItemsAreSelected:
                                                                        "All items are selected.",
                                                                    clearSearch:
                                                                        "Limpiar",
                                                                    noOptions:
                                                                        "No options",
                                                                    search: "Buscar",
                                                                    selectAll:
                                                                        "Todos",
                                                                    selectAllFiltered:
                                                                        "Select All (Filtered)",
                                                                    selectSomeItems:
                                                                        "Modelos ",
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col xs lg={3}>
                                                            <MultiSelect
                                                                options={
                                                                    versionMotor
                                                                }
                                                                value={
                                                                    cilindradaMotor
                                                                }
                                                                onChange={
                                                                    handleChangeVersionMotor
                                                                }
                                                                overrideStrings={{
                                                                    allItemsAreSelected:
                                                                        "Selecciono todos los items.",
                                                                    clearSearch:
                                                                        "Limpiar",
                                                                    noOptions:
                                                                        "No options",
                                                                    search: "Buscar",
                                                                    selectAll:
                                                                        "Todos",
                                                                    selectAllFiltered:
                                                                        "Select All (Filtered)",
                                                                    selectSomeItems:
                                                                        "Cilindraje Motor ",
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col xs lg={3}>
                                                            <select
                                                                //disabled="disabled"
                                                                className="custom-select ps-form__labelselect"
                                                                onChange={(e) =>
                                                                    handleChangeCombustible(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    selected
                                                                    className="select-fontsize ps-form__label">
                                                                    Combustible
                                                                </option>
                                                                {combustible &&
                                                                    combustible.map(
                                                                        (
                                                                            itemselect
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        itemselect.value
                                                                                    }>
                                                                                    {
                                                                                        itemselect.label
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </Col>
                                                        <Col xs lg={3}>
                                                            <select
                                                                //disabled="disabled"
                                                                className="custom-select ps-form__labelselect"
                                                                onChange={(e) =>
                                                                    handleChangeTransmision(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    selected
                                                                    className="select-fontsize ps-form__label">
                                                                    Tipo de
                                                                    Trasmisión
                                                                </option>
                                                                {transmision &&
                                                                    transmision.map(
                                                                        (
                                                                            itemselect
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        itemselect.value
                                                                                    }>
                                                                                    {
                                                                                        itemselect.label
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-form__submit">
                                            {/*<div> <p className="ps-form__text">Sugerencias: XXXX.</p></div>*/}
                                            <Row>
                                                <Col lg={5}>
                                                    <div
                                                        className="ps-btn"
                                                        onClick={
                                                            colocarDatosState
                                                        }>
                                                        Buscar Producto
                                                    </div>
                                                </Col>
                                                <Col lg={7}>
                                                    <div className="botonimagenesilustrativas">
                                                        <h3 className="textoimagenesilustrativas">
                                                            ! Las imágenes a
                                                            continuación son con
                                                            fines ilustrativos,
                                                            por ello pueden no
                                                            corresponder
                                                            exactamente con tu
                                                            vehículo ¡
                                                        </h3>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default SearchInteractive;
