import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase, Input, Button } from '@mui/material';
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



export default function misCompras() {



    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("DAT USER MIS COMPRAS : ", datosusuarios);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const router = useRouter();
    const [compras, setCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //PosiciónTopPage
    const irA = useRef(null);
    const [detallesProducto, setDetallesProducto] = useState(null);



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
        const leerDirecciones = async () => {
            let params = {
                uidcomprador: UidUser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "103",
                params,
            })
                .then(async (res) => {
                    if (res.data && res.data.listarmiscompras) {
                        const direcciones = await Promise.all(
                            res.data.listarmiscompras.map(async (direccion) => {
                                // Obtén los detalles del producto
                                const detallesProducto = await obtenerNombreProducto(direccion.idproducto);
                                setDetallesProducto(detallesProducto);

                                // Obtén el nombre del vendedor
                                const detallesVendedor = await obtenerNombreVendedor(detallesProducto.usuario);

                                return {
                                    ...direccion,
                                    fechacompra: direccion.fechacompra.slice(0, 10),
                                    fechaentrega: direccion.fechaentrega.slice(0, 10),
                                    fechadespacho: direccion.fechadespacho.slice(0, 10),
                                    fechadepago: direccion.fechadepago.slice(0, 10),
                                    nuevoValor: direccion.preciodeventa + direccion.precioenvio,
                                    nombreProducto: detallesProducto.nombreProducto,
                                    UsuarioVendedor: detallesProducto.usuario,
                                    salePrice: detallesProducto.salePrice,
                                    nombreImagen: detallesProducto.nombreImagen,
                                    nombreVendedor: detallesVendedor.nombreVendedor,
                                    apellidoVendedor: detallesVendedor.apellidoVendedor,
                                };
                            })
                        );

                        // Almacena las direcciones en el estado de tu componente
                        setCompras(direcciones);
                        console.log(compras);

                        // Imprime las direcciones en la consola
                        console.log("Direcciones:", direcciones);
                    } else {
                        console.error("Error: res.data o res.data.listarunadireccion es undefined");
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerDirecciones();
    }, [UidUser]); 
    //función para obtener datos del producto
    async function obtenerNombreProducto(idprd) {
        let params = {
            idarticulo: idprd,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });

            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;
            const nombreImagen = res.data[0].images[0].name; // Asegúrate de que la imagen exista
            const usuario = res.data[0].usuario;
            

            return { nombreProducto, salePrice, nombreImagen, usuario };

        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    //función para obtener el nombre del vendedor
    //función para obtener el nombre y apellido del vendedor
    async function obtenerNombreVendedor(uid) {
        let params = {
            uid: uid,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });

            const nombreVendedor = res.data[0].primernombre;
            const apellidoVendedor = res.data[0].primerapellido;

            return { nombreVendedor, apellidoVendedor };

        } catch (error) {
            console.error("Error al obtener el nombre del vendedor", error);
        }
    }





    const filteredCompras = compras.filter((producto) =>
        producto && producto.nombreProducto && producto.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);














    // Función para enviar mensajes









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
                                        <p>Mis compras</p>

                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '87%' }}>
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

                                <Grid className="contProdcOMPR" container style={{ width: isMdDown ? '100%' : '87%', marginTop: '2rem' }}>

                                    {/* Mostrar productos */}
                                    {filteredCompras.length > 0 ? (
                                        filteredCompras.map((producto) => (
                                            <Grid className="productComprado" container>
                                                <Grid key={producto.id} item xs={12} md={9} className="productCompradoSubCont" >
                                                    <Grid xs={5} md={6} className="contImgMisCompras">
                                                        <img src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`} onClick={() => router.push(`/product/${producto.idprd}`)}/>
                                                    </Grid> 
                                                    <Grid container>
                                                        <Grid item xs={12} md={9}>
                                                            <Grid className="subContMiscompras">
                                                                <p className="estadoCompra">{producto.estadodeldespacho}</p>
                                                                <p className="nombreProductMiCompra"  onClick={() => router.push(`/product/${producto.idprd}`)}>{producto.nombreProducto}</p>
                                                                <div className="divCantCompradas">
                                                                    <p className="UnidCompradas">Unidades compradas:</p>
                                                                    <p className="numeroUnidsCompradas">{producto.cantidad}</p>
                                                                </div>
                                                                <div className="divNcompra">
                                                                    <p className="UnidCompradas"> Número de compra:</p>
                                                                    <p className="numeroUnidsCompradas">{producto.numerodeaprobacion}</p>
                                                                </div>
                                                                <p className="dateCompra">{producto.fechacompra}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3} className="precioProductMisCompras">
                                                            <p>${producto.preciodeventa}</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3} className="ContRightMisCompras">
                                                    <div className="SendMsjVendandName">
                                                        <p className="nameVendedorMiCompra">{producto.nombreVendedor} {producto.apellidoVendedor} </p>
                                                        <p className="buttonSendMsjVendedor" onClick={() => router.push({
                                                            pathname: './msjVendedor',
                                                            query: { producto: JSON.stringify(producto) }
                                                        })} >
                                                            Enviar mensaje al vendedor
                                                        </p>
                                                    </div>
                                                    <div className="divButtonVercompra">
                                                        <button
                                                            onClick={() => router.push({
                                                                pathname: './verCompra',
                                                                query: { producto: JSON.stringify(producto) }
                                                            })}
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