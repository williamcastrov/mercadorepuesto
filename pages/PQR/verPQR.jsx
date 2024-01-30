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
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>
                                    <div className="TopAyudaPQR">
                                        <p>Solicitud #1234567</p>
                                        <p>Información de la solicitud</p>
                                    </div>

                                    <div className="mainContVerPQR">

                                        <div className="SubMainContVerPQR">
                                            <div className="DatePQR">
                                                <p>Fecha solicitud</p>
                                                <p>12-11-2024</p>
                                            </div>

                                            <div>
                                                <p>Nombres</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Apellidos</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Tipo de documento</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Número de documento</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Correo electronico</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Numero de contacto</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Ciudad</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Dirección</p>
                                                <p>Juan Pablo</p>
                                            </div>

                                            <div>
                                                <p>Barrio</p>
                                                <p>Barrio</p>
                                            </div>

                                            <div className="MotivoPQR">
                                                <p>Motivo: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>

                                        <div className="AsuntoDescrpPQR">
                                            <p>Asunto: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure recusandae, deserunt aut id mag</p>
                                            <p>Descripción: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint atque accusantium ipsam maxime! Perferendis aliquam libero numquam dolore quibusdam. Illum ducimus doloremque quae aliquid tenetur omnis culpa. Eligendi, ullam provident! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem libero eius numquam non id, voluptas aperiam cum labore nostrum possimus, est earum recusandae ratione quae. Sit expedita earum modi.</p>
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
                                                <p>Estado de la solicitud: XXXXXXX</p>
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
        </>
    );
}
