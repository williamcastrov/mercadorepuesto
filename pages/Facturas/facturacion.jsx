import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
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
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoIosInformationCircle } from "react-icons/io";
import { IoMdClose } from 'react-icons/io';
import { PiSquareThin } from 'react-icons/pi';
import ModalMensajes from "../mensajes/ModalMensajes";
import { IoIosSquareOutline } from "react-icons/io";
import ModalMensajesEliminar from "../mensajes/ModalMensajesEliminar";
import shortid from "shortid";
import { FaCheckCircle } from "react-icons/fa";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import { TfiEye } from "react-icons/tfi";

import { HiOutlineChevronRight } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";

export default function facturacion() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("Usuario Facturacion : ", datosusuarios);


    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage

    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const [user, setUser] = useState(null);
    const [direccion, setDireccion] = useState(null);

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setUidUser(res.data[0].uid)
                setUser(res.data[0])
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
            }
        };
        obtenerDatosUsuario();
    }, [datosusuarios]);

    useEffect(() => {
        const obtenerDireccionUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "65",
                    params,
                });
                // Ordenamos las direcciones por fecha de creación y seleccionamos la más reciente
                const direccionesOrdenadas = res.data.listardireccionesusuario.sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
                setDireccion(direccionesOrdenadas[0])
            } catch (error) {
                console.error("Error al leer la dirección del usuario", error);
            }
        };
        obtenerDireccionUsuario();
    }, [datosusuarios]);



    const estadosDespacho = {
        40: "Alistando la factura",
        41: "Venta enviada",
        42: "Venta entregada",
        43: "Venta finalizada"
    };

    const estadosVenta = {
        50: "Alistando la factura",
        51: "Venta enviada",
        52: "Venta entregada",
        53: "Venta finalizada"
    };

    const [UidUser, setUidUser] = useState("");
    const [facturas, setFacturas] = useState([]);

    //Obtenngo las facturas del usuario y mapeo tambien el producto, y tambien el usuario comprador
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
                    let facturas = await Promise.all(
                        res.data.listarmisventas.map(async (factura) => {
                            // Obtén los detalles del producto
                            const detallesProducto = await obtenerNombreProducto(factura.idproducto);
                            // Obtén los detalles del comprador 
                            const formattedSalePrice = detallesProducto.salePrice.toLocaleString();
                            const total = factura.cantidad * factura.preciodeventa - factura.retencion - factura.impuestos + factura.precioenvio;

                            return {
                                ...factura,
                                estadodeldespacho: estadosDespacho[factura.estadodeldespacho],
                                estadodelaventa: estadosVenta[factura.estadodelaventa],
                                fechadeventa1: factura.fechacompra ? factura.fechacompra.slice(0, 10) : null,
                                fechadeventa: factura.fechacompra ? factura.fechacompra.slice(0, 10) : null,
                                fechaentrega: factura.fechaentrega ? factura.fechaentrega.slice(0, 10) : null,
                                fechadespacho: factura.fechadespacho ? factura.fechadespacho.slice(0, 10) : null,
                                fechadevolucion: factura.fechadevolucion ? factura.fechadevolucion.slice(0, 10) : null,
                                fechadepago: factura.fechadepago ? factura.fechadepago.slice(0, 10) : null,
                                nuevoValor: factura.preciodeventa + factura.precioenvio,
                                nombreProducto: detallesProducto.nombreProducto,
                                salePrice: formattedSalePrice,
                                nombreImagen: detallesProducto.nombreImagen,
                                nombreUsuario: detallesProducto.usuario,
                                total
                            };
                        })
                    );
                    // Ordena las facturas por fechacompra
                    facturas.sort((a, b) => new Date(b.fechacompra) - new Date(a.fechacompra));
                    setFacturas(facturas);
                    console.log("Mis facturas:", facturas)
                } else {
                    console.error("Error: res.data o res.data.listarvtasusuariovende es undefined");
                }
            } catch (error) {
                console.error("Error al leer las facturas:", error);
            }
        };
        if (UidUser) {
            obtenerVentasUsuario();
        }
    }, [UidUser]);

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


    // Función para renderizar los detalles de la última factura
    const renderUltimaFactura = () => {
        if (facturas.length > 0) {
            const ultimaFactura = facturas[0];

            // Limita el nombre del producto a 40 caracteres
            const nombreProductoCorto = ultimaFactura.nombreProducto.slice(0, 40);

            return (
                <div>
                    <div>
                        <p>Impuestos y retenciones</p>
                    </div>
                    <p>Factura venta "{nombreProductoCorto}..."</p>
                    <p>Retención de ${ultimaFactura.retencion.toLocaleString('en-US')}</p>
                    <p>Impuestos de ${ultimaFactura.impuestos.toLocaleString('en-US')}</p>
                </div>
            );
        } else {
            return <p>No hay facturas disponibles</p>;
        }
    };


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
                                        <p>Facturación</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainFacturacion" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={8} className="primerContFacturacion" display={'flex'} flexDirection={'column'}>

                                        <div className="primerSubcontFactu">
                                            <div>
                                                <p>Facturas en curso</p>
                                            </div>
                                            <p>Factura venta “VALEO 98023 Mazda 3...” </p>
                                            <p>Venta en curso</p>
                                            <p>La factura estará lista el XX-XX-XX</p>
                                        </div>

                                        <div className="segdoSubcontFactu">
                                            <div>
                                                <div>
                                                    <p>Facturas por pagar</p>
                                                </div>
                                                <p>Factura factura “VALEO 98023 Mazda 3...” </p>
                                                <div className="statePaymentFacturacion">Pendiente de pago</div>
                                                <p>La factura vence el XX-XX-XX</p>
                                            </div>
                                            <div className="buttonFactVermas">
                                                <div onClick={() => router.push({ pathname: './resFactura' })}>Ver más</div>
                                            </div>
                                        </div>

                                        <div className="segdoSubcontFactu">
                                            {renderUltimaFactura()}
                                            <div className="buttonFactVermas">
                                                <div onClick={() => router.push({
                                                    pathname: './resFactura',
                                                    query: { ultimaFactura: JSON.stringify(facturas[0]) }
                                                })}>Ver más</div>
                                            </div>
                                        </div>

                                    </Grid>

                                    {user && direccion ? (
                                        <Grid item xs={12} md={4} className="segdoContFacturacion" display={'flex'} flexDirection={'column'}>
                                            <div className="buttonMisFacts">
                                                <button onClick={() => router.push({ pathname: './misFacturas' })}>Mis facturas</button>
                                            </div>
                                            <div className="contDataFactrs">
                                                <div className="titleContDataFactrs">
                                                    <p>Datos facturación</p>
                                                </div>
                                                <div className="dataFactrs">
                                                    <p>Nombres y apellidos</p>
                                                    <p>{user.primernombre && user.primernombre} {user.segundonombre && user.segundonombre} {user.primerapellido && user.primerapellido} {user.segundoapellido && user.segundoapellido}</p>
                                                </div>
                                                <div className="dataFactrs">
                                                    <p>Documento</p>
                                                    <p>{user.identificacion && user.identificacion}</p>
                                                </div>
                                                <div className="dataFactrs">
                                                    <p>Correo electrónico</p>
                                                    <p>{user.email && user.email}</p>
                                                </div>
                                                <div className="dataFactrs">
                                                    <p>Dirección</p>
                                                    <p>{direccion.direccion}, {direccion.nombreciudad}, {direccion.nombre_dep}</p>
                                                </div>
                                                <div className="irDatosFact" onClick={() => router.push({ pathname: '../EditUsers/MisDatos' })}>
                                                    <p>Editar datos</p>
                                                    <HiOutlineChevronRight className="iconRightFact" />
                                                </div>
                                            </div>
                                        </Grid>
                                    ) : (
                                        <p>Cargando datos del usuario...</p>
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