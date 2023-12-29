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

export default function verVenta() {


    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [selectedFile, setSelectedFile] = useState();
    const fileInput = useRef(null);
    // Agrega "application/pdf" a la lista de tipos de archivos permitidos
    const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxImageSize = 819200; // 800 KB en bytes
    const maxImageWidth = 1024;
    const maxImageHeight = 1024;
    const [showModal2, setShowModal2] = useState(false);
    const [buttonText, setButtonText] = useState("Adjuntar factura");




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



    //cerrar modal si no hay nada en el input
    const handleModalClose = () => {
        setShowModal(false);
    };




    const changeHandler = async (event) => {
        const file = event.target.files[0];

        if (file) {
            let maxSize = maxImageSize; // 800 KB para imágenes

            // Permitir hasta 1 MB para archivos PDF
            if (file.type === "application/pdf") {
                maxSize = 1048576; // 1 MB en bytes
            }

            if (file.size > maxSize) {
                setShowModal(true);
                setTituloMensajes("Tamaño incorrecto");
                setTextoMensajes(file.type === "application/pdf" ? "Los archivos PDF deben pesar máximo 1 MB." : "Las imágenes deben pesar máximo 800 KB.");
                return;
            }

            if (file.type !== "application/pdf") {
                const image = new Image();
                image.src = URL.createObjectURL(file);

                // Esperar a que la imagen cargue antes de realizar las validaciones
                await new Promise((resolve) => {
                    image.onload = resolve;
                });

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }
            }

            setSelectedFile(URL.createObjectURL(file));
            setButtonText("Enviar factura");
        } else {
            setShowModal(true);
            setTituloMensajes("Archivo incorrecto");
            setTextoMensajes("Solo se permiten archivos JPG, JPEG, PNG y PDF.");
        }

        // Restablecer el valor del campo de entrada del archivo
        event.target.value = null;
    };



    const handleClick = () => {
        if (buttonText === "Enviar factura") {
            // Muestra el modal de confirmación
            setShowModal2(true);
        } else {
            // Abre el diálogo de selección de archivos
            fileInput.current.click();
        }
    };


    const handleRemoveFile = () => {
        // Elimina la imagen y restablece el texto del botón
        setSelectedFile(null);
        setButtonText("Adjuntar factura");

        // Restablecer el valor del campo de entrada del archivo para permitir la selección del mismo archivo
        fileInput.current.value = null;
    };


    //Función para confirmar eliminación de imagen
    const confirmarEliminacion = () => {
        // Muestra el modal de éxito
        setShowModal(true);
        setTituloMensajes("Factura enviada");
        setTextoMensajes("La factura ha sido enviada exitosamente.");

        // Restablece el archivo seleccionado y el texto del botón
        setSelectedFile(null);
        setButtonText("Adjuntar factura");

        // Cierra el modal de confirmación
        setShowModal2(false);
    };



    return (
        <>
            <div ref={irA}>
                {venta ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container" >
                                <div className="ps-page__header" > </div>
                                <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginBottom: '4rem' }}>
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./misVentas') }}

                                            >
                                                <p className="VerVentaLink">Mis ventas</p>
                                            </Link>
                                            <p className="VerVentaLink">Ver venta</p>
                                        </Breadcrumbs>

                                    </Grid>
                                    <Grid className="contDataUsersVerventa" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                        <Grid item xs={12} md={7} className="misVentasr" >
                                            <div >
                                                <p style={{ fontSize: '24px', color: '#2D2E83', fontWeight: '700' }}>{venta.estadodeldespacho} </p>
                                            </div>
                                            <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                                <p>{venta.nombreProducto} </p>
                                            </div>
                                            <div className="subtitlesvercompra" style={{ display: 'flex' }}>
                                                <p>Número de venta:</p>
                                                <p>{venta.numerodeventa}</p>
                                            </div>
                                            <div className="subtitlesvercompra">
                                                <p>Fecha de venta:</p>
                                                <p>{venta.fechadeventa}</p>
                                            </div>

                                            <div className="DetalleSEnvioVerVenta">
                                                <div className="detallesypagovercompra2">
                                                    <p>Detalles del envío</p>
                                                </div>
                                                <div className="subtitlesverVenta">
                                                    <p>Despacha el paquete en los puntos TCC autorizados</p>
                                                    <div className="divButtonVerVenta">
                                                        <button>
                                                            Imprimir etiqueta
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
                                                        <p className="nameVerV2">${venta.total}</p>
                                                    </div>
                                                </div>
                                                <div className="etiquetaContDetails">
                                                    <p className="etiquetaContDetailsTitle">Datos del envío</p>
                                                    <p>{venta.estadodeldespacho}</p>
                                                    <p>{venta.direcciondeenvio}</p>
                                                </div>
                                            </div>

                                            <div className="DetalleSEnvioVerVenta">
                                                <div className="detallesypagovercompra2">
                                                    <p>Facturación</p>
                                                </div>
                                                <div className="subtitlesverVenta">
                                                    <div className="divButtonAdjFact">
                                                        <div className="divButtonVerVenta2">
                                                            <button className="buttnVerVenta" onClick={handleClick}>
                                                                {buttonText}
                                                                <input type="file" accept=".pdf,.png,.jpeg,.jpg" onChange={changeHandler} style={{ display: 'none' }} ref={fileInput} />
                                                            </button>
                                                            {selectedFile && (
                                                                <div className="verVentaDoc">
                                                                    <div className="diviconSquareVerventa">
                                                                        <PiSquareThin size={138} className="iconSquareVerventa" />
                                                                        <img src={selectedFile} alt="preview" className="imgVerVenta" />
                                                                    </div>
                                                                    <div className="diviconCloeseDoc" onClick={handleRemoveFile}>
                                                                        <IoMdClose className="iconCloseVerVenta" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ paddingLeft: '4rem' }}>
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
                                                    {venta.preciodeventa !== null && (
                                                        <p>${venta.preciodeventa.toLocaleString()}</p>
                                                    )}
                                                </div>
                                                <div className="subtitlesveVenta1">
                                                    <p>Precio del envío:</p> 
                                                    {venta.preciodelenvio !== null && (
                                                        <p>${venta.preciodelenvio.toLocaleString()}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Retención:</p> 
                                                    {venta.retencion !== null && (
                                                        <p>${venta.retencion.toLocaleString()}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="misVentasRigt2">
                                                <div className="subtitlesveVenta1">
                                                    <p>Impuestos:</p>  
                                                    {venta.impuestos !== null && (
                                                        <p>${venta.impuestos.toLocaleString()}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="misVentasRigt3">
                                                <div className="subtitlesveVenta1">
                                                    <p>Total:</p>
                                                    <p>${venta.total}</p>
                                                </div>
                                            </div>

                                            <div className="subtitlesvercompra iconVerVenta2">
                                                <IoIosInformationCircle className="iconVerVenta" size={29} />
                                                <p>Este dinero estará disponible en 2 días</p>
                                            </div>

                                        </Grid>
                                    </Grid>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '4rem' }}>

                                        <Grid className="ContPsubtitlesvercompra" item xs={12} md={7}>

                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ paddingLeft: '4rem' }}>
                                            <div className="datacomprVerVenta">
                                                <p className="nameVendVer">{venta.nombreComprador} {venta.apellidoComprador}</p>
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
                                    <ModalMensajes
                                        shown={showModal}
                                        close={handleModalClose}
                                        titulo={tituloMensajes}
                                        mensaje={textoMensajes}
                                        tipo="error"
                                    />
                                    <ModalMensajesEliminar
                                        shown={showModal2}
                                        setContinuarEliminar={confirmarEliminacion}
                                        setAbandonarEliminar={() => setShowModal2(false)}
                                        titulo="Confirmar envío"
                                        mensaje="¿Estás seguro de que quieres enviar esta factura?"
                                        tipo="confirmación"
                                        buttonText="Enviar" // Aquí pasas el texto del botón
                                    />
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