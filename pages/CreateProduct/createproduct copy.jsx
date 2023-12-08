import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Row,
    Col,
    Card,
    Tooltip,
    Overlay,
    Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import img from "../../public/imagesupload/uploadimage.png";
import eliminar from "../../public/imagesupload/eliminar.png";
import InfoIcon from "@material-ui/icons/Info";
import ModalMensajes from "../mensajes/ModalMensajes";
import RegistrarFotos from "./RegistrarFotos";
import shortid from "shortid";
EditarVehiculos;
import axios from "axios";

// Componentes Crear Producto
import DatosLatoneria from "./DatosLatoneria";
import DatosVehiculos from "./DatosVehiculos";

// Componente mostrar vehículos temporales asociados a productos
import MostrarVehiculos from "./MostrarVehiculos";
import EditarVehiculos from "./EditarVehiculos";
import DuplicarVehiculos from "./DuplicarVehiculos";

import CategoriasProductosGenericos from "./CategoriasProductosGenericos";
import ModalInformacionGenericos from "./ModalInformacionGenericos";
import ModalInformacionPorUnoVarios from "./ModalInformacionPorUnoVarios";
import { set } from "lodash";

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const CreateProduct = () => {
    const targetshow = useRef(null);
    const [idVehiculosProducto, setIdvehiculosProducto] = useState(0);

    const [tipoVeh, setTipoVeh] = useState(null);

    const [showEdit, setShowEdit] = useState(false);
    const [agregarDatos, setAgregarDatos] = useState(false);
    const [eliminoDatos, setEliminoDatos] = useState(false);
    const [mostrarBotonDatosMotor, setMostrarBotonDatosMotor] = useState(false);
    const [agregarVehiculo, setAgregarVehiculo] = useState(false);
    const [showModalDatosProducto, setShowModalDatosProducto] = useState(false);
    const [abrirCerrarCategoriasGenerico, setAbrirCerrarCategoriasGenerico] =
        useState(true);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [controlDuplicar, setControlDuplicar] = useState([]);

    const [controlAgregarVehiculo, setControlAgregarVehiculo] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [tamaño, setTamaño] = useState("col-12 col-md-6 ml-200");
    const [cerrarDatos, setCerrarDatos] = useState(
        "ps-form__group cajavehiculoscompatiblesproducto colorbase"
    );
    const [cerrarDatosDos, setCerrarDatosDos] = useState(
        "custom-selectidentificavehiculo redondearbordegenerico colorbase"
    );
    const [iconoCerrarUno, setIconCerrarUno] = useState(
        "ml-40 showcerrarabrir"
    );
    const [iconoCerrarDos, setIconCerrarDos] = useState(
        "form-control ps-form__input"
    );

    const [showIconoCerrarAbrir, setShowIconoCerrarAbrir] = useState(false);

    const [genericoUno, setGenericoUno] = useState("Si");
    const [labelGenericoUno, setLabelGenericoUno] = useState(
        "Si - Es compatible con diferentes marcas y modelos de Vehículos."
    );

    const [genericoDos, setGenericoDos] = useState("No");
    const [labelGenericoDos, setLabelGenericoDos] = useState(
        "No - No es compatible con varias marcas y modelos de Vehículos."
    );

    const [botonGenerico, setBotonGenerico] = useState("botongenerico");

    const [showCreateProduct, setCreateProduct] = useState(true);
    //AQUI
    const [showModalLatoneria, setShowModalLatoneria] = useState(true);
    const [showModalLatoneriaActiva, setShowModalLatoneriaActiva] =
        useState(true);

        //HASTA AQUI
    const [showDatosProductos, setShowDatosProductos] = useState(false);
    const [showDatosProductosActiva, setShowDatosProductosActiva] =
        useState(false);

    const [showDatosProductosAdicionales, setShowDatosProductosAdicionales] =
        useState(false);
    const [showIngresoFotos, setShowIngresoFotos] = useState(false);

    const [pageAcount, setPageAcount] = useState("ps-page__content ps-account");

    const [mostrarDatosVehiculos, setMostrarDatosVehiculos] = useState(false);

    const [contador, setContador] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState([]);
    const [vehiculoBorrar, setVehiculoBorrar] = useState(false);

    const [tipoVehiculoSeleccionado, settipoVehiculoSeleccionado] =
        useState(null);

    const [tipoVehUno, setTipoVehUno] = useState(0);
    const [carroceriaVehUno, setCarroceriaVehUno] = useState(0);
    const [marcaVehUno, setMarcaVehUno] = useState(0);
    const [annoVehUno, setAnnoVehUno] = useState(0);
    const [modeloVehUno, setModeloVehUno] = useState(0);
    const [cilindrajeVehUno, setcilindrajeVehUno] = useState(0);
    const [transmisionVehUno, settransmisionVehUno] = useState(0);
    const [combustibleVehUno, setcombustibleVehUno] = useState(0);
    const [traccionVehUno, settraccionVehUno] = useState(0);

    const [vehiculoUno, setVehiculoUno] = useState(false); // Esta variable habilita la creacion de vehículos

    const [tipoVehSelec, setTipoVehSelec] = useState(0);
    const [carroceriaVehSelec, setCarroceriaVehSelec] = useState(0);
    const [marcaVehSelec, setMarcaVehSelec] = useState(0);
    const [annoVehSelec, setAnnoVehSelec] = useState(0);
    const [modeloVehSelec, setModeloVehSelec] = useState(0);
    const [cilindrajeVehSelec, setCilindrajeVehSelec] = useState(0);
    const [transmisionVehSelec, setTransmisionVehSelec] = useState(0);
    const [combustibleVehSelec, setCombustibleVehSelec] = useState(0);
    const [traccionVehSelec, setTraccionVehSelec] = useState(0);

    const [controlAccion, setControlAccion] = useState(0);
    const [controlAgregaNuevo, setControlAgregaNuevo] = useState(false);
    const [generico, setGenerico] = useState("No");
    const [compatibilidad, setCompatibilidad] = useState(null);
    const [duplicar, setDuplicar] = useState(false);
    const [nuevoVehiculo, setNuevoVehiculo] = useState(false);

    const [showTraccion, setShowTraccion] = useState(false);
    const [showTransmision, setShowTransmision] = useState(false);
    const [showModalGenerico, setShowModalGenerico] = useState(false);
    const [showModalParaUnoVarios, setShowModalParaUnoVarios] = useState(false);

    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );

    const [listModelosVehiculos, setListModelosVehiculos] = useState([]);
    const [listCilindrajesVehiculos, setListCilindrajesVehiculos] = useState(
        []
    );

    const [vehiculoUnoCrear, setVehiculoUnoCrear] = useState(false);
    const [vehiculoUnoSelecc, setVehiculoUnoSelecc] = useState(false);
    const [vehiculoUnoEditar, setVehiculoUnoEditar] = useState(false);
    const [vehiculoUnoDuplicar, setVehiculoUnoDuplicar] = useState(false);
    const [vehiculoUnoUbicar, setVehiculoUnoUbicar] = useState(false);

    const [botonCrearVehiculo, setbotonCrearVehiculo] = useState(false);

    const [seleccionoTipoVeh, setSeleccionoTipoVeh] = useState(false);
    const [seleccionoUbicacionProducto, setSeleccionoUbicacionProducto] =
        useState(false);
    const [SelecDatosProducto, setSelecDatosProducto] = useState(false);
    const [categoria, setCategoria] = useState(null);
    const [selecCategoria, setSelecCategoria] = useState("No");
    const [quantity, setQuantity] = useState(0);
    const [tituloInformacionProducto, setTituloInformacionProducto] = useState(
        "ml-15 mb-3 tituloadvertenciaproductosizquierda"
    );
    const [descripcionNuevoVehiculo, setDescripcionNuevoVehiculo] = useState(
        "¿Su producto es genérico?"
    );

    const leetipoveh = useSelector(
        (state) => state.typesvehicles.typesvehicles
    );

    const [arrayVehiculosTemporal, setArrayVehiculosTemporal] = useState([]);
    const [numeroVehiculosAgregados, setNumeroVehiculosAgregados] = useState(0);
    const [idProducto, setIdProducto] = useState(0);
    const [codigoProducto, setcodigoProducto] = useState(0);
    const [editarProducto, setEditarProducto] = useState(false);
    const [duplicarProducto, setDuplicarProducto] = useState(false);
    const [borrarProducto, setBorrarProducto] = useState(false);
    const [arraySelectEdit, setArraySelectEdit] = useState([]);
    const [listadoCarrocerias, setListadoCarrocerias] = useState([]);
    const [listadoMarcas, setListadoMarcas] = useState([]);
    const [listadoModelos, setListadoModelos] = useState([]);
    const [listadoCilindrajes, setListadoCilindrajes] = useState([]);

    const [controlNuevo, setControlNuevo] = useState(false);
    const [controlAgregar, setControlAgregar] = useState(false);

    const [marcarItem, setMarcarItem] = useState(null);
    const [marcarItemDuplicar, setMarcarItemDuplicar] = useState(null);
    const [marcaNoExiste, setMarcaNoExiste] = useState(false);

    const [marcaCodigo, setMarcaCodigo] = useState(0);
    const [modeloCodigo, setModeloCodigo] = useState(0);
    const [cilindrajeCodigo, setCilindrajeCodigo] = useState(0);

    const datosgenerales = useSelector(
        (state) => state.datosgenerales.datosgenerales
    );

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState(
        datosgenerales.vgl_tiposvehiculos
    );

    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);

    // Arreglo carrocerias de Vehiculos
    const datoscarrocerias = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_carroceriasvehiculos
    );

    useEffect(() => {
        setListMarcasVehiculos(datosgenerales.vgl_marcasvehiculos);
        setListCarroceriasVehiculos(datosgenerales.vgl_carroceriasvehiculos);
        setListModelosVehiculos(datosgenerales.vgl_modelosvehiculos);
        setListCilindrajesVehiculos(datosgenerales.vgl_cilindrajesvehiculos);
        setAnnos(datosgenerales.vgl_annosvehiculos);
        //setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        //setLoading(false)
    }, []);

    useEffect(() => {
        const creaVehiculoTemporal = async () => {
            const params = {
                codigo: idVehiculosProducto,
            };

            console.log("ID TEM : ", idVehiculosProducto);

            await axios({
                method: "post",
                url: "https://gimcloud.com.co/mrp/api/33",
                params,
            })
                .then((res) => {
                    setArrayVehiculosTemporal(res.data);

                    if (res.data.length > 0) {
                        console.log(" ARRAY ID : ", arrayVehiculosTemporal);
                        if (arraySelectEdit.length > 0) {
                            let newDet = [];
                            datoscarrocerias &&
                                datoscarrocerias.forEach((row) => {
                                    if (
                                        Number.parseInt(row.tipovehiculo) ===
                                        Number.parseInt(
                                            arraySelectEdit[0].tipovehiculo
                                        )
                                    ) {
                                        let item = {
                                            id: row.id,
                                            carroceria: row.carroceria,
                                            tipoVeh: row.tipovehiculo,
                                            estado: row.estado,
                                            value: row.id,
                                            label: row.carroceria,
                                            text: row.carroceria,
                                        };
                                        newDet.push(item);
                                    }
                                });
                            setListadoCarrocerias(newDet);
                            console.log("CARROS ARRAY EDIT : ", newDet);

                            if (
                                arraySelectEdit[0].marca > 299999 ||
                                arraySelectEdit[0].modelo > 299999 ||
                                arraySelectEdit[0].cilindraje > 299999
                            ) {
                                setMarcaNoExiste(true);
                            }

                            setTipoVeh(arraySelectEdit[0].tipovehiculo);
                            setTipoVehUno(arraySelectEdit[0].tipovehiculo);
                            setCarroceriaVehUno(arraySelectEdit[0].carroceria);
                            setMarcaVehUno(arraySelectEdit[0].marca);
                            setAnnoVehUno(arraySelectEdit[0].anno);
                            setModeloVehUno(arraySelectEdit[0].modelo);
                            setcilindrajeVehUno(arraySelectEdit[0].cilindraje);
                            settransmisionVehUno(
                                arraySelectEdit[0].transmision
                            );
                            setcombustibleVehUno(
                                arraySelectEdit[0].combustible
                            );
                            settraccionVehUno(arraySelectEdit[0].traccion);
                            setTipoVehSelec(arraySelectEdit[0].selecttipo);
                            setCarroceriaVehSelec(
                                arraySelectEdit[0].selectcarroceria
                            );
                            setMarcaVehSelec(arraySelectEdit[0].selectmarca);
                            setAnnoVehSelec(arraySelectEdit[0].selectanno);
                            setModeloVehSelec(arraySelectEdit[0].selectmodelo);
                            setCilindrajeVehSelec(
                                arraySelectEdit[0].selectcilindraje
                            );
                            setTransmisionVehSelec(
                                arraySelectEdit[0].selecttransmision
                            );
                            setCombustibleVehSelec(
                                arraySelectEdit[0].selectcombustible
                            );
                            setTraccionVehSelec(
                                arraySelectEdit[0].selecttraccion
                            );
                        } else if (arrayVehiculosTemporal.length > 0) {
                            console.log(
                                " TEMPORAL XX : ",
                                arrayVehiculosTemporal
                            );
                            console.log(" CARROCERIAS XX : ", datoscarrocerias);

                            let newDet = [];
                            datoscarrocerias &&
                                datoscarrocerias.forEach((row) => {
                                    if (
                                        Number.parseInt(row.tipovehiculo) ===
                                        Number.parseInt(
                                            arrayVehiculosTemporal[0]
                                                .tipovehiculo
                                        )
                                    ) {
                                        let item = {
                                            id: row.id,
                                            carroceria: row.carroceria,
                                            tipoVeh: row.tipovehiculo,
                                            estado: row.estado,
                                            value: row.id,
                                            label: row.carroceria,
                                            text: row.carroceria,
                                        };
                                        newDet.push(item);
                                    }
                                });
                            setListadoCarrocerias(newDet);
                            console.log("CARROCERIAS : ", newDet);

                            setTipoVeh(arrayVehiculosTemporal[0].tipovehiculo);
                            setTipoVehUno(
                                arrayVehiculosTemporal[0].tipovehiculo
                            );
                            setCarroceriaVehUno(
                                arrayVehiculosTemporal[0].carroceria
                            );
                            setMarcaVehUno(arrayVehiculosTemporal[0].marca);
                            setAnnoVehUno(arrayVehiculosTemporal[0].anno);
                            setModeloVehUno(arrayVehiculosTemporal[0].modelo);
                            setcilindrajeVehUno(
                                arrayVehiculosTemporal[0].cilindraje
                            );
                            settransmisionVehUno(
                                arrayVehiculosTemporal[0].transmision
                            );
                            setcombustibleVehUno(
                                arrayVehiculosTemporal[0].combustible
                            );
                            settraccionVehUno(
                                arrayVehiculosTemporal[0].traccion
                            );
                            setTipoVehSelec(
                                arrayVehiculosTemporal[0].selecttipo
                            );
                            setCarroceriaVehSelec(
                                arrayVehiculosTemporal[0].selectcarroceria
                            );
                            setMarcaVehSelec(
                                arrayVehiculosTemporal[0].selectmarca
                            );
                            setAnnoVehSelec(
                                arrayVehiculosTemporal[0].selectanno
                            );
                            setModeloVehSelec(
                                arrayVehiculosTemporal[0].selectmodelo
                            );
                            setCilindrajeVehSelec(
                                arrayVehiculosTemporal[0].selectcilindraje
                            );
                            setTransmisionVehSelec(
                                arrayVehiculosTemporal[0].selecttransmision
                            );
                            setCombustibleVehSelec(
                                arrayVehiculosTemporal[0].selectcombustible
                            );
                            setTraccionVehSelec(
                                arrayVehiculosTemporal[0].selecttraccion
                            );

                            if (
                                arraySelectEdit[0].marca > 299999 ||
                                arraySelectEdit[0].modelo > 299999 ||
                                arraySelectEdit[0].cilindraje > 299999
                            ) {
                                setMarcaNoExiste(true);
                            }
                        }
                        setNumeroVehiculosAgregados(res.data.length);
                    } else {
                        //setListadoCarrocerias(datoscarrocerias);
                        setNumeroVehiculosAgregados(0);
                    }
                    setBorrarProducto(false);
                })
                .catch(function (error) {
                    console.log("Lee Productos Temporal Error: ");

                    if (listadoCarrocerias.length > 0) {
                        let newDet = [];
                        datoscarrocerias &&
                            datoscarrocerias.forEach((row) => {
                                if (
                                    Number.parseInt(row.tipovehiculo) ===
                                    Number.parseInt(
                                        arrayVehiculosTemporal[0].tipovehiculo
                                    )
                                ) {
                                    let item = {
                                        id: row.id,
                                        carroceria: row.carroceria,
                                        tipoVeh: row.tipovehiculo,
                                        estado: row.estado,
                                        value: row.id,
                                        label: row.carroceria,
                                        text: row.carroceria,
                                    };
                                    newDet.push(item);
                                }
                            });
                        setListadoCarrocerias(newDet);
                        //console.log("ARRAY CAROCERIA : ", newDet);
                    }
                });
        };
        creaVehiculoTemporal();
    }, [
        idVehiculosProducto,
        vehiculoUnoCrear,
        editarProducto,
        duplicarProducto,
        borrarProducto,
    ]);

    useEffect(() => {
        if (selecCategoria == "No" && contador == 0) {
            let dato = [];
            localStorage.setItem("informacionproducto", JSON.stringify(dato));
            localStorage.setItem(
                "datospublicacionproducto",
                JSON.stringify(dato)
            );
        }
    }, []);

    const productogenerico = [
        {
            label: "Seleccione tipo de producto",
            value: "",
        },
        {
            label: labelGenericoUno,
            value: genericoUno,
        },
        {
            label: labelGenericoDos,
            value: genericoDos,
        },
    ];

    useEffect(() => {
        if (agregarDatos) {
            setVehiculoUno(true);
        }
    }, [agregarDatos]);

    const datosCrearProducto = () => {
        //console.log("CONTADOR : ", contador);
        let nombre = " Un ";
    };

    const habilitarBotonTipo = () => {
        let idveh = shortid();
        setIdvehiculosProducto(idveh);

        if (contador > 0 || selecCategoria == "Si") location.reload();
        else {
            setbotonCrearVehiculo(true);
            setSelecCategoria("No");
            handleChangeGenerico("No");
            setShowDatosProductos(false);
        }
    };

    const handleChangeGenerico = (selectedOptions) => {
        setAbrirCerrarCategoriasGenerico(true);
        if (selectedOptions == "No") {
            setCompatibilidad(2);
        } else if (selectedOptions == "Si") {
            setCompatibilidad(1);
        }

        if (selectedOptions === "Si") {
            setAgregarDatos(false);
            setAgregarVehiculo(false);
            setSelecCategoria("Si");
            const newDetUno = [];
            const newDetDos = [];
            let itemUno = {
                tipoVehUno: 0,
                marcaVehUno: 0,
                annoVehUno: 0,
                modeloVehUno: 0,
                cilindrajeVehUno: 0,
                carroceriaVehUno: 0,
                transmisionVehUno: 0,
                combustibleVehUno: 0,
                traccionVehUno: 0,
            };
            newDetUno.push(itemUno);

            localStorage.setItem(
                "vehiculoscompatibles",
                JSON.stringify(newDetUno)
            );

            let itemDos = {
                ubicacionProducto: 0,
                posicionProducto: 0,
            };
            newDetDos.push(itemDos);
            //setSistemaMotorSeleccionado(1);
            localStorage.setItem(
                "ubicacionposicionproducto",
                JSON.stringify(newDetDos)
            );
        }

        let control = contador + 1;
        if (control === 1) {
            setContador(control);

            if (control === 1) {
                setVehiculoUnoCrear(true);
                setVehiculoUno(true);
            }
        }
        setGenerico(selectedOptions);
        setMostrarDatosVehiculos(true);
    };

    const agregarDatosVehiculos = () => {
        if (editarProducto || duplicarProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, no puedes agregar vehículo!");
            return;
        } else if (vehiculoUno && controlAgregar) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, estas en agregar vehículo");
            return;
        } else if (numeroVehiculosAgregados < 10) {
            setVehiculoUnoCrear(true);
            setControlAgregar(true);
            setControlNuevo(false);
            setNuevoVehiculo(false);
            setVehiculoUno(true);
        } else {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Número de vehículos no puede ser mayor a 10!");
            return;
        }
    };

    const crearVehiculos = () => {
        if (editarProducto || duplicarProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, no puedes crear vehículo");
            return;
        } else if (vehiculoUno && controlNuevo) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, estas en crear nuevo vehículo");
            return;
        } else if (numeroVehiculosAgregados < 10) {
            setVehiculoUnoCrear(true);
            setControlAgregar(false);
            setControlNuevo(true);
            setNuevoVehiculo(true);
            setVehiculoUno(true);
            setDescripcionNuevoVehiculo(
                "¿Su producto es genérico? - Estas creando un nuevo vehículo"
            );
        } else {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Número de vehículos no puede ser mayor a 10!");
            return;
        }
    };

    const agregarDatosLatoneria = () => {
        if (duplicarProducto || editarProducto || vehiculoUno) {
            setShowModalMensajes(true);
            setTituloMensajes("Vehículos compatibles");
            setTextoMensajes(
                "Para continuar debes cerrar todos los formularios de vehículos compatibles."
            );
            return;
        }

        setShowIconoCerrarAbrir(true);
        setAgregarVehiculo(false);
        setbotonCrearVehiculo(false);

        //setCerrarDatos("");
        setCerrarDatosDos("mt-1 datoscerrados");
        setIconCerrarUno("showcerrarabrir");
        setIconCerrarDos("form-control ps-form__input ml-20");
        setGenericoUno("Si");
        setLabelGenericoUno("Es genérico, sirve para varios vehículos.");
        setGenericoDos("No");
        setLabelGenericoDos("No es genérico, sirve para varios vehículos.");
        setBotonGenerico("ml-15 botongenericodos");
        setMostrar(true);

        setShowModalLatoneria(true);
        setShowModalLatoneriaActiva(true);
    };

    const agregarDatosGenerico = () => {
        setGenerico("No");
        setVehiculoUno(false);
        setContador(0);
        setCompatibilidad(null);
        setAgregarVehiculo(false);
        setShowModalLatoneria(false);
        setShowModalLatoneriaActiva(false);
    };

    const mostrarVehiculos = () => {
        setAgregarVehiculo(true);
        setShowIconoCerrarAbrir(false);
        setShowModalLatoneria(true);

        setCerrarDatos(
            "ps-form__group cajavehiculoscompatiblesproducto colorbase"
        );
        setCerrarDatosDos(
            "custom-selectcreateproducto redondearbordegenerico colorbase"
        );

        setIconCerrarUno(
            "form-control ps-form__input textoeditardatosvehiculo colorbase"
        );
        setIconCerrarDos("form-control ps-form__input");

        setGenericoUno("Si");
        setLabelGenericoUno(
            "Si - Es compatible con diferentes marcas y modelos del vehículos."
        );
        setGenericoDos("No");
        setLabelGenericoDos(
            "No - NO es compatible con varias marcas y modelos de vehículos."
        );

        setBotonGenerico("botongenerico");
        setMostrar(false);
    };

    const ingresarDatosProductos = () => {
        setShowDatosProductos(true);
        setSelecDatosProducto(true);
        setShowModalDatosProducto(true);
    };

    //setMostrarDatosMotor(true);
    return (
        <Container title="Mi Cuenta">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <div className="tamañospinner">{loading ? <Loading /> : null}</div>

            {/* <div className="ps-page ps-page--inner ml-250">  */}
            <div className="mlmenos60 mt-40">
                <div className="container">
                    <Row className="mt-5">
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <h2 className="titulocrearproducto">Crear Producto</h2>
                        </Col>

                        <Col xl={9} lg={9} md={9} xs={9}>
                            <div className="cajaadvertenciavehiculoscompatiblesproducto">
                                <i
                                    className="ml-710 fa iconoadvertenciacrearproducto fa-exclamation-triangle"
                                    aria-hidden="true"></i>
                                <h3 className="ml-2 tituloadvertenciaproductos mtmenos30">
                                    Antes de empezar, debes saber que!
                                </h3>

                                <br />
                                <h3 className="ml-2 textoadvertenciaproductos">
                                    Para poder publicar un producto debes:
                                    <br />
                                    Agregar al menos una foto.
                                    <br />
                                    Completar tus datos personales. *Si eres
                                    persona jurídica debes subir los documentos
                                    requeridos (Certificado de Cámara de
                                    comercio, RUT, Cedula de ciudadanía
                                    Representante legal).
                                </h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="ps-page__header"></div>
                    <div className={pageAcount}>
                        <div className="row">
                            <div className={tamaño}>
                                <div className="ps-form--review">
                                    {showCreateProduct ? (
                                        <div>
                                            <div className={cerrarDatos}>
                                                {generico === "No" ? (
                                                    <div className="ml-10 mb-4">
                                                        <br />
                                                        <br />
                                                        <h3 className="tituloadvertenciaproductos mtmenos30">
                                                            Identificación de
                                                            los vehículos
                                                            compatibles
                                                        </h3>
                                                        <br />
                                                        <h3 className="tamañotextotoken">
                                                            {
                                                                descripcionNuevoVehiculo
                                                            }
                                                        </h3>
                                                        <Row>
                                                            {!compatibilidad ||
                                                            compatibilidad ==
                                                                1 ? (
                                                                <Row>
                                                                    <div>
                                                                        <Col
                                                                            xl={
                                                                                10
                                                                            }
                                                                            lg={
                                                                                10
                                                                            }
                                                                            md={
                                                                                10
                                                                            }
                                                                            xs={
                                                                                10
                                                                            }>
                                                                            <div
                                                                                disabled={
                                                                                    mostrar
                                                                                }
                                                                                className="botongenerico"
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    handleChangeGenerico(
                                                                                        "Si"
                                                                                    )
                                                                                }>
                                                                                {
                                                                                    labelGenericoUno
                                                                                }
                                                                            </div>
                                                                        </Col>
                                                                    </div>

                                                                    {showIconoCerrarAbrir ? (
                                                                        <Col
                                                                            xl={
                                                                                1
                                                                            }
                                                                            lg={
                                                                                1
                                                                            }
                                                                            md={
                                                                                1
                                                                            }
                                                                            xs={
                                                                                1
                                                                            }
                                                                            className="mlmenos80">
                                                                            <div
                                                                                className={
                                                                                    iconoCerrarUno
                                                                                }>
                                                                                <i
                                                                                    onClick={() =>
                                                                                        mostrarVehiculos()
                                                                                    }
                                                                                    className="colortextoselect mt-1 fa fa-angle-down d-flex justify-content-center"
                                                                                    aria-hidden="true"
                                                                                    ref={
                                                                                        targetshow
                                                                                    }
                                                                                    onMouseOver={() =>
                                                                                        setShowEdit(
                                                                                            true
                                                                                        )
                                                                                    }
                                                                                    onMouseOut={() =>
                                                                                        setShowEdit(
                                                                                            false
                                                                                        )
                                                                                    }></i>
                                                                            </div>
                                                                        </Col>
                                                                    ) : (
                                                                        <div className="mlmenos42">
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }>
                                                                                <div className="cajaiconoinfomaterial apuntador">
                                                                                    <div className="fondodivselecciontipoproducto">
                                                                                        <InfoIcon
                                                                                            onClick={() => {
                                                                                                setShowModalGenerico(
                                                                                                    !showModalGenerico
                                                                                                );
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: 30,
                                                                                            }}
                                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </div>
                                                                    )}
                                                                </Row>
                                                            ) : null}

                                                            {!compatibilidad ||
                                                            compatibilidad ==
                                                                2 ? (
                                                                <div>
                                                                    <Row>
                                                                        <Col
                                                                            xl={
                                                                                10
                                                                            }
                                                                            lg={
                                                                                10
                                                                            }
                                                                            md={
                                                                                10
                                                                            }
                                                                            xs={
                                                                                10
                                                                            }>
                                                                            <div
                                                                                disabled={
                                                                                    mostrar
                                                                                }
                                                                                className={
                                                                                    botonGenerico
                                                                                }
                                                                                variant="outline-light"
                                                                                onClick={() =>
                                                                                    habilitarBotonTipo()
                                                                                }>
                                                                                {
                                                                                    labelGenericoDos
                                                                                }
                                                                            </div>
                                                                        </Col>

                                                                        {showIconoCerrarAbrir ? (
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }
                                                                                className="mt-6 mlmenos78 apuntador">
                                                                                <div
                                                                                    className={
                                                                                        iconoCerrarUno
                                                                                    }>
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            mostrarVehiculos()
                                                                                        }
                                                                                        className="colortextoselect mt-1 fa fa-angle-down d-flex justify-content-center"
                                                                                        aria-hidden="true"
                                                                                        ref={
                                                                                            targetshow
                                                                                        }
                                                                                        onMouseOver={() =>
                                                                                            setShowEdit(
                                                                                                true
                                                                                            )
                                                                                        }
                                                                                        onMouseOut={() =>
                                                                                            setShowEdit(
                                                                                                false
                                                                                            )
                                                                                        }></i>
                                                                                </div>
                                                                                <Overlay
                                                                                    className=""
                                                                                    target={
                                                                                        targetshow.current
                                                                                    }
                                                                                    show={
                                                                                        showEdit
                                                                                    }
                                                                                    placement="top">
                                                                                    {(
                                                                                        props
                                                                                    ) => (
                                                                                        <Tooltip
                                                                                            id="overlay-example"
                                                                                            {...props}>
                                                                                            <h3 className="tamañotextotooltipproducto">
                                                                                                {" "}
                                                                                                Mostrar
                                                                                                Vehículos{" "}
                                                                                            </h3>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </Overlay>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }>
                                                                                <div className="cajaiconoinfomaterialdos apuntador">
                                                                                    <div className="fondodivselecciontipoproducto">
                                                                                        <InfoIcon
                                                                                            onClick={() => {
                                                                                                setShowModalGenerico(
                                                                                                    !showModalGenerico
                                                                                                );
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: 30,
                                                                                            }}
                                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                    </Row>
                                                                </div>
                                                            ) : null}
                                                        </Row>
                                                    </div>
                                                ) : null}
                                                {generico ? (
                                                    generico === "No" ? (
                                                        <div className="mtmenos4">
                                                            <div>
                                                                {arrayVehiculosTemporal.length >
                                                                0 ? (
                                                                    <MostrarVehiculos
                                                                        arrayVehiculosTemporal={
                                                                            arrayVehiculosTemporal
                                                                        }
                                                                        setIdProducto={
                                                                            setIdProducto
                                                                        }
                                                                        setcodigoProducto={
                                                                            setcodigoProducto
                                                                        }
                                                                        setEditarProducto={
                                                                            setEditarProducto
                                                                        }
                                                                        editarProducto={
                                                                            editarProducto
                                                                        }
                                                                        setVehiculoUno={
                                                                            setVehiculoUno
                                                                        }
                                                                        setArraySelectEdit={
                                                                            setArraySelectEdit
                                                                        }
                                                                        setListadoCarrocerias={
                                                                            setListadoCarrocerias
                                                                        }
                                                                        setListadoMarcas={
                                                                            setListadoMarcas
                                                                        }
                                                                        setListadoModelos={
                                                                            setListadoModelos
                                                                        }
                                                                        setListadoCilindrajes={
                                                                            setListadoCilindrajes
                                                                        }
                                                                        setDuplicarProducto={
                                                                            setDuplicarProducto
                                                                        }
                                                                        duplicarProducto={
                                                                            duplicarProducto
                                                                        }
                                                                        numeroVehiculosAgregados={
                                                                            arrayVehiculosTemporal.length
                                                                        }
                                                                        setBorrarProducto={
                                                                            setBorrarProducto
                                                                        }
                                                                        marcarItem={
                                                                            marcarItem
                                                                        }
                                                                        setMarcarItem={
                                                                            setMarcarItem
                                                                        }
                                                                        marcarItemDuplicar={
                                                                            marcarItemDuplicar
                                                                        }
                                                                        setMarcarItemDuplicar={
                                                                            setMarcarItemDuplicar
                                                                        }
                                                                        setMarcaCodigo={
                                                                            setMarcaCodigo
                                                                        }
                                                                        setModeloCodigo={
                                                                            setModeloCodigo
                                                                        }
                                                                        setCilindrajeCodigo={
                                                                            setCilindrajeCodigo
                                                                        }
                                                                        vehiculoUno={
                                                                            vehiculoUno
                                                                        }
                                                                        controlNuevo={
                                                                            controlNuevo
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </div>
                                                            {
                                                                <div>
                                                                    {vehiculoUno ? (
                                                                        <DatosVehiculos
                                                                            vehiculoUnoCrear={
                                                                                vehiculoUnoCrear
                                                                            }
                                                                            setVehiculoUnoCrear={
                                                                                setVehiculoUnoCrear
                                                                            }
                                                                            vehiculoUnoSelecc={
                                                                                vehiculoUnoSelecc
                                                                            }
                                                                            setVehiculoUnoSelecc={
                                                                                setVehiculoUnoSelecc
                                                                            }
                                                                            vehiculoUnoEditar={
                                                                                vehiculoUnoEditar
                                                                            }
                                                                            setVehiculoUnoEditar={
                                                                                setVehiculoUnoEditar
                                                                            }
                                                                            vehiculoUnoDuplicar={
                                                                                vehiculoUnoDuplicar
                                                                            }
                                                                            setVehiculoUnoDuplicar={
                                                                                setVehiculoUnoDuplicar
                                                                            }
                                                                            agregarVehiculo={
                                                                                agregarVehiculo
                                                                            }
                                                                            setAgregarVehiculo={
                                                                                setAgregarVehiculo
                                                                            }
                                                                            setAgregarDatos={
                                                                                setAgregarDatos
                                                                            }
                                                                            agregarDatos={
                                                                                agregarDatos
                                                                            }
                                                                            setEliminoDatos={
                                                                                setEliminoDatos
                                                                            }
                                                                            eliminoDatos={
                                                                                eliminoDatos
                                                                            }
                                                                            setDuplicar={
                                                                                setDuplicar
                                                                            }
                                                                            duplicar={
                                                                                duplicar
                                                                            }
                                                                            vehiculoUnoUbicar={
                                                                                vehiculoUnoUbicar
                                                                            }
                                                                            setVehiculoUnoUbicar={
                                                                                setVehiculoUnoUbicar
                                                                            }
                                                                            setTipoVehUno={
                                                                                setTipoVehUno
                                                                            }
                                                                            setMarcaVehUno={
                                                                                setMarcaVehUno
                                                                            }
                                                                            setAnnoVehUno={
                                                                                setAnnoVehUno
                                                                            }
                                                                            setModeloVehUno={
                                                                                setModeloVehUno
                                                                            }
                                                                            setCarroceriaVehUno={
                                                                                setCarroceriaVehUno
                                                                            }
                                                                            setcilindrajeVehUno={
                                                                                setcilindrajeVehUno
                                                                            }
                                                                            settransmisionVehUno={
                                                                                settransmisionVehUno
                                                                            }
                                                                            setcombustibleVehUno={
                                                                                setcombustibleVehUno
                                                                            }
                                                                            settraccionVehUno={
                                                                                settraccionVehUno
                                                                            }
                                                                            tipoVehUno={
                                                                                tipoVehUno
                                                                            }
                                                                            showTraccion={
                                                                                showTraccion
                                                                            }
                                                                            setShowTraccion={
                                                                                setShowTraccion
                                                                            }
                                                                            showTransmision={
                                                                                showTransmision
                                                                            }
                                                                            setShowTransmision={
                                                                                setShowTransmision
                                                                            }
                                                                            controlAgregarVehiculo={
                                                                                controlAgregarVehiculo
                                                                            }
                                                                            setControlAgregarVehiculo={
                                                                                setControlAgregarVehiculo
                                                                            }
                                                                            vehiculosSeleccionados={
                                                                                vehiculosSeleccionados
                                                                            }
                                                                            setVehiculosSeleccionados={
                                                                                setVehiculosSeleccionados
                                                                            }
                                                                            vehiculoBorrar={
                                                                                vehiculoBorrar
                                                                            }
                                                                            setVehiculoBorrar={
                                                                                setVehiculoBorrar
                                                                            }
                                                                            controlAccion={
                                                                                controlAccion
                                                                            }
                                                                            setControlAccion={
                                                                                setControlAccion
                                                                            }
                                                                            contador={
                                                                                contador
                                                                            }
                                                                            setContador={
                                                                                setContador
                                                                            }
                                                                            controlDuplicar={
                                                                                controlDuplicar
                                                                            }
                                                                            setControlDuplicar={
                                                                                setControlDuplicar
                                                                            }
                                                                            dataannos={
                                                                                annos
                                                                            }
                                                                            settipoVehiculoSeleccionado={
                                                                                settipoVehiculoSeleccionado
                                                                            }
                                                                            tipoVehiculoSeleccionado={
                                                                                tipoVehiculoSeleccionado
                                                                            }
                                                                            marcaVehUno={
                                                                                marcaVehUno
                                                                            }
                                                                            annoVehUno={
                                                                                annoVehUno
                                                                            }
                                                                            modeloVehUno={
                                                                                modeloVehUno
                                                                            }
                                                                            carroceriaVehUno={
                                                                                carroceriaVehUno
                                                                            }
                                                                            cilindrajeVehUno={
                                                                                cilindrajeVehUno
                                                                            }
                                                                            transmisionVehUno={
                                                                                transmisionVehUno
                                                                            }
                                                                            combustibleVehUno={
                                                                                combustibleVehUno
                                                                            }
                                                                            traccionVehUno={
                                                                                traccionVehUno
                                                                            }
                                                                            nuevoVehiculo={
                                                                                nuevoVehiculo
                                                                            }
                                                                            setNuevoVehiculo={
                                                                                setNuevoVehiculo
                                                                            }
                                                                            idVehiculosProducto={
                                                                                idVehiculosProducto
                                                                            }
                                                                            arrayVehiculosTemporal={
                                                                                arrayVehiculosTemporal
                                                                            }
                                                                            setTipoVeh={
                                                                                setTipoVeh
                                                                            }
                                                                            tipoVeh={
                                                                                tipoVeh
                                                                            }
                                                                            numeroVehiculosAgregados={
                                                                                arrayVehiculosTemporal.length
                                                                            }
                                                                            setVehiculoUno={
                                                                                setVehiculoUno
                                                                            }
                                                                            listadoCarrocerias={
                                                                                listadoCarrocerias
                                                                            }
                                                                            tipoVehSelec={
                                                                                tipoVehSelec
                                                                            }
                                                                            vehiculos={
                                                                                vehiculos
                                                                            }
                                                                        />
                                                                    ) : editarProducto ? (
                                                                        <EditarVehiculos
                                                                            setTipoVehUno={
                                                                                setTipoVehUno
                                                                            }
                                                                            setCarroceriaVehUno={
                                                                                setCarroceriaVehUno
                                                                            }
                                                                            setMarcaVehUno={
                                                                                setMarcaVehUno
                                                                            }
                                                                            setAnnoVehUno={
                                                                                setAnnoVehUno
                                                                            }
                                                                            setModeloVehUno={
                                                                                setModeloVehUno
                                                                            }
                                                                            setcilindrajeVehUno={
                                                                                setcilindrajeVehUno
                                                                            }
                                                                            settransmisionVehUno={
                                                                                settransmisionVehUno
                                                                            }
                                                                            setcombustibleVehUno={
                                                                                setcombustibleVehUno
                                                                            }
                                                                            settraccionVehUno={
                                                                                settraccionVehUno
                                                                            }
                                                                            tipoVehUno={
                                                                                tipoVehUno
                                                                            }
                                                                            carroceriaVehUno={
                                                                                carroceriaVehUno
                                                                            }
                                                                            marcaVehUno={
                                                                                marcaVehUno
                                                                            }
                                                                            annoVehUno={
                                                                                annoVehUno
                                                                            }
                                                                            modeloVehUno={
                                                                                modeloVehUno
                                                                            }
                                                                            cilindrajeVehUno={
                                                                                cilindrajeVehUno
                                                                            }
                                                                            transmisionVehUno={
                                                                                transmisionVehUno
                                                                            }
                                                                            combustibleVehUno={
                                                                                combustibleVehUno
                                                                            }
                                                                            traccionVehUno={
                                                                                traccionVehUno
                                                                            }
                                                                            setTipoVehSelec={
                                                                                setTipoVehSelec
                                                                            }
                                                                            setCarroceriaVehSelec={
                                                                                setCarroceriaVehSelec
                                                                            }
                                                                            setMarcaVehSelec={
                                                                                setMarcaVehSelec
                                                                            }
                                                                            setAnnoVehSelec={
                                                                                setAnnoVehSelec
                                                                            }
                                                                            setModeloVehSelec={
                                                                                setModeloVehSelec
                                                                            }
                                                                            setCilindrajeVehSelec={
                                                                                setCilindrajeVehSelec
                                                                            }
                                                                            setTransmisionVehSelec={
                                                                                setTransmisionVehSelec
                                                                            }
                                                                            setCombustibleVehSelec={
                                                                                setCombustibleVehSelec
                                                                            }
                                                                            setTraccionVehSelec={
                                                                                setTraccionVehSelec
                                                                            }
                                                                            tipoVehSelec={
                                                                                tipoVehSelec
                                                                            }
                                                                            carroceriaVehSelec={
                                                                                carroceriaVehSelec
                                                                            }
                                                                            marcaVehSelec={
                                                                                marcaVehSelec
                                                                            }
                                                                            annoVehSelec={
                                                                                annoVehSelec
                                                                            }
                                                                            modeloVehSelec={
                                                                                modeloVehSelec
                                                                            }
                                                                            cilindrajeVehSelec={
                                                                                cilindrajeVehSelec
                                                                            }
                                                                            transmisionVehSelec={
                                                                                transmisionVehSelec
                                                                            }
                                                                            combustibleVehSelec={
                                                                                combustibleVehSelec
                                                                            }
                                                                            traccionVehSelec={
                                                                                traccionVehSelec
                                                                            }
                                                                            vehiculoUnoEditar={
                                                                                vehiculoUnoEditar
                                                                            }
                                                                            setVehiculoUnoEditar={
                                                                                setVehiculoUnoEditar
                                                                            }
                                                                            setAgregarVehiculo={
                                                                                setAgregarVehiculo
                                                                            }
                                                                            vehiculoUnoUbicar={
                                                                                vehiculoUnoUbicar
                                                                            }
                                                                            showTraccion={
                                                                                showTraccion
                                                                            }
                                                                            setShowTraccion={
                                                                                setShowTraccion
                                                                            }
                                                                            showTransmision={
                                                                                showTransmision
                                                                            }
                                                                            setShowTransmision={
                                                                                setShowTransmision
                                                                            }
                                                                            setControlAgregarVehiculo={
                                                                                setControlAgregarVehiculo
                                                                            }
                                                                            nuevoVehiculo={
                                                                                nuevoVehiculo
                                                                            }
                                                                            setNuevoVehiculo={
                                                                                setNuevoVehiculo
                                                                            }
                                                                            idVehiculosProducto={
                                                                                idVehiculosProducto
                                                                            }
                                                                            arrayVehiculosTemporal={
                                                                                arrayVehiculosTemporal
                                                                            }
                                                                            setTipoVeh={
                                                                                setTipoVeh
                                                                            }
                                                                            tipoVeh={
                                                                                tipoVeh
                                                                            }
                                                                            arraySelectEdit={
                                                                                arraySelectEdit
                                                                            }
                                                                            setEditarProducto={
                                                                                setEditarProducto
                                                                            }
                                                                            listadoCarrocerias={
                                                                                listadoCarrocerias
                                                                            }
                                                                            listadoMarcas={
                                                                                listadoMarcas
                                                                            }
                                                                            listadoModelos={
                                                                                listadoModelos
                                                                            }
                                                                            listadoCilindrajes={
                                                                                listadoCilindrajes
                                                                            }
                                                                            marcarItem={
                                                                                marcarItem
                                                                            }
                                                                            setMarcarItem={
                                                                                setMarcarItem
                                                                            }
                                                                            marcaNoExiste={
                                                                                marcaNoExiste
                                                                            }
                                                                            setMarcaNoExiste={
                                                                                setMarcaNoExiste
                                                                            }
                                                                            modeloCodigo={
                                                                                modeloCodigo
                                                                            }
                                                                            cilindrajeCodigo={
                                                                                cilindrajeCodigo
                                                                            }
                                                                        />
                                                                    ) : duplicarProducto ? (
                                                                        <DuplicarVehiculos
                                                                            setVehiculoUnoDuplicar={
                                                                                setVehiculoUnoDuplicar
                                                                            }
                                                                            setAgregarVehiculo={
                                                                                setAgregarVehiculo
                                                                            }
                                                                            setEliminoDatos={
                                                                                setEliminoDatos
                                                                            }
                                                                            setDuplicar={
                                                                                setDuplicar
                                                                            }
                                                                            duplicar={
                                                                                duplicar
                                                                            }
                                                                            setTipoVehUno={
                                                                                setTipoVehUno
                                                                            }
                                                                            setCarroceriaVehUno={
                                                                                setCarroceriaVehUno
                                                                            }
                                                                            setMarcaVehUno={
                                                                                setMarcaVehUno
                                                                            }
                                                                            setAnnoVehUno={
                                                                                setAnnoVehUno
                                                                            }
                                                                            setModeloVehUno={
                                                                                setModeloVehUno
                                                                            }
                                                                            setcilindrajeVehUno={
                                                                                setcilindrajeVehUno
                                                                            }
                                                                            settransmisionVehUno={
                                                                                settransmisionVehUno
                                                                            }
                                                                            setcombustibleVehUno={
                                                                                setcombustibleVehUno
                                                                            }
                                                                            settraccionVehUno={
                                                                                settraccionVehUno
                                                                            }
                                                                            //SIGUE
                                                                            tipoVehUno={
                                                                                tipoVehUno
                                                                            }
                                                                            carroceriaVehUno={
                                                                                carroceriaVehUno
                                                                            }
                                                                            marcaVehUno={
                                                                                marcaVehUno
                                                                            }
                                                                            annoVehUno={
                                                                                annoVehUno
                                                                            }
                                                                            modeloVehUno={
                                                                                modeloVehUno
                                                                            }
                                                                            cilindrajeVehUno={
                                                                                cilindrajeVehUno
                                                                            }
                                                                            transmisionVehUno={
                                                                                transmisionVehUno
                                                                            }
                                                                            combustibleVehUno={
                                                                                combustibleVehUno
                                                                            }
                                                                            traccionVehUno={
                                                                                traccionVehUno
                                                                            }
                                                                            setTipoVehSelec={
                                                                                setTipoVehSelec
                                                                            }
                                                                            setCarroceriaVehSelec={
                                                                                setCarroceriaVehSelec
                                                                            }
                                                                            setMarcaVehSelec={
                                                                                setMarcaVehSelec
                                                                            }
                                                                            setAnnoVehSelec={
                                                                                setAnnoVehSelec
                                                                            }
                                                                            setModeloVehSelec={
                                                                                setModeloVehSelec
                                                                            }
                                                                            setCilindrajeVehSelec={
                                                                                setCilindrajeVehSelec
                                                                            }
                                                                            setTransmisionVehSelec={
                                                                                setTransmisionVehSelec
                                                                            }
                                                                            setCombustibleVehSelec={
                                                                                setCombustibleVehSelec
                                                                            }
                                                                            setTraccionVehSelec={
                                                                                setTraccionVehSelec
                                                                            }
                                                                            tipoVehSelec={
                                                                                tipoVehSelec
                                                                            }
                                                                            carroceriaVehSelec={
                                                                                carroceriaVehSelec
                                                                            }
                                                                            marcaVehSelec={
                                                                                marcaVehSelec
                                                                            }
                                                                            annoVehSelec={
                                                                                annoVehSelec
                                                                            }
                                                                            modeloVehSelec={
                                                                                modeloVehSelec
                                                                            }
                                                                            cilindrajeVehSelec={
                                                                                cilindrajeVehSelec
                                                                            }
                                                                            transmisionVehSelec={
                                                                                transmisionVehSelec
                                                                            }
                                                                            combustibleVehSelec={
                                                                                combustibleVehSelec
                                                                            }
                                                                            traccionVehSelec={
                                                                                traccionVehSelec
                                                                            }
                                                                            showTraccion={
                                                                                showTraccion
                                                                            }
                                                                            setShowTraccion={
                                                                                setShowTraccion
                                                                            }
                                                                            showTransmision={
                                                                                showTransmision
                                                                            }
                                                                            setShowTransmision={
                                                                                setShowTransmision
                                                                            }
                                                                            setControlAgregarVehiculo={
                                                                                setControlAgregarVehiculo
                                                                            }
                                                                            vehiculosSeleccionados={
                                                                                vehiculosSeleccionados
                                                                            }
                                                                            setVehiculosSeleccionados={
                                                                                setVehiculosSeleccionados
                                                                            }
                                                                            controlDuplicar={
                                                                                controlDuplicar
                                                                            }
                                                                            setControlDuplicar={
                                                                                setControlDuplicar
                                                                            }
                                                                            dataannos={
                                                                                annos
                                                                            }
                                                                            nuevoVehiculo={
                                                                                nuevoVehiculo
                                                                            }
                                                                            setNuevoVehiculo={
                                                                                setNuevoVehiculo
                                                                            }
                                                                            idVehiculosProducto={
                                                                                idVehiculosProducto
                                                                            }
                                                                            arrayVehiculosTemporal={
                                                                                arrayVehiculosTemporal
                                                                            }
                                                                            setTipoVeh={
                                                                                setTipoVeh
                                                                            }
                                                                            tipoVeh={
                                                                                tipoVeh
                                                                            }
                                                                            arraySelectEdit={
                                                                                arraySelectEdit
                                                                            }
                                                                            setEditarProducto={
                                                                                setEditarProducto
                                                                            }
                                                                            listadoCarrocerias={
                                                                                listadoCarrocerias
                                                                            }
                                                                            listadoMarcas={
                                                                                listadoMarcas
                                                                            }
                                                                            listadoModelos={
                                                                                listadoModelos
                                                                            }
                                                                            listadoCilindrajes={
                                                                                listadoCilindrajes
                                                                            }
                                                                            setDuplicarProducto={
                                                                                setDuplicarProducto
                                                                            }
                                                                            numeroVehiculosAgregados={
                                                                                arrayVehiculosTemporal.length
                                                                            }
                                                                            marcarItemDuplicar={
                                                                                marcarItemDuplicar
                                                                            }
                                                                            setMarcarItemDuplicar={
                                                                                setMarcarItemDuplicar
                                                                            }
                                                                            marcaNoExiste={
                                                                                marcaNoExiste
                                                                            }
                                                                            setMarcaNoExiste={
                                                                                setMarcaNoExiste
                                                                            }
                                                                        />
                                                                    ) : null}
                                                                </div>
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {
                                                                <div className="mt-25">
                                                                    <h3 className="ml-15 tituloadvertenciaproductos mtmenos30">
                                                                        Identificación
                                                                        de los
                                                                        vehículos
                                                                        compatibles
                                                                    </h3>
                                                                    <br />
                                                                    <Row>
                                                                        <Col
                                                                            xl={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            xs={
                                                                                6
                                                                            }>
                                                                            <div
                                                                                className="ml-15 mt-1 datoscerrados"
                                                                                disabled={
                                                                                    true
                                                                                }>
                                                                                <h3
                                                                                    className=" 
                                                                                    ml-16 textoubicacionproducto">
                                                                                    Es
                                                                                    genérico,
                                                                                    sirve
                                                                                    para
                                                                                    varios
                                                                                    vehículos.
                                                                                </h3>
                                                                            </div>
                                                                        </Col>
                                                                        <Col
                                                                            xl={
                                                                                1
                                                                            }
                                                                            lg={
                                                                                1
                                                                            }
                                                                            md={
                                                                                1
                                                                            }
                                                                            xs={
                                                                                1
                                                                            }
                                                                            className="ml-198 mtmenos2">
                                                                            <div className="showcerrarabrir">
                                                                                <i
                                                                                    className="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center apuntador"
                                                                                    onClick={
                                                                                        agregarDatosGenerico
                                                                                    }
                                                                                    aria-hidden="true"
                                                                                    ref={
                                                                                        targetshow
                                                                                    }
                                                                                    onMouseOver={() =>
                                                                                        setShowEdit(
                                                                                            true
                                                                                        )
                                                                                    }
                                                                                    onMouseOut={() =>
                                                                                        setShowEdit(
                                                                                            false
                                                                                        )
                                                                                    }></i>
                                                                            </div>

                                                                            <Overlay
                                                                                className=""
                                                                                target={
                                                                                    targetshow.current
                                                                                }
                                                                                show={
                                                                                    showEdit
                                                                                }
                                                                                placement="top">
                                                                                {(
                                                                                    props
                                                                                ) => (
                                                                                    <Tooltip
                                                                                        className="ubicartooltipgenerico"
                                                                                        id="overlay-example"
                                                                                        {...props}>
                                                                                        <h3>
                                                                                            {" "}
                                                                                            Tipo
                                                                                            de
                                                                                            producto{" "}
                                                                                        </h3>
                                                                                    </Tooltip>
                                                                                )}
                                                                            </Overlay>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                ) : null}

                                                {agregarVehiculo ? (
                                                    <div>
                                                        {
                                                            /*controlAgregarVehiculo ? (*/
                                                            <div className="ml-10">
                                                                <div
                                                                    className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                                    onClick={() =>
                                                                        agregarDatosVehiculos()
                                                                    }>
                                                                    {
                                                                        <h3>
                                                                            Click
                                                                            para
                                                                            agregar
                                                                            vehículo
                                                                        </h3>
                                                                    }
                                                                </div>
                                                                <div
                                                                    className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                                    onClick={() =>
                                                                        crearVehiculos()
                                                                    }>
                                                                    {
                                                                        <h3>
                                                                            ¿No
                                                                            encuentras
                                                                            tu
                                                                            vehículo?
                                                                            Créalo.
                                                                        </h3>
                                                                    }
                                                                </div>

                                                                <div
                                                                    className="ml-605 ps-btn redondearborde botonazul mt-15"
                                                                    onClick={() =>
                                                                        agregarDatosLatoneria()
                                                                    }>
                                                                    {
                                                                        <h3 className="textocolorblanco">
                                                                            Siguiente
                                                                        </h3>
                                                                    }
                                                                </div>
                                                            </div>
                                                            /*) : null*/
                                                        }
                                                    </div>
                                                ) : botonCrearVehiculo ? (
                                                    <div className="ml-10">
                                                        <div
                                                            className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                            onClick={() =>
                                                                agregarDatosVehiculos()
                                                            }>
                                                            {
                                                                <h3>
                                                                    Click para
                                                                    agregar
                                                                    vehículo
                                                                </h3>
                                                            }
                                                        </div>
                                                        <div
                                                            className="ps-form__input mt-3 botonagregarotrovehiculo"
                                                            onClick={() =>
                                                                crearVehiculos()
                                                            }>
                                                            {
                                                                <h3>
                                                                    ¿No
                                                                    encuentras
                                                                    tu vehículo?
                                                                    Créalo.
                                                                </h3>
                                                            }
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>

                                            {selecCategoria == "Si" ? (
                                                <div className="cajavehiculoscompatiblesproducto">
                                                    <CategoriasProductosGenericos
                                                        setShowDatosProductos={
                                                            setShowDatosProductos
                                                        }
                                                        showDatosProductos={
                                                            showDatosProductos
                                                        }
                                                        abrirCerrarCategoriasGenerico={
                                                            abrirCerrarCategoriasGenerico
                                                        }
                                                        setAbrirCerrarCategoriasGenerico={
                                                            setAbrirCerrarCategoriasGenerico
                                                        }
                                                        categoria={categoria}
                                                        setCategoria={
                                                            setCategoria
                                                        }
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div className="ps-form__group mtmenos20">
                                            <Row>
                                                <Col
                                                    xl={11}
                                                    lg={11}
                                                    md={11}
                                                    xs={11}>
                                                    <div className="form-control ps-form__input">
                                                        <select
                                                            //disabled="disabled"
                                                            className="custom-select ps-form__labelselect"
                                                            onChange={(e) =>
                                                                handleChangeGenerico(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }>
                                                            <option
                                                                selected
                                                                className="select-fontsize ps-form__label">
                                                                Producto es
                                                                Genérico
                                                            </option>
                                                            {productogenerico &&
                                                                productogenerico.map(
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
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    <div className="ps-form__submit">
                                        <div>
                                            {mostrarBotonDatosMotor ? (
                                                <p className="ps-form__text tamañotextocrearproducto">
                                                    Ahora vamos a identificar
                                                    las caracteristícas del
                                                    motor
                                                </p>
                                            ) : null}
                                        </div>
                                        <div>
                                            {mostrarBotonDatosMotor ? (
                                                <div
                                                    className="ps-btn"
                                                    onClick={
                                                        datosCrearProducto
                                                    }>
                                                    Click aquí
                                                </div>
                                            ) : seleccionoTipoVeh ? (
                                                <Row>
                                                    <Col
                                                        xl={4}
                                                        lg={4}
                                                        md={4}
                                                        sm={4}>
                                                        <div className="botonimagenesilustrativas mt-20">
                                                            <h3 className="textoimagenesilustrativas ">
                                                                Listo, ya
                                                                Seleccionaste el
                                                                tipo de
                                                                Vehículo!
                                                            </h3>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-140">
                            {showModalLatoneria ? (
                                <DatosLatoneria
                                    setShowModalLatoneria={
                                        setShowModalLatoneria
                                    }
                                    showModalLatoneria={showModalLatoneria}
                                    setShowModalLatoneriaActiva={
                                        setShowModalLatoneriaActiva
                                    }
                                    showModalLatoneriaActiva={
                                        showModalLatoneriaActiva
                                    }
                                    seleccionoUbicacionProducto={
                                        seleccionoUbicacionProducto
                                    }
                                    setSeleccionoUbicacionProducto={
                                        setSeleccionoUbicacionProducto
                                    }
                                    showModalDatosProducto={
                                        showModalDatosProducto
                                    }
                                    setShowModalDatosProducto={
                                        setShowModalDatosProducto
                                    }
                                    setShowDatosProductos={
                                        setShowDatosProductos
                                    }
                                    setSelecDatosProducto={
                                        setSelecDatosProducto
                                    }
                                    tipoVehUno={tipoVehUno}
                                />
                            ) : seleccionoUbicacionProducto ? (
                                <div className="ml-40">
                                    <Row className="mtmenos80">
                                        <Col xl={1} lg={1} md={1} sm={1}></Col>
                                        <Col xl={4} lg={4} md={4} sm={4}>
                                            <div className="botonimagenesilustrativas mt-100">
                                                <h3 className="textoimagenesilustrativas ">
                                                    OK, ya hemos ubicado tu
                                                    producto, Oprime continuar
                                                    para ingresar los datos
                                                    adicionales.
                                                </h3>
                                            </div>
                                        </Col>
                                    </Row>
                                    {!SelecDatosProducto ? (
                                        <Row>
                                            <Col
                                                xl={3}
                                                lg={3}
                                                md={3}
                                                sm={3}></Col>
                                            <Col xl={4} lg={4} md={4} sm={4}>
                                                <Button
                                                    className="ps-btn botonazul mt-20"
                                                    onClick={
                                                        ingresarDatosProductos
                                                    }>
                                                    Click para continuar
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        {showDatosProductos ? (
                            <DatosProductos
                                setShowDatosProductos={setShowDatosProductos}
                                showDatosProductos={showDatosProductos}
                                setShowDatosProductosActiva={
                                    setShowDatosProductosActiva
                                }
                                showDatosProductosActiva={
                                    showDatosProductosActiva
                                }
                                SelecDatosProducto={SelecDatosProducto}
                                setSelecDatosProducto={setSelecDatosProducto}
                                showDatosProductosAdicionales={
                                    showDatosProductosAdicionales
                                }
                                setShowDatosProductosAdicionales={
                                    setShowDatosProductosAdicionales
                                }
                                showModalDatosProducto={showModalDatosProducto}
                                setShowModalDatosProducto={
                                    setShowModalDatosProducto
                                }
                                generico={generico}
                                tituloInformacionProducto={
                                    tituloInformacionProducto
                                }
                                setTituloInformacionProducto={
                                    setTituloInformacionProducto
                                }
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}

                        {showDatosProductosAdicionales ? (
                            <DatosProductosAdicionales
                                showDatosProductosAdicionales={
                                    showDatosProductosAdicionales
                                }
                                setShowDatosProductosAdicionales={
                                    setShowDatosProductosAdicionales
                                }
                                showIngresoFotos={showIngresoFotos}
                                setShowIngresoFotos={setShowIngresoFotos}
                                categoria={categoria}
                                setCategoria={setCategoria}
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}

                        {showIngresoFotos ? (
                            <RegistrarFotos
                                showIngresoFotos={showIngresoFotos}
                                setShowIngresoFotos={setShowIngresoFotos}
                                generico={generico}
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}
                    </div>
                </div>

                <div className="App">
                    <ModalInformacionGenericos
                        shown={showModalGenerico}
                        close={() => {
                            setShowModalGenerico(false);
                        }}
                    />
                </div>
                <div className="App">
                    <ModalInformacionPorUnoVarios
                        shown={showModalParaUnoVarios}
                        close={() => {
                            setShowModalParaUnoVarios(false);
                        }}
                    />
                </div>
            </div>
            <div className="ps-page ps-page--inner mt-200"></div>
        </Container>
    );
};

function DatosProductos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        setShowDatosProductosActiva,
        showDatosProductosActiva,
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
        generico,
        tituloInformacionProducto,
        setTituloInformacionProducto,
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [classPosicionCaja, setClassPosicionCaja] = useState("ml-250 mt-20");
    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );

    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [informacionProducto, setInformacionProducto] = useState(true);
    const [calificacionEstadoProducto, setCalificacionEstadoProducto] =
        useState(false);
    const [estadoUno, setEstadoUno] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoDos, setEstadoDos] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoTres, setEstadoTres] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoCuatro, setEstadoCuatro] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoCinco, setEstadoCinco] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [contarLetrasTitulo, setcontarLetrasTitulo] = useState(0);
    const [tituloProducto, setTituloProducto] = useState(null);
    const [tituloProductoDos, setTituloProductoDos] = useState(0);
    const [puntosConsecutivos, setPuntosConsecutivos] = useState(null);

    const [inputTituloProducto, setInputTituloProducto] =
        useState("inputdatosproducto");
    const [inputMarcaProducto, setInputMarcaProducto] = useState(
        "inputdatosproductomarca sinborder"
    );
    const [inputCondicionProducto, setInputCondicionProducto] = useState(
        "dropdowncondicionproducto"
    );
    const [bordeCondicion, setBordeCondicion] = useState("");
    const [bordeVendePartes, setBordeVendePartes] = useState("");
    const [bordeFuncionalidad, setBordeFuncionalidad] = useState("");

    const [inputNumParteProducto, setInputNumParteProducto] = useState(
        "inputdatosproductomarca sinborder"
    );
    const [inputVenParteProducto, setInputVenParteProducto] = useState(
        "form-control ps-form__input tamañoinputdatosproducto mlmenos20"
    );
    const [inputFuncionalidadProducto, setInputFuncionalidadProducto] =
        useState("form-control ps-form__input");
    const [inputEstadoProducto, setInputEstadoProducto] = useState("");
    const [classInformacionProducto, setClassInformacionProducto] = useState(
        "cajavehiculoscompatiblesproducto"
    );

    const [tituloEditar, setTituloEditar] = useState(null);
    const [marcaEditar, setMarcaEditar] = useState(null);
    const [condicionEditar, setCondicionEditar] = useState(null);
    const [numeroparteEditar, setNumeroParteEditar] = useState(null);
    const [vendeparteEditar, setVendeParteEditar] = useState(null);
    const [funcionalidadEditar, setFuncionalidadEditar] = useState(null);
    const [estadoEditar, setEstadoEditar] = useState(null);

    const [tipoCondicion, setTipoCondicion] = useState(
        "Selecciona la condición de tu producto"
    );
    const [classtipoCondicion, setClassTipoCondicion] = useState("mlmenos35");

    const [vendePorPartes, setVendePorPartes] = useState(
        "Producto se vende por partes"
    );
    const [classPorPartes, setClassPorPartes] = useState("mlmenos100");

    const [tipoFuncionalidad, setTipoFuncionalidad] = useState(
        "Funcionalidad del producto"
    );
    const [classtipoFuncionalidad, setClassTipoFuncionalidad] =
        useState("mlmenos130");

    useEffect(() => {
        if (generico == "No") {
            setClassPosicionCaja("ml-200");
            setClassInformacionProducto(
                "mt-20 cajavehiculoscompatiblesproducto"
            );
        } else {
            setClassPosicionCaja("ml-200 mtmenos55");
            setClassInformacionProducto(
                "mt-82 cajavehiculoscompatiblesproducto"
            );
        }
    }, []);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const tituloOnChange = (e) => {
        //console.log("LONGITUD TITULO NOMBRE : ", e);
        var strLength = e.length;

        let titulo = "";
        let letra;
        for (var i = 0; i < 69; i++) {
            letra = e.substr(i, 1);
            titulo = titulo + letra;

            if (i <= 35) setTituloProductoDos(titulo);
        }
        setTituloProducto(titulo);
        setcontarLetrasTitulo(strLength);

        if (tituloProductoDos.length > 35) setPuntosConsecutivos("...");
        else setPuntosConsecutivos("");

        if (strLength > 69) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 70 permitido!"
            );
            return;
        }
    };

    const calificacionproducto = [
        { label: "Baja", value: 1 },
        { label: "Regular", value: 2 },
        { label: "Buena", value: 3 },
        { label: "Excelente", value: 4 },
    ];

    const condicionproducto = [
        { label: "Nuevo", value: 1 },
        { label: "Usado", value: 2 },
    ];

    const porpartes = [
        { label: "Si, se vende por partes", value: 1 },
        { label: "No, se vende completo", value: 2 },
    ];

    const iniciarTituloProducto = (e) => {
        setInputTituloProducto("inputdatosproducto");
    };

    const marcaOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        //setContadorLetrasDescripcion(strLength);

        if (strLength > 30) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres de la marca supera el maximo de 30 permitido!"
            );
            return;
        }
    };

    const iniciarMarca = (e) => {
        setInputMarcaProducto("inputdatosproductomarca sinborder");
    };

    const iniciarCondicion = (e) => {
        setInputCondicionProducto("dropdowncondicionproducto");
        setBordeCondicion("");
    };

    const seleccionarTipoCondicion = (e) => {
        setTipoCondicion(e);
        setClassTipoCondicion("mlmenos275");
    };

    const seleccionarVendePartes = (e) => {
        setVendePorPartes(e);
        setClassPorPartes("mlmenos150");
        setBordeVendePartes("");
    };

    const seleccionarTipoFuncionalidad = (e) => {
        setTipoFuncionalidad(e);
        setClassTipoFuncionalidad("mlmenos275");
        setBordeFuncionalidad("");
    };

    const iniciarNumParte = (e) => {
        setInputNumParteProducto("inputdatosproductomarca sinborder");
    };

    const iniciarVendParte = (e) => {
        setInputVenParteProducto(
            "form-control ps-form__input tamañoinputdatosproducto mlmenos20"
        );
        setBordeVendePartes("");
    };

    const iniciarFuncionalidad = (e) => {
        setInputFuncionalidadProducto("form-control ps-form__input");
        setBordeFuncionalidad("");
    };

    const iniciarEstado = (e) => {
        setInputEstadoProducto("");
    };

    //setInputEstadoProducto("ps-form__group tamañoinputdatosproducto");

    const grabardatosadicionales = async (e) => {
        e.preventDefault();

        let valores = JSON.parse(localStorage.getItem("informacionproducto"));

        let funcionalidad = null;
        let condicion = null;
        let marcarepuesto = null;
        let numerodeparte = null;
        let titulonombre = null;
        let vendeporpartes = null;
        let estadoproducto = null;

        if (valores.length > 0 && !formData.titulonombre) {
            funcionalidad = valores[0].funcionalidad;
            condicion = valores[0].condicion;
            marcarepuesto = valores[0].marcarepuesto;
            numerodeparte = valores[0].numerodeparte;
            titulonombre = valores[0].titulonombre;
            vendeporpartes = valores[0].vendeporpartes;
            estadoproducto = valores[0].estadoproducto;
        } else {
            funcionalidad = tipoFuncionalidad;
            condicion = tipoCondicion;
            marcarepuesto = formData.marcarepuesto;
            numerodeparte = formData.numerodeparte;
            titulonombre = tituloProducto;
            vendeporpartes = vendePorPartes;
            estadoproducto = calificacionEstadoProducto;
        }

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!titulonombre) {
            setShowModalMensajes(true);

            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el titulo de la publicación!");
            setInputTituloProducto("inputdatosproducto alertbotonproducto");
            errors.titulonombre = true;
            formOk = false;
        }

        if (!numerodeparte) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el numero de parte del producto!");
            setInputNumParteProducto(
                "inputdatosproductomarca alertbotonproducto"
            );
            errors.titulonombre = true;
            formOk = false;
        }

        if (!marcarepuesto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Marca del Repuesto!");
            setInputMarcaProducto("inputdatosproductomarca alertbotonproducto");
            errors.marcarepuesto = true;
            formOk = false;
        }

        if (
            vendeporpartes == "Producto se vende por partes" ||
            !vendeparteEditar
        ) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debe ingresar si el producto se vende por partes Si o No!"
            );
            setBordeVendePartes("alertbotonproducto");
            errors.condicion = true;
            formOk = false;
        }

        if (
            condicion == "Selecciona la condición de tu producto" ||
            !condicionEditar
        ) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debe ingresar en que Condición esta el Producto!"
            );
            setInputCondicionProducto("dropdowncondicionproducto");
            setBordeCondicion("alertbotonproducto");
            errors.condicion = true;
            formOk = false;
        }

        if (
            funcionalidad == "Funcionalidad del producto" ||
            !funcionalidadEditar
        ) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Calificación del producto!");
            setBordeFuncionalidad("alertbotonproducto");
            errors.calificacionproducto = true;
            formOk = false;
        }

        if (!calificacionEstadoProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar Estado del producto!");
            setInputEstadoProducto("ml-10 alertbotonestadoproducto");
            errors.calificacionproducto = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (!formOk && valores.length == 0) {
            setLoading(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe Ingresar todos los datos del Producto!");
            return;
        }

        const newDet = [];
        let item = {
            funcionalidad: funcionalidad,
            condicion: condicion,
            marcarepuesto: marcarepuesto,
            numerodeparte: numerodeparte,
            titulonombre: titulonombre,
            vendeporpartes: vendeporpartes,
            estadoproducto: estadoproducto,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem("informacionproducto", JSON.stringify(newDet));

        //console.log("INFORMACION PRODUCTO : ", formData)
        onCloseModaDatosProductos();
    };

    const onCloseModaDatosProductos = () => {
        setShowDatosProductosAdicionales(true);
        //setShowDatosProductosActiva(false)
        setInformacionProducto(false);
    };

    const onChangeCondicion = (event) => {
        setCondicionEditar(event);
    };

    const onChangeFuncionalidad = (event) => {
        setFuncionalidadEditar(event);
    };

    const onChangeEstado = (event) => {
        setEstadoEditar(event);
    };

    const onChangeVendePartes = (event) => {
        setVendeParteEditar(event);
    };

    const onOpenModaDatosProductos = () => {
        //setShowDatosProductosAdicionales(false);
        let valores = null;
        valores = JSON.parse(localStorage.getItem("informacionproducto"));

        if (valores) {
            setTituloEditar(valores[0].titulonombre);
            setMarcaEditar(valores[0].marcarepuesto);
            setCondicionEditar(valores[0].condicion);
            setNumeroParteEditar(valores[0].numerodeparte);
            setVendeParteEditar(valores[0].vendeporpartes);
            setFuncionalidadEditar(valores[0].funcionalidad);
            setEstadoEditar(valores[0].estadoproducto);
            setInformacionProducto(true);
        }
    };

    useEffect(() => {
        let valores = JSON.parse(localStorage.getItem("informacionproducto"));
        console.log("VALORES : ", valores);

        if (valores.length > 0) {
            setTituloEditar(valores[0].titulonombre);
            setMarcaEditar(valores[0].marcarepuesto);
            setCondicionEditar(valores[0].condicion);
            setNumeroParteEditar(valores[0].numerodeparte);
            setVendeParteEditar(valores[0].vendeporpartes);
            setFuncionalidadEditar(valores[0].funcionalidad);
            setEstadoEditar(valores[0].estadoproducto);
        }
    }, [marcaEditar]);

    const offCalificacionEstado = () => {
        if (!calificacionEstadoProducto) {
            setEstadoUno("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        }
    };

    const OncalificacionEstadoUno = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoDos = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoTres = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoCuatro = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoCinco = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
    };

    const calificacionEstadoUno = () => {
        setCalificacionEstadoProducto(1);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoDos = () => {
        setCalificacionEstadoProducto(2);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoTres = () => {
        setCalificacionEstadoProducto(3);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoCuatro = () => {
        setCalificacionEstadoProducto(4);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoCinco = () => {
        setCalificacionEstadoProducto(5);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
    };

    return (
        <div className={classPosicionCaja}>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            {informacionProducto ? (
                <div className={classInformacionProducto}>
                    <h3 className={tituloInformacionProducto}>
                        Información sobre tu producto.
                    </h3>
                    <form onChange={onChange}>
                        <div className="ml-1 ps-form--review">
                            <Row>
                                <Col xl={12} lg={12} md={12} xs={12}>
                                    <div>
                                        <label className="ps-form__label">
                                            * Titulo publicación
                                        </label>
                                        <input
                                            className={inputTituloProducto}
                                            autocomplete="off"
                                            placeholder="Escribre el nombre del producto y las características más relevantes"
                                            name="titulonombre"
                                            defaultValue={tituloEditar}
                                            value={tituloProducto}
                                            onClick={(e) =>
                                                iniciarTituloProducto()
                                            }
                                            onChange={(e) =>
                                                tituloOnChange(e.target.value)
                                            }
                                            type="text"
                                        />
                                        <h4 className="ml-650 mt-1">
                                            {contarLetrasTitulo} {"/"} 70
                                        </h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mtmenos20">
                                <Col xl={5} lg={5} md={5} xs={5}>
                                    <div
                                        className={
                                            "ps-form__group tamañoinputdatosproducto ml-3"
                                        }>
                                        <label className="ps-form__label">
                                            * Marca del Repuesto
                                        </label>
                                        <input
                                            className={inputMarcaProducto}
                                            autoComplete="off"
                                            defaultValue={marcaEditar}
                                            onChange={(e) =>
                                                marcaOnChange(e.target.value)
                                            }
                                            onClick={(e) => iniciarMarca()}
                                            placeholder="Ingresa la marca del producto"
                                            name="marcarepuesto"
                                            type="text"
                                        />
                                    </div>
                                </Col>
                                <Col
                                    xl={4}
                                    lg={4}
                                    md={4}
                                    xs={4}
                                    className="ml-43">
                                    <label className="ps-form__label">
                                        * Condición
                                    </label>
                                    <div className={bordeCondicion}>
                                        <Dropdown
                                            onSelect={onChangeCondicion}
                                            onClick={iniciarCondicion}>
                                            <Dropdown.Toggle
                                                className={
                                                    inputCondicionProducto
                                                }
                                                name="condicion"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div
                                                    className={
                                                        classtipoCondicion
                                                    }>
                                                    {tipoCondicion}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                variant="outline-light"
                                                //ref={targetEditUno}
                                                className="tamañocajacondicionproducto">
                                                {condicionproducto &&
                                                    condicionproducto.map(
                                                        (item) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    className="itemsdropdowncustom"
                                                                    onClick={() =>
                                                                        seleccionarTipoCondicion(
                                                                            item.label
                                                                        )
                                                                    }
                                                                    eventKey={
                                                                        item.value
                                                                    }>
                                                                    {item.label}
                                                                </Dropdown.Item>
                                                            );
                                                        }
                                                    )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label">
                                            Número de Parte
                                        </label>
                                        <input
                                            className={inputNumParteProducto}
                                            autoComplete="off"
                                            name="numerodeparte"
                                            defaultValue={numeroparteEditar}
                                            onClick={(e) => iniciarNumParte()}
                                            placeholder="Ingresa número de parte del producto"
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                inputComponent:
                                                    NumberFormatCelular,
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    xl={6}
                                    lg={6}
                                    md={6}
                                    xs={6}
                                    className="mlmenos23">
                                    <label className="ps-form__label">
                                        Vende por partes
                                    </label>
                                    <div className={bordeVendePartes}>
                                        <Dropdown
                                            onSelect={onChangeVendePartes}
                                            onClick={iniciarVendParte}>
                                            <Dropdown.Toggle
                                                className="dropdowncondicionproducto"
                                                name="vendeporpartes"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div className={classPorPartes}>
                                                    {vendePorPartes}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                variant="outline-light"
                                                //ref={targetEditUno}
                                                className="tamañocajacondicionproducto">
                                                {porpartes &&
                                                    porpartes.map((item) => {
                                                        return (
                                                            <Dropdown.Item
                                                                className="itemsdropdowncustom"
                                                                onClick={() =>
                                                                    seleccionarVendePartes(
                                                                        item.label
                                                                    )
                                                                }
                                                                eventKey={
                                                                    item.value
                                                                }>
                                                                {item.label}
                                                            </Dropdown.Item>
                                                        );
                                                    })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    xl={5}
                                    lg={5}
                                    md={5}
                                    xs={5}
                                    className="ml-10">
                                    <label className="ps-form__label">
                                        Escala de funcionalidad
                                    </label>
                                    <div className={bordeFuncionalidad}>
                                        <Dropdown
                                            onSelect={onChangeFuncionalidad}
                                            onClick={iniciarFuncionalidad}>
                                            <Dropdown.Toggle
                                                className="dropdowncondicionproducto"
                                                name="funcionalidad"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div
                                                    className={
                                                        classtipoFuncionalidad
                                                    }>
                                                    {tipoFuncionalidad}
                                                </div>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                variant="outline-light"
                                                //ref={targetEditUno}
                                                className="tamañocajacondicionproducto">
                                                {calificacionproducto &&
                                                    calificacionproducto.map(
                                                        (item) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    className="itemsdropdowncustom"
                                                                    onClick={() =>
                                                                        seleccionarTipoFuncionalidad(
                                                                            item.label
                                                                        )
                                                                    }
                                                                    eventKey={
                                                                        item.value
                                                                    }>
                                                                    {item.label}
                                                                </Dropdown.Item>
                                                            );
                                                        }
                                                    )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className={
                                            "ps-form__group ml-35 tamañoinputestadoproducto alertboton"
                                        }>
                                        <label className="ps-form__label">
                                            Estado del producto
                                        </label>
                                        <div
                                            className={inputEstadoProducto}
                                            value={estadoEditar}
                                            onChange={(e) =>
                                                onChangeEstado(e.target.value)
                                            }
                                            onClick={(e) => iniciarEstado()}>
                                            <div className="ml-20">
                                                <Row>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoUno
                                                            }
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoUno()
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoUno()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoDos
                                                            }
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoDos(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoDos()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoTres
                                                            }
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoTres(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoTres()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoCuatro
                                                            }
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoCuatro(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoCuatro()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            className={
                                                                estadoCinco
                                                            }
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoCinco(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoCinco()
                                                            }></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {caracteristicasVeh.productogenerico === "Si" ? (
                                <div className="ps-form__group">
                                    <label className="ps-form__label">
                                        Con que Vehiculos es Compatible
                                    </label>
                                    <input
                                        className="form-control ps-form__input"
                                        name="compatible"
                                        type="text"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </form>

                    <div className="botongrabarproducto mtmenos10">
                        <Row>
                            <Col xl={9} lg={9} md={9} xs={9}>
                                <div>
                                    <p className="ml-10 ps-form__text ">
                                        * Datos Requeridos.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={2} lg={2} md={2} xs={2}>
                                <div
                                    className="ml-18 ps-btn redondearborde"
                                    onClick={grabardatosadicionales}>
                                    Siguiente
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={classInformacionProducto}>
                        <h3 className="ml-15 tituloadvertenciaproductosizquierda">
                            Información sobre el producto
                        </h3>
                        <div className="ml-15">
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className="mt-1 datoscerrados"
                                        disabled={true}>
                                        <h3 className="textoubicacionproductodos">
                                            {formData.titulonombre
                                                ? tituloProductoDos +
                                                  puntosConsecutivos
                                                : tituloEditar
                                                ? tituloEditar
                                                : null}
                                        </h3>
                                    </div>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    className="ml-189 mtmenos2 apuntador">
                                    <div className="showcerrarabrir">
                                        <i
                                            className="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                            onClick={onOpenModaDatosProductos}
                                            aria-hidden="true"
                                            ref={targetshow}
                                            onMouseOver={() =>
                                                setShowEdit(true)
                                            }
                                            onMouseOut={() =>
                                                setShowEdit(false)
                                            }></i>
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
                                                    Editar{" "}
                                                </h3>
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DatosProductosAdicionales(props) {
    const {
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
        showIngresoFotos,
        setShowIngresoFotos,
        categoria,
        setCategoria,
        quantity,
        setQuantity,
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const [datosPublicacion, setDatosPublicacion] = useState(true);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const [inputDescripcionProducto, setInputDescripcionProducto] = useState(
        "form-control ps-form__input descripcionproducto  colorboder"
    );
    const [inputNumeroUnidades, setInputNumeroUnidades] = useState(
        "form-control ps-form__input tamañoinputpublicacion ml-9"
    );
    const [inputPrecio, setInputPrecio] = useState(
        "form-control ps-form__input baseinput tamañoinputpublicacion eliminarborde mlmenos15"
    );
    const [inputPeso, setInputPeso] = useState(
        "form-control ps-form__input baseinput tamañoinputpublicacion eliminarborde"
    );
    const [inputLargo, setInputLargo] = useState(
        "form-control ps-form__input baseinput tamañoinputpublicacion eliminarborde"
    );
    const [inputAncho, setInputAncho] = useState(
        "form-control ps-form__input baseinput tamañoinputpublicacion eliminarborde"
    );
    const [inputAltura, setInputAltura] = useState(
        "form-control ps-form__input baseinput tamañoinputpublicacion mlmenos10 eliminarborde"
    );

    const [tituloDescripcion, setTituloDescripcion] = useState(null);
    const [textoDescripcion, setTextoDescripcion] = useState("");
    const [entre, setEntre] = useState(true);
    const [ingresaPrecio, setIngresaPrecio] = useState(0);
    const [contadorLetrasDescripcion, setContadorLetrasDescripcion] =
        useState(0);

    const [descripcionEditar, setDescripcionEditar] = useState("");
    const [unidadesEditar, setUnidadesEditar] = useState("");
    const [precioEditar, setPrecioEditar] = useState("");
    const [pesoEditar, setPesoEditar] = useState("");
    const [largoEditar, setLargoEditar] = useState("");
    const [anchoEditar, setAnchoEditar] = useState("");
    const [alturaEditar, setAlturaEditar] = useState("");

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        //console.log("CATEGORIA : 0, categoria")
        if (categoria === 1) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir para que sirve tu producto"
            );
        } else if (categoria === 2) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir el material de tu producto, disponibilidad de colores, y medidas."
            );
        } else if (categoria === 3) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir el material de tu producto, disponibilidad de colores, y medidas."
            );
        } else if (categoria === 4) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir la potencia y especificaciones técnicas del producto."
            );
        } else if (categoria === 5) {
            setTextoDescripcion(
                "Aquí puedes escribir el voltaje, amperaje, lúmenes, referencia, entre otros elementos que consideres relevantes."
            );
        } else if (categoria === 6) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir la referencia del producto, como son: 5W30, 20W50, 15W40, 25W60, dot4, entre otros."
            );
        } else if (categoria === 7) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir el ancho (mm), alto (mm-%), rin, índice de carga, indice de velocidad."
            );
        } else if (categoria === 8) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir el amperaje, ancho, alto, y largo, y el tipo de vehículo para el cual sirve"
            );
        } else if (categoria === 9) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir la longitud de las plumillas en pulgadas"
            );
        } else if (categoria === 10) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes describir el contenido del kit, las características o materiales del producto."
            );
        } else
            setTextoDescripcion(
                "Suegerencia: Aquí puedes ingresar información relacionada con tu producto."
            );
    }, [categoria]);

    const datosAdicionalesProducto = async (e) => {
        e.preventDefault();
        //console.log("FORM DATA : ", formData);

        setFormError({});
        let errors = {};
        let formOk = true;

        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        let alto = null;
        let ancho = null;
        let descripcionproducto = null;
        let largo = null;
        let numerodeunidades = null;
        let peso = null;
        let precio = null;

        if (valores.length > 0 && !formData.descripcionproducto) {
            alto = valores[0].alto;
            ancho = valores[0].ancho;
            descripcionproducto = valores[0].descripcionproducto;
            largo = valores[0].largo;
            numerodeunidades = valores[0].numerodeunidades;
            peso = valores[0].peso;
            precio = valores[0].precio;
        } else {
            alto = formData.alto;
            ancho = formData.ancho;
            descripcionproducto = tituloDescripcion;
            largo = formData.largo;
            numerodeunidades = quantity;
            peso = formData.peso;
            precio = formData.precio;
        }

        if (numerodeunidades == 0 || !numerodeunidades) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar Número de Unidades del producto!");
            setInputNumeroUnidades(
                "form-control ps-form__input tamañoinputpublicacion ml-10 alertboton"
            );
            errors.numerodeunidades = true;
            formOk = false;
        }

        if (!precio || precio == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el precio del producto!");
            setInputPrecio(
                "form-control ps-form__input tamañoinputpublicacion alertboton mlmenos15"
            );
            errors.precio = true;
            formOk = false;
        }

        let validavalor = formData.precio;

        if (!descripcionproducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Descripción del producto!");
            setInputDescripcionProducto(
                "form-control ps-form__input descripcionproducto colorboderalert"
            );
            errors.descripcionproducto = true;
            formOk = false;
        }

        if (!peso || peso == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el peso del producto!");
            setInputPeso(
                "form-control ps-form__input tamañoinputpublicacion alertboton"
            );
            errors.peso = true;
            formOk = false;
        }

        if (!largo || largo == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar longitud del producto");
            setInputLargo(
                "form-control ps-form__input tamañoinputpublicacion alertboton"
            );
            errors.largo = true;
            formOk = false;
        }

        if (!alto || alto == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la altura del producto");
            setInputAltura(
                "form-control ps-form__input tamañoinputpublicacion mlmenos10 alertboton"
            );
            errors.alto = true;
            formOk = false;
        }

        if (!ancho || ancho == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el ancho del producto");
            setInputAncho(
                "form-control ps-form__input tamañoinputpublicacion alertboton"
            );
            errors.ancho = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (!formOk) {
            setLoading(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Para lograr mayor visibilidad debes ingresar los datos del producto !"
            );
            return;
        }

        //console.log("DATOS PUBLICACION : ", formData);
        const newDet = [];
        let item = {
            alto: alto,
            ancho: ancho,
            descripcionproducto: descripcionproducto,
            largo: largo,
            numerodeunidades: numerodeunidades,
            peso: peso,
            precio: precio,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem(
            "datospublicacionproducto",
            JSON.stringify(newDet)
        );

        onCloseModalDatosPublicacion();
    };

    const onCloseModalDatosPublicacion = () => {
        setShowIngresoFotos(true);
        setDatosPublicacion(false);
    };

    const onOpenModalDatosPublicacion = () => {
        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );
        setDescripcionEditar(valores[0].descripcionproducto);
        setUnidadesEditar(valores[0].numerodeunidades);
        setPrecioEditar(valores[0].precio);
        setPesoEditar(valores[0].peso);
        setLargoEditar(valores[0].largo);
        setAnchoEditar(valores[0].ancho);
        setAlturaEditar(valores[0].alto);

        //setShowIngresoFotos(false);
        setDatosPublicacion(true);
    };

    useEffect(() => {
        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        if (valores.length > 0) {
            setDescripcionEditar(valores[0].descripcionproducto);
            setUnidadesEditar(valores[0].numerodeunidades);
            setPrecioEditar(valores[0].precio);
            setPesoEditar(valores[0].peso);
            setLargoEditar(valores[0].largo);
            setAnchoEditar(valores[0].ancho);
            setAlturaEditar(valores[0].alto);
        }
    }, [precioEditar]);

    const iniciarInputUnidades = (e) => {
        setInputNumeroUnidades(
            "form-control ps-form__input tamañoinputpublicacion ml-10"
        );
    };

    const iniciarInputPrecio = (e) => {
        setInputPrecio(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde mlmenos15"
        );
    };

    const iniciarInputPeso = (e) => {
        setInputPeso(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde"
        );
    };

    const iniciarInputLargo = (e) => {
        setInputLargo(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde"
        );
    };
    const iniciarInputAncho = (e) => {
        setInputAncho(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde"
        );
    };
    const iniciarInputAltura = (e) => {
        setInputAltura(
            "form-control ps-form__input tamañoinputpublicacion mlmenos10 eliminarborde"
        );
    };

    const IncrementItem = () => {
        setInputNumeroUnidades(
            "form-control ps-form__input tamañoinputpublicacion ml-10"
        );
        let contador = quantity + 1;
        //console.log("VALOR : ", contador)
        setQuantity(contador);
        console.log("MAS : ", contador)

        setFormData({
            ...formData,
            [formData.numerodeunidades]: contador,
        });
    };

    const DecreaseItem = () => {
        setInputNumeroUnidades(
            "form-control ps-form__input tamañoinputpublicacion ml-10"
        );
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
        console.log("MENOS : ", quantity)
    };

    const handleChange = (event) => {
        //console.log("VALOR : ", variable);

        if (isNaN(parseInt(event))) {
            setQuantity(0);
        } else setQuantity(parseInt(event));
    };

    const iniciarDescripcionproducto = (e) => {
        setInputDescripcionProducto(
            "form-control ps-form__input descripcionproducto  colorboder"
        );
    };

    const descripcionOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        let descripcion = "";
        let letra;
        for (var i = 0; i < 179; i++) {
            letra = e.substr(i, 1);
            descripcion = descripcion + letra;
        }
        setTituloDescripcion(descripcion);

        setContadorLetrasDescripcion(strLength);

        if (strLength > 179) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 180 permitido!"
            );
            return;
        }
    };

    const validaPrecio = (precio) => {
        //console.log("Precio : ", formData.precio);
        //setInputControlTelefono("form-control ps-form__input");
        setIngresaPrecio(formData.precio);

        let validavalor = formData.precio;

        let validarprecio;
        let haycaracterid = false;
        for (var i = 0; i < validavalor.length; i++) {
            validarprecio = validavalor.substr(i, 1);
            if (
                validarprecio != 0 &&
                validarprecio != 1 &&
                validarprecio != 2 &&
                validarprecio != 3 &&
                validarprecio != 4 &&
                validarprecio != 5 &&
                validarprecio != 6 &&
                validarprecio != 7 &&
                validarprecio != 8 &&
                validarprecio != 9
            ) {
                haycaracterid = true;
                console.log("CARACTER", i, validarprecio);
            } else console.log("ES UN NUMERO ", i, validarprecio);
        }

        if (haycaracterid) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Por favor ingresa el precio, sin separadores o caracteres especiales!"
            );
            return;
        }
    };

    const precioSinFormato = () => {
        setEntre(false);
    };

    return (
        <div className="ps-page__header ml-250 mt-25">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            {datosPublicacion ? (
                <div className="mlmenos60 cajavehiculoscompatiblesproducto">
                    <div>
                        <h3 className="ml-15 tituloadvertenciaproductosizquierda">
                            Datos de la publicación.
                        </h3>
                    </div>
                    <form onChange={onChange}>
                        <div className="ps-form--review">
                            <div className="ps-form__group inputdatosproductoadicional">
                                <Row>
                                    <Col lg={12} xl={12} md={12} xs={12}>
                                        <div className="ps-form__group inputdatosproductoadicional mt-10">
                                            <h3>Descripción del producto</h3>
                                            <textarea
                                                className={
                                                    inputDescripcionProducto
                                                }
                                                placeholder={textoDescripcion}
                                                defaultValue={descripcionEditar}
                                                value={tituloDescripcion}
                                                name="descripcionproducto"
                                                onClick={(e) =>
                                                    iniciarDescripcionproducto()
                                                }
                                                onChange={(e) =>
                                                    descripcionOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                            />
                                            <h4 className="ml-650 mt-1">
                                                {contadorLetrasDescripcion}{" "}
                                                {"/"} 180
                                            </h4>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mtmenos10">
                                    <Col lg={6} xl={6} md={6} xs={6}>
                                        <label className="ml-10 ps-form__label">
                                            Número de Unidades
                                        </label>
                                        <div className={inputNumeroUnidades}>
                                            <button
                                                className="ml-10 mt-1 colorboder"
                                                type="button"
                                                onClick={DecreaseItem}>
                                                <i className="fa fa-minus"></i>
                                            </button>

                                            <NumberFormat
                                                className="ml-55 eliminarborde colordelfondo"
                                                name="numerodeunidades"
                                                defaultValue={unidadesEditar}
                                                value={quantity}
                                                onChange={(e) =>
                                                    handleChange(e.target.value)
                                                }
                                                onClick={() =>
                                                    iniciarInputUnidades()
                                                }
                                                placeholder="Ingrese número de unidades"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />

                                            <button
                                                className="ml-50 colorboder"
                                                type="button"
                                                onClick={IncrementItem}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </Col>
                                    {entre ? (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <label className="mlmenos5 ps-form__label">
                                                Precio del producto
                                            </label>
                                            <NumberFormat
                                                //variant="outline-light"
                                                className={inputPrecio}
                                                autoComplete="off"
                                                onMouseOut={precioSinFormato}
                                                defaultValue={precioEditar}
                                                onClick={() =>
                                                    iniciarInputPrecio()
                                                }
                                                name="precio"
                                                onBlur={(e) =>
                                                    validaPrecio(e.target.value)
                                                }
                                                placeholder="Ingrese precio del producto"
                                                //thousandSeparator={true}
                                                //prefix={"$"}
                                            />
                                        </Col>
                                    ) : (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <label className="mlmenos5 ps-form__label">
                                                Precio del producto
                                            </label>
                                            <NumberFormat
                                                defaultValue={precioEditar}
                                                className={inputPrecio}
                                                autoComplete="off"
                                                onClick={() =>
                                                    iniciarInputPrecio()
                                                }
                                                //onMouseClick={precioConFormato}
                                                //onMouseOver={precioConFormato}
                                                name="precio"
                                                placeholder="Ingrese precio del producto"
                                                thousandSeparator={true}
                                                //prefix={"$"}
                                            />
                                        </Col>
                                    )}
                                </Row>

                                <div className="ps-form__group inputdatosproductoadicional mt-10">
                                    <Row>
                                        <Col lg={5} xl={5} md={5} xs={5}>
                                            <label className="ps-form__label">
                                                Peso del producto
                                            </label>
                                            <NumberFormat
                                                className={inputPeso}
                                                autoComplete="off"
                                                defaultValue={pesoEditar}
                                                onClick={() =>
                                                    iniciarInputPeso()
                                                }
                                                name="peso"
                                                placeholder="Ingrese peso del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-34 baseinput">
                                            <h3 className="ml-15 textomedidas">
                                                Kg
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="ml-2">
                                            <label className="ml-10 ps-form__label">
                                                Largo del producto
                                            </label>
                                            <NumberFormat
                                                className={inputLargo}
                                                autoComplete="off"
                                                defaultValue={largoEditar}
                                                name="largo"
                                                onClick={() =>
                                                    iniciarInputLargo()
                                                }
                                                placeholder="Longitud del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-34 baseinput">
                                            <h3 className="ml-70 textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={5}
                                            xl={5}
                                            md={5}
                                            xs={5}
                                            className="mt-20">
                                            <label className="ps-form__label">
                                                Ancho del producto
                                            </label>
                                            <NumberFormat
                                                className={inputAncho}
                                                autoComplete="off"
                                                defaultValue={anchoEditar}
                                                name="ancho"
                                                onClick={() =>
                                                    iniciarInputAncho()
                                                }
                                                placeholder="Ancho del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mlmenos5 mt-53 baseinput">
                                            <h3 className="ml-12 textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="ml-16 mt-20">
                                            <label className="ps-form__label">
                                                Altura del producto
                                            </label>
                                            <NumberFormat
                                                className={inputAltura}
                                                autoComplete="off"
                                                defaultValue={alturaEditar}
                                                name="alto"
                                                onClick={() =>
                                                    iniciarInputAltura()
                                                }
                                                placeholder="Altura del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-53 ml-45 baseinput">
                                            <h3 className="ml-60 textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="botongrabaradicionalproducto">
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <div>
                                    <p className="ps-form__text">
                                        * Datos Requeridos.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={8} lg={8} md={8} xs={8}>
                                <div
                                    className="ps-btn tamañoinputpublicacion ml-100 redondearborde"
                                    onClick={datosAdicionalesProducto}>
                                    Vamos al ingreso de fotos del producto
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div className="mlmenos60 mt-25 cajainformacionprouctos">
                    <h3 className="ml-15 tituloadvertenciaproductosizquierda">
                        Datos publicación.
                    </h3>
                    <div>
                        <Row>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div
                                    className="ml-15 mt-1 datoscerrados"
                                    disabled={true}>
                                    <h3 className="textoubicacionproducto">
                                        Precio del producto $ {formData.precio}
                                    </h3>
                                </div>
                            </Col>
                            <Col
                                xl={1}
                                lg={1}
                                md={1}
                                xs={1}
                                className="mtmenos2 ml-197 apuntador">
                                <div className="showcerrarabrir">
                                    <i
                                        className="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                        onClick={onOpenModalDatosPublicacion}
                                        aria-hidden="true"
                                        ref={targetshow}
                                        onMouseOver={() => setShowEdit(true)}
                                        onMouseOut={() =>
                                            setShowEdit(false)
                                        }></i>
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
                                                Editar{" "}
                                            </h3>
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
}

function defaultValueForm() {
    return {
        id: null,
        productogenerico: null,
        tipoVeh: null,
        carroceria: null,
        marca: null,
        anno: null,
        modelo: null,
        cilindrajemotor: null,
        tipocombustible: null,
        transmision: null,
        partedelVeh: null,
        posicionproducto: null,
        titulonombre: null,
        marcarepuesto: null,
        condicion: null,
        funcionalidad: null,
        estadoproducto: null,
        numerodeunidades: null,
        precio: null,
        numerodeparte: null,
        compatible: null,
        descripcionproducto: null,
        vendeporpartes: null,
        peso: null,
        largo: null,
        ancho: null,
        alto: null,
        tipotraccion: null,
        turbocompresor: null,
        descuento: null,
        usuario: null,
        moneda: null,
        estado: null,
        numerodeimagenes: null,
        nombreimagen1: null,
        nombreimagen2: null,
        nombreimagen3: null,
        nombreimagen4: null,
        nombreimagen5: null,
        nombreimagen6: null,
        nombreimagen7: null,
        nombreimagen8: null,
        nombreimagen9: null,
        nombreimagen10: null,
    };
}

export default CreateProduct;
