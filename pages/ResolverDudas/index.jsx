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
import { useSelector } from "react-redux";
import moment from 'moment';


export default function index() {

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage


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

                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? '100%' : '87%' }}>
                                    <div className='TitleOpVend'>
                                        <p>Resuelve tus dudas</p>
                                    </div>
                                    <div className="contResDudasInputdiv">
                                        <InputBase
                                            placeholder="Buscar en mis ventas"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f2f6',
                                                padding: '8px',
                                                marginRight: '8px',
                                                width: '100%',
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
                                    </div>

                                    <div className="contMainResolverDudas">
                                        <div className="sobreComprarDudas">
                                            <div className="contTitulo ">
                                                <p>Sobre comprar</p>
                                            </div>
                                            <div className="contTitulosDudas startContDudas">
                                                <p>Ir a mis compras</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo hacer seguimiento a mi compra?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo hablar con el vendedor?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>


                                        <div className="sobreComprarDudas SobreVenderCont">
                                            <div className="contTitulo">
                                                <p>Sobre vender</p>
                                            </div>
                                            <div className="contTitulosDudas startContDudas">
                                                <p>Ir a mis ventas</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo enviar mi primera venta?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo realizar una devoluvión?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>


                                        <div className="sobreComprarDudas sobreMiCuentaCont">
                                            <div className="contTitulo ">
                                                <p>Sobre mi cuenta</p>
                                            </div>
                                            <div className="contTitulosDudas startContDudas">
                                                <p>Ir a mis datos</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo editar mis datos personales?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div className="contTitulosDudas">
                                                <p>¿Cómo cambiar mi cuenta a persona juridica?</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                            <div className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
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