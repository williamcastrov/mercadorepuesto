import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import shortid from "shortid";
import axios from "axios";
import LoadingGrabarProducto from "~/components/elements/Loading/LoadingGrabarProducto";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Row, Col, Form } from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import img from "../../public/imagesupload/uploadimage.png";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesImagenes from "../mensajes/ModalMensajesImagenes";
import Moment from "moment";

//Constantes
import { URL_IMAGES_RESULTS } from "../../helpers/Constants";

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

let arraydimension = [];
let contadortexto = 0;
let mensajeUno = "";
let mensajeDos = "";
let contadorimg = 0;

function RegistrarFotos(props) {
    const { generico, idVehiculosProducto } = props;

    const [showControlUnError, setShowControlUnError] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesImagenes, setShowModalMensajesImagenes] =
        useState(false);
    const [tituloMensajesImagenes, setTituloMensajesImagenes] = useState("");
    const [textoMensajesImagenes, setTextoMensajesImagenes] = useState("");
    const [textoMensajesImagenesUno, setTextoMensajesImagenesUno] =
        useState("");
    const [textoMensajesImagenesDos, setTextoMensajesImagenesDos] =
        useState("");
    const [textoMensajesImagenesTres, setTextoMensajesImagenesTres] =
        useState("");
    const [textoMensajesImagenesCuatro, setTextoMensajesImagenesCuatro] =
        useState("");
    const [mostrarErrores, setMostrarErrores] = useState("");

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
    const [vehCompatibles, setVehCompatibles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [eliminaImagen, setEliminaImagen] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [mostrarMas, setMostrarMas] = useState(false);
    const [cajaFotos, setCajaFotos] = useState(
        "cajafotosproductos ps-page__header mt-25"
    );
    const [valor, setValor] = useState("");
    const [resultImgLoad, setresultImgLoad] = useState(false);

    const [textoDimension, setTextoDimension] = useState(null);
    const [textoTamaño, setTextoTamaño] = useState(null);
    const [textoFormato, setTextoFormato] = useState(null);
    const [textoLongitud, setTextoLongitud] = useState(null);
    const [datPrd, setDatPrd] = useState(null);

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

    const usuariologueado = useSelector((state) => state.userlogged.userlogged);

    const duplicarprd = useSelector((state) => state.duplicarprd.duplicarprd);

    useEffect(() => {
        if (duplicarprd == 1 || duplicarprd == 2) {
            let datosprducto = JSON.parse(localStorage.getItem("duplicarprd"));
            setDatPrd(datosprducto);
            let vehproductos = JSON.parse(localStorage.getItem("vehproductos"));
           
            if (datosprducto.nombreimagen1 != "undefined") {
                setMostrarDocumentoUno(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen2 != "undefined") {
                setMostrarDocumentoDos(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen3 != "undefined") {
                setMostrarDocumentoTres(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen4 != "undefined") {
                setMostrarDocumentoCuatro(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen5 != "undefined") {
                setMostrarDocumentoCinco(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen6 != "undefined") {
                setMostrarDocumentoSeis(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen7 != "undefined") {
                setMostrarDocumentoSiete(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen8 != "undefined") {
                setMostrarDocumentoOcho(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen9 != "undefined") {
                setMostrarDocumentoNueve(true);
                contadorimg = contadorimg + 1;
            }
            if (datosprducto.nombreimagen10 != "undefined") {
                setMostrarDocumentoDiez(true);
                contadorimg = contadorimg + 1;
            }
        }
        //let tem = JSON.parse(localStorage.getItem("duplicarprd"));
        //console.log("DAT PRD AAAA : ", tem);
    }, [duplicarprd]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async () => {
        //setIsLoading(true);
        //console.log("FILE NAME : ", baseArchives[0]);

        if (baseArchives.length == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "La visibilidad de tu producto depende de las fotos, Ingresa como mínimo una!"
            );
        }

        var reader = new FileReader();
        //console.log("EVENT FILE : ", baseArchives);
        //return

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
                    var extension =
                        "." +
                        base64.substring(
                            base64.indexOf("/") + 1,
                            base64.indexOf(";base64")
                        );
                    contador = contador + 1;

                    if (contador === longitud) {
                        grabarfoto(arreglofotos, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    useEffect(() => {
        if (generico == "No") {
            let params;
            const leeVehiculosTemporal = async () => {
                params = {
                    codigo: idVehiculosProducto,
                };

                await axios({
                    method: "post",
                    url: "https://gimcloud.com.co/mrp/api/33",
                    params,
                })
                    .then((res) => {
                        setVehCompatibles(res.data);
                        console.log("DAT: ", res.data);
                    })
                    .catch(function (error) {
                        console.log("Error leyendo productos termporales");
                    });
            };
            leeVehiculosTemporal();
        } else {
            let vehcompatibles = [];

            let veh = {
                id: 0,
                idtipoproducto: 0,
                tipovehiculo: 0,
                carroceria: 0,
                marca: 0,
                anno: 0,
                modelo: 0,
                cilindraje: 0,
                transmision: 0,
                combustible: 0,
                traccion: 0,
                selecttipo: "Genérico",
                selectcarroceria: "Genérico",
                selectmarca: "Genérico",
                selectanno: "Genérico",
                selectmodelo: "Genérico",
                selectcilindraje: "Genérico",
                selecttransmision: "Genérico",
                selectcombustible: "Genérico",
                selecttraccion: "Genérico",
                comparar: 0,
                fecha: "2023-01-01",
                estado: 0,
            };

            vehcompatibles.push(veh);
            setVehCompatibles(vehcompatibles);
        }
    }, []);

    const grabarfoto = async (dato, ext) => {
        let longitud = dato.length;
        let datoimagen;
        let nombrefoto = shortid();
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
        creaProducto(datoimagen);
    };

    const creaProducto = async (datosimagenes) => {
        let grabaproductos = false;

        const ubiposprod = JSON.parse(
            localStorage.getItem("ubicacionposicionproducto")
        );
        const infoprod = JSON.parse(
            localStorage.getItem("informacionproducto")
        );
        const datpubli = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );
        let validarprecio;
        let valprod = datpubli[0].precio;
        let long = datpubli[0].precio.length;
        let preciovta = "";

        for (var i = 0; i < long; i++) {
            validarprecio = valprod.substr(i, 1);
            if (
                validarprecio == 0 ||
                validarprecio == 1 ||
                validarprecio == 2 ||
                validarprecio == 3 ||
                validarprecio == 4 ||
                validarprecio == 5 ||
                validarprecio == 6 ||
                validarprecio == 7 ||
                validarprecio == 8 ||
                validarprecio == 9
            ) {
                preciovta = preciovta + validarprecio;
            }
        }

        let preciosinseparadores = preciovta;
        let anchosinseparadores = datpubli[0].ancho.replace(/,/g, "");
        let altosinseparadores = datpubli[0].alto.replace(/,/g, "");
        let largosinseparadores = datpubli[0].largo.replace(/,/g, "");
        let pesosinseparadores = datpubli[0].peso.replace(/,/g, "");
        let idvehiculoscompatible = shortid();

        let item = {
            id: idvehiculoscompatible,
            titulo: infoprod[0].titulonombre,
        };
        //newDetUno.push(itemUno);

        localStorage.setItem("idpublicacion", JSON.stringify(item));

        //Eliminar separadores en el precio
        let valorproducto = preciosinseparadores;

        // Datos vehículos no genericos - compatibles
        if (generico == "No") {
            vehCompatibles &&
                vehCompatibles.map((veh) => {
                    let params = {
                        idproductovehiculo: idVehiculosProducto,
                        productogenerico: generico,
                        tipovehiculo: veh.tipovehiculo,
                        carroceria: veh.carroceria,
                        marca: veh.marca,
                        anno: veh.anno,
                        modelo: veh.modelo,
                        cilindraje: veh.cilindraje,
                        combustible: veh.combustible,
                        transmision: veh.transmision,
                        traccion: veh.traccion,
                        partedelvehiculo: ubiposprod[0].ubicacionProducto,
                        posicionproducto: ubiposprod[0].posicionProducto,
                        titulonombre: infoprod[0].titulonombre,
                        marcarepuesto: infoprod[0].marcarepuesto,
                        condicion: infoprod[0].condicion,
                        estadoproducto: infoprod[0].estadoproducto,
                        numerodeunidades: datpubli[0].numerodeunidades,
                        precio: valorproducto,
                        numerodeparte: infoprod[0].numerodeparte,
                        compatible: idvehiculoscompatible,
                        descripcionproducto: datpubli[0].descripcionproducto,
                        vendeporpartes: infoprod[0].vendeporpartes,
                    };

                    const grabaVehCompatibles = async () => {
                        await axios({
                            method: "post",
                            url: "https://gimcloud.com.co/mrp/api/36",
                            params,
                        })
                            .then((res) => {
                                console.log("DAT RES: ", res);
                                console.log("DAT: ", res.data);
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo productos termporales"
                                );
                            });
                    };
                    grabaVehCompatibles();
                });
        }

        //console.log("VEH : ", valorproducto);
        //return

        const formdata = new FormData();
        formdata.append("id", 0);
        formdata.append("productogenerico", generico);
        formdata.append("idproductovehiculo", idVehiculosProducto);
        formdata.append("tipovehiculo", vehCompatibles[0].tipovehiculo);
        formdata.append("carroceria", vehCompatibles[0].carroceria);
        formdata.append("marca", vehCompatibles[0].marca);
        formdata.append("anno", vehCompatibles[0].anno);
        formdata.append("modelo", vehCompatibles[0].modelo);
        formdata.append("cilindrajemotor", vehCompatibles[0].cilindraje);
        formdata.append("tipocombustible", vehCompatibles[0].combustible);
        formdata.append("transmision", vehCompatibles[0].transmision);
        formdata.append("tipotraccion", vehCompatibles[0].traccion);
        formdata.append("turbocompresor", 0);
        formdata.append("posicionproducto", ubiposprod[0].posicionProducto);
        formdata.append("partedelvehiculo", ubiposprod[0].ubicacionProducto);

        formdata.append("titulonombre", infoprod[0].titulonombre);
        formdata.append("marcarepuesto", infoprod[0].marcarepuesto);
        formdata.append("condicion", infoprod[0].condicion);
        formdata.append("estadoproducto", infoprod[0].estadoproducto);
        formdata.append("vendeporpartes", infoprod[0].vendeporpartes);
        formdata.append("numerodeparte", infoprod[0].numerodeparte);
        formdata.append("funcionalidad", infoprod[0].funcionalidad);

        formdata.append("numerodeunidades", datpubli[0].numerodeunidades);
        formdata.append("precio", valorproducto);
        formdata.append("compatible", idvehiculoscompatible);
        formdata.append("descripcionproducto", datpubli[0].descripcionproducto);
        formdata.append("peso", parseInt(pesosinseparadores));
        formdata.append("alto", parseInt(altosinseparadores));
        formdata.append("ancho", parseInt(anchosinseparadores));
        formdata.append("largo", parseInt(largosinseparadores));

        formdata.append("ciudad", datpubli[0].ciudad);
        formdata.append("fechacreacion", fechaactual);

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

        //console.log("VEH COMP : ", vehCompatibles);
        //return;
        /*
        let row = {
            productogenerico: generico,
            tipovehiculo: vehCompatibles[0].tipovehiculo,
            carroceria: vehCompatibles[0].carroceria,
            marca: vehCompatibles[0].marca,
            anno: vehCompatibles[0].anno,
            modelo: vehCompatibles[0].modelo,
            cilindrajemotor: vehCompatibles[0].cilindraje,
            tipocombustible: vehCompatibles[0].combustible,
            transmision: vehCompatibles[0].transmision,
            tipotraccion: vehCompatibles[0].traccion,
            turbocompresor: 0,
            posicionproducto: ubiposprod[0].posicionProducto,
            partedelvehiculo: ubiposprod[0].ubicacionProducto,
            titulonombre: infoprod[0].titulonombre,
            marcarepuesto: infoprod[0].marcarepuesto,
            condicion: infoprod[0].condicion,
            estadoproducto: infoprod[0].estadoproducto,
            vendeporpartes: infoprod[0].vendeporpartes,
            numerodeparte: infoprod[0].numerodeparte,
            numerodeunidades: datpubli[0].numerodeunidades,
            precio: valorproducto,
            compatible: idvehiculoscompatible,
            descripcionproducto: datpubli[0].descripcionproducto,
            peso: parseInt(pesosinseparadores),
            alto: parseInt(altosinseparadores),
            ancho: parseInt(anchosinseparadores),
            largo: parseInt(largosinseparadores),
            descuento: formData.descuento,
            usuario: usuariologueado.uid,
            moneda: formData.moneda,
            estado: formData.estado,
            longitud: datosimagenes.longitud,
            nombreimagen1: datosimagenes.nombreimagen1,
            imagen1: datosimagenes.imagen1,
            nombreimagen2: datosimagenes.nombreimagen2,
            imagen2: datosimagenes.imagen2,
            nombreimagen3: datosimagenes.nombreimagen3,
            imagen3: datosimagenes.imagen3,
            nombreimagen4: datosimagenes.nombreimagen4,
            imagen4: datosimagenes.imagen4,
            nombreimagen5: datosimagenes.nombreimagen5,
            imagen5: datosimagenes.imagen5,
            nombreimagen6: datosimagenes.nombreimagen6,
            imagen6: datosimagenes.imagen6,
            nombreimagen7: datosimagenes.nombreimagen7,
            imagen7: datosimagenes.imagen7,
            nombreimagen8: datosimagenes.nombreimagen8,
            imagen8: datosimagenes.imagen8,
            nombreimagen9: datosimagenes.nombreimagen9,
            imagen9: datosimagenes.imagen9,
            nombreimagen10: datosimagenes.nombreimagen10,
            imagen10: datosimagenes.imagen10,
        };
*/
        //console.log("DATOS CREACION DE PRODUCTO : ", row);
        //return;

        let creoregistro = false;
        let url = "https://gimcloud.com.co/mrp/api";

        await fetch(`${url}/16`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            setIsLoading(false);
            if (response) {
                if (response.status === 200) {
                    creoregistro = true;
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Fotos productos grabadas de forma correcta!"
                    );
                    setLoading(false);
                    //router.push("/");
                    router.push("/CreateProduct/terminapublicacion");
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!"
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
    };

    const onSelectFileAnt = (event) => {
        const selectedFiles = event.target.files;
        const validateFilesArray = Array.from(selectedFiles);

        let contdimen = true;
        let contproporuna = true;
        let tipo = true;

        let dimension = true;
        arraydimension = [];
        let long = validateFilesArray.length;
        let contador = 0;
        let alto = 0;
        let ancho = 0;
        let proporcionuna = true;
        let proporciondos = false;
        let contpropor = 0;

        validateFilesArray.map((file, index) => {
            var archivo, img;
            if (file.type.substring(0, 5) != "image") {
                tipo = false;
                contador = contador + 1;
                //console.log("TIPO ARCHIVO : ", file.type.substring(0, 5));
            }
            if (file.size > 1050000) {
                contdimen = false;
                contador = contador + 1;
                //console.log("TAMAÑO : ", file.size);
            } else {
                if ((archivo = file)) {
                    img = new Image();

                    img.onload = function () {
                        contador = contador + 1;

                        alto = this.height;
                        ancho = this.width;

                        let proaltominimo = 0;
                        let proaltomaximo = 0;
                        let proanchominimo = 0;
                        let proanchomaximo = 0;

                        if (
                            (ancho >= 1400 &&
                                ancho <= 1800 &&
                                alto >= 750 &&
                                alto <= 1050) ||
                            (ancho >= 750 &&
                                ancho <= 1050 &&
                                alto >= 1400 &&
                                alto <= 1800)
                        ) {
                            let proporcion = alto / ancho;
                            let promax = parseInt(1) + parseFloat(proporcion);

                            proaltominimo = (alto * proporcion).toFixed(0);
                            proaltomaximo = (alto * promax).toFixed(0);

                            proanchominimo = (ancho * proporcion).toFixed(0);
                            proanchomaximo = (ancho * promax).toFixed(0);
                            contpropor = proporcion;
                        } else {
                            if (contpropor == 0) {
                                if (ancho > alto) {
                                    proaltominimo = (alto * 0.7).toFixed(0);
                                    proaltomaximo = (alto * 1.4).toFixed(0);

                                    proanchominimo = (ancho * 0.7).toFixed(0);
                                    proanchomaximo = (ancho * 1.3).toFixed(0);
                                }

                                if (alto > ancho) {
                                    proaltominimo = (alto * 0.7).toFixed(0);
                                    proaltomaximo = (alto * 1.3).toFixed(0);

                                    proanchominimo = (ancho * 0.7).toFixed(0);
                                    proanchomaximo = (ancho * 1.4).toFixed(0);
                                }

                                if (alto == ancho) {
                                    proaltominimo = (alto * 0.9).toFixed(0);
                                    proaltomaximo = (alto * 1.1).toFixed(0);

                                    proanchominimo = (ancho * 0.9).toFixed(0);
                                    proanchomaximo = (ancho * 1.1).toFixed(0);
                                }

                                if (
                                    ancho >= proaltominimo &&
                                    ancho <= proaltomaximo
                                ) {
                                    proporcionuna = true;
                                } else {
                                    proporcionuna = false;
                                    contproporuna = false;
                                }

                                if (
                                    alto >= proanchominimo &&
                                    alto <= proanchomaximo
                                ) {
                                    proporcionuna = true;
                                } else {
                                    proporcionuna = false;
                                    contproporuna = false;
                                }

                                if (alto > 2400 || ancho > 2400) {
                                    contdimen = false;
                                    dimension = false;
                                } else dimension = true;
                            }
                        }

                        //onsole.log("ALTO UNO: ", proaltominimo);
                        //console.log("ALTO UNO: ", proaltomaximo);

                        //console.log("ANCHO UNO: ", proanchominimo);
                        //console.log("ANCHO UNO: ", proanchomaximo);
                        //return

                        let item = {
                            posicion: index,
                            ancho: ancho,
                            alto: alto,
                            dimension: dimension,
                            proporcionuna: proporcionuna,
                            proaltominimo: proaltominimo,
                            proaltomaximo: proaltomaximo,
                            proanchominimo: proanchominimo,
                            proanchomaximo: proanchomaximo,
                        };

                        arraydimension.push(item);
                        if (long == contador) {
                            if (!tipo || !contdimen || !contproporuna) {
                                console.log(
                                    "TIPO : ",
                                    tipo,
                                    "DIMENSION : ",
                                    contdimen,
                                    "PROPORCION : ",
                                    contproporuna
                                );

                                let texto = "";
                                let textouno = "";
                                let textodos = "";
                                let textotres = "";
                                let textocuatro = "";

                                texto =
                                    "Alguno(s) de los archivos no cumplen con las sugerencias";

                                if (!tipo) {
                                    textouno =
                                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png";
                                    setTextoFormato(
                                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png"
                                    );
                                }
                                if (!contdimen) {
                                    textodos =
                                        "- El tamaño máximo de las imágenes es 1024 x 1024";
                                    setTextoTamaño(
                                        "- El tamaño máximo de las imágenes es 1024 x 1024"
                                    );
                                }
                                if (!contproporuna) {
                                    textotres =
                                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho";
                                    setTextoDimension(
                                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho"
                                    );
                                }
                                if (long > 10) {
                                    textocuatro =
                                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)";
                                    setTextoLongitud(
                                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)"
                                    );
                                }

                                setShowModalMensajesImagenes(true);
                                setMostrarErrores(true);
                                setTituloMensajesImagenes(
                                    "No logramos subir algunas de tus imagenes, ten en cuenta que:"
                                );
                                setTextoMensajesImagenes(texto);
                                setTextoMensajesImagenesUno(textouno);
                                setTextoMensajesImagenesDos(textodos);
                                setTextoMensajesImagenesTres(textotres);
                                setTextoMensajesImagenesCuatro(textocuatro);
                            }
                            onSelectFile(
                                validateFilesArray,
                                arraydimension,
                                tipo,
                                contdimen,
                                contproporuna,
                                long
                            );
                        }
                    };
                    img.src = URL.createObjectURL(archivo);
                }
            }

            if (!tipo || !contdimen || !contproporuna) {
                let texto = "";
                let textouno = "";
                let textodos = "";
                let textotres = "";
                let textocuatro = "";

                setTextoDimension(null);
                setTextoTamaño(null);
                setTextoFormato(null);
                setTextoLongitud(null);

                texto =
                    "Alguno(s) de los archivos no cumplen con las sugerencias";

                if (!tipo) {
                    textouno =
                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png";
                    setTextoFormato(
                        "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png"
                    );
                }
                if (!contdimen) {
                    textodos =
                        "- El tamaño máximo de las imágenes es 1024 x 1024";
                    setTextoTamaño(
                        "- El tamaño máximo de las imágenes es 1024 x 1024"
                    );
                }
                if (!contproporuna) {
                    textotres =
                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho";
                    setTextoDimension(
                        "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho"
                    );
                }
                if (long > 10) {
                    textocuatro =
                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)";
                    setTextoLongitud(
                        "- Debes agregar como minimo una(01) imagen y como máximo diez(10)"
                    );
                }

                setShowControlUnError(true);
                setShowModalMensajesImagenes(true);
                setMostrarErrores(true);
                setTituloMensajesImagenes(
                    "No logramos subir algunas de tus imagenes, ten en cuenta que:"
                );
                setTextoMensajesImagenes(texto);
                setTextoMensajesImagenesUno(textouno);
                setTextoMensajesImagenesDos(textodos);
                setTextoMensajesImagenesTres(textotres);
                setTextoMensajesImagenesCuatro(textocuatro);
            }
        });
    };

    //const onSelectFile = (event, arraydimension) => {
    const onSelectFile = (
        validateFilesArray,
        arraydimension,
        tipo,
        contdimen,
        contproporuna,
        longmaxima
    ) => {
        let imagesArraySelected = [];
        let contimg = 0;

        let imgbig = "";
        let contadordos = 0;
        let valtamaño = false;
        let valformato = false;
        let dimension = false;

        let controlvaltamaño = false;
        let controlvalformato = false;

        validateFilesArray &&
            validateFilesArray.map((file, index) => {
                let dimension = false;
                let proporcionuna = false;

                arraydimension &&
                    arraydimension.map((item, ind) => {
                        if (item.posicion == index) {
                            //console.log("FILE : ", file.name, "-", item);
                            dimension = item.dimension;
                            proporcionuna = item.proporcionuna;
                        }
                    });

                if (dimension && proporcionuna) {
                    if (file.size > 800000) {
                        valtamaño = true;
                        controlvaltamaño = true;
                    }

                    if (file.type.substring(0, 5) != "image") {
                        valformato = true;
                        controlvalformato = true;
                    }

                    if (file.size <= 800000) {
                        if (file.type.substring(0, 5) == "image") {
                            contimg = contimg + 1;
                            if (contimg <= 10) {
                                imagesArraySelected.push(file);
                            }
                        }
                    }
                }
            });

        let contador = 0;
        let arraynew = [];

        //console.log("BASE ARCH : ", baseArchives)
        if (baseArchives.length > 0) {
            baseArchives &&
                baseArchives.map((item, index) => {
                    contador = contador + 1;
                    if (contador <= 10) arraynew.push(item);
                });

            //console.log("ARCH SELECT: ", imagesArraySelected)
            imagesArraySelected &&
                imagesArraySelected.map((file, index) => {
                    contador = contador + 1;
                    if (contador <= 10) {
                        arraynew.push(file);
                    }
                });

            setBaseArchives(arraynew);
            setSelectedArchives(arraynew);
        } else {
            setBaseArchives(imagesArraySelected);
            setSelectedArchives(imagesArraySelected);
        }

        /*
        if (!contproporuna) {
            setresultImgLoad(true);
            let texto =
                "- La proporción de las imagenes debe ser de 4:3, es decir 4 unidades de alto por 3 de ancho";
            setTextoDimension(texto);
        }
        if (!contdimen) {
            setresultImgLoad(true);
            let texto =
                "- El tamaño máximo de las imágenes es 1024 x 1024, y el mínimo 100 x 100 por cada lado";
            setTextoTamaño(texto);
        }
        if (!tipo) {
            setresultImgLoad(true);
            let texto =
                "- Incluiste archivos no validos, solo son permitidos los formatos, jpg, jpeg y png";
            setTextoFormato(texto);
            
        }
        if (longmaxima > 10) {
            setresultImgLoad(true);
            let texto =
                "- Debes agregar como minimo una(01) imagen y como máximo diez(10)";
            setTextoLongitud(texto);
            
        }
        */

        let longitud = imagesArraySelected.length;
        let imgok = [];
    };

    const borrarImagenes = (pos, numreg) => {
        alert(pos);
        return;
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

        //console.log("POS-NUM : ", pos," - ",numreg);
        //console.log("Borrar : ", selectedArchives," - ",baseArchives);
        //return
        let imagenes = selectedArchives;
        let nvo = [];
        /*
        imagenes.splice(1,1);
        let baseimg = baseArchives;
        baseimg.splice(1,1);
*/

        imagenes &&
            imagenes.map((row, index) => {
                if (index != pos) {
                    nvo.push(row);
                }
            });

        setSelectedArchives(nvo);
        setBaseArchives(nvo);
    };

    const actualizaImagenes = () => {
        if (selectedArchives.length > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Recuerda, maximo 10 archivos!");
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
            if (duplicarprd == 0) {
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
        }
    }, [selectedArchives]);

    const verMas = () => {
        setMostrarMas(true);
        setCajaFotos("cajafotosproductosampliada ps-page__header mt-25");
    };

    const verMenos = () => {
        setMostrarMas(false);
        setCajaFotos("cajafotosproductos ps-page__header mt-25");
    };

    //console.log("ESTADI : ", showModalMensajesImagenes)

    const reiniciar = () => {
        setMostrarErrores(false);
        let tem = "";
        setValor(tem);
    };

    const showErrorImg = () => {
        setresultImgLoad(true);
        setCajaFotos("cajafotosproductoserrores ps-page__header mt-25");
    };

    const showSuggestionsImg = () => {
        setresultImgLoad(false);
        /*
mostrarErrores,
        resultImgLoad,
        showControlUnError
        */
        if (mostrarErrores && !resultImgLoad && showControlUnError)
            setCajaFotos("cajafotosproductosampliadados ps-page__header mt-25");
        else setCajaFotos("cajafotosproductosampliada ps-page__header mt-25");
    };

    useEffect(() => {
        if (mostrarErrores && resultImgLoad) {
            if (showControlUnError)
                setCajaFotos(
                    "cajafotosproductoserroresdos ps-page__header mt-25"
                );
            else
                setCajaFotos("cajafotosproductoserrores ps-page__header mt-25");
        }
    }, [mostrarErrores]);

    useEffect(() => {
        contadortexto = 0;
        if (textoDimension) {
            contadortexto = contadortexto + 1;
        }
        if (textoTamaño) {
            contadortexto = contadortexto + 1;
        }
        if (textoFormato) {
            contadortexto = contadortexto + 1;
        }
        if (textoLongitud) {
            contadortexto = contadortexto + 1;
        }
        if (contadortexto < 3) {
            mensajeUno = "textoventanamensajesimagenes pt-30";
            mensajeDos = "textoventanamensajesimagenesdos pt-30";
        } else {
            mensajeUno = "textoventanamensajesimagenes";
            mensajeDos = "textoventanamensajesimagenesdos";
        }
    }, [textoDimension, textoTamaño, textoFormato, textoLongitud]);

    /*
 console.log(
        "CAJA FOTOS : ",
        cajaFotos,
        mostrarErrores,
        resultImgLoad,
        showControlUnError
    );    
    */
    return (
        <div className={cajaFotos}>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            <ModalMensajesImagenes
                shown={showModalMensajesImagenes}
                close={setShowModalMensajesImagenes}
                titulo={tituloMensajesImagenes}
                textouno={textoMensajesImagenesUno}
                textodos={textoMensajesImagenesDos}
                textotres={textoMensajesImagenesTres}
                textocuatro={textoMensajesImagenesCuatro}
                mensaje={textoMensajesImagenes}
                contadortexto={contadortexto}
                mensajeUno={mensajeUno}
                mensajeDos={mensajeDos}
                tipo="1"
            />
            <Row>
                <Col xl={7} lg={7} md={7} sm={7}>
                    <div>
                        <h3 className="ml-25 tituloadvertenciaproductosizquierda mt-15 mb-15">
                            Ingresa fotos del producto - mínimo una
                        </h3>
                    </div>
                </Col>
            </Row>
            {isLoading ? (
                <LoadingGrabarProducto />
            ) : (
                <form onChange={onChange} className="ml-25">
                    <div className="ps-form--review">
                        {console.log("MOSTRAR DOC : ", datPrd)}
                        <Form.Group
                            controlId="formFileMultiple"
                            className="ps-form__group">
                            <div className="ml-8">
                                <Row>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoUno ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                0,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen1
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    0,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-input">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgUno.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                    </label>
                                                    <input
                                                        id="file-input"
                                                        name="images"
                                                        type="file"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>

                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoDos ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                1,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen2 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen2
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    1,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={imgDos.src}
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputUno">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgDos.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                    </label>
                                                    <input
                                                        id="file-inputUno"
                                                        name="imagesuno"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoTres ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                2,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen3 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen3
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    2,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgTres.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputDos">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgTres.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputDos"
                                                        name="imagesdos"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoCuatro ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                3,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen4 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen4
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    3,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgCuatro.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputcuatro">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgCuatro.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputcuatro"
                                                        name="imagescuatro"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoCinco ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                4,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen5 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen5
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    4,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgCinco.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputcinco">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgCinco.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputcinco"
                                                        name="imagescinco"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
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

                            <div className="mt-15 ml-8">
                                <Row>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoSeis ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                5,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen6 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen6
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    5,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgSeis.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputseis">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgSeis.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                    </label>
                                                    <input
                                                        id="file-inputseis"
                                                        name="imagesseis"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoSiete ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                6,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen7 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen7
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    6,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgSiete.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputsiete">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgSiete.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputsiete"
                                                        name="imagesseis"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                   
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoOcho ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                7,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen8 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen8
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    7,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgOcho.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputSiete">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgOcho.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputocho"
                                                        name="imagesocho"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoNueve ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                8,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen9 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen9
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    8,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgNueve.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputnueve">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgNueve.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputnueve"
                                                        name="imagesnueve"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
                                                        multiple
                                                        //style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, application/pdf"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col
                                        className="mr-85"
                                        xl={1}
                                        lg={1}
                                        sm={1}
                                        md={1}>
                                        <div className="image-upload">
                                            {mostrarDocumentoDiez ? (
                                                duplicarprd == 0 ? (
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
                                                                                index
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
                                                                                    <div
                                                                                        className="botonborrararchivo"
                                                                                        onClick={() =>
                                                                                            borrarImagenes(
                                                                                                9,
                                                                                                1
                                                                                            )
                                                                                        }>
                                                                                        <h4 className="apuntador">
                                                                                            X
                                                                                        </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                ) : datPrd.nombreimagen10 !=
                                                  "undefined" ? (
                                                    <div>
                                                        <img
                                                            className="tamañoimagenuploadproducto"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                datPrd.nombreimagen10
                                                            }
                                                            alt="Seleccione Archivo"
                                                        />
                                                        <div
                                                            className="botonborrararchivo"
                                                            onClick={() =>
                                                                borrarImagenes(
                                                                    8,
                                                                    1
                                                                )
                                                            }>
                                                            <h4 className="apuntador">
                                                                X
                                                            </h4>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label for="file-input">
                                                            <img
                                                                className="tamañoimagenupload"
                                                                src={
                                                                    imgDiez.src
                                                                }
                                                                alt="Seleccione Archivo"
                                                            />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            name="images"
                                                            type="file"
                                                            onClick={() =>
                                                                reiniciar()
                                                            }
                                                            value={valor}
                                                            onChange={
                                                                onSelectFileAnt
                                                            }
                                                            multiple
                                                            accept="image/png, image/jpeg, application/pdf"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div>
                                                    <label for="file-inputNueve">
                                                        <img
                                                            className="tamañoimagenupload"
                                                            src={imgDiez.src}
                                                            alt="Seleccione Archivo"
                                                        />
                                                        {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                    </label>
                                                    <input
                                                        id="file-inputNueve"
                                                        name="imagesnueve"
                                                        onClick={() =>
                                                            reiniciar()
                                                        }
                                                        value={valor}
                                                        type="file"
                                                        onChange={
                                                            onSelectFileAnt
                                                        }
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
                </form>
            )}
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <br />
                </div>
            )}

            <div className="ml-32 mtmenos20">
                <Row>
                    {!resultImgLoad ? (
                        <Col xl={12} lg={12} xs={12} md={12}>
                            <div>
                                <p className="textosugerencia mtmenos5">
                                    **Ten en cuenta que:
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    Recomendaciones para que tu publicación
                                    tenga más visualizaciones:
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - Debes agregar como minimo una(01) imagen y
                                    como máximo diez(10)
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - El tamaño máximo de las imágenes es 1024 x
                                    1024
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - La proporción de las imagenes debe ser de
                                    4:3, es decir 4 unidades de alto por 3 de
                                    ancho
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - Cada imagen debe tener un peso máximo de
                                    800KB
                                </p>
                                <p className="textosugerencia mtmenos7">
                                    - Tus imagenes deben ser en formato jpg,
                                    jpeg o png
                                </p>
                                {!mostrarMas ? (
                                    <p
                                        className="subrayartextoclicaqui mtmenos7 apuntador"
                                        onClick={() => verMas()}>
                                        Ver mas...
                                    </p>
                                ) : (
                                    <a>
                                        <p className="textosugerencia mtmenos7">
                                            - El fondo de las imágenes debe ser
                                            color blanco o gris claro
                                        </p>
                                        <p className="textosugerencia mtmenos5">
                                            - Las imágenes deben se cuadradas,
                                            optimo 1024 x 1024
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - Las imágenes deben llenar al menos
                                            el 85% o más del marco de la imagen
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - La imagen debe estar enfocada
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - No incluir datos de promoción en
                                            las imágenes
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - No incluir datos de teléfonos
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - No incluir datos de contactos
                                        </p>
                                        <p className="textosugerencia mtmenos7">
                                            - Las imágenes deben ser nítidas
                                        </p>
                                        <p
                                            className="subrayartextoclicaqui mtmenos7 apuntador"
                                            onClick={() => verMenos()}>
                                            Ver menos...
                                        </p>
                                    </a>
                                )}
                            </div>
                        </Col>
                    ) : (
                        <Col xl={12} lg={12} xs={12} md={12}>
                            <div>
                                <p className="mtmenos5 textosugerenciaalert">
                                    ** No logramos subir algunas de tus
                                    imagenes, ten en cuenta que:
                                </p>
                                <p className="mtmenos5 textosugerenciaalert">
                                    {textoLongitud}
                                </p>
                                <p className="mtmenos5 textosugerenciaalert">
                                    {textoFormato}
                                </p>
                                <p className="mtmenos7 textosugerenciaalert">
                                    {textoDimension}
                                </p>
                                <p className="mtmenos7 textosugerenciaalert">
                                    {textoTamaño}
                                </p>
                            </div>
                        </Col>
                    )}

                    <Col xl={12} lg={12} xs={12} md={12}>
                        {mostrarErrores ? (
                            !resultImgLoad ? (
                                <p
                                    className="mt-10 mtmenos2 subrayartextoclicaqui apuntador"
                                    onClick={() => showErrorImg()}>
                                    Ver errores cargue imagenes...
                                </p>
                            ) : (
                                <p
                                    className="mtmenos2 subrayartextoclicaqui apuntador"
                                    onClick={() => showSuggestionsImg()}>
                                    Ver recomendaciones cargue imagenes...
                                </p>
                            )
                        ) : null}
                    </Col>
                </Row>
                <Row>
                    <Col xl={7} lg={7} xs={7} md={7}></Col>
                    <Col xl={2} lg={2} xs={2} md={2}>
                        <Button
                            variant="outline-light"
                            className="ml-20 mtmenos10 colortextoselect ps-btn baseinput redondearborde">
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Col>
                    <Col xl={2} lg={2} xs={2} md={2}>
                        <div
                            className="ml-20 mtmenos20 ps-btn redondearborde"
                            onClick={generabase64}>
                            Publicar
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
        ciudad: 0,
        fechacreacion: "",
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

export default RegistrarFotos;