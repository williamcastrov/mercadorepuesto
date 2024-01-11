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

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const ultimaFactura = router.query.ultimaFactura ? JSON.parse(router.query.ultimaFactura) : null;

    console.log(ultimaFactura);




    const descargarPDF = () => {
        if (ultimaFactura) {
            const doc = new jsPDF();

            doc.text(`Total facturado: $${ultimaFactura.total.toLocaleString('en-US')}`, 10, 10);
            doc.text(`Precio de envío: $${ultimaFactura.precioenvio.toLocaleString('en-US')}`, 10, 20);
            // Agrega más datos aquí...

            doc.save("factura.pdf");
        } else {
            console.error("No hay datos de factura disponibles para descargar.");
        }
    };


    const descargarExcel = () => {
        if (ultimaFactura) {
            // Crear un nuevo libro de trabajo
            const wb = utils.book_new();

            // Crear una hoja de trabajo
            const ws_data = [
                ['Total facturado', 'Precio de envío'],
                [ultimaFactura.total, ultimaFactura.precioenvio]
            ];
            const ws = utils.aoa_to_sheet(ws_data);

            // Añadir la hoja de trabajo al libro de trabajo
            utils.book_append_sheet(wb, ws, "Factura");

            // Escribir el libro de trabajo en un Blob
            const wbout = writeFile(wb, 'factura.xlsx', { type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });

            // Guardar el archivo
            saveAs(blob, 'factura.xlsx');
        } else {
            console.error("No hay datos de factura disponibles para descargar.");
        }
    };


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
                                        {ultimaFactura && (
                                            <div className="ResFacturaMain">
                                                <div className="TopResFacturaMain">
                                                    <p>Facturas en curso</p>
                                                </div>
                                                <div className="DataFacturaRes">
                                                    <p>Cargos por venta</p>
                                                    <p>${ultimaFactura?.retencion?.toLocaleString('en-US')}</p>
                                                </div>

                                                <div className="DataFacturaRes">
                                                    <p>Cargos por envío</p>
                                                    <p>${ultimaFactura.precioenvio?.toLocaleString('en-US')}</p>
                                                </div>

                                                <div className="DataFacturaRes">
                                                    <p>Impuestos</p>
                                                    <p>${ultimaFactura.impuestos?.toLocaleString('en-US')}</p>
                                                </div>

                                                <div className="DataFacturaRes">
                                                    <p>Retenciones</p>
                                                    <p>${ultimaFactura.retencion?.toLocaleString('en-US')}</p>
                                                </div>

                                                <div className="TotalFactRes">
                                                    <p>Total facturado</p>
                                                    <p>${ultimaFactura.total?.toLocaleString('en-US')}</p>
                                                </div>
                                            </div>
                                        )}
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
                                    <Grid item xs={12} md={5} className="segdoContFacturacion" display={'flex'} flexDirection={'column'}>
                                        <div className="contDataResFactura">
                                            <div className="DataContDataResFactura">
                                                <p>Fecha de emisión</p>
                                                <span>
                                                    <p>ultimaFactura.fechadeventa</p>
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
                                            {ultimaFactura && (
                                                <div className="DataContDataResFactura DataContDataResFacturaTotal">
                                                    <p>Por pagar</p>
                                                    <span>
                                                        <p>${ultimaFactura.total.toLocaleString('en-US')}</p>
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="contDataResFacturaDownload">
                                            <p>Descargar</p>
                                            <div>
                                                <BsFiletypePdf onClick={descargarPDF} className="pdfIcon" />
                                                <RiFileExcel2Fill className="ExcelIcon" onClick={descargarExcel} />
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