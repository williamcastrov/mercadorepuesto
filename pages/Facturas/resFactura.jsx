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
import { IoIosInformationCircle } from "react-icons/io";
import { IoMdClose } from 'react-icons/io';
import { PiSquareThin } from 'react-icons/pi';
import ModalMensajes from "../mensajes/ModalMensajes";
import { IoIosSquareOutline } from "react-icons/io";
import ModalMensajesEliminar from "../mensajes/ModalMensajesEliminar";
import shortid from "shortid";
import { FaCheckCircle } from "react-icons/fa";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import { TfiEye } from "react-icons/tfi";

import { HiOutlineChevronRight } from "react-icons/hi";

import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';


export default function resFactura() {



    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const ultimaCompra = router.query.ultimaCompra ? JSON.parse(router.query.ultimaCompra) : null;
    const producto = router.query.producto ? JSON.parse(router.query.producto) : null;
    const ultimaFactura = router.query.ultimaFactura ? JSON.parse(router.query.ultimaFactura) : null;


    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    let total = 0;
    if (producto && ultimaCompra) {
        total = producto.salePrice - ultimaCompra.impuestos - ultimaCompra.retencion - ultimaCompra.preciodelservicio - ultimaCompra.precioenvio;
    }

    let fechaDeCompra = null;
    if (ultimaCompra && ultimaCompra.fechacompra) {
        const fecha = new Date(ultimaCompra.fechacompra);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const ano = fecha.getFullYear();
        fechaDeCompra = `${dia}-${mes}-${ano}`;
    }

    let fechaDePago = null;
    if (ultimaCompra && ultimaCompra.fechadepago) {
        const fecha = new Date(ultimaCompra.fechadepago);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const ano = fecha.getFullYear();
        fechaDePago = `${dia}-${mes}-${ano}`;
    }

    let fechaDeVencimiento = null;
    if (ultimaCompra && ultimaCompra.fechadevencimiento) {
        const fecha = new Date(ultimaCompra.fechadevencimiento);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const ano = fecha.getFullYear();
        fechaDeVencimiento = `${dia}-${mes}-${ano}`;
    }




    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container" >
                            <div className="ps-page__header" > </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='TitleOpVend'>
                                        <p>Resumen factura</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainFacturacion" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={7} className="primerContFacturacion" display={'flex'} flexDirection={'column'}>

                                        <div className="ResFacturaMain">
                                            <div className="TopResFacturaMain">
                                                <p>Facturas en curso</p>
                                            </div>
                                            <div className="DataFacturaRes">
                                                <p>Cargos por venta</p>
                                                <p>${ultimaCompra && ultimaCompra.preciodelservicio ? ultimaCompra.preciodelservicio.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Cargos por envío</p>
                                                <p>${ultimaCompra && ultimaCompra.precioenvio ? ultimaCompra.precioenvio.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Impuestos</p>
                                                <p>${ultimaCompra && ultimaCompra.impuestos ? ultimaCompra.impuestos.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Retenciones</p>
                                                <p>${ultimaCompra && ultimaCompra.retencion ? ultimaCompra.retencion.toLocaleString('en-US') : 'No disponible'}</p>
                                            </div>

                                            <div className="TotalFactRes">
                                                <p>Total facturado</p>
                                                <p>${total.toLocaleString('en-US')}</p>
                                            </div>
                                        </div>

                                        <div className="segdoSubcontFactuRes">
                                            <div className="DudsSobreFact">
                                                <p>¿Dudas sobre tu factura?</p>
                                                <IoIosInformationCircleOutline />
                                            </div>
                                            <div className="DudaRandomRes">
                                                <p>¿Cómo se calcula los impuestos?</p>
                                            </div>
                                            <div className="RespuestaRandomRes">
                                                <p>Espacio para texto...</p>
                                            </div>
                                        </div>


                                    </Grid>
                                    <Grid item xs={12} md={5} className="segdoContFacturacion" display={'flex'} flexDirection={'column'}>
                                        <div className="contDataResFactura">
                                            <div className="DataContDataResFactura">
                                                <p>Fecha de emisión</p>
                                                <span>
                                                    <p>{fechaDeCompra}</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Fecha de vencimiento</p>
                                                <span>
                                                    <p>{fechaDeVencimiento} </p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Estado del pago</p>
                                                <span>
                                                    <button>{ultimaCompra && ultimaCompra.nombreestadopago ? ultimaCompra.nombreestadopago : 'No disponible'}</button>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Fecha de pago</p>
                                                <span>
                                                    <p>{fechaDePago}</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Concepto de pago</p>
                                                <span>
                                                    <p>{ultimaCompra && ultimaCompra.nombreconceptopago ? ultimaCompra.nombreconceptopago : 'No disponible'}</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura DataContDataResFacturaTotal">
                                                <p>Por pagar</p>
                                                <span>
                                                    <p>$total</p>
                                                </span>
                                            </div>

                                        </div>

                                        <div className="contDataResFacturaDownload">
                                            <p>Descargar</p>
                                            <div>
                                                <BsFiletypePdf className="pdfIcon"/>
                                                <RiFileExcel2Fill className="ExcelIcon" />
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