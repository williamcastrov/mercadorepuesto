import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import ModalMensajes from "../mensajes/ModalMensajes";
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import { useRouter } from "next/router";



export default function buscarPQR() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [datosusuarios, setDatosUsuarios] = useState([]);
    const [id, setId] = useState('');
    const [identificacion, setIdentificacion] = useState('');

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    //función para obtener datos de usuarios de PQR
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}152`,
                });
                setDatosUsuarios(res.data.listarpqr);
            } catch (error) {
                console.error("Error al leer las transacciones del vendedor", error);
            }
        };
        obtenerDatos();
    }, []);


    //Función para buscar pqr y verificar si hay algún campo vacio
    const buscarPQR = () => {
        if (id && identificacion) {
            const pqrEncontrado = datosusuarios.find(pqr => pqr.id.toString() === id && pqr.identificacion === identificacion);
            if (pqrEncontrado) {
                router.push(`./verPQR?id=${pqrEncontrado.id}`);
            } else {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('No se encontró un PQR para esa combinación de datos.');
                setShowModal(true);
            }
        } else {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Debes llenar todos los campos para buscar.');
            setShowModal(true);
        }
    };

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>
                                    <div className="TopBuscarPQR">
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Ayuda / PQRS</p>
                                            </Link>
                                            <p className="VerVentaLink">Buscar solicitud</p>
                                        </Breadcrumbs>
                                        <p className="SubtitleBuscar">Buscar solicitud</p>
                                    </div>

                                    <div className="MainmiddleAyudaPQR">

                                        <div className="inputsPQR">
                                            <div>
                                                <p>Número de identificación</p>
                                                <input type="text" value={identificacion} onChange={e => setIdentificacion(e.target.value)} onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />

                                            </div>

                                            <div>
                                                <p>Número de solicitud</p>
                                                <input type="text" value={id} onChange={e => setId(e.target.value)} onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            </div>
                                        </div>

                                        <div className="sendBuscarPQR">
                                            <button onClick={buscarPQR}>Buscar</button>
                                        </div>
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
    );
}
