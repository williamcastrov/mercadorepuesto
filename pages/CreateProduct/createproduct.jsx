import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import swal from "sweetalert";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import shortid from "shortid";
import { getSelectedVehicle } from "../../store/selectedvehicle/action";
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
import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { useRouter } from "next/router";
import img from "../../public/imagesupload/uploadimage.png";
import eliminar from "../../public/imagesupload/eliminar.png";

// Componentes Crear Producto
import DatosVehiculos from "./DatosVehiculos";
import DatosVehiculosDos from "./DatosVehiculosDos";
import DatosVehiculosTres from "./DatosVehiculosTres";
import DatosVehiculosCuatro from "./DatosVehiculosCuatro";
import DatosVehiculosCinco from "./DatosVehiculosCinco";
import DatosVehiculosSeis from "./DatosVehiculosSeis";
import DatosVehiculosSiete from "./DatosVehiculosSiete";
import DatosVehiculosOcho from "./DatosVehiculosOcho";
import DatosVehiculosNueve from "./DatosVehiculosNueve";
import DatosVehiculosDiez from "./DatosVehiculosTres";

import VehiculoSeleccionado from "./VehiculoSeleccionado";
import DatosVehiculosEditar from "./DatosVehiculosEditar";
import DatosVehiculosDuplicar from "./DatosVehiculosDuplicar";
import ModalComentariosHabitaculo from "./ModalComentariosHabitaculo";
import CategoriasProductosGenericos from "./CategoriasProductosGenericos";
import ModalComentariosUbicacionProducto from "./ModalComentariosUbicacionProducto";

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
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false);
    const [agregarDatos, setAgregarDatos] = useState(false);
    const [mostrarBotonDatosMotor, setMostrarBotonDatosMotor] = useState(false);
    const [agregarVehiculo, setAgregarVehiculo] = useState(false);
    const [showModalDatosProducto, setShowModalDatosProducto] = useState(false);
    const [abrirCerrarCategoriasGenerico, setAbrirCerrarCategoriasGenerico] =
        useState(true);

    const [mostrar, setMostrar] = useState(false);
    const [tamaño, setTamaño] = useState("col-12 col-md-6 ml-250");
    const [cerrarDatos, setCerrarDatos] = useState(
        "ps-form__group cajavehiculoscompatiblesproducto colorbase"
    );
    const [cerrarDatosDos, setCerrarDatosDos] = useState(
        "custom-selectcreateproducto redondearbordegenerico colorbase"
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

    const [showCreateProduct, setCreateProduct] = useState(true);
    const [showModalLatoneria, setShowModalLatoneria] = useState(false);
    const [showDatosProductos, setShowDatosProductos] = useState(false);
    const [showDatosProductosAdicionales, setShowDatosProductosAdicionales] =
        useState(false);
    const [showIngresoFotos, setShowIngresoFotos] = useState(false);

    const [pageAcount, setPageAcount] = useState("ps-page__content ps-account");

    const [mostrarDatosVehiculos, setMostrarDatosVehiculos] = useState(false);

    const [contador, setContador] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [tipoVehUno, setTipoVehUno] = useState([]);
    const [marcaVehUno, setMarcaVehUno] = useState([]);
    const [annoVehUno, setAnnoVehUno] = useState([]);
    const [modeloVehUno, setModeloVehUno] = useState([]);
    const [carroceriaVehUno, setCarroceriaVehUno] = useState([]);
    const [cilindrajeVehUno, setcilindrajeVehUno] = useState([]);
    const [transmisionVehUno, settransmisionVehUno] = useState([]);
    const [combustibleVehUno, setcombustibleVehUno] = useState([]);
    const [traccionVehUno, settraccionVehUno] = useState([]);

    const [tipoVehDos, setTipoVehDos] = useState([]);
    const [marcaVehDos, setMarcaVehDos] = useState([]);
    const [annoVehDos, setAnnoVehDos] = useState([]);
    const [modeloVehDos, setModeloVehDos] = useState([]);
    const [carroceriaVehDos, setCarroceriaVehDos] = useState([]);
    const [cilindrajeVehDos, setcilindrajeVehDos] = useState([]);
    const [transmisionVehDos, settransmisionVehDos] = useState([]);
    const [combustibleVehDos, setcombustibleVehDos] = useState([]);
    const [traccionVehDos, settraccionVehDos] = useState([]);

    const [tipoVehTres, setTipoVehTres] = useState([]);
    const [marcaVehTres, setMarcaVehTres] = useState([]);
    const [annoVehTres, setAnnoVehTres] = useState([]);
    const [modeloVehTres, setModeloVehTres] = useState([]);
    const [carroceriaVehTres, setCarroceriaVehTres] = useState([]);
    const [cilindrajeVehTres, setcilindrajeVehTres] = useState([]);
    const [transmisionVehTres, settransmisionVehTres] = useState([]);
    const [combustibleVehTres, setcombustibleVehTres] = useState([]);
    const [traccionVehTres, settraccionVehTres] = useState([]);

    const [tipoVehCuatro, setTipoVehCuatro] = useState([]);
    const [marcaVehCuatro, setMarcaVehCuatro] = useState([]);
    const [annoVehCuatro, setAnnoVehCuatro] = useState([]);
    const [modeloVehCuatro, setModeloVehCuatro] = useState([]);
    const [carroceriaVehCuatro, setCarroceriaVehCuatro] = useState([]);
    const [cilindrajeVehCuatro, setcilindrajeVehCuatro] = useState([]);
    const [transmisionVehCuatro, settransmisionVehCuatro] = useState([]);
    const [combustibleVehCuatro, setcombustibleVehCuatro] = useState([]);
    const [traccionVehCuatro, settraccionVehCuatro] = useState([]);

    const [tipoVehCinco, setTipoVehCinco] = useState([]);
    const [marcaVehCinco, setMarcaVehCinco] = useState([]);
    const [annoVehCinco, setAnnoVehCinco] = useState([]);
    const [modeloVehCinco, setModeloVehCinco] = useState([]);
    const [carroceriaVehCinco, setCarroceriaVehCinco] = useState([]);
    const [cilindrajeVehCinco, setcilindrajeVehCinco] = useState([]);
    const [transmisionVehCinco, settransmisionVehCinco] = useState([]);
    const [combustibleVehCinco, setcombustibleVehCinco] = useState([]);
    const [traccionVehCinco, settraccionVehCinco] = useState([]);

    const [tipoVehSeis, setTipoVehSeis] = useState([]);
    const [marcaVehSeis, setMarcaVehSeis] = useState([]);
    const [annoVehSeis, setAnnoVehSeis] = useState([]);
    const [modeloVehSeis, setModeloVehSeis] = useState([]);
    const [carroceriaVehSeis, setCarroceriaVehSeis] = useState([]);
    const [cilindrajeVehSeis, setcilindrajeVehSeis] = useState([]);
    const [transmisionVehSeis, settransmisionVehSeis] = useState([]);
    const [combustibleVehSeis, setcombustibleVehSeis] = useState([]);
    const [traccionVehSeis, settraccionVehSeis] = useState([]);

    const [tipoVehSiete, setTipoVehSiete] = useState([]);
    const [marcaVehSiete, setMarcaVehSiete] = useState([]);
    const [annoVehSiete, setAnnoVehSiete] = useState([]);
    const [modeloVehSiete, setModeloVehSiete] = useState([]);
    const [carroceriaVehSiete, setCarroceriaVehSiete] = useState([]);
    const [cilindrajeVehSiete, setcilindrajeVehSiete] = useState([]);
    const [transmisionVehSiete, settransmisionVehSiete] = useState([]);
    const [combustibleVehSiete, setcombustibleVehSiete] = useState([]);
    const [traccionVehSiete, settraccionVehSiete] = useState([]);

    const [tipoVehOcho, setTipoVehOcho] = useState([]);
    const [marcaVehOcho, setMarcaVehOcho] = useState([]);
    const [annoVehOcho, setAnnoVehOcho] = useState([]);
    const [modeloVehOcho, setModeloVehOcho] = useState([]);
    const [carroceriaVehOcho, setCarroceriaVehOcho] = useState([]);
    const [cilindrajeVehOcho, setcilindrajeVehOcho] = useState([]);
    const [transmisionVehOcho, settransmisionVehOcho] = useState([]);
    const [combustibleVehOcho, setcombustibleVehOcho] = useState([]);
    const [traccionVehOcho, settraccionVehOcho] = useState([]);

    const [tipoVehNueve, setTipoVehNueve] = useState([]);
    const [marcaVehNueve, setMarcaVehNueve] = useState([]);
    const [annoVehNueve, setAnnoVehNueve] = useState([]);
    const [modeloVehNueve, setModeloVehNueve] = useState([]);
    const [carroceriaVehNueve, setCarroceriaVehNueve] = useState([]);
    const [cilindrajeVehNueve, setcilindrajeVehNueve] = useState([]);
    const [transmisionVehNueve, settransmisionVehNueve] = useState([]);
    const [combustibleVehNueve, setcombustibleVehNueve] = useState([]);
    const [traccionVehNueve, settraccionVehNueve] = useState([]);

    const [tipoVehDiez, setTipoVehDiez] = useState([]);
    const [marcaVehDiez, setMarcaVehDiez] = useState([]);
    const [annoVehDiez, setAnnoVehDiez] = useState([]);
    const [modeloVehDiez, setModeloVehDiez] = useState([]);
    const [carroceriaVehDiez, setCarroceriaVehDiez] = useState([]);
    const [cilindrajeVehDiez, setcilindrajeVehDiez] = useState([]);
    const [transmisionVehDiez, settransmisionVehDiez] = useState([]);
    const [combustibleVehDiez, setcombustibleVehDiez] = useState([]);
    const [traccionVehDiez, settraccionVehDiez] = useState([]);

    const [generico, setGenerico] = useState("No");
    const [duplicar, setDuplicar] = useState(false);
    const [nuevoVehiculo, setNuevoVehiculo] = useState(false);

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
    const [vehiculoUnoNuevo, setVehiculoUnoNuevo] = useState(false);

    const [vehiculoDosCrear, setVehiculoDosCrear] = useState(false);
    const [vehiculoDosSelecc, setVehiculoDosSelecc] = useState(false);
    const [vehiculoDosEditar, setVehiculoDosEditar] = useState(false);
    const [vehiculoDosDuplicar, setVehiculoDosDuplicar] = useState(false);
    const [vehiculoDosUbicar, setVehiculoDosUbicar] = useState(false);
    const [vehiculoDosNuevo, setVehiculoDosNuevo] = useState(false);

    const [vehiculoTresCrear, setVehiculoTresCrear] = useState(false);
    const [vehiculoTresSelecc, setVehiculoTresSelecc] = useState(false);
    const [vehiculoTresEditar, setVehiculoTresEditar] = useState(false);
    const [vehiculoTresDuplicar, setVehiculoTresDuplicar] = useState(false);
    const [vehiculoTresUbicar, setVehiculoTresUbicar] = useState(false);
    const [vehiculoTresNuevo, setVehiculoTresNuevo] = useState(false);

    const [vehiculoCuatroCrear, setVehiculoCuatroCrear] = useState(false);
    const [vehiculoCuatroSelecc, setVehiculoCuatroSelecc] = useState(false);
    const [vehiculoCuatroEditar, setVehiculoCuatroEditar] = useState(false);
    const [vehiculoCuatroDuplicar, setVehiculoCuatroDuplicar] = useState(false);
    const [vehiculoCuatroUbicar, setVehiculoCuatroUbicar] = useState(false);

    const [vehiculoCincoCrear, setVehiculoCincoCrear] = useState(false);
    const [vehiculoCincoSelecc, setVehiculoCincoSelecc] = useState(false);
    const [vehiculoCincoEditar, setVehiculoCincoEditar] = useState(false);
    const [vehiculoCincoDuplicar, setVehiculoCincoDuplicar] = useState(false);
    const [vehiculoCincoUbicar, setVehiculoCincoUbicar] = useState(false);

    const [vehiculoSeisCrear, setVehiculoSeisCrear] = useState(false);
    const [vehiculoSeisSelecc, setVehiculoSeisSelecc] = useState(false);
    const [vehiculoSeisEditar, setVehiculoSeisEditar] = useState(false);
    const [vehiculoSeisDuplicar, setVehiculoSeisDuplicar] = useState(false);
    const [vehiculoSeisUbicar, setVehiculoSeisUbicar] = useState(false);

    const [vehiculoSieteCrear, setVehiculoSieteCrear] = useState(false);
    const [vehiculoSieteSelecc, setVehiculoSieteSelecc] = useState(false);
    const [vehiculoSieteEditar, setVehiculoSieteEditar] = useState(false);
    const [vehiculoSieteDuplicar, setVehiculoSieteDuplicar] = useState(false);
    const [vehiculoSieteUbicar, setVehiculoSieteUbicar] = useState(false);

    const [vehiculoOchoCrear, setVehiculoOchoCrear] = useState(false);
    const [vehiculoOchoSelecc, setVehiculoOchoSelecc] = useState(false);
    const [vehiculoOchoEditar, setVehiculoOchoEditar] = useState(false);
    const [vehiculoOchoDuplicar, setVehiculoOchoDuplicar] = useState(false);
    const [vehiculoOchoUbicar, setVehiculoOchoUbicar] = useState(false);

    const [vehiculoNueveCrear, setVehiculoNueveCrear] = useState(false);
    const [vehiculoNueveSelecc, setVehiculoNueveSelecc] = useState(false);
    const [vehiculoNueveEditar, setVehiculoNueveEditar] = useState(false);
    const [vehiculoNueveDuplicar, setVehiculoNueveDuplicar] = useState(false);
    const [vehiculoNueveUbicar, setVehiculoNueveUbicar] = useState(false);

    const [vehiculoDiezCrear, setVehiculoDiezCrear] = useState(false);
    const [vehiculoDiezSelecc, setVehiculoDiezSelecc] = useState(false);
    const [vehiculoDiezEditar, setVehiculoDiezEditar] = useState(false);
    const [vehiculoDiezDuplicar, setVehiculoDiezDuplicar] = useState(false);
    const [vehiculoDiezUbicar, setVehiculoDiezUbicar] = useState(false);

    const [vehiculoUno, setVehiculoUno] = useState(false);
    const [vehiculoDos, setVehiculoDos] = useState(false);
    const [vehiculoTres, setVehiculoTres] = useState(false);
    const [vehiculoCuatro, setVehiculoCuatro] = useState(false);
    const [vehiculoCinco, setVehiculoCinco] = useState(false);
    const [vehiculoSeis, setVehiculoSeis] = useState(false);
    const [vehiculoSiete, setVehiculoSiete] = useState(false);
    const [vehiculoOcho, setVehiculoOcho] = useState(false);
    const [vehiculoNueve, setVehiculoNueve] = useState(false);
    const [vehiculoDiez, setVehiculoDiez] = useState(false);

    const [seleccionoTipoVeh, setSeleccionoTipoVeh] = useState(false);
    const [seleccionoUbicacionProducto, setSeleccionoUbicacionProducto] =
        useState(false);
    const [SelecDatosProducto, setSelecDatosProducto] = useState(false);
    const [categoria, setCategoria] = useState(0);

    const productogenerico = [
        {
            label: labelGenericoUno,
            value: genericoUno,
        },
        {
            label: labelGenericoDos,
            value: genericoDos,
        },
    ];



    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos

    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);

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

    //console.log("CILINDRAJES CREAR PRODUCTOS : ", datoscrearproductoscilindrajes);

    useEffect(() => {
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));
        setListMarcasVehiculos(
            JSON.parse(localStorage.getItem("datosmarcasvehiculos"))
        );
        setListCarroceriasVehiculos(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        //setListModelosVehiculos(JSON.parse(localStorage.getItem("datosmodelosVehiculos")));
        //setListCilindrajesVehiculos(JSON.parse(localStorage.getItem("datoscilindrajeVehiculos")));
        setListModelosVehiculos(datoscrearproductosmodelos);
        setListCilindrajesVehiculos(datoscrearproductoscilindrajes);
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        //setLoading(false)
    }, []);

    useEffect(() => {
        if (agregarDatos) {
            let control = contador + 1;
            console.log("VALOR CONTADOR: ", control);
            setContador(control);
            if (control === 1) {
                setVehiculoUnoCrear(true);
                setVehiculoUno(true);
            } else if (control === 2) {
                if (duplicar) {
                    setVehiculoDosDuplicar(true);
                }
                if (nuevoVehiculo) {
                    setVehiculoDosNuevo(true);
                } else {
                    setVehiculoDosCrear(true);
                }
                setVehiculoDos(true);
            } else if (control === 3) {
                if (duplicar) {
                    setVehiculoTresDuplicar(true);
                } else {
                    setVehiculoTresCrear(true);
                }
                setVehiculoTres(true);
            } else if (control === 4) {
                if (duplicar) {
                    setVehiculoCuatroDuplicar(true);
                } else {
                    setVehiculoCuatroCrear(true);
                }
                setVehiculoCuatro(true);
            } else if (control === 5) {
                if (duplicar) {
                    setVehiculoCincoDuplicar(true);
                } else {
                    setVehiculoCincoCrear(true);
                }
                setVehiculoCinco(true);
            } else if (control === 6) {
                if (duplicar) {
                    setVehiculoSeisDuplicar(true);
                } else {
                    setVehiculoSeisCrear(true);
                }
                setVehiculoSeis(true);
            } else if (control === 7) {
                if (duplicar) {
                    setVehiculoSieteDuplicar(true);
                } else {
                    setVehiculoSieteCrear(true);
                }
                setVehiculoSiete(true);
            } else if (control === 8) {
                if (duplicar) {
                    setVehiculoOchoDuplicar(true);
                } else {
                    setVehiculoOchoCrear(true);
                }
                setVehiculoOcho(true);
            } else if (control === 9) {
                if (duplicar) {
                    setVehiculoNueveDuplicar(true);
                } else {
                    setVehiculoNueveCrear(true);
                }
                setVehiculoNueve(true);
            } else if (control === 10) {
                if (duplicar) {
                    setVehiculoDiezDuplicar(true);
                } else {
                    setVehiculoDiezCrear(true);
                }
                setVehiculoDiez(true);
            }

            setAgregarDatos(false);
        }
    }, [agregarDatos]);

    const datosCrearProducto = () => {
        //console.log("CONTADOR : ", contador);
        let nombre = " Un ";
    };

    const handleChangeGenerico = (selectedOptions) => {
        //alert("ENTRE")
        //console.log("OPCION GENERICOS : ", selectedOptions);
        //alert("GENERICO");
        if (selectedOptions === "Si") {
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
        setContador(control);

        if (control === 1) {
            setVehiculoUnoCrear(true);
            setVehiculoUno(true);
        } else if (control === 2) {
            setVehiculoDosCrear(true);
            setVehiculoDos(true);
        } else if (control === 3) {
            setVehiculoTresCrear(true);
            setVehiculoTres(true);
        } else if (control === 4) {
            setVehiculoCuatroCrear(true);
            setVehiculoCuatro(true);
        } else if (control === 5) {
            setVehiculoCincoCrear(true);
            setVehiculoCinco(true);
        } else if (control === 6) {
            setVehiculoSeisCrear(true);
            setVehiculoSeis(true);
        } else if (control === 7) {
            setVehiculoSieteCrear(true);
            setVehiculoSiete(true);
        } else if (control === 8) {
            setVehiculoOchoCrear(true);
            setVehiculoOcho(true);
        } else if (control === 9) {
            setVehiculoNueveCrear(true);
            setVehiculoNueve(true);
        } else if (control === 10) {
            setVehiculoDiezCrear(true);
            setVehiculoDiez(true);
        }

        setGenerico(selectedOptions);
        setMostrarDatosVehiculos(true);
    };

    const agregarDatosVehiculos = () => {
        //setMostrarDatosVehiculos(true);
        setAgregarDatos(true);
    };

    const crearVehiculos = () => {
        //setMostrarDatosVehiculos(true);
        setAgregarDatos(true);
        setNuevoVehiculo(true);
    };

    const agregarDatosLatoneria = () => {
        setShowIconoCerrarAbrir(true);
        setAgregarVehiculo(false);

        //setCerrarDatos("");
        setCerrarDatosDos("mt-1 datoscerrados");
        setIconCerrarUno("showcerrarabrir");
        setIconCerrarDos("form-control ps-form__input ml-20");
        setGenericoUno("Si");
        setLabelGenericoUno("Es genérico, sirve para varios vehículos.");
        setGenericoDos("No");
        setLabelGenericoDos("No es genérico, sirve para varios vehículos.");
        setMostrar(true);

        setShowModalLatoneria(true);
        setVehiculoUnoCrear(false);
        setVehiculoUnoSelecc(false);
        setVehiculoUnoEditar(false);
        setVehiculoUnoDuplicar(false);
        setVehiculoUnoUbicar(true);

        setVehiculoDosCrear(false);
        setVehiculoDosSelecc(false);
        setVehiculoDosEditar(false);
        setVehiculoDosDuplicar(false);
        setVehiculoDosUbicar(true);

        setVehiculoTresCrear(false);
        setVehiculoTresSelecc(false);
        setVehiculoTresEditar(false);
        setVehiculoTresDuplicar(false);
        setVehiculoTresUbicar(true);

        setVehiculoCuatroCrear(false);
        setVehiculoCuatroSelecc(false);
        setVehiculoCuatroEditar(false);
        setVehiculoCuatroDuplicar(false);
        setVehiculoCuatroUbicar(true);

        setVehiculoCincoCrear(false);
        setVehiculoCincoSelecc(false);
        setVehiculoCincoEditar(false);
        setVehiculoCincoDuplicar(false);
        setVehiculoCincoUbicar(true);

        setVehiculoSeisCrear(false);
        setVehiculoSeisSelecc(false);
        setVehiculoSeisEditar(false);
        setVehiculoSeisDuplicar(false);
        setVehiculoSeisUbicar(true);

        setVehiculoSieteCrear(false);
        setVehiculoSieteSelecc(false);
        setVehiculoSieteEditar(false);
        setVehiculoSieteDuplicar(false);
        setVehiculoSieteUbicar(true);

        setVehiculoOchoCrear(false);
        setVehiculoOchoSelecc(false);
        setVehiculoOchoEditar(false);
        setVehiculoOchoDuplicar(false);
        setVehiculoOchoUbicar(true);

        setVehiculoNueveCrear(false);
        setVehiculoNueveSelecc(false);
        setVehiculoNueveEditar(false);
        setVehiculoNueveDuplicar(false);
        setVehiculoNueveUbicar(true);

        setVehiculoDiezCrear(false);
        setVehiculoDiezSelecc(false);
        setVehiculoDiezEditar(false);
        setVehiculoDiezDuplicar(false);
        setVehiculoDiezUbicar(true);

        const newDet = [];
        if (vehiculoUno) {
            let item = {
                tipoVehUno: tipoVehUno,
                marcaVehUno: marcaVehUno,
                annoVehUno: annoVehUno,
                modeloVehUno: modeloVehUno,
                cilindrajeVehUno: cilindrajeVehUno,
                carroceriaVehUno: carroceriaVehUno,
                transmisionVehUno: transmisionVehUno,
                combustibleVehUno: combustibleVehUno,
                traccionVehUno: traccionVehUno,
            };
            newDet.push(item);
        }

        if (vehiculoDos) {
            let item = {
                tipoVehDos: tipoVehDos,
                marcaVehDos: marcaVehDos,
                annoVehDos: annoVehDos,
                modeloVehDos: modeloVehDos,
                cilindrajeVehDos: cilindrajeVehDos,
                carroceriaVehDos: carroceriaVehDos,
                transmisionVehDos: transmisionVehDos,
                combustibleVehDos: combustibleVehDos,
                traccionVehDos: traccionVehDos,
            };
            newDet.push(item);
        }

        if (vehiculoTres) {
            let item = {
                tipoVehTres: tipoVehTres,
                marcaVehTres: marcaVehTres,
                annoVehTres: annoVehTres,
                modeloVehTres: modeloVehTres,
                cilindrajeVehTres: cilindrajeVehTres,
                carroceriaVehTres: carroceriaVehTres,
                transmisionVehTres: transmisionVehTres,
                combustibleVehTres: combustibleVehTres,
                traccionVehTres: traccionVehTres,
            };
            newDet.push(item);
        }

        if (vehiculoCuatro) {
            let item = {
                tipoVehCuatro: tipoVehCuatro,
                marcaVehCuatro: marcaVehCuatro,
                annoVehCuatro: annoVehCuatro,
                modeloVehCuatro: modeloVehCuatro,
                cilindrajeVehCuatro: cilindrajeVehCuatro,
                carroceriaVehCuatro: carroceriaVehCuatro,
                transmisionVehCuatro: transmisionVehCuatro,
                combustibleVehCuatro: combustibleVehCuatro,
                traccionVehCuatro: traccionVehCuatro,
            };
            newDet.push(item);
        }

        if (vehiculoCinco) {
            let item = {
                tipoVehCinco: tipoVehCinco,
                marcaVehCinco: marcaVehCinco,
                annoVehCinco: annoVehCinco,
                modeloVehCinco: modeloVehCinco,
                cilindrajeVehCinco: cilindrajeVehCinco,
                carroceriaVehCinco: carroceriaVehCinco,
                transmisionVehCinco: transmisionVehCinco,
                combustibleVehCinco: combustibleVehCinco,
                traccionVehCinco: traccionVehCinco,
            };
            newDet.push(item);
        }

        if (vehiculoSeis) {
            let item = {
                tipoVehSeis: tipoVehSeis,
                marcaVehSeis: marcaVehSeis,
                annoVehSeis: annoVehSeis,
                modeloVehSeis: modeloVehSeis,
                cilindrajeVehSeis: cilindrajeVehSeis,
                carroceriaVehSeis: carroceriaVehSeis,
                transmisionVehSeis: transmisionVehSeis,
                combustibleVehSeis: combustibleVehSeis,
                traccionVehSeis: traccionVehSeis,
            };
            newDet.push(item);
        }

        if (vehiculoSiete) {
            let item = {
                tipoVehSiete: tipoVehSiete,
                marcaVehSiete: marcaVehSiete,
                annoVehSiete: annoVehSiete,
                modeloVehSiete: modeloVehSiete,
                cilindrajeVehSiete: cilindrajeVehSiete,
                carroceriaVehSiete: carroceriaVehSiete,
                transmisionVehSiete: transmisionVehSiete,
                combustibleVehSiete: combustibleVehSiete,
                traccionVehSiete: traccionVehSiete,
            };
            newDet.push(item);
        }

        if (vehiculoOcho) {
            let item = {
                tipoVehOcho: tipoVehOcho,
                marcaVehOcho: marcaVehOcho,
                annoVehOcho: annoVehOcho,
                modeloVehOcho: modeloVehOcho,
                cilindrajeVehOcho: cilindrajeVehOcho,
                carroceriaVehOcho: carroceriaVehOcho,
                transmisionVehOcho: transmisionVehOcho,
                combustibleVehOcho: combustibleVehOcho,
                traccionVehOcho: traccionVehOcho,
            };
            newDet.push(item);
        }

        if (vehiculoNueve) {
            let item = {
                tipoVehNueve: tipoVehNueve,
                marcaVehNueve: marcaVehNueve,
                annoVehNueve: annoVehNueve,
                modeloVehNueve: modeloVehNueve,
                cilindrajeVehNueve: cilindrajeVehNueve,
                carroceriaVehNueve: carroceriaVehNueve,
                transmisionVehNueve: transmisionVehNueve,
                combustibleVehNueve: combustibleVehNueve,
                traccionVehNueve: traccionVehNueve,
            };
            newDet.push(item);
        }

        if (vehiculoDiez) {
            let item = {
                tipoVehDiez: tipoVehDiez,
                marcaVehDiez: marcaVehDiez,
                annoVehDiez: annoVehDiez,
                modeloVehDiez: modeloVehDiez,
                cilindrajeVehDiez: cilindrajeVehDiez,
                carroceriaVehDiez: carroceriaVehDiez,
                transmisionVehDiez: transmisionVehDiez,
                combustibleVehDiez: combustibleVehDiez,
                traccionVehDiez: traccionVehDiez,
            };
            newDet.push(item);
        }
        localStorage.setItem("vehiculoscompatibles", JSON.stringify(newDet));
    };

    const agregarDatosGenerico = () => {
        location.reload();
        setShowIconoCerrarAbrir(false);
        setAgregarVehiculo(true);

        setCerrarDatosDos("mt-1 datoscerrados");
        setIconCerrarUno("showcerrarabrir");

        setIconCerrarDos("form-control ps-form__input ml-20");
        setGenericoUno("Si");
        setLabelGenericoUno("Es genérico, sirve para varios vehículos.");
        setGenericoDos("No");
        setLabelGenericoDos("No es genérico, sirve para varios vehículos.");
        setMostrar(true);
    };

    const mostrarVehiculos = () => {
        setAgregarVehiculo(true);
        setShowIconoCerrarAbrir(false);
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

        setMostrar(false);

        setVehiculoUnoSelecc(true);
        setVehiculoDosSelecc(true);
        setVehiculoTresSelecc(true);
        setVehiculoCuatroSelecc(true);
        setVehiculoCincoSelecc(true);
        setVehiculoSeisSelecc(true);
        setVehiculoSieteSelecc(true);
        setVehiculoOchoSelecc(true);
        setVehiculoNueveSelecc(true);
        setVehiculoDiezSelecc(true);
    };

    const ingresarDatosProductos = () => {
        setShowDatosProductos(true);
        setSelecDatosProducto(true);
        setShowModalDatosProducto(true);
    };
   
    //setMostrarDatosMotor(true);
    return (
        <Container title="Mi Cuenta">
            <div className="tamañospinner">{loading ? <Loading /> : null}</div>
            {/* <div className="ps-page ps-page--inner ml-250">  */}
            <div className="mt-40">
                <div className="container">
                    <Row className="mt-5">
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <h2 className="ps-form__title">Crear Producto</h2>
                        </Col>

                        <Col xl={9} lg={9} md={9} xs={9}>
                            <div className="ml-50 cajaadvertenciavehiculoscompatiblesproducto">
                                <i
                                    class="ml-570 fa tamañoiconoadvertencia fa-exclamation-triangle"
                                    aria-hidden="true"></i>
                                <h3 className="tituloadvertenciaproductos mtmenos30">
                                    Antes de empezar, debes saber que!
                                </h3>

                                <br />
                                <h3 className="textoadvertenciaproductos">
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
                                <form>
                                    <div className="ps-form--review">
                                        {showCreateProduct ? (
                                            <div>
                                                <div className={cerrarDatos}>
                                                    {generico === "No" ? (
                                                        <div>
                                                            <br />
                                                            <br />
                                                            <h3 className="tituloadvertenciaproductos mtmenos30">
                                                                Identificación
                                                                de los vehículos
                                                                compatibles
                                                            </h3>
                                                            <br />

                                                            <Row>
                                                                <Col
                                                                    xl={10}
                                                                    lg={10}
                                                                    md={10}
                                                                    xs={10}>
                                                                    <div>
                                                                        <select
                                                                            //disabled="disabled"
                                                                            disabled={
                                                                                mostrar
                                                                            }
                                                                            className={
                                                                                cerrarDatosDos
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleChangeGenerico(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }>
                                                                            {productogenerico &&
                                                                                productogenerico.map(
                                                                                    (
                                                                                        itemselect
                                                                                    ) => {
                                                                                        return (
                                                                                            <option className="mlmenos"
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
                                                                {showIconoCerrarAbrir ? (
                                                                    <Col
                                                                        xl={1}
                                                                        lg={1}
                                                                        md={1}
                                                                        xs={1}
                                                                        className="mlmenos110">
                                                                        <div
                                                                            className={
                                                                                iconoCerrarUno
                                                                            }>
                                                                            <i
                                                                                onClick={() =>
                                                                                    mostrarVehiculos()
                                                                                }
                                                                                class="mt-1 fa fa-angle-down d-flex justify-content-center"
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
                                                                                    className="ubicartooltipproducto"
                                                                                    id="overlay-example"
                                                                                    {...props}>
                                                                                    <h3 className="tamañotextotooltipproducto">
                                                                                        {" "}
                                                                                        Mostrar
                                                                                        Vehiculos{" "}
                                                                                    </h3>
                                                                                </Tooltip>
                                                                            )}
                                                                        </Overlay>
                                                                    </Col>
                                                                ) : (
                                                                    <Col
                                                                        xl={1}
                                                                        lg={1}
                                                                        md={1}
                                                                        xs={1}>
                                                                        <div
                                                                            className={
                                                                                iconoCerrarDos
                                                                            }>
                                                                            <i
                                                                                onClick={() => {
                                                                                    setShowModalGenerico(
                                                                                        !showModalGenerico
                                                                                    );
                                                                                }}
                                                                                class="fa fa-info d-flex justify-content-center"
                                                                                aria-hidden="true"></i>
                                                                        </div>
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </div>
                                                    ) : null}

                                                    {generico ? (
                                                        generico === "No" ? (
                                                            <div>
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
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoDos ? (
                                                                            <DatosVehiculosDos
                                                                                vehiculoDosCrear={
                                                                                    vehiculoDosCrear
                                                                                }
                                                                                setVehiculoDosCrear={
                                                                                    setVehiculoDosCrear
                                                                                }
                                                                                vehiculoDosSelecc={
                                                                                    vehiculoDosSelecc
                                                                                }
                                                                                setVehiculoDosSelecc={
                                                                                    setVehiculoDosSelecc
                                                                                }
                                                                                vehiculoDosEditar={
                                                                                    vehiculoDosEditar
                                                                                }
                                                                                setVehiculoDosEditar={
                                                                                    setVehiculoDosEditar
                                                                                }
                                                                                vehiculoDosDuplicar={
                                                                                    vehiculoDosDuplicar
                                                                                }
                                                                                setVehiculoDosDuplicar={
                                                                                    setVehiculoDosDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoDosUbicar={
                                                                                    vehiculoDosUbicar
                                                                                }
                                                                                setVehiculoDosUbicar={
                                                                                    setVehiculoDosUbicar
                                                                                }
                                                                                setTipoVehDos={
                                                                                    setTipoVehDos
                                                                                }
                                                                                setMarcaVehDos={
                                                                                    setMarcaVehDos
                                                                                }
                                                                                setAnnoVehDos={
                                                                                    setAnnoVehDos
                                                                                }
                                                                                setModeloVehDos={
                                                                                    setModeloVehDos
                                                                                }
                                                                                setCarroceriaVehDos={
                                                                                    setCarroceriaVehDos
                                                                                }
                                                                                setcilindrajeVehDos={
                                                                                    setcilindrajeVehDos
                                                                                }
                                                                                settransmisionVehDos={
                                                                                    settransmisionVehDos
                                                                                }
                                                                                setcombustibleVehDos={
                                                                                    setcombustibleVehDos
                                                                                }
                                                                                settraccionVehDos={
                                                                                    settraccionVehDos
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoTres ? (
                                                                            <DatosVehiculosTres
                                                                                vehiculoTresCrear={
                                                                                    vehiculoTresCrear
                                                                                }
                                                                                setVehiculoTresCrear={
                                                                                    setVehiculoTresCrear
                                                                                }
                                                                                vehiculoTresSelecc={
                                                                                    vehiculoTresSelecc
                                                                                }
                                                                                setVehiculoTresSelecc={
                                                                                    setVehiculoTresSelecc
                                                                                }
                                                                                vehiculoTresEditar={
                                                                                    vehiculoTresEditar
                                                                                }
                                                                                setVehiculoTresEditar={
                                                                                    setVehiculoTresEditar
                                                                                }
                                                                                vehiculoTresDuplicar={
                                                                                    vehiculoTresDuplicar
                                                                                }
                                                                                setVehiculoTresDuplicar={
                                                                                    setVehiculoTresDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoTresUbicar={
                                                                                    vehiculoTresUbicar
                                                                                }
                                                                                setVehiculoTresUbicar={
                                                                                    setVehiculoTresUbicar
                                                                                }
                                                                                setTipoVehTres={
                                                                                    setTipoVehTres
                                                                                }
                                                                                setMarcaVehTres={
                                                                                    setMarcaVehTres
                                                                                }
                                                                                setAnnoVehTres={
                                                                                    setAnnoVehTres
                                                                                }
                                                                                setModeloVehTres={
                                                                                    setModeloVehTres
                                                                                }
                                                                                setCarroceriaVehTres={
                                                                                    setCarroceriaVehTres
                                                                                }
                                                                                setcilindrajeVehTres={
                                                                                    setcilindrajeVehTres
                                                                                }
                                                                                settransmisionVehTres={
                                                                                    settransmisionVehTres
                                                                                }
                                                                                setcombustibleVehTres={
                                                                                    setcombustibleVehTres
                                                                                }
                                                                                settraccionVehTres={
                                                                                    settraccionVehTres
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoCuatro ? (
                                                                            <DatosVehiculosCuatro
                                                                                vehiculoCuatroCrear={
                                                                                    vehiculoCuatroCrear
                                                                                }
                                                                                setVehiculoCuatroCrear={
                                                                                    setVehiculoCuatroCrear
                                                                                }
                                                                                vehiculoCuatroSelecc={
                                                                                    vehiculoCuatroSelecc
                                                                                }
                                                                                setVehiculoCuatroSelecc={
                                                                                    setVehiculoCuatroSelecc
                                                                                }
                                                                                vehiculoCuatroEditar={
                                                                                    vehiculoCuatroEditar
                                                                                }
                                                                                setVehiculoCuatroEditar={
                                                                                    setVehiculoCuatroEditar
                                                                                }
                                                                                vehiculoCuatroDuplicar={
                                                                                    vehiculoCuatroDuplicar
                                                                                }
                                                                                setVehiculoCuatroDuplicar={
                                                                                    setVehiculoTresDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoCuatroUbicar={
                                                                                    vehiculoCuatroUbicar
                                                                                }
                                                                                setVehiculoCuatroUbicar={
                                                                                    setVehiculoCuatroUbicar
                                                                                }
                                                                                setTipoVehCuatro={
                                                                                    setTipoVehCuatro
                                                                                }
                                                                                setMarcaVehCuatro={
                                                                                    setMarcaVehCuatro
                                                                                }
                                                                                setAnnoVehCuatro={
                                                                                    setAnnoVehCuatro
                                                                                }
                                                                                setModeloVehCuatro={
                                                                                    setModeloVehCuatro
                                                                                }
                                                                                setCarroceriaVehCuatro={
                                                                                    setCarroceriaVehCuatro
                                                                                }
                                                                                setcilindrajeVehCuatro={
                                                                                    setcilindrajeVehCuatro
                                                                                }
                                                                                settransmisionVehCuatro={
                                                                                    settransmisionVehCuatro
                                                                                }
                                                                                setcombustibleVehCuatro={
                                                                                    setcombustibleVehCuatro
                                                                                }
                                                                                settraccionVehCuatro={
                                                                                    settraccionVehCuatro
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoCinco ? (
                                                                            <DatosVehiculosCinco
                                                                                vehiculoCincoCrear={
                                                                                    vehiculoCincoCrear
                                                                                }
                                                                                setVehiculoCincoCrear={
                                                                                    setVehiculoCincoCrear
                                                                                }
                                                                                vehiculoCincoSelecc={
                                                                                    vehiculoCincoSelecc
                                                                                }
                                                                                setVehiculoCincoSelecc={
                                                                                    setVehiculoCincoSelecc
                                                                                }
                                                                                vehiculoCincoEditar={
                                                                                    vehiculoCincoEditar
                                                                                }
                                                                                setVehiculoCincoEditar={
                                                                                    setVehiculoCincoEditar
                                                                                }
                                                                                vehiculoCincoDuplicar={
                                                                                    vehiculoCincoDuplicar
                                                                                }
                                                                                setVehiculoCincoDuplicar={
                                                                                    setVehiculoCincoDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoCincoUbicar={
                                                                                    vehiculoCincoUbicar
                                                                                }
                                                                                setVehiculoCincoUbicar={
                                                                                    setVehiculoCincoUbicar
                                                                                }
                                                                                setTipoVehCinco={
                                                                                    setTipoVehCinco
                                                                                }
                                                                                setMarcaVehCinco={
                                                                                    setMarcaVehCinco
                                                                                }
                                                                                setAnnoVehCinco={
                                                                                    setAnnoVehCinco
                                                                                }
                                                                                setModeloVehCinco={
                                                                                    setModeloVehCinco
                                                                                }
                                                                                setCarroceriaVehCinco={
                                                                                    setCarroceriaVehCinco
                                                                                }
                                                                                setcilindrajeVehCinco={
                                                                                    setcilindrajeVehCinco
                                                                                }
                                                                                settransmisionVehCinco={
                                                                                    settransmisionVehCinco
                                                                                }
                                                                                setcombustibleVehCinco={
                                                                                    setcombustibleVehCinco
                                                                                }
                                                                                settraccionVehCinco={
                                                                                    settraccionVehCinco
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoSeis ? (
                                                                            <DatosVehiculosSeis
                                                                                vehiculoSeisCrear={
                                                                                    vehiculoSeisCrear
                                                                                }
                                                                                setVehiculoSeisCrear={
                                                                                    setVehiculoSeisCrear
                                                                                }
                                                                                vehiculoSeisSelecc={
                                                                                    vehiculoSeisSelecc
                                                                                }
                                                                                setVehiculoSeisSelecc={
                                                                                    setVehiculoSeisSelecc
                                                                                }
                                                                                vehiculoSeisEditar={
                                                                                    vehiculoSeisEditar
                                                                                }
                                                                                setVehiculoSeisEditar={
                                                                                    setVehiculoSeisEditar
                                                                                }
                                                                                vehiculoSeisDuplicar={
                                                                                    vehiculoSeisDuplicar
                                                                                }
                                                                                setVehiculoSeisDuplicar={
                                                                                    setVehiculoSeisDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoSeisUbicar={
                                                                                    vehiculoSeisUbicar
                                                                                }
                                                                                setVehiculoSeisUbicar={
                                                                                    setVehiculoSeisUbicar
                                                                                }
                                                                                setTipoVehSeis={
                                                                                    setTipoVehSeis
                                                                                }
                                                                                setMarcaVehSeis={
                                                                                    setMarcaVehSeis
                                                                                }
                                                                                setAnnoVehSeis={
                                                                                    setAnnoVehSeis
                                                                                }
                                                                                setModeloVehSeis={
                                                                                    setModeloVehSeis
                                                                                }
                                                                                setCarroceriaVehSeis={
                                                                                    setCarroceriaVehSeis
                                                                                }
                                                                                setcilindrajeVehSeis={
                                                                                    setcilindrajeVehSeis
                                                                                }
                                                                                settransmisionVehSeis={
                                                                                    settransmisionVehSeis
                                                                                }
                                                                                setcombustibleVehSeis={
                                                                                    setcombustibleVehSeis
                                                                                }
                                                                                settraccionVehSeis={
                                                                                    settraccionVehSeis
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoSiete ? (
                                                                            <DatosVehiculosSiete
                                                                                vehiculoSieteCrear={
                                                                                    vehiculoSieteCrear
                                                                                }
                                                                                setVehiculoSieteCrear={
                                                                                    setVehiculoSieteCrear
                                                                                }
                                                                                vehiculoSieteSelecc={
                                                                                    vehiculoSieteSelecc
                                                                                }
                                                                                setVehiculoSieteSelecc={
                                                                                    setVehiculoSieteSelecc
                                                                                }
                                                                                vehiculoSieteEditar={
                                                                                    vehiculoSieteEditar
                                                                                }
                                                                                setVehiculoSieteEditar={
                                                                                    setVehiculoSieteEditar
                                                                                }
                                                                                vehiculoSieteDuplicar={
                                                                                    vehiculoSieteDuplicar
                                                                                }
                                                                                setVehiculoSieteDuplicar={
                                                                                    setVehiculoSieteDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoSieteUbicar={
                                                                                    vehiculoSieteUbicar
                                                                                }
                                                                                setVehiculoSieteUbicar={
                                                                                    setVehiculoSieteUbicar
                                                                                }
                                                                                setTipoVehSiete={
                                                                                    setTipoVehSiete
                                                                                }
                                                                                setMarcaVehSiete={
                                                                                    setMarcaVehSiete
                                                                                }
                                                                                setAnnoVehSiete={
                                                                                    setAnnoVehSiete
                                                                                }
                                                                                setModeloVehSiete={
                                                                                    setModeloVehSiete
                                                                                }
                                                                                setCarroceriaVehSiete={
                                                                                    setCarroceriaVehSiete
                                                                                }
                                                                                setcilindrajeVehSiete={
                                                                                    setcilindrajeVehSiete
                                                                                }
                                                                                settransmisionVehSiete={
                                                                                    settransmisionVehSiete
                                                                                }
                                                                                setcombustibleVehSiete={
                                                                                    setcombustibleVehSiete
                                                                                }
                                                                                settraccionVehSiete={
                                                                                    settraccionVehSiete
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoOcho ? (
                                                                            <DatosVehiculosOcho
                                                                                vehiculoOchoCrear={
                                                                                    vehiculoOchoCrear
                                                                                }
                                                                                setVehiculoOchoCrear={
                                                                                    setVehiculoOchoCrear
                                                                                }
                                                                                vehiculoOchoSelecc={
                                                                                    vehiculoOchoSelecc
                                                                                }
                                                                                setVehiculoOchoSelecc={
                                                                                    setVehiculoOchoSelecc
                                                                                }
                                                                                vehiculoOchoEditar={
                                                                                    vehiculoOchoEditar
                                                                                }
                                                                                setVehiculoOchoEditar={
                                                                                    setVehiculoOchoEditar
                                                                                }
                                                                                vehiculoOchoDuplicar={
                                                                                    vehiculoOchoDuplicar
                                                                                }
                                                                                setVehiculoOchoDuplicar={
                                                                                    setVehiculoOchoDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoOchoUbicar={
                                                                                    vehiculoOchoUbicar
                                                                                }
                                                                                setVehiculoOchoUbicar={
                                                                                    setVehiculoOchoUbicar
                                                                                }
                                                                                setTipoVehOcho={
                                                                                    setTipoVehOcho
                                                                                }
                                                                                setMarcaVehOcho={
                                                                                    setMarcaVehOcho
                                                                                }
                                                                                setAnnoVehOcho={
                                                                                    setAnnoVehOcho
                                                                                }
                                                                                setModeloVehOcho={
                                                                                    setModeloVehOcho
                                                                                }
                                                                                setCarroceriaVehOcho={
                                                                                    setCarroceriaVehOcho
                                                                                }
                                                                                setcilindrajeVehOcho={
                                                                                    setcilindrajeVehOcho
                                                                                }
                                                                                settransmisionVehOcho={
                                                                                    settransmisionVehOcho
                                                                                }
                                                                                setcombustibleVehOcho={
                                                                                    setcombustibleVehOcho
                                                                                }
                                                                                settraccionVehOcho={
                                                                                    settraccionVehOcho
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoNueve ? (
                                                                            <DatosVehiculosNueve
                                                                                vehiculoNueveCrear={
                                                                                    vehiculoNueveCrear
                                                                                }
                                                                                setVehiculoNueveCrear={
                                                                                    setVehiculoNueveCrear
                                                                                }
                                                                                vehiculoNueveSelecc={
                                                                                    vehiculoNueveSelecc
                                                                                }
                                                                                setVehiculoNueveSelecc={
                                                                                    setVehiculoNueveSelecc
                                                                                }
                                                                                vehiculoNueveEditar={
                                                                                    vehiculoNueveEditar
                                                                                }
                                                                                setVehiculoNueveEditar={
                                                                                    setVehiculoNueveEditar
                                                                                }
                                                                                vehiculoNueveDuplicar={
                                                                                    vehiculoNueveDuplicar
                                                                                }
                                                                                setVehiculoNueveDuplicar={
                                                                                    setVehiculoNueveDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoNueveUbicar={
                                                                                    vehiculoNueveUbicar
                                                                                }
                                                                                setVehiculoNueveUbicar={
                                                                                    setVehiculoNueveUbicar
                                                                                }
                                                                                setTipoVehNueve={
                                                                                    setTipoVehNueve
                                                                                }
                                                                                setMarcaVehNueve={
                                                                                    setMarcaVehNueve
                                                                                }
                                                                                setAnnoVehNueve={
                                                                                    setAnnoVehNueve
                                                                                }
                                                                                setModeloVehNueve={
                                                                                    setModeloVehNueve
                                                                                }
                                                                                setCarroceriaVehNueve={
                                                                                    setCarroceriaVehNueve
                                                                                }
                                                                                setcilindrajeVehNueve={
                                                                                    setcilindrajeVehNueve
                                                                                }
                                                                                settransmisionVehNueve={
                                                                                    settransmisionVehNueve
                                                                                }
                                                                                setcombustibleVehNueve={
                                                                                    setcombustibleVehNueve
                                                                                }
                                                                                settraccionVehNueve={
                                                                                    settraccionVehNueve
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoDiez ? (
                                                                            <DatosVehiculosDiez
                                                                                vehiculoDiezCrear={
                                                                                    vehiculoDiezCrear
                                                                                }
                                                                                setVehiculoDiezCrear={
                                                                                    setVehiculoDiezCrear
                                                                                }
                                                                                vehiculoDiezSelecc={
                                                                                    vehiculoDiezSelecc
                                                                                }
                                                                                setVehiculoDiezSelecc={
                                                                                    setVehiculoDiezSelecc
                                                                                }
                                                                                vehiculoDiezEditar={
                                                                                    vehiculoDiezEditar
                                                                                }
                                                                                setVehiculoDiezEditar={
                                                                                    setVehiculoDiezEditar
                                                                                }
                                                                                vehiculoDiezDuplicar={
                                                                                    vehiculoDiezDuplicar
                                                                                }
                                                                                setVehiculoDiezDuplicar={
                                                                                    setVehiculoDiezDuplicar
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
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoDiezUbicar={
                                                                                    vehiculoDiezUbicar
                                                                                }
                                                                                setVehiculoDiezUbicar={
                                                                                    setVehiculoDiezUbicar
                                                                                }
                                                                                setTipoVehDiez={
                                                                                    setTipoVehDiez
                                                                                }
                                                                                setMarcaVehDiez={
                                                                                    setMarcaVehDiez
                                                                                }
                                                                                setAnnoVehDiez={
                                                                                    setAnnoVehDiez
                                                                                }
                                                                                setModeloVehDiez={
                                                                                    setModeloVehDiez
                                                                                }
                                                                                setCarroceriaVehDiez={
                                                                                    setCarroceriaVehDiez
                                                                                }
                                                                                setcilindrajeVehDiez={
                                                                                    setcilindrajeVehDiez
                                                                                }
                                                                                settransmisionVehDiez={
                                                                                    settransmisionVehDiez
                                                                                }
                                                                                setcombustibleVehDiez={
                                                                                    setcombustibleVehDiez
                                                                                }
                                                                                settraccionVehDiez={
                                                                                    settraccionVehDiez
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
                                                                        <h3 className="tituloadvertenciaproductos mtmenos30">
                                                                            Identificación
                                                                            de
                                                                            los
                                                                            vehículos
                                                                            compatibles
                                                                        </h3>
                                                                        <br />
                                                                        <Row>
                                                                            <Col
                                                                                xl={
                                                                                    7
                                                                                }
                                                                                lg={
                                                                                    7
                                                                                }
                                                                                md={
                                                                                    7
                                                                                }
                                                                                xs={
                                                                                    7
                                                                                }>
                                                                                <div
                                                                                    className="mt-1 datoscerrados"
                                                                                    disabled={
                                                                                        true
                                                                                    }>
                                                                                    <h3 className="textoubicacionproducto">
                                                                                        Es
                                                                                        genérico
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
                                                                                className="ml-53 mtmenos2">
                                                                                <div className="showcerrarabrir">
                                                                                    <i
                                                                                        class="mt-2 fa fa-angle-down d-flex justify-content-center"
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
                                                                                            className="ubicartooltipproducto"
                                                                                            id="overlay-example"
                                                                                            {...props}>
                                                                                            <h3 className="tamañotextotooltipproducto">
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
                                                                        Crear
                                                                        vehículo
                                                                    </h3>
                                                                }
                                                            </div>

                                                            <div
                                                                className="ml-490 ps-btn botonazul mt-15"
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
                                                    ) : null}
                                                </div>

                                                {generico == "Si" ? (
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
                                                            categoria={
                                                                categoria
                                                            }
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
                                                                className="custom-select ps-form__labelselect colorbase"
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
                                                        Ahora vamos a
                                                        identificar las
                                                        caracteristícas del
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
                                                                    Seleccionaste
                                                                    el tipo de
                                                                    Vehículo!
                                                                </h3>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="ml-140">
                            {showModalLatoneria ? (
                                <DatosLatoneria
                                    setShowModalLatoneria={
                                        setShowModalLatoneria
                                    }
                                    showModalLatoneria={showModalLatoneria}
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

function ModalInformacionGenericos({ shown, close }) {
    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col
                            xl={7}
                            lg={7}
                            md={7}
                            sm={7}
                            className="ml-160 mb-10">
                            <div className="tamañotextocrearproductoinfo">
                                PRODUCTOS GENERICOS
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-30"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="ml-20 mr-30 textomodalinfoproductos">
                    <h2>
                        {" "}
                        Un repuesto genérico es aquel que puede ser instalado en
                        diferentes marcas de Vehiculos Ejemplo: Direccionales
                        para motocicletas son repuestos Genericos, y pueden ser
                        Instalados en diferentes marcas de motos.
                    </h2>
                    <hr />
                    <h2>
                        Repuestos Homologados o NO Genericos, solo pueden ser
                        instalados en el Veh y marca para el cual fue fabricado,
                        estos repuestos los proveen los concesionarios o
                        distribuidores Autorizados.
                    </h2>
                </div>
            </div>
        </div>
    ) : null;
}

function ModalInformacionPorUnoVarios({ shown, close }) {
    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col
                            xl={9}
                            lg={9}
                            md={9}
                            sm={9}
                            className="ml-60 mb-10">
                            <div className="tamañotextocrearproductoinfo">
                                PRODUCTOS ES PARA UNO O VARIOS VEHÍCULOS
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-30"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="ml-20 mr-30 textomodalinfoproductos">
                    <h2>
                        {" "}
                        El producto a vender puede ser utilizado en varios
                        vehículos de la misma marca o modelo, para varios años,
                        línea o cilindraje
                    </h2>
                    <hr />
                    <h2>
                        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        YYYYYYYYYYYYYYYYYYYYYYYYYYYYY
                    </h2>
                </div>
            </div>
        </div>
    ) : null;
}

function DatosLatoneria(props) {
    const {
        setShowModalLatoneria,
        showModalLatoneria,
        seleccionoUbicacionProducto,
        setSeleccionoUbicacionProducto,
        setShowModalDatosProducto,
        showModalDatosProducto,
        setShowDatosProductos,
        setSelecDatosProducto,
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);

    const [nombreUbicacionExterior, setnombreUbicacionExterior] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionInterior, setnombreUbicacionInterior] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionTrenMotriz, setnombreUbicacionTrenMotriz] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");

    const [nombreUbicacionIzquierda, setnombreUbicacionIzquierda] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionCentro, setnombreUbicacionCentro] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionDerecha, setnombreUbicacionDerecha] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionIzquierdaInfo, setnombreUbicacionIzquierdaInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");
    const [nombreUbicacionCentroInfo, setnombreUbicacionCentroInfo] = useState(
        "botonpartesvehiculoinfo mlmenos1 mt-2"
    );
    const [nombreUbicacionDerechaInfo, setnombreUbicacionDerechaInfo] =
        useState("botonpartesvehiculoinfo mlmenos1 mt-2");

    const [nombreUbicacionConsola, setnombreUbicacionConsola] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionAsiento, setnombreUbicacionAsiento] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionTecho, setnombreUbicacionTecho] = useState(
        "botonpartesvehiculo"
    );

    const [showImagenExterior, setShowImagenExterior] = useState(true);
    const [showImagenInterior, setShowImagenInterior] = useState(false);
    const [showImagenTrenMotriz, setShowImagenTrenMotriz] = useState(false);

    const [showImagenIzquierda, setShowImagenIzquierda] = useState(true);
    const [showImagenCentro, setShowImagenCentro] = useState(false);
    const [showImagenDerecha, setShowImagenDerecha] = useState(false);

    const [showImagenConsola, setShowImagenConsola] = useState(true);
    const [showImagenAsiento, setShowImagenAsiento] = useState(false);
    const [showImagenTecho, setShowImagenTecho] = useState(false);

    const [showImagenBaseMotorElectrico, setShowImagenBaseMotorElectrico] =
        useState(true);
    const [showImagenAireacondicionado, setShowImagenAireacondicionado] =
        useState(false);
    const [showImagenArranque, setShowImagenArranque] = useState(false);
    const [showImagenCaja, setShowImagenCaja] = useState(false);
    const [showImagenDireccion, setShowImagenDireccion] = useState(false);
    const [showImagenEmbrague, setShowImagenEmbrague] = useState(false);
    const [showImagenEscape, setShowImagenEscape] = useState(false);
    const [showImagenFrenos, setShowImagenFrenos] = useState(false);
    const [showImagenInyeccion, setShowImagenInyeccion] = useState(false);
    const [showImagenMotor, setShowImagenMotor] = useState(false);
    const [showImagenParabrisas, setShowImagenParabrisas] = useState(false);
    const [showImagenRefrigeracion, setShowImagenRefrigeracion] =
        useState(false);
    const [showImagenRefrigeracionCaja, setShowImagenRefrigeracionCaja] =
        useState(false);
    const [showImagenSistemElectrico, setShowImagenSistemElectrico] =
        useState(false);
    const [showImagenSistemElectricoMotor, setShowImagenSistemElectricoMotor] =
        useState(false);
    const [showImagenSuspension, setShowImagensuspension] = useState(false);
    const [showImagenTransmision, setShowImagenTransmision] = useState(false);

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [
        mostrarModalComentariosHabitaculo,
        setMostrarModalComentariosHabitaculo,
    ] = useState(false);
    const [textoPosicionHabitaculo, setTextoPosicionHabitaculo] = useState(0);

    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);
    //const [showModalDatosProducto, setShowModalDatosProducto] = useState(false);

    const [ubicarProducto, setUbicarProducto] = useState(0);

    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);
    const [
        mostrarModalComentariosUbicacionProducto,
        setMostrarModalComentariosUbicacionProducto,
    ] = useState(false);
    const [textoPosicionUbicacionProducto, setTextoPosicionUbicacionProducto] = useState(0);
    const [
        showModalPosicionProductoLatoneria,
        setShowModalPosicionProductoLatoneria,
    ] = useState(false);
    const [
        showModalComentariosPosicionIzquierdo,
        setShowModalComentariosPosicionIzquierdo,
    ] = useState(false);
    const [
        showModalComentariosPosicionCentro,
        setShowModalComentariosPosicionCentro,
    ] = useState(false);
    const [
        showModalComentariosPosicionDerecho,
        setShowModalComentariosPosicionDerecho,
    ] = useState(false);
    const [posicionProductoIzquierdo, setPosicionProductoIzquierdo] =
        useState(false);
    const [posicionProductoCentro, setPosicionProductoCentro] = useState(false);
    const [posicionProductoDerecho, setPosicionProductoDerecho] =
        useState(false);
    const [
        showModalPosicionProductoHabitaculo,
        setShowModalPosicionProductoHabitaculo,
    ] = useState(false);
    const [posicionProductoConsola, setPosicionProductoConsola] =
        useState(false);
    const [posicionProductoAsiento, setPosicionProductoAsiento] =
        useState(false);
    const [posicionProductoTecho, setPosicionProductoTecho] = useState(false);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    const [showModalPosicionProductoMotor, setShowModalPosicionProductoMotor] =
        useState(false);
    
    const [sistemaMotorSeleccionado, setSistemaMotorSeleccionado] = useState(0);
    const [ubicacionProducto, setUbicacionProducto] = useState(0);
    const [posicionProducto, setPosicionProducto] = useState(0);

    const mostrarModalDatosProducto = () => {
        const newDet = [];
        let item = {
            ubicacionProducto: ubicacionProducto,
            posicionProducto: posicionProducto,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(newDet)
        );

        setShowModalLatoneria(true);
        setSeleccionoUbicacionProducto(true);

        setAbrirCerarUbicarProducto(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);

        setShowDatosProductos(true);
    };

    const abrirDatosUbicacionProucto = () => {
        setShowModalLatoneria(true);
        setSeleccionoUbicacionProducto(true);
        setAbrirCerarUbicarProducto(false);
        setUbicarProductoLatoneria(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        setShowDatosProductos(false);
    };

    const mostrarComentariolatoneria = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(1);
    };

    const mostrarComentariohabitaculo = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(2);
    };

    const mostrarComentariomotor = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(3);
    };

    const SelecUbicarProductoLatoneria = () => {
        setUbicacionProducto(1);
        setUbicarProductoLatoneria(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        setShowImagenExterior(true);
        setShowImagenInterior(false);
        setShowImagenTrenMotriz(false);

        setShowModalPosicionProductoLatoneria(true);
        setUbicarProducto(1);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior("botonpartesvehiculo colorseleccionboton");
        setnombreUbicacionInterior("botonpartesvehiculo");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo");

        setnombreUbicacionExteriorInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2 colorseleccionboton"
        );
        setnombreUbicacionInteriorInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
        setnombreUbicacionTrenMotrizInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2"
        );
    };

    const SelecUbicarProductoHabitaculo = () => {
        setUbicacionProducto(2);
        setUbicarProductoHabitaculo(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        setShowImagenExterior(false);
        setShowImagenInterior(true);
        setShowImagenTrenMotriz(false);

        setShowModalPosicionProductoHabitaculo(true);
        setUbicarProducto(2);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior("botonpartesvehiculo");
        setnombreUbicacionInterior("botonpartesvehiculo  colorseleccionboton");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo");

        setnombreUbicacionExteriorInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
        setnombreUbicacionInteriorInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2  colorseleccionboton"
        );
        setnombreUbicacionTrenMotrizInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2"
        );
    };

    const SelecUbicarProductoMotor = () => {
        setUbicacionProducto(3);
        setUbicarProductoMotor(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        setShowImagenExterior(false);
        setShowImagenInterior(false);
        setShowImagenTrenMotriz(true);

        setShowModalPosicionProductoMotor(true);
        setUbicarProducto(3);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior("botonpartesvehiculo");
        setnombreUbicacionInterior("botonpartesvehiculo");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo colorseleccionboton");

        setnombreUbicacionExteriorInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
        setnombreUbicacionInteriorInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
        setnombreUbicacionTrenMotrizInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2  colorseleccionboton"
        );
    };

    const mostrarComentarioPosicionIzquierdo = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(4);
    };

    const mostrarComentarioPosicionCentro = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(5);
    };

    const mostrarComentarioPosicionDerecho = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(6);
    };

    const mostrarComentarioConsola = () => {
        setMostrarModalComentariosHabitaculo(true);
        setTextoPosicionHabitaculo(1);
    };

    const mostrarComentarioAsiento = () => {
        setMostrarModalComentariosHabitaculo(true);
        setTextoPosicionHabitaculo(2);
    };

    const mostrarComentarioTecho = () => {
        setMostrarModalComentariosHabitaculo(true);
        setTextoPosicionHabitaculo(3);
    };

    const SeleccionePosicionProductoIzquierdo = () => {
        setPosicionProducto(11);
        setPosicionProductoIzquierdo(true);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(false);
        setShowImagenIzquierda(true);
        setShowImagenCentro(false);
        setShowImagenDerecha(false);

        setnombreUbicacionIzquierda("botonpartesvehiculo colorseleccionboton");
        setnombreUbicacionCentro("botonpartesvehiculo");
        setnombreUbicacionDerecha("botonpartesvehiculo");
        setnombreUbicacionIzquierdaInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2 colorseleccionboton"
        );
        setnombreUbicacionCentroInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
        setnombreUbicacionDerechaInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
    };

    const SeleccionePosicionProductoCentro = () => {
        setPosicionProducto(12);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(true);
        setPosicionProductoDerecho(false);
        setShowImagenIzquierda(false);
        setShowImagenCentro(true);
        setShowImagenDerecha(false);

        setnombreUbicacionIzquierda("botonpartesvehiculo");
        setnombreUbicacionCentro("botonpartesvehiculo colorseleccionboton");
        setnombreUbicacionDerecha("botonpartesvehiculo");
        setnombreUbicacionIzquierdaInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2"
        );
        setnombreUbicacionCentroInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2 colorseleccionboton"
        );
        setnombreUbicacionDerechaInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
    };

    const SeleccionePosicionProductoDerecho = () => {
        setPosicionProducto(13);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(true);
        setShowImagenIzquierda(false);
        setShowImagenCentro(false);
        setShowImagenDerecha(true);

        setnombreUbicacionIzquierda("botonpartesvehiculo");
        setnombreUbicacionCentro("botonpartesvehiculo");
        setnombreUbicacionDerecha("botonpartesvehiculo  colorseleccionboton");
        setnombreUbicacionIzquierdaInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2"
        );
        setnombreUbicacionCentroInfo("botonpartesvehiculoinfo mlmenos1 mt-2");
        setnombreUbicacionDerechaInfo(
            "botonpartesvehiculoinfo mlmenos1 mt-2  colorseleccionboton"
        );
    };

    const SeleccioneConsola = () => {
        setPosicionProducto(21);
        setPosicionProductoConsola(true);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(false);
        setShowImagenConsola(true);
        setShowImagenAsiento(false);
        setShowImagenTecho(false);
    };

    const SeleccioneAsiento = () => {
        setPosicionProducto(22);
        setPosicionProductoConsola(false);
        setPosicionProductoAsiento(true);
        setPosicionProductoTecho(false);
        setShowImagenConsola(false);
        setShowImagenAsiento(true);
        setShowImagenTecho(false);
    };

    const SeleccioneTecho = () => {
        setPosicionProducto(23);
        setPosicionProductoConsola(false);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(true);
        setShowImagenConsola(false);
        setShowImagenAsiento(false);
        setShowImagenTecho(true);
    };

    const SeleccionBaseMotorElectrico = () => {
        setShowImagenBaseMotorElectrico(true);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaAireAcondicionado = () => {
        setSistemaMotorSeleccionado(1);
        setPosicionProducto(313);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(true);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionaArranque = () => {
        setSistemaMotorSeleccionado(2);
        setPosicionProducto(314);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(true);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionaCaja = () => {
        setSistemaMotorSeleccionado(3);
        setPosicionProducto(310);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(true);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionaDireccion = () => {
        setSistemaMotorSeleccionado(4);
        setPosicionProducto(309);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(true);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaEmbrague = () => {
        setSistemaMotorSeleccionado(5);
        setPosicionProducto(307);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(true);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaEscape = () => {
        setSistemaMotorSeleccionado(6);
        setPosicionProducto(315);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(true);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaFrenos = () => {
        setSistemaMotorSeleccionado(7);
        setPosicionProducto(305);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(true);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaInyeccion = () => {
        setSistemaMotorSeleccionado(8);
        setPosicionProducto(306);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(true);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaMotor = () => {
        setSistemaMotorSeleccionado(9);
        setPosicionProducto(301);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(true);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaParabrisas = () => {
        setSistemaMotorSeleccionado(10);
        setPosicionProducto(316);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(true);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaRefrigeracion = () => {
        setSistemaMotorSeleccionado(11);
        setPosicionProducto(308);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(true);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionaRefrigeracionCaja = () => {
        setSistemaMotorSeleccionado(12);
        setPosicionProducto(311);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(true);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionasistemaElectrico = () => {
        setSistemaMotorSeleccionado(13);
        setPosicionProducto(304);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(true);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionasistemaElectricoMotor = () => {
        setSistemaMotorSeleccionado(14);
        setPosicionProducto(302);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(true);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };
    const SeleccionaSuspension = () => {
        setSistemaMotorSeleccionado(15);
        setPosicionProducto(303);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(true);
        setShowImagenTransmision(false);
    };
    const SeleccionaTransmision = () => {
        setSistemaMotorSeleccionado(16);
        setPosicionProducto(312);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(true);
    };

    return (
        <div className="ps-page__header mtmenos60 ml-100 cajavehiculoscompatiblesproducto">
            <div>
                <div className="mb-20">
                    <h3 className="tituloadvertenciaproductosizquierda mb-15">
                        Ubicación del producto en tu vehículo
                    </h3>
                </div>
                {!abrirCerarUbicarProducto ? (
                    <div>
                        <div className="ml-60 mb-20">
                            <h3 className="textotuproductoestaen">
                                Tu producto está en:
                            </h3>
                        </div>
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <Row>
                                    <Col xl={10} lg={10} md={10} xs={10}>
                                        <Button
                                            className={nombreUbicacionExterior}
                                            onClick={
                                                SelecUbicarProductoLatoneria
                                            }>
                                            EXTERIOR
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <Button
                                            className={
                                                nombreUbicacionExteriorInfo
                                            }
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
                                </Row>
                                <Row>
                                    <Col xl={10} lg={10} md={10} xs={10}>
                                        <Button
                                            className={nombreUbicacionInterior}
                                            onClick={
                                                SelecUbicarProductoHabitaculo
                                            }>
                                            INTERIOR
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <Button
                                            className={
                                                nombreUbicacionInteriorInfo
                                            }
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
                                </Row>
                                <Row>
                                    <Col xl={10} lg={10} md={10} xs={10}>
                                        <Button
                                            className={
                                                nombreUbicacionTrenMotriz
                                            }
                                            onClick={SelecUbicarProductoMotor}>
                                            TREN MOTRIZ
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <Button
                                            className={
                                                nombreUbicacionTrenMotrizInfo
                                            }
                                            onClick={mostrarComentariomotor}>
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
                            </Col>
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                xs={5}
                                className="ml-150 mt-10">
                                <Card.Body>
                                    {showImagenExterior ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/exteriorbase.jpg"
                                            alt="Card image"
                                        />
                                    ) : showImagenInterior ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/interior.jpg"
                                            alt="Card image"
                                        />
                                    ) : showImagenTrenMotriz ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/trenmotrizbase.jpg"
                                            alt="Card image"
                                        />
                                    ) : null}
                                </Card.Body>
                            </Col>
                        </Row>
                    </div>
                ) : null}
            </div>
            
            <div className="App">
                <ModalComentariosUbicacionProducto
                    shown={mostrarModalComentariosUbicacionProducto}
                    close={() => {
                        setMostrarModalComentariosUbicacionProducto(false);
                    }}
                    texto={textoPosicionUbicacionProducto}
                />
            </div>
        
            {showModalDatosProducto ? (
                ubicarProductoLatoneria ? (
                    <div>
                        <div className="ml-55 mt-20 mb-20">
                            <Row>
                                <Col xl={10} lg={10} md={10} sm={10}>
                                    <h3 className="tituloadvertenciaproductosizquierda">
                                        Escoge la posicion en que se encuentra
                                        tu producto:
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                        <Row className="mlmenos20">
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <Row>
                                    <Col lg={10} xl={10} xs={10} md={10}>
                                        <Button
                                            className={nombreUbicacionIzquierda}
                                            onClick={
                                                SeleccionePosicionProductoIzquierdo
                                            }>
                                            IZQUIERDO
                                        </Button>
                                    </Col>
                                    <Col lg={1} xl={1} xs={1} md={1}>
                                        <Button
                                            className={
                                                nombreUbicacionIzquierdaInfo
                                            }
                                            onClick={
                                                mostrarComentarioPosicionIzquierdo
                                            }>
                                            {!posicionProductoIzquierdo ? (
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
                                    <Col lg={10} xl={10} xs={10} md={10}>
                                        <Button
                                            className={nombreUbicacionCentro}
                                            onClick={
                                                SeleccionePosicionProductoCentro
                                            }>
                                            CENTRO
                                        </Button>
                                    </Col>
                                    <Col lg={1} xl={1} xs={1} md={1}>
                                        <Button
                                            className={
                                                nombreUbicacionCentroInfo
                                            }
                                            onClick={
                                                mostrarComentarioPosicionCentro
                                            }>
                                            {!posicionProductoCentro ? (
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
                                    <Col lg={10} xl={10} xs={10} md={10}>
                                        <Button
                                            className={nombreUbicacionDerecha}
                                            onClick={
                                                SeleccionePosicionProductoDerecho
                                            }>
                                            DERECHA
                                        </Button>
                                    </Col>
                                    <Col lg={1} xl={1} xs={1} md={1}>
                                        <Button
                                            className={
                                                nombreUbicacionDerechaInfo
                                            }
                                            onClick={
                                                mostrarComentarioPosicionDerecho
                                            }>
                                            {!posicionProductoDerecho ? (
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
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                xs={5}
                                className="ml-150 mt-10">
                                <Card.Body>
                                    {showImagenIzquierda ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/izquierda.jpg"
                                            alt="Card image"
                                        />
                                    ) : showImagenCentro ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/centro.jpg"
                                            alt="Card image"
                                        />
                                    ) : showImagenDerecha ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/derecha.jpg"
                                            alt="Card image"
                                        />
                                    ) : null}
                                </Card.Body>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <div className="ml-470">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            mostrarModalDatosProducto()
                                        }>
                                        {" "}
                                        Siguiente
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : ubicarProductoHabitaculo ? (
                    <div>
                        <div className="ml-55">
                            <Row>
                                <Col
                                    xl={10}
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    className="mb-10">
                                    <h3 className="tituloadvertenciaproductosizquierda">
                                        Escoge la posicion en que se encuentra
                                        tu producto:
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <Row>
                                    <Col lg={9} xl={9} xs={9} md={9}>
                                        <Button
                                            className="botonpartesvehiculo"
                                            onClick={SeleccioneConsola}>
                                            CONSOLA
                                        </Button>
                                    </Col>
                                    <Col lg={1} xl={1} xs={1} md={1}>
                                        <Button
                                            className="botonpartesvehiculoinfo mt-2"
                                            onClick={mostrarComentarioConsola}>
                                            {!posicionProductoConsola ? (
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
                                    <Col lg={9} xl={9} xs={9} md={9}>
                                        <Button
                                            className="botonpartesvehiculo"
                                            onClick={SeleccioneAsiento}>
                                            ASIENTO
                                        </Button>
                                    </Col>
                                    <Col lg={1} xl={1} xs={1} md={1}>
                                        <Button
                                            className="botonpartesvehiculoinfo mt-2"
                                            onClick={mostrarComentarioAsiento}>
                                            {!posicionProductoAsiento ? (
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
                                    <Col lg={9} xl={9} xs={9} md={9}>
                                        <Button
                                            className="botonpartesvehiculo"
                                            onClick={SeleccioneTecho}>
                                            TECHO
                                        </Button>
                                    </Col>
                                    <Col lg={1} xl={1} xs={1} md={1}>
                                        <Button
                                            className="botonpartesvehiculoinfo mt-2"
                                            onClick={mostrarComentarioTecho}>
                                            {!posicionProductoTecho ? (
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
                            <Col xl={6} lg={6} md={6} xs={6} className="ml-45">
                                <Card.Body className="mtmenos25">
                                    {showImagenConsola ? (
                                        <Card.Img
                                            width={100}
                                            height={180}
                                            src="/imgcarrusel/createproducto/consola.jpg"
                                            alt="Card image"
                                        />
                                    ) : showImagenAsiento ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/asientos.jpg"
                                            alt="Card image"
                                        />
                                    ) : showImagenTecho ? (
                                        <Card.Img
                                            src="/imgcarrusel/createproducto/techo.jpg"
                                            alt="Card image"
                                        />
                                    ) : null}
                                </Card.Body>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <div className="ml-400">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            mostrarModalDatosProducto()
                                        }>
                                        {" "}
                                        Siguiente
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : ubicarProductoMotor ? (
                    <div className="ml-55">
                        <Row>
                            <Col xl={10} lg={10} md={10} sm={10}>
                                <h3 className="tituloadvertenciaproductosizquierda mt-10 mb-20">
                                    Escoge el sistema en que se encuentra tu
                                    producto:
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Row>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaMotor}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/motor.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaDireccion}>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/direccion.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={
                                            SeleccionasistemaElectricoMotor
                                        }>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/sistemaelectricomotor.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaCaja}>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/caja.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaSuspension}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/suspension.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaRefrigeracionCaja}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/refrigeracioncaja.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionasistemaElectrico}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/sistemaelectrico.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaTransmision}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/transmision.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaFrenos}>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/frenos.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaAireAcondicionado}
                                        onMouseOver={() =>
                                            SeleccionaAireAcondicionado()
                                        }
                                        onMouseOut={() =>
                                            SeleccionBaseMotorElectrico()
                                        }>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/aireacondicionado.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaInyeccion}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/inyeccion.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaArranque}>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/arranque.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaEmbrague}>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/embrague.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaEscape}>
                                        <img
                                            width={70}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/escape.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={8} xl={8} xs={8} md={8}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaRefrigeracion}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/refrigeracion.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                                <Col lg={4} xl={4} xs={4} md={4}>
                                    <Button
                                        className="iconomotorelectricocrearproducto"
                                        onClick={SeleccionaParabrisas}>
                                        <img
                                            width={60}
                                            height={55}
                                            src="/imgcarrusel/createproducto/IconosInicial/parabrisas.png"
                                            alt="First slide"
                                        />
                                    </Button>
                                </Col>
                            </Row>

                            <Col xl={9} lg={9} md={9} xs={9}>
                                <Card.Body className="ml-45 mtmenos500">
                                    {showImagenBaseMotorElectrico ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistemas Motor Eléctrico
                                            </h3>
                                            <Card.Img
                                                width="140px"
                                                height="220px"
                                                src="/static/img/createproducts/motorgeneral.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenAireacondicionado ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema acondicionado
                                            </h3>
                                            <Card.Img   
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenArranque ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de arranque
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenCaja ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de caja
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenDireccion ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de dirección
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenEmbrague ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de embrague
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenEscape ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de escape
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenFrenos ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de frenos
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenInyeccion ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de inyeccion
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenMotor ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de motor
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenParabrisas ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema parabrisas
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenRefrigeracion ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de refrigeración
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenRefrigeracionCaja ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de refrigeración caja
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenSistemElectrico ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema Eléctrico
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenSistemElectricoMotor ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema eléctrico motor
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenSuspension ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistema de suspensión
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/uno.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : showImagenTransmision ? (
                                        <div>
                                            <h3 className="ml-60 seccionesvehiculotext">
                                                Sistemas de Transmisión
                                            </h3>
                                            <Card.Img
                                                src="/imgcarrusel/createproducto/dos.jpg"
                                                alt="Card image"
                                            />
                                        </div>
                                    ) : null}
                                </Card.Body>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <div className="ml-400">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            mostrarModalDatosProducto()
                                        }>
                                        {" "}
                                        Siguiente
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : abrirCerarUbicarProducto ? (
                    <Row>
                        <Col xl={8} lg={8} md={8} xs={8}>
                            <div className="mt-1 datoscerrados" disabled={true}>
                                <h3 className="textoubicacionproducto mlmenos240">
                                    Ubicación del producto en el vehículo.
                                </h3>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1} className="mtmenos2">
                            <div className="showcerrarabrir">
                                <i
                                    class="mt-2 fa fa-angle-down d-flex justify-content-center"
                                    onClick={abrirDatosUbicacionProucto}
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
                ) : null
            ) : null}

            <div className="App">
                <ModalComentariosHabitaculo
                    shown={mostrarModalComentariosHabitaculo}
                    close={() => {
                        setMostrarModalComentariosHabitaculo(false);
                    }}
                    texto={textoPosicionHabitaculo}
                />
            </div>
        </div>
    );
}

function DatosProductos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
    } = props;

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
        useState(true);
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

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const tituloOnChange = (e) => {
        //console.log("LONGITUD TITULO NOMBRE : ", e);
        var strLength = e.length;
        //console.log("LONGITUD : ", strLength);
        if (strLength > 40) {
            swal(
                "Información del producto",
                "Número de caracteres supera el maximo de 40 permitido!",
                "warning",
                { button: "Aceptar" }
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
        { label: "Para repuesto", value: 3 },
    ];

    const porpartes = [
        { label: "Si se vende por partes", value: 1 },
        { label: "No, producto se vende completo", value: 2 },
    ];

    const grabardatosadicionales = async (e) => {
        e.preventDefault();
        //console.log("FORM DATA : ", formData);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!formData.titulonombre) {
            swal(
                "Información del producto",
                "Debe ingresar el titulo de la publicación!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.titulonombre = true;
            formOk = false;
        }

        if (!formData.marcarepuesto) {
            swal(
                "Información del producto",
                "Debe ingresar la Marca del Repuesto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.marcarepuesto = true;
            formOk = false;
        }

        if (!formData.vendeporpartes) {
            swal(
                "Información del producto",
                "Debe ingresar si el producto se vende por partes Si o No!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.condicion = true;
            formOk = false;
        }

        if (!formData.condicion) {
            swal(
                "Información del producto",
                "Debe ingresar en que Condición esta el Producto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.condicion = true;
            formOk = false;
        }

        if (!formData.calificacionproducto) {
            swal(
                "Información del producto",
                "Debe ingresar la Calificación del producto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.calificacionproducto = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (!formOk) {
            setLoading(true);
            console.log("FORM DATA : ", formData);
            swal(
                "Mercado Repuesto",
                "Debe Ingresar todos los datos del del Producto!",
                "error",
                { button: "Aceptar" }
            );
            return;
        }

        const newDet = [];
        let item = {
            funcionalidad: formData.calificacionproducto,
            condicion: formData.condicion,
            marcarepuesto: formData.marcarepuesto,
            numerodeparte: formData.numerodeparte,
            titulonombre: formData.titulonombre,
            vendeporpartes: formData.vendeporpartes,
            estadoproducto: calificacionEstadoProducto,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem("informacionproducto", JSON.stringify(newDet));

        //console.log("INFORMACION PRODUCTO : ", formData)
        onCloseModaDatosProductos();
    };

    const onCloseModaDatosProductos = () => {
        setShowDatosProductosAdicionales(true);
        setInformacionProducto(false);
    };

    const onOpenModaDatosProductos = () => {
        setShowDatosProductosAdicionales(false);
        setInformacionProducto(true);
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
        <div className="ml-250">
            {informacionProducto ? (
                <div className="ps-page__header cajavehiculoscompatiblesproducto mt-20">
                    <h3 className="tituloadvertenciaproductosizquierda">
                        Información sobre tu producto.
                    </h3>
                    <form onChange={onChange}>
                        <div className="ps-form--review">
                            <Row>
                                <Col xl={12} lg={12} md={12} xs={12}>
                                    <div className="ps-form__group inputdatosproducto">
                                        <label className="ps-form__label">
                                            * Titulo publicación
                                        </label>
                                        <input
                                            className="form-control ps-form__input"
                                            placeholder="Escribre el nombre del producto y las características más relevantes"
                                            name="titulonombre"
                                            onChange={(e) =>
                                                tituloOnChange(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label">
                                            * Marca del Repuesto
                                        </label>
                                        <input
                                            className="form-control ps-form__input"
                                            placeholder="Ingresa la marca del producto"
                                            name="marcarepuesto"
                                            type="text"
                                        />
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-95">
                                        <label className="ps-form__label">
                                            * Condición
                                        </label>
                                        <div className="form-control ps-form__input">
                                            <select
                                                className="custom-select ps-form__labelselect colortextoselect"
                                                name="condicion">
                                                <option
                                                    selected
                                                    className="select-fontsize ps-form__label colorbase">
                                                    Selecciona la condición de
                                                    tu producto
                                                </option>
                                                {condicionproducto &&
                                                    condicionproducto.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    className="colorbase"
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
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label">
                                            Numero de Parte
                                        </label>
                                        <input
                                            className="form-control ps-form__input"
                                            name="numerodeparte"
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
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <label className="mlmenos10 ps-form__label">
                                        Vende por partes
                                    </label>
                                    <div className="form-control ps-form__input tamañoinputdatosproducto mlmenos13">
                                        <select
                                            className="custom-select ps-form__labelselect colortextoselect"
                                            name="vendeporpartes">
                                            <option
                                                selected
                                                className="select-fontsize ps-form__label">
                                                Por partes Si o No
                                            </option>
                                            {porpartes &&
                                                porpartes.map((itemselect) => {
                                                    return (
                                                        <option
                                                            className="colorbase"
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
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label">
                                            Escala de funcionalidad
                                        </label>
                                        <div className="form-control ps-form__input">
                                            <select
                                                className="colortextoselect custom-select ps-form__labelselect "
                                                name="calificacionproducto">
                                                <option
                                                    selected
                                                    className="select-fontsize ps-form__label ">
                                                    Selecciona
                                                </option>
                                                {calificacionproducto &&
                                                    calificacionproducto.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    className="colorbase"
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
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div className="ps-form__group tamañoinputdatosproducto">
                                        <label className="ps-form__label">
                                            Estado del producto
                                        </label>
                                        <div>
                                            <Row>
                                                <Col
                                                    xl={2}
                                                    lg={2}
                                                    md={2}
                                                    xs={2}>
                                                    <i
                                                        class={estadoUno}
                                                        onMouseOver={() =>
                                                            calificacionEstadoUno()
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
                                                        class={estadoDos}
                                                        onMouseOver={() =>
                                                            calificacionEstadoDos(
                                                                true
                                                            )
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
                                                        class={estadoTres}
                                                        onMouseOver={() =>
                                                            calificacionEstadoTres(
                                                                true
                                                            )
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
                                                        class={estadoCuatro}
                                                        onMouseOver={() =>
                                                            calificacionEstadoCuatro(
                                                                true
                                                            )
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
                                                        class={estadoCinco}
                                                        onMouseOver={() =>
                                                            calificacionEstadoCinco(
                                                                true
                                                            )
                                                        }
                                                        onClick={() =>
                                                            calificacionEstadoCinco()
                                                        }></i>
                                                </Col>
                                            </Row>
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

                    <div className="botongrabarproducto mtmenos40">
                        <Row>
                            <Col xl={1} lg={1} md={1} xs={1}></Col>
                            <Col xl={8} lg={8} md={8} xs={8}>
                                <div>
                                    <p className="ps-form__text ">
                                        * Datos Requeridos.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={3} lg={3} md={3} xs={3}>
                                <div
                                    className="ps-btn"
                                    onClick={grabardatosadicionales}>
                                    Siguiente
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div className="mlmenos10">
                    <div className="mt-20">
                        <h3 className="ml-10 tituloadvertenciaproductosizquierda">
                            Datos del producto
                        </h3>
                    </div>
                    <div className="mt-20 cajainformacionprouctos">
                        <Row>
                            <Col xl={7} lg={7} md={7} xs={7}>
                                <div
                                    className="mt-1 datoscerrados"
                                    disabled={true}>
                                    <h3 className="mlmenos290 textoubicacionproducto">
                                        Información sobre tu producto
                                    </h3>
                                </div>
                            </Col>
                            <Col
                                xl={1}
                                lg={1}
                                md={1}
                                xs={1}
                                className="ml-55 mtmenos2">
                                <div className="showcerrarabrir">
                                    <i
                                        class="mt-2 fa fa-angle-down d-flex justify-content-center"
                                        onClick={onOpenModaDatosProductos}
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
                                                Información del producto{" "}
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
    } = props;

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const [datosPublicacion, setDatosPublicacion] = useState(true);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [textoDescripcion, setTextoDescripcion] = useState("");
    const [entre, setEntre] = useState(true);
    const [ingresaPrecio, setIngresaPrecio] = useState(0);

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

        if (!formData.numerodeunidades) {
            swal(
                "Información del producto",
                "Debe ingresar Número de Unidades del produccto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.numerodeunidades = true;
            formOk = false;
        }

        console.log("PRECIO : ", formData.precio)

        if (!formData.precio) {
            swal(
                "Información del producto",
                "Debe ingresar el precio del producto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.precio = true;
            formOk = false;
        }

        let validavalor = formData.precio;
/*
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
            swal(
                "Mercado Repuesto",
                "Por favor ingresa el precio, sin separadores o caracteres especiales!",
                "error",
                { button: "Aceptar" }
            );
            return;
        }
*/
        if (!formData.descripcionproducto) {
            swal(
                "Información del producto",
                "Debe ingresar la Descripción del producto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.descripcionproducto = true;
            formOk = false;
        }

        if (!formData.peso) {
            swal(
                "Información del producto",
                "Debe ingresar el peso del producto!",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.peso = true;
            formOk = false;
        }

        if (!formData.largo) {
            swal(
                "Información del producto",
                "Debe ingresar longitud del producto",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.largo = true;
            formOk = false;
        }

        if (!formData.alto) {
            swal(
                "Información del producto",
                "Debe ingresar la altura del producto",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.alto = true;
            formOk = false;
        }

        if (!formData.ancho) {
            swal(
                "Información del producto",
                "Debe ingresar el ancho del producto",
                "warning",
                { button: "Aceptar" }
            );
            return;
            errors.ancho = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (!formOk) {
            setLoading(true);
            console.log("FORM DATA : ", formData);
            swal(
                "Mercado Repuesto",
                "Para lograr mayor visibilidad debes ingresar los datos del producto !",
                "error",
                { button: "Aceptar" }
            );
            return;
        }

        //console.log("DATOS PUBLICACION : ", formData);
        const newDet = [];
        let item = {
            alto: formData.alto,
            ancho: formData.ancho,
            descripcionproducto: formData.descripcionproducto,
            largo: formData.largo,
            numerodeunidades: formData.numerodeunidades,
            peso: formData.peso,
            precio: formData.precio,
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
        setShowIngresoFotos(false);
        setDatosPublicacion(true);
    };

    const IncrementItem = () => {
        let contador = quantity + 1;
        setQuantity(contador);
    };
    const DecreaseItem = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (event) => {
        //console.log("VALOR : ", variable);

        if (isNaN(parseInt(event))) {
            setQuantity(0);
        } else setQuantity(parseInt(event));

        /* setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });*/
    };

    const descripcionOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        if (strLength > 180) {
            swal(
                "Descripción del producto",
                "Número de caracteres supera el maximo de 180 permitido!",
                "warning",
                { button: "Aceptar" }
            );
            return;
        }
    };

    const validaPrecio = (precio) => {
        console.log("Precio : ", formData.precio);
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
            swal(
                "Mercado Repuesto",
                "Por favor ingresa el precio, sin separadores o caracteres especiales!",
                "error",
                { button: "Aceptar" }
            );
            return;
        }
    };

    const precioSinFormato = () => {
        setEntre(false);
    };

    return (
        <div className="ps-page__header ml-250 mt-20">
            {datosPublicacion ? (
                <div className="cajavehiculoscompatiblesproducto">
                    <div>
                        <h3 className="tituloadvertenciaproductosizquierda">
                            Datos de la publicación.
                        </h3>
                    </div>
                    <form onChange={onChange}>
                        <div className="ps-form--review">
                            <div className="ps-form__group inputdatosproductoadicional">
                                <Row>
                                    <Col lg={12} xl={12} md={12} xs={12}>
                                        <div className="ps-form__group inputdatosproductoadicional mt-10">
                                            <label className="ps-form__label">
                                                Descripción del producto
                                            </label>
                                            <input
                                                className="form-control ps-form__input"
                                                placeholder={textoDescripcion}
                                                name="descripcionproducto"
                                                onChange={(e) =>
                                                    descripcionOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6} xl={6} md={6} xs={6}>
                                        <label className="ps-form__label">
                                            Número de Unidades
                                        </label>
                                        <div className="form-control ps-form__input tamañoinputpublicacion ml-10">
                                            <button
                                                className="eliminarborde"
                                                type="button"
                                                onClick={DecreaseItem}>
                                                <i className="fa fa-minus"></i>
                                            </button>

                                            <NumberFormat
                                                className="eliminarborde colordelfondo"
                                                name="numerodeunidades"
                                                value={quantity}
                                                onChange={(e) =>
                                                    handleChange(e.target.value)
                                                }
                                                placeholder="Ingrese número de unidades"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />

                                            <button
                                                className="eliminarborde"
                                                type="button"
                                                onClick={IncrementItem}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </Col>
                                    {entre ? (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <label className="ps-form__label">
                                                Precio del producto
                                            </label>
                                            <NumberFormat
                                                className="form-control ps-form__input tamañoinputpublicacion"
                                                onMouseOut={precioSinFormato}
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
                                            <label className="ps-form__label">
                                                Precio del producto
                                            </label>
                                            <NumberFormat
                                                defaultValue={ingresaPrecio}
                                                className="form-control ps-form__input tamañoinputpublicacion"
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
                                                className="form-control ps-form__input tamañoinputpublicacion"
                                                name="peso"
                                                placeholder="Ingrese peso del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col lg={1} xl={1} md={1} xs={1}
                                            className="ps-form__input mt-28 mlmenos4">
                                            <h3 className=" textomedidas">
                                                Kg
                                            </h3>
                                        </Col>
                                        <Col lg={4} xl={4} md={4} xs={4}>
                                            <label className="ps-form__label">
                                                Largo del producto
                                            </label>
                                            <NumberFormat
                                                className="form-control ps-form__input tamañoinputpublicacion mlmenos10"
                                                name="largo"
                                                placeholder="Longitud del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col lg={1} xl={1} md={1} xs={1}
                                            className="ml-38 ps-form__input mt-28">
                                            <h3 className=" textomedidas">
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
                                                className="form-control ps-form__input tamañoinputpublicacion"
                                                name="ancho"
                                                placeholder="Ancho del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col lg={1} xl={1} md={1} xs={1}
                                            className="ps-form__input mt-48">
                                            <h3 className="textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="mt-20">
                                            <label className="ps-form__label">
                                                Altura del producto
                                            </label>
                                            <NumberFormat
                                                className="form-control ps-form__input tamañoinputpublicacion mlmenos10"
                                                name="alto"
                                                placeholder="Altura del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col lg={1} xl={1} md={1} xs={1}
                                            className="ps-form__input mt-48 ml-38">
                                            <h3 className="textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="botongrabaradicionalproducto mtmenos30">
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
                                    className="ps-btn ml-30"
                                    onClick={datosAdicionalesProducto}>
                                    Vamos al ingreso de fotos del producto
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div className="mlmenos10 mt-25 cajainformacionprouctos">
                    <Row>
                        <Col xl={7} lg={7} md={7} xs={7}>
                            <div className="mt-1 datoscerrados" disabled={true}>
                                <h3 className="mlmenos350 textoubicacionproducto">
                                    Datos publicación.
                                </h3>
                            </div>
                        </Col>
                        <Col
                            xl={1}
                            lg={1}
                            md={1}
                            xs={1}
                            className="mtmenos2 ml-55">
                            <div className="showcerrarabrir">
                                <i
                                    class="mt-2 fa fa-angle-down d-flex justify-content-center"
                                    onClick={onOpenModalDatosPublicacion}
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
                                            Datos publicación{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

function RegistrarFotos(props) {
    const { showIngresoFotos, setShowIngresoFotos, generico } = props;

    const router = useRouter();
    const [formData, setFormData] = useState(defaultValueForm());
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(false);
    const [imgUno, setImgUno] = useState(img);
    const [imgDos, setImgDos] = useState(img);
    const [imgTres, setImgTres] = useState(img);
    const [imgCuatro, setImgCuatro] = useState(img);
    const [imgCinco, setImgCinco] = useState(img);
    const [imgSeis, setImgSeis] = useState(img);
    const [imgSiete, setImgSiete] = useState(img);
    const [imgOcho, setImgOcho] = useState(img);
    const [imgNueve, setImgNueve] = useState(img);
    const [imgDiez, setImgDiez] = useState(img);
    const [mostrarDocumentoUno, setMostrarDocumentoUno] = useState(false);
    const [mostrarDocumentoDos, setMostrarDocumentoDos] = useState(false);
    const [mostrarDocumentoTres, setMostrarDocumentoTres] = useState(false);
    const [mostrarDocumentoCuatro, setMostrarDocumentoCuatro] = useState(false);
    const [mostrarDocumentoCinco, setMostrarDocumentoCinco] = useState(false);
    const [mostrarDocumentoSeis, setMostrarDocumentoSeis] = useState(false);
    const [mostrarDocumentoSiete, setMostrarDocumentoSiete] = useState(false);
    const [mostrarDocumentoOcho, setMostrarDocumentoOcho] = useState(false);
    const [mostrarDocumentoNueve, setMostrarDocumentoNueve] = useState(false);
    const [mostrarDocumentoDiez, setMostrarDocumentoDiez] = useState(false);

    const [selectedArchives, setSelectedArchives] = useState([]);
    const [baseArchives, setBaseArchives] = useState([]);

    // Lee Caracteristicas del Veh Selecdo
    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );
    // Lee Carateristicas del Motor
    const caracteristicasmotor = useSelector(
        (state) => state.datosmotor.datosmotor
    );
    // Lee Datos de producto ingresdo por el vendedor
    const datosproductouno = useSelector(
        (state) => state.datosproducto.datosproducto
    );
    const datosproductodos = useSelector(
        (state) => state.datosproductouno.datosproductouno
    );
    const datosubicarproducto = useSelector(
        (state) => state.ubicarproducto.ubicarproducto
    );
    const usuariologueado = useSelector((state) => state.userlogged.userlogged);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async () => {
        console.log("FILE NAME : ", baseArchives);

        if (!baseArchives) {
            Swal.fire({
                html: `<h1>Información del producto</h1>
                <hr/>
                <h2>La Visibilidad de tu producto depende de las fotos, Ingresa como minimo una!</h2>
                <hr/>
                <br>
                `,
            });
        }

        const recorreImagen = async () => {
            let longitud = baseArchives.length;
            let arreglofotos = [];
            let contador = 0;
            await Array.from(baseArchives).forEach((archivo) => {
                var reader = new FileReader();
                reader.readAsDataURL(archivo);
                reader.onload = function () {
                    var base64 = reader.result;
                    arreglofotos[contador] = base64;
                    //console.log("BASE 64 : ", base64.substring(base64.indexOf('/') + 1, base64.indexOf(';base64')));
                    var extension =
                        "." +
                        base64.substring(
                            base64.indexOf("/") + 1,
                            base64.indexOf(";base64")
                        );
                    contador = contador + 1;

                    if (contador === longitud) {
                        //console.log("CONTADOR : ", contador);
                        //console.log("LONGITUD : ", longitud);
                        setLoading(true);
                        grabarfoto(arreglofotos, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    useEffect(() => {
        //setLoading(false);
    }, []);

    const grabarfoto = async (dato, ext) => {
        //console.log("IMAGEN EN PRUEBA : ", dato);

        let longitud = dato.length;
        let datoimagen;
        let nombrefoto = shortid();
        //console.log("LONGITUD FOTO : ", longitud);
        switch (longitud) {
            case 1:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                };
                break;
            case 2:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                };
                break;
            case 3:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                };
                break;
            case 4:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                };
                break;
            case 5:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                };
                break;
            case 6:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                };
                break;
            case 7:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                };
                break;
            case 8:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                };
                break;
            case 9:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                    nombreimagen9: nombrefoto + "-9" + ext,
                    imagen9: dato[8],
                };
                break;
            case 10:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                    nombreimagen9: nombrefoto + "-9" + ext,
                    imagen9: dato[8],
                    nombreimagen10: nombrefoto + "-10" + ext,
                    imagen10: dato[10],
                };
                break;
            default:
                datoimagen = {
                    longitud,
                    nombreimagen1: "",
                    imagen1: 0,
                    nombreimagen2: "",
                    imagen2: 0,
                    nombreimagen3: "",
                    imagen3: 0,
                    nombreimagen4: "",
                    imagen4: 0,
                    nombreimagen5: "",
                    imagen5: 0,
                    nombreimagen6: "",
                    imagen6: 0,
                    nombreimagen7: "",
                    imagen7: 0,
                    nombreimagen8: "",
                    imagen8: 0,
                    nombreimagen9: "",
                    imagen9: 0,
                    nombreimagen10: "",
                    imagen10: 0,
                };
                break;
        }

        //console.log("DATOS IMAGEN : ", datoimagen);
        //return;
        creaProducto(datoimagen);
    };

    const creaProducto = async (datosimagenes) => {
        // POST request using axios with async/await

        const ubicacionposiciones = JSON.parse(
            localStorage.getItem("ubicacionposicionproducto")
        );
        const vehiculoscompatibles = JSON.parse(
            localStorage.getItem("vehiculoscompatibles")
        );
        const informacionproducto = JSON.parse(
            localStorage.getItem("informacionproducto")
        );
        const datospublicacion = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );
        //console.log("UBICACIONES: ", ubicacionposiciones);
        //console.log("COMPATIBLES: ", vehiculoscompatibles);
        //console.log("INFORMACION: ", informacionproducto);
        //console.log("PUBLICACION: ", datospublicacion);

        //console.log("DATOS IMAGENES : ", datosimagenes);

        //let preciosinseparadores = datospublicacion.precio.replace(/,/g, "");
        //console.log("PRECIO : ", preciosinseparadores);
        //return;
        //let anchosinseparadores = datosproductodos.ancho.replace(/,/g, "");
        //let altosinseparadores = datosproductodos.alto.replace(/,/g, "");
        //let largosinseparadores = datosproductodos.largo.replace(/,/g, "");
        //let pesosinseparadores = datosproductodos.peso.replace(/,/g, "");

        /*
      let fecha = new Date();
        let numero = Date.parse(fecha);
        console.log("VALOR FECHA NUMERO : ", numero)
        */
        let idvehiculoscompatible = shortid();
        //console.log("PRECIO PRODUCTO: ", datospublicacion[0].precio);

        const newDetDos = [];
        let item = {
            id: idvehiculoscompatible,
            titulo: informacionproducto[0].titulonombre
        };
        //newDetUno.push(itemUno);

        localStorage.setItem(
            "idpublicacion",
            JSON.stringify(item)
        );

        //Eliminar separadores en el precio
        let precio = datospublicacion[0].precio;
        let valorproducto = precio.replace(/,/g,"");
        //console.log("PRECIO : ",valorproducto);
        
        const formdata = new FormData();
        formdata.append("id", 0);
        formdata.append("productogenerico", generico);
        formdata.append("tipovehiculo", vehiculoscompatibles[0].tipoVehUno);
        formdata.append("carroceria", vehiculoscompatibles[0].carroceriaVehUno);
        formdata.append("marca", vehiculoscompatibles[0].marcaVehUno);
        formdata.append("anno", vehiculoscompatibles[0].annoVehUno);
        formdata.append("modelo", vehiculoscompatibles[0].modeloVehUno);
        formdata.append(
            "cilindrajemotor",
            vehiculoscompatibles[0].cilindrajeVehUno
        );
        formdata.append(
            "tipocombustible",
            vehiculoscompatibles[0].combustibleVehUno
        );
        formdata.append(
            "transmision",
            vehiculoscompatibles[0].transmisionVehUno
        );
        formdata.append("tipotraccion", vehiculoscompatibles[0].traccionVehUno);
        formdata.append("turbocompresor", 0);
        formdata.append(
            "posicionproducto",
            ubicacionposiciones[0].posicionProducto
        );
        formdata.append(
            "partedelvehiculo",
            ubicacionposiciones[0].ubicacionProducto
        );

        formdata.append("titulonombre", informacionproducto[0].titulonombre);
        formdata.append("marcarepuesto", informacionproducto[0].marcarepuesto);
        formdata.append("condicion", informacionproducto[0].condicion);
        formdata.append(
            "estadoproducto",
            informacionproducto[0].estadoproducto
        );
        formdata.append(
            "vendeporpartes",
            informacionproducto[0].vendeporpartes
        );
        formdata.append("numerodeparte", informacionproducto[0].numerodeparte);
        formdata.append(
            "numerodeunidades",
            datospublicacion[0].numerodeunidades
        );
        formdata.append("precio", valorproducto);
        formdata.append("compatible", idvehiculoscompatible);
        formdata.append(
            "descripcionproducto",
            datospublicacion[0].descripcionproducto
        );
        formdata.append("peso", datospublicacion[0].peso);
        formdata.append("alto", datospublicacion[0].alto);
        formdata.append("ancho", datospublicacion[0].ancho);
        formdata.append("largo", datospublicacion[0].largo);

        formdata.append("descuento", formData.descuento);
        formdata.append("usuario", usuariologueado.uid);
        formdata.append("moneda", formData.moneda);
        formdata.append("estado", formData.estado);
        formdata.append("longitud", datosimagenes.longitud);
        formdata.append("nombreimagen1", datosimagenes.nombreimagen1);
        formdata.append("imagen1", datosimagenes.imagen1);
        formdata.append("nombreimagen2", datosimagenes.nombreimagen2);
        formdata.append("imagen2", datosimagenes.imagen2);
        formdata.append("nombreimagen3", datosimagenes.nombreimagen3);
        formdata.append("imagen3", datosimagenes.imagen3);
        formdata.append("nombreimagen4", datosimagenes.nombreimagen4);
        formdata.append("imagen4", datosimagenes.imagen4);
        formdata.append("nombreimagen5", datosimagenes.nombreimagen5);
        formdata.append("imagen5", datosimagenes.imagen5);
        formdata.append("nombreimagen6", datosimagenes.nombreimagen6);
        formdata.append("imagen6", datosimagenes.imagen6);
        formdata.append("nombreimagen7", datosimagenes.nombreimagen7);
        formdata.append("imagen7", datosimagenes.imagen7);
        formdata.append("nombreimagen8", datosimagenes.nombreimagen8);
        formdata.append("imagen8", datosimagenes.imagen8);
        formdata.append("nombreimagen9", datosimagenes.nombreimagen9);
        formdata.append("imagen9", datosimagenes.imagen9);
        formdata.append("nombreimagen10", datosimagenes.nombreimagen10);
        formdata.append("imagen10", datosimagenes.imagen10);

        //console.log("FORM DATA : ", formdata);
        //return;
        //console.log("DATOS CREACION DE PRODUCTO : ", producto);
        let creoregistro = false;
        let url = "https://sitbusiness.co/mrp/api";

        await fetch(`${url}/16`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            if (response) {
                console.log("VALOR RESPONSE : ", response);
                if (response.status === 200) {
                    creoregistro = true;
                    swal(
                        "Mercado Repuesto",
                        "Fotos productos grabadas de forma correcta!",
                        "success",
                        { button: "Aceptar" }
                    );
                    console.log("VALOR QUE RETORNA 200 : ", response.status);
                    setLoading(false);
                    //router.push("/");
                    router.push("/CreateProduct/terminapublicacion");
                } else {
                    swal(
                        "Mercado Repuesto",
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    setLoading(false);
                    router.push("/");
                    //Router.push(`/search?keyword=${keyword}`);
                    //router.push("/CreateProduct/terminapublicacion");
                }
            } else {
                console.log("RESPONSE INGRESO FOTOS : ", response);
            }
        });

        if (creoregistro) {
            setLoading(true);

            const formdataveh = new FormData();
            formdataveh.append("codigopublicacion", idvehiculoscompatible);
            formdataveh.append(
                "tipovehiculo",
                vehiculoscompatibles[0].tipoVehUno
            );
            formdataveh.append(
                "carroceria",
                vehiculoscompatibles[0].carroceriaVehUno
            );
            formdataveh.append("marca", vehiculoscompatibles[0].marcaVehUno);
            formdataveh.append("anno", vehiculoscompatibles[0].annoVehUno);
            formdataveh.append("modelo", vehiculoscompatibles[0].modeloVehUno);
            formdataveh.append(
                "cilindrajemotor",
                vehiculoscompatibles[0].cilindrajeVehUno
            );
            formdataveh.append(
                "tipocombustible",
                vehiculoscompatibles[0].combustibleVehUno
            );
            formdataveh.append(
                "transmision",
                vehiculoscompatibles[0].transmisionVehUno
            );
            formdataveh.append(
                "partedelvehiculo",
                ubicacionposiciones[0].ubicacionProducto
            );
            formdataveh.append(
                "tipotraccion",
                vehiculoscompatibles[0].traccionVehUno
            );
            formdataveh.append("turbocompresor", 0);
            formdataveh.append(
                "posicionproducto",
                ubicacionposiciones[0].posicionProducto
            );
            formdataveh.append("usuario", usuariologueado.uid);

            const grabaVehiculos = async () => {
                let url = "https://sitbusiness.co/mrp/api";

                await fetch(`${url}/24`, {
                    method: "POST",
                    body: formdataveh,
                    //headers: headers,
                }).then((response) => {
                    if (response) {
                        if (response.status === 200) {
                            swal(
                                "Mercado Repuesto",
                                "Vehículos compatibles creados de forma correcta!",
                                "success",
                                { button: "Aceptar" }
                            );

                            setLoading(false);
                            //router.push("/");
                        } else {
                            swal(
                                "Mercado Repuesto",
                                "Se presentaron inconvenientes al grabar hehículos compatibles!",
                                "warning",
                                { button: "Aceptar" }
                            );
                            setLoading(false);
                            //router.push("/");
                        }
                    } else {
                        console.log(
                            "RESPONSE VEHICULOS COMPATIBLES : ",
                            response
                        );
                    }
                });
            };
            grabaVehiculos();
        }
    };

    const onSelectFile = (event) => {
        console.log("EVENT FILE : ", event.target.files);

        if (selectedArchives.length > 10) {
            swal(
                "Mercado Repuesto",
                "Recuerda, maximo diez archivos!",
                "warning",
                { button: "Aceptar" }
            );
            return;
        }

        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        let longitud = baseArchives.length;

        //return

        const newDet = [];
        if (!baseArchives) {
            setBaseArchives(selectedFilesArray);
        } else newDet.push.apply(baseArchives, selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file.name;
            //return URL.createObjectURL(file);
        });

        //console.log("NOMBRE ARCHIVO : ", selectedFiles);

        // Selected Files se actualiza con el ingreso o borrado, por eso se deben igualar
        //if(selectedFilesArray.length != baseArchives.length){
        //    setBaseArchives(selectedFilesArray)
        //}

        setSelectedArchives((previousImages) =>
            previousImages.concat(imagesArray)
        );
    };

    const actualizaImagenes = () => {
        //console.log("LONGITUD USE EFFECT : ", selectedArchives);
        //console.log("ARRAY BASE LONGITUD: ", baseArchives);
        if (selectedArchives.length > 10) {
            swal(
                "Mercado Repuesto",
                "Recuerda, maximo 10 archivos!",
                "warning",
                { button: "Aceptar" }
            );
            setSelectedArchives([]);
            return;
        }

        if (selectedArchives.length === 1) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
        } else if (selectedArchives.length === 2) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
        } else if (selectedArchives.length === 3) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
        } else if (selectedArchives.length === 4) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
        } else if (selectedArchives.length === 5) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
        } else if (selectedArchives.length === 6) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
        } else if (selectedArchives.length === 7) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
        } else if (selectedArchives.length === 8) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
        } else if (selectedArchives.length === 9) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
            setImgNueve(URL.createObjectURL(baseArchives[8]));
        } else if (selectedArchives.length === 10) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
            setImgNueve(URL.createObjectURL(baseArchives[8]));
            setImgDiez(URL.createObjectURL(baseArchives[9]));
        }

        //console.log("LONGITUD BASE : ", baseArchives.length)
        //console.log("DOCUMENTOS SELECTED : ", selectedArchives);
        //console.log("DOCUMENTOS BASE : ", baseArchives);
    };

    useEffect(() => {
        if (selectedArchives.length > 0) {
            if (selectedArchives.length === 1) {
                setImgDos(img);
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 2) {
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 3) {
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 4) {
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 5) {
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 6) {
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 7) {
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 8) {
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 9) {
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(true);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 10) {
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(true);
                setMostrarDocumentoDiez(true);
            } else {
                setImgUno(img);
                setImgDos(img);
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(false);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            }
            actualizaImagenes();
        } else {
            setImgUno(img);
            setImgDos(img);
            setImgTres(img);
            setImgCuatro(img);
            setImgCinco(img);
            setImgSeis(img);
            setImgSiete(img);
            setImgOcho(img);
            setImgNueve(img);
            setImgDiez(img);
            setMostrarDocumentoUno(false);
            setMostrarDocumentoDos(false);
            setMostrarDocumentoTres(false);
            setMostrarDocumentoCuatro(false);
            setMostrarDocumentoCinco(false);
            setMostrarDocumentoSeis(false);
            setMostrarDocumentoSiete(false);
            setMostrarDocumentoOcho(false);
            setMostrarDocumentoNueve(false);
            setMostrarDocumentoDiez(false);
        }
    }, [selectedArchives]);

    const onCloseModalFotosProducto = () => {
        setShowModalFotos(false);
    };

    return (
        <div className="ps-page__header mlmenos50">
            <div className="mt-20 ml-130">
                <Row>
                    <Col xl={3} lg={3} md={3} sm={3}></Col>
                    <Col xl={7} lg={7} md={7} sm={7}>
                        <div className="mt-20">
                            <h3 className="tituloadvertenciaproductosizquierda ml-50">
                                Ingresa fotos del producto - mínimo una
                            </h3>
                        </div>
                    </Col>
                </Row>
            </div>
            <br />
            <form onChange={onChange} className="ml-3">
                <div className="ps-form--review">
                    <div className="ps-form__group">
                        <Form.Group
                            controlId="formFileMultiple"
                            className="ps-form__group ml-250">
                            <div className="ml-10">
                                <Row>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoUno ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgUno
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />

                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                       <h1 >
                                                                                        X
                                                                                       </h1>
                                                                                        
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-input">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgUno.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-input"
                                                        name="images"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoDos ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgDos
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                          X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputUno">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgDos.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputUno"
                                                        name="imagesuno"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoTres ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgTres
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                          X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputDos">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgTres.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputDos"
                                                        name="imagesdos"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoCuatro ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        1 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgCuatro
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                          X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputTres">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgCuatro.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputTres"
                                                        name="imagestres"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoCinco ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        1 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgCinco
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                         X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputCuatro">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgCinco.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputCuatro"
                                                        name="imagescuatro"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="mt-15 ml-10">
                                <Row>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoSeis ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgSeis
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                         X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputCinco">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgSeis.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputCinco"
                                                        name="imagescinco"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoSiete ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgSiete
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                         X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputSeis">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgSiete.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputSeis"
                                                        name="imagesseis"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoOcho ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgOcho
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                         X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputSiete">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgOcho.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputSiete"
                                                        name="imagessiete"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoNueve ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        1 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgNueve
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                         X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputOcho">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgNueve.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputOcho"
                                                        name="imagesocho"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-60"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div class="image-upload">
                                            {mostrarDocumentoDiez ? (
                                                <div>
                                                    {selectedArchives &&
                                                        selectedArchives.map(
                                                            (
                                                                archive,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            archive
                                                                        }>
                                                                        {index ==
                                                                        2 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="tamañoimagenuploadproducto"
                                                                                    src={
                                                                                        imgDiez
                                                                                    }
                                                                                    alt="Seleccione Archivo"
                                                                                />
                                                                                <div>
                                                                                    <button
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            setSelectedArchives(
                                                                                                selectedArchives.filter(
                                                                                                    (
                                                                                                        e
                                                                                                    ) =>
                                                                                                        e !==
                                                                                                        archive
                                                                                                )
                                                                                            )
                                                                                        }>
                                                                                        <h1 >
                                                                                         X
                                                                                        </h1>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                        {
                                                                            // <p>{index + 1}</p>
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            ) : (
                                                <div>
                                                    <label for="file-inputNueve">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgDiez.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                    </label>
                                                    <input
                                                        id="file-inputNueve"
                                                        name="imagesnueve"
                                                        type="file"
                                                        onChange={onSelectFile}
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </form>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <br />
                </div>
            )}

            <div className="ml-270 mtmenos50">
                <Row>
                    <Col xl={3} lg={3} xs={3} md={3}>
                        <div>
                            <p className="ps-form__text">
                                Incluye como mínimo una foto!
                            </p>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} xs={3} md={3}>
                        <Button className="ps-btn"> Cancelar </Button>
                    </Col>
                    <Col xl={4} lg={4} xs={4} md={4}>
                        <div className="ps-btn" onClick={generabase64}>
                            Grabar Producto
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: 0,
        productogenerico: 0,
        tipoVeh: 0,
        carroceria: 0,
        marca: 0,
        anno: 0,
        modelo: 0,
        cilindrajemotor: 0,
        tipocombustible: 0,
        transmision: 0,
        partedelVeh: "",
        posicionproducto: "",
        titulonombre: "",
        marcarepuesto: "",
        condicion: "",
        estadoproducto: "",
        numerodeunidades: "",
        precio: "",
        numerodeparte: 0,
        compatible: "",
        descripcionproducto: "",
        vendeporpartes: "",
        peso: 0,
        largo: 0,
        ancho: 0,
        alto: 0,
        tipotraccion: 0,
        turbocompresor: 0,
        descuento: 0,
        usuario: 1,
        moneda: 0,
        estado: 31,
        numerodeimagenes: 0,
        nombreimagen1: "",
        nombreimagen2: "",
        nombreimagen3: "",
        nombreimagen4: "",
        nombreimagen5: "",
        nombreimagen6: "",
        nombreimagen7: "",
        nombreimagen8: "",
        nombreimagen9: "",
        nombreimagen10: "",
    };
}

export default CreateProduct;
