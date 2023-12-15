import Container from '../../components/layouts/Container'
import React, { useState, useEffect, useRef } from "react";

//import MUI media
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { AiOutlineRight } from 'react-icons/ai';
import { useRouter } from "next/router";

import { URL_BD_MR } from '../../helpers/Constants';
import axios from "axios";
import shortid from 'shortid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ModalMensajes from '../mensajes/ModalMensajes';
import { useDispatch, connect, useSelector } from "react-redux";
export default function CompSMS() {

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [showContainer, setShowContainer] = useState(false);

    const router = useRouter();
    const { tipoInformacion, info } = router.query;

    let titulo;

    // Determinar el título según el tipo de informac ión
    switch (tipoInformacion) {
        case 'nombres':
            titulo = 'Editar nombres y apellidos';
            break;
        case 'email':
            titulo = 'Editar correo electrónico';
            break;
        case 'DocIdentificacion':
            titulo = 'Editar documento de identificación';
            break;
        case 'domicilio':
            titulo = 'Editar teléfono de contacto';
            break;
        case 'teléfono':
            titulo = 'Editar teléfono de contacto';
            break;
        default:
            titulo = 'editar Usuario';
    }

    const [codigo, setCodigo] = useState('');


    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');


    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);


    const redirectToComponent = (nuevoTitulo) => {
        const nuevoCodigo = Math.floor(100000 + Math.random() * 900000);
        setCodigo(nuevoCodigo);
        console.log(nuevoCodigo);  // Imprimir el código en la consola

        // Mostrar el nuevo contenedor
        setShowContainer(true);
        setTituloSubcontainer(nuevoTitulo);
    };

    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');


    const handleContinue = () => {
        const inputCodigo = input1 + input2 + input3 + input4 + input5 + input6;
        if (inputCodigo === codigo.toString()) {
            // Navegar a la nueva ruta
            switch (info) {
                case 'nombres':
                    router.push('./FormsEditUsers/FormNamesLastNames');
                    break;
                case 'domicilio':
                    router.push('./FormsEditUsers/FormDomicilio');
                    break;
                case 'email':
                    router.push('./FormsEditUsers/FormEmail');
                    break;
                case 'teléfono':
                    router.push('./FormsEditUsers/FormTel');
                    break;
                case 'DocIdentificacion':
                    router.push('./FormsEditUsers/FormDocumento');
                    break;
                default:
                    router.push('./MisDatos');
            }
        } else {
            // Mostrar modal indicando que el código es incorrecto
            setShowModal(true);
            setTituloMensajes('Código Incorrecto');
            setTextoMensajes('El código ingresado es incorrecto.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleClose = () => {
        // Cerrar el popup
        setOpen(false);
    };


    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState("");
    const [nombres, setNombres] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    
    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
    
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
    
                // Actualiza el estado con los datos adicionales que necesitas
                setDatosUsuario(res.data[0]);
                setNombres(res.data[0].primernombre);
                setNombresDos(res.data[0].segundonombre);
                setApellidos(res.data[0].primerapellido);
                setApellidosDos(res.data[0].segundoapellido);
                setTelefonoRecibeSeleccionado(res.data[0].celular);
                setCorreoElectronico(res.data[0].email);
                // Agrega más setState según sea necesario
    
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
    
        leerDatosUsuario();
    }, [datosusuarios]);

    const [tituloSubcontainer, setTituloSubcontainer] = useState('Ingresa el código de verificación');


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
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>{titulo}</p>
                                </div>
                                {!showContainer ? (
                                    <Grid className="containerOptionsMassage" container style={{ width: isMdDown ? '100%' : '55%', display: 'flex', margin: '0', padding: '.5rem', margin: '0 auto', justifyContent: 'center' }}>

                                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                            <p className='titlescompSMS'>Verifica que eres tu</p>
                                            <p className='titlescompSMS'>Por donde deseas recibir el codigo de verificación</p>
                                        </div>

                                        <Box sx={{ borderRadius: '10px', padding: '.3rem', width: '100%', cursor: 'pointer' }}>
                                            <div onClick={() => redirectToComponent('Recibiste un número de 6 dígitos por SMS.')} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', color: '#2C2E82', backgroundColor: '#F0F1F5', padding: '2.4rem', width: '100%' }}>
                                                <div style={{ width: '100%', borderRadius: '10px' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>SMS</p>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Al celular terminado en {telefonoRecibeSeleccionado.slice(-4)}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </Box>
                                        <Box sx={{ padding: '.3rem', width: '100%' }}>
                                            <div onClick={() => redirectToComponent('Recibiste un número de 6 dígitos por Correo.')} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', color: '#2C2E82', backgroundColor: '#F0F1F5', padding: '2.4rem', width: '100%', cursor: 'pointer' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Correo Electrónico</p>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Al correo: {correoElectronico}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </Box>

                                        <Box sx={{ padding: '.3rem', width: '100%' }}>
                                            <div onClick={() => redirectToComponent('Recibiste un número de 6 dígitos por Whatsapp.')} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', color: '#2C2E82', backgroundColor: '#F0F1F5', padding: '2.4rem', width: '100%', cursor: 'pointer' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Por WhatsApp</p>
                                                    <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Al celular terminado en {telefonoRecibeSeleccionado.slice(-4)}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </Box>
                                    </Grid>
                                ) : (


                                    <Grid className="newContainer" container style={{ width: isMdDown ? '100%' : '50%', display: 'flex', margin: '0', padding: '.5rem', margin: '0 auto', backgroundColor: '#f0f1f5', padding: '5rem', borderRadius: '10px', justifyContent: 'center', marginTop: '3rem' }}>
                                        <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Ingresa el codigo que recibiste.</p>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>{tituloSubcontainer}</p>
                                        </div>
                                        <div className="input-fields" style={{ display: 'flex', width: '100%', marginTop: '2rem', marginBottom: '4.5rem', justifyContent: 'center' }}>
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input1} onChange={(e) => { setInput1(e.target.value); if (e.target.value) input2Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input1) input1Ref.current.focus(); }} ref={input1Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input2} onChange={(e) => { setInput2(e.target.value); if (e.target.value) input3Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input2) input1Ref.current.focus(); }} ref={input2Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input3} onChange={(e) => { setInput3(e.target.value); if (e.target.value) input4Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input3) input2Ref.current.focus(); }} ref={input3Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input4} onChange={(e) => { setInput4(e.target.value); if (e.target.value) input5Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input4) input3Ref.current.focus(); }} ref={input4Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input5} onChange={(e) => { setInput5(e.target.value); if (e.target.value) input6Ref.current.focus(); }} onKeyDown={(e) => { if (e.key === 'Backspace' && !input5) input4Ref.current.focus(); }} ref={input5Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                            <input style={{ height: '3.7em', width: '3.2em', outline: 'none', textAlign: 'center', fontSize: '1.5rem', color: '#2C2E82', borderRadius: '5px', margin: '.5rem' }} maxLength="1" type="tel" value={input6} onChange={(e) => setInput6(e.target.value)} onKeyDown={(e) => { if (e.key === 'Backspace' && !input6) input5Ref.current.focus(); }} ref={input6Ref} onFocus={(e) => e.target.style.border = '2px solid #2d2e83'} onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'} />
                                        </div>
                                        <div style={{ width: '67%' }}>

                                            <button onClick={handleContinue} style={{ width: '100%', backgroundColor: '#2D2E83', color: '#F0F1F5', padding: '10px', borderRadius: '10px', fontSize: '1.8rem' }}>Continuar</button>
                                            <button type="button" style={{ width: '100%', backgroundColor: '#F0F1F5', color: '#2D2E83', padding: '10px', borderRadius: '10px', fontSize: '1.8rem', border: '2px solid #2D2E83', marginTop: '1.5rem' }}>Reenviar código en 00:42</button>

                                        </div>
                                        <div style={{ width: '70%', justifyContent: 'center', display: 'flex' }}>

                                            <button type="button" style={{ color: '#2D2E83', fontSize: '1.8rem', marginTop: '7rem' }}>Probar otro metodo</button>

                                        </div>
                                        <p>Código generado: {codigo}</p>
                                        <ModalMensajes
                                            shown={showModal}
                                            close={handleModalClose}
                                            titulo={tituloMensajes}
                                            mensaje={textoMensajes}
                                            tipo="error"
                                        />
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