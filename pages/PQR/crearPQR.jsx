import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme } from "@mui/material";
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
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { TextField } from '@mui/material';
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";


export default function crearPQR() {
    const irA = useRef(null); //PosiciónTopPage
    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const [isOpen, setIsOpen] = useState(true);
    const [text, setText] = useState('Para nosotros es muy importante tus preguntas, quejas, reclamos o felicitaciones. Para poder gestionarlos de la mejor manera, te invitamos a completar la siguiente información:');


    const handleClick = () => {
        setIsOpen(false);
        setText('Describe tu solicitud:');
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

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
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>
                                    <div className="TopBuscarPQR">
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb" className="linkMisvResF">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Ayuda / PQRS</p>
                                            </Link>
                                            <p className="VerVentaLink">Crear solicitud</p>
                                        </Breadcrumbs>
                                        <p className="SubtitleBuscar">{text}</p>
                                    </div>

                                    {isOpen && (
                                        <Grid container spacing={6} className="MainFormCrearPQR">
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Nombres</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Tipo de documento</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Correo electrónico</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Ciudad</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Barrio</p>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Apellidos</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Numero de documento</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Numero de contacto</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Dirección</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Motivo</p>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <div className="ButtomFormCrearPQR">
                                                <div className="acepptCond">
                                                    <div>

                                                    </div>
                                                    <p>Acepto el tratamiento de mis datos personales</p>
                                                </div>
                                                <div className="SigPQR">
                                                    <button onClick={handleClick}>Siguiente</button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}

                                    {!isOpen && (
                                        <Grid container className="MainFormCrearPQR">
                                            <div className="ContCrearSolMain">
                                                <div className="DescrAsunto">
                                                    <p>Asunto</p>
                                                    <input type="text" />
                                                </div>

                                                <div className="DescripSoli">
                                                    <p>Descripción</p>
                                                    <textarea />

                                                </div>

                                                <div className="AdjArchSoli">
                                                    <div className="AdjArchSoliTitle">
                                                        <p>Adjuntar archivos</p>
                                                    </div>

                                                    <div className="AdjArchSoliIcons">
                                                        <div className="SubAdjArchSoliIcons">
                                                            <div><HiOutlineDocumentArrowUp /></div>
                                                            <div><HiOutlineDocumentArrowUp /></div>
                                                            <div><HiOutlineDocumentArrowUp /></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="EnviarPeticionPQR">
                                                    <button>Enviar</button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}



                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
