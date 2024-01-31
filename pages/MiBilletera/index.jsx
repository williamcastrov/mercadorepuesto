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

    // Estado de cuenta
    const [estadoCuenta, setEstadoCuenta] = useState(null);

    useEffect(() => {
        const EstadoCuentaUsuario = async () => {
            try {
                const res = await axios.post(`${URL_BD_MR}145`);
                const datosUsuario = res.data.listestadodecta.find(usuario => usuario.usuario === datosusuarios.uid);
                setEstadoCuenta(datosUsuario);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
            }
        };
        EstadoCuentaUsuario();
    }, [datosusuarios]);

    // Movimientos del usuario
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        const ListarMovimientosUsuario = async () => {
            let params = {
                uidvendedor: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}149`,
                    params,
                });
                const datosUsuario = res.data.listestadodecta.filter(usuario => usuario.usuario === datosusuarios.uid);
                setMovimientos(datosUsuario);
            } catch (error) {
                console.error("Error al leer las transacciones del vendedor", error);
            }
        };
        ListarMovimientosUsuario();
    }, [datosusuarios]);


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
                                            {estadoCuenta ? (
                                                <p>${estadoCuenta.saldofinal.toLocaleString('en-US')}</p>
                                            ) : (
                                                <p>Ups! aún no has vendido tu primer producto.</p>
                                            )}
                                        </div>
                                        <div className="saldoBilleteraRight">
                                            <button onClick={() => router.push({ pathname: '/MiBilletera/RetiroDinero' })}>Solicitar dinero</button>
                                        </div>
                                    </div>



                                    <div className="contMovimientos">
                                        <div className="TopcontMovimientos">
                                            <p>Movimientos</p>
                                        </div>

                                        {movimientos.length > 0 ? (
                                            movimientos
                                                .sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion))
                                                .slice(0, 2)
                                                .map((movimiento, index) => (
                                                    <div className="MiddleContMovimientos" key={index}>
                                                        <div className="ItemContMovimientos">
                                                            <div className="LeftItemContMovimientos">
                                                                <p>{movimiento.nombre}</p>
                                                            </div>
                                                            <div className="RightItemContMovimientos">
                                                                <p>{movimiento.valor.toLocaleString('en-US')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>Aún no tienes movimientos.</p>
                                        )}
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