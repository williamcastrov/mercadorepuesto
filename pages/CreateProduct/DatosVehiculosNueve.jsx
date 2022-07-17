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
    Tooltip,
    Overlay,
} from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import shortid from "shortid";

function DatosVehiculosNueve(props) {
    const {
        vehiculoNueveCrear,
        setVehiculoNueveCrear,
        vehiculoNueveEditar,
        setVehiculoNueveEditar,
        vehiculoNueveDuplicar,
        setVehiculoNueveDuplicar,
        vehiculoNueveSelecc,
        setVehiculoNueveSelecc,
        agregarVehiculo,
        setAgregarVehiculo,
        setAgregarDatos,
        agregarDatos,
        setDuplicar,
        duplicar,
        vehiculoNueveUbicar,
        setVehiculoNueveUbicar,
        setTipoVehNueve,
        setMarcaVehNueve,
        setAnnoVehNueve,
        setModeloVehNueve,
        setCarroceriaVehNueve,
        setcilindrajeVehNueve,
        settransmisionVehNueve,
        setcombustibleVehNueve,
        settraccionVehNueve,
        tipoVehUno,
        showTraccion,
        showTransmision,
        setShowTransmision
    } = props;

    // Asignar nombre de las opciones seleccionadas en lo vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    // Caracteristicas seleccionadas por vehiculo
    const [tipoVeh, setTipoVeh] = useState(null);
    const [marcaVeh, setMarcaVeh] = useState(null);
    const [annoVeh, setAnnoVeh] = useState(null);
    const [modeloVeh, setModeloVeh] = useState(null);
    const [cilindrajesVeh, setCilindrajesVeh] = useState(null);
    const [carroceriaVeh, setCarroceriaVeh] = useState(null);
    const [transmisionVeh, setTransmisionVeh] = useState(null);
    const [combustibleVeh, setCombustibleVeh] = useState(null);
    const [traccionVeh, setTraccionVeh] = useState(null);

    // Caracteristicas seleccionadas por vehiculo
    const [editarTipo, setEditarTipo] = useState(false);
    const [editarCarroceria, setEditarCarroceria] = useState(false);
    const [editarMarca, setEditarMarca] = useState(false);
    const [editarModelo, setEditarModelo] = useState(false);

    const [editarTipoVeh, setEditarTipoVeh] = useState([]);
    const [editarMarcaVeh, setEditarMarcaVeh] = useState([]);
    const [editarAnnoVeh, setEditarAnnoVeh] = useState([]);
    const [editarModeloVeh, setEditarModeloVeh] = useState([]);
    const [editarCilindrajesVeh, setEditarCilindrajesVeh] = useState([]);
    const [editarCarroceriaVeh, setEditarCarroceriaVeh] = useState([]);
    const [editarTransmisionVeh, setEditarTransmisionVeh] = useState([]);
    const [editarCombustibleVeh, setEditarCombustibleVeh] = useState([]);
    const [editarTraccionVeh, setEditarTraccionVeh] = useState([]);

    // Caracteristicas seleccionadas por vehiculo
    const [nombreTipoVeh, setNombreTipoVeh] = useState("");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("");
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("");
    const [nombreModeloVeh, setNombreModeloVeh] = useState("");
    const [nombreCilindrajesVeh, setNombreCilindrajesVeh] = useState("");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState("");
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState("");
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState("");
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState("");

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState([]);
    const [carrocerias, setCarrocerias] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [modelos, setModels] = useState([]);

    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const targetedit = useRef(null);
    const targetcopy = useRef(null);
    const [cambia, setCambia] = useState(false);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductosmodelos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    //console.log("MODELOS CREAR PRODUCTOS : ", datoscrearproductosmodelos);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductoscilindrajes = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    useEffect(() => {
        //console.log("VALOR DUPLICAR : ", duplicar);
         // Lee modelos de los Vehiculos del state
        const datosDuplicar = JSON.parse(localStorage.getItem("duplicarvehiculo"));

        if (duplicar) {
            setTipoVeh(datosDuplicar.tipoVeh);
            setMarcaVeh(datosDuplicar.marcaVeh);
            setAnnoVeh(datosDuplicar.annoVeh);
            setModeloVeh(datosDuplicar.modeloVeh);
            setCilindrajesVeh(datosDuplicar.cilindrajesVeh);
            setCarroceriaVeh(datosDuplicar.carroceriaVeh);
            setTransmisionVeh(datosDuplicar.transmisionVeh);
            setCombustibleVeh(datosDuplicar.combustibleVeh);
            setTraccionVeh(datosDuplicar.traccionVeh);

            const newDetMod = [];
            datoscrearproductosmodelos &&
                datoscrearproductosmodelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                        Number.parseInt(datosDuplicar.marcaVeh)
                    ) {
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
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);

            const newDet = [];
            datoscrearproductoscilindrajes &&
                datoscrearproductoscilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(datosDuplicar.modeloVeh)
                    ) {
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
                        newDet.push(item);
                    }
                });
            setCilindrajes(newDet);
        }

        const list = JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"));

        setListModelos(datoscrearproductosmodelos);
        setListCilindrajes(datoscrearproductoscilindrajes);
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));

        setListMarcas(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));
        setMarcas(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));

        setListCarrocerias(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        //setCarrocerias(
        //    JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        //);

        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        const newDetTipo = [];
        setTipoVeh(tipoVehUno);
        list.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(tipoVehUno)
            ) {
                let item = {
                    id: row.id,
                    carroceria: row.carroceria,
                    tipoVeh: row.tipovehiculo,
                    estado: row.estado,
                    value: row.id,
                    label: row.carroceria,
                };
                newDetTipo.push(item);
            }
        });
   	    setCarrocerias(newDetTipo);
        
        //setLoading(true);
        //setCambia(true);
    }, []);

    useEffect(() => {
        if (editarTipo) {
            setMarcas([]);
            setCarrocerias([]);
            setCilindrajes([]);
            setModels([]);
            transmision = [];
            tipotraccion = [];
            setEditarMarcaVeh("");
            setEditarAnnoVeh("");
            setEditarModeloVeh("");
            setEditarCilindrajesVeh("");
            setEditarCarroceriaVeh("");
            setEditarTransmisionVeh("");

            const newDet = [];
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVeh[0])
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
                    newDet.push(item);
                }
            });
            setCarrocerias(newDet);
            console.log("DATOS : ", newDet);

            setEditarTipo(false);
        }
    }, [editarTipo]);

    useEffect(() => {
        if (editarCarroceria) {
            setMarcas([]);
            setCilindrajes([]);
            setModels([]);
            transmision = [];
            tipotraccion = [];
            setEditarMarcaVeh("");
            setEditarAnnoVeh("");
            setEditarModeloVeh("");
            setEditarCilindrajesVeh("");
            setEditarCarroceriaVeh("");
            setEditarTransmisionVeh("");

            const newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
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
                        newDet.push(item);
                    }
                });
            setMarcas(newDet);
            console.log("MARCAS : ", newDet);

            setEditarCarroceria(false);
        }
    }, [editarCarroceria]);

    useEffect(() => {
        if (editarMarca) {
            setCilindrajes([]);
            setModels([]);
            transmision = [];
            tipotraccion = [];
            //setEditarMarcaVeh(0);

            const newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(marcaVeh) &&
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
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);
            setEditarMarca(false);
        }
    }, [editarMarca]);

    useEffect(() => {
        if (editarModelo) {
            setCilindrajes([]);
            transmision = [];
            tipotraccion = [];
            setEditarCilindrajesVeh(0);

            const newDet = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(modeloVeh)
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
                        newDet.push(item);
                    }
                });
            //console.log("CILINDRAJE : ", newDet);
            setCilindrajes(newDet);
            setEditarModelo(false);
        }
    }, [editarModelo]);

    let transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    let combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    let tipotraccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
        { label: "No Aplica", value: 4 },
    ];

    let turbocompresor = [
        { label: "Turbo Sencillo", value: 1 },
        { label: "Turbo Doble", value: 2 },
        { label: "Turbo de Doble Entrada", value: 3 },
        { label: "Turbo de Geometría Variable", value: 4 },
        { label: "Turbo Variable de Doble Entrada", value: 5 },
        { label: "Turbo Eléctrico", value: 6 },
        { label: "No Aplica", value: 7 },
    ];

    const [selected, setSelected] = useState(1);

    const handleChange = (selectedOptions) => {
        //console.log("SELECTED OPTION : ",selectedOptions)
        setTipoVeh(selectedOptions);

        setEditarTipo(true);

        const newDet = [];
        listCarrocerias.forEach((row) => {
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
                newDet.push(item);
            }
        });
        setCarrocerias(newDet);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        //console.log("SELECTED CARROCERIA : ",selectedOptions)

        setCarroceriaVeh(selectedOptions);
        setEditarCarroceriaVeh(selectedOptions);

        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCarroceriaVeh(row.carroceria);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });

        setEditarCarroceria(true);

        const newDet = [];
        listMarcas &&
            listMarcas.forEach((row) => {
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
                    newDet.push(item);
                }
            });
        setMarcas(newDet);
    };

    const handleChangeBrand = (selectedOptions) => {
        //console.log("SELECTED MARCA : ",selectedOptions)

        //console.log("NEW MARCA : ",newMarca);
        setMarcaVeh(selectedOptions);
        setEditarMarcaVeh(selectedOptions);

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreMarcaVeh(row.text);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });

        setEditarMarca(true);

        const newDetMod = [];
        listModelos &&
            listModelos.forEach((row) => {
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
                    newDetMod.push(item);
                }
            });
        setModels(newDetMod);
        /*
        localStorage.setItem(
            "datosmodelosvehiculos",
            JSON.stringify(newDetMod)
        );
        */
    };

    const handleChangeAnno = (selectedOptions) => {
        //console.log("AÑO VEHICULO : ", selectedOptions);
        setAnnoVeh(selectedOptions);
        setEditarAnnoVeh(selectedOptions);

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreAnnoVeh(row.anovehiculo);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });
    };

    const handleChangeModels = (selectedOptions) => {
        //console.log("MODELO SELECCIONADO : ", selectedOptions);
        const newModelo = [];
        newModelo.push(selectedOptions);
        //console.log("NEW MODELO : ", newModelo);
        setModeloVeh(newModelo);
        setEditarModeloVeh(selectedOptions);

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreModeloVeh(row.modelo);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });

        setEditarModelo(true);

        if (selectedOptions > 0) {
            //console.log("VALOR SelecDO : ", selectedOptions)
            let modelo = selectedOptions;

            const newDet = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) === Number.parseInt(modelo)
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
                        newDet.push(item);
                    }
                });

            //console.log("CILINDRAJE : ", newDet);
            setCilindrajes(newDet);
        }
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        //console.log("VERSION MOTOR SelecDO : ", selectedOptions);
        setCilindrajesVeh(selectedOptions);
        setEditarCilindrajesVeh(selectedOptions);

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCilindrajesVeh(row.cilindraje);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTransmisionVeh(selectedOptions);
        setEditarTransmisionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTransmisionVeh("Automática");
        } else if (selectedOptions == 2) {
            setNombreTransmisionVeh("Manual");
        } else {
            setNombreTransmisionVeh("NA");
        }
    };

    const handleChangeCombustible = (selectedOptions) => {
        setCombustibleVeh(selectedOptions);
        setEditarCombustibleVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreCombustibleVeh("Gasolina");
        } else if (selectedOptions == 2) {
            setNombreCombustibleVeh("Diesel");
        } else if (selectedOptions == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
        } else if (selectedOptions == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("NA");
        }

        if (tipoVehUno == 1 || tipoVehUno == 3 || tipoVehUno == 6) {
            setNombreTraccionVeh("NA");
            setAgregarVehiculo(true);
            setVehiculoNueveCrear(false);
            setVehiculoNueveSelecc(true);

            setTipoVehNueve(tipoVeh[0]);
            setMarcaVehNueve(marcaVeh);
            setAnnoVehNueve(annoVeh);
            setModeloVehNueve(modeloVeh[0]);
            setcilindrajeVehNueve(cilindrajesVeh);
            setCarroceriaVehNueve(carroceriaVeh);
            settransmisionVehNueve(transmisionVeh);
            setcombustibleVehNueve(selectedOptions);
            settraccionVehNueve(4);
        }
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTraccionVeh(selectedOptions);
        setEditarTraccionVeh(selectedOptions);

        if (
            !tipoVeh ||
            !marcaVeh ||
            !annoVeh ||
            !modeloVeh ||
            !cilindrajesVeh ||
            !carroceriaVeh ||
            !transmisionVeh ||
            !combustibleVeh
        ) {
            swal(
                "Identificación del vehículo",
                "Recuerda, todos los datos son obligatorios!",
                "warning",
                { button: "Aceptar" }
            );
            return;
        }

        if (selectedOptions == 1) {
            setNombreTraccionVeh("Tracción Delantera");
        } else if (selectedOptions == 2) {
            setNombreTraccionVeh("Tracción Trasera");
        } else if (selectedOptions == 3) {
            setNombreTraccionVeh("Tracción 4x4");
        } else if (selectedOptions == 4) {
            setNombreTraccionVeh("NA");
        }

        setAgregarVehiculo(true);
        setVehiculoNueveCrear(false);
        setVehiculoNueveSelecc(true);

        setTipoVehNueve(tipoVeh[0]);
        setMarcaVehNueve(marcaVeh);
        setAnnoVehNueve(annoVeh);
        setModeloVehNueve(modeloVeh[0]);
        setcilindrajeVehNueve(cilindrajesVeh);
        setCarroceriaVehNueve(carroceriaVeh);
        settransmisionVehNueve(transmisionVeh);
        setcombustibleVehNueve(combustibleVeh);
        settraccionVehNueve(traccionVeh);
    };

    const editarDatosVehiculos = () => {
        setVehiculoNueveEditar(true);
        setVehiculoNueveSelecc(false);
        setEditarTipoVeh(tipoVeh);
        setEditarMarcaVeh(marcaVeh);
        setEditarAnnoVeh(annoVeh);
        setEditarModeloVeh(modeloVeh);
        setEditarCilindrajesVeh(cilindrajesVeh);
        setEditarCarroceriaVeh(carroceriaVeh);
        setEditarTransmisionVeh(transmisionVeh);
        setEditarCombustibleVeh(combustibleVeh);
        setEditarTraccionVeh(traccionVeh);
    };

    const duplicarDatosVehiculos = () => {
        setAgregarDatos(true);
        setDuplicar(true);
        let duplicar = {
            tipoVeh: tipoVeh,
            marcaVeh: marcaVeh,
            annoVeh: annoVeh,
            modeloVeh: modeloVeh,
            cilindrajesVeh: cilindrajesVeh,
            carroceriaVeh: carroceriaVeh,
            transmisionVeh: transmisionVeh,
            combustibleVeh: combustibleVeh,
            traccionVeh: traccionVeh
        };
        localStorage.setItem('duplicarvehiculo', JSON.stringify(duplicar));
    };

    const guardarDatosVehiculos = () => {
        setVehiculoNueveEditar(false);
        setVehiculoNueveSelecc(true);

        setTipoVehNueve(tipoVeh[0]);
        setMarcaVehNueve(marcaVeh);
        setAnnoVehNueve(annoVeh);
        setModeloVehNueve(modeloVeh[0]);
        setcilindrajeVehNueve(cilindrajesVeh);
        setCarroceriaVehNueve(carroceriaVeh);
        settransmisionVehNueve(transmisionVeh);
        setcombustibleVehNueve(combustibleVeh);
        settraccionVehNueve(traccionVeh);
    };

    return (
        <div className="mt-4">
            {vehiculoNueveCrear ? (
                <Row>
                    <div>
                        {" "}
                        <Col>
                            <div>
                                <div>
                                    <select
                                        //disabled="disabled"
                                        value={tipoVehUno}
                                        disabled={true}
                                        className="redonderbordescrearproducto custom-selectcreateproducto colorbase"
                                        onChange={(e) =>
                                            handleChange(e.target.value)
                                        }>
                                        <option selected>
                                            Tipo de Vehículo
                                        </option>
                                        {vehiculos &&
                                            vehiculos.map((itemselecttipo) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselecttipo.id
                                                        }>
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
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem colorbase"
                                                onChange={(e) =>
                                                    handleChangeCarroceria(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Carroceria
                                                </option>
                                                {carrocerias &&
                                                    carrocerias.map(
                                                        (
                                                            itemselectcarroceria
                                                        ) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectcarroceria.value
                                                                    }>
                                                                    {
                                                                        itemselectcarroceria.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos20">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem colorbase"
                                                onChange={(e) =>
                                                    handleChangeBrand(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Marca</option>
                                                {marcas &&
                                                    marcas.map(
                                                        (itemselectmarcas) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectmarcas.id
                                                                    }>
                                                                    {
                                                                        itemselectmarcas.text
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem colorbase"
                                                onChange={(e) =>
                                                    handleChangeAnno(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Año</option>
                                                {annos &&
                                                    annos.map(
                                                        (itemselectanno) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectanno.value
                                                                    }>
                                                                    {
                                                                        itemselectanno.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos20">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem colorbase"
                                                onChange={(e) =>
                                                    handleChangeModels(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>Modelo</option>
                                                {modelos &&
                                                    modelos.map(
                                                        (itemselectmodelo) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselectmodelo.value
                                                                    }>
                                                                    {
                                                                        itemselectmodelo.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem colorbase"
                                                onChange={(e) =>
                                                    handleChangeVersionMotor(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Cilindraje
                                                </option>
                                                {cilindrajes &&
                                                    cilindrajes.map(
                                                        (itemcilindraje) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemcilindraje.value
                                                                    }>
                                                                    {
                                                                        itemcilindraje.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos20">
                                            <select
                                                disabled={showTransmision}
                                                className="custom-selectcreateproductoitem colorbase"
                                                onChange={(e) =>
                                                    handleChangeTransmision(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Transmisión
                                                </option>
                                                {transmision &&
                                                    transmision.map(
                                                        (itemselect) => {
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
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1">
                                            <select
                                                //disabled="disabled"
                                                className="custom-selectcreateproductoitem redonderborinferiorizquierdo colorbase"
                                                onChange={(e) =>
                                                    handleChangeCombustible(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Combustible
                                                </option>
                                                {combustible &&
                                                    combustible.map(
                                                        (itemselect) => {
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
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1  mlmenos20">
                                            <select
                                                className="custom-selectcreateproductoitem redonderborinferiorderecho colorbase"
                                                name="tipotraccion"
                                                disabled={showTraccion}
                                                onChange={(e) =>
                                                    handleChangeTraccion(
                                                        e.target.value
                                                    )
                                                }>
                                                <option selected>
                                                    Tracción
                                                </option>
                                                {tipotraccion &&
                                                    tipotraccion.map(
                                                        (itemselect) => {
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
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </Row>
            ) : vehiculoNueveSelecc ? (
                <div>
                    <Row>
                        <Col xl={8} lg={8} md={8} xs={8}>
                            <div className="ps-form__input mostrarvehiculoseleccionado colorbase">
                                <div className="mtmenos10">
                                    {nombreCarroceriaVeh}&nbsp;
                                    {nombreMarcaVeh} &nbsp;
                                    {nombreAnnoVeh} &nbsp;
                                    {nombreModeloVeh} &nbsp;
                                    {nombreCilindrajesVeh} &nbsp;
                                    {nombreTransmisionVeh} &nbsp;
                                    {nombreCombustibleVeh} &nbsp;
                                    {nombreTraccionVeh}
                                </div>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input textoeditardatosvehiculo botonazul textocolorblanco ml-110">
                                <i
                                    onClick={() => editarDatosVehiculos()}
                                    class="ml-1 mt-1 fa fa-edit d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetedit}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
                            </div>

                            <Overlay
                                className=""
                                target={targetedit.current}
                                show={showEdit}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Editar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input textoeditardatosvehiculo botonazul textocolorblanco ml-95">
                                <i
                                    onClick={() => duplicarDatosVehiculos()}
                                    class="mt-1 fa fa-copy d-flex justify-content-center"
                                    aria-hidden="true"
                                    ref={targetcopy}
                                    onMouseOver={() => setShowCopy(true)}
                                    onMouseOut={() => setShowCopy(false)}></i>
                            </div>
                            <Overlay
                                target={targetcopy.current}
                                show={showCopy}
                                placement="top">
                                {(props) => (
                                    <Tooltip
                                        className="ubicartooltipproducto"
                                        id="overlay-example"
                                        {...props}>
                                        <h3 className="tamañotextotooltipproducto">
                                            {" "}
                                            Duplicar{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            ) : vehiculoNueveEditar ? (
                <Row>
                    <div className="ml-17">
                        <div>
                            <select
                                defaultValue={editarTipoVeh}
                                //disabled="disabled"
                                className="redonderbordescrearproducto custom-selectcreateproducto"
                                onChange={(e) => handleChange(e.target.value)}>
                                <option selected>Tipo de Vehículo</option>
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
                                        value={editarCarroceriaVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeCarroceria(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Carroceria</option>
                                        {carrocerias &&
                                            carrocerias.map(
                                                (itemselectcarroceria) => {
                                                    return (
                                                        <option
                                                            value={
                                                                itemselectcarroceria.value
                                                            }>
                                                            {
                                                                itemselectcarroceria.label
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
                                       value={editarMarcaVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeBrand(e.target.value)
                                        }>
                                        <option selected>Marca</option>
                                        {marcas &&
                                            marcas.map((itemselectmarcas) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselectmarcas.id
                                                        }>
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
                                        value={editarAnnoVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeAnno(e.target.value)
                                        }>
                                        <option selected>Año</option>
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
                                        value={editarModeloVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeModels(e.target.value)
                                        }>
                                        <option selected>Modelo</option>
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
                                        value={editarCilindrajesVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeVersionMotor(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Cilindraje</option>
                                        {cilindrajes &&
                                            cilindrajes.map(
                                                (itemcilindraje) => {
                                                    return (
                                                        <option
                                                            value={
                                                                itemcilindraje.value
                                                            }>
                                                            {
                                                                itemcilindraje.label
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
                                        value={editarTransmisionVeh}
                                        disabled={showTransmision}
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeTransmision(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Transmisión</option>
                                        {transmision &&
                                            transmision.map((itemselect) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselect.value
                                                        }>
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
                                        value={editarCombustibleVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem  redonderborinferiorizquierdo"
                                        onChange={(e) =>
                                            handleChangeCombustible(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Combustible</option>
                                        {combustible &&
                                            combustible.map((itemselect) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselect.value
                                                        }>
                                                        {itemselect.label}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1  mlmenos21">
                                    <select
                                        value={editarTraccionVeh}
                                        className="custom-selectcreateproductoitem redonderborinferiorderecho"
                                        name="tipotraccion"
                                        disabled={showTraccion}
                                        onChange={(e) =>
                                            handleChangeTraccion(e.target.value)
                                        }>
                                        <option selected>Tracción</option>
                                        {tipotraccion &&
                                            tipotraccion.map((itemselect) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselect.value
                                                        }>
                                                        {itemselect.label}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div
                        className="ps-form__input mt-3 botonagregarotrovehiculo  ml-17"
                        onClick={() => guardarDatosVehiculos()}>
                        {<h3>Guardar cambios</h3>}
                    </div>
                </Row>
            ) : vehiculoNueveDuplicar ? (
                <Row>
                    <div>
                        <div>
                            <select
                                value={tipoVeh}
                                //disabled="disabled"
                                className="redonderbordescrearproducto custom-selectcreateproducto"
                                onChange={(e) =>
                                    handleChange(e.target.value)
                                }>
                                <option selected>Tipo de Vehículo</option>
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
                                        value={carroceriaVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeCarroceria(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Carroceria</option>
                                        {carrocerias &&
                                            carrocerias.map(
                                                (itemselectcarroceria) => {
                                                    return (
                                                        <option
                                                            value={
                                                                itemselectcarroceria.value
                                                            }>
                                                            {
                                                                itemselectcarroceria.label
                                                            }
                                                        </option>
                                                    );
                                                }
                                            )}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos17">
                                    <select
                                        value={marcaVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeBrand(e.target.value)
                                        }>
                                        <option selected>Marca</option>
                                        {marcas &&
                                            marcas.map((itemselectmarcas) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselectmarcas.id
                                                        }>
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
                                        value={annoVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeAnno(e.target.value)
                                        }>
                                        <option selected>Año</option>
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
                                <div className="mt-1 mlmenos17">
                                    <select
                                        value={modeloVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeModels(e.target.value)
                                        }>
                                        <option selected>Modelo</option>
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
                                        value={cilindrajesVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeVersionMotor(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Cilindraje</option>
                                        {cilindrajes &&
                                            cilindrajes.map(
                                                (itemcilindraje) => {
                                                    return (
                                                        <option
                                                            value={
                                                                itemcilindraje.value
                                                            }>
                                                            {
                                                                itemcilindraje.label
                                                            }
                                                        </option>
                                                    );
                                                }
                                            )}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos17">
                                    <select
                                        value={transmisionVeh}
                                        disabled={showTransmision}
                                        className="custom-selectcreateproductoitem"
                                        onChange={(e) =>
                                            handleChangeTransmision(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Transmisión</option>
                                        {transmision &&
                                            transmision.map((itemselect) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselect.value
                                                        }>
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
                                        value={combustibleVeh}
                                        //disabled="disabled"
                                        className="custom-selectcreateproductoitem  redonderborinferiorizquierdo"
                                        onChange={(e) =>
                                            handleChangeCombustible(
                                                e.target.value
                                            )
                                        }>
                                        <option selected>Combustible</option>
                                        {combustible &&
                                            combustible.map((itemselect) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselect.value
                                                        }>
                                                        {itemselect.label}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1  mlmenos17">
                                    <select
                                        value={traccionVeh}
                                        className="custom-selectcreateproductoitem redonderborinferiorderecho"
                                        name="tipotraccion"
                                        disabled={showTraccion}
                                        onChange={(e) =>
                                            handleChangeTraccion(e.target.value)
                                        }>
                                        <option selected>Tracción</option>
                                        {tipotraccion &&
                                            tipotraccion.map((itemselect) => {
                                                return (
                                                    <option
                                                        value={
                                                            itemselect.value
                                                        }>
                                                        {itemselect.label}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div
                        className="ps-form__input mt-3 botonagregarotrovehiculo"
                        onClick={() => guardarDatosVehiculos()}>
                        {<h3>Guardar cambios</h3>}
                    </div>
                </Row>
            ) : vehiculoNueveUbicar ? (
                <div>
                    {console.log(
                        "DATOS NUEVE : ",
                        nombreCarroceriaVeh,
                        nombreMarcaVeh,
                        nombreAnnoVeh,
                        nombreModeloVeh,
                        nombreCilindrajesVeh,
                        nombreTransmisionVeh,
                        nombreCombustibleVeh,
                        nombreTraccionVeh
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default DatosVehiculosNueve;