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

export default function verCompra() {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const irA = useRef(null);//PosiciónTopPage

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null
    if (typeof window !== 'undefined') {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto)
            // Guardar los datos en el almacenamiento local
            localStorage.setItem('producto', JSON.stringify(producto))
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem('producto')
            if (data) {
                producto = JSON.parse(data)
            }
        }
    }

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (

        < >

            <div ref={irA}>
                {producto ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginBottom: '4rem' }}>
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                             className="linkMisv"
                                                underline="none" 
                                                href="./misCompras"
                                                onClick={(e) => { e.preventDefault(); router.push('./misCompras') }} 
                                            >
                                               <p className="VerVentaLink">Mis ventas</p>
                                            </Link>
                                            <p className="VerVentaLink">Ver venta</p>
                                        </Breadcrumbs>

                                    </Grid>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                        <Grid item xs={12} md={7} style={{ borderRight: '3px solid #EBEBEB', height: '21rem' }}>
                                            <div >
                                                <p style={{ fontSize: '24px', color: '#2D2E83', fontWeight: '700' }}>  {producto.estadodeldespacho} </p>
                                            </div>
                                            <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                                <p>Número de compra:</p>
                                                <p>{producto.numerodeaprobacion}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de compra:</p>
                                                <p>{producto.fechacompra}</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ paddingLeft: '4rem' }}>
                                            <div style={{ width: '80%' }}>
                                                <p style={{ fontSize: '20px', color: '#2D2E83', fontWeight: '600', cursor: 'pointer' }} onClick={() => router.push(`/product/${producto.idprd}`)}>{producto.nombreProducto}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Unidades compradas:</p>
                                                <p>{producto.cantidad}</p>
                                            </div>
                                            <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                                <p>Precio del producto:</p>
                                                <p>${producto.precioDeVentaFormateado}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Precio del envío:</p>
                                                <p>${producto.precioEnvioFormateado}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Total:</p>
                                                <p>${producto.nuevoValor}</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '4rem' }}>
                                        <div className="detallesypagovercompra">
                                            <p>Detalles de pago y envio</p>
                                        </div>
                                        <Grid className="ContPsubtitlesvercompra" item xs={12} md={7}>
                                            <div className="subtitlesvercompra">
                                                <p>Forma de pago:</p>
                                                <p>{producto.mediodepago} </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Valor pagado:</p>
                                                <p>${producto.nuevoValor}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de pago:</p>
                                                <p>{producto.fechadepago} </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Estado de pago:</p>
                                                <p>Aprobado</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Número de aprobación:</p>
                                                <p>{producto.numerodeaprobacion}</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ paddingLeft: '4rem' }}>
                                            <div className="subtitlesvercompra">
                                                <p>{producto.estadodeldespacho}</p>
                                            </div>
                                            <div className="subtitlesvercompra direccionsubtcompraver">
                                                <p>Dirección de envío:</p>
                                                <p>{producto.direcciondeenvio} </p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>{producto.nombreciudad}, {producto.nombre_dep} </p>
                                            </div>
                                            <button className="RastrMiEnvVerCompraButton">Rastrear mi envio</button>

                                        </Grid>
                                    </Grid>


                                    <Grid className="ContVendedor" container style={{ width: isMdDown ? '100%' : '87%' }}>
                                        <div className="SubcontainerMisDatos" >
                                            <div style={{ width: '85%' }}>
                                                <p className="titlecontVend1">Contactar con vendedor</p>
                                                <p className="subtitlecontVend1">{producto.nombreVendedor} {producto.apellidoVendedor}</p>
                                            </div>
                                            <div className="EnviarmMsjVercompra">
                                                <button onClick={() => router.push({
                                                    pathname: './msjVendedor',
                                                    query: { producto: JSON.stringify(producto) }
                                                })}>Enviar mensaje</button>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid onClick={() => router.push({
                                        pathname: './linktoTengounProblema',
                                        query: { producto: JSON.stringify(producto) }
                                    })}
                                        className="ContVendedor3" container style={{ width: isMdDown ? '100%' : '87%', cursor: 'pointer' }}>
                                        <div style={{ marginBottom: '2rem', width: '100%' }}>
                                            <p className="titlecontVend2">Ayuda con mi compra</p>
                                        </div>
                                        <div className="containerTitlecontvendBottom">
                                            <p className="titlecontvendBottom">Tengo un problema con el producto o con el paquete que me llegó</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
                                    </Grid>
                                    <Grid
                                        onClick={() => router.push({
                                            pathname: './calificarVendedor',
                                            query: { producto: JSON.stringify(producto) }
                                        })}
                                        className="subContVendedor2" container style={{ width: isMdDown ? '100%' : '87%', cursor: 'pointer' }}>
                                        <div className="containerTitlecontvendBottom">
                                            <p className="titlecontvendBottom">Calificar vendedor</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
                                    </Grid>
                                    <Grid
                                        onClick={() => router.push({
                                            pathname: './calificarProducto',
                                            query: { producto: JSON.stringify(producto) }
                                        })}
                                        className="subContVendedor2" container style={{ width: isMdDown ? '100%' : '87%', cursor: 'pointer' }}>
                                        <div className="containerTitlecontvendBottom">
                                            <p className="titlecontvendBottom">Calificar producto</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
                                    </Grid>
                                    <Grid onClick={() => router.push({
                                        pathname: './tengoUnProblema',
                                        query: { producto: JSON.stringify(producto) }
                                    })} className="UltsubContVendedor2" container style={{ width: isMdDown ? '100%' : '87%', cursor: 'pointer' }}>
                                        <div className="containerTitlecontvendBottom">
                                            <p className="titlecontvendBottom">No llegó mi compra</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
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