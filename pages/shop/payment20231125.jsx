import React, { useEffect, useState, useRef } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ModalMensajes from "../mensajes/ModalMensajes";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { myNumber } from "../../utilities/ArrayFunctions";
import PropTypes, { func } from "prop-types";
import { validateEmail } from "../../utilities/Validations";
import { useRouter } from "next/router";
import {
    Button,
    Row,
    Col,
    Card,
    Form,
    ListGroup,
    Tooltip,
    Overlay,
    Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import shortid from "shortid";

let referencia = shortid();

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
        &#x25bc;
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchcity"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value.toLowerCase())}
                    //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                {}
            </div>
        );
    }
);

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

const breadcrumb = [
    {
        text: "Inicio",
        url: "/",
    },
    {
        text: "Tienda",
        url: "/shopping-cart",
    },
    {
        text: "Pagos",
    },
];

let undsel = [];
let itemaddress = [];

const Payment = () => {
    const router = useRouter();
    const irA = useRef(null);
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [addressSelect, setAddressSelect] = useState([]);
    const [DireccionEnvio, setDireccionEnvio] = useState([]);
    const [itemCompra, setItemCompra] = useState([]);
    const [prdComprarAhora, setPrdComprarAhora] = useState([]);

    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");

    const [selectdepto, setSelectDepto] = useState("Seleccione departamento");
    const [selectciudad, setSelectCiudad] = useState("Seleccione ciudad");
    const [tipodocumento, setTipoDocumento] = useState("Tipo documento");
    const [enableCiudad, setEnableCiudad] = useState(true);
    const [enableTipoCalle, setEnableTipoCalle] = useState(true);
    const [contadorLetrasDescripcion, setContadorLetrasDescripcion] =
        useState(0);
    const [tiposDctos, setTiposDctos] = useState([]);

    const [alertBtnDpto, setAlertBtnDpto] = useState("dropdowncustomaddress");
    const [alertBtnCiudad, setAlertBtnCiudad] = useState(
        "dropdowncustomaddress"
    );
    const [alertBtnTipoDcto, setAlertBtnTipoDcto] = useState(
        "dropdowncustomtipodcto"
    );
    const [alertBtnNroDcto, setAlertBtnNroDcto] = useState("cajanrodocto");
    const [alertBtnEmail, setAlertBtnEmail] = useState("nombrespasarela");
    const [alertBtnDireccion, setAlertBtnDireccion] =
        useState("nombrespasarela");
    const [alertBtnComplemento, setAlertBtnComplemento] = useState(
        "dropdowncustomtipodcto"
    );
    const [alertBtnNombre, setAlertBtnNombre] = useState(
        "nombreapellidorecibe"
    );
    const [alertBtnTelefono, setAlertBtnTelefono] =
        useState("cajanumerotelefono");

    const [tituloDescripcion, setTituloDescripcion] = useState(null);
    const [textoDescripcion, setTextoDescripcion] = useState(
        "Información adicional relacionada con el pago"
    );

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [dptoSeleccionado, setDptoSeleccionado] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
    const [nombresSeleccionado, setNombresSeleccionado] = useState(null);
    const [apellidosSeleccionado, setApellidosSeleccionado] = useState(null);
    const [calleSeleccionada, setCalleSeleccionada] = useState(null);
    const [emailSeleccionado, setEmailSeleccionado] = useState(null);
    const [direccionSeleccionado, setDireccionSeleccionado] = useState(null);
    const [telefonoSeleccionado, setTelefonoSeleccionado] = useState(null);
    const [nroDocumentoSeleccionado, setNroDocumentoSeleccionado] =
        useState(null);
    const [irAPasarelaPago, setIrAPasarelaPago] = useState(false);
    const [infoUserPago, setInfoUserPago] = useState([]);

    const [tipoDctoSeleccionada, setTipoDctoSeleccionada] = useState(null);
    const [ciudadDepto, setCiudadDepto] = useState([]);
    const [inputDescripcionProducto, setInputDescripcionProducto] = useState(
        "form-control ps-form__input complementoaddress colorboder"
    );

    const [classNombre, setClassNombre] = useState("nombrespasarela");
    const [classBoxShipping, setClassBoxShipping] = useState(
        "boxshippinginformation"
    );
    const [classBtnContinuar, setClassBtnContinuar] = useState(
        "btnaddaddresspayment"
    );

    const [classApellido, setClassApellido] = useState("nombrespasarela");
    const [datosUsuario, setDatosUsuario] = useState([]);

    const [fecha, setFecha] = useState(null);
    const [idSelect, setIdSelect] = useState(null);

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let departamentos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_departamentos
    );
    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );

    //console.log("DATOSUSU: ", datosusuarios);
    useEffect(() => {
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        let direccionenvio = JSON.parse(localStorage.getItem("direccionenvio"));
        setDireccionEnvio(direccionenvio);
        //console.log("DAITEM : ", datitem);
        setItemCompra(datitem);
        let direcciones = "";
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "65",
                params,
            })
                .then((res) => {
                    res.data.listardireccionesusuario;
                    direcciones = res.data.listardireccionesusuario[0];
                    setDireccionesUsuarios(res.data.listardireccionesusuario);
                    setDireccion(
                        res.data.listardireccionesusuario[0].direccion
                    );
                    setCiudad(
                        res.data.listardireccionesusuario[0].nombreciudad
                    );
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerItems();

        const leerDataUser = async () => {
            let params = {
                uid: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    
                    let telefono = res.data[0].celular.substring(3, 15);
                    setDatosUsuario(res.data[0]);
                    setNombresSeleccionado(res.data[0].primernombre);
                    setApellidosSeleccionado(res.data[0].primerapellido);
                    setTipoDocumento(res.data[0].nombredocumento);
                    setTipoDctoSeleccionada(res.data[0].tipoidentificacion);

                    setDptoSeleccionado(direcciones.codigo_dep);
                    setCiudadSeleccionada(direcciones.ciudad);
                    setTituloDescripcion(".");
                    setNroDocumentoSeleccionado(res.data[0].identificacion);
                    setTelefonoSeleccionado(telefono);
                    setEmailSeleccionado(res.data[0].email);
                    setSelectDepto(direcciones.nombre_dep);
                    setSelectCiudad(direcciones.nombreciudad);
                    setDireccionSeleccionado(direcciones.direccion);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos usuario");
                });
        };
        leerDataUser();
    }, [datosusuarios]);

    useEffect(() => {
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
                    setPrdComprarAhora(res.data.listarcarritocompra);
                    console.log(
                        "DAT SHOPPING CART: ",
                        res.data.listarcarritocompra
                    );

                    res.data.listarcarritocompra &&
                        res.data.listarcarritocompra.map((item, index) => {
                            undsel[index] = item.cantidad;
                        });
                    //ispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                })
                .catch(function (error) {
                    console.log("Error leyendo datos carrito de compras");
                });
        };
        leerItems();

        const leerTiposDctos = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "7",
                params,
            })
                .then((res) => {
                    setTiposDctos(res.data.tipoidentificacion);
                    //ispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                })
                .catch(function (error) {
                    console.log("Error leyendo tipos de documentos");
                });
        };
        leerTiposDctos();
    }, [datosusuarios]);

    const reiniciardpto = () => {
        setAlertBtnDpto("dropdowncustomaddress");
    };

    const reiniciarciudad = () => {
        setAlertBtnCiudad("dropdowncustomaddress");
    };

    const reiniciartipodcto = () => {
        setAlertBtnTipoDcto("dropdowncustomtipodcto");
    };

    const reiniciarnrodcto = () => {
        setAlertBtnNroDcto("cajanrodocto");
    };

    const reiniciarDescripcion = () => {
        setInputDescripcionProducto(
            "form-control ps-form__input complementoaddress colorboder"
        );
    };
    const reiniciarTelefono = () => {
        setAlertBtnTelefono("cajanumerotelefono");
    };
    const reiniciarEmail = () => {
        setAlertBtnEmail("nombrespasarela");
    };
    const reiniciarDireccion = () => {
        setAlertBtnDireccion("nombrespasarela");
    };
    const reiniciarNombre = () => {
        setClassNombre("nombrespasarela");
    };
    const reiniciarApellido = () => {
        setClassApellido("nombrespasarela");
    };

    const SelectDepto = (data, name) => {
        setSelectDepto(name);
        setSelectCiudad("Seleccione ciudad");
        let ciud = [];
        ciudades &&
            ciudades.map((item) => {
                if (item.departamento_ciu == data) {
                    ciud.push(item);
                }
            });
        setDptoSeleccionado(data);
        setCiudadDepto(ciud);
        if (ciud.length > 0) setEnableCiudad(false);
    };

    const SelectCiudad = (data, name) => {
        setSelectCiudad(name);
        setCiudadSeleccionada(data);
        setEnableTipoCalle(false);
    };

    const SelectTipoDocumento = (data, name) => {
        setTipoDocumento(name);
        setTipoDctoSeleccionada(data);
    };

    const handleChangeNombre = (data) => {
        setNombresSeleccionado(data);
    };

    const handleChangeApellidos = (data) => {
        setApellidosSeleccionado(data);
    };

    const handleChangeNroDcto = (data) => {
        setNroDocumentoSeleccionado(data);
    };

    const handleChangeInputEmail = (data) => {
        setEmailSeleccionado(data);
    };

    const handleChangeInputDireccion = (data) => {
        setDireccionSeleccionado(data);
    };

    const handleChangeInputTelefono = (data) => {
        setTelefonoSeleccionado(data);
    };

    //console.log("BARRIO : ", nombresSeleccionado);

    const descripcionOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        let descripcion = "";
        let letra;
        for (var i = 0; i < 139; i++) {
            letra = e.substr(i, 1);
            descripcion = descripcion + letra;
        }
        setTituloDescripcion(descripcion);

        setContadorLetrasDescripcion(strLength);

        if (strLength > 139) {
            setShowModalMensajes(true);
            setTituloMensajes("Información adicional");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 140 permitido!"
            );
            return;
        }
    };

    const updateAddress = () => {
      
        let datok = true;
        if (!dptoSeleccionado) {
            datok = false;
            setAlertBtnDpto("dropdowncustomaddressalert");
        }
        if (!ciudadSeleccionada || selectciudad == "Seleccione ciudad") {
            datok = false;
            setAlertBtnCiudad("dropdowncustomaddressalert");
        }

        if (!tipoDctoSeleccionada) {
            datok = false;
            setAlertBtnTipoDcto("dropdowncustomtipodctoalert");
        }
        if (!nroDocumentoSeleccionado) {
            datok = false;
            setAlertBtnNroDcto("cajanrodocto alertboton");
        }
        if (!nombresSeleccionado) {
            datok = false;
            setClassNombre("nombrespasarela alertboton");
        }
        if (!apellidosSeleccionado) {
            datok = false;
            setClassApellido("nombrespasarela alertboton");
        }
        if (!telefonoSeleccionado) {
            datok = false;
            setAlertBtnTelefono("cajanumerotelefono alertboton");
        }
        if (!tituloDescripcion) {
            datok = false;
            setInputDescripcionProducto(
                "form-control ps-form__input complementoaddressalert"
            );
        }
        if (!emailSeleccionado) {
            datok = false;
            setAlertBtnEmail("nombrespasarela alertboton");
        }
        if (!direccionSeleccionado) {
            datok = false;
            setAlertBtnDireccion("nombrespasarela alertboton");
        }

        // Validar datos asignados a la identificación
        let nombre = "";

        validarid;
        let haycaracterididentificacion = false;
        for (var i = 0; i < nroDocumentoSeleccionado.length; i++) {
            validarid = nroDocumentoSeleccionado.substr(i, 1);
            if (
                validarid != 0 &&
                validarid != 1 &&
                validarid != 2 &&
                validarid != 3 &&
                validarid != 4 &&
                validarid != 5 &&
                validarid != 6 &&
                validarid != 7 &&
                validarid != 8 &&
                validarid != 9
            ) {
                haycaracterididentificacion = true;
                console.log("CARACTER", i, validarid);
            } else console.log("ES UN NUMERO ", i, validarid);
        }

        if (nroDocumentoSeleccionado.length < 6) {
            haycaracterididentificacion = true;
            nombre = nombre+ "identificación ";
        } else
        if (haycaracterididentificacion) {
            datok = false;
            nombre = nombre+ "identificación ";
            setAlertBtnNroDcto("cajanrodocto alertboton");
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            setTextoMensajes("Por favor ingresa un número de documento valida!");
        }

        // Validar datos asignados al teléfono
        let validarid;
        let haycaracteridtelefono = false;
        for (var i = 0; i < telefonoSeleccionado.length; i++) {
            validarid = telefonoSeleccionado.substr(i, 1);
            if (
                validarid != 0 &&
                validarid != 1 &&
                validarid != 2 &&
                validarid != 3 &&
                validarid != 4 &&
                validarid != 5 &&
                validarid != 6 &&
                validarid != 7 &&
                validarid != 8 &&
                validarid != 9
            ) {
                haycaracteridtelefono = true;
                console.log("CARACTER", i, validarid);
            } else console.log("ES UN NUMERO ", i, validarid);
        }

        if (telefonoSeleccionado.length < 10) {
            nombre = nombre+ "Teléfono, ";
            haycaracteridtelefono = true;
        } else
        if (haycaracteridtelefono) {
            datok = false;
            setAlertBtnTelefono("cajanumerotelefono alertboton");
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            nombre = nombre+ "Teléfono, ";

            if (haycaracterididentificacion)
                setTextoMensajes(
                    "Por favor ingresa un número de Teléfono, Número de documento validos!"
                );
            else
                setTextoMensajes(
                    "Por favor ingresa un número de Teléfono valido!"
                );
        }

        if (!validateEmail(emailSeleccionado)) {
            nombre = nombre+ "Cuenta de correo ";
        }

    
        if (!validateEmail(emailSeleccionado)) {
            datok = false;
            setAlertBtnEmail("nombrespasarela alertboton");
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");

            let nombre = "";
            if (!dptoSeleccionado) {
                nombre = nombre + " " + "telefono, ";
            }
            if (!ciudadSeleccionada) {
                nombre = nombre + " " + "ciudad, ";
            }
            if (!tipoDctoSeleccionada) {
                nombre = nombre + " " + "tipo documento, ";
            }

            if (!nombresSeleccionado) {
                nombre = nombre + " " + "Nombres, ";
            }
            if (!apellidosSeleccionado) {
                nombre = nombre + " " + "Apellidos, ";
            }

            if (haycaracterididentificacion && !haycaracteridtelefono) {
                let texto =
                    "Por favor ingresa " +
                    nombre +
                    "cuenta de correo e identificación valida";
                    nombre = nombre + " " + "cuenta de correo e identificación ";
                setTextoMensajes(texto);
            } else if (!haycaracterididentificacion && haycaracteridtelefono)
                setTextoMensajes(
                    "Por favor ingresa una cuenta de correo y teléfono valido!"
                );
            else if (haycaracterididentificacion && haycaracteridtelefono) {
                let texto =
                    "Por favor ingresa " +
                    nombre +
                    "cuenta de correo, identificación y teléfono valido";
                    nombre = nombre + " " + "cuenta de correo, identificación y teléfono ";
                setTextoMensajes(texto);
            } else {
                let texto =
                    "Por favor ingresa " + nombre + "cuenta de correo valida";
                    nombre = nombre + " " + "cuenta de correo, ";
                setTextoMensajes(texto);
            }
        }
      
        if (!dptoSeleccionado) {
            nombre = nombre + " " + "telefono ";
        }
        if (!ciudadSeleccionada) {
            nombre = nombre + " " + "ciudad ";
        }
        if (!tipoDctoSeleccionada) {
            nombre = nombre + " " + "tipo documento ";
        }

        if (!nombresSeleccionado) {
            nombre = nombre + " " + "nombre ";
        }
        if (!apellidosSeleccionado) {
            nombre = nombre + " " + "apellido ";
        }

        if(nombre){
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            let texto =
                "Por favor ingresa " + nombre + "valido";
            setTextoMensajes(texto);
        }

        if (!datok) return;

        let totalapagar = JSON.parse(localStorage.getItem("totalapagar"));

        let datospago = {
            departamento: selectdepto,
            ciudad: selectciudad,
            nombres: nombresSeleccionado,
            apellidos: apellidosSeleccionado,
            email: emailSeleccionado,
            direccion: direccionSeleccionado,
            telefono: telefonoSeleccionado,
            documento: nroDocumentoSeleccionado,
            tipodocumento: tipoDctoSeleccionada,
            totalapagar: totalapagar,
            valorimpuesto: parseInt((totalapagar * 0.19).toFixed(0)),
            direccion: direccion,
        };

        if (datok) {
            setClassBoxShipping("boxshippingpayment");
            setClassBtnContinuar("btnaddaddresspayment deshabilitar");
            setIrAPasarelaPago(true);
            setInfoUserPago(datospago);
        }
    };

    const regresar = () => {
        setClassBoxShipping("boxshippinginformation");
        router.push("/shop/shopping-cart");
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <Container title="Checkout">
            <div className="ps-page ps-page--shopping" ref={irA}>
                <ModalMensajes
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <div className="container">
                    <div className="ml-52">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ml-300">
                        <div>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={12} md={7} lg={7}>
                                    <div className="titulodireccionenvio">
                                        Pasarela de pago
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={12} md={7} lg={7}>
                                    <div className={classBoxShipping}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div
                                                    className="eliminarborde"
                                                    onClick={() =>
                                                        reiniciarNombre()
                                                    }>
                                                    <div className="tituloaddress pb-3">
                                                        Nombres
                                                    </div>
                                                    <input
                                                        className={classNombre}
                                                        type="text"
                                                        placeholder="Nombres"
                                                        value={
                                                            nombresSeleccionado
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeNombre(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div
                                                    className="eliminarborde"
                                                    onClick={() =>
                                                        reiniciarApellido()
                                                    }>
                                                    <div className="tituloaddress pb-3">
                                                        Apellidos
                                                    </div>
                                                    <input
                                                        className={
                                                            classApellido
                                                        }
                                                        type="text"
                                                        placeholder="Apellidos"
                                                        value={
                                                            apellidosSeleccionado
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeApellidos(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={12} md={3} lg={3}>
                                                <div className="mt-10 eliminarborde">
                                                    <div className="tituloaddress pb-3">
                                                        Tipo de documento
                                                    </div>
                                                    <Dropdown
                                                        onClick={() =>
                                                            reiniciartipodcto()
                                                        }>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="dropdown-custom-components"
                                                            arrowColor="#2D2E83"
                                                            className={
                                                                alertBtnTipoDcto
                                                            }
                                                            variant="outline-light"
                                                            //</Dropdown>value={marcaVeh}
                                                        >
                                                            <div className="ajustecity">
                                                                <a>
                                                                    {
                                                                        tipodocumento
                                                                    }
                                                                </a>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="tamañocajaoptionsaddress">
                                                            {tiposDctos &&
                                                                tiposDctos.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustomcity"
                                                                                onClick={() =>
                                                                                    SelectTipoDocumento(
                                                                                        item.id,
                                                                                        item.descripcion
                                                                                    )
                                                                                }
                                                                                eventKey={
                                                                                    item.id
                                                                                }>
                                                                                {
                                                                                    item.descripcion
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={5} lg={5}>
                                                <div
                                                    className="ml-30 mt-10 eliminarborde"
                                                    onClick={() =>
                                                        reiniciarnrodcto()
                                                    }>
                                                    <div className="tituloaddress pb-3">
                                                        Número documento
                                                    </div>
                                                    <input
                                                        className={
                                                            alertBtnNroDcto
                                                        }
                                                        type="text"
                                                        placeholder="Ingrese número documento"
                                                        value={
                                                            nroDocumentoSeleccionado
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeNroDcto(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <div
                                                    className="ml-40 mt-10 eliminarborde"
                                                    onClick={() =>
                                                        reiniciarTelefono()
                                                    }>
                                                    <div className="tituloaddress pb-3">
                                                        Telefono
                                                    </div>
                                                    <input
                                                        className={
                                                            alertBtnTelefono
                                                        }
                                                        type="text"
                                                        value={
                                                            telefonoSeleccionado
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeInputTelefono(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="#"
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div className="mt-10 eliminarborde">
                                                    <div className="tituloaddress pb-3">
                                                        * Departamento
                                                    </div>
                                                    <Dropdown
                                                        onClick={() =>
                                                            reiniciardpto()
                                                        }>
                                                        <div>
                                                            <Dropdown.Toggle
                                                                onclick={
                                                                    CustomToggle
                                                                }
                                                                id="dropdown-custom-components"
                                                                arrowColor="#2D2E83"
                                                                className={
                                                                    alertBtnDpto
                                                                }
                                                                variant="outline-light"
                                                                //</Dropdown>value={marcaVeh}
                                                            >
                                                                <div className="ajustecity">
                                                                    <a>
                                                                        {
                                                                            selectdepto
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu
                                                                as={CustomMenu}
                                                                variant="outline-light"
                                                                className="tamañocajaoptionsaddress">
                                                                {departamentos &&
                                                                    departamentos.map(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            return (
                                                                                <Dropdown.Item
                                                                                    className="itemsdropdowncustomcity"
                                                                                    onClick={() =>
                                                                                        SelectDepto(
                                                                                            item.codigo_dep,
                                                                                            item.label
                                                                                        )
                                                                                    }
                                                                                    eventKey={
                                                                                        item.codigo_dep
                                                                                    }>
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </Dropdown.Item>
                                                                            );
                                                                        }
                                                                    )}
                                                            </Dropdown.Menu>
                                                        </div>
                                                    </Dropdown>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div className="mt-10 eliminarborde">
                                                    <div className="tituloaddress pb-3">
                                                        * Ciudad
                                                    </div>
                                                    <Dropdown
                                                        onClick={() =>
                                                            reiniciarciudad()
                                                        }>
                                                        <Dropdown.Toggle
                                                            onclick={
                                                                CustomToggle
                                                            }
                                                            id="dropdown-custom-components"
                                                            arrowColor="#2D2E83"
                                                            className={
                                                                alertBtnCiudad
                                                            }
                                                            variant="outline-light"
                                                            //</Dropdown>value={marcaVeh}
                                                        >
                                                            <div className="ajustecity">
                                                                <a>
                                                                    {
                                                                        selectciudad
                                                                    }
                                                                </a>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            as={CustomMenu}
                                                            variant="outline-light"
                                                            className="tamañocajaoptionsaddress">
                                                            {ciudadDepto &&
                                                                ciudadDepto.map(
                                                                    (item) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdowncustomcity"
                                                                                onClick={() =>
                                                                                    SelectCiudad(
                                                                                        item.id_ciu,
                                                                                        item.label
                                                                                    )
                                                                                }
                                                                                eventKey={
                                                                                    item.codigo_ciu
                                                                                }>
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </Dropdown.Item>
                                                                        );
                                                                    }
                                                                )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div
                                                    className="mt-0 eliminarborde"
                                                    onClick={() =>
                                                        reiniciarEmail()
                                                    }>
                                                    <div className="tituloaddress pb-3">
                                                        Email
                                                    </div>
                                                    <input
                                                        className={
                                                            alertBtnEmail
                                                        }
                                                        type="email"
                                                        placeholder="Email"
                                                        value={
                                                            emailSeleccionado
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeInputEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <div
                                                    className="mt-0 eliminarborde"
                                                    onClick={() =>
                                                        reiniciarDireccion()
                                                    }>
                                                    <div className="tituloaddress pb-3">
                                                        Dirección
                                                    </div>
                                                    <input
                                                        className={
                                                            alertBtnDireccion
                                                        }
                                                        type="text"
                                                        placeholder="Dirección"
                                                        value={
                                                            direccionSeleccionado
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeInputDireccion(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <div
                                                className="ps-form__group"
                                                onClick={() =>
                                                    reiniciarDescripcion()
                                                }>
                                                <div className="tituloaddress mt-10 pb-3">
                                                    Comentarios
                                                </div>
                                                <textarea
                                                    className={
                                                        inputDescripcionProducto
                                                    }
                                                    placeholder={
                                                        textoDescripcion
                                                    }
                                                    value={tituloDescripcion}
                                                    name="descripcionproducto"
                                                    //onClick={(e) =>
                                                    //    iniciarDescripcionproducto()
                                                    //}
                                                    onChange={(e) =>
                                                        descripcionOnChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                                <div className="textocontadoraddress">
                                                    {contadorLetrasDescripcion}{" "}
                                                    {"/"} 140
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid
                                            container
                                            alignItems="center"
                                            spacing={1}>
                                            <Grid item xs={12} md={8} lg={8}>
                                                <div className="ps-form__group">
                                                    <div
                                                        className="btnreturnpayment"
                                                        onClick={() =>
                                                            regresar()
                                                        }>
                                                        Regresar
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}>
                                                <div className="ps-form__group">
                                                    <div
                                                        className={
                                                            classBtnContinuar
                                                        }
                                                        onClick={() =>
                                                            updateAddress()
                                                        }>
                                                        Continuar
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                {irAPasarelaPago ? (
                    <div className="mtmenos70">
                        <Pagar
                            valPago={1000000}
                            valImpuesto={12000}
                            infoUserPago={infoUserPago}
                        />
                    </div>
                ) : null}
            </div>
        </Container>
    );
};

function Pagar(props) {
    const router = useRouter();
    const { valPago, valImpuesto, infoUserPago } = props;

    console.log("INFO USE : ", infoUserPago);

    const regresar = () => {
        //alert("REGRESAR")
        //setShowModal(false);
        router.push("/");
    };

    return (
        <div className="ps-page ps-page--inner">
            <form
                className="ml-200"
                action="https://checkout.wompi.co/p/"
                method="GET">
                <input
                    type="hidden"
                    name="public-key"
                    value="pub_test_Xnmo3SoUCyyUOwkhsstfScsgLDOnfN2F"
                />
                <input type="hidden" name="currency" value="COP" />
                <input
                    type="hidden"
                    name="amount-in-cents"
                    value={infoUserPago.totalapagar + "00"}
                />
                <input type="hidden" name="reference" value={referencia} />
                <input
                    type="hidden"
                    name="redirect-url"
                    //value="http://localhost:3000/Transactions/transactionresponse"
                    value="https://mercadorepuesto.vercel.app/Transactions/transactionresponse"
                />
                <input
                    type="hidden"
                    name="tax-in-cents:vat"
                    value={infoUserPago.valorimpuesto + "00"}
                />
                <input
                    type="hidden"
                    name="tax-in-cents:consumption"
                    value={"0" + "00"}
                />
                <input
                    type="hidden"
                    name="customer-data:email"
                    value={infoUserPago.email}
                />
                <input
                    type="hidden"
                    name="customer-data:full-name"
                    value={infoUserPago.nombres + " " + infoUserPago.apellidos}
                />
                <input
                    type="hidden"
                    name="customer-data:phone-number"
                    value={"+57" + infoUserPago.telefono}
                />
                <input
                    type="hidden"
                    name="customer-data:legal-id"
                    value={infoUserPago.documento}
                />
                <input
                    type="hidden"
                    name="customer-data:legal-id-type"
                    value="CC"
                />
                <input
                    type="hidden"
                    name="shipping-address:address-line-1"
                    value={infoUserPago.direccion}
                />
                <input
                    type="hidden"
                    name="shipping-address:country"
                    value="CO"
                />
                <input
                    type="hidden"
                    name="shipping-address:phone-number"
                    value={"+57" + infoUserPago.telefono}
                />
                <input
                    type="hidden"
                    name="shipping-address:city"
                    value={"+57" + infoUserPago.ciudad}
                />
                <input
                    type="hidden"
                    name="shipping-address:region"
                    value={"+57" + infoUserPago.departamento}
                />
                <Row>
                    <Col xs={2} md={3} sm={6} lg={6}></Col>
                    <Col xs={2} md={3} sm={5} lg={5}>
                        <Button type="submit" className="btnpayment">
                            Pagar con Wompi
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default Payment;
