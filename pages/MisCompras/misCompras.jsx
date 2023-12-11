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
import { URL_BD_MR } from "../../helpers/Constants";

const URL_IMAGES_RESULTS = "https://gimcloud.com.co/files/mercadorepuesto/";

export default function misCompras() {

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const router = useRouter();
    const [compras, setCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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
    //Obtener datos de mis compras

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${URL_BD_MR}81`);
                // Formatear todas las fechas antes de establecerlas en el estado, simplemente quitarle los Ceros
                const comprasFormateadas = response.data.listarcompras.map((compra) => ({
                    ...compra,
                    fechacompra: compra.fechacompra.slice(0, 10),
                    fechaentrega: compra.fechaentrega.slice(0, 10),
                    fechadespacho: compra.fechadespacho.slice(0, 10),
                    fechadepago: compra.fechadepago.slice(0, 10),

                    // Sumar preciodeventa y precioenvio y guardar en nueva propiedad
                    nuevoValor: compra.preciodeventa + compra.precioenvio,
                }));


                setCompras(comprasFormateadas);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [URL_BD_MR]);




    //PosiciónTopPage
    const irA = useRef(null);

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
                                        <p>Mis compras</p>
                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Buscar en mis compras"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f2f6',
                                                padding: '8px',
                                                marginRight: '8px',
                                                width: '90%',
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
                                    {filteredCompras.length > 0 ? (
                                        filteredCompras.map((producto) => (
                                            <Grid className="productComprado" container>
                                                <Grid key={producto.id} item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <Grid xs={5} md={6} sx={{ border: '4px solid #EBEBEB', borderRadius: '12px', height: '19rem', display: 'flex', justifyContent: 'center' }}>
                                                        <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} style={{ width: '200px', height: '180px' }} />
                                                    </Grid>

                                                    <Grid container>
                                                        <Grid item xs={12} md={9}>
                                                            <Grid sx={{ display: 'flex', paddingLeft: '2rem', flexDirection: 'column' }}>
                                                                <p style={{ fontSize: '24px', color: '#2D2E83', fontWeight: '700' }}>Estado compra</p>
                                                                <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.titulonombre}</p>
                                                                <div style={{ display: 'flex' }}>
                                                                    <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Unidades compradas:</p>
                                                                    <p style={{ marginLeft: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.cantidad}</p>
                                                                </div>
                                                                <div style={{ display: 'flex' }}>
                                                                    <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}> Número de compra:</p>
                                                                    <p style={{ marginLeft: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.numerodeaprobacion}</p>
                                                                </div>
                                                                <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.fechacompra}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3} sx={{ display: 'flex', paddingLeft: '2rem', paddingTop: '2rem', paddingRight: '2rem', justifyContent: 'flex-end', borderRight: { md: '3px solid #EBEBEB', xs: 'none' } }}>
                                                            {/* Contenido del segundo subcontenedor */}
                                                            <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '700' }}>${producto.preciodeventa}</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '1.5rem', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <p style={{ marginBottom: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.nombres} </p>
                                                        <p onClick={() => router.push({
                                                            pathname: './msjVendedor',
                                                            query: { producto: JSON.stringify(producto) }
                                                        })}
                                                            style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500', cursor:'pointer' }}>
                                                            Enviar mensaje al vendedor
                                                        </p>
                                                    </div>
                                                    <div style={{ marginTop: '3rem', width: '100%' }}>
                                                        <button
                                                            onClick={() => router.push({
                                                                pathname: './verCompra',
                                                                query: { producto: JSON.stringify(producto) }
                                                            })}
                                                            style={{ backgroundColor: '#2C2E82', borderRadius: '10px', color: 'white', fontSize: '16px', padding: '.6rem', margin: '0 auto', width: '100%' }}

                                                        >
                                                            Ver Compra
                                                        </button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <p>No se encontraron resultados</p>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
} 