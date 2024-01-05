import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase, Paper } from '@mui/material';
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CiSearch } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import BuscarComponente from "./BuscarComponente";




export default function index() {

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const dispatch = useDispatch();
    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState('');
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState('');
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const router = useRouter();


    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);



    //Usefect para conocer si el usuario está loggeado o no
    useEffect(() => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            setIsUserLogged(false);
        } else {
            setIsUserLogged(true);
        }
    }, [datosusuarios.uid]);

    //función para redireccionar usurio a resolver dudas cuando se loggee
    const handleButtonClick = (ruta) => {
        if (!isUserLogged) {
            dispatch(getLeeIra(12));
            localStorage.setItem("ira", JSON.stringify(12));
            let itemsresolverdudas = {
                ruta: "/ResolverDudas",
            };
            localStorage.setItem(
                "itemsresolverdudas",
                JSON.stringify(itemsresolverdudas)
            );

            setShowModalMensajesCtlr(true);
            setTituloMensajesCtlr("Dispositivos vinculados");
            let texto = "¡Bienvenido! Para ver tus dispositivos vinculados primero debes iniciar sesión o registrarte.";
            setTextoMensajesCtlr(texto);
        } else {
            router.push({ pathname: ruta });
        }
    };


    const [datosNivelUno, setDatosNivelUno] = useState([]);
    const [datosNivelDos, setDatosNivelDos] = useState([]);
    const [datosNivelTres, setDatosNivelTres] = useState([]);
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "116",
                });
                const datosNivelUno = res.data.resolverdudasdos.filter(dato => dato.niveluno === 1);
                const datosNivelDos = res.data.resolverdudasdos.filter(dato => dato.niveluno === 2);
                const datosNivelTres = res.data.resolverdudasdos.filter(dato => dato.niveluno === 3);
                setDatosNivelUno(datosNivelUno);
                setDatosNivelDos(datosNivelDos);
                setDatosNivelTres(datosNivelTres);
            } catch (error) {
                console.error("Error al leer los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatos();
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
                                    <div className='TitleOpVend'>
                                        <p>Resuelve tus dudas</p>
                                    </div>


                                    <div className="contMainResolverDudas">
                                        <BuscarComponente />

                                        <div className="sobreComprarDudas">
                                            <div className="contTitulo ">
                                                <p>Sobre comprar</p>
                                            </div>
                                            <div onClick={() => handleButtonClick('../MisCompras/misCompras')} className="contTitulosDudas startContDudas">
                                                <p>Ir a mis compras</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>


                                            {datosNivelUno.slice(0, 2).map(dato => (
                                                <div className="contTitulosDudas" onClick={() => router.push({
                                                    pathname: `../ResolverDudas/respuestas`,
                                                    query: { dato: JSON.stringify(dato) }
                                                })}>
                                                    <p>{dato.nombreniveldos}</p>
                                                    <AiOutlineRight size={27} />
                                                </div>
                                            ))}


                                            <div onClick={() => router.push({ pathname: '../ResolverDudas/dudasCompras' })} className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>


                                        <div className="sobreComprarDudas SobreVenderCont">
                                            <div className="contTitulo">
                                                <p>Sobre vender</p>
                                            </div>
                                            <div onClick={() => handleButtonClick('../MisVentas/misVentas')} className="contTitulosDudas startContDudas">
                                                <p>Ir a mis ventas</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>

                                            {datosNivelDos.slice(0, 2).map(dato => (
                                                <div className="contTitulosDudas" onClick={() => router.push({
                                                    pathname: `../ResolverDudas/respuestas`,
                                                    query: { dato: JSON.stringify(dato) }
                                                })}>
                                                    <p>{dato.nombreniveldos}</p>
                                                    <AiOutlineRight size={27} />
                                                </div>
                                            ))}

                                            <div onClick={() => router.push({ pathname: '../ResolverDudas/dudasVentas' })} className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>


                                        <div className="sobreComprarDudas sobreMiCuentaCont">
                                            <div className="contTitulo ">
                                                <p>Sobre mi cuenta</p>
                                            </div>
                                            <div className="contTitulosDudas startContDudas" onClick={() => handleButtonClick('../EditUsers/MisDatos')}>
                                                <p>Ir a mis datos</p>
                                                <AiOutlineRight size={27} style={{ cursor: 'pointer' }} />
                                            </div>

                                            {datosNivelTres.slice(0, 2).map(dato => (
                                                <div className="contTitulosDudas" onClick={() => router.push({
                                                    pathname: `../ResolverDudas/respuestas`,
                                                    query: { dato: JSON.stringify(dato) }
                                                })}>
                                                    <p>{dato.nombreniveldos}</p>
                                                    <AiOutlineRight size={27} />
                                                </div>
                                            ))}

                                            <div onClick={() => router.push({ pathname: '../ResolverDudas/dudasDatos' })} className="contTitulosDudas endContDudas">
                                                <p>Ver más opciones</p>
                                                <AiOutlineRight size={27} />
                                            </div>
                                        </div>


                                    </div>


                                </Grid>
                                <ModalMensajesWishListControl
                                    shown={showModalMensajesCtlr}
                                    close={() => { }}
                                    titulo={tituloMensajesCtlr}
                                    mensaje={textoMensajesCtlr}
                                    backdrop="static"
                                    keyboard={false}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}