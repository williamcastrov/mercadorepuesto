import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import { useRouter } from "next/router";
import { TbSearch } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";



export default function buscarPQR() {

    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    const [datosusuarios, setDatosUsuarios] = useState([]);
    const [id, setId] = useState('');
    const [identificacion, setIdentificacion] = useState('');

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

    const buscarPQR = () => {
        const pqrEncontrado = datosusuarios.find(pqr => pqr.id.toString() === id && pqr.identificacion === identificacion);
        if (pqrEncontrado) {
            router.push(`./verPQR?id=${pqrEncontrado.id}`);
        } else {
            alert('No se encontró un PQR para esa combinación de números.');
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
                                                <input type="text" />
                                                 
                                            </div>

                                            <div>
                                                <p>Número de solicitud</p>
                                                <input type="text" />
                                            </div>
                                        </div>

                                        <div className="sendBuscarPQR">
                                            <button >Buscar</button>
                                        </div>
                                    </div>

                                    <div>
                                        <TextField label="ID" value={id} onChange={e => setId(e.target.value)} />
                                        <TextField label="Identificación" value={identificacion} onChange={e => setIdentificacion(e.target.value)} />
                                        <button onClick={buscarPQR}>Buscar</button>
                                    </div>

                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
