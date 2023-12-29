import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineRight } from 'react-icons/ai';
import { GrNext } from "react-icons/gr";
import { URL_BD_MR } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";



export default function opinionesVendedor() {

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const irA = useRef(null);//PosiciónTopPage
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("Datos usuario vendedor: ", datosusuarios)

    // Estado para almacenar el tiempo como vendedor
    const [diasComoVendedor, setDiasComoVendedor] = useState(0);

    const [nombreVendedor, setNombreVendedor] = useState("");
    const [numeroVentas, setNumeroVentas] = useState(0);

    //Función para obtener, nombre de vendedor, número de ventas y tiempo como vendedor
    useEffect(() => {
        const obtenerDatosVendedor = async () => {
            let params = {
                idvendedor: datosusuarios.uid,
            };
            try {
                console.log("Enviando solicitud a endPoint 106 con params: ", params);
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "106",
                    params,
                });
                console.log("Respuesta recibida del endPoint 106: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listarvtasusuariovende) {
                    // Asumiendo que todos los objetos son ventas del mismo vendedor
                    setNumeroVentas(res.data.listarvtasusuariovende.length);
                    const vendedor = res.data.listarvtasusuariovende[0];
                    const nombreCompleto = `${vendedor.primernombre} ${vendedor.segundoapellido}`;
                    setNombreVendedor(nombreCompleto);
                }
            } catch (error) {
                console.error("Error al leer los datos del vendedor en endPoint 106", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatosVendedor();
    }, [datosusuarios]);









    // Estado para almacenar la dirección más reciente
    const [ciudadVendedor, setCiudadVendedor] = useState("");
    const [departamentoVendedor, setDepartamentoVendedor] = useState("");

    useEffect(() => {
        const obtenerDireccionVendedor = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                console.log("Enviando solicitud a endPoint 65 con params: ", params);
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "65",
                    params,
                });
                console.log("Respuesta recibida del endPoint 65: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listardireccionesusuario) {
                    try {
                        // Ordenamos las direcciones por fecha de creación y tomamos la más reciente
                        const direccionesOrdenadas = res.data.listardireccionesusuario.sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
                        setCiudadVendedor(direccionesOrdenadas[0].nombreciudad);
                        setDepartamentoVendedor(direccionesOrdenadas[0].nombre_dep);

                        // Calcular el tiempo como vendedor
                        if (vendedor && vendedor.fechacreacion) {
                            const fechaCreacion = new Date(vendedor.fechacreacion);
                            const fechaActual = new Date();
                            const diferenciaEnDias = Math.floor((fechaActual - fechaCreacion) / (1000 * 60 * 60 * 24));
                            setDiasComoVendedor(diferenciaEnDias);
                        }
                    } catch (error) {
                        console.error("Error al calcular la diferencia de días:", error);
                    }
                }
            } catch (error) {
                console.error("Error al leer los datos del vendedor en endPoint 65", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDireccionVendedor();
    }, [datosusuarios]);

    console.log("Ciudad vendedor: ", ciudadVendedor)
    console.log("Departamento vendedor: ", departamentoVendedor)
    console.log("Dias como vendedor: ", diasComoVendedor)






    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contDataUsersVerventa" container style={{ width: isMdDown ? '100%' : '94%' }}>
                                    <Grid item xs={12} md={4} className="ContOpVendedor" >
                                        <div className='TitleOpVend'>
                                            <p>Mis opiniones como vendedor</p>
                                        </div>
                                        <div className='subTitleOpVend'>
                                            <p>Mis opiniones como vendedor</p>
                                        </div>
                                        <div className="conUserOpiVend">
                                            <div className="conUserOpiVendNombre">
                                                <p>Vendedor: {nombreVendedor}</p>
                                            </div>
                                            <div className="conUserOpiVendData">
                                                <p>Tiempo como vendedor: {diasComoVendedor}</p>
                                                <p>Numero de ventas: {numeroVentas}</p>
                                                <p>{ciudadVendedor}, {departamentoVendedor}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} className="maincontCalificOpinionesV">
                                        <div className="vacioOpiniones"></div>

                                        <div className="contCalificOpinionesV">
                                            <div className="PcalifV">
                                                <p>Calificación vendedor</p>
                                            </div>
                                            <div className="SubcontCalificOpinionesV">
                                                <p className="SubcontCalificOpinionesVP">5.0</p>
                                                <div className="contnumbercalifics">
                                                    <div className="iconsOpinVend">
                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                            <RiSettings5Fill
                                                                key={index}
                                                                size={22}
                                                                className="iconoConfOpiVn"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>6 calificaciones</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mainOpinionesComentarios">
                                            <div className="subCmainOpiniones">
                                                <p>Comentarios de los compradores:</p>
                                                <button>Hola</button>
                                            </div>


                                            <div className="MainComentarios">

                                                <div className="subCmainComentarios">
                                                    <div className="subCmainIconos">
                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                            <RiSettings5Fill
                                                                key={index}
                                                                size={18}
                                                                className="iconoConfOpiVn"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>Comentario de la calificación:</p>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos illum explicabo, magni atque alias ipsa reiciendis culpa quae harum veniam repudiandae.</p>
                                                    <p>2023-12-22</p>
                                                </div>

                                                <div className="subCmainComentarios">
                                                    <div className="subCmainIconos">
                                                        {[1, 2, 3, 4, 5].map((index) => (
                                                            <RiSettings5Fill
                                                                key={index}
                                                                size={18}
                                                                className="iconoConfOpiVn"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>Comentario de la calificación:</p>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos illum explicabo, magni atque alias ipsa reiciendis culpa quae harum veniam repudiandae.</p>
                                                    <p>2023-12-22</p>
                                                </div>

                                                <div className="subCmainComentarios">
                                                    <div className="subCmainComentariosSub">
                                                        <div className="subCmainIconos">
                                                            {[1, 2, 3, 4, 5].map((index) => (
                                                                <RiSettings5Fill
                                                                    key={index}
                                                                    size={18}
                                                                    className="iconoConfOpiVn"
                                                                />
                                                            ))}
                                                        </div>
                                                        <p>Comentario de la calificación:</p>
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos illum explicabo, magni atque alias ipsa reiciendis culpa quae harum veniam repudiandae.</p>
                                                        <p>2023-12-22</p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>


                                    </Grid>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}