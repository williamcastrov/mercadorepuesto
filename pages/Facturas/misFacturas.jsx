import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
 
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants"; 

import { HiOutlineChevronRight } from "react-icons/hi";

import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';



export default function misFacturas() {

    //NextRouter
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [selectedSortOption, setSelectedSortOption] = useState(null);


    //toppagewhilesign
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //Seleccionar funcion por mas antiguo o mas nuevo
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);
    
        if (eventKey === "Más antiguo") {
            setFacturas(prevFacturas =>
                [...prevFacturas].sort((a, b) => new Date(a.fechadeventa) - new Date(b.fechadeventa))
            );
        } else if (eventKey === "Más reciente") {
            setFacturas(prevFacturas =>
                [...prevFacturas].sort((a, b) => new Date(b.fechadeventa) - new Date(a.fechadeventa))
            );
        } else if (eventKey === "Mayor precio") {
            setFacturas(prevFacturas =>
                [...prevFacturas].sort((a, b) => b.total - a.total)
            );
        } else if (eventKey === "Menor precio") {
            setFacturas(prevFacturas =>
                [...prevFacturas].sort((a, b) => a.total - b.total)
            );
        }
    };

    //Button de dropdown
    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMisFacturas"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));






    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("Usuario Facturacion : ", datosusuarios);




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
                    setFacturas(facturas);
                    console.log("Mis facturas en el map:", facturas)
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






    //Función para descargar excel
    const descargarExcel = (factura) => {
        // Crear un nuevo libro de trabajo
        const wb = utils.book_new();

        // Crear una hoja de trabajo
        const ws_data = [
            ['Total facturado', 'Precio de envío'],
            [factura.total, factura.precioenvio]
        ];
        const ws = utils.aoa_to_sheet(ws_data);

        // Añadir la hoja de trabajo al libro de trabajo
        utils.book_append_sheet(wb, ws, "Factura");

        // Escribir el libro de trabajo en un Blob
        const wbout = writeFile(wb, 'factura.xlsx', { type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });

        // Guardar el archivo
        saveAs(blob, 'factura.xlsx');
    };

    //Función para descargar pdf
    const descargarPDF = (factura) => {
        const doc = new jsPDF();

        doc.text(`Total facturado: $${factura.total.toLocaleString('en-US')}`, 10, 10);
        doc.text(`Precio de envío: $${factura.precioenvio.toLocaleString('en-US')}`, 10, 20);
        // Agrega más datos aquí...

        doc.save("factura.pdf");
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
                                        <p>Mis facturas</p>
                                    </div>
                                </Grid>
                                <Grid className="contMainMisFacturas" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className="contTopMisFacturas">
                                        <InputBase
                                            placeholder="Buscar por número de factura"
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f2f6',
                                                padding: '8px',
                                                width: '410px',
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

                                        <Dropdown onSelect={handleSelect} className="dropFactura">
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsVendedor">
                                                <Dropdown.Item
                                                    eventKey="Más antiguo"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Más antiguo
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Más reciente"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Más reciente
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Mayor precio"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Mayor precio
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    eventKey="Menor precio"
                                                    className="itemsdropdownVerVenta"
                                                >
                                                    Menor precio
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="dataMainFacturas">
                                        <div className="topDataMainFacturas">
                                            <p>Fecha de emisión</p>
                                            <p>Concepto de facturación</p>
                                            <p>Número de factura</p>
                                            <p>Total facturado</p>
                                            <p>Descargar</p>
                                        </div>

                                        {facturas.map((factura, index) => (
                                            <div className="MapDataMainFacturas" key={index}>
                                                <div className="MapDataMainFacturasDate">
                                                    <p>{factura.fechadeventa}</p>
                                                </div>
                                                <div className="MapDataMainFacturasConcept">
                                                    <p>Servicios Mercado Repuesto</p>
                                                </div>
                                                <div className="MapDataMainFacturasNumber">
                                                    <p>{factura.numerodeaprobacion}</p>
                                                </div>
                                                <div className="MapDataMainFacturasTotal">
                                                    <p>${factura.total.toLocaleString('en-US')}</p>
                                                </div>
                                                <div className="MapDataMainFacturasDownload">
                                                    <RiFileExcel2Fill className="ExcelIcon" onClick={() => descargarExcel(factura)} />
                                                    <BsFiletypePdf className="pdfIcon" onClick={() => descargarPDF(factura)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Grid>


                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}