import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
} from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import shortid from "shortid";
import { setTags } from "@sentry/react";

function DatosVehiculosDuplicar(props) {
    const {
        vehiculos,
        annos,
        tipoVeh,
        setTipoVeh,
        marcaVeh,
        setMarcaVeh,
        annoVeh,
        setAnnoVeh,
        modeloVeh,
        setModeloVeh,
        carroceriaVeh,
        setCarroceriaVeh,
        cilindrajesVeh,
        transmisionSelecVeh,
        setTransmisionSelecVeh,
        traccionVeh,
        setTraccionVeh,
        combustibleVeh,
        setCombustibleVeh,
        setCilindrajesVeh,
        transmisionVeh,
        setTransmisionVeh,
        listMarcasVehiculos,
        listCarroceriasVehiculos,
        listModelosVehiculos,
        listCilindrajesVehiculos,
        tipoSelecVeh,
        setTipoSelecVeh,
        marcaSelecVeh,
        setMarcaSelecVeh,
        annoSelecVeh,
        setAnnoSelecVeh,
        modeloSelecVeh,
        setModeloSelecVeh,
        carroceriaSelecVeh,
        setCarroceriaSelecVeh,
        nombretipoSelecVeh,
        setNombreTipoSelecVeh,
        nombremarcaSelecVeh,
        setNombreMarcaSelecVeh,
        nombreannoSelecVeh,
        setNombreAnnoSelecVeh,
        nombremodeloSelecVeh,
        setNombreModeloSelecVeh,
        nombrecarroceriaSelecVeh,
        setNombreCarroceriaSelecVeh,
        cilindrajeSelecVeh,
        setCilindrajeSelecVeh,
        traccionSelecVeh,
        setTraccionSelecVeh,
        turboSelecVeh,
        setTurboSelecVeh,
        combustibleSelecVeh,
        setCombustibleSelecVeh,
        nombreTransmisionSelecVeh,
        setNombreTransmisionSelecVeh,
        nombreCilindrajeSelecVeh,
        setNombreCilindrajeSelecVeh,
        nombreTraccionSelecVeh,
        setNombreTraccionSelecVeh,
        nombreTurboSelecVeh,
        setNombreTurboSelecVeh,
        nombreCombustibleSelecVeh,
        setNombreCombustibleSelecVeh,
        setMostrarVehiculoSeleccionadoUno,
        mostrarVehiculoSeleccionadoUno,
        setMostrarVehiculoSeleccionadoDos,
        mostrarVehiculoSeleccionadoDos,
        setMostrarVehiculoSeleccionadoTres,
        mostrarVehiculoSeleccionadoTres,
        setMostrarVehiculoSeleccionadoCuatro,
        mostrarVehiculoSeleccionadoCuatro,
        setMostrarVehiculoSeleccionadoCinco,
        mostrarVehiculoSeleccionadoCinco,
        setMostrarVehiculoSeleccionadoSeis,
        mostrarVehiculoSeleccionadoSeis,
        setMostrarVehiculoSeleccionadoSiete,
        mostrarVehiculoSeleccionadoSiete,
        setMostrarVehiculoSeleccionadoOcho,
        mostrarVehiculoSeleccionadoOcho,
        setMostrarVehiculoSeleccionadoNueve,
        mostrarVehiculoSeleccionadoNueve,
        setMostrarVehiculoSeleccionadoDiez,
        mostrarVehiculoSeleccionadoDiez,
        setMostrarDatosVehiculos,
        contador,
        setContador,
        setLoading,
        numeroVehiculo,
        duplicarVehiculo,
        setDuplicarVehiculo,
    } = props;

    //console.log("CILINDRAJE : ", cilindrajesVeh);

    const [valorTipo, setValorTipo] = useState(tipoVeh);
    const [valorMarca, setValorMarca] = useState(marcaVeh);
    const [valorAnno, setValorAnno] = useState(annoVeh);
    const [valorModelo, setValorModelo] = useState(modeloVeh);
    const [valorCarroceria, setValorCarroceria] = useState(carroceriaVeh);

    // Asignar nombre de las opciones seleccionadas en lo vehiculos
    const [valorNombreTipo, setNombreValorTipo] = useState(nombretipoSelecVeh);
    const [valorNombreMarca, setNombreValorMarca] =
        useState(nombremarcaSelecVeh);
    const [valorNombreAnno, setNombreValorAnno] = useState(nombreannoSelecVeh);
    const [valorNombreModelo, setNombreValorModelo] =
        useState(nombremodeloSelecVeh);
    const [valorNombreCarroceria, setNombreValorCarroceria] = useState(
        nombrecarroceriaSelecVeh
    );
    const [valorNombreTransmision, setNombreValorTransmision] = useState(
        nombreTransmisionSelecVeh
    );
    const [valorNombreCilindraje, setNombreValorCilindraje] = useState(
        nombreCilindrajeSelecVeh
    );
    const [valorNombreTraccion, setNombreValorTraccion] = useState(
        nombreTraccionSelecVeh
    );
    const [valorNombreTurbo, setNombreValorTurbo] =
        useState(nombreTurboSelecVeh);
    const [valorNombreCombustible, setNombreValorCombustible] = useState(
        nombreCombustibleSelecVeh
    );

    const [tipoTransmision, setTipoTransmision] = useState(false);
    const [cilindradaMotor, setCilindradaMotor] = useState([]);
    const [traccionMotor, setTraccionMotor] = useState(4);
    const [turboMotor, setTurboMotor] = useState(false);
    const [tipoCombustible, setTipoCombustible] = useState(false);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState(listMarcasVehiculos);
    const [carrocerias, setCarrocerias] = useState(listCarroceriasVehiculos);
    const [modelos, setModels] = useState(listModelosVehiculos);
    const [listCilindradaMotor, setlistCilindradaMotor] = useState(
        listCilindrajesVehiculos
    );

    const transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    const combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    const tipotraccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
        { label: "No Aplica", value: 4 },
    ];

    const turbocompresor = [
        { label: "Turbo Sencillo", value: 1 },
        { label: "Turbo Doble", value: 2 },
        { label: "Turbo de Doble Entrada", value: 3 },
        { label: "Turbo de Geometría Variable", value: 4 },
        { label: "Turbo Variable de Doble Entrada", value: 5 },
        { label: "Turbo Eléctrico", value: 6 },
        { label: "No Aplica", value: 7 },
    ];

    // Filtra datos segun seleccion previa
    useEffect(() => {
        setLoading(false);

        //setLoading(false)
        console.log("NUMERO VEHICULO : : ", numeroVehiculo);
        if (!tipoVeh) {
            setTipoVeh(tipoSelecVeh[numeroVehiculo - 1]);
            setMarcaVeh(marcaSelecVeh[numeroVehiculo - 1]);
            setAnnoVeh(annoSelecVeh[numeroVehiculo - 1]);
            setModeloVeh(modeloSelecVeh[numeroVehiculo - 1]);
            setCarroceriaVeh(carroceriaSelecVeh[numeroVehiculo - 1]);
            setTransmisionVeh(transmisionSelecVeh[numeroVehiculo - 1]);
            setCilindrajesVeh(cilindrajeSelecVeh[numeroVehiculo - 1]);
            setTraccionVeh(traccionSelecVeh[numeroVehiculo - 1]);
            setCombustibleVeh(combustibleSelecVeh[numeroVehiculo - 1]);
            
            console.log("Tipo : ", tipoSelecVeh[numeroVehiculo - 1]);
            console.log("Marca : ", marcaSelecVeh[numeroVehiculo - 1]);
            console.log("Año : ", annoSelecVeh[numeroVehiculo - 1]);
            console.log("Modelo : ", modeloSelecVeh[numeroVehiculo - 1]);
            console.log("Carroceria : ", carroceriaSelecVeh[numeroVehiculo - 1]);
            console.log("Transmision : ", transmisionSelecVeh[numeroVehiculo - 1]);
            console.log("Cilindraje : ", cilindrajeSelecVeh[numeroVehiculo - 1]);
            console.log("Traccion : ", traccionSelecVeh[numeroVehiculo - 1]);
            console.log("Combustible : ", combustibleSelecVeh[numeroVehiculo - 1]);
        } else {
            console.log("Tipo : ", tipoVeh);
            console.log("Marca : ", marcaVeh);
            console.log("Año : ", annoVeh);
            console.log("Modelo : ", modeloVeh);
            console.log("Carroceria : ", carroceriaVeh);
            console.log("Transmision : ", transmisionVeh);
            console.log("Cilindraje : ", cilindrajesVeh);
            console.log("Traccion : ", traccionVeh);
            console.log("Combustible : ", combustibleVeh);
        }

        console.log("Tipo Select : ", tipoSelecVeh);
        console.log("Marca Selec : ", marcaSelecVeh);
        console.log("Año Select : ", annoSelecVeh);
        console.log("Modelo Selec : ", modeloSelecVeh);
        console.log("Carroceria Selec : ", carroceriaSelecVeh);
        console.log("Transmision Selec : ", transmisionSelecVeh);
        console.log("Cilindraje Selec : ", cilindrajeSelecVeh);
        console.log("Traccion Select : ", traccionSelecVeh);
        //console.log("Turbo Select : ", turboSelecVeh);
        console.log("Combustible Select : ", combustibleSelecVeh);
    }, []);

    const handleChangeTransmision = (selectedOptions) => {
        setTipoTransmision(selectedOptions);
        //console.log("TRANSMISION : ", selectedOptions);
        const newDet = [];
        transmisionSelecVeh &&
            transmisionSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        //console.log("ARREGLO NUEVO : ", newDet);
        //console.log("ARREGLO VIEJO : ", tipoSelecVeh);
        setTransmisionSelecVeh(newDet);
    };

    const handleChangeCombustible = (selectedOptions) => {
        setTipoCombustible(selectedOptions);

        const newDet = [];
        combustibleSelecVeh &&
            combustibleSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        //console.log("ARREGLO NUEVO : ", newDet);
        //console.log("ARREGLO VIEJO : ", tipoSelecVeh);
        setCombustibleSelecVeh(newDet);
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTraccionMotor(selectedOptions);

        const newDet = [];
        traccionSelecVeh &&
            traccionSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        //console.log("ARREGLO NUEVO : ", newDet);
        //console.log("ARREGLO VIEJO : ", tipoSelecVeh);
        setTraccionSelecVeh(newDet);

        if (contador === 1) setMostrarVehiculoSeleccionadoUno(contador);
        else if (contador === 2) setMostrarVehiculoSeleccionadoDos(contador);
        else if (contador === 3) setMostrarVehiculoSeleccionadoTres(contador);
        else if (contador === 4) setMostrarVehiculoSeleccionadoCuatro(contador);
        else if (contador === 5) setMostrarVehiculoSeleccionadoCinco(contador);
        else if (contador === 6) setMostrarVehiculoSeleccionadoSeis(contador);
        else if (contador === 7) setMostrarVehiculoSeleccionadoSiete(contador);
        else if (contador === 8) setMostrarVehiculoSeleccionadoOcho(contador);
        else if (contador === 9) setMostrarVehiculoSeleccionadoNueve(contador);
        else if (contador === 10) setMostrarVehiculoSeleccionadoDiez(contador);
    };

    const handleChange = (selectedOptions) => {
        //console.log("SELECTED OPTION : ", selectedOptions);

        if (tipoVeh != selectedOptions) {
            const newArray = [];
            listCarroceriasVehiculos &&
                listCarroceriasVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(selectedOptions)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                        };
                        newArray.push(item);
                    }
                });
            setCarrocerias(newArray);
        }

        setTipoVeh(selectedOptions);

        const newDet = [];
        tipoSelecVeh &&
            tipoSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        //console.log("ARREGLO NUEVO : ", newDet);
        //console.log("ARREGLO VIEJO : ", tipoSelecVeh);
        setTipoSelecVeh(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        if (carroceriaVeh != selectedOptions) {
            const newArray = [];
            listMarcasVehiculos &&
                listMarcasVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(selectedOptions)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newArray.push(item);
                    }
                });
            setMarcas(newArray);
        }

        setCarroceriaVeh(selectedOptions);

        const newDet = [];
        carroceriaSelecVeh &&
            carroceriaSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        setCarroceriaSelecVeh(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        if (modeloVeh != selectedOptions) {
            const newArray = [];

            listModelosVehiculos &&
                listModelosVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(selectedOptions) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newArray.push(item);
                    }
                });
            setModels(newArray);
        }

        setModeloVeh(selectedOptions);

        const newDet = [];
        marcaSelecVeh &&
            marcaSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        setMarcaSelecVeh(newDet);
    };

    const handleChangeAnno = (selectedOptions) => {
        //console.log("AÑO VEHICULO : ", selectedOptions);
        const newDet = [];
        annoSelecVeh &&
            annoSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        setAnnoSelecVeh(newDet);
    };

    const handleChangeModels = (selectedOptions) => {
        if (cilindrajesVeh != selectedOptions) {
            const newArray = [];
            listCilindrajesVehiculos &&
                listCilindrajesVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(selectedOptions)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };
                        newArray.push(item);
                    }
                });
            setlistCilindradaMotor(newArray);
        }

        setModeloVeh(selectedOptions);

        const newDet = [];
        modeloSelecVeh &&
            modeloSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        setModeloSelecVeh(newDet);
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        //console.log("VERSION MOTOR SelecDO : ", selectedOptions);
        const newDet = [];
        cilindrajeSelecVeh &&
            cilindrajeSelecVeh.forEach((row, index) => {
                if (
                    Number.parseInt(index) ===
                    Number.parseInt(numeroVehiculo - 1)
                ) {
                    newDet[index] = selectedOptions;
                } else {
                    newDet[index] = row;
                }
            });
        setCilindrajeSelecVeh(newDet);
    };

    const guardarCambios = () => {
        console.log("POSICION ARREGLO : ", numeroVehiculo);
        console.log("---------------- VALORES ----------------------");
        console.log("TIPO : ", tipoVeh);
        console.log("MARCA : ", marcaVeh);
        console.log("AÑO : ", annoVeh);
        console.log("MODELO : ", modeloVeh);
        console.log("CARROCERIA : ", carroceriaVeh);
        console.log("CILINDRAJE : ", cilindrajesVeh);
        console.log("TRACCION : ", traccionVeh);
        console.log("COMBUSTIBLE : ", combustibleVeh);
        console.log("TRANSMISION : ", transmisionVeh);
        /*
        console.log("---------------- SELECCCION ----------------------");
        console.log("TIPO SELEC : ", tipoSelecVeh);
        console.log("MARCA SELEC : ", marcaSelecVeh);
        console.log("AÑO SELEC : ", annoSelecVeh);
        console.log("MODELO SELECT : ", modeloSelecVeh);
        console.log("CARROCERIA SELECT : ", carroceriaSelecVeh);
        console.log("CILINDRAJE SELECT : ", cilindrajeSelecVeh);
        console.log("TRACCION SELECT : ", traccionSelecVeh);
        console.log("COMBUSTIBLE SELECT : ", combustibleSelecVeh);
        console.log("TRANSMISION SELECT: ", transmisionSelecVeh);
*/
        /*
        setTipoSelecVeh(tipoVeh);
        setMarcaSelecVeh(marcaVeh);
        setAnnoSelecVeh(annoVeh);
        setModeloSelecVeh(modeloVeh);
        setCarroceriaSelecVeh(carroceriaVeh);
        setTransmisionSelecVeh(transmisionSelecVeh);
        setCilindrajeSelecVeh(cilindrajeSelecVeh);
        setTraccionSelecVeh(traccionSelecVeh);
        setTurboSelecVeh(turboMotor);
        setCombustibleSelecVeh(combustibleSelecVeh);
        */

        if (contador === 1) setMostrarVehiculoSeleccionadoUno(contador);
        else if (contador === 2) setMostrarVehiculoSeleccionadoDos(contador);
        else if (contador === 3) setMostrarVehiculoSeleccionadoTres(contador);
        else if (contador === 4) setMostrarVehiculoSeleccionadoCuatro(contador);
        else if (contador === 5) setMostrarVehiculoSeleccionadoCinco(contador);
        else if (contador === 6) setMostrarVehiculoSeleccionadoSeis(contador);
        else if (contador === 7) setMostrarVehiculoSeleccionadoSiete(contador);
        else if (contador === 8) setMostrarVehiculoSeleccionadoOcho(contador);
        else if (contador === 9) setMostrarVehiculoSeleccionadoNueve(contador);
        else if (contador === 10) setMostrarVehiculoSeleccionadoDiez(contador);

        //setMostrarDatosVehiculos(false);
        setDuplicarVehiculo(false);
    };

    return (
        <div className="mt-4">
            <Row>
                <div className="ml-16">
                    <div>
                        <select
                            defaultValue={tipoVeh}
                            //disabled="disabled"
                            className="redonderbordescrearproducto custom-selectcreateproducto"
                            onChange={(e) => handleChange(e.target.value)}>
                            <option selected="selected">
                                Tipo de Vehículo
                            </option>
                            {vehiculos &&
                                vehiculos.map((itemselecttipo) => {
                                    return (
                                        <option value={itemselecttipo.id}>
                                            {itemselecttipo.icon +
                                                " " +
                                                itemselecttipo.text}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1">
                                <select
                                    defaultValue={carroceriaVeh}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem"
                                    onChange={(e) =>
                                        handleChangeCarroceria(e.target.value)
                                    }>
                                    <option selected="selected">
                                        Carroceria
                                    </option>
                                    {carrocerias &&
                                        carrocerias.map(
                                            (itemselectcarroceria) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselectcarroceria.id
                                                        }>
                                                        {
                                                            itemselectcarroceria.carroceria
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1 mlmenos21">
                                <select
                                    defaultValue={marcaVeh}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem"
                                    onChange={(e) =>
                                        handleChangeBrand(e.target.value)
                                    }>
                                    <option selected="selected">Marca</option>
                                    {marcas &&
                                        marcas.map((itemselectmarcas) => {
                                            return (
                                                <option
                                                    value={itemselectmarcas.id}>
                                                    {itemselectmarcas.text}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1">
                                <select
                                    defaultValue={annoVeh}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem"
                                    onChange={(e) =>
                                        handleChangeAnno(e.target.value)
                                    }>
                                    <option selected="selected">Año</option>
                                    {annos &&
                                        annos.map((itemselectanno) => {
                                            return (
                                                <option
                                                    value={
                                                        itemselectanno.value
                                                    }>
                                                    {itemselectanno.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1 mlmenos21">
                                <select
                                    defaultValue={modeloVeh}
                                    //value={1}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem"
                                    onChange={(e) =>
                                        handleChangeModels(e.target.value)
                                    }>
                                    <option selected="selected">Modelo</option>
                                    {modelos &&
                                        modelos.map((itemselectmodelo) => {
                                            return (
                                                <option
                                                    value={
                                                        itemselectmodelo.value
                                                    }>
                                                    {itemselectmodelo.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1">
                                <select
                                    defaultValue={cilindrajesVeh}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem"
                                    onChange={(e) =>
                                        handleChangeVersionMotor(e.target.value)
                                    }>
                                    <option selected="selected">
                                        Cilindraje
                                    </option>
                                    {listCilindradaMotor &&
                                        listCilindradaMotor.map(
                                            (itemcilindraje) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemcilindraje.value
                                                        }>
                                                        {itemcilindraje.label}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1 mlmenos21">
                                <select
                                    defaultValue={transmisionVeh}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem"
                                    onChange={(e) =>
                                        handleChangeTransmision(e.target.value)
                                    }>
                                    <option selected="selected">
                                        Transmisión
                                    </option>
                                    {transmision &&
                                        transmision.map((itemselect) => {
                                            return (
                                                <option
                                                    value={itemselect.value}>
                                                    {itemselect.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1">
                                <select
                                    defaultValue={combustibleVeh}
                                    //disabled="disabled"
                                    className="custom-selectcreateproductoitem  redonderborinferiorizquierdo"
                                    onChange={(e) =>
                                        handleChangeCombustible(e.target.value)
                                    }>
                                    <option selected="selected">
                                        Combustible
                                    </option>
                                    {combustible &&
                                        combustible.map((itemselect) => {
                                            return (
                                                <option
                                                    value={itemselect.value}>
                                                    {itemselect.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div className="mt-1 mlmenos21">
                                <select
                                    defaultValue={traccionVeh}
                                    className="custom-selectcreateproductoitem redonderborinferiorderecho"
                                    name="tipotraccion"
                                    onChange={(e) =>
                                        handleChangeTraccion(e.target.value)
                                    }>
                                    <option selected="selected">
                                        Tracción
                                    </option>
                                    {tipotraccion &&
                                        tipotraccion.map((itemselect) => {
                                            return (
                                                <option
                                                    value={itemselect.value}>
                                                    {itemselect.label}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <div
                        className="ps-form__input mt-3 botonagregarotrovehiculo"
                        onClick={() => guardarCambios()}>
                        {<h3>Guardar cambios</h3>}
                    </div>
                </div>
            </Row>
        </div>
    );
}

export default DatosVehiculosDuplicar;
