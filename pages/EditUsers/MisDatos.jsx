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







export default function MisDatos() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState("");
    const [nombres, setNombres] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [nroDocumentoSeleccionado, setNroDocumentoSeleccionado] = useState("");
    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("");
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
                setNroDocumentoSeleccionado(res.data[0].identificacion);
                setTipoDocumentoSeleccionado(res.data[0].nombredocumento)

                // Agrega más setState según sea necesario

            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };

        leerDatosUsuario();
    }, [datosusuarios]);







    const [selectedOption, setSelectedOption] = useState('');

    const handleOnClick = (option) => {
        setSelectedOption(option);
    }

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));


    const router = useRouter();


    const editUser = (tipoInformacion) => {
        router.push({
            pathname: './CompSMS',
            query: { tipoInformacion, info: tipoInformacion },
        });
    };


    const handleClickDomicilio = (e) => {
        e.preventDefault()
        router.push('./FormsEditUsers/FormDomicilio')
    }

    const handleClicPjuridica = (e) => {
        e.preventDefault()
        router.push('./FormsEditUsers/FormPersJuridica')
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
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
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div ref={irA} className="ContDatosDocs" style={{ padding: '.5rem', justifyContent: 'center', display: 'flex' }}>

                                    <Grid sx={{ width: isMdDown ? '100%' : '65%' }}>


                                        <div style={{ marginBottom: '2rem' }}>
                                            <p className="titlemisD">Mis datos</p>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={abrirModal}>
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Nombre de usuario</p>
                                                <p className="subtitleSubContMisD">{nombres} </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        {mostrarModal && (
                                            <div
                                                className="modal-fondo mtmenos15"
                                                onClick={() => {
                                                    cerrarModal();
                                                }}
                                            >
                                                <div
                                                    className="modal-mensajes-login redondearventamensajes"
                                                    onClick={(e) => {
                                                        // Evitar que se cierre el modal si se hace clic en su contenido
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    {/* Contenido del modal */}
                                                    <Row>
                                                        <Col xl={1} lg={1} md={1} sm={1}>
                                                            <div className="iconoventanamensajes mtmenos14">
                                                                <InfoIcon style={{ fontSize: 45 }} />
                                                            </div>
                                                        </Col>
                                                        <Col xl={9} lg={9} md={9} sm={9}>
                                                            <div className="ml-30 titulodetaildescription">
                                                                Nombre de usuario
                                                            </div>
                                                        </Col>
                                                        <Col xl={1} lg={1} md={1} sm={1}>
                                                            <button
                                                                type="button"
                                                                className="cerrarmodal ml-40 sinborder colorbase"
                                                                data-dismiss="modal"
                                                                onClick={() => cerrarModal()}
                                                            >
                                                                X
                                                            </button>
                                                        </Col>
                                                    </Row>

                                                    <div className="mt-35 textoventanamensajes">
                                                        <div>
                                                            {/* Aquí va el mensaje del modal */}
                                                            No es posible editar el nombre de usuario, ya que este es asignado de manera automática por la plataforma.
                                                        </div>
                                                    </div>

                                                    <div className="ml-330 mt-29">
                                                        <Row>
                                                            <Col xl={4} lg={4} md={4} xs={4}></Col>
                                                            <Col xl={6} lg={6} md={6} xs={6}>
                                                                <Button
                                                                    variant="outline-light"
                                                                    className="ps-btn redondearborde"
                                                                    onClick={() => cerrarModal()}
                                                                >
                                                                    <span className="modal-text">Cerrar</span>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="SubcontainerMisDatos" onClick={() => editUser('nombres')} >
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Nombres y apellidos</p>
                                                <p className="subtitleSubContMisD" >{nombres} {nombresDos} {apellidos} {apellidosDos}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={() => editUser('email')} >
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Correo electrónico</p>
                                                <p className="subtitleSubContMisD">{correoElectronico} </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={() => editUser('DocIdentificacion')}>
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Tipo y número de documento</p>
                                                <p className="subtitleSubContMisD">{tipoDocumentoSeleccionado}, {nroDocumentoSeleccionado}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={() => editUser('teléfono')} >
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Teléfono</p>
                                                <p className="subtitleSubContMisD"> {telefonoRecibeSeleccionado} </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={handleClickDomicilio}>
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Domicilio</p>
                                                <p className="subtitleSubContMisD">Tus direcciones</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={handleClicPjuridica} style={{ marginTop: '8rem' }}>
                                            <div style={{ width: '100%', height: '100%' }}>
                                                <p className="titlePJuridicaMisDatos">Cambiar cuenta a cuenta de persona juridica</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                    </Grid>
                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}