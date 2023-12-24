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




export default function verVenta() {



    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage


    //toppagewhilesign
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
                            <div className="ps-page__content ps-account" style={{marginBottom:'8rem'}}>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginBottom: '4rem' }}>
                                    <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                        <Link
                                            underline="none"
                                            color="inherit"
                                            href="./"
                                            onClick={(e) => { e.preventDefault(); router.push('./') }}
                                            sx={{ color: '#D9D9D9', fontSize: 25, fontWeight: 700 }}
                                        >
                                            Mis ventas
                                        </Link>
                                        <Typography sx={{ color: '#D9D9D9', fontSize: 25, fontWeight: 700 }} color="textPrimary">Ver venta</Typography>
                                    </Breadcrumbs>

                                </Grid>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={8} className="misVentasr" >
                                        <div >
                                            <p style={{ fontSize: '24px', color: '#2D2E83', fontWeight: '700' }}> Estado compra </p>
                                        </div>
                                        <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                            <p>Rines para mazda 2006</p>
                                        </div>
                                        <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                            <p>Numero de venta:</p>
                                            <p>12112</p>
                                        </div>
                                        <div className="subtitlesvercompra">
                                            <p>Fecha de venta:</p>
                                            <p>2023-23-12</p>
                                        </div>

                                        <div className="DetalleSEnvioVerVenta">
                                            <div className="detallesypagovercompra2">
                                                <p>Detalles del envio</p>
                                            </div>
                                            <div className="subtitlesverVenta">
                                                <p>Entregado</p>
                                                <div className="divButtonVerVenta">
                                                    <button
                                                    >
                                                        Rastrear envío
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="etiquetaCont">
                                            <div className="etiquetaCont1">
                                                <div className="etiquetaContIMG">
                                                    <img src={`https://i.postimg.cc/KYLj49Kp/4.png`} />
                                                </div>
                                                <div>
                                                    <p className="nameVerV">Mazda 2 203 p</p>
                                                    <p>Unidades vendidas: 23</p>
                                                    <p className="nameVerV2">$200,000</p>
                                                </div>
                                            </div>
                                            <div className="etiquetaContDetails">
                                                <p className="etiquetaContDetailsTitle">Datos del envío</p>
                                                <p>Entregado</p>
                                                <p>Rionegro Antioquia</p>
                                            </div>
                                        </div>

                                        <div className="DetalleSEnvioVerVenta">
                                            <div className="detallesypagovercompra2">
                                                <p>Facturación</p>
                                            </div>
                                            <div className="subtitlesverVenta"> 
                                                <div className="divButtonAdjFact">
                                                    <button
                                                    >
                                                        Adjuntar factura
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ paddingLeft: '4rem' }}>
                                        <div className="misVentasRigt1">
                                            <p>Pagado</p>
                                            <div className="subtitlesveVenta1">
                                                <p>Número aprobación de pago:</p>
                                                <p>1212</p>
                                            </div>
                                            <div className="subtitlesveVenta1">
                                                <p>Fecha de pago:</p>
                                                <p>2023-12-23</p>
                                            </div>
                                        </div>

                                        <div className="misVentasRigt2">
                                            <div className="subtitlesveVenta1">
                                                <p>Precio del producto:</p>
                                                <p>$23,000</p>
                                            </div>
                                            <div className="subtitlesveVenta1">
                                                <p>Precio del envio:</p>
                                                <p>$3,000</p>
                                            </div>
                                        </div>

                                        <div className="misVentasRigt2">
                                            <div className="subtitlesveVenta1">
                                                <p>Retención:</p>
                                                <p>$12,000</p>
                                            </div>
                                        </div>

                                        <div className="misVentasRigt2">
                                            <div className="subtitlesveVenta1">
                                                <p>Impuestos:</p>
                                                <p>$12,000</p>
                                            </div>
                                        </div>

                                        <div className="misVentasRigt3">
                                            <div className="subtitlesveVenta1">
                                                <p>Total:</p>
                                                <p>$12,000</p>
                                            </div>
                                        </div>

                                        <div className="subtitlesvercompra">
                                            <p>Este dinero estará disponible en 2 días</p>
                                        </div>

                                    </Grid>
                                </Grid>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '4rem' }}>

                                    <Grid className="ContPsubtitlesvercompra" item xs={12} md={8}>

                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ paddingLeft: '4rem' }}>
                                        <div className="datacomprVerVenta">
                                            <p className="nameVendVer">Juan Pablo Rojas Tabares</p>
                                            <p>Tienes 1 mensajes sin leer</p>
                                            <div className="divButtonVerVenta3">
                                                <button
                                                >
                                                    Enviar mensaje
                                                </button>
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