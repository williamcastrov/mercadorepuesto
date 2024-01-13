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





export default function modifDudaVendedor() {


    const [dudaVendedor, setDudaVendedor] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal


    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);



    //funcion para obtener duda del vendedor
    useEffect(() => {
        const dudasVendedor = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "126",
                });
                console.log(res.data);
                setDudaVendedor(res.data);
                if (res.data.listaresoldudasvende.length > 0) {
                    setNombre(res.data.listaresoldudasvende[0].nombre);
                    setDescripcion(res.data.listaresoldudasvende[0].descripcion);
                }
            } catch (error) {
                console.error("Error al leer los datos", error);
            }
        };
        dudasVendedor();
    }, []);

    const actualizarDatos = async () => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "127",
                params: {
                    id: dudaVendedor.listaresoldudasvende[0].id,
                    nombre,
                    descripcion,
                },
            });
            console.log(res.data);
            setTituloMensajes('Datos guardados');
            setTextoMensajes('Los datos se han guardado correctamente.');
            setShowModal(true);
        } catch (error) {
            console.error("Error al actualizar los datos", error);
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
                                        <p>Modificar duda vendedor</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainFacturacion" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className="modifDudaVendedorContainer">
                                        <input className="InputFormsUsers" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                        <button onClick={actualizarDatos}>Guardar</button>
                                    </div>
                                </Grid>
                                <ModalMensajes
                                    shown={showModal}
                                    close={handleModalClose}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}