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




export default function opinionesVendedor() {

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const router = useRouter();
    const irA = useRef(null);//PosiciónTopPage



    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contDataUsersVerventa" container style={{ width: isMdDown ? '100%' : '94%' }}>
                                    <Grid item xs={12} md={4} className="ContOpVendedor" >
                                        <div className='TitleOpVend'>
                                            <p>Mis opiniones como vendedor</p>
                                        </div>
                                        <div className='subTitleOpVend'>
                                            <p>Mis opiniones como vendedor</p>
                                        </div>
                                        <div className="conUserOpiVend">
                                            <div className="conUserOpiVendNombre">
                                                <p>Vendedor: Juan Pablo</p>
                                            </div>
                                            <div className="conUserOpiVendData">
                                                <p>Tiempo como vendedor: 1 día</p>
                                                <p>Numero de ventas: 16</p>
                                                <p>Medellín, Colombia</p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={7} className="maincontCalificOpinionesV">

                                        <div className="contCalificOpinionesV">
                                            <div className="PcalifV">
                                                <p>Calificación vendedor</p>
                                            </div>
                                            <div className="SubcontCalificOpinionesV">
                                                <p className="SubcontCalificOpinionesVP">5.0</p>
                                                <div className="contnumbercalifics">
                                                    <div>
                                                        x x x x x
                                                    </div>
                                                    <p>6 calificaciones</p>
                                                </div>
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