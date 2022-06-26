import React, { useState, useEffect, Suspense } from "react";
import Container from "~/components/layouts/Container";
import { validateEmail } from "../utilities/Validations";
import useGetUsers from "~/hooks/useUsers";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import shortid from "shortid";
import UserRepository from "../repositories/UsersRepository";
import { getUserLogged } from "../store/userlogged/action";
import ActivateUserRepository from "../repositories/ActivateUserRepository";
import UpdateTokenRepository from "~/repositories/UpdateTokenRepository";
import ReadUserEmail from "../repositories/ReadUserEmail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { getTokenRegistro } from "../store/tokenregistro/action";
import Users from "~/repositories/Users";
import Moment from "moment";

//Firebase
import firebase from "../utilities/firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { format } from "prettier";
import TokenRegistroRepository from "../repositories/TokenRegistroRepository";

const LoginAccount = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false);
    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [formDataValidarToken, setFormDataValidarToken] = useState(
        defaultValueValidarToken()
    );
    const [showModal, setShowModal] = useState(false);
    const [showModalLlamada, setShowModalLlamada] = useState(false);
    const [showModalMedioReenviar, setShowModalMedioReenviar] = useState(false);
    const [showModalPropietarioCuenta, setShowModalPropietarioCuenta] =
        useState(false);
    const [showModalVerificar, setShowModalVerificar] = useState(false);

    const [codigoToken, setCodigoToken] = useState("");
    const [idUid, setIdUid] = useState(0);
    const [recuperar, setRecuperar] = React.useState(false);
    const [usuario, setUsuario] = React.useState([]);

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [classNameverificar, setClassNameverificar] = useState(
        "textoverificardeotraforma"
    );
    const [classNameSMS, setClassNameSMS] = useState(
        "cajaopcionesrecuperarcuenta"
    );
    const [classNameWhatsapp, setClassNameWhatsapp] = useState(
        "cajaopcionesrecuperarcuenta"
    );

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const [inputControlEmail, setInputControlEmail] = useState(
        "form-control ps-form__input"
    );

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalVerificar = () => {
        setShowModalVerificar(!showModalVerificar);
    };

    const onCloseModalPropietario = () => {
        setShowModalPropietarioCuenta(!showModalPropietarioCuenta);
    };

    const login = async () => {
        //console.log("LOGIN");
        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }
        if (formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }
        setFormError(errors);

        const emailusuario = {
            email: formData.email,
        };

        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
        const respuestauser = await ReadUserEmail.getReadUsersEmail(
            emailusuario
        );

        if (respuestauser) {
            setCodigoToken(respuestauser[0].token);
            if (respuestauser[0].activo === "N") {
                Swal.fire({
                    showCancelButton: false,
                    showConfirmButton: true,
                    html: `<h1>CONTROL DE ACCESO</h1>
                <hr/>
                <br />
                <h2>Ya eres parte de la comunidad MR</h2>
                <hr/>
                <h2>Tienes una cuenta, pero primero la debes activar</h2>
                <hr/>
                `,
                });
            } else {
                if (respuestauser[0].activo === "R") {
                    Swal.fire({
                        showCancelButton: false,
                        showConfirmButton: true,
                        html: `<h1>CONTROL DE ACCESO</h1>
                    <hr/>
                    <br />
                    <h2>Ya eres parte de la comunidad MR</h2>
                    <hr/>
                    <h2>Estamos revisando tus documentos para habilitar tu usuario!</h2>
                    <hr/>
                    `,
                    });
                }
            }
        } else {
            Swal.fire({
                showCancelButton: false,
                showConfirmButton: true,
                html: `<h1>CONTROL DE ACCESO</h1>
            <hr/>
            <br />
            <h2>Aún no eres parte de la comunidad MR</h2>
            <hr/>
            <h2>Que estas esperando crea ya tu cuenta</h2>
            <hr/>
            `,
            });
            //router.push("/my-account");
        }

        if (formOk) {
            setLoading(true);

            const auth = getAuth(firebase);
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    //console.log("DATOS USER : ", user);
                    // Lee los datos del usuario para validar si ya esta aActivo

                    const dat = {
                        uid: user.metadata.createdAt,
                    };

                    setIdUid(user.metadata.createdAt);

                    const leeDatosUsuario = async () => {
                        const DatosUsuario = await Users.getUsers(dat);

                        if (DatosUsuario.length > 0) {
                            setUsuario(DatosUsuario);
                            if (DatosUsuario[0].activo === "N") {
                                setShowModal(true);
                                //router.push("/loginaccount");
                            } else {
                                router.push("/");
                            }
                        }
                    };
                    leeDatosUsuario();

                    setLoading(false);
                    //console.log("ACCESO OK");
                    //.push("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false);
                    swal({
                        title: "CONTROL DE ACCESO",
                        text: "Error al Intentar la Conexion... Intente mas Tarde!",
                        icon: "warning",
                        button: "Aceptar",
                    });
                    //router.push("/");
                });
        }
        //datosusuarios = useSelector((state) => state.userlogged.userlogged);
    };

    const signIn = async () => {
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                //console.log("DATOS USER : ", user);
                // Lee los datos del usuario para validar si ya esta aActivo

                const dat = {
                    uid: user.metadata.createdAt,
                };

                setIdUid(user.metadata.createdAt);

                const leeDatosUsuario = async () => {
                    const DatosUsuario = await Users.getUsers(dat);
                };
                leeDatosUsuario();

                setLoading(false);
                //console.log("ACCESO OK");
                //.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                swal({
                    title: "CONTROL DE ACCESO",
                    text: "Error al Intentar la Conexion... Intente mas Tarde!",
                    icon: "warning",
                    button: "Aceptar",
                });
                //router.push("/");
            });
    };

    const token = async (medio) => {
        console.log("DATOS USUARIOS : ", datosusuarios);
        console.log("FORM DATA : ", formData);

        const emailusuario = {
            email: formData.email,
        };

        let telefono = "";

        //Consulta en la BD datos del usuario asociados al Email
        const respuestauser = await ReadUserEmail.getReadUsersEmail(
            emailusuario
        ).then((response) => {
            if (response) {
                console.log("RESPONSE DATA : ", response);
                telefono = response[0].celular;
                console.log("TELEFONO USER : ", telefono);
            } else {
                console.log("RESPONSE DATA : ", "FALSO");
            }
        });

        async function enviartoken(dat) {
            // Lee Web Service para enviar el token al usuario
            //let cadena = shortid();
            //let tokenid = cadena.substring(0, 6);
            //console.log("ID TOKEN : ", tokenid);

            var caracteres = "012346789";
            var codigoid = "";
            for (var i = 0; i < 6; i++)
                codigoid += caracteres.charAt(
                    Math.floor(Math.random() * caracteres.length)
                );
            let tokenid = codigoid;
            setCodigoToken(tokenid);

            const datosToken = {
                token: tokenid,
                email_cliente: formData.email,
                nro_ws: telefono,
                medio: dat,
            };

            console.log("DATOS TOKEN : ", datosToken);

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    swal({
                        title: "ENVIO TOKEN",
                        text: "Listo, hemos enviado la clave al medio seleccionado!",
                        icon: "success",
                        button: "Aceptar",
                    });
                    setShowModalPropietarioCuenta(true);
                })
                .catch((error) => {
                    swal({
                        title: "ENVIO TOKEN",
                        text: "Error enviando token al medio seleccionado!",
                        icon: "error",
                        button: "Aceptar",
                    });
                    setShowModalPropietarioCuenta(false);
                    router.push("/");
                });

            //console.log("TOKEN USUARIO : ", TokenUsuario);

            //setCarrocerias(BodiesVehicles);
            // Coloca los datos en state arreglo de modelos de vehiculos segun marca
            //dispatch(getBodiesVehicles(BodiesVehicles));
        }
        enviartoken(medio);
    };

    const tokenReenviar = async (medio) => {
        console.log("DATOS USUARIOS : ", datosusuarios);
        console.log("FORM DATA : ", formData);

        async function enviartoken(dat) {
            // Lee Web Service para enviar el token al usuario
            //let cadena = shortid();
            //let tokenid = cadena.substring(0, 6);

            var caracteres = "012346789";
            var codigoid = "";
            for (var i = 0; i < 6; i++)
                codigoid += caracteres.charAt(
                    Math.floor(Math.random() * caracteres.length)
                );
            let tokenid = codigoid;
            let fecha = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //console.log("ID TOKEN : ", tokenid);
            setCodigoToken(tokenid);

            const datosToken = {
                token: tokenid,
                email_cliente: formData.email,
                nro_ws: "3155337803", //formData.telefono,
                medio: dat,
            };

            console.log("DATOS TOKEN : ", datosToken);

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    swal({
                        title: "REENVIO TOKEN",
                        text: "Token enviado al medio seleccionado!",
                        icon: "success",
                        button: "Aceptar",
                    });

                    const datos = {
                        token: tokenid,
                        id: datosusuarios.uid,
                        fechatoken: fecha,
                    };

                    const actualizatokenusuario = async () => {
                        const updateTokenUsuario =
                            await UpdateTokenRepository.getUpdateToken(datos)
                                .then(() => {
                                    setShowModal(true);
                                })
                                .catch((error) => {
                                    swal({
                                        title: "REENVIO TOKEN",
                                        text: "Error enviando token al medio seleccionado!",
                                        icon: "error",
                                        button: "Aceptar",
                                    });
                                    setShowModal(false);
                                    router.push("/");
                                });
                    };
                    actualizatokenusuario();
                })
                .catch((error) => {
                    swal({
                        title: "REENVIO TOKEN",
                        text: "Error enviando token al medio seleccionado!",
                        icon: "error",
                        button: "Aceptar",
                    });
                    setShowModal(false);
                    router.push("/");
                });

            //console.log("TOKEN USUARIO : ", TokenUsuario);

            //setCarrocerias(BodiesVehicles);
            // Coloca los datos en state arreglo de modelos de vehiculos segun marca
            //dispatch(getBodiesVehicles(BodiesVehicles));
        }
        enviartoken(medio);
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

    const onChangeValidarToken = (e) => {
        setFormDataValidarToken({
            ...formDataValidarToken,
            [e.target.name]: e.target.value,
        });
    };

    const leeTokenUsuario = async () => {
        const emailusuario = {
            email: formData.email,
        };

        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
        const datoToken = await ReadUserEmail.getReadUsersEmail(emailusuario);
        console.log("DATOS USUARIO ACTIVAR : ", datoToken);

        const datosusu = {
            idToken: datoToken[0].token,
            uid: datoToken[0].uid,
            fechatoken: datoToken[0].fechatoken,
        };

        validarToken(datosusu);
    };

    const validarToken = (datosusu) => {
        //console.log("DATOS  USUARIO : ", datosusu);
        //console.log("VALIDAR TOKEN : ", formDataToken.token);
        //console.log("CODIGO TOKEN : ", datosusu.idToken);

        let activartoken = "S";
        let fechaactual = new Date();
        var a = Moment(fechaactual, "YYYY-MM-DD HH:mm:ss");
        var b = Moment(datosusu.fechatoken, "YYYY-MM-DD HH:mm:ss");

        let tiempo = a.diff(b, "minutes");
        //console.log("DIFERENCIA MINUTOS TOKEN: ", tiempo);

        if (tiempo > 10) {
            swal(
                "VALIDAR TOKEN",
                "El token esta vencido, supero tiempo limite, vamos a reenviar el token",
                "warning",
                { button: "Aceptar" }
            );
            setShowModalMedioReenviar(true);
            activartoken = "N";
        }

        if (formDataToken.token !== datosusu.idToken) {
            swal(
                "VALIDAR TOKEN",
                "El token Ingresado no es valido, vamos a reenviar el token!",
                "warning",
                { button: "Aceptar" }
            );
            setShowModal(false);
            setShowModalMedioReenviar(true);
            activartoken = "N";
        }

        if (activartoken === "S") {
            const dat = {
                id: datosusu.uid,
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
                            setShowModal(false);
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
        }
        //console.log("RESPUESTA : ", respuesta);
    };

    const validarPropietarioCuenta = () => {
        console.log("TOKEN INGRESADO: ", formDataValidarToken.tokenvalidar);
        console.log("TOKEN GENERADO : ", codigoToken);
        //console.log("ID USUARIO : ", idUid);

        if (codigoToken != formDataValidarToken.tokenvalidar) {
            swal(
                "Mercado Repuesto",
                "Por favor, revisa el codigo ingresado, no corresponde!",
                "warning",
                { button: "Aceptar" }
            );
            return;
        }

        let respuesta = "0";

        if (formDataValidarToken.tokenvalidar !== codigoToken) {
            swal(
                "VALIDAR TOKEN",
                "El token Ingresado no es valido, debes validar la información!",
                "warning",
                { button: "Aceptar" }
            );
            setShowModalPropietarioCuenta(false);
            router.push("/");
        } else {
            const auth = getAuth();
            sendPasswordResetEmail(auth, formData.email)
                .then(() => {
                    swal(
                        "RECUPERAR CONTRASEÑA",
                        "Hemos enviado un enlace a tu cuenta de correo para recuperar la contraseña!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    //router.push("/loginaccount");
                    //location.reload();
                    onCloseModalPropietario();
                })
                .catch((error) => {
                    swal(
                        "RECUPERAR CONTRASEÑA",
                        "Intentalo nuevamente, el proceso de recuperación de contraseña a fallado!",
                        "warning",
                        { button: "Aceptar" }
                    );
                    onCloseModalPropietario();
                });
        }
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        //setShowModalMedio(false);
        token(medio);
    };

    const llamadatelefonica = () => {
        let medio = "llamada";
        setShowModalLlamada(true);
        //token(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setShowModalMedio(false);
        token(medio);
    };

    const textoMedioToken = () => {
        if (!formData.email) {
            setInputControlEmail("form-control ps-form__input alertboton");

            swal(
                "RECUPERAR CONTRASEÑA",
                "Por favor ingresa el email de recuperación!",
                "warning",
                { button: "Aceptar" }
            );
        } else {
            setRecuperar(true);
            setShowModalMedio(true);
        }
    };

    const reenviarToken = () => {
        let medio = "email";
        setShowModalMedioReenviar(false);
        tokenReenviar(medio);
    };

    const pasarmouseverificarotraforma = () => {
        setClassNameverificar("textoverificardeotraformados");
    };

    const pasarmousesms = () => {
        setClassNameSMS("cajaopcionesrecuperarcuentados");
    };

    const pasarmousewhatsapp = () => {
        setClassNameWhatsapp("cajaopcionesrecuperarcuentados");
    };

    const salirmouseverificarotraforma = () => {
        setClassNameverificar("textoverificardeotraforma");
    };

    const salirmousesms = () => {
        setClassNameSMS("cajaopcionesrecuperarcuenta");
    };

    const salirmousewhatsapp = () => {
        setClassNameWhatsapp("cajaopcionesrecuperarcuenta");
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner ">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-account">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <form onChange={onChange}>
                                    <div className="ps-form--review">
                                        <h2 className="ps-form__title">
                                            Ingresar a Mercado Repuesto
                                        </h2>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Dirección de Correo *
                                            </label>
                                            <input
                                                className={inputControlEmail}
                                                name="email"
                                                type="email"
                                            />
                                        </div>
                                        <div className="ps-form__group">
                                            <label className="ps-form__label">
                                                Contraseña *
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    className="form-control ps-form__input"
                                                    name="password"
                                                    type="password"
                                                />
                                                <div className="input-group-append">
                                                    <a
                                                        className="fa fa-eye-slash toogle-password"
                                                        href="#"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-form__submit">
                                            <div>
                                                <p className="ps-form__text">
                                                    Sugerencia: Si no estas
                                                    registrado en Mercado
                                                    Repuesto, primero debes
                                                    crear tu usuario, una cuenta
                                                    te permite estar al tanto de
                                                    las novedades de nuestro
                                                    sitio.
                                                </p>
                                            </div>
                                            <div
                                                className="ps-btn"
                                                onClick={login}>
                                                Ingresar
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="remember"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="remember">
                                                    Recuérdame
                                                </label>
                                            </div>
                                            <div
                                                className="ps-btn-contraseña"
                                                onClick={() =>
                                                    textoMedioToken()
                                                }>
                                                ¿Olvidaste tu contraseña?
                                            </div>
                                            {user ? (
                                                <div
                                                    className="ps-btn ps-btn--warning"
                                                    href="/my-additionaldata">
                                                    Datos Adicionales
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal dialogClassName="modaltoken" show={showModal}>
                <Modal.Header closeButton>
                    <h2>ACTIVAR CUENTA</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form onChange={onChangeToken}>
                        <div className="ps-form__group">
                            <label className="ps-form__label ">
                                Ingresar Codigo :
                            </label>
                            <input
                                className="form-control ps-form__input "
                                name="token"
                                type="text"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xs lg={6}>
                            <div
                                className="ps-btn ps-btn--warning"
                                onClick={leeTokenUsuario}>
                                Activar Cuenta
                            </div>
                        </Col>
                        <Col xs lg={2}>
                            <Button
                                className="ps-btn ps-btn--warning"
                                onClick={() => setShowModal(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal className="modalrecuperarcuenta" show={showModalMedio}>
                <Modal.Body>
                    <Row>
                        <Col xl={5} lg={5} md={5} sm={5}>
                            {!recuperar ? (
                                <h2 className="titulopasarela">
                                    POR QUE MEDIO DESEA RECIBIR EL TOKEN
                                </h2>
                            ) : (
                                <div>
                                    <h2 className="ml-10">
                                        Verifica que esta cuenta te pertenece
                                    </h2>
                                    <h2 className="ml-10 labeltexto">
                                        Elige cómo recibir el código de
                                        verificación.
                                    </h2>
                                </div>
                            )}
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={4}>
                            <button
                                type="button"
                                className="cerrarmodal ml-80"
                                data-dismiss="modal"
                                onClick={onCloseModalMedioToken}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                    <hr className="ml-10 mr-450" />
                    <br />
                    <div className="ml-10 mr-450">
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div
                                    onClick={tokenmensajetexto}
                                    className={classNameSMS}
                                    onMouseOver={pasarmousesms}
                                    onMouseOut={salirmousesms}>
                                    SMS - Mensaje de Texto
                                </div>
                                <hr />
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div
                                    className={classNameWhatsapp}
                                    onClick={tokenwhatsapp}
                                    onMouseOver={pasarmousewhatsapp}
                                    onMouseOut={salirmousewhatsapp}>
                                    WhatsApp
                                </div>
                                <hr />
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <div className="ml-10 mb-10">
                    <Row>
                        <Col xs lg={8}>
                            <div className="botonimagenesilustrativas">
                                <h3
                                    className={classNameverificar}
                                    onClick={onCloseModalVerificar}
                                    onMouseOver={pasarmouseverificarotraforma}
                                    onMouseOut={salirmouseverificarotraforma}>
                                    Verificar de otra forma
                                </h3>
                            </div>
                        </Col>
                        <Col xs lg={4}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalMedio(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal
                dialogClassName="modalmediotoken"
                show={showModalMedioReenviar}>
                <Modal.Header closeButton>
                    <h2>REENVIAR TOKEN</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form>
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col xs lg={2}></Col>
                            <Col xs lg={4}>
                                <div
                                    className="ps-btn ps-btn--warning"
                                    onClick={reenviarToken}>
                                    Email
                                </div>
                            </Col>
                            <Col xs lg={4}>
                                <Button
                                    className="ps-btn"
                                    onClick={() =>
                                        setShowModalMedioReenviar(false)
                                    }>
                                    {" "}
                                    Cancelar{" "}
                                </Button>
                            </Col>
                        </Row>

                        <br />
                        <br />
                        <br />
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                className="modalpropietario"
                show={showModalPropietarioCuenta}>
                <Modal.Body>
                    <br/>
                    <Row>
                        <Col xl={4} lg={4} md={4} sm={4} className="mr-100">
                            <h2>VALIDAR PROPIETARIO CUENTA</h2>
                        </Col>

                        <Col xl={2} lg={2} md={2} sm={2}>
                            <button
                                type="button"
                                className="cerrarmodal ml-95"
                                data-dismiss="modal"
                                onClick={onCloseModalPropietario}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xl={7} lg={7} md={7} sm={7} className="ml-2">
                            <form onChange={onChangeValidarToken}>
                                <div className="ps-form__group mt-10 tamañotextotoken">
                                    <label className="ps-form__label">
                                        Ingresar Codigo :
                                    </label>
                                    <input
                                        className="form-control ps-form__input tamañotextotoken"
                                        name="tokenvalidar"
                                        type="text"
                                    />
                                </div>
                            </form>
                        </Col>
                    </Row>

                </Modal.Body>
                <br/>
                <br/>
                <div className="ml-100 mt-10 mb-20">
                    <Row>
                        <Col xs lg={3}>
                            <div
                                className="ps-btn"
                                onClick={validarPropietarioCuenta}>
                                Validar Cuenta
                            </div>
                        </Col>
                        <Col xs lg={3}>
                            <Button
                                className="ps-btn"
                                onClick={() =>
                                    setShowModalPropietarioCuenta(false)
                                }>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
                <br/>
                <br/>
                <br/>
            </Modal>

            <Modal className="modalrecuperarcuenta" show={showModalVerificar}>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h2 className="seccionesvehiculotexto mt-10 ml-40">COMO DESEAS INGRESAR A TU CUENTA</h2>
                        </Col>
                        <Col>
                            <button
                                type="button"
                                className="cerrarmodal"
                                data-dismiss="modal"
                                onClick={onCloseModalVerificar}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                    <br />
                    <h4 className="textoimagenesilustrativas ml-80">
                        Selecciona el medio para recuperar el acceso a tu
                        cuenta.
                    </h4>
                    <br />
                    <br />
                    <div className="ml-30">
                        <Row>
                            <Col xl={3} lg={3} md={3} xs={3} className="ml-40">
                                < Button className="botonotraformaverificar">
                                    Ingresa con Google
                                </Button>
                            </Col>

                            <Col xl={4} lg={4} md={4} xs={4}>
                                <Button 
                                    className="botonotraformaverificar"
                                    onClick={tokenemail}
                                >
                                    Ingresa con e-mail
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xl={4} lg={4} md={4} xs={4} className="ml-50">
                            <Button
                                className="ps-btn"
                                onClick={onCloseModalVerificar}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal dialogClassName="modaltoken" show={showModalLlamada}>
                <Modal.Header closeButton>
                    <h2>LLAMADA TELEFONICA</h2>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <Row>
                        <Col xs lg={6}>
                            <h4>Llamando ...</h4>
                        </Col>
                        <Col xs lg={6}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalLlamada(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

function defaultValueForm() {
    return {
        email: "",
        password: "",
        nombre: "",
        telefono: 0,
    };
}

function defaultValueFormUser() {
    return {
        uid: "",
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        razonsocial: "",
        tipoidentificacion: "",
        identificacion: "",
        telefono: "",
        email: "",
        token: "",
        activo: "",
        direccion: "",
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

function defaultValueValidarToken() {
    return {
        tokenvalidar: "",
    };
}

export default LoginAccount;
