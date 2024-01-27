import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Container from "~/components/layouts/Container";
import useGetUsers from "~/hooks/useUsers";
import { URL_BD_MR } from "../helpers/Constants";
import ActivateUserRepository from "../repositories/ActivateUserRepository";
import ReadUserEmail from "../repositories/ReadUserEmail";
import UserRepository from "../repositories/UsersRepository";
import { validateEmail } from "../utilities/Validations";
import IngresoFotosDocsNit from "./CreateUsers/ingresofotosdocsnit";
//Firebase
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import TokenRegistroRepository from "../repositories/TokenRegistroRepository";
import firebase from "../utilities/firebase";
import ModalMensajes from "./mensajes/ModalMensajes";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import InfoIcon from "@material-ui/icons/Info";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { Dialog, DialogContent } from "@mui/material";
import Box from '@mui/material/Box';
import { ImEye } from "react-icons/im";
import { FormControl } from 'react-bootstrap';

import { ImEyeBlocked } from "react-icons/im";



const MyAccountScreen = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModalDos, setShowModalDos] = useState(false); //Estado de modal
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordDos, setShowPasswordDos] = useState(false);
    const captcha = useRef(null);
    const router = useRouter();
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const { getUsers } = useGetUsers();
    const [user, setUser] = useState(false);
    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [showModal, setShowModal] = useState(false);
    const [showModalDocsNit, setShowModalDocsNit] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");
    const [idUid, setIdUid] = useState(0);
    const [tipoIdentificacion, setTipoIdentificacion] = useState(false);
    const [tiposId, setTiposId] = useState([]);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [createId, setCreateId] = useState(false);
    const [noSoyRobot, setNoSoyRobot] = useState(false);
    const [terminosCondiciones, setTerminosCondiciones] = useState(false);
    const [showModalFotos, setShowModalFotos] = useState(false);
    const [phone, setPhone] = useState(false);
    const [openNewDialog, setOpenNewDialog] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mensajePhone, setMensajePhone] = useState(false);
    const [activaMensajePhone, setActivaMensajePhone] = useState(false);
    const [activaMensajeNombre, setActivaMensajeNombre] = useState(false);
    const [mensajeNombre, setMensajeNombre] = useState(false);
    const [activaMensajeApellido, setActivaMensajeApellido] = useState(false);
    const [mensajeApellido, setMensajeApellido] = useState(false);
    const [activaMensajeIdentificacion, setActivaMensajeIdentificacion] =
        useState(false);
    const [mensajeIdentificacion, setMensajeIdentificacion] = useState(false);
    const [activaMensajeRazonSocial, setActivaMensajeRazonSocial] =
        useState(false);
    const [mensajeRazonSocial, setMensajeRazonSocial] = useState(false);
    const [activaMensajeEmail, setActivaMensajeEmail] = useState(false);
    const [mensajeEmail, setMensajeEmail] = useState(false);
    const [activaMensajeConfirmarEmail, setActivaMensajeConfirmarEmail] =
        useState(false);
    const [mensajeConfirmarEmail, setMensajeConfirmarEmail] = useState(false);
    const [activaMensajeContraseña, setActivaMensajeContraseña] =
        useState(false);
    const [mensajeContraseña, setMensajeContraseña] = useState(false);
    const [
        activaMensajeConfirmarContraseña,
        setActivaMensajeConfirmarContraseña,
    ] = useState(false);
    const [mensajeConfirmarContraseña, setMensajeConfirmarContraseña] =
        useState(false);

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [subirDocsNit, setSubirDocsNit] = useState(false);
    const [inicio, setInicio] = useState(false);

    const [inputControlIdentificacion, setInputControlIdentificacion] =
        useState("form-control ps-form__input basecolorinput");
    const [inputControlTelefono, setInputControlTelefono] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlEmail, setInputControlEmail] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlConfirmarEmail, setInputControlConfirmarEmail] =
        useState("form-control ps-form__input basecolorinput");
    const [inputControlClave, setInputControlClave] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlConfirmeClave, setInputControlConfirmeClave] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlRazonSocial, setInputControlRazonSocial] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlNombres, setInputControlNombres] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlApellidos, setInputControlApellidos] = useState(
        "form-control ps-form__input basecolorinput"
    );
    const [inputControlTerminos, setInputControlTerminos] = useState("");
    const [mensajeTerminos, setMensajeTerminos] = useState(false);
    const [activaMensajeTerminos, setActivaMensajeTerminos] = useState(false);

    const [inputControlRobot, setInputControlRobot] = useState("");
    const [mensajeRobot, setMensajeRobot] = useState(false);
    const [activaMensajeRobot, setActivaMensajeRobot] = useState(false);


    const [open, setOpen] = useState(false);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    // Inicializamos el arrego de Tipos de Identificación
    const tiposidentificacion = useSelector(
        (state) => state.typesidentifications.typesidentifications
    );

    const onCloseModalActivarCuenta = () => {
        setShowModal(false);
    };

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalDocsJuridica = () => {
        setShowModalDocsNit(false);
    };



    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModalDos(false);
    };



    useEffect(() => {
        setCodigoToken(datosusuarios.token);
        if (datosusuarios.activo === "N") {
            setShowModal(true);
        }
    }, [datosusuarios]);

    useEffect(() => {
        if (inicio) {
            router.push("/");
        }
    }, [inicio]);

    useEffect(() => {
        const leerTipoIdentificacion = async () => {
            await axios({
                method: "post",
                url: URL_BD_MR + "7"
            })
                .then((res) => {
                    setTiposId(res.data.tipoidentificacion)
                    console.log("TIPOS ID : ", res.data.tipoidentificacion);
                })
                .catch(function (error) {
                    console.log("Error leyendo datos lista deseos");
                });
        };
        leerTipoIdentificacion();
    }, []);

    const registrarse = async () => {
        let loginvender = JSON.parse(localStorage.getItem("loginvender"));
        //e.preventDefault();
        //onsole.log("MEDIO : ", envio)

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!formData.identificacion) {
            setMensajeIdentificacion("Ingresa tu número de identificación!");
            setActivaMensajeIdentificacion(true);
            setInputControlIdentificacion(
                "form-control ps-form__input alertboton  basecolorinput"
            );
            formOk = false;
        }

        if (!formData.telefono) {
            setMensajePhone("Ingresa un número de teléfono valido!");
            setActivaMensajePhone(true);
            setInputControlTelefono("form-control ps-form__input alertboton  basecolorinput");
            formOk = false;
        }

        if (tipoIdentificacion == 6) {
            if (!formData.razonsocial) {
                setMensajeRazonSocial("Ingresa razón socia!");
                setActivaMensajeRazonSocial(true);
                setInputControlRazonSocial(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                formOk = false;
            }
        } else {
            if (tipoIdentificacion < 6) {
                if (!formData.primernombre || !formData.primerapellido) {
                    setMensajeNombre("Ingresa nombres validos!");
                    setActivaMensajeNombre(true);
                    setInputControlNombres(
                        "form-control ps-form__input alertboton"
                    );
                    setMensajeApellido("Ingresa apellidos validos!");
                    setActivaMensajeApellido(true);
                    setInputControlApellidos(
                        "form-control ps-form__input alertboton"
                    );
                    formOk = false;
                }

                if (!formData.primernombre) {
                    setMensajeNombre("Ingresa un nombre valido!");
                    setActivaMensajeNombre(true);
                    setInputControlNombres(
                        "form-control ps-form__input alertboton"
                    );
                    formOk = false;
                }

                if (!formData.primerapellido) {
                    setMensajeApellido("Ingresa un apellido valido!");
                    setActivaMensajeApellido(true);
                    setInputControlApellidos(
                        "form-control ps-form__input alertboton"
                    );
                    formOk = false;
                }
            }
        }

        if (!formData.email) {
            setMensajeEmail("Ingresa un número email valido!");
            setActivaMensajeEmail(true);
            setInputControlEmail("form-control ps-form__input alertboton");
            formOk = false;
        }

        if (!formData.emaildos) {
            setMensajeConfirmarEmail("Ingresa un número email valido!");
            setActivaMensajeConfirmarEmail(true);
            setInputControlConfirmarEmail(
                "form-control ps-form__input alertboton"
            );
            formOk = false;
        }

        if (!formData.password) {
            setMensajeContraseña("Ingresa una contraseña valida!");
            setActivaMensajeContraseña(true);
            setInputControlClave("form-control ps-form__input alertboton");
            formOk = false;
        }

        if (!formData.passworddos) {
            setMensajeConfirmarContraseña("Ingresa una contraseña valida!");
            setActivaMensajeConfirmarContraseña(true);
            setInputControlConfirmeClave(
                "form-control ps-form__input alertboton"
            );
            formOk = false;
        }

        if (!terminosCondiciones) {
            setInputControlTerminos("alertbotonterminos");
            setMensajeTerminos("Recuerda, Acepta terminos y condiciones!");
            setActivaMensajeTerminos(true);
        }


        if (!formOk) {
            console.log("FORM : ", formOk);
            setTituloMensajes('Registro usuarios');
            setTextoMensajes('Hola! revisa la información ingresada.');
            setShowModalDos(true);
            return;
        } else {
            if (!terminosCondiciones) {
                setInputControlTerminos("alertbotonterminos");
                setTituloMensajes('Registro Usuarios');
                setTextoMensajes('Por favor, Debes aceptar terminos y condiciones!');
                setShowModalDos(true);
                return;
            }
        }

        //console.log("VALOR FORMDATA : ", formOk);
        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
        const emailusuario = {
            email: formData.email,
        };

        const respuestauser = await ReadUserEmail.getReadUsersEmail(
            emailusuario
        );
        ///console.log("SI USUARIO EXISTE : ", respuestauser);

        if (respuestauser.length > 0) {
            setTituloMensajes('Registro Usuarios');
            setTextoMensajes('Por favor revisa el email, ya esta asignado a otra cuenta!');
            setShowModalDos(true);
            return;
        }
        setFormError(errors);
        //console.log("DATOS CREAR USUARIO : ", formData);

        if (formOk) {
            setLoading(true);
            //console.log("DATOS USAURIO : ", formData);
            //console.log(formData.password);

            const grabaUsuario = async () => {
                const auth = getAuth(firebase);
                createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        //console.log("USER CREDENTIAL : ", user);
                        if (tipoIdentificacion < 6) {
                            /*
                            swal({
                                title: "Registro Usuarios",
                                text: "Selecciona medio para enviar el Token!",
                                icon: "success",
                                button: "Aceptar",
                            });*/
                        } else {
                            setTituloMensajes('Registro Usuarios');
                            setTextoMensajes('Cuenta creada de forma correcta!');
                            setShowModalDos(true);
                            // Puedes usar un setTimeout para mostrar el segundo modal después de un tiempo
                            setTimeout(() => {
                                setTituloMensajes('Registro Usuarios');
                                setTextoMensajes('Hemos enviado un código de validación a tu correo!');
                                setShowModalDos(true);
                            }, 3000); // Aquí estoy usando un retraso de 3 segundos, puedes ajustarlo a tus necesidades
                        }

                        const auth = getAuth(firebase);

                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                //alert("ENTRE")

                                const datos = {
                                    uid: user.metadata.createdAt,
                                    medio: "",
                                };

                                setIdUid(user.metadata.createdAt);

                                setUser(true);
                                updateProfile(auth.currentUser, {
                                    displayName: formData.nombre,
                                    photoURL: "",
                                })
                                    .then(() => {
                                        /*
                                        swal({
                                            title: "Actualizar Usuarios",
                                            text: "Nombre Usuario Actualizado de forma correcta!",
                                            icon: "success",
                                            button: "Aceptar",
                                        });*/
                                        createUser(user.metadata.createdAt);
                                        setCreateId(true);
                                    })
                                    .catch((error) => {
                                        setTituloMensajes('Actualizar Usuarios');
                                        setTextoMensajes('Error Actualizando nombre de Usuario!');
                                        setShowModalDos(true);
                                    });
                            } else {
                                setUser(false);
                            }
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setTituloMensajes('Registro Usuarios');
                        setTextoMensajes('Error al crear la cuenta!');
                        setShowModalDos(true);
                    });
            };
            grabaUsuario();
        }
        return;
    };

    useEffect(() => {
        if (createId) {
            activaModal();
        }
    }, [createId]);

    const createUser = async (iDUser) => {
        //console.log("ID USUARIO CREATE : ", idUid);
        var caracteres = "012346789";
        var codigoid = "";
        for (var i = 0; i < 4; i++)
            codigoid += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        //let cadena = codigoid; //shortid();
        let tokenid = codigoid; //cadena.substring(0, 6);
        //console.log("ID TOKEN : ", tokenid);
        setCodigoToken(tokenid);

        // Lee Web Service para enviar el token al usuario
        const datos = {
            token: tokenid,
            medio: "email",
        };

        let identificacionsinseparadores = formData.identificacion.replace(
            /,/g,
            ""
        );
        //console.log("IDENTIFICACION SIN ESPACIOS : ", identificacionsinseparadores);
        let telefono = "+57" + formData.telefono;

        const usuario = {
            id: 0,
            uid: iDUser,
            primernombre: formData.primernombre,
            segundonombre: formData.segundonombre,
            primerapellido: formData.primerapellido,
            segundoapellido: formData.segundoapellido,
            razonsocial: formData.razonsocial,
            tipoidentificacion: tipoIdentificacion,
            identificacion: identificacionsinseparadores,
            celular: telefono,
            email: formData.email,
            token: tokenid,
            activo: "N",
            direccion: formData.direccion,
            fechacreacion: fechaactual,
            fechatoken: fechaactual,
        };

        //console.log("DATOS USUARIO : ", usuario);
        const respuesta = await UserRepository.createUser(usuario).then(
            (response) => {
                if (response) {
                    //console.log("RESPUESTA CREACION USUARIO : ", response);
                    //console.log("IDENTFICACION : ", tipoIdentificacion);
                    if (tipoIdentificacion < 6) {
                        if (response.type === 1) {
                            /*
                            swal({
                                title: "Registro Usuarios",
                                text: "Selecciona medio para enviar el Token!",
                                icon: "success",
                                button: "Aceptar",
                            });*/
                            setLoading(false);
                            //console.log("CODIGO ID : ", codigoid);
                            token(codigoid);
                            //setShowModal(false);
                            //actualizaDatosUsuarioState(IdToken);
                            //router.push("/");
                        } else {
                            swal(
                                "Mercado Repuesto",
                                "No hemos podido grabar el usuario, Intenta nuevamente!",
                                "warning",
                                { button: "Aceptar" }
                            );
                            setLoading(false);
                            //router.push("/");
                        }
                    } else {
                        console.log(
                            "Respuesta API Creación Usuario : ",
                            response
                        );
                        console.log("CODIGO ID : ", codigoid);
                        token(codigoid);
                    }
                } else {
                    setSubirDocsNit(!subirDocsNit);
                    setShowModalFotos(!showModalFotos);
                }
            }
        );
    };

    const [tokenDialog, setTokenDialog] = useState(null); // Agrega este estado al inicio de tu componente

    const token = async (tokenid) => {
        let telefono = phone.replace("+", "");
        async function enviartoken(dat) {
            const datosToken = {
                token: tokenid,
                email_cliente: formData.email,
                nro_ws: formData.telefono,
                medio: "email",
            };
            console.log("DATOS TOKEN : ", datosToken);
            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    setTokenDialog(tokenid); // Guarda el token en el estado
                    setOpenNewDialog(true);  // Abre el nuevo diálogo
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
        enviartoken(tokenid);
    };

    const onChangeDatoTelefono = (e) => {
        //console.log("VALOR TELEFONO : ", e.target.value)
        setActivaMensajePhone(false);
        setPhone(e.target.value);
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

    const handleChangeTipoIdentificacion = (selectedOptions) => {
        setTipoIdentificacion(selectedOptions);
    };


    const validarToken = () => {
        console.log("VALIDAR TOKEN : ", formDataToken.token);
        console.log("CODIGO TOKEN : ", codigoToken);
        //console.log("ID USUARIO : ", idUid);

        if (codigoToken != formDataToken.token) {
            setOpen(true);
            return;
        }

        const dat = {
            id: idUid,
        };

        const activarToken = async () => {
            const respuesta = await ActivateUserRepository.getActivateUser(dat).then((response) => {
                if (response) {
                    if (response.type === 1) {
                        console.log("TIPO DE IDENTIFICACION : ", tipoIdentificacion);

                        if (tipoIdentificacion < 6) {
                            setDialogOpen(true);
                            location.reload();
                            setInicio(true);
                        } else {
                            setTituloMensajes('Mercado Repuesto');
                            setTextoMensajes('Tu cuenta de correo ya fue validada!');
                            setShowModalDos(true);
                            Swal.fire({
                                title: "Para continuar con el ingreso de documentos, Oprime Aceptar",
                                html: "<hr />",
                                width: 600,
                                color: "#2D2E83",
                                padding: "3em",
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                cancelButtonText: "Cancelar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setShowModalDocsNit(true);
                                } else if (result.isDenied) {
                                    Swal.fire(
                                        "Cancelaste el ingreso de documentos",
                                        "",
                                        "warning"
                                    );
                                }
                            });
                            setShowModal(false); // Cierra el modal
                        }
                    } else {
                        setTituloMensajes('Mercado Repuesto');
                        setTextoMensajes('Algo salio mal, si deseas puedes reenviar tu token de activación!');
                        setShowModalDos(true);
                        router.push("/");
                    }
                } else {
                    console.log("ENVIAR TOKEN : ", response);
                }
            });
        };
        activarToken();
        //console.log("RESPUESTA : ", respuesta);
    };

    const activaModal = () => {
        if (tipoIdentificacion < 6) {
            //setShowModalMedio(true);
        } else {
            //setShowModalDocsNit(true);
        }
    };

    const mostrarModalDocsNit = () => {
        //alert("ENTRE")
        //console.log("VALOR MODAL FOTOS : ",showModalFotos)
        setSubirDocsNit(!subirDocsNit);
        setShowModalFotos(true);
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setShowModalMedio(false);
        token(medio);
    };

    const aceptarTerminos = () => {
        setTerminosCondiciones(true);
    };

    const validaIdentificacion = (identificacion) => {
        setActivaMensajePhone(false);
        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.identificacion) {
            if (!formData.identificacion) {
                setMensajeIdentificacion(
                    "Ingresa tu número de identificación!"
                );
                setActivaMensajeIdentificacion(true);
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                errors.identificacion = true;
                formOk = false;
                return;
            }

            if (
                formData.identificacion.length < 6 ||
                formData.identificacion.length > 10
            ) {
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                setMensajeIdentificacion(
                    "Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10"
                );
                setActivaMensajeIdentificacion(true);
                errors.identificacion = true;
                formOk = false;
                return;
            }

            let validaidentificacion = formData.identificacion.substr(0, 20);

            let validarid;
            let haycaracterid = false;
            for (var i = 0; i < validaidentificacion.length; i++) {
                validarid = validaidentificacion.substr(i, 1);
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
                    haycaracterid = true;
                    console.log("CARACTER", i, validarid);
                } else console.log("ES UN NUMERO ", i, validarid);
            }

            if (haycaracterid) {
                setActivaMensajeIdentificacion(true);
                setMensajeIdentificacion(
                    "Recuerda, La identificación solo debe contener números!"
                );
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                errors.identificacion = true;
                formOk = false;
                return;
            }

            if (formOk) {
                setInputControlIdentificacion("form-control ps-form__input  basecolorinput");
            }
        }
    };


    const resetTelefono = () => {
        setInputControlTelefono("form-control ps-form__input  basecolorinput");
        setActivaMensajePhone(false);
    };

    const validaTelefono = (tel) => {
        setActivaMensajeNombre(false);
        setFormError({});
        let errors = {};
        let formOk = true;
        let indicativo = "+57";
        let numtelefono = phone;
        let longitudtelefono = 0;
        let cadena = "";

        if (phone) {
            let numtelefono = phone.substr(0, 20);
            let longitudtelefono = numtelefono.length;
            let cadena = phone.substr(0, 20);

            for (var i = 0; i < cadena.length; i++) {
                validar = cadena.substr(i, 1);
                if (
                    validar != 0 &&
                    validar != 1 &&
                    validar != 2 &&
                    validar != 3 &&
                    validar != 4 &&
                    validar != 5 &&
                    validar != 6 &&
                    validar != 7 &&
                    validar != 8 &&
                    validar != 9
                )
                    haycaracter = true;
                else console.log("ES UN NUMERO ", i, validar);
            }

            let validar;
            let haycaracter = false;
            let longitud = false;

            if (haycaracter) {
                setActivaMensajePhone(true);
                setMensajePhone("* Recuerda, solo números en el teléfono");
            }

            if (!phone) {
                setMensajePhone("Ingresa un número de teléfono!");
                setActivaMensajePhone(true);
                setInputControlTelefono(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                errors.telefono = true;
                formOk = false;
                return;
            }

            console.log("LONGITUD TELEFONO : ", longitudtelefono);
            console.log("INDICATIVO : ", indicativo);
            console.log("CARACTERES : ", haycaracter);

            if (
                (indicativo = "+57" && longitudtelefono != 10 && !haycaracter)
            ) {
                setInputControlTelefono(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                setActivaMensajePhone(true);
                setMensajePhone(
                    "* Revisemos, El teléfono debe contener 10 caracteres númericos"
                );
                errors.telefono = true;
                formOk = false;
                return;
            }

            if (haycaracter) {
                setInputControlTelefono(
                    "form-control ps-form__input alertboton  basecolorinput"
                );
                setActivaMensajePhone(true);
                setMensajePhone(
                    "* Revisemos, El teléfono solo debe contener números"
                );
            }
        } else {
            indicativo = "+57";
            numtelefono = 0;
            longitudtelefono = 0;
            cadena = "";
        }

        if (formOk) {
            setInputControlTelefono("form-control ps-form__input  basecolorinput");
        }
    };

    const reiniciarEmail = (email) => {
        console.log("DATO EMAIL : ", formData.email);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
    };

    const reiniciarConfirmarEmail = (email) => {
        console.log("DATO EMAIL : ", formData.email);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
    };

    const validaEmail = (email) => {
        console.log("DATO EMAIL : ", formData.email);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.email) {
            if (!validateEmail(formData.email)) {
                setInputControlEmail("form-control ps-form__input  alertboton");
                setMensajeEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeEmail(true);
                errors.email = true;
                formOk = false;
                return;
            }

            if (formData.email && formData.emaildos) {
                if (formData.email != formData.emaildos) {
                    setInputControlConfirmarEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeConfirmarEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeConfirmarEmail(true);
                    setInputControlEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeEmail(true);
                    errors.email = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (formOk) {
            setInputControlEmail("form-control ps-form__input");
        }
    };

    const validaConfirmaEmail = (email) => {
        console.log("DATO CONFIRMA EMAIL : ", formData.emaildos);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.emaildos) {
            if (!validateEmail(formData.emaildos)) {
                setMensajeConfirmarEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeConfirmarEmail(true);
                setInputControlConfirmarEmail(
                    "form-control ps-form__input alertboton"
                );
                errors.email = true;
                formOk = false;
                return;
            }

            if (formData.email && formData.emaildos) {
                if (formData.email != formData.emaildos) {
                    setInputControlConfirmarEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeConfirmarEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeConfirmarEmail(true);
                    setInputControlEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeEmail(true);
                    errors.email = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (formOk) {
            setInputControlConfirmarEmail("form-control ps-form__input");
        }
    };

    const resetNumeroIdentificacion = () => {
        setInputControlIdentificacion("form-control ps-form__input  basecolorinput");
        setActivaMensajeIdentificacion(false);
    };

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const validaNombre = (nombre) => {
        var cadena = removeAccents(formData.primernombre);
        //console.log("CADENA : ", cadena);

        //console.log("NOMBRE : ", formData.primernombre);
        setActivaMensajeApellido(false);
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (formData.primernombre) {
            if (!regex.test(cadena)) {
                setActivaMensajeNombre(true);
                setMensajeNombre("Recuerda, Los nombres solo incluyen letras!");
                return false;
            }
        }
    };

    const validaApellido = (apellido) => {
        var cadena = removeAccents(formData.primerapellido);
        //console.log("CADENA : ", cadena);

        let regex = new RegExp("^[a-zA-Z ]+$");

        if (formData.primerapellido) {
            if (!regex.test(cadena)) {
                setActivaMensajeApellido(true);
                setMensajeApellido(
                    "Recuerda, Los apellido solo incluyen letras!"
                );
                return false;
            }
        }
    };

    const validaRazonSocial = (razonsocial) => {
        let regex = new RegExp("^[a-zA-Z0-9]+$");

        if (formData.razonsocial) {
            /*
            if (!regex.test(formData.razonsocial)) {
                setActivaMensajeRazonSocial(true);
                setMensajeRazonSocial(
                    "Recuerda, La Razón Social solo incluyen letras y números!"
                );
                return false;
            }*/
        }
    };

    const validaClave = (clave) => {
        console.log("DATO CONTRASEÑA : ", formData.password);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.password) {
            if (formData.password.length < 8) {
                setActivaMensajeContraseña(true);
                setMensajeContraseña(
                    "Password debe ser mayor a siete (7) caracteres!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }

            if (formData.passworddos)
                if (formData.password != formData.passworddos) {
                    setActivaMensajeContraseña(true);
                    setMensajeContraseña(
                        "Contraseña y confirmación contraseña deben ser iguales!"
                    );
                    setInputControlClave(
                        "form-control ps-form__input  alertboton"
                    );
                    setInputControlConfirmeClave(
                        "form-control ps-form__input  alertboton"
                    );

                    errors.password = true;
                    formOk = false;
                    return;
                }
        }

        if (formOk) {
            setInputControlClave("form-control ps-form__input");
            setInputControlConfirmeClave("form-control ps-form__input");
        }
    };

    const validaConfirmarClave = (clave) => {
        console.log("DATO CONTRASEÑA : ", formData.passworddos);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.passworddos) {
            if (formData.passworddos.length < 8) {
                setActivaMensajeConfirmarContraseña(true);
                setMensajeConfirmarContraseña(
                    "Contraseña debe ser mayor a siete (7) caracteres!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }
        }

        if (formData.passworddos && formData.password)
            if (formData.password != formData.passworddos) {
                setActivaMensajeConfirmarContraseña(true);
                setMensajeConfirmarContraseña(
                    "Contraseña y confirmación contraseña deben ser iguales!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }

        if (formOk) {
            setInputControlClave("form-control ps-form__input");
            setInputControlConfirmeClave("form-control ps-form__input");
        }
    };

    const onFocusContraseña = () => {
        setActivaMensajeConfirmarContraseña(false);
        setActivaMensajeContraseña(false);
        setInputControlClave("form-control ps-form__input");
        setInputControlConfirmeClave("form-control ps-form__input");
    };

    const onFocusConfirmarContraseña = () => {
        setActivaMensajeConfirmarContraseña(false);
        setActivaMensajeContraseña(false);
        setInputControlClave("form-control ps-form__input");
        setInputControlConfirmeClave("form-control ps-form__input");
    };

    const onFocusNombres = () => {
        setActivaMensajeNombre(false);
        setActivaMensajeApellido(false);
        setInputControlNombres("form-control ps-form__input");
        setInputControlApellidos("form-control ps-form__input");
    };

    const onFocusApellidos = () => {
        setActivaMensajeNombre(false);
        setActivaMensajeApellido(false);
        setInputControlNombres("form-control ps-form__input");
        setInputControlApellidos("form-control ps-form__input");
    };



    const CustomDropdownButton = React.forwardRef(({ children, onClick, href }, ref) => (
        <button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            href={href}
            className="DropDownTipoDocumento"
        >
            {children}
        </button>
    ));

    const handleSelect = (value, nombre) => {
        setSelectedItem(nombre);
        setTipoIdentificacion(value);
    };

    const [selectedItem, setSelectedItem] = useState("Seleccione tipo de identificación");

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner" id="myaccount">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-account">
                        <div className="row containerRegistrarse">


                            {!datosusuarios.logged ? (
                                <div className="col-12 col-md-8">
                                    <form onChange={onChange}>
                                        <div className="ps-form--review">
                                            <img src="/static/img/favicon_2.png" alt="" />
                                            <Row>
                                                <Col xs lg={6}>
                                                    <label className="ps-form__label">Tipo Identificación</label>
                                                    <div >
                                                        <Dropdown style={{ width: '100%' }} >
                                                            <Dropdown.Toggle
                                                                as={CustomDropdownButton}
                                                                id="dropdown-basic"
                                                            >
                                                                {selectedItem}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento">
                                                                {tiposId &&
                                                                    tiposId.map((itemselect) => (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdownTipoDoc"
                                                                            onClick={() => handleSelect(itemselect.id, `${itemselect.tipoidentificacion} - ${itemselect.descripcion}`)}
                                                                            eventKey={itemselect.id}
                                                                        >
                                                                            {`${itemselect.tipoidentificacion} - ${itemselect.descripcion}`}
                                                                        </Dropdown.Item>
                                                                    ))
                                                                }
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </Col>

                                            </Row>
                                            <br />
                                            {tipoIdentificacion == 6 ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group" >
                                                                <label className="ps-form__label">Número de identificación</label>
                                                                <input
                                                                    className={inputControlIdentificacion}
                                                                    autoComplete={Math.random().toString()}
                                                                    name="identificacion"
                                                                    onBlur={(e) => validaIdentificacion(e.target.value)}
                                                                    onClick={resetNumeroIdentificacion}
                                                                    onKeyPress={(e) => {
                                                                        const charCode = e.which ? e.which : e.keyCode;
                                                                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    maxLength={10}
                                                                />
                                                                {activaMensajeIdentificacion ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeIdentificacion}</h4>
                                                                ) : null}
                                                            </div>

                                                        </Col>

                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={12}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Razon Social</label>
                                                                <input
                                                                    className={inputControlRazonSocial}
                                                                    placeholder="Ej: Mercado Repuesto S.A.S."
                                                                    name="razonsocial"
                                                                    type="text"
                                                                    onBlur={(e) => validaRazonSocial(e.target.value)}
                                                                    onClick={(e) => validaTelefono(e.target.value)}
                                                                />
                                                                {activaMensajeRazonSocial ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeRazonSocial}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Dirección de correo *</label>
                                                                <FormControl
                                                                    className={inputControlEmail}
                                                                    type="email"
                                                                    name="email"
                                                                    onBlur={(e) => validaEmail(e.target.value)}
                                                                    onFocus={reiniciarEmail}
                                                                    onClick={(e) => validaRazonSocial(e.target.value)}
                                                                    autoComplete={Math.random().toString()}
                                                                />
                                                                {activaMensajeEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeEmail}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Confirme dirección de correo *</label>
                                                                <FormControl
                                                                    className={inputControlConfirmarEmail}
                                                                    onBlur={(e) => validaConfirmaEmail(e.target.value)}
                                                                    onFocus={reiniciarConfirmarEmail}
                                                                    onClick={(e) => validaEmail(e.target.value)}
                                                                    type="email"
                                                                    name="emaildos"
                                                                    autoComplete={Math.random().toString()}
                                                                />
                                                                {activaMensajeConfirmarEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeConfirmarEmail}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Contraseña *</label>

                                                                <div className="input-group">
                                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                                        <input
                                                                            className={inputControlClave}
                                                                            onBlur={(e) => validaClave(e.target.value)}
                                                                            onClick={(e) => validaConfirmaEmail(e.target.value)}
                                                                            onFocus={onFocusContraseña}
                                                                            type={showPassword ? "text" : "password"}
                                                                            name="password"
                                                                            autoComplete={Math.random().toString()}
                                                                        />
                                                                        <div
                                                                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                                            onClick={() => setShowPassword(!showPassword)}
                                                                        >
                                                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeContraseña}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Confirme contraseña *</label>
                                                                <div className="input-group">
                                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                                        <input
                                                                            className={inputControlConfirmeClave}
                                                                            onBlur={(e) => validaConfirmarClave(e.target.value)}
                                                                            onClick={(e) => validaClave(e.target.value)}
                                                                            onFocus={onFocusConfirmarContraseña}
                                                                            type={showPasswordDos ? "text" : "password"}
                                                                            name="passworddos"
                                                                            autoComplete={Math.random().toString()}
                                                                        />
                                                                        <div
                                                                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                                            onClick={() => setShowPasswordDos(!showPasswordDos)}
                                                                        >
                                                                            {showPasswordDos ? < ImEye /> : <ImEyeBlocked />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeConfirmarContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeConfirmarContraseña}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : tipoIdentificacion ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Número de identificación</label>
                                                                <input
                                                                    autoComplete={Math.random().toString()}
                                                                    className={inputControlIdentificacion}
                                                                    name="identificacion"
                                                                    onBlur={(e) => validaIdentificacion(e.target.value)}
                                                                    onClick={resetNumeroIdentificacion}
                                                                    onKeyPress={(e) => {
                                                                        const charCode = e.which ? e.which : e.keyCode;
                                                                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    maxLength={10}
                                                                />
                                                            </div>
                                                            {activaMensajeIdentificacion ? (
                                                                <h4 className="mensajeerrornombreusuario">{mensajeIdentificacion}</h4>
                                                            ) : null}
                                                        </Col>
                                                        <Col xs lg={2}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">Prefijo *</label>
                                                                <input
                                                                    className={inputControlTelefono}
                                                                    defaultValue="+57"
                                                                    name="prefijo"
                                                                    type="text"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={4}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">Número telefónico *</label>
                                                                <input
                                                                    autoComplete={Math.random().toString()}
                                                                    className={inputControlTelefono}
                                                                    onChange={onChangeDatoTelefono}
                                                                    onClick={resetTelefono}
                                                                    onBlur={(e) => validaTelefono(e.target.value)}
                                                                    name="telefono"
                                                                    type="text"
                                                                    onKeyPress={(e) => { //función para no permitir letras
                                                                        const charCode = e.which ? e.which : e.keyCode;
                                                                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {activaMensajePhone ? (
                                                                <h4 className="mensajeerroringresophonedos">{mensajePhone}</h4>
                                                            ) : null}
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Nombres</label>
                                                                <input
                                                                    className={inputControlNombres}
                                                                    placeholder="Ej: Juan"
                                                                    name="primernombre"
                                                                    type="text"
                                                                    onFocus={onFocusNombres}
                                                                    onBlur={(e) => validaNombre(e.target.value)}
                                                                    onClick={(e) => validaTelefono(e.target.value)}
                                                                    onKeyPress={(e) => { //función para no permitir numeros
                                                                        const charCode = e.which ? e.which : e.keyCode;
                                                                        if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {activaMensajeNombre ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeNombre}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Apellidos</label>
                                                                <input
                                                                    className={inputControlApellidos}
                                                                    placeholder="Ej: López Álvarez"
                                                                    name="primerapellido"
                                                                    type="text"
                                                                    onFocus={onFocusApellidos}
                                                                    onBlur={(e) => validaApellido(e.target.value)}
                                                                    onClick={(e) => validaNombre(e.target.value)}
                                                                    onKeyPress={(e) => { //función para no permitir numeros
                                                                        const charCode = e.which ? e.which : e.keyCode;
                                                                        if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {activaMensajeApellido ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeApellido}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Dirección de correo *</label>
                                                                <FormControl
                                                                    className={inputControlEmail}
                                                                    type="email"
                                                                    name="email"
                                                                    onBlur={(e) => validaEmail(e.target.value)}
                                                                    autoComplete={Math.random().toString()}
                                                                    onFocus={reiniciarEmail}
                                                                    onClick={(e) => validaRazonSocial(e.target.value)}
                                                                />
                                                                {activaMensajeEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeEmail}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Confirme dirección de correo *</label>
                                                                <FormControl
                                                                    className={inputControlConfirmarEmail}
                                                                    onBlur={(e) => validaConfirmaEmail(e.target.value)}
                                                                    onFocus={reiniciarConfirmarEmail}
                                                                    onClick={(e) => validaEmail(e.target.value)}
                                                                    name="emaildos"
                                                                    type="email"
                                                                    autoComplete={Math.random().toString()}
                                                                />
                                                                {activaMensajeConfirmarEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeConfirmarEmail}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>

                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Contraseña *</label>
                                                                <div className="input-group">
                                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                                        <input
                                                                            style={{ width: '100%' }}
                                                                            className={inputControlClave}
                                                                            onBlur={(e) => validaClave(e.target.value)}
                                                                            onClick={(e) => validaConfirmaEmail(e.target.value)}
                                                                            onFocus={onFocusContraseña}
                                                                            type={showPassword ? "text" : "password"}
                                                                            name="password"
                                                                        />
                                                                        <div
                                                                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                                            onClick={() => setShowPassword(!showPassword)}
                                                                        >
                                                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeContraseña}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">Confirme contraseña *</label>
                                                                <div className="input-group">
                                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                                        <input
                                                                            style={{ width: '100%' }}
                                                                            className={inputControlConfirmeClave}
                                                                            onBlur={(e) => validaConfirmarClave(e.target.value)}
                                                                            onClick={(e) => validaClave(e.target.value)}
                                                                            onFocus={onFocusConfirmarContraseña}
                                                                            type={showPasswordDos ? "text" : "password"}
                                                                            name="passworddos"
                                                                        />
                                                                        <div
                                                                            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                                            onClick={() => setShowPasswordDos(!showPasswordDos)}
                                                                        >
                                                                            {showPasswordDos ? < ImEye /> : <ImEyeBlocked />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {activaMensajeConfirmarContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeConfirmarContraseña}</h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : null}

                                            {tipoIdentificacion ? (
                                                <div>
                                                    <Row style={{ marginTop: '-1.5rem' }}>
                                                        <Col xs={3}></Col>

                                                        <Col xs lg={6}>
                                                            {/*   <div className={inputControlRobot} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center'  }}>
                                                                <ReCAPTCHA
                                                                    ref={captcha}
                                                                    sitekey="6Ld9HvkdAAAAAO7MeibRy8PNVMApQu5xC2vzqGF6"
                                                                    onChange={onChangeNoSoyRobot}
                                                                />
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                {activaMensajeRobot ? (
                                                                    <h4 className="mensajeerrornombreusuario">{mensajeRobot}</h4>
                                                                ) : null}
                                                            </div>*/}
                                                            <div className="SugerenciaCont">
                                                                <p className="ps-form__text">
                                                                    Sugerencia: La contraseña debe tener ocho caracteres como mínimo. Para mayor seguridad, debe incluir letras <br /> minúsculas, mayúsculas, números y símbolos como ! <br /> " ? $ % ^ &amp; ).
                                                                </p>
                                                            </div>
                                                            <div className="TermsContainer">
                                                                <div className={inputControlTerminos}>
                                                                    <div className="form-check form-checkTerminos">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id="remember"
                                                                            onClick={aceptarTerminos}
                                                                        />
                                                                        <label className="form-check-label" htmlFor="remember">
                                                                            Acepto términos y condiciones
                                                                        </label>
                                                                    </div>
                                                                    {activaMensajeTerminos ? (
                                                                        <h4 className="mensajeerrornombreusuario">{mensajeTerminos}</h4>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <div className="subcontFooterForm">
                                                                <div className="BotónRegistrarse" onClick={registrarse}>
                                                                    Registrarse
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={3}></Col>
                                                    </Row>
                                                </div>
                                            ) : null}
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                console.log("FALSO")
                            )}
                        </div>
                    </div>
                </div>
                {subirDocsNit ? (
                    <IngresoFotosDocsNit
                        setShowModalFotos={setShowModalFotos}
                        showModalFotos={showModalFotos}
                        idUid={idUid}
                        email={formData.email}
                    />
                ) : (
                    console.log("MOSTRAR MODAL DOCS NIT : FALSE")
                )}
            </div>

            <ModalMensajes
                shown={showModalDos}
                close={handleModalClose}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="error"
            />

            <Modal className="cajatextodoctonit" show={showModalDocsNit}>
                <Modal.Body>
                    <div className="ml-40">
                        <Row>
                            <Col xl={7} lg={7} md={7} sm={7}>
                                <h2>DOCUMENTOS PERSONA JURIDICA</h2>
                            </Col>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <button
                                    type="button"
                                    className="cerrarmodal"
                                    data-dismiss="modal"
                                    onClick={onCloseModalDocsJuridica}>
                                    {" "}
                                    X{" "}
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <div className="textomodaldocsnit">
                        Tu cuenta ya está creada, puedes comprar productos, pero
                        no puedes vender hasta no ingresar los siguientes
                        documentos:
                        <p className="textomodaldocsnitdos">
                            Cámara de Comercio.
                            <br />
                            RUT.
                            <br />
                            Cedula de ciudadanía del Representante legal.
                            <br />
                        </p>
                        Por favor sube los documentos solicitados, si no
                        dispones de estos archivos en este momento, tienes un
                        enlace en tus datos de usuario para ingresarlos y
                        continuar con el proceso de activación de la cuenta. Al
                        recibir los documentos, el área Jurídica de Mercado
                        Repuesto realizara la revisión, inmediatamente tengamos
                        la confirmación habilitaremos la opción para la
                        activación de tu cuenta..
                    </div>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xs lg={3}>
                            <div
                                className="ps-btn"
                                onClick={mostrarModalDocsNit}>
                                Subir Documentos
                            </div>
                        </Col>
                        <Col xs lg={2}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalDocsNit(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>


            {showModal ? (
                <div
                    className="modal-fondo mtmenos15"
                    onClick={onCloseModalActivarCuenta}
                >
                    <div
                        className="modal-Token redondearventamensajes"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Row>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <div className="iconoventanamensajes mtmenos14">
                                    <InfoIcon style={{ fontSize: 45 }} />
                                </div>
                            </Col>
                            <Col xl={9} lg={9} md={9} sm={9}>
                                <div className="ml-30 titulodetaildescription">
                                    Activar cuenta
                                </div>
                            </Col>
                            <Col xl={1} lg={1} md={1} sm={1}>
                                <button
                                    type="button"
                                    className="cerrarmodal ml-40 sinborder colorbase"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        onCloseModalActivarCuenta();
                                    }}
                                >
                                    X
                                </button>
                            </Col>
                        </Row>
                        <div className="mt-18 textoventanamensajesNuevo">
                            <div>
                                <form onChange={onChangeToken}>
                                    <div className="formtOKEN">
                                        <div className="Ptoken">
                                            <p>Ingresar token:</p>
                                        </div>
                                        <input
                                            className="tokenInputMyacount"
                                            name="token"
                                            type="text"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="cerrarVerifButtonToken">
                            <button className="RecuperarContraseñaSMS" onClick={validarToken}>
                                Activar Cuenta
                            </button>
                            <button onClick={() => setShowModal(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}


            <Dialog
                open={open}
                disableScrollLock={true}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: {
                        borderRadius: 15,
                    },
                }}
            >
                <div className="contTokenIcorrect">
                    <div className="topContTokenIcorrect">
                        <InfoIcon style={{ fontSize: 41 }} />
                        <p>Mercado repuesto</p>
                        <p>X</p>
                    </div>

                    <div className="txtContTokenIcorrect">
                        <p> Por favor, revisa el codigo ingresado, no corresponde!</p>
                    </div>

                    <div className="closeContTokenIcorrect">
                        <button onClick={() => setOpen(false)} color="primary">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Dialog>

            <Dialog
                disableScrollLock={true}
                open={openNewDialog}
                onClose={() => setOpenNewDialog(false)}
                PaperProps={{
                    style: {
                        borderRadius: 15,
                    },
                }}
            >
                <div className="contTokenEnviado">
                    <div className="topContTokenIcorrect">
                        <InfoIcon style={{ fontSize: 41 }} />
                        <p>Activar cuenta</p>
                        <p>X</p>
                    </div>

                    <div className="txtContTokenEnviado">
                        <p>Token enviado al correo, Recuerda revisar en correos no deseados!</p>
                        <p>token : {tokenDialog}</p>
                    </div>


                    <div className="closeContTokenIcorrect">
                        <button onClick={() => setOpenNewDialog(false)} color="primary">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Dialog>

            <Dialog
                disableScrollLock={true}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                    style: {
                        borderRadius: 15,
                    },
                }}
            >
                <div className="contTokenEnviado">
                    <div className="topContTokenIcorrect">
                        <InfoIcon style={{ fontSize: 41 }} />
                        <p>Mercado repuesto</p>
                        <p>X</p>
                    </div>

                    <div className="txtContTokenEnviado">
                        <p>Ya puedes disfrutar de una experiencia diferente MR!</p>
                    </div>


                    <div className="closeContTokenIcorrect">
                        <button onClick={() => setDialogOpen(false)} color="primary">
                            Cerrar
                        </button>
                    </div>
                </div>
            </Dialog>


            <Modal className="modalactivarcuenta" show={showModalMedio}>
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
                    <form>
                        <Row>
                            <Col xs lg={3}></Col>
                            <Col xs lg={3}>
                                <div className="ps-btn botonmediotoken">
                                    {" Email "}
                                </div>
                            </Col>
                            {/*    
                            <Col xs lg={4}>
                                <Button
                                    className="ps-btn ps-btn--warning"
                                    onClick={tokenwhatsapp}>
                                    WhatsApp
                                </Button>
                            </Col>
                            <Col xs lg={4}>
                                <Button
                                    className="ps-btn ps-btn--warning"
                                    onClick={tokenmensajetexto}>
                                    Mensaje de Texto
                                </Button>
                            </Col>*/}
                        </Row>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <hr />
                    <Row>
                        <Col xs lg={4}></Col>
                        <Col xs lg={3}>
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
        </Container>
    );
};

function defaultValueForm() {
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
        emaildos: "",
        password: "",
        passworddos: "",
        token: "",
        activo: "N",
        direccion: "",
        fechacreacion: "",
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

export default MyAccountScreen;
