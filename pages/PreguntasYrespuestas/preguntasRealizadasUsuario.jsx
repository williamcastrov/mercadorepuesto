import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router"; 
import { useNavigate } from "react-router-dom";
import { Router } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoMdReturnRight } from "react-icons/io";



export default function preguntasRealizadasUsuario() {



    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    //PosiciónTopPage
    const irA = useRef(null);


    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [compras, setCompras] = useState([]);
    const filteredCompras = compras.filter((producto) =>
        producto.titulonombre.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena los productos según la opción seleccionada
        if (eventKey === "Más antiguo") {
            setCompras([...compras].sort((a, b) => new Date(a.fechacompra) - new Date(b.fechacompra)));
        } else if (eventKey === "Más reciente") {
            setCompras([...compras].sort((a, b) => new Date(b.fechacompra) - new Date(a.fechacompra)));
        }
    };



    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMiscomprasPersButton"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));












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
                            <div className="ps-page__content ps-account">
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='titlesformsUsers'>
                                        <p>Preguntas sobre mis productos</p>
                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            className="inputSearchJP"
                                            placeholder="Buscar en mis preguntas"
                                            sx={{
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
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Dropdown style={{ width: '40%' }} onSelect={handleSelect}>
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                                <Dropdown.Item
                                                    eventKey="Más antiguo"
                                                    className="itemsdropdownTdocPersona"
                                                >
                                                    Más antiguo
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Más reciente"
                                                    className="itemsdropdownTdocPersona"
                                                >
                                                    Más reciente
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid>
                                </Grid>

                                <Grid className="contProdcOMPR" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '2rem' }}>
                                    {/* Mostrar productos */}

                                    <Grid className="contPregResps" container style={{ width: '100%' }}>
                                        <Grid item xs={12} md={6} className="subContTopPreguntas">
                                            <img src="https://i.postimg.cc/1RFg7bHj/imagen-Prueba-Code.png" alt="" />
                                            <p className="pNameProductPregRespsts">Rines para moto</p>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="subContTopPreguntas subContTopPreguntas2">
                                            <p>
                                                $323232
                                            </p>
                                            <button className='ComprarButton'>Comprar</button>
                                        </Grid>


                                        <Grid item xs={12} md={6} className="subContEstadoMensaje">
                                            <div className="pregsRespstMSJ">
                                                <p>Pregunta realizada</p>
                                                <div className="RespuestaVendedorsubCont">
                                                    <IoMdReturnRight className="returnIcon" />
                                                    <p>Respuesta...</p>
                                                </div>
                                            </div>
                                            <div className="verMasResps">
                                                <p>Ver más...</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="subContEstadoMensaje">
                                            <p>2023-11-23</p>
                                            <div className="buttonsPrgsUsers">
                                                <button className='ComprarButton'>Hacer otra pregunta</button>
                                                <button className='EliminarPreguntaButton'>Eliminar pregunta</button>
                                            </div>
                                        </Grid>
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