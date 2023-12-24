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






export default function index() {

    //NextRouter
    const router = useRouter();
    //Obtener mis datos de mis ventas
    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("DAT USER MIS COMPRAS : ", datosusuarios);
    //Medidas contenedor
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    //PosiciónTopPage
    const irA = useRef(null);


    //Programación de dropdown de mis ventas actual
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

    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [compras, setCompras] = useState([]);
    const filteredCompras = compras.filter((producto) =>
        producto && producto.nombreProducto && producto.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [searchTerm, setSearchTerm] = useState("");
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
                                        <p>Mis ventas</p>
                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Buscar en mis ventas"
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


                                    <Grid className="productComprado" container>
                                        <Grid item xs={12} md={9} className="productCompradoSubCont" >
                                            <Grid xs={5} md={6} className="contImgMisCompras">
                                                <img src={`https://i.postimg.cc/KYLj49Kp/4.png`} />
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12} md={9}>
                                                    <Grid className="subContMiscompras">
                                                        <p className="estadoCompra">Entregado</p>
                                                        <p className="nombreProductMiCompra">Rines para mazda 2006</p>
                                                        <div className="divCantCompradas">
                                                            <p className="UnidCompradas">Unidades vendidas:</p>
                                                            <p className="numeroUnidsCompradas">4</p>
                                                        </div>
                                                        <div className="divNcompra">
                                                            <p className="UnidCompradas"> Número de venta:</p>
                                                            <p className="numeroUnidsCompradas">122211</p>
                                                        </div>
                                                        <p className="dateCompra">2023-12-23</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3} className="precioProductMisCompras">
                                                    <p>$20,000</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={3} className="ContRightMisCompras">
                                            <div className="SendMsjVendandName">
                                                <p className="nameVendedorMiCompra">Juan Pablo Rojas Tabares</p> 
                                            </div>
                                            <div className="SendMsjVendandName">
                                                <p className="nameVendedorMiCompra">Tienes x mensajes sin leer</p>
                                            </div>
                                            <div className="SendMsjVendandName">
                                                <p className="nameVendedorMiCompra">Enviar mensaje al comprador</p>
                                            </div>
                                            <div className="divButtonVercompra2">
                                                <button
                                                >
                                                    Ver venta
                                                </button>
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