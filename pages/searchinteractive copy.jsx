import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";

import { getTypesVehicles } from "../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";

import { getVehiclesBrands } from "../store/vehiclesbrands/action";
import VehiclesBrandsRepository from "~/repositories/VehicleBrandsRepository";

import { getYearsVehicles } from "../store/yearsvehicles/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";

import { getModelsVehicles } from "../store/modelsvehicles/action";
import ModelsVehiclesRepository from "~/repositories/ModelsVehiclesRepository";

import { getBodiesVehicles } from "../store/bodiesvehicles/action";
import BodiesVehiclesRepository from "~/repositories/BodiesVehiclesRepository";

import { MultiSelect } from "react-multi-select-component";
import Carros from "~/components/shared/InteractiveShopping/Carros/Carros";

import { getVersionMotor } from "../store/versionmotor/action";
import VersionMotorRepository from "~/repositories/VersionMotorRepository";

const SearchInteractive = () => {
    const [tipos, setTipos] = useState(false);
    const [buscar, setBuscar] = useState(false);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState([]);
    const [selectedmodels, setSelectedModels] = useState([]);
    const [tipoVehiculo, setTipoVehiculo] = useState(0);
    const [carroceriaVehiculo, setCarroceriaVehiculo] = useState(0);
    const [marcaVehiculo, setMarcaVehiculo] = useState(0);
    const [annoVehiculo, setAnnoVehiculo] = useState([]);
    const [modeloVehiculo, setModeloVehiculo] = useState([]);
    const [cilindradaMotor, setCilindradaMotor] = useState([]);
    // Arreglo version de motores segun modelo Selecciondo
    const [versionMotor, setVersionMotor] = useState([]);
    const [tipoCombustible, setTipoCombustible] = useState(false);

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

    const carros = () => {
        setBuscar(true);
    };

    const annosSeleccionado = () => {
        //setSelectedOption(selectedOption);
        console.log(`Tipo Vehiculo :`, tipoVehiculo);
        console.log(`Carroceria Vehiculo :`, carroceriaVehiculo);
        console.log(`Marca Vehiculo : `, marcaVehiculo);
        console.log(`Modelo Vehiculo : `, modeloVehiculo[0].value);
        console.log(`Años Seleccionados : `, annoVehiculo);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setCarroceriaVehiculo(selectedOptions);
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        if (selectedOptions.length > 0) {
            console.log("VERSION MOTOR SELECCIONADO : ", selectedOptions);
            setCilindradaMotor(selectedOptions);
        }
    };

    const handleChangeCombustible = (selectedOptions) => {
        setTipoCombustible(selectedOptions);
    };

    const combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    const handleChange = (selectedOptions) => {
        console.log("OPCION SELECCIONADA : ", selectedOptions);
        // Asignamos el tipo de Vehiculo Seleccionado por el usuario
        setTipoVehiculo(selectedOptions);

        const dat = {
            idvehiculo: selectedOptions,
        };

        const datcarrocerias = {
            idcarroceria: selectedOptions,
        };

        async function vehiclesbrands(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const VehiclesBrands =
                await VehiclesBrandsRepository.getVehiclesBrands(dat);
            //console.log("VEHICLES BRANDS: ", VehiclesBrands);
            setMarcas(VehiclesBrands);
            // Coloca los datos en state arreglo de categorias
            dispatch(getVehiclesBrands(VehiclesBrands));
        }
        vehiclesbrands(dat);

        async function bodiesvehicles(datcarrocerias) {
            // Lee la función creada en repositories - para cargar desde la BD las Carrocerias de los Vehiculos
            const BodiesVehicles =
                await BodiesVehiclesRepository.getBodiesVehicles(
                    datcarrocerias
                );
            //console.log("CARROCERIAS VEHICLES por TIPO: ", BodiesVehicles);

            setCarrocerias(BodiesVehicles);
            // Coloca los datos en state arreglo de modelos de vehiculos segun marca
            dispatch(getBodiesVehicles(BodiesVehicles));
        }
        bodiesvehicles(datcarrocerias);
    };

    const handleChangeBrand = (selectedOptions) => {
        //console.log("MARCA SELECCIONADA : ", selectedOptions);

        // Asignamos la marca del Vehiculo Seleccionado por el usuario
        //setMarcaVehiculo(selectedOptions);

        const dat = {
            idmarca: selectedOptions,
        };

        async function modelsvehicles(dat) {
            // Lee la función creada en repositories - para cargar desde la BD los modelos por marca
            const ModelsVehicles =
                await ModelsVehiclesRepository.getModelsVehicles(dat);
            //console.log("MODELOS VEHICLES por MARCA: ", ModelsVehicles);

            setModels(ModelsVehicles);
            // Coloca los datos en state arreglo de modelos de vehiculos segun marca
            dispatch(getModelsVehicles(ModelsVehicles));
        }
        modelsvehicles(dat);
        setMarcaVehiculo(selectedOptions);
    };

    const handleChangeModels = (selectedOptions) => {
        //console.log("MODELO SELECCIONADO : ", selectedOptions[0].value);
        if (selectedOptions.length > 0) {
            setModeloVehiculo(selectedOptions);

            const dat = {
                idmodelo: selectedOptions[0].value,
            };

            console.log("ID MODELO SELECCIONADO : ", dat);

            async function versionMotor(dat) {
                // Lee la función creada en repositories - para cargar desde la BD los modelos por marca
                const Version = await VersionMotorRepository.getVersionMotor(
                    dat
                );
                console.log("Version Motor: ", Version);

                setVersionMotor(Version);
                // Coloca los datos en state arreglo de Versiones del Motor segun modelo
                dispatch(getVersionMotor(Version));
            }
            versionMotor(dat);
            //setMostrarDatosMotor(true);
        } else {
            return;
        }
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
                                                            lg={1}>
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
                                                                {vehiculos &&
                                                                    vehiculos.map(
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
                                                        <Col xs lg={2}>
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
                                                        <Col xs lg={1}>
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
                                                        <Col xs lg={2}>
                                                            <MultiSelect
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
                                                        <Col xs lg={2}>
                                                            <MultiSelect
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
                                                        <Col xs lg={2}>
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
                                                        <Col xs lg={2}>
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
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-form__submit">
                                            {/*<div> <p className="ps-form__text">Sugerencias: XXXX.</p></div>*/}
                                            <div
                                                className="ps-btn ps-btn--warning"
                                                onClick={carros}>
                                                Buscar Producto
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/*<button onClick={annosSeleccionado}>Selecciona Año</button>*/}
                                {buscar ? <Carros /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

function defaultValueForm() {
    return {
        uid: "",
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        razonsocial: "",
        tipoidentificacion: "",
        identificacion: "",
        celular: "",
        direccion: "",
    };
}

export default SearchInteractive;
