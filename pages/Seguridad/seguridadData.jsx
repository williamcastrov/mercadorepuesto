//import MUI media
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { AiOutlineRight } from 'react-icons/ai';




export default function seguridadData() {

    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));



    //Posición top Pagina
    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);




    const datosusuarios = useSelector((state) => state.userlogged.userlogged);    
    const [datosUsuario, setDatosUsuario] = useState("");    
    const [correoElectronico, setCorreoElectronico] = useState("");

  {/*  const [nombres, setNombres] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] = useState(""); 
    const [nroDocumentoSeleccionado, setNroDocumentoSeleccionado] = useState("");
    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("");
 */}
    
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
                setCorreoElectronico(res.data[0].email); 
                //setNombres(res.data[0].primernombre);
                //setNombresDos(res.data[0].segundonombre);
                //setApellidos(res.data[0].primerapellido);
                //setApellidosDos(res.data[0].segundoapellido);
                //setTelefonoRecibeSeleccionado(res.data[0].celular);
                

                // Agrega más setState según sea necesario

            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };

        leerDatosUsuario();
    }, [datosusuarios]);



    const editUser = (tipoInformacion) => {
        router.push({
            pathname: './compSmsSeguridad',
            query: { tipoInformacion, info: tipoInformacion },
        });
    };

    const rutaDispVinc = (e) => {
        e.preventDefault()
        router.push('./dispVinculados')
    }

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className="ContDatosDocs" style={{ padding: '.5rem', justifyContent: 'center', display: 'flex' }}>
                                    <Grid sx={{ width: isMdDown ? '100%' : '65%' }}>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <p className="titlemisD">Seguridad</p>
                                        </div>

                                        <div className="SubcontainerMisDatos" onClick={() => editUser('email')}>
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Correo electronico</p>
                                                <p className="subtitleSubContMisD">{correoElectronico}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={() => editUser('password')}>
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">contraseña</p>
                                                <p className="subtitleSubContMisD">xxxxxxxx</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="SubcontainerMisDatos" onClick={rutaDispVinc}>
                                            <div style={{ width: '100%' }}>
                                                <p className="titleSubContMisD">Dispositivos vinculados</p>
                                                <p className="subtitleSubContMisD">Mira tus dispositivos vinculados</p>
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