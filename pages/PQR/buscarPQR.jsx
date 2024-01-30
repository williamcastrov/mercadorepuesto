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



export default function buscarPQR() {

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
                                    <div className="TopBuscarPQR">
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9'  }} size={17} />} aria-label="breadcrumb" className="linkMisvResF">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Ayuda / PQRS</p>
                                            </Link>
                                            <p className="VerVentaLink">Buscar solicitud</p>
                                        </Breadcrumbs>
                                        <p className="SubtitleBuscar">Buscar solicitud</p>
                                    </div>

                                    <div className="MainmiddleAyudaPQR">

                                        <div className="inputsPQR">
                                            <div>
                                                <p>Número de identificación</p>
                                                <input type="text" />
                                            </div>

                                            <div>
                                                <p>Número de solicitud</p>
                                                <input type="text" />
                                            </div>
                                        </div>

                                        <div className="sendBuscarPQR">
                                            <button>Buscar</button>
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
