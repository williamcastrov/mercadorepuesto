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
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";




export default function verVenta() {



    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage


    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let venta = null
    if (typeof window !== 'undefined') {
        if (router.query.venta) {
            venta = JSON.parse(router.query.venta)
            // Guardar los datos en el almacenamiento local
            localStorage.setItem('venta', JSON.stringify(venta))
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem('venta')
            if (data) {
                venta = JSON.parse(data)
            }
        }
    }


    console.log("Venta ver venta:", venta)
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
                {venta ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account" style={{ marginBottom: '8rem' }}>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginBottom: '4rem' }}>
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                underline="none"
                                                color="inherit"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./misVentas') }}
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
                                                <p>{venta.nombreProducto} </p>
                                            </div>
                                            <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                                <p>Numero de venta:</p>
                                                <p>{venta.id}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de venta:</p>
                                                <p>{venta.fechadeventa}</p>
                                            </div>

                                            <div className="DetalleSEnvioVerVenta">
                                                <div className="detallesypagovercompra2">
                                                    <p>Detalles del envio</p>
                                                </div>
                                                <div className="subtitlesverVenta">
                                                    <p>{venta.estadodeldespacho}</p>
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
                                                        <img src={`${URL_IMAGES_RESULTS}${venta.nombreImagen}`} />
                                                    </div>
                                                    <div>
                                                        <p className="nameVerV">{venta.nombreProducto}</p>
                                                        <p>Unidades vendidas: {venta.cantidad}</p>
                                                        <p className="nameVerV2">$200,000</p>
                                                    </div>
                                                </div>
                                                <div className="etiquetaContDetails">
                                                    <p className="etiquetaContDetailsTitle">Datos del envío</p>
                                                    <p>{venta.estadodeldespacho}</p>
                                                    <p>{venta.direcciondeenvio} {venta.ciudadenvio}</p>
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
                                                <p>{venta.estadodelaventa}</p>
                                                <div className="subtitlesveVenta1">
                                                    <p>Número aprobación de pago:</p>
                                                    <p>{venta.numerodeventa}</p>
                                                </div>
                                                <div className="subtitlesveVenta1">
                                                    <p>Fecha de pago:</p>
                                                    <p>{venta.fechadeventa}</p>
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Precio del producto:</p>
                                                    <p>${venta.salePrice}</p>
                                                </div>
                                                <div className="subtitlesveVenta1">
                                                    <p>Precio del envio:</p>
                                                    <p>${venta.preciodelenvio}</p>
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Retención:</p>
                                                    <p>${venta.retencion}</p>
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Impuestos:</p>
                                                    <p>${venta.impuestos}</p>
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
                ) : (
                    <div>
                        {/* Aquí puedes manejar el caso en que 'producto' es 'null' */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </>
    )
}