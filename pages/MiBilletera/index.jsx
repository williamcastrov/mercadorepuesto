import Container from "../../components/layouts/Container"
import { Grid, div, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_BD_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";


export default function index() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [UidUser, setUidUser] = useState("");

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
                                        <p>Mi billetera</p>
                                    </div>
                                </Grid>
                                <div className="contMainBilletera">
                                    <div className="saldoBilletera">
                                        <div className="saldoBilleteraLeft">
                                            <h3>Saldo disponible</h3>
                                            <p>$1.929.500</p>
                                        </div>
                                        <div className="saldoBilleteraRight">
                                            <button  onClick={() => router.push({ pathname: '/MiBilletera/RetiroDinero' })}>Solicitar dinero</button>
                                        </div>
                                    </div>

                                    
                                    <div className="contMovimientos">
                                        <div className="TopcontMovimientos">
                                            <p>Movimientos</p>
                                        </div>
                                        <div className="MiddleContMovimientos">
                                            <div className="ItemContMovimientos">
                                                <div className="LeftItemContMovimientos">
                                                    <p>Concepto de pago: Pago por venta o Retiro de dinero</p>
                                                    <p>Quien lo hizo: Mercado Repuesto o el usuario vendedor</p>
                                                </div>
                                                <div className="RightItemContMovimientos">
                                                    <p>$129.000</p>
                                                </div>
                                            </div>

                                            <div className="ItemContMovimientos">
                                                <div className="LeftItemContMovimientos">
                                                    <p>Concepto de pago: Pago por venta o Retiro de dinero</p>
                                                    <p>Quien lo hizo: Mercado Repuesto o el usuario vendedor</p>
                                                </div>
                                                <div className="RightItemContMovimientos">
                                                    <p>$129.000</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="ButtonContMovimientos">
                                            <button onClick={() => router.push({ pathname: '/MiBilletera/misMovimientos' })}>Ver más</button>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}