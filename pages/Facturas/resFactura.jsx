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




export default function resFactura() {



    const router = useRouter();//NextRouter
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
                        <div className="container" >
                            <div className="ps-page__header" > </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='TitleOpVend'>
                                        <p>Resumen factura</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainFacturacion" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={7} className="primerContFacturacion" >

                                        <div className="ResFacturaMain">
                                            <div className="TopResFacturaMain">
                                                <p>Facturas en curso</p>
                                            </div>
                                            <div className="DataFacturaRes">
                                                <p>Cargos por venta</p>
                                                <p>$ XXX.XXX,XX</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Cargos por envío</p>
                                                <p>$ XXX.XXX,XX</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Impuestoso</p>
                                                <p>$ XXX.XXX,XX</p>
                                            </div>

                                            <div className="DataFacturaRes">
                                                <p>Retenciones</p>
                                                <p>$ XXX.XXX,XX</p>
                                            </div>

                                            <div className="TotalFactRes">
                                                <p>Total facturado</p>
                                                <p>$ XXX.XXX,XX</p>
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
                                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus cupiditate ad, fuga mollitia, autem dignissimos beatae animi ipsa, ex odio ipsam. Modi necessitatibus repellendus voluptatem pariatur fuga maiores ea saepe?</p>
                                            </div>
                                        </div>


                                    </Grid>
                                    <Grid item xs={12} md={5} className="segdoContFacturacion">
                                        <div className="contDataResFactura">
                                            <div className="DataContDataResFactura">
                                                <p>Fecha de emisión</p>
                                                <span>
                                                    <p>DD-MM-AAAA</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Fecha de vencimiento</p>
                                                <span>
                                                    <p>DD-MM-AAAA</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Estado del pago</p>
                                                <span>
                                                    <button>PAGADA</button>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Fecha y concepto pago</p>
                                                <span>
                                                    <p>$ XXX.XXX,XX</p>
                                                </span>
                                            </div>

                                            <div className="DataContDataResFactura">
                                                <p>Por pagar</p>
                                                <span>
                                                    <p>$ XXX.XXX,XX</p>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="contDataResFacturaDownload">
                                            <p>Descargar</p>
                                            <div>
                                                <BsFiletypePdf className="pdfIcon" />
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