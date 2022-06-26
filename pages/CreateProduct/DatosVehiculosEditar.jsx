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

function DatosVehiculosEditar(props) {
    const {
        vehiculos,
        setVehiculos,
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
        setListaMarcaSelecVeh,
        listaMarcaSelecVeh,
        listaModeloSelecVeh,
        setListaModeloSelecVeh,
        listaCarroceriaSelecVeh,
        setListaCarroceriaSelecVeh,
        listaCilindrajeSelecVeh,
        setListaCilindrajeSelecVeh,
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
        editarVehiculo,
        setEditarVehiculo,
        setLoading,
        numeroVehiculo,
    } = props;

    //console.log("CILINDRAJE : ", cilindrajesVeh);

    const [cambiar, setCambiar] = useState(false);
    const [valorTipo, setValorTipo] = useState(tipoVeh);
    const [valorMarca, setValorMarca] = useState(marcaVeh);
    const [valorAnno, setValorAnno] = useState(annoVeh);
    const [valorModelo, setValorModelo] = useState(modeloVeh);
    const [valorCarroceria, setValorCarroceria] = useState(0);
    const [valorCilindraje, setValorCilindraje] = useState(0);

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
    const [marcas, setMarcas] = useState(listaMarcaSelecVeh);
    const [carrocerias, setCarrocerias] = useState(listaCarroceriaSelecVeh);
    const [modelos, setModels] = useState(listaModeloSelecVeh);
    const [listCilindradaMotor, setlistCilindradaMotor] = useState(
        listaCilindrajeSelecVeh
    );

    const [defCarroceriaVeh, setDefCarroceriaVeh] = useState(carroceriaVeh);
    const [defMarcaVeh, setDefMarcaVeh] = useState(marcaVeh);
    const [defModeloVeh, setDefModeloVeh] = useState(modeloVeh);
    const [defCilindrajeVeh, setDefCilindrajeVeh] = useState(cilindrajesVeh);

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
        //setEditarVehiculo(false);
        /*
        if (cambiar) {
            alert("LLEGUE");
            setLoading(true);
            const newArray = [];
            listCarroceriasVehiculos &&
                listCarroceriasVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(valorTipo)
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
            setCambiar(false);
            setLoading(false);
            setEditarVehiculo(false);
        }
        */
    }, [cambiar]);

    const handleChangeTransmision = (selectedOptions) => {
        setTraccionVeh(selectedOptions);
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
        setCombustibleVeh(selectedOptions);

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
        setTraccionVeh(selectedOptions);

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
    };

    const handleChange = (selectedOptions) => {
        //console.log("SELECTED OPTION : ", selectedOptions);

        setCarrocerias(0);
        handleChangeCarroceria(0);
        setDefMarcaVeh(0);
        setDefModeloVeh(0);
        setMarcas(0);
        setModels(0);
        setlistCilindradaMotor(0);

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
        //handleChangeCarroceria(0);
        setDefMarcaVeh(0);
        setDefModeloVeh(0);
        setMarcas(0);
        setModels(0);
        setlistCilindradaMotor(0);
        //(selectedOptions);
        //console.log("TIPO VEHICULO : ", valorTipo)
        //console.log("CARROCERIA SELECCIONADA: ", selectedOptions)
        setValorCarroceria(selectedOptions);

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
        console.log("SELECCION : ", selectedOptions)
        console.log("MARCA : ", marcaVeh)
        console.log("CARROCERIA : ", carroceriaVeh)
        console.log("CARROCERIA SELECCIONADA: ", valorCarroceria)
        console.log("LISTA MODELOS VEH : ", listModelosVehiculos)

        if(marcaVeh != selectedOptions) {
            const newArray = [];
alert("ENTRE")
            listModelosVehiculos &&
                listModelosVehiculos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(selectedOptions) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(valorCarroceria)
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
        setMarcaVeh(selectedOptions);

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
        setAnnoVeh(selectedOptions);
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
        setCilindrajesVeh(selectedOptions);
    };

    const guardarCambios = () => {
        /*
        setTipoVeh(valorTipo);
        setMarcaVeh(valorMarca);
        setAnnoVeh(valorAnno);
        setModeloVeh(valorModelo);
        setCarroceriaVeh(valorCarroceria);
        setCilindrajesVeh(valorCilindraje);
        */
        setTraccionVeh(traccionVeh);
        setCombustibleVeh(combustibleVeh);
        setTransmisionVeh(transmisionVeh);

        setTipoSelecVeh(tipoSelecVeh);
        setMarcaSelecVeh(marcaSelecVeh);
        setAnnoSelecVeh(annoSelecVeh);
        setModeloSelecVeh(modeloSelecVeh);
        setCarroceriaSelecVeh(carroceriaSelecVeh);
        setCilindrajeSelecVeh(cilindrajeSelecVeh);
        setTraccionSelecVeh(traccionSelecVeh);
        setCombustibleSelecVeh(combustibleSelecVeh);
        setTransmisionSelecVeh(transmisionSelecVeh);

        console.log(
            "---------------- ARREGLO SELECCIONADO ----------------------"
        );
        console.log("TIPO : ", tipoSelecVeh);
        console.log("MARCA : ", marcaSelecVeh);
        console.log("AÑO : ", annoSelecVeh);
        console.log("MODELO : ", modeloSelecVeh);
        console.log("CARROCERIA : ", carroceriaSelecVeh);
        console.log("CILINDRAJE : ", cilindrajeSelecVeh);
        console.log("TRACCION : ", traccionSelecVeh);
        console.log("COMBUSTIBLE : ", combustibleSelecVeh);
        console.log("TRANSMISION : ", transmisionSelecVeh);

        console.log("POSICION ARREGLO : ", numeroVehiculo);
        console.log("---------------- VALORES ----------------------");
        console.log("TIPO : ", valorTipo);
        console.log("MARCA : ", valorMarca);
        console.log("AÑO : ", valorAnno);
        console.log("MODELO : ", valorModelo);
        console.log("CARROCERIA : ", valorCarroceria);
        console.log("CILINDRAJE : ", valorCilindraje);
        console.log("TRACCION : ", traccionVeh);
        console.log("COMBUSTIBLE : ", combustibleVeh);
        console.log("TRANSMISION : ", transmisionVeh);

        const newTransmision = [];
        transmisionSelecVeh.forEach((items, index) => {
            if (contador - 1 == index) {
                if (transmisionVeh == 1) {
                    newTransmision.push("Automática");
                } else if (transmisionVeh == 2) {
                    newTransmision.push("Manual");
                } else {
                    newTransmision.push("NA");
                }
            } else {
                if (transmisionVeh == 1) {
                    newTransmision.push(items);
                } else if (transmisionVeh == 2) {
                    newTransmision.push(items);
                } else {
                    newTransmision.push(items);
                }
            }
        });
        setNombreTransmisionSelecVeh(newTransmision);

        const newCombustible = [];
        combustibleSelecVeh.forEach((items, index) => {
            if (contador - 1 == index) {
                if (combustibleVeh == 1) {
                    newCombustible.push("Gasolina");
                } else if (combustibleVeh == 2) {
                    newCombustible.push("Diesel");
                } else if (combustibleVeh == 3) {
                    newCombustible.push("Gasolina - Gas");
                } else if (combustibleVeh == 4) {
                    newCombustible.push("Gasolina – Eléctrico");
                } else {
                    newCombustible.push("NA");
                }
            } else {
                if (combustibleVeh == 1) {
                    newCombustible.push(items);
                } else if (combustibleVeh == 2) {
                    newCombustible.push(items);
                } else if (combustibleVeh == 3) {
                    newCombustible.push(items);
                } else if (combustibleVeh == 4) {
                    newCombustible.push(items);
                } else {
                    newCombustible.push(items);
                }
            }
        });
        setNombreCombustibleSelecVeh(newCombustible);

        const newTraccion = [];
        traccionSelecVeh.forEach((items, index) => {
            if (contador - 1 == index) {
                if (traccionVeh == 1) {
                    newTraccion.push("Tracción Delantera");
                } else if (traccionVeh == 2) {
                    newTraccion.push("Tracción Trasera");
                } else if (traccionVeh == 3) {
                    newTraccion.push("Tracción 4x4");
                } else if (traccionVeh == 4) {
                    newTraccion.push("No Aplica");
                } else {
                    newTraccion.push("NA");
                }
            } else {
                if (traccionVeh == 1) {
                    newTraccion.push(items);
                } else if (traccionVeh == 2) {
                    newTraccion.push(items);
                } else if (traccionVeh == 3) {
                    newTraccion.push(items);
                } else if (traccionVeh == 4) {
                    newTraccion.push(items);
                } else {
                    newTraccion.push(items);
                }
            }
        });
        setNombreTraccionSelecVeh(newTraccion);

        const newNombreTipo = [];
        vehiculos &&
            vehiculos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(tipoVeh)) {
                    valorNombreTipo.forEach((items, index) => {
                        if (contador - 1 == index) {
                            newNombreTipo.push(row.text);
                        } else {
                            newNombreTipo.push(items);
                        }
                    });
                    setNombreTipoSelecVeh(newNombreTipo);
                }
            });

        const newNombreCarroceria = [];
        carrocerias &&
            carrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(carroceriaVeh)
                ) {
                    valorNombreCarroceria.forEach((items, index) => {
                        console.log("CARROCERIA: ", carroceriaVeh);
                        console.log("NOMBRE CARROCERIA: ", row.carroceria);
                        console.log("ITEM CARROCERIA: ", items);
                        if (contador - 1 == index) {
                            newNombreCarroceria.push(row.carroceria);
                        } else {
                            newNombreCarroceria.push(items);
                        }
                    });
                    console.log(newNombreCarroceria);
                    setNombreCarroceriaSelecVeh(newNombreCarroceria);
                }
            });

        const newNombreMarca = [];
        marcas &&
            marcas.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(marcaVeh)) {
                    valorNombreMarca.forEach((items, index) => {
                        if (contador - 1 == index) {
                            newNombreMarca.push(row.text);
                        } else {
                            newNombreMarca.push(items);
                        }
                    });
                    setNombreMarcaSelecVeh(newNombreMarca);
                }
            });

        const newNombreAnno = [];
        annos &&
            annos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(annoVeh)) {
                    annoSelecVeh.forEach((items, index) => {
                        if (contador - 1 == index) {
                            newNombreAnno.push(row.anovehiculo);
                        } else {
                            newNombreAnno.push(items);
                        }
                    });
                }
            });
        setNombreAnnoSelecVeh(newNombreAnno);

        const newNombreModelo = [];
        modelos &&
            modelos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(modeloVeh)) {
                    modeloSelecVeh.forEach((items, index) => {
                        if (contador - 1 == index) {
                            newNombreModelo.push(row.modelo);
                        } else {
                            newNombreModelo.push(items);
                        }
                    });
                }
            });
        setNombreModeloSelecVeh(newNombreModelo);

        //console.log("CILINDRAJE : ", cilindrajesVeh)
        //console.log("LISTADO CILINDRAJE : ", listCilindrajesVehiculos)

        const newNombreCilindraje = [];

        listCilindrajesVehiculos &&
            listCilindrajesVehiculos.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(cilindrajesVeh)
                ) {
                    cilindrajeSelecVeh.forEach((items, index) => {
                        if (contador - 1 == index) {
                            newNombreCilindraje.push(row.cilindraje);
                        } else {
                            newNombreCilindraje.push(items);
                        }
                    });
                }
            });
        setNombreCilindrajeSelecVeh(newNombreCilindraje);
        
        //console.log("AÑO VEHICULO : ",  annos)
        console.log(
            "NOMBRES VEHICULOS GUARDAR : ",
            nombremarcaSelecVeh,
            nombreannoSelecVeh,
            nombremodeloSelecVeh,
            nombrecarroceriaSelecVeh,
            nombreTransmisionSelecVeh,
            nombreCilindrajeSelecVeh,
            nombreCombustibleSelecVeh
        );

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
        setEditarVehiculo(false);
        //setCambiar(true);
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

export default DatosVehiculosEditar;
