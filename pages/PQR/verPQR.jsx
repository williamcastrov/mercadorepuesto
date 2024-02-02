import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import { useRouter } from "next/router";
import { TbSearch } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { MdOutlineDownloadForOffline } from "react-icons/md";



export default function verPQR() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage

    useEffect(() => {
        if (irA.current) {
            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);
    const { id } = router.query;
    const [pqr, setPQR] = useState(null);

    const [tiposIdentificacion, setTiposIdentificacion] = useState([]);

    useEffect(() => {
        const obtenerTiposIdentificacion = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}7`,
                });
                if (Array.isArray(res.data.tipoidentificacion)) {
                    setTiposIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipoidentificacion);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTiposIdentificacion();
    }, []);

    useEffect(() => {
        const obtenerPQR = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}152`,
                });
                const pqrEncontrado = res.data.listarpqr.find(pqr => pqr.id.toString() === id);
                setPQR(pqrEncontrado);
            } catch (error) {
                console.error("Error al leer el PQR", error);
            }
        };
        if (id) {
            obtenerPQR();
        }
    }, [id]);



    return (
        <>
            {pqr && (
                <div ref={irA}>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                    <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>
                                        <div className="TopAyudaPQR">
                                            <p>Solicitud #{pqr.id}</p>
                                            <p>Información de la solicitud</p>
                                        </div>

                                        <div className="mainContVerPQR">

                                            <div className="SubMainContVerPQR">
                                                <div className="DatePQR">
                                                    <p>Fecha solicitud</p>
                                                    <p>{pqr.fechacreacion.slice(0, 10)}</p>
                                                </div>

                                                <div>
                                                    <p>Nombres</p>
                                                    <p>{pqr.nombres}</p>
                                                </div>

                                                <div>
                                                    <p>Apellidos</p>
                                                    <p>{pqr.apellidos}</p>
                                                </div>

                                                <div>
                                                    <p>Tipo de documento</p>
                                                    <p>{tiposIdentificacion.find(tipo => tipo.id === pqr.tipoidentificacion)?.descripcion}</p>
                                                </div>

                                                <div>
                                                    <p>Número de documento</p>
                                                    <p>{pqr.identificacion}</p>
                                                </div>

                                                <div>
                                                    <p>Correo electronico</p>
                                                    <p>{pqr.email}</p>
                                                </div>

                                                <div>
                                                    <p>Numero de contacto</p>
                                                    <p>{pqr.telefono}</p>
                                                </div>

                                                <div>
                                                    <p>Ciudad</p>
                                                    <p>{pqr.ciudad}</p>
                                                </div>

                                                <div>
                                                    <p>Dirección</p>
                                                    <p>{pqr.direccion}</p>
                                                </div>

                                                <div>
                                                    <p>Barrio</p>
                                                    <p>{pqr.barrio}</p>
                                                </div>

                                                <div className="MotivoPQR">
                                                    <p>Motivo: {pqr.motivo}</p>
                                                </div>
                                            </div>

                                            <div className="AsuntoDescrpPQR">
                                                <p>Asunto: {pqr.asunto}</p>
                                                <p>Descripción: {pqr.descripcion}</p>
                                            </div>

                                            <div className="docsPQR">
                                                <div>
                                                    <p>Archivos adjuntos</p>
                                                </div>

                                                <div>
                                                    <div><HiOutlineDocumentArrowDown /></div>
                                                    <div><HiOutlineDocumentArrowDown /></div>
                                                    <div><HiOutlineDocumentArrowDown /></div>
                                                </div>

                                                <div className="SolicituState">
                                                    <p>Estado de la solicitud: {pqr.estado}</p>
                                                </div>
                                            </div>

                                            <div className="descrRespuesta">
                                                <p>Tu solicitud fue enviada y tienen un tiempo aproximado de respuesta de XX día habiles</p>
                                            </div>

                                            <div className="DownloadRespuesta">
                                                <p>Descargar respuesta</p>
                                                <MdOutlineDownloadForOffline />
                                            </div>
                                        </div>

                                    </Grid>

                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </>
    );
}
