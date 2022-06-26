import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
//import swal from "sweetalert";
import Swal from "sweetalert2";
import swal from "sweetalert";
import PropTypes from "prop-types";
import GrabarDocsNitRepository from "~/repositories/GrabarDocsNitRepository";
import UpdateTokenRepository from "~/repositories/UpdateTokenRepository";
import TokenRegistroRepository from "~/repositories/TokenRegistroRepository";
import ActivateUserRepository from "~/repositories/ActivateUserRepository";
import grabarPDFsNitRepository from "~/repositories/grabarPDFsNitRepository";
import shortid from "shortid";
import { useRouter } from "next/router";
import Loading from "~/components/elements/Loading";
import Moment from "moment";
import img from "../../public/imagesupload/upload.png";
import bloqueo from "../../public/imagesupload/eliminar.png";
import eliminar from "../../public/imagesupload/eliminar.png";
//Firebase
import firebase from "../../utilities/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import {
    Select,
    Modal,
    Button,
    Row,
    Col,
    ButtonGroup,
    Form,
    Card,
    CardGroup,
} from "react-bootstrap";

function IngresoFotosDocsNit(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [imgUno, setImgUno] = useState(img);
    const [imgDos, setImgDos] = useState(img);
    const [imgTres, setImgTres] = useState(img);
    const [selectedArchives, setSelectedArchives] = useState([]);
    const [baseArchives, setBaseArchives] = useState([]);

    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [showModal, setShowModal] = useState(false);
    const { setShowModalFotos1, showModalFotos1, idUid, email } = props;
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const [fileName, setFileName] = useState(false);
    const [nombreDocumentoUno, setnombreDocumentoUno] =
        useState("Agregar Documento");
    const [nombreDocumentoDos, setnombreDocumentoDos] =
        useState("Agregar Documento");
    const [nombreDocumentoTres, setnombreDocumentoTres] =
        useState("Agregar Documento");

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");
    //console.log("ID UID DOCUMENTOS NIT : ", idUid);
    const [showModalFotos, setShowModalFotos] = useState(true);
    const [showModalInformacion, setShowModalInformacion] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // Lee Caracteristicas del Vehiculo seleccionado
    const caracteristicasvehiculo = useSelector(
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

    const onCloseModalDctosJuridica = () => {
        setShowModalFotos(false);
    };

    const onCloseModalActivarCuenta = () => {
        setShowModal(false);
    };

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalInformacion = () => {
        setShowModalInformacion(false);
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeToken = (e) => {
        setFormDataToken({
            ...formDataToken,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async (file) => {
        //console.log("FILE NAME : ", file);

        const recorreImagen = async () => {
            let longitud = file.length;
            if (longitud < 3) {
                swal({
                    title: "Registro Usuarios",
                    text: "Recuerda debes subir los tres documentos!",
                    icon: "warning",
                    button: "Aceptar",
                });
                return;
            }
            let arreglofotos = [];
            let contador = 0;
            await Array.from(file).forEach((archivo) => {
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
                        setLoading(true);
                        grabarfoto(file, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    const grabarfoto = async (dato, ext) => {
        console.log("DOCUMENTO EN PRUEBA : ", dato[1]);

        let longitud = dato.length;
        let datodoc;
        let nombredoc = shortid();
        //console.log("LONGITUD FOTO : ", longitud);
        switch (longitud) {
            case 1:
                datodoc = {
                    longitud,
                    nombredoc1: nombredoc + "-1" + ext,
                    doc1: dato[0],
                };
                break;
            case 2:
                datodoc = {
                    longitud,
                    nombredoc1: nombredoc + "-1" + ext,
                    doc1: dato[0],
                    nombredoc2: nombredoc + "-2" + ext,
                    doc2: dato[1],
                };
                break;
            case 3:
                datodoc = {
                    longitud,
                    nombredoc1: nombredoc + "-1" + ext,
                    doc1: dato[0],
                    nombredoc2: nombredoc + "-2" + ext,
                    doc2: dato[1],
                    nombredoc3: nombredoc + "-3" + ext,
                    doc3: dato[2],
                };
                break;
            default:
                datodoc = {
                    longitud,
                    nombredoc1: "",
                    doc1: 0,
                    nombredoc2: "",
                    doc2: 0,
                    nombredoc3: "",
                    doc3: 0,
                };
                break;
        }

        //console.log("DATOS IMAGEN : ", datodoc);
        //return;
        crearDocumentos(datodoc);
    };

    const crearDocumentos = async (documentosnit) => {
        console.log("DOCUMENTOS NIT : ", documentosnit.doc1);

        const formdata = new FormData();
        //console.log("NOMBRE DOC : ", documento);
        formdata.append("usuario", idUid);
        formdata.append("estado", 1);
        formdata.append("nombredcto1", documentosnit.nombredoc1);
        formdata.append("nombredcto2", documentosnit.nombredoc2);
        formdata.append("nombredcto3", documentosnit.nombredoc3);
        formdata.append("longitud", documentosnit.longitud);
        formdata.append("controlactivar", "N");
        formdata.append("doc1", documentosnit.doc1);
        formdata.append("doc2", documentosnit.doc2);
        formdata.append("doc2", documentosnit.doc3);

        fetch("https://sitbusiness.co/mrp/api/22", {
            method: "POST",
            body: formdata,
        }).then((response) => {
            if (response) {
                if (response.status === 200) {
                    swal(
                        "Mercado Repuesto",
                        "Documentos persona juiridica grabados de forma correcta!",
                        "success",
                        { button: "Aceptar" }
                    );
                    swal(
                        "Mercado Repuesto",
                        "Ya puedes comprar en MR, Validaremos los documentos para activar tu cuenta!",
                        "success",
                        { button: "Aceptar" }
                    );
                    router.push("/");
                } else {
                    swal(
                        "Mercado Repuesto",
                        "Se presentaron inconvenientes al grabar los documentos, Intenta nuevamente!",
                        "warning",
                        { button: "Aceptar" }
                    );
                }
                setLoading(false);
                const auth = getAuth(firebase);
                signOut(auth)
                    .then(() => {})
                    .catch((error) => {
                        console.log("Error Cerrando Sesión");
                    });
                //router.push("/");
                let medio = "email";
                //generaToken(medio);
            } else {
                console.log("RESPONSE DOCS NIT : ", response);
            }
        });
    };

    const generaToken = async (medio) => {
        var caracteres = "012346789";
        var codigoid = "";
        for (var i = 0; i < 4; i++)
            codigoid += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        let tokenid = codigoid; //cadena.substring(0, 6);
        setCodigoToken(tokenid);

        const datosToken = {
            id: idUid,
            token: tokenid,
            fechatoken: fechaactual,
        };

        const datosEnviarToken = {
            token: tokenid,
            medio: medio,
            email_cliente: email,
            nro_ws: "3155337803",
        };

        console.log("DATOS ACTUALIZAR TOKEN : ", datosEnviarToken);

        const respuesta = await UpdateTokenRepository.getUpdateToken(
            datosToken
        ).then((response) => {
            if (response) {
                //console.log("RESPUESTA ACTUALIZAR TOKEN : ", response);

                if (response.type === 1) {
                    swal(
                        "Mercado Repuesto",
                        "Token generado de forma correcta!",
                        "success",
                        { button: "Aceptar" }
                    );
                    //setLoading(false);
                    //(true);
                    token(datosEnviarToken);
                    //actualizaDatosUsuarioState(IdToken);
                    //router.push("/");
                } else {
                    swal(
                        "Mercado Repuesto",
                        "Se presentaron inconvenientes al generar el token, Intenta nuevamente!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    //router.push("/");
                }
            } else {
                console.log("RESPONSE ACTUALIZACION DEL TOKEN : ", response);
                //return null;
            }
        });
        //setShowModal(false);
    };

    const token = async (datos) => {
        const datosEnviarToken = {
            token: datos.token,
            medio: datos.medio,
            email_cliente: datos.email_cliente,
            nro_ws: datos.nro_ws,
        };

        console.log("DATOS TOKEN : ", datosEnviarToken);

        async function enviartoken(dat) {
            // Lee Web Service para enviar el token al usuario
            const datosToken = {
                token: dat.token,
                email_cliente: dat.email_cliente,
                nro_ws: dat.nro_ws,
                medio: dat.medio,
            };

            //console.log("DATOS TOKEN : ", datosToken);

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    swal({
                        title: "Activar cuenta",
                        text: "Token enviado al correo, Recuerda revisar en correos no deseados!",
                        icon: "success",
                        button: "Aceptar",
                    });
                    setShowModal(true);
                })
                .catch((error) => {
                    swal({
                        title: "Activar cuenta",
                        text: "Error enviando token al medio seleccionado!",
                        icon: "error",
                        button: "Aceptar",
                    });
                });
        }
        enviartoken(datosEnviarToken);
    };

    const validarToken = () => {
        const dat = {
            id: idUid,
        };

        const activarToken = async () => {
            const respuesta = await ActivateUserRepository.getActivateUser(
                dat
            ).then((response) => {
                if (response) {
                    if (response.type === 1) {
                        swal(
                            "Mercado Repuesto",
                            "Ya puedes disfrutar de una experiencia diferente MR!",
                            "success",
                            { button: "Aceptar" }
                        );
                        setShowModal(true);
                        router.push("/");
                    } else {
                        swal(
                            "Mercado Repuesto",
                            "Algo salio mal, si deseas puedes reenviar tu token de activación!",
                            "success",
                            { button: "Aceptar" }
                        );
                        router.push("/");
                    }
                } else {
                    console.log("ENVIAR TOKEN : ", response);
                    //return null;
                }
            });
        };
        activarToken();
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setShowModalMedio(false);
        generaToken(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        //setShowModalMedio(false);
        generaToken(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setShowModalMedio(false);
        generaToken(medio);
    };

    const cerrarModalFotos = () => {
        setShowModalFotos(false);
    };

    const onSelectFile = (event) => {
        alert("ENTRE");

        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        //console.log("LONGITUD ARCHIVO : ", selectedArchives.length);

        const newDet = [];
        if (!baseArchives) {
            setBaseArchives(selectedFilesArray);
        } else newDet.push.apply(baseArchives, selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file.name;
            //return URL.createObjectURL(file);
        });

        //console.log("LONGITUD : ", selectedArchives.length);

        if (baseArchives.length === 1) {
            setnombreDocumentoUno("Documento Uno");
        } else if (baseArchives.length === 2) {
            setnombreDocumentoUno("Documento Uno");
            setnombreDocumentoDos("Documento Dos");
        } else if (baseArchives.length === 3) {
            setnombreDocumentoUno("Documento Uno");
            setnombreDocumentoDos("Documento Dos");
            setnombreDocumentoTres("Documento Tres");
        }

        //console.log("NOMBRE ARCHIVO : ", selectedFiles);

        if (baseArchives.length > 3) {
            swal(
                "Mercado Repuesto",
                "Recuerda, solo puedes ingresar tres archivos!",
                "warning",
                { button: "Aceptar" }
            );
            return;
        }

        console.log("SELECT ARRAY : ", selectedFilesArray);
        console.log("BASE ARCHIVES : ", baseArchives);
        console.log("SELECT FILES : ", selectedFiles);

        setSelectedArchives((previousImages) =>
            previousImages.concat(imagesArray)
        );
    };

    useEffect(() => {
        console.log("ARCHIVES : ", selectedArchives.length);
        console.log("BASE : ", baseArchives.length);

        if (selectedArchives.length > 0) {
            if (selectedArchives.length === 1) {
                setImgUno(eliminar);
                setImgDos(img);
                setImgTres(img);
            } else if (selectedArchives.length === 2) {
                setImgUno(eliminar);
                setImgDos(eliminar);
                setImgTres(img);
            } else if (selectedArchives.length === 3) {
                setImgUno(eliminar);
                setImgDos(eliminar);
                setImgTres(eliminar);
            }
        } else {
            setImgUno(img);
            setImgDos(img);
            setImgTres(img);
        }
    }, [selectedArchives]);

    const grabarDocumentos = () => {
        const base = [];
        const unicos = [];

        if (baseArchives.length > 2) {
            swal({
                title: "Registro Usuarios",
                text: "Recuerda, son maximo tres archivos!",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }

        for (var i = 0; i < baseArchives.length; i++) {
            const elemento = baseArchives[i].name;
            if (!base.includes(baseArchives[i].name)) {
                base.push(elemento);
                unicos.push(baseArchives[i]);
            }
        }

        //console.log("NUEVO ARCHIVO IMAGENES : ", unicos);
        const newDet = [];
        unicos &&
            unicos.forEach((archivos) => {
                selectedArchives &&
                    selectedArchives.forEach((row) => {
                        //console.log("ARCHIVOS FILTRADO : ",  row , "ARCHIVO BASE : ", archivos.name)
                        if (row === archivos.name) {
                            console.log(
                                "ARCHIVOS FILTRADO : ",
                                row,
                                "ARCHIVO BASE : ",
                                archivos.name
                            );
                            newDet.push(archivos);
                        }
                    });
            });
        setFileName(newDet);
        //console.log("NUEVO ARCHIVO IMAGENES : ", newDet);
        generabase64(newDet);
    };
    //show={showModalFotos}
    return (
        <div className="ps-page__header">
            <div>
                <Modal className="cajatextodoctonitfotos" show={showModalFotos}>
                    <Modal.Body>
                        <div className="ml-40">
                            <Row>
                                <Col xl={8} lg={8} md={8} sm={8}>
                                    <h2>SUBIR DOCUMENTOS PERSONA JURIDICA</h2>
                                </Col>
                                <Col xl={1} lg={1} md={1} sm={1}>
                                    <button
                                        type="button"
                                        className="cerrarmodal"
                                        data-dismiss="modal"
                                        onClick={onCloseModalDctosJuridica}>
                                        {" "}
                                        X{" "}
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <hr />
                        <form onChange={onChange}>
                            <div className="ps-form--review">
                                <div className="ps-form__group">
                                    <Form.Group
                                        controlId="formFileMultiple"
                                        className="ps-form__group">
                                        {/*
                                            <Form.Label>
                                            <h3>
                                                Por favor subir los documentos
                                                para activar tu cuenta
                                            </h3>
                                        </Form.Label>
                                        */}
                                        
                                        <label className="inputlabeljuridica">
                                            <Row>
                                                <Col xl={4} lg={4}>
                                                    <div className="inputbotondoctojuridica">
                                                        <img
                                                            className="mt-3"
                                                            src={imgUno.src}
                                                            height="40"
                                                            width="40"
                                                            alt="Seleccionar Archivo"
                                                            onClick={() =>
                                                                setSelectedArchives(
                                                                    selectedArchives.filter(
                                                                        (e) =>
                                                                            e !==
                                                                            archive
                                                                    )
                                                                )
                                                            }
                                                        />

                                                        <div className="inputtextobotondoctojuridica">
                                                            {nombreDocumentoUno}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={4} lg={4}>
                                                    <div className="inputbotondoctojuridica">
                                                        <img
                                                            className="mt-3"
                                                            src={imgDos.src}
                                                            height="40"
                                                            width="40"
                                                            alt="Seleccionar Archivo"
                                                            onClick={() =>
                                                                setSelectedArchives(
                                                                    selectedArchives.filter(
                                                                        (e) =>
                                                                            e !==
                                                                            archive
                                                                    )
                                                                )
                                                            }
                                                        />

                                                        <div className="inputtextobotondoctojuridica">
                                                            {nombreDocumentoDos}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={4} lg={4}>
                                                    <div className="inputbotondoctojuridica">
                                                        <botton
                                                            onClick={() =>
                                                                setSelectedArchives(
                                                                    selectedArchives.filter(
                                                                        (e) =>
                                                                            e !==
                                                                            archive
                                                                    )
                                                                )
                                                            }></botton>
                                                        <img
                                                            className="mt-3"
                                                            src={imgTres.src}
                                                            height="40"
                                                            width="40"
                                                            alt="Seleccionar Archivo"
                                                        />

                                                        <div className="inputtextobotondoctojuridica">
                                                            {
                                                                nombreDocumentoTres
                                                            }
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <input
                                                className="subir"
                                                type="file"
                                                name="images"
                                                onChange={onSelectFile}
                                                multiple
                                                //style={{ display: "none" }}
                                                accept="image/png, image/jpeg, application/pdf"
                                            />
                                        </label>
                                        <hr />
                                        <h4>
                                            Recuerda: Cámara de Comercio, RUT y
                                            Cedula de ciudadanía del
                                            Representante legal.
                                        </h4>
                                        <div>
                                            {selectedArchives &&
                                                selectedArchives.map(
                                                    (archive, index) => {
                                                        return (
                                                            <div
                                                                key={archive}
                                                                className="image">
                                                                <Row>
                                                                    <Col
                                                                        xl={5}
                                                                        lg={5}
                                                                        sm={5}
                                                                        md={5}>
                                                                        <h4>
                                                                            {
                                                                                archive
                                                                            }
                                                                        </h4>
                                                                    </Col>
                                                                    <div className="posicionbotonborrararchivo">
                                                                        <Col
                                                                            xl={
                                                                                3
                                                                            }
                                                                            lg={
                                                                                3
                                                                            }
                                                                            sm={
                                                                                3
                                                                            }
                                                                            md={
                                                                                3
                                                                            }>
                                                                            <button className="botonborrararchivo">
                                                                                Borrar
                                                                                Archivo
                                                                            </button>
                                                                        </Col>
                                                                    </div>
                                                                </Row>
                                                                {
                                                                    // <p>{index + 1}</p>
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </Form.Group>
                                    <hr />
                                    <h4>
                                        Despues de subir los tres archivos,
                                        debes guardar para grabar.
                                    </h4>
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
                    </Modal.Body>

                    <div className="botongrabardocumentos">
                        <Row>
                            <Col>
                                <div
                                    className="ps-btn"
                                    onClick={grabarDocumentos}>
                                    Grabar Documentos
                                </div>
                            </Col>
                            <Col>
                                <Button
                                    className="ps-btn"
                                    onClick={() => cerrarModalFotos()}>
                                    {" "}
                                    Cancelar{" "}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>

                <Modal dialogClassName="modalmediotoken" show={showModalMedio}>
                    <Modal.Header>
                        <h2>POR QUE MEDIO DESEA RECIBIR EL TOKEN</h2>
                        <button
                            type="button"
                            className="cerrarmodal"
                            data-dismiss="modal"
                            onClick={onCloseModalMedioToken}>
                            {" "}
                            X{" "}
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <form>
                            <Row>
                                <Col xs lg={1}></Col>
                                <Col xs lg={3}>
                                    <div
                                        className="ps-btn"
                                        onClick={tokenemail}>
                                        Email
                                    </div>
                                </Col>
                                <Col xs lg={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={tokenwhatsapp}>
                                        WhatsApp
                                    </Button>
                                </Col>
                                <Col xs lg={4}>
                                    <Button
                                        className="ps-btn"
                                        onClick={tokenmensajetexto}>
                                        Mensaje de Texto
                                    </Button>
                                </Col>
                            </Row>
                            <div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <Row>
                                    <Col xs lg={5}></Col>
                                    <Col xs lg={6}>
                                        <Button
                                            className="ps-btn"
                                            onClick={() =>
                                                setShowModalMedio(false)
                                            }>
                                            Regresar
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal dialogClassName="modaltoken" show={showModal}>
                    <Modal.Header>
                        <h2>ACTIVAR CUENTA</h2>
                        <button
                            type="button"
                            className="cerrarmodal"
                            data-dismiss="modal"
                            onClick={onCloseModalActivarCuenta}>
                            {" "}
                            X{" "}
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <form onChange={onChangeToken}>
                            <div className="ps-form__group">
                                <label className="ps-form__label">
                                    Ingresar Codigo :
                                </label>
                                <input
                                    className="form-control ps-form__input"
                                    name="token"
                                    type="text"
                                />
                            </div>
                        </form>
                    </Modal.Body>
                    <div className="botongrabarproducto">
                        <Row>
                            <Col xs lg={6}>
                                <div className="ps-btn" onClick={validarToken}>
                                    Activar Cuenta
                                </div>
                            </Col>
                            <Col xs lg={2}>
                                <Button
                                    className="ps-btn"
                                    onClick={() => setShowModal(false)}>
                                    {" "}
                                    Cancelar{" "}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <div>
                    <Modal
                        className="modalinformaciongenericos"
                        show={showModalInformacion}>
                        <Modal.Header>
                            <h2>REVISIÓN DE DOCUMENTOS PARA ACTIVAR CUENTA </h2>
                            <button
                                type="button"
                                className="cerrarmodal"
                                data-dismiss="modal"
                                onClick={onCloseModalInformacion}>
                                {" "}
                                X{" "}
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            <h2>
                                {" "}
                                El área Jurídica de Mercado Repuesto realizara
                                la revisión de los documentos, inmediatamente
                                tengamos la confirmación habilitaremos la opción
                                para la activación de tu cuenta.
                            </h2>
                            <ButtonGroup vertical></ButtonGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => setShowModalInformacion(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: 0,
        productogenerico: 0,
        numerodeimagenes: 3,
        nombreimagen1: "",
        nombreimagen2: "",
        nombreimagen3: "",
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

export default IngresoFotosDocsNit;
