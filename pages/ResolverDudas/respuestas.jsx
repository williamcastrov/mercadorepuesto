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
import { RiSettings5Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import ModalMensajesWishListControl from "../mensajes/ModalMensajesWishListControl";
import { getLeeIra } from "../../store/leeira/action";
import { useParams } from 'react-router-dom';
import BuscarComponente from "./BuscarComponente";




export default function Respuestas() {


    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage 

    //const datos = useSelector(state => state.datos);

    const router = useRouter();
    const { id, dato } = router.query; 
    const datoParsed = dato ? JSON.parse(dato) : null;
    // Muestra los datos en la consola
    useEffect(() => {
        console.log(datoParsed);
    }, [datoParsed]);

    
    useEffect(() => {
        if (datoParsed) {
            console.log(datoParsed);
        }
    }, [datoParsed]);


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
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '18rem' }}>

                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? '100%' : '87%' }} display={'flex'} flexDirection={'column'}>
                                    <div className='TitleDinamicoDudas'>
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Resuelve tus dudas</p>
                                            </Link>
                                            <p className="VerVentaLink">{datoParsed ? datoParsed.nombreniveldos : 'Cargando...'}</p>
                                        </Breadcrumbs>
                                    </div>
                                    <div className="contMainResolverDudas">

                                        <BuscarComponente />

                                        {/*Contenedor de la info de la pregunta*/}
                                        <div className="maincontRespuestadudas">
                                            <div className="titlecontRespuestadudas">
                                                <p>¿Cómo hablar con el vendedor?</p>
                                            </div>
                                            <div className="contRespuestadudas">
                                                <div>
                                                    <p>{datoParsed ? datoParsed.descripcionniveldos : 'Cargando...'}</p>
                                                </div>
                                                <div className="imagenRespuestaDuda">
                                                    <img src="https://i.postimg.cc/kXJNxCw3/motorBMW.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        

                                        {/*Otras dudas relacionadas contenedor */}
                                        <div className="sobreComprarDudas sobreMiCuentaCont">
                                            <div className="contTitulo ">
                                                <p>Te podría interesar</p>
                                            </div>
                                            <div className="contTitulosDudas startContDudas">
                                                <p>¿Cómo devolver un producto?</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo ver el reembolso de mi dinero?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div onClick={() => router.push({ pathname: '../ResolverDudas/dudasDatos' })} className="contTitulosDudas endContDudas">
                                                <p>¿Cómo calificar un vendedor?</p>
                                                <AiOutlineRight size={27} />
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