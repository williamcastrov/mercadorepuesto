import Container from '../../../components/layouts/Container'
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import ModalMensajes from '../../mensajes/ModalMensajes';
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { URL_BD_MR } from '../../../helpers/Constants';
import axios from 'axios';
import { useDispatch, connect, useSelector } from "react-redux";

// Función de validación directamente en el componente
function validateTelefono(telefono) {
    // ajustar la expresión regular según requisitos
    const validation = /^[0-9]{10}$/;
    return validation.test(telefono);
}


export default function FormTel() {

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    // Estado para manejar la visibilidad de los contenedores
    const [mostrarContenedorExistente, setMostrarContenedorExistente] = useState(true);
    const [mostrarNewContainer, setMostrarNewContainer] = useState(false);
    const [showContainer, setShowContainer] = useState(false);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [alertBtnTelefono, setAlertBtnTelefono] = useState("telefonorecibe alertboton");
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");

    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] = useState("");
    const [telefonoConfirmado, setTelefonoConfirmado] = useState("");

    //ModalDatosGUardados
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    //Simulación Recibir codigo a nuevo número de teléfono con modales
    //Modales
    const [showModalCodigo, setShowModalCodigo] = useState(false);
    const [tituloMensajesCodigo, setTituloMensajesCodigo] = useState('');
    const [textoMensajesCodigo, setTextoMensajesCodigo] = useState('');

    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    const handleModalClose = () => {
        setShowModalMensajes(false);
    };

    //cerrarModalNuevoCodigoEmailError
    const handleModalCloseCodigo = () => {
        setShowModalCodigo(false);
    };
    //InpusPonerCodigoRecibido
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [codigo, setCodigo] = useState('');
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);



    const handleValidacionTelefono = () => {
        // Validación de la longitud del teléfono
        if (telefonoRecibeSeleccionado.length !== 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Datos teléfono");
            setTextoMensajes("Por favor, ingresa un número de teléfono válido con exactamente 10 dígitos.");
            setAlertBtnTelefono("telefonorecibe alertboton");
            return;
        }

        // Validación de que el teléfono contenga solo dígitos
        if (!/^\d+$/.test(telefonoRecibeSeleccionado)) {
            setShowModalMensajes(true);
            setTituloMensajes("Datos teléfono");
            setTextoMensajes("Por favor, ingresa solo números en el teléfono.");
            setAlertBtnTelefono("telefonorecibe alertboton");
            return;
        }

        // Validación de que ambos teléfonos coincidan
        if (telefonoRecibeSeleccionado !== telefonoConfirmado) {
            setShowModalMensajes(true);
            setTituloMensajes("Datos teléfono");
            setTextoMensajes("Los teléfonos ingresados no coinciden. Por favor, asegúrate de que ambos sean iguales.");
            return;
        }

        // Si todas las validaciones pasan, redirige al siguiente componente
        redirectToComponent();
    };

    //componente que da  el codigo y que abre el modal
    const redirectToComponent = () => {
        const nuevoCodigo = Math.floor(100000 + Math.random() * 900000);
        setCodigo(nuevoCodigo.toString());
        console.log(nuevoCodigo);

        // Mostrar el nuevo contenedor
        setMostrarNewContainer(true);
        setMostrarContenedorExistente(false);
        setShowContainer(true);
    };





    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [datosUsuario, setDatosUsuario] = useState([]);
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            //console.log("VISITAS: ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    //console.log("DAT USERS: ", res.data);
                    setDatosUsuario(res.data[0]);
                    setNombres(res.data[0].primernombre);
                    setNombresDos(res.data[0].segundonombre);
                    setApellidos(res.data[0].primerapellido);
                    setApellidosDos(res.data[0].segundoapellido);
                    //setNroDocumentoSeleccionado(res.data[0].identificacion);
                    setTelefonoRecibeSeleccionado(res.data[0].celular)
                })
                .catch(function (error) {
                    return;
                });
        };
        leerDatosUsuario();
    }, [datosusuarios]);

    

    const updateData = () => { 

        let params = {
            primernombre: nombres,
            segundonombre: nombresDos,
            primerapellido: apellidos,
            segundoapellido: apellidosDos,
            razonsocial: ".",
            tipoidentificacion:  datosUsuario.tipoidentificacion,
            identificacion: datosUsuario.identificacion,
            celular: telefonoRecibeSeleccionado,
            email: datosUsuario.email,
            token: datosUsuario.token,
            activo: datosUsuario.activo,
            direccion: datosUsuario.direccion,
            fechacreacion: datosUsuario.fechacreacion,
            fechatoken: datosUsuario.fechatoken,
            uid: datosUsuario.uid, 
        };
        //console.log("Datos usuario : ", params);
        //return
        const updateDatosUsuario = async () => { 
            await axios({
                method: "post",
                url: URL_BD_MR + "75",
                params,
            }) 
                .then((res) => {
                    handleConfirmationOpen();
                    console.log("ACTULIZA DAT USERS: ", res.data);
                })
                .catch(function (error) {
                    return;
                });
        };
        updateDatosUsuario();
    };


    const handleContinue = () => {
        const inputCodigo = input1 + input2 + input3 + input4 + input5 + input6;
        if (inputCodigo === codigo.toString()) { 
            updateData(); // Llama a la función de actualización de datos

            // alert indicando que el código es correcto
            handleConfirmationOpen();

            //  resetear los estados de los teléfonos después de la actualización
            setTelefonoRecibeSeleccionado('');
            setTelefonoConfirmado('');
        } else {
            // modal indicando que el código es incorrecto
            setShowModalCodigo(true);
            setTituloMensajesCodigo('Código Incorrecto');
            setTextoMensajesCodigo('El código ingresado es incorrecto.');
        }
    };











    const handleValidP = () => {
        router.push('../MisDatos');
    };

    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount" ref={irA}>
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>Editar teléfono de contacto</p>
                                </div>
 
                                {mostrarContenedorExistente && (
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <p className='titlesFormsUsers2'>Teléfono de contacto</p>
                                                <input
                                                    className='InputFormsUsers'
                                                    type="tel"
                                                    placeholder="Ej: 3006901715"
                                                    value={telefonoRecibeSeleccionado}
                                                    onChange={(e) => setTelefonoRecibeSeleccionado(e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <p className='titlesFormsUsers2'>Confirme teléfono de contacto *</p>
                                                <input
                                                    className='InputFormsUsers'
                                                    type="tel"
                                                    placeholder="Ej: 3006901715"
                                                    value={telefonoConfirmado}
                                                    onChange={(e) => setTelefonoConfirmado(e.target.value)}
                                                />
                                                <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                    <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                                    <button className='GuardarFormButton' onClick={handleValidacionTelefono}>Guardar</button>
                                                    <ModalMensajes
                                                        shown={showModalMensajes}
                                                        close={handleModalClose}
                                                        titulo={tituloMensajes}
                                                        mensaje={textoMensajes}
                                                        tipo="error"
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                )}

                                {mostrarNewContainer && (
                                    <Grid className="newContainer" container style={{ width: isMdDown ? '100%' : '50%', display: 'flex', margin: '0', padding: '.5rem', margin: '0 auto', backgroundColor: '#f0f1f5', padding: '5rem', borderRadius: '10px', justifyContent: 'center', marginTop: '3rem' }}>
                                        <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Ingresa el código que recibiste</p>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>a tu nuevo correo de 6 dígitos.</p>
                                        </div>
                                        <div className="input-fields" style={{ display: 'flex', width: '100%', marginTop: '2rem', marginBottom: '4.5rem', justifyContent: 'center' }}>
                                            {/* Inputs para el código de 6 dígitos */}
                                            {[input1, input2, input3, input4, input5, input6].map((value, index) => (
                                                <input
                                                    key={index}
                                                    style={{
                                                        height: '3.7em',
                                                        width: '3.2em',
                                                        outline: 'none',
                                                        textAlign: 'center',
                                                        fontSize: '1.5rem',
                                                        color: '#2C2E82',
                                                        borderRadius: '5px',
                                                        margin: '.5rem',
                                                        border: index === 0 ? '2px solid #2d2e83' : '1px solid #f0f1f5',
                                                    }}
                                                    maxLength="1"
                                                    type="tel"
                                                    value={value}
                                                    onChange={(e) => {
                                                        switch (index) {
                                                            case 0:
                                                                setInput1(e.target.value);
                                                                if (e.target.value) input2Ref.current.focus();
                                                                break;
                                                            case 1:
                                                                setInput2(e.target.value);
                                                                if (e.target.value) input3Ref.current.focus();
                                                                break;
                                                            case 2:
                                                                setInput3(e.target.value);
                                                                if (e.target.value) input4Ref.current.focus();
                                                                break;
                                                            case 3:
                                                                setInput4(e.target.value);
                                                                if (e.target.value) input5Ref.current.focus();
                                                                break;
                                                            case 4:
                                                                setInput5(e.target.value);
                                                                if (e.target.value) input6Ref.current.focus();
                                                                break;
                                                            case 5:
                                                                setInput6(e.target.value);
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        switch (index) {
                                                            case 0:
                                                                if (e.key === 'Backspace' && !input1) input1Ref.current.focus();
                                                                break;
                                                            case 1:
                                                                if (e.key === 'Backspace' && !input2) input1Ref.current.focus();
                                                                break;
                                                            case 2:
                                                                if (e.key === 'Backspace' && !input3) input2Ref.current.focus();
                                                                break;
                                                            case 3:
                                                                if (e.key === 'Backspace' && !input4) input3Ref.current.focus();
                                                                break;
                                                            case 4:
                                                                if (e.key === 'Backspace' && !input5) input4Ref.current.focus();
                                                                break;
                                                            case 5:
                                                                if (e.key === 'Backspace' && !input6) input5Ref.current.focus();
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }}
                                                    ref={index === 0 ? input1Ref : index === 1 ? input2Ref : index === 2 ? input3Ref : index === 3 ? input4Ref : index === 4 ? input5Ref : input6Ref}
                                                    onFocus={(e) => e.target.style.border = '2px solid #2d2e83'}
                                                    onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'}
                                                />
                                            ))}
                                        </div>
                                        <div style={{ width: '67%' }}>
                                            <button onClick={handleContinue} style={{ width: '100%', backgroundColor: '#2D2E83', color: '#F0F1F5', padding: '10px', borderRadius: '10px', fontSize: '1.8rem' }}>Continuar</button>
                                            <button type="button" style={{ width: '100%', backgroundColor: '#F0F1F5', color: '#2D2E83', padding: '10px', borderRadius: '10px', fontSize: '1.8rem', border: '2px solid #2D2E83', marginTop: '1.5rem' }}>Reenviar código en 00:40</button>
                                        </div>

                                        {/* Muestra el código generado */}
                                        <p style={{ marginTop: '1rem' }}>Código generado: {codigo}</p>
                                        <ModalMensajes
                                            shown={showModalCodigo}
                                            close={handleModalCloseCodigo}
                                            titulo={tituloMensajesCodigo}
                                            mensaje={textoMensajesCodigo}
                                            tipo="error"
                                        />
                                        <Dialog
                                            className='dialogDatsGuardados'
                                            open={confirmationOpen}
                                            PaperProps={{
                                                style: {
                                                    width: isMdDown ? '80%' : '35%',
                                                    backgroundColor: 'white',
                                                    border: '2px solid gray',
                                                    padding: '1.4rem',
                                                    borderRadius: '10px'
                                                },
                                            }}
                                        >
                                            <DialogTitle className='dialogtitleDtsGUardados' >
                                                <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                                                <p className='dialogtituloP'>¡Cambios realizados con éxito!</p>
                                            </DialogTitle>
                                            <DialogContent className='dialogContentDatsGuardados'>
                                                <p className='PdialogContent'>Tus cambios fueron realizamos con exito. Se verán reflejados un unos minutos.</p>
                                            </DialogContent>
                                            <DialogActions className='DialogActionsDatsGuardados'>
                                                <div className='div1buttonDialog' >
                                                    <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('../MisDatos')} >
                                                        Ir a Mis datos
                                                    </button>
                                                </div>
                                                <div className='div1buttonDialog' >
                                                    <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                        Ir al inicio
                                                    </button>
                                                </div>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>

                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}