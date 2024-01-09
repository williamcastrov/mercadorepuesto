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



export default function misFacturas() {

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

                                        <p>BUscar</p>
                                    </div>

                                    <div className="dataMainFacturas">

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