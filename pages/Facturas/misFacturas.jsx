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


export default function misFacturas() {

    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [selectedSortOption, setSelectedSortOption] = useState(null);


    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //Seleccionar funcion por mas antiguo o mas nuevo
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setCalificaciones(prevCalificaciones =>
                [...prevCalificaciones].sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion))
            );
        } else if (eventKey === "Más reciente") {
            setCalificaciones(prevCalificaciones =>
                [...prevCalificaciones].sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion))
            );
        } else if (eventKey === "Mayor precio") {
            setCalificaciones(prevCalificaciones =>
                [...prevCalificaciones].sort((a, b) => b.calificacion - a.calificacion)
            );
        } else if (eventKey === "Menor precio") {
            setCalificaciones(prevCalificaciones =>
                [...prevCalificaciones].sort((a, b) => a.calificacion - b.calificacion)
            );
        }
    };

    //Button de dropdown
    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMisFacturas"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));


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
                                        <p>Mis facturas</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainMisFacturas" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className="contTopMisFacturas">
                                        <InputBase
                                            placeholder="Buscar por número de factura"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f2f6',
                                                padding: '8px',
                                                width: '410px',
                                                height: '44px',
                                                padding: '10px',
                                                fontSize: '16px',
                                                paddingLeft: '3rem',
                                                color: '#2C2E82',
                                                fontWeight: '500',
                                                '&::placeholder': {
                                                    color: '#3E4089',
                                                    fontWeight: '600',
                                                },
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                                                </InputAdornment>
                                            }
                                        />

                                        <Dropdown onSelect={handleSelect} className="dropFactura">
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsVendedor">
                                                <Dropdown.Item
                                                    eventKey="Más antiguo"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Más antiguo
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Más reciente"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Más reciente
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Mayor precio"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Mayor precio
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Menor precio"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Menor precio
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="dataMainFacturas">
                                        <div className="topDataMainFacturas">
                                            <p>Fecha de emisión</p>
                                            <p>Concepto de facturación</p>
                                            <p>Número de factura</p>
                                            <p>Total facturado</p>
                                            <p>Descargar</p>
                                        </div>

                                        <div className="MapDataMainFacturas">
                                            <div className="MapDataMainFacturasDate">
                                                <p>DD-MM-AAAA</p>
                                            </div>
                                            <div className="MapDataMainFacturasConcept">
                                                <p>Servicios Mercado Repuesto</p>
                                            </div>
                                            <div className="MapDataMainFacturasNumber">
                                                <p>ABC - 1234</p>
                                            </div>
                                            <div className="MapDataMainFacturasTotal">
                                                <p>$ XXX.XXX,XX</p>
                                            </div>
                                            <div className="MapDataMainFacturasDownload">
                                                <RiFileExcel2Fill className="ExcelIcon" />
                                                <BsFiletypePdf className="pdfIcon" />
                                            </div>

                                        </div>
                                    </div>
                                </Grid>


                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}