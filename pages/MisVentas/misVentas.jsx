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






export default function misVentas() {

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
    const [ventas, setVentas] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [mapaEstados, setMapaEstados] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [compras, setCompras] = useState([]);
    const palabrasBusqueda = busqueda.toLowerCase().split(' ');


    // Primero, hacemos la solicitud para obtener los estados
    useEffect(() => {
        const obtenerEstados = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "158",
                });

                if (res.data && res.data.listarestados) {
                    // Creamos un mapa de estados
                    const mapaEstados = {};
                    res.data.listarestados.forEach(estado => {
                        mapaEstados[estado.tipodeestado] = estado.nombre;
                    });

                    // Guardamos el mapa de estados en el estado de React
                    setMapaEstados(mapaEstados);
                } else {
                    console.error("Error: res.data o res.data.listarestados es undefined");
                }
            } catch (error) {
                console.error("Error al obtener los estados", error);
            }
        };

        obtenerEstados();
    }, []);

 

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid)
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [datosusuarios]);



    //Obtenngo las ventas del usuario y mapeo tambien el producto, y tambien el usuario comprador
    useEffect(() => {
        const obtenerVentasUsuario = async () => {
            let params = {
                uidvendedor: UidUser,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "106",
                    params,
                });
                if (res.data && res.data.listarmisventas) {
                    const ventas = await Promise.all(
                        res.data.listarmisventas.map(async (venta) => {
                            // Obtén los detalles del producto
                            const detallesProducto = await obtenerNombreProducto(venta.idproducto);
                            // Obtén los detalles del comprador
                            const detallesComprador = await obtenerDetallesComprador(venta.uidcomprador);
                            const formattedSalePrice = detallesProducto.salePrice.toLocaleString();
                            const total = venta.cantidad * venta.preciodeventa - venta.retencion - venta.impuestos + venta.precioenvio;

                            return {
                                ...venta,
                                estadodeldespacho: mapaEstados[venta.estadodeldespacho],  
                                estadodelaventa: mapaEstados[venta.estadodelaventa],
                                fechadeventa1: venta.fechacompra ? venta.fechacompra.slice(0, 10) : null,
                                fechadeventa: venta.fechacompra ? venta.fechacompra.slice(0, 10) : null,
                                fechaentrega: venta.fechaentrega ? venta.fechaentrega.slice(0, 10) : null,
                                fechadespacho: venta.fechadespacho ? venta.fechadespacho.slice(0, 10) : null,
                                fechadevolucion: venta.fechadevolucion ? venta.fechadevolucion.slice(0, 10) : null,
                                fechadepago: venta.fechadepago ? venta.fechadepago.slice(0, 10) : null,
                                nuevoValor: venta.preciodeventa + venta.precioenvio,
                                nombreProducto: detallesProducto.nombreProducto,
                                salePrice: formattedSalePrice,
                                idPrdoductRuta: detallesProducto.idPrdoductRuta,
                                nombreImagen: detallesProducto.nombreImagen,
                                nombreUsuario: detallesProducto.usuario,
                                nombreComprador: detallesComprador.primernombre,
                                apellidoComprador: detallesComprador.primerapellido,
                                total
                            };
                        })
                    );
                    setVentas(ventas);
                    console.log("Mis ventas:", ventas)
                } else {
                    console.error("Error: res.data o res.data.listarvtasusuariovende es undefined");
                }
            } catch (error) {
                console.error("Error al leer las ventas:", error);
            }
        };
        if (UidUser) {
            obtenerVentasUsuario();
        }
    }, [UidUser, mapaEstados]);

    //función para obtener datos del producto
    async function obtenerNombreProducto(idproducto) {
        let params = {
            idarticulo: idproducto,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });
            const idPrdoductRuta = res.data[0].id;
            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista
            const usuario = res.data[0].usuario;

            return { nombreProducto, salePrice, nombreImagen, usuario, idPrdoductRuta };

        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    const obtenerDetallesComprador = async (uidcomprador) => {
        let params = {
            uid: uidcomprador,
        };
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });
            return res.data[0]; // Asegúrate de que esto devuelve el objeto de usuario correcto
        } catch (error) {
            console.error("Error al leer los datos del comprador", error);
        }
    }; 

    // Programación de dropdown de mis ventas actual
    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena las ventas según la opción seleccionada
        if (eventKey === "Más antiguo") {
            setVentas([...ventas].sort((a, b) => new Date(a.fechadeventa1) - new Date(b.fechadeventa1)));
        } else if (eventKey === "Más reciente") {
            setVentas([...ventas].sort((a, b) => new Date(b.fechadeventa1) - new Date(a.fechadeventa1)));
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

    const handleChange = (event) => {
        setBusqueda(event.target.value);
    }

    const ventasFiltradas = ventas.filter(venta =>
        venta.nombreProducto && palabrasBusqueda.every(palabra =>
            venta.nombreProducto.toLowerCase().includes(palabra)
        )
    );


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
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '87%' }}>
                                    <div className='titlesformsUsers'>
                                        <p>Mis ventas</p>
                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '87%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            value={busqueda}
                                            onChange={handleChange}
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

                                <Grid className="contProdcOMPR" container style={{ width: isMdDown ? '100%' : '87%', marginTop: '2rem' }}>

                                    {ventasFiltradas.length > 0 ? (
                                        ventasFiltradas.map((venta, index) => (
                                            <Grid key={index} className="productComprado" container>
                                                <Grid item xs={12} md={9} className="productCompradoSubCont" >
                                                    <Grid xs={5} md={6} className="contImgMisCompras">
                                                        <img src={`${URL_IMAGES_RESULTS}${venta.nombreImagen}`} onClick={() => router.push(`/product/${venta.idPrdoductRuta}`)} />
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid item xs={12} md={9}>
                                                            <Grid className="subContMiscompras">
                                                                <p className="estadoCompra">{venta.estadodeldespacho}</p>
                                                                <p className="nombreProductMiCompra" onClick={() => router.push(`/product/${venta.idPrdoductRuta}`)}>{venta.nombreProducto}</p>
                                                                <div className="divCantCompradas">
                                                                    <p className="UnidCompradas">Unidades vendidas:</p>
                                                                    <p className="numeroUnidsCompradas">{venta.cantidad}</p>
                                                                </div>
                                                                <div className="divNcompra">
                                                                    <p className="UnidCompradas"> Número de venta:</p>
                                                                    <p className="numeroUnidsCompradas">{venta.numerodeaprobacion}</p>
                                                                </div>
                                                                <p className="dateCompra">{venta.fechadeventa}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3} className="precioProductMisCompras">
                                                            {venta.preciodeventa !== null && (
                                                                <p>${venta.preciodeventa.toLocaleString('en-US')}</p>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3} className="ContRightMisCompras">
                                                    <div className="SendMsjVendandName">
                                                        <p className="nameVendedorMiCompra">{venta.nombreComprador} {venta.apellidoComprador} </p>
                                                    </div>
                                                    <div className="SendMsjVendandName">
                                                        <p className="nameVendedorMiCompra">Tienes x mensajes sin leer</p>
                                                    </div>
                                                    <div className="SendMsjVendandName">
                                                        <p className="nameVendedorMiCompra nameVendedorMiCompra2">Enviar mensaje al comprador</p>
                                                    </div>
                                                    <div className="divButtonVercompra2">
                                                        <button onClick={() => router.push({
                                                            pathname: './verVenta',
                                                            query: { venta: JSON.stringify(venta) }
                                                        })}
                                                        >
                                                            Ver venta
                                                        </button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <p>Ups, aún no tienes ventas!</p>
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