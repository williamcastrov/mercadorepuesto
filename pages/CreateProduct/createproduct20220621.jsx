import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import swal from "sweetalert";
import NumberFormat from "react-number-format";
import { getSelectedVehicle } from "../../store/selectedvehicle/action";
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
import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { useRouter } from "next/router";
import shortid from "shortid";
import img from "../../public/imagesupload/uploadimage.png";
import eliminar from "../../public/imagesupload/eliminar.png";

// Componentes Crear Producto
import DatosVehiculos from "./DatosVehiculos";
import VehiculoSeleccionado from "./VehiculoSeleccionado";
import DatosVehiculosEditar from "./DatosVehiculosEditar";
import DatosVehiculosDuplicar from "./DatosVehiculosDuplicar";
import ModalComentariosHabitaculo from "./ModalComentariosHabitaculo";

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
    const [mostrarDatosMotor, setMostrarDatosMotor] = useState(false);
    const [mostrarBotonDatosMotor, setMostrarBotonDatosMotor] = useState(false);

    const [mostrar, setMostrar] = useState(false);
    const [tamaño, setTamaño] = useState("col-12 col-md-6 ml-250");
    const [showCreateProduct, setCreateProduct] = useState(true);
    const [showModalLatoneria, setShowModalLatoneria] = useState(false);
    const [showDatosProductos, setShowDatosProductos] = useState(false);
    const [showDatosProductosAdicionales, setShowDatosProductosAdicionales] =
        useState(false);
    const [showIngresoFotos, setShowIngresoFotos] = useState(false);

    const [pageAcount, setPageAcount] = useState("ps-page__content ps-account");

    const [classAgregarVeh, setClassgregarVeh] = useState(
        "botonagregarotroVehuno mtmenos100 ml-10"
    );
    const [textoAgregarVeh, setTextoAgregarVeh] = useState(
        "Agrega otro Veh para el ..."
    );

    const [mostrarVehiculoEditar, setMostrarVehiculoEditar] = useState(false);
    const [mostrarDatosVehiculos, setMostrarDatosVehiculos] = useState(false);
    const [mostrarVehiculoSeleccionadoUno, setMostrarVehiculoSeleccionadoUno] =
        useState(0);
    const [mostrarVehiculoSeleccionadoDos, setMostrarVehiculoSeleccionadoDos] =
        useState(0);
    const [
        mostrarVehiculoSeleccionadoTres,
        setMostrarVehiculoSeleccionadoTres,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoCuatro,
        setMostrarVehiculoSeleccionadoCuatro,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoCinco,
        setMostrarVehiculoSeleccionadoCinco,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoSeis,
        setMostrarVehiculoSeleccionadoSeis,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoSiete,
        setMostrarVehiculoSeleccionadoSiete,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoOcho,
        setMostrarVehiculoSeleccionadoOcho,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoNueve,
        setMostrarVehiculoSeleccionadoNueve,
    ] = useState(0);
    const [
        mostrarVehiculoSeleccionadoDiez,
        setMostrarVehiculoSeleccionadoDiez,
    ] = useState(0);
    const [numeroVehiculo, setNumeroVehiculo] = useState(0);
    const [editarVehiculo, setEditarVehiculo] = useState(false);
    const [duplicarVehiculo, setDuplicarVehiculo] = useState(false);

    const [contador, setContador] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [tipoVeh, setTipoVeh] = useState([]);
    const [marcaVeh, setMarcaVeh] = useState([]);
    const [annoVeh, setAnnoVeh] = useState([]);
    const [modeloVeh, setModeloVeh] = useState([]);
    const [carroceriaVeh, setCarroceriaVeh] = useState([]);
    const [cilindrajesVeh, setCilindrajesVeh] = useState([]);
    const [transmisionVeh, setTransmisionVeh] = useState([]);
    const [traccionVeh, setTraccionVeh] = useState([]);
    const [combustibleVeh, setCombustibleVeh] = useState([]);

    const [tipoSelecVeh, setTipoSelecVeh] = useState(0);
    const [marcaSelecVeh, setMarcaSelecVeh] = useState(0);
    const [listaMarcaSelecVeh, setListaMarcaSelecVeh] = useState(0);
    const [annoSelecVeh, setAnnoSelecVeh] = useState([]);
    const [modeloSelecVeh, setModeloSelecVeh] = useState([]);
    const [listaModeloSelecVeh, setListaModeloSelecVeh] = useState(0);
    const [carroceriaSelecVeh, setCarroceriaSelecVeh] = useState(0);
    const [listaCarroceriaSelecVeh, setListaCarroceriaSelecVeh] = useState(0);
    const [transmisionSelecVeh, setTransmisionSelecVeh] = useState(0);
    const [cilindrajeSelecVeh, setCilindrajeSelecVeh] = useState(0);
    const [listaCilindrajeSelecVeh, setListaCilindrajeSelecVeh] = useState(0);
    const [traccionSelecVeh, setTraccionSelecVeh] = useState(0);
    const [turboSelecVeh, setTurboSelecVeh] = useState(0);
    const [combustibleSelecVeh, setCombustibleSelecVeh] = useState(0);

    const [generico, setGenerico] = useState(null);
    const [unoovarios, setUnoovarios] = useState(null);

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

    const [caracteristicasUno, setCaracteristicasUno] = useState(false);
    const [caracteristicasDos, setCaracteristicasDos] = useState(false);
    const [caracteristicasTres, setCaracteristicasTres] = useState(false);
    const [caracteristicasCuatro, setCaracteristicasCuatro] = useState(false);

    const [leerUno, setLeerUno] = useState(false);
    const [leerDos, setLeerDos] = useState(false);
    const [leerTres, setLeerTres] = useState(false);
    const [leerCuatro, setLeerCuatro] = useState(false);

    const [seleccionoTipoVeh, setSeleccionoTipoVeh] = useState(false);
    const [seleccionoUbicacionProducto, setSeleccionoUbicacionProducto] =
        useState(false);
    const [SelecDatosProducto, setSelecDatosProducto] = useState(false);

    const mostrarInformacionParaUnoVarios = () => {
        setShowModalParaUnoVarios(true);
    };

    const productogenerico = [
        {
            label: "Si - Es Compatible con diferentes marcas y modelos del Vehículos.",
            value: "Si",
        },
        {
            label: "No - NO es Compatible con varias marcas y modelos de Vehículos.",
            value: "No",
        },
    ];

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [marcas, setMarcas] = useState([]);
    const [marcasUno, setMarcasUno] = useState([]);
    const [marcasDos, setMarcasDos] = useState([]);
    const [marcasTres, setMarcasTres] = useState([]);
    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda
    const [modelos, setModels] = useState([]);
    // Arreglo carrocerias de los Vehiculos segun Tipo Selecciondo
    const [carrocerias, setCarrocerias] = useState([]);

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
        console.log(
            "datoscrearproductoscilindrajes : ",
            datoscrearproductoscilindrajes
        );
        setListCilindrajesVehiculos(datoscrearproductoscilindrajes);
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        //setLoading(false)
    }, []);

    useEffect(() => {
        setLoading(false);
        /*
        console.log("Tipo : ", tipoVeh);
        console.log("Marca : ", marcaVeh);
        console.log("Año : ", annoVeh);
        console.log("Modelo : ", modeloVeh);
        console.log("Carroceria : ", carroceriaVeh);
        console.log("Cilindraje : ", cilindrajesVeh);
      
         */
        /*
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
        */
        //console.log("Contador : ", contador);
    }, []);

    const datosCrearProducto = () => {
        //console.log("CONTADOR : ", contador);
        let nombre = " Un ";

        if (unoovarios === "Si") {
            const caracteristicasVeh = {
                productogenerico: generico,
                tipoVeh: tipoVeh,
                carroceria: carroceriaVeh,
                marca: marcaVeh,
                anno: annoVeh[0].label,
                modelo: modeloVeh[0].value,
            };

            //setMostrar(true);
            //setShowModal(true);
        } else if (unoovarios === "No") {
            if (contador === 0) {
                nombre = " un vehículo";
                setCaracteristicasUno(true);
            } else if (contador === 1) {
                nombre = " dos vehículos";
                setCaracteristicasDos(true);
                setCaracteristicasUno(true);
            } else if (contador === 0) {
                nombre = " tres vehículos";
                setCaracteristicasDos(true);
                setCaracteristicasUno(true);
                setCaracteristicasTres(true);
            } else if (contador === 0) {
                nombre = " cuatro vehículos";
                setCaracteristicasDos(true);
                setCaracteristicasUno(true);
                setCaracteristicasTres(true);
                setCaracteristicasCuatro(true);
            } else nombre = " ";

            swal({
                title: "Creacíon de Productos",
                text:
                    "Revisemos, Seleccionaste" +
                    nombre +
                    " compatible con tu producto, Oprime Ok para continuar, o Cancelar!",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((willDelete) => {
                if (willDelete) {
                    console.log("VERDADERO");
                } else {
                    return;
                }
            });
        }
        setCreateProduct(false);
        setMostrarBotonDatosMotor(false);
        setMostrarDatosMotor(true);
        setPageAcount("");
    };

    // Habilitar los modelos de Vehiculos Selecdo OJO XXXXXX
    useEffect(() => {
        if (mostrar) {
            //setMostrarBotonDatosMotor(true);
            VehiculosSelecdos();
            setMostrar(false);
        }
    }, [mostrar]);

    const VehiculosSelecdos = () => {
        if (unoovarios === "Si") {
            const caracteristicasVeh = {
                productogenerico: generico,
                tipoVeh: tipoVeh,
                carroceria: carroceriaVeh,
                marca: marcaVeh,
                anno: annoVeh[0].label,
                modelo: modeloVeh[0].value,
            };
        }
    };

    const handleChangeGenerico = (selectedOptions) => {
        //console.log("OPCION GENERICOS : ", selectedOptions);
        //alert("GENERICO");
        setGenerico(selectedOptions);
        setMostrarDatosVehiculos(true);
    };

    const agregarDatosVehiculos = () => {
        setMostrarDatosVehiculos(true);
    };

    const agregarDatosLatoneria = () => {
        setShowModalLatoneria(true);
    };

    const ingresarDatosProductos = () => {
        setShowDatosProductos(true);
        setSelecDatosProducto(true);
    };

    //setMostrarDatosMotor(true);
    return (
        <Container title="Mi Cuenta">
            <div className="tamañospinner">{loading ? <Loading /> : null}</div>
            {/* <div className="ps-page ps-page--inner ml-250">  */}
            <div className="mt-40">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className={pageAcount}>
                        <div className="row">
                            <div className={tamaño}>
                                <form>
                                    <div className="ps-form--review">
                                        <div>
                                            <Row className="mt-5 mb-10">
                                                <Col
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    xs={12}>
                                                    {editarVehiculo ? (
                                                        <h2 className="ps-form__title mtmenos50">
                                                            Editar
                                                            Caracteristicas del
                                                            Vehículo
                                                        </h2>
                                                    ) : (
                                                        <h2 className="ps-form__title mtmenos50">
                                                            Crear Producto
                                                        </h2>
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>

                                        {showCreateProduct ? (
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
                                                    <Col
                                                        xl={1}
                                                        lg={1}
                                                        md={1}
                                                        xs={1}>
                                                        <div className="form-control ps-form__input  mlmenos15">
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
                                                </Row>
                                                {generico ? (
                                                    generico === "No" ? (
                                                        <div>
                                                            {mostrarVehiculoSeleccionadoUno ==
                                                            1 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        tipoVeh={
                                                                            tipoVeh
                                                                        }
                                                                        marcaVeh={
                                                                            marcaVeh
                                                                        }
                                                                        annoVeh={
                                                                            annoVeh
                                                                        }
                                                                        modeloVeh={
                                                                            modeloVeh
                                                                        }
                                                                        carroceriaVeh={
                                                                            carroceriaVeh
                                                                        }
                                                                        cilindrajesVeh={
                                                                            cilindrajesVeh
                                                                        }
                                                                        transmisionVeh={
                                                                            transmisionVeh
                                                                        }
                                                                        traccionVeh={
                                                                            traccionVeh
                                                                        }
                                                                        combustibleVeh={
                                                                            combustibleVeh
                                                                        }
                                                                        numeroVehiculo={
                                                                            1
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                        loading={
                                                                            loading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoDos ==
                                                            2 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            2
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoTres ==
                                                            3 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            3
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoCuatro ==
                                                            4 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            4
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoCinco ==
                                                            5 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            5
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoSeis ==
                                                            6 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            6
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoSiete ==
                                                            7 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            7
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoOcho ==
                                                            8 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            8
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoNueve ==
                                                            9 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            9
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}

                                                            {mostrarVehiculoSeleccionadoDiez ==
                                                            10 ? (
                                                                <div>
                                                                    <VehiculoSeleccionado
                                                                        setNumeroVehiculo={
                                                                            setNumeroVehiculo
                                                                        }
                                                                        numeroVehiculo={
                                                                            10
                                                                        }
                                                                        tamaño={
                                                                            tamaño
                                                                        }
                                                                        setTamaño={
                                                                            setTamaño
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                        mostrarDatosVehiculos={
                                                                            mostrarDatosVehiculos
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        duplicarVehiculo={
                                                                            duplicarVehiculo
                                                                        }
                                                                        setDuplicarVehiculo={
                                                                            setDuplicarVehiculo
                                                                        }
                                                                        setLoading={
                                                                            setLoading
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}
                                                            {editarVehiculo ? (
                                                                <DatosVehiculosEditar
                                                                    vehiculos={
                                                                        vehiculos
                                                                    }
                                                                    setVehiculos={
                                                                        setVehiculos
                                                                    }
                                                                    annos={
                                                                        annos
                                                                    }
                                                                    tipoVeh={
                                                                        tipoVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setTipoVeh={
                                                                        setTipoVeh
                                                                    }
                                                                    marcaVeh={
                                                                        marcaVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setMarcaVeh={
                                                                        setMarcaVeh
                                                                    }
                                                                    annoVeh={
                                                                        annoVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setAnnoVeh={
                                                                        setAnnoVeh
                                                                    }
                                                                    modeloVeh={
                                                                        modeloVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setModeloVeh={
                                                                        setModeloVeh
                                                                    }
                                                                    carroceriaVeh={
                                                                        carroceriaVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setCarroceriaVeh={
                                                                        setCarroceriaVeh
                                                                    }
                                                                    cilindrajesVeh={
                                                                        cilindrajesVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    traccionVeh={
                                                                        traccionVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setTraccionVeh={
                                                                        setTraccionVeh
                                                                    }
                                                                    combustibleVeh={
                                                                        combustibleVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setCombustibleVeh={
                                                                        setCombustibleVeh
                                                                    }
                                                                    setCilindrajesVeh={
                                                                        setCilindrajesVeh
                                                                    }
                                                                    transmisionVeh={
                                                                        transmisionVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setTransmisionVeh={
                                                                        setTransmisionVeh
                                                                    }
                                                                    listMarcasVehiculos={
                                                                        listMarcasVehiculos
                                                                    }
                                                                    listCarroceriasVehiculos={
                                                                        listCarroceriasVehiculos
                                                                    }
                                                                    listModelosVehiculos={
                                                                        listModelosVehiculos
                                                                    }
                                                                    listCilindrajesVehiculos={
                                                                        listCilindrajesVehiculos
                                                                    }
                                                                    tipoSelecVeh={
                                                                        tipoSelecVeh
                                                                    }
                                                                    setTipoSelecVeh={
                                                                        setTipoSelecVeh
                                                                    }
                                                                    marcaSelecVeh={
                                                                        marcaSelecVeh
                                                                    }
                                                                    setMarcaSelecVeh={
                                                                        setMarcaSelecVeh
                                                                    }
                                                                    listaMarcaSelecVeh={
                                                                        listaMarcaSelecVeh
                                                                    }
                                                                    setListaMarcaSelecVeh={
                                                                        setListaMarcaSelecVeh
                                                                    }
                                                                    listaModeloSelecVeh={
                                                                        listaModeloSelecVeh
                                                                    }
                                                                    setListaModeloSelecVeh={
                                                                        setListaModeloSelecVeh
                                                                    }
                                                                    listaCarroceriaSelecVeh={
                                                                        listaCarroceriaSelecVeh
                                                                    }
                                                                    setListaCarroceriaSelecVeh={
                                                                        setListaCarroceriaSelecVeh
                                                                    }
                                                                    listaCilindrajeSelecVeh={
                                                                        listaCilindrajeSelecVeh
                                                                    }
                                                                    setListaCilindrajeSelecVeh={
                                                                        setListaCilindrajeSelecVeh
                                                                    }
                                                                    annoSelecVeh={
                                                                        annoSelecVeh
                                                                    }
                                                                    setAnnoSelecVeh={
                                                                        setAnnoSelecVeh
                                                                    }
                                                                    modeloSelecVeh={
                                                                        modeloSelecVeh
                                                                    }
                                                                    setModeloSelecVeh={
                                                                        setModeloSelecVeh
                                                                    }
                                                                    carroceriaSelecVeh={
                                                                        carroceriaSelecVeh
                                                                    }
                                                                    setCarroceriaSelecVeh={
                                                                        setCarroceriaSelecVeh
                                                                    }
                                                                    transmisionSelecVeh={
                                                                        transmisionSelecVeh
                                                                    }
                                                                    setTransmisionSelecVeh={
                                                                        setTransmisionSelecVeh
                                                                    }
                                                                    cilindrajeSelecVeh={
                                                                        cilindrajeSelecVeh
                                                                    }
                                                                    setCilindrajeSelecVeh={
                                                                        setCilindrajeSelecVeh
                                                                    }
                                                                    traccionSelecVeh={
                                                                        traccionSelecVeh
                                                                    }
                                                                    setTraccionSelecVeh={
                                                                        setTraccionSelecVeh
                                                                    }
                                                                    turboSelecVeh={
                                                                        turboSelecVeh
                                                                    }
                                                                    setTurboSelecVeh={
                                                                        setTurboSelecVeh
                                                                    }
                                                                    combustibleSelecVeh={
                                                                        combustibleSelecVeh
                                                                    }
                                                                    setCombustibleSelecVeh={
                                                                        setCombustibleSelecVeh
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoUno={
                                                                        setMostrarVehiculoSeleccionadoUno
                                                                    }
                                                                    mostrarVehiculoSeleccionadoUno={
                                                                        mostrarVehiculoSeleccionadoUno
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoDos={
                                                                        setMostrarVehiculoSeleccionadoDos
                                                                    }
                                                                    mostrarVehiculoSeleccionadoDos={
                                                                        mostrarVehiculoSeleccionadoDos
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoTres={
                                                                        setMostrarVehiculoSeleccionadoTres
                                                                    }
                                                                    mostrarVehiculoSeleccionadoTres={
                                                                        mostrarVehiculoSeleccionadoTres
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoCuatro={
                                                                        setMostrarVehiculoSeleccionadoCuatro
                                                                    }
                                                                    mostrarVehiculoSeleccionadoCuatro={
                                                                        mostrarVehiculoSeleccionadoCuatro
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoCinco={
                                                                        setMostrarVehiculoSeleccionadoCinco
                                                                    }
                                                                    mostrarVehiculoSeleccionadoCinco={
                                                                        mostrarVehiculoSeleccionadoCinco
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoSeis={
                                                                        setMostrarVehiculoSeleccionadoSeis
                                                                    }
                                                                    mostrarVehiculoSeleccionadoSeis={
                                                                        mostrarVehiculoSeleccionadoSeis
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoSiete={
                                                                        setMostrarVehiculoSeleccionadoSiete
                                                                    }
                                                                    mostrarVehiculoSeleccionadoSiete={
                                                                        mostrarVehiculoSeleccionadoSiete
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoOcho={
                                                                        setMostrarVehiculoSeleccionadoOcho
                                                                    }
                                                                    mostrarVehiculoSeleccionadoOcho={
                                                                        mostrarVehiculoSeleccionadoOcho
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoNueve={
                                                                        setMostrarVehiculoSeleccionadoNueve
                                                                    }
                                                                    mostrarVehiculoSeleccionadoNueve={
                                                                        mostrarVehiculoSeleccionadoNueve
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoDiez={
                                                                        setMostrarVehiculoSeleccionadoDiez
                                                                    }
                                                                    mostrarVehiculoSeleccionadoDiez={
                                                                        mostrarVehiculoSeleccionadoDiez
                                                                    }
                                                                    setMostrarDatosVehiculos={
                                                                        setMostrarDatosVehiculos
                                                                    }
                                                                    contador={
                                                                        contador
                                                                    }
                                                                    setContador={
                                                                        setContador
                                                                    }
                                                                    editarVehiculo={
                                                                        editarVehiculo
                                                                    }
                                                                    setEditarVehiculo={
                                                                        setEditarVehiculo
                                                                    }
                                                                    setLoading={
                                                                        setLoading
                                                                    }
                                                                    numeroVehiculo={
                                                                        numeroVehiculo
                                                                    }
                                                                />
                                                            ) : null}

                                                            {duplicarVehiculo ? (
                                                                <DatosVehiculosDuplicar
                                                                    vehiculos={
                                                                        vehiculos
                                                                    }
                                                                    annos={
                                                                        annos
                                                                    }
                                                                    tipoVeh={
                                                                        tipoVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setTipoVeh={
                                                                        setTipoVeh
                                                                    }
                                                                    marcaVeh={
                                                                        marcaVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setMarcaVeh={
                                                                        setMarcaVeh
                                                                    }
                                                                    annoVeh={
                                                                        annoVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setAnnoVeh={
                                                                        setAnnoVeh
                                                                    }
                                                                    modeloVeh={
                                                                        modeloVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setModeloVeh={
                                                                        setModeloVeh
                                                                    }
                                                                    carroceriaVeh={
                                                                        carroceriaVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setCarroceriaVeh={
                                                                        setCarroceriaVeh
                                                                    }
                                                                    cilindrajesVeh={
                                                                        cilindrajesVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    traccionVeh={
                                                                        traccionVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setTraccionVeh={
                                                                        setTraccionVeh
                                                                    }
                                                                    combustibleVeh={
                                                                        combustibleVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setCombustibleVeh={
                                                                        setCombustibleVeh
                                                                    }
                                                                    setCilindrajesVeh={
                                                                        setCilindrajesVeh
                                                                    }
                                                                    transmisionVeh={
                                                                        transmisionVeh[
                                                                            numeroVehiculo -
                                                                                1
                                                                        ]
                                                                    }
                                                                    setTransmisionVeh={
                                                                        setTransmisionVeh
                                                                    }
                                                                    listMarcasVehiculos={
                                                                        listMarcasVehiculos
                                                                    }
                                                                    listCarroceriasVehiculos={
                                                                        listCarroceriasVehiculos
                                                                    }
                                                                    listModelosVehiculos={
                                                                        listModelosVehiculos
                                                                    }
                                                                    listCilindrajesVehiculos={
                                                                        listCilindrajesVehiculos
                                                                    }
                                                                    tipoSelecVeh={
                                                                        tipoSelecVeh
                                                                    }
                                                                    setTipoSelecVeh={
                                                                        setTipoSelecVeh
                                                                    }
                                                                    marcaSelecVeh={
                                                                        marcaSelecVeh
                                                                    }
                                                                    setMarcaSelecVeh={
                                                                        setMarcaSelecVeh
                                                                    }
                                                                    annoSelecVeh={
                                                                        annoSelecVeh
                                                                    }
                                                                    setAnnoSelecVeh={
                                                                        setAnnoSelecVeh
                                                                    }
                                                                    modeloSelecVeh={
                                                                        modeloSelecVeh
                                                                    }
                                                                    setModeloSelecVeh={
                                                                        setModeloSelecVeh
                                                                    }
                                                                    carroceriaSelecVeh={
                                                                        carroceriaSelecVeh
                                                                    }
                                                                    setCarroceriaSelecVeh={
                                                                        setCarroceriaSelecVeh
                                                                    }
                                                                    transmisionSelecVeh={
                                                                        transmisionSelecVeh
                                                                    }
                                                                    setTransmisionSelecVeh={
                                                                        setTransmisionSelecVeh
                                                                    }
                                                                    cilindrajeSelecVeh={
                                                                        cilindrajeSelecVeh
                                                                    }
                                                                    setCilindrajeSelecVeh={
                                                                        setCilindrajeSelecVeh
                                                                    }
                                                                    traccionSelecVeh={
                                                                        traccionSelecVeh
                                                                    }
                                                                    setTraccionSelecVeh={
                                                                        setTraccionSelecVeh
                                                                    }
                                                                    turboSelecVeh={
                                                                        turboSelecVeh
                                                                    }
                                                                    setTurboSelecVeh={
                                                                        setTurboSelecVeh
                                                                    }
                                                                    combustibleSelecVeh={
                                                                        combustibleSelecVeh
                                                                    }
                                                                    setCombustibleSelecVeh={
                                                                        setCombustibleSelecVeh
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoUno={
                                                                        setMostrarVehiculoSeleccionadoUno
                                                                    }
                                                                    mostrarVehiculoSeleccionadoUno={
                                                                        mostrarVehiculoSeleccionadoUno
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoDos={
                                                                        setMostrarVehiculoSeleccionadoDos
                                                                    }
                                                                    mostrarVehiculoSeleccionadoDos={
                                                                        mostrarVehiculoSeleccionadoDos
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoTres={
                                                                        setMostrarVehiculoSeleccionadoTres
                                                                    }
                                                                    mostrarVehiculoSeleccionadoTres={
                                                                        mostrarVehiculoSeleccionadoTres
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoCuatro={
                                                                        setMostrarVehiculoSeleccionadoCuatro
                                                                    }
                                                                    mostrarVehiculoSeleccionadoCuatro={
                                                                        mostrarVehiculoSeleccionadoCuatro
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoCinco={
                                                                        setMostrarVehiculoSeleccionadoCinco
                                                                    }
                                                                    mostrarVehiculoSeleccionadoCinco={
                                                                        mostrarVehiculoSeleccionadoCinco
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoSeis={
                                                                        setMostrarVehiculoSeleccionadoSeis
                                                                    }
                                                                    mostrarVehiculoSeleccionadoSeis={
                                                                        mostrarVehiculoSeleccionadoSeis
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoSiete={
                                                                        setMostrarVehiculoSeleccionadoSiete
                                                                    }
                                                                    mostrarVehiculoSeleccionadoSiete={
                                                                        mostrarVehiculoSeleccionadoSiete
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoOcho={
                                                                        setMostrarVehiculoSeleccionadoOcho
                                                                    }
                                                                    mostrarVehiculoSeleccionadoOcho={
                                                                        mostrarVehiculoSeleccionadoOcho
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoNueve={
                                                                        setMostrarVehiculoSeleccionadoNueve
                                                                    }
                                                                    mostrarVehiculoSeleccionadoNueve={
                                                                        mostrarVehiculoSeleccionadoNueve
                                                                    }
                                                                    setMostrarVehiculoSeleccionadoDiez={
                                                                        setMostrarVehiculoSeleccionadoDiez
                                                                    }
                                                                    mostrarVehiculoSeleccionadoDiez={
                                                                        mostrarVehiculoSeleccionadoDiez
                                                                    }
                                                                    setMostrarDatosVehiculos={
                                                                        setMostrarDatosVehiculos
                                                                    }
                                                                    contador={
                                                                        contador
                                                                    }
                                                                    setContador={
                                                                        setContador
                                                                    }
                                                                    setLoading={
                                                                        setLoading
                                                                    }
                                                                    numeroVehiculo={
                                                                        numeroVehiculo
                                                                    }
                                                                    duplicarVehiculo={
                                                                        duplicarVehiculo
                                                                    }
                                                                    setDuplicarVehiculo={
                                                                        setDuplicarVehiculo
                                                                    }
                                                                />
                                                            ) : null}

                                                            {mostrarDatosVehiculos ? (
                                                                <div>
                                                                    <DatosVehiculos
                                                                        vehiculos={
                                                                            vehiculos
                                                                        }
                                                                        annos={
                                                                            annos
                                                                        }
                                                                        tipoVeh={
                                                                            tipoVeh
                                                                        }
                                                                        setTipoVeh={
                                                                            setTipoVeh
                                                                        }
                                                                        marcaVeh={
                                                                            marcaVeh
                                                                        }
                                                                        setMarcaVeh={
                                                                            setMarcaVeh
                                                                        }
                                                                        annoVeh={
                                                                            annoVeh
                                                                        }
                                                                        setAnnoVeh={
                                                                            setAnnoVeh
                                                                        }
                                                                        modeloVeh={
                                                                            modeloVeh
                                                                        }
                                                                        setModeloVeh={
                                                                            setModeloVeh
                                                                        }
                                                                        carroceriaVeh={
                                                                            carroceriaVeh
                                                                        }
                                                                        setCarroceriaVeh={
                                                                            setCarroceriaVeh
                                                                        }
                                                                        cilindrajesVeh={
                                                                            cilindrajesVeh
                                                                        }
                                                                        setCilindrajesVeh={
                                                                            setCilindrajesVeh
                                                                        }
                                                                        transmisionVeh={
                                                                            transmisionVeh
                                                                        }
                                                                        setTransmisionVeh={
                                                                            setTransmisionVeh
                                                                        }
                                                                        traccionVeh={
                                                                            traccionVeh
                                                                        }
                                                                        setTraccionVeh={
                                                                            setTraccionVeh
                                                                        }
                                                                        combustibleVeh={
                                                                            combustibleVeh
                                                                        }
                                                                        setCombustibleVeh={
                                                                            setCombustibleVeh
                                                                        }
                                                                        listMarcasVehiculos={
                                                                            listMarcasVehiculos
                                                                        }
                                                                        listCarroceriasVehiculos={
                                                                            listCarroceriasVehiculos
                                                                        }
                                                                        listModelosVehiculos={
                                                                            listModelosVehiculos
                                                                        }
                                                                        listCilindrajesVehiculos={
                                                                            listCilindrajesVehiculos
                                                                        }
                                                                        tipoSelecVeh={
                                                                            tipoSelecVeh
                                                                        }
                                                                        setTipoSelecVeh={
                                                                            setTipoSelecVeh
                                                                        }
                                                                        marcaSelecVeh={
                                                                            marcaSelecVeh
                                                                        }
                                                                        setMarcaSelecVeh={
                                                                            setMarcaSelecVeh
                                                                        }
                                                                        listaMarcaSelecVeh={
                                                                            listaMarcaSelecVeh
                                                                        }
                                                                        setListaMarcaSelecVeh={
                                                                            setListaMarcaSelecVeh
                                                                        }
                                                                        listaModeloSelecVeh={
                                                                            listaModeloSelecVeh
                                                                        }
                                                                        setListaModeloSelecVeh={
                                                                            setListaModeloSelecVeh
                                                                        }
                                                                        listaCarroceriaSelecVeh={
                                                                            listaCarroceriaSelecVeh
                                                                        }
                                                                        setListaCarroceriaSelecVeh={
                                                                            setListaCarroceriaSelecVeh
                                                                        }
                                                                        listaCilindrajeSelecVeh={
                                                                            listaCilindrajeSelecVeh
                                                                        }
                                                                        setListaCilindrajeSelecVeh={
                                                                            setListaCilindrajeSelecVeh
                                                                        }
                                                                        annoSelecVeh={
                                                                            annoSelecVeh
                                                                        }
                                                                        setAnnoSelecVeh={
                                                                            setAnnoSelecVeh
                                                                        }
                                                                        modeloSelecVeh={
                                                                            modeloSelecVeh
                                                                        }
                                                                        setModeloSelecVeh={
                                                                            setModeloSelecVeh
                                                                        }
                                                                        carroceriaSelecVeh={
                                                                            carroceriaSelecVeh
                                                                        }
                                                                        setCarroceriaSelecVeh={
                                                                            setCarroceriaSelecVeh
                                                                        }
                                                                        transmisionSelecVeh={
                                                                            transmisionSelecVeh
                                                                        }
                                                                        setTransmisionSelecVeh={
                                                                            setTransmisionSelecVeh
                                                                        }
                                                                        cilindrajeSelecVeh={
                                                                            cilindrajeSelecVeh
                                                                        }
                                                                        setCilindrajeSelecVeh={
                                                                            setCilindrajeSelecVeh
                                                                        }
                                                                        traccionSelecVeh={
                                                                            traccionSelecVeh
                                                                        }
                                                                        setTraccionSelecVeh={
                                                                            setTraccionSelecVeh
                                                                        }
                                                                        turboSelecVeh={
                                                                            turboSelecVeh
                                                                        }
                                                                        setTurboSelecVeh={
                                                                            setTurboSelecVeh
                                                                        }
                                                                        combustibleSelecVeh={
                                                                            combustibleSelecVeh
                                                                        }
                                                                        setCombustibleSelecVeh={
                                                                            setCombustibleSelecVeh
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoUno={
                                                                            setMostrarVehiculoSeleccionadoUno
                                                                        }
                                                                        mostrarVehiculoSeleccionadoUno={
                                                                            mostrarVehiculoSeleccionadoUno
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoDos={
                                                                            setMostrarVehiculoSeleccionadoDos
                                                                        }
                                                                        mostrarVehiculoSeleccionadoDos={
                                                                            mostrarVehiculoSeleccionadoDos
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoTres={
                                                                            setMostrarVehiculoSeleccionadoTres
                                                                        }
                                                                        mostrarVehiculoSeleccionadoTres={
                                                                            mostrarVehiculoSeleccionadoTres
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoCuatro={
                                                                            setMostrarVehiculoSeleccionadoCuatro
                                                                        }
                                                                        mostrarVehiculoSeleccionadoCuatro={
                                                                            mostrarVehiculoSeleccionadoCuatro
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoCinco={
                                                                            setMostrarVehiculoSeleccionadoCinco
                                                                        }
                                                                        mostrarVehiculoSeleccionadoCinco={
                                                                            mostrarVehiculoSeleccionadoCinco
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoSeis={
                                                                            setMostrarVehiculoSeleccionadoSeis
                                                                        }
                                                                        mostrarVehiculoSeleccionadoSeis={
                                                                            mostrarVehiculoSeleccionadoSeis
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoSiete={
                                                                            setMostrarVehiculoSeleccionadoSiete
                                                                        }
                                                                        mostrarVehiculoSeleccionadoSiete={
                                                                            mostrarVehiculoSeleccionadoSiete
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoOcho={
                                                                            setMostrarVehiculoSeleccionadoOcho
                                                                        }
                                                                        mostrarVehiculoSeleccionadoOcho={
                                                                            mostrarVehiculoSeleccionadoOcho
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoNueve={
                                                                            setMostrarVehiculoSeleccionadoNueve
                                                                        }
                                                                        mostrarVehiculoSeleccionadoNueve={
                                                                            mostrarVehiculoSeleccionadoNueve
                                                                        }
                                                                        setMostrarVehiculoSeleccionadoDiez={
                                                                            setMostrarVehiculoSeleccionadoDiez
                                                                        }
                                                                        mostrarVehiculoSeleccionadoDiez={
                                                                            mostrarVehiculoSeleccionadoDiez
                                                                        }
                                                                        setMostrarDatosVehiculos={
                                                                            setMostrarDatosVehiculos
                                                                        }
                                                                        contador={
                                                                            contador
                                                                        }
                                                                        setContador={
                                                                            setContador
                                                                        }
                                                                        editarVehiculo={
                                                                            editarVehiculo
                                                                        }
                                                                        setEditarVehiculo={
                                                                            setEditarVehiculo
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
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
                                                                            agregarDatosLatoneria()
                                                                        }>
                                                                        {
                                                                            <h3>
                                                                                Oprime
                                                                                aquí
                                                                                para
                                                                                continuar
                                                                                con
                                                                                el
                                                                                registro
                                                                                de
                                                                                producto
                                                                            </h3>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : null
                                                ) : (
                                                    console.log(
                                                        "VALOR GENERICO : ",
                                                        generico
                                                    )
                                                )}
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
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}

                        {showIngresoFotos ? (
                            <RegistrarFotos
                                showIngresoFotos={showIngresoFotos}
                                setShowIngresoFotos={setShowIngresoFotos}
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
    } = props;

    const dispatch = useDispatch();
    const [showModalProducto, setShowModalProducto] = useState(false);

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [
        mostrarModalComentariosHabitaculo,
        setMostrarModalComentariosHabitaculo,
    ] = useState(false);
    const [textoPosicionHabitaculo, setTextoPosicionHabitaculo] = useState(0);

    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);
    const [showModalDatosProducto, setShowModalDatosProducto] = useState(false);

    const [ubicarProducto, setUbicarProducto] = useState(0);

    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

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

    const mostrarModalPosicionProducto = () => {
        if (
            ubicarProductoLatoneria === false &&
            ubicarProductoHabitaculo === false &&
            ubicarProductoMotor === false
        ) {
            swal({
                title: "Posición Producto",
                text: "Debes Selecccionar una posición para tu producto!",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }

        if (ubicarProductoLatoneria) {
            setShowModalPosicionProductoLatoneria(true);
            setUbicarProducto(1);
        } else if (ubicarProductoHabitaculo) {
            setShowModalPosicionProductoHabitaculo(true);
            setUbicarProducto(2);
        } else if (ubicarProductoMotor) {
            setShowModalPosicionProductoMotor(true);
            setUbicarProducto(3);
        } else {
            swal({
                title: "Posición Producto",
                text: "Recuerda, Debes Seleccionar la posicion del producto !",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }
        setShowModalDatosProducto(true);
    };

    const mostrarModalDatosProducto = () => {
        // Coloca los datos en state sobre donde esta ubicado el producto a vender
        //dispatch(getUbicarProducto(ubicarproducto));
        setShowModalDatosProducto(true);
        setShowModalLatoneria(false);
        setSeleccionoUbicacionProducto(true);
    };

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
    };

    const SelecUbicarProductoLatoneria = () => {
        setUbicarProductoLatoneria(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
    };

    const SelecUbicarProductoHabitaculo = () => {
        setUbicarProductoHabitaculo(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
    };

    const SelecUbicarProductoMotor = () => {
        setUbicarProductoMotor(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
    };

    const mostrarComentarioPosicionIzquierdo = () => {
        setShowModalComentariosPosicionIzquierdo(true);
    };

    const mostrarComentarioPosicionCentro = () => {
        setShowModalComentariosPosicionCentro(true);
    };

    const mostrarComentarioPosicionDerecho = () => {
        setShowModalComentariosPosicionDerecho(true);
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
        setPosicionProductoIzquierdo(true);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(false);
    };

    const SeleccionePosicionProductoCentro = () => {
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(true);
        setPosicionProductoDerecho(false);
    };

    const SeleccionePosicionProductoDerecho = () => {
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(true);
    };

    const SeleccioneConsola = () => {
        setPosicionProductoConsola(true);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(false);
    };

    const SeleccioneAsiento = () => {
        setPosicionProductoConsola(true);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(false);
    };

    const SeleccioneTecho = () => {
        setPosicionProductoConsola(true);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(false);
    };

    const onCloseModalPosicionProducto = () => {
        setShowModalPosicionProductoLatoneria(false);
    };

    return (
        <div className="ps-page__header ml-60">
            <div>
                <div className="ml-120 mb-20">
                    <h3 className="textoimagenesilustrativas">
                        ! Seleccionemos donde esta ubicado tu producto ¡
                    </h3>
                </div>

                <ButtonGroup vertical>
                    <Row>
                        <Col xl={8} lg={8} md={8} xs={8}>
                            <Button
                                className="botonpartesvehiculo botonazul"
                                onClick={SelecUbicarProductoLatoneria}>
                                LATONERIA
                            </Button>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button
                                className="botonpartesvehiculoinfo botonazul"
                                onClick={mostrarComentariolatoneria}>
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
                        <Col xl={8} lg={8} md={8} xs={8}>
                            <Button
                                className="botonpartesvehiculo botonazul"
                                onClick={SelecUbicarProductoHabitaculo}>
                                HABITACULO
                            </Button>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button
                                className="botonpartesvehiculoinfo botonazul"
                                onClick={mostrarComentariohabitaculo}>
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
                        <Col xl={8} lg={8} md={8} xs={8}>
                            <Button
                                className="botonpartesvehiculo botonazul"
                                onClick={SelecUbicarProductoMotor}>
                                MOTOR/ELECTRICO
                            </Button>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button
                                className="botonpartesvehiculoinfo"
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
                </ButtonGroup>
                <Row className="mt-20 mb-30">
                    <Col xl={1} lg={1} md={1} xs={1}></Col>
                    <Col xl={3} lg={3} md={3} xs={3}>
                        <Button
                            className="ps-btn ml-30"
                            onClick={() => mostrarModalPosicionProducto()}>
                            {" "}
                            Aceptar{" "}
                        </Button>
                    </Col>
                    <Col xl={4} lg={4} md={4} xs={4}>
                        <Button className="ps-btn ml-100"> Cancelar </Button>
                    </Col>
                </Row>
            </div>

            <div>
                <Modal
                    className="modalcomentarioslatoneriasedan"
                    show={showModalComentariosLatoneria}>
                    <Modal.Header closeButton>
                        <h2>PRODUCTOS LATONERIA </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>
                            {" "}
                            En esta ventana se debe describir en que consisten
                            los productos Incluidos en la categoria latoneria
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                        </h2>
                        <ButtonGroup vertical></ButtonGroup>
                    </Modal.Body>
                    <Button
                        onClick={() => setShowModalComentariosLatoneria(false)}>
                        {" "}
                        Cancelar{" "}
                    </Button>
                    <Modal.Footer>
                        <Button
                            onClick={() =>
                                setShowModalComentariosLatoneria(false)
                            }>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal size="sm" show={showModalComentariosHabitaculo}>
                    <Modal.Header closeButton>
                        <h2>PRODUCTOS HABITACULO </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>
                            {" "}
                            En esta ventana se debe describir en que consisten
                            los productos Incluidos en la categoria habitaculo
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                        </h2>
                        <ButtonGroup vertical></ButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() =>
                                setShowModalComentariosHabitaculo(false)
                            }>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal size="sm" show={showModalComentariosMotor}>
                    <Modal.Header closeButton>
                        <h2>PRODUCTOS MOTOR/ELECTRICO </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>
                            {" "}
                            En esta ventana se debe describir en que consisten
                            los productos Incluidos en la categoria
                            Motor/Eléctrico XXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXX
                        </h2>
                        <ButtonGroup vertical></ButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => setShowModalComentariosMotor(false)}>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {showModalDatosProducto ? (
                ubicarProductoLatoneria ? (
                    <div>
                        <div className="ml-90">
                            <Row>
                                <Col xl={10} lg={10} md={10} sm={10}>
                                    <div className="botonimagenesilustrativas">
                                        <h3 className="textoimagenesilustrativas">
                                            ! Escoge en que posición del
                                            vehículo esta el producto ¡
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <div className="botonimagenesilustrativas">
                                    <h3 className="textoimagenesilustrativas ml-140">
                                        Tu producto esta ubicado en ?
                                    </h3>
                                </div>
                                <ButtonGroup vertical className="ml-10">
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={
                                                    SeleccionePosicionProductoIzquierdo
                                                }>
                                                A. LADO IZQUIERDO/CONDUCTOR
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
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
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={
                                                    SeleccionePosicionProductoCentro
                                                }>
                                                B. CENTRO
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
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
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={
                                                    SeleccionePosicionProductoDerecho
                                                }>
                                                C. LADO DERECHO/COPILOTO
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
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
                                </ButtonGroup>
                            </Col>
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                xs={5}
                                className="ml-60 mt-10">
                                <Card.Body>
                                    <Card.Img
                                        src="/static/img/createproducts/posicionproductovehiculo.PNG"
                                        alt="Card image"
                                    />
                                </Card.Body>
                                <Card.Footer>
                                    <h2 className="seccionesVehtexto">
                                        {" "}
                                        Secciones del Vehículo{" "}
                                    </h2>
                                </Card.Footer>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <div className="ml-140">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            mostrarModalDatosProducto()
                                        }>
                                        {" "}
                                        Aceptar
                                    </Button>
                                </Col>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            setShowModalPosicionProductoLatoneria(
                                                false
                                            )
                                        }>
                                        {" "}
                                        Cancelar{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : ubicarProductoHabitaculo ? (
                    <div>
                        <div className="ml-90">
                            <Row>
                                <Col xl={10} lg={10} md={10} sm={10}>
                                    <div className="botonimagenesilustrativas">
                                        <h3 className="textoimagenesilustrativas">
                                            ! Escoge en que posición del
                                            habitáculo esta ubicado el producto
                                            ¡
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <ButtonGroup vertical className="ml-10 mt-40">
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneConsola}>
                                                A. CONSOLA
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioConsola
                                                }>
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
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneAsiento}>
                                                B. ASIENTO
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioAsiento
                                                }>
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
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                C. TECHO
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                </ButtonGroup>
                            </Col>
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                xs={5}
                                className="ml-60 mt-10">
                                <Card.Body>
                                    <Card.Img
                                        width="60px"
                                        height="340px"
                                        src="/static/img/createproducts/Sedanhabitaculobase.jpg"
                                        alt="Card image"
                                    />
                                </Card.Body>
                                <Card.Footer>
                                    <h2 className="seccionesVehtexto">
                                        {" "}
                                        Espacio Interior del Vehículo{" "}
                                    </h2>
                                </Card.Footer>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <div className="ml-140">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            mostrarModalDatosProducto()
                                        }>
                                        {" "}
                                        Aceptar
                                    </Button>
                                </Col>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            setShowModalPosicionProductoLatoneria(
                                                false
                                            )
                                        }>
                                        {" "}
                                        Cancelar{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : ubicarProductoMotor ? (
                    <div>
                        <div className="ml-90">
                            <Row>
                                <Col xl={10} lg={10} md={10} sm={10}>
                                    <div className="botonimagenesilustrativas">
                                        <h3 className="textoimagenesilustrativas">
                                            ! Escoge en que posición del
                                            habitáculo esta ubicado el producto
                                            ¡
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <ButtonGroup vertical className="ml-10 mt-40">
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneConsola}>
                                                Aireacondicionado
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioConsola
                                                }>
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
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneAsiento}>
                                                Dirección
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioAsiento
                                                }>
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
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Frenos
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Caja
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Refrigeración
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Arranque
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Embrague
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Escape
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Inyección
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Refrigeración Caja
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Sistema Eléctrico Motor
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Sistema Eléctrico General
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Suspensión
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Transmisión
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Parabrisas
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                    <Row>
                                        <Col lg={1} xl={1} xs={1} md={1}>
                                            <Button
                                                className="botonposicionproducto"
                                                onClick={SeleccioneTecho}>
                                                Motor
                                            </Button>
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            xs={1}
                                            md={1}
                                            className="mlmenos20">
                                            <Button
                                                className="botonposicionproductoinfo"
                                                onClick={
                                                    mostrarComentarioTecho
                                                }>
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
                                </ButtonGroup>
                            </Col>
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                xs={5}
                                className="ml-60 mt-10">
                                <Card.Body>
                                    <Card.Img
                                        width="60px"
                                        height="340px"
                                        src="/static/img/createproducts/motorgeneral.jpg"
                                        alt="Card image"
                                    />
                                </Card.Body>
                                <Card.Footer>
                                    <h2 className="seccionesVehtexto">
                                        {" "}
                                        Sistemas del Motor/Eléctrico{" "}
                                    </h2>
                                </Card.Footer>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <div className="ml-140">
                            <Row>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            mostrarModalDatosProducto()
                                        }>
                                        {" "}
                                        Aceptar
                                    </Button>
                                </Col>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={() =>
                                            setShowModalPosicionProductoLatoneria(
                                                false
                                            )
                                        }>
                                        {" "}
                                        Cancelar{" "}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
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

            <div>
                <Modal size="sm" show={showModalComentariosPosicionIzquierdo}>
                    <Modal.Header closeButton>
                        <h2>PRODUCTOS LADO IZQUIERDO DEL Veh</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>
                            {" "}
                            En esta ventana se debe describir en que consisten
                            los productos Incluidos en la parte izquierda del
                            Veh XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                        </h2>
                        <ButtonGroup vertical></ButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() =>
                                setShowModalComentariosPosicionIzquierdo(false)
                            }>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal size="sm" show={showModalComentariosPosicionCentro}>
                    <Modal.Header closeButton>
                        <h2>PRODUCTOS CENTRO DEL Veh </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>
                            {" "}
                            En esta ventana se debe describir en que consisten
                            los productos Incluidos en la parte central del Veh
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                        </h2>
                        <ButtonGroup vertical></ButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() =>
                                setShowModalComentariosPosicionCentro(false)
                            }>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Modal size="sm" show={showModalComentariosPosicionDerecho}>
                    <Modal.Header closeButton>
                        <h2>PRODUCTOS LADO DERECHO DEL Veh </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>
                            {" "}
                            En esta ventana se debe describir en que consisten
                            los productos Incluidos en el lado derecho del Veh
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX
                        </h2>
                        <ButtonGroup vertical></ButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() =>
                                setShowModalComentariosPosicionDerecho(false)
                            }>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Modal.Footer>
                </Modal>
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

    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );
    const dispatch = useDispatch();
    const router = useRouter();
    //console.log("DATOS Veh : ", caracteristicasVeh);
    const { setShowModalProducto, showModalProducto } = props;
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("Subir Imagenes");

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const tituloOnChange = (e) => {
        console.log("LONGITUD TITULO NOMBRE : ", e);
        var strLength = e.length;
        console.log("LONGITUD : ", strLength);
    };

    const calificacionproducto = [
        { label: "Mal estado (para reparar)", value: 1 },
        { label: "Regular estado", value: 2 },
        { label: "Buen estado", value: 3 },
        { label: "Excelente estado (nuevo o casi nuevo)", value: 4 },
    ];

    const condicionproducto = [
        { label: "Nuevo", value: 1 },
        { label: "Usado", value: 2 },
        { label: "Para repuesto", value: 3 },
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
                "Debe ingresar el Nombre del Prodcto!",
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
        datosProductoUno();
    };

    const datosProductoUno = () => {
        const datosproductouno = {
            titulonombre: formData.titulonombre,
            marcarepuesto: formData.marcarepuesto,
            condicion: formData.condicion,
            calificacionproducto: formData.calificacionproducto,
            compatible: formData.compatible,
            numerodeparte: formData.numerodeparte,
        };

        //console.log("DATOS PRODUCTO UNO : ", datosproductouno);
        //Asigna Caracteristicas del Veh Selecdo al state
        //dispatch(getDatosProducto(datosproductouno));
        onCloseModaDatosProductos();
    };

    const onCloseModaDatosProductos = () => {
        setShowDatosProductos(false);
        setShowDatosProductosAdicionales(true);
    };

    return (
        <div className="ps-page__header">
            <div className="ml-250 mt-10">
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}>
                        <div className="botonimagenesilustrativas mt-10">
                            <h3 className="textoimagenesilustrativas ">
                                Ingresa la información sobre tu producto.
                            </h3>
                        </div>
                    </Col>
                </Row>
            </div>
            <br />
            <form onChange={onChange} className="ml-200">
                <div className="ps-form--review">
                    <div className="ps-form__group inputdatosproducto">
                        <label className="ps-form__label">
                            * Nombre del producto
                        </label>
                        <input
                            className="form-control ps-form__input"
                            name="titulonombre"
                            onChange={(e) => tituloOnChange(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="ps-form__group inputdatosproducto">
                        <label className="ps-form__label">
                            * Marca del Repuesto
                        </label>
                        <input
                            className="form-control ps-form__input"
                            name="marcarepuesto"
                            type="text"
                        />
                    </div>
                    <div className="ps-form__group inputdatosproducto">
                        <label className="ps-form__label">
                            * Condición del Producto Nuevo o Usado
                        </label>
                        <div className="form-control ps-form__input">
                            <select
                                className="custom-select ps-form__labelselect"
                                name="condicion">
                                <option
                                    selected
                                    className="select-fontsize ps-form__label"></option>
                                {condicionproducto &&
                                    condicionproducto.map((itemselect) => {
                                        return (
                                            <option value={itemselect.value}>
                                                {itemselect.label}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className="ps-form__group inputdatosproducto">
                        <label className="ps-form__label">
                            * Califica tu Producto
                        </label>
                        <div className="form-control ps-form__input">
                            <select
                                className="custom-select ps-form__labelselect"
                                name="calificacionproducto">
                                <option
                                    selected
                                    className="select-fontsize ps-form__label"></option>
                                {calificacionproducto &&
                                    calificacionproducto.map((itemselect) => {
                                        return (
                                            <option value={itemselect.value}>
                                                {itemselect.label}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className="ps-form__group inputdatosproducto">
                        <label className="ps-form__label">
                            Numero de Parte
                        </label>
                        <input
                            className="form-control ps-form__input"
                            name="numerodeparte"
                            type="text"
                            defaultValue={0}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputComponent: NumberFormatCelular,
                            }}
                        />
                    </div>
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

            <div className="botongrabarproducto">
                <Row>
                    <Col xl={1} lg={1} md={1} xs={1}></Col>
                    <Col xl={2} lg={2} md={2} xs={2}>
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
                            Click para Continuar
                        </div>
                    </Col>
                    <Col xl={4} lg={4} md={4} xs={4}>
                        <Button
                            className="ps-btn"
                            onClick={() => setShowModalProducto(false)}>
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Col>
                </Row>
            </div>
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
    } = props;

    const [showModalFotos, setShowModalFotos] = useState(false);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const porpartes = [
        { label: "Si se vende por partes", value: 1 },
        { label: "No, producto se vende completo", value: 2 },
    ];

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
        datosProductoDos();
    };

    const datosProductoDos = () => {
        //setSelectedOption(selectedOption);
        //console.log(`Numero de Unidades :`, formData.numerodeunidades);
        //console.log(`Descripción Producto :`, formData.descripcionproducto);
        //console.log(`Vendo por Partes : `, formData.vendeporpartes);
        //console.log(`Peso : `, formData.peso);
        //console.log(`Largo : `, formData.largo);
        //console.log(`Ancho : `, formData.ancho);
        //console.log(`Alto : `, formData.alto);

        const datosproductodos = {
            numerodeunidades: formData.numerodeunidades,
            precio: formData.precio,
            descripcionproducto: formData.descripcionproducto,
            vendeporpartes: formData.vendeporpartes,
            peso: formData.peso,
            largo: formData.largo,
            ancho: formData.ancho,
            alto: formData.alto,
        };

        console.log("DATOS PRODUCTO DOS : ", datosproductodos);

        //Asigna Caracteristicas del Veh Selecdo al state
        // dispatch(getDatosProductoUno(datosproductodos));
        onCloseModalDatosAdicionalProductos();
    };

    const onCloseModalDatosAdicionalProductos = () => {
        setShowDatosProductosAdicionales(false);
        setShowIngresoFotos(true);
    };

    return (
        <div className="ps-page__header">
            <div>
                <div>
                    <h3 className="textoimagenesilustrativas ml-250 mt-40">
                        Uf, falta poco, aún necesitamos datos adicionales del
                        producto.
                    </h3>
                </div>

                <br />
                <form onChange={onChange} className="ml-100">
                    <div className="ps-form--review">
                        <div className="ps-form__group inputdatosproductoadicional">
                            <Row>
                                <Col xs lg={6}>
                                    <label className="ps-form__label">
                                        Número de Unidades
                                    </label>
                                    <NumberFormat
                                        className="form-control ps-form__input"
                                        name="numerodeunidades"
                                        placeholder="Ingrese número de unidades"
                                        thousandSeparator={true}
                                        prefix={""}
                                    />
                                </Col>
                                <Col xs lg={6}>
                                    <label className="ps-form__label">
                                        Precio del producto
                                    </label>
                                    <NumberFormat
                                        className="form-control ps-form__input"
                                        name="precio"
                                        placeholder="Ingrese precio del producto"
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="ps-form__group inputdatosproductoadicional mt-10">
                            <label className="ps-form__label">
                                Descripción del producto
                            </label>
                            <input
                                className="form-control ps-form__input"
                                name="descripcionproducto"
                                type="text"
                            />
                        </div>
                        <div className="ps-form__group inputdatosproductoadicional mt-10">
                            <Row>
                                <Col xs lg={6}>
                                    <label className="ps-form__label">
                                        Vende por partes
                                    </label>
                                    <div className="form-control ps-form__input">
                                        <select
                                            className="custom-select ps-form__labelselect"
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
                                <Col xs lg={6}>
                                    <label className="ps-form__label">
                                        Peso del producto
                                    </label>
                                    <NumberFormat
                                        className="form-control ps-form__input"
                                        name="peso"
                                        placeholder="Ingrese peso del producto en kilogramos"
                                        thousandSeparator={true}
                                        prefix={""}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <br />
                        <div className="ps-form__group inputdatosproductoadicional">
                            <label className="labeldimensionesproducto text-center">
                                Las dimensiones del producto las debes ingresar
                                en Centimetros
                            </label>
                            <Row>
                                <Col xs lg={4}>
                                    <label className="ps-form__label">
                                        Largo del producto
                                    </label>
                                    <NumberFormat
                                        className="form-control ps-form__input"
                                        name="largo"
                                        placeholder="Ingrese dimensiones en cms"
                                        thousandSeparator={true}
                                        prefix={""}
                                    />
                                </Col>
                                <Col xs lg={4}>
                                    <label className="ps-form__label">
                                        Ancho del producto
                                    </label>
                                    <NumberFormat
                                        className="form-control ps-form__input"
                                        name="ancho"
                                        placeholder="Ingrese dimensiones en cms"
                                        thousandSeparator={true}
                                        prefix={""}
                                    />
                                </Col>
                                <Col xs lg={4}>
                                    <label className="ps-form__label">
                                        Altura del producto
                                    </label>
                                    <NumberFormat
                                        className="form-control ps-form__input"
                                        name="alto"
                                        placeholder="Ingrese dimensiones en cms"
                                        thousandSeparator={true}
                                        prefix={""}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </form>

                <div className="botongrabaradicionalproducto mt-20">
                    <Row>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <div>
                                <p className="ps-form__text">
                                    * Datos Requeridos.
                                </p>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={4} xs={4}>
                            <div
                                className="ps-btn"
                                onClick={datosAdicionalesProducto}>
                                Vamos al ingreso de fotos del producto
                            </div>
                        </Col>
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <Button className="ps-btn"> Cancelar </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

function RegistrarFotos(props) {
    const { showIngresoFotos, setShowIngresoFotos } = props;

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
        if (!fileName) {
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
            let longitud = fileName.length;
            let arreglofotos = [];
            let contador = 0;
            await Array.from(fileName).forEach((archivo) => {
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

    const grabarfoto = async (dato, ext) => {
        //console.log("IMAGEN EN PRUEBA : ", dato[1]);

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

        //console.log("DATOS IMAGENES : ", datosimagenes);
        //return;
        const formdata = new FormData();
        formdata.append("id", 0);
        formdata.append(
            "productogenerico",
            caracteristicasVeh.productogenerico
        );
        formdata.append("tipoVeh", caracteristicasVeh.tipoVeh);
        formdata.append("carroceria", caracteristicasVeh.carroceria);
        formdata.append("marca", caracteristicasVeh.marca);
        formdata.append("anno", caracteristicasVeh.anno);
        formdata.append("modelo", caracteristicasVeh.modelo);
        formdata.append(
            "cilindrajemotor",
            caracteristicasmotor.cilindradamotor
        );
        formdata.append(
            "tipocombustible",
            caracteristicasmotor.tipocombustible
        );
        formdata.append("transmision", caracteristicasmotor.tipotransmision);
        formdata.append("tipotraccion", caracteristicasmotor.traccionmotor);
        formdata.append("turbocompresor", caracteristicasmotor.turbomotor);
        formdata.append("posicionproducto", datosubicarproducto.ubicarPosicion);
        formdata.append("partedelVeh", datosubicarproducto.ubicarProducto);
        formdata.append("posicionproducto", datosubicarproducto.ubicarPosicion);
        formdata.append("titulonombre", datosproductouno.titulonombre);
        formdata.append("marcarepuesto", datosproductouno.marcarepuesto);
        formdata.append("condicion", datosproductouno.condicion);
        formdata.append(
            "estadoproducto",
            datosproductouno.calificacionproducto
        );
        formdata.append("numerodeunidades", datosproductodos.numerodeunidades);
        formdata.append("precio", datosproductodos.precio);
        formdata.append("numerodeparte", datosproductouno.numerodeparte);
        formdata.append("compatible", datosproductouno.compatible);
        formdata.append(
            "descripcionproducto",
            datosproductodos.descripcionproducto
        );
        formdata.append("vendeporpartes", datosproductodos.vendeporpartes);
        formdata.append("peso", datosproductodos.peso);
        formdata.append("largo", datosproductodos.largo);
        formdata.append("ancho", datosproductodos.ancho);
        formdata.append("lto", datosproductodos.alto);
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

        console.log("FORM DATA : ", formdata);

        //console.log("DATOS CREACION DE PRODUCTO : ", producto);
        let url = "https://sitbusiness.co/mrp/api";

        await fetch(`${url}/16`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            if (response) {
                console.log("VALOR RESPONSE : ", response);
                if (response.status === 200) {
                    swal(
                        "Mercado Repuesto",
                        "Fotos productos grabadas de forma correcta!",
                        "success",
                        { button: "Aceptar" }
                    );
                    console.log("VALOR QUE RETORNA 200 : ", response.status);
                    setLoading(false);
                    router.push("/");
                } else {
                    swal(
                        "Mercado Repuesto",
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    setLoading(false);
                    router.push("/");
                }
            } else {
                console.log("RESPONSE INGRESO FOTOS : ", response);
            }
        });
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
            <div className="ml-90">
                <Row>
                    <Col xl={4} lg={4} md={4} sm={4}></Col>
                    <Col xl={7} lg={7} md={7} sm={7}>
                        <div className="tamañotextocrearproducto">
                            SUBIR FOTOS DEL PRODUCTO
                        </div>
                    </Col>
                </Row>
            </div>
            <br />
            <form onChange={onChange}>
                <div className="ps-form--review">
                    <div className="ps-form__group">
                        <Form.Group
                            controlId="formFileMultiple"
                            className="ps-form__group ml-250">
                            <div className="ml-10">
                                <Row>
                                    <Col
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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
                                        className="mr-50"
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
                                                                                        X
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
                                                        <div className="inputtextobotondoctojuridica">
                                                            Ingresar Documento
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

            <div className="botongrabarproducto">
                <Row>
                    <Col xl={2} lg={2} xs={2} md={2}></Col>
                    <Col xl={3} lg={3} xs={3} md={3}>
                        <div>
                            <p className="ps-form__text">
                                Incluye como mínimo una foto!
                            </p>
                        </div>
                    </Col>
                    <Col xl={2} lg={2} xs={2} md={2}>
                        <div className="ps-btn" onClick={generabase64}>
                            Grabar Producto
                        </div>
                    </Col>
                    <Col xl={3} lg={3} xs={3} md={3}>
                        <Button className="ps-btn"> Cancelar </Button>
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
