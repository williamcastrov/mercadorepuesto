import Container from "../../components/layouts/Container"
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_BD_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function facturacion() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    // console.log("Usuario Facturacion : ", datosusuarios);
    const [producto, setProducto] = useState({});
    const [compraReciente, setCompraReciente] = useState({});
    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [user, setUser] = useState(null);
    const [direccion, setDireccion] = useState(null);
    const [UidUser, setUidUser] = useState("");
    const [compraRecienteEstado70, setCompraRecienteEstado70] = useState(null);
    const [productoEstado70, setProductoEstado70] = useState(null);
    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //función para obtener datos de usuario loggeado
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
                //    console.error("Error al leer los datos del usuario", error);
            }
        };
        obtenerDatosUsuario();
    }, [datosusuarios]);

    //función para obtener direccion de usuario
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
                // console.error("Error al leer la dirección del usuario", error);
            }
        };
        obtenerDireccionUsuario();
    }, [datosusuarios]);


    //Función para obtener factura comparando con UId loggeado del vendedor o no
    useEffect(() => {
        const ObtenerFacturas = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "121",
                    params: {
                        uidvendedor: UidUser
                    }
                });
                console.log('Datos del endPoint 121:', res.data);
                const comprasUsuario = res.data.listarcompras;

                if (comprasUsuario.length > 0) {
                    // Obtener la compra más reciente
                    const compraReciente = comprasUsuario.sort((a, b) => new Date(b.fechacompra) - new Date(a.fechacompra))[0];
                    console.log('Compra más reciente:', compraReciente);
                    setCompraReciente(compraReciente);

                    // Llamamos a ObtDatosProducto aquí
                    ObtDatosProducto(compraReciente.idproducto)
                        .then(producto => setProducto(producto));

                    // Obtener la compra más reciente con estado 70
                    const comprasEstado70 = comprasUsuario.filter(compra => compra.estadodelpago === 70);
                    if (comprasEstado70.length > 0) {
                        const compraRecienteEstado70 = comprasEstado70.sort((a, b) => new Date(b.fechacompra) - new Date(a.fechacompra))[0];
                        console.log('Compra más reciente con estado 70:', compraRecienteEstado70);
                        setCompraRecienteEstado70(compraRecienteEstado70);
                    } else {
                        console.log('No hay compras con estado 70 para este usuario');
                    }
                } else {
                    console.log('No hay compras para este usuario');
                }
            } catch (error) {
                console.error("Error al leer los datos de las compras", error);
            }
        };
        ObtenerFacturas();
    }, [UidUser]);

    //obtener los datos del producto
    async function ObtDatosProducto(idproducto) {
        let params = {
            idarticulo: idproducto,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "18",
                params,
            });
            const nombreProducto = res.data[0].name;
            const salePrice = res.data[0].sale_price;

            return { nombreProducto, salePrice };
        } catch (error) {
            console.error("Error al obtener el nombre del producto", error);
        }
    }

    // Función para renderizar los detalles de la última compra
    const renderUltimaCompra = () => {
        if (Object.keys(compraReciente).length > 0) {
            // Limita el nombre del producto a 40 caracteres
            const nombreProductoCorto = producto && producto.nombreProducto ? producto.nombreProducto.slice(0, 40) : "";

            return (
                <div>
                    <div>
                        <p>Impuestos y retenciones</p>
                    </div>
                    <p>Compra venta "{nombreProductoCorto}..."</p>
                    <p>Retención de ${compraReciente.retencion.toLocaleString('en-US')}</p>
                    <p>Impuestos de ${compraReciente.impuestos.toLocaleString('en-US')}</p>
                </div>
            );
        } else {
            return <p>No hay facturas disponibles</p>;
        }
    };

    const renderUltimaCompraEstado70 = () => {
        if (compraRecienteEstado70 && productoEstado70) {
            // Limita el nombre del producto a 40 caracteres
            const nombreProductoCorto = productoEstado70.nombreProducto ? productoEstado70.nombreProducto.slice(0, 40) : "";
    
            return (
                <div>
                    <div>
                        <p>Impuestos y retenciones</p>
                    </div>
                    <p>Compra venta "{nombreProductoCorto}..."</p>
                    <p>Retención de ${compraRecienteEstado70.retencion.toLocaleString('en-US')}</p>
                    <p>Impuestos de ${compraRecienteEstado70.impuestos.toLocaleString('en-US')}</p>
                </div>
            );
        } else {
            return <p>No hay facturas con estado 70 disponibles</p>;
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
                                            {renderUltimaCompra()}
                                            <div className="buttonFactVermas">
                                                <div onClick={() => router.push({
                                                    pathname: './resFactura',
                                                    query: { ultimaCompra: JSON.stringify(compraReciente), producto: JSON.stringify(producto) }
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