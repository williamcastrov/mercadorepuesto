import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_BD_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";


export default function RetiroDinero() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [UidUser, setUidUser] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState(null);



    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    const [saldo, setSaldo] = useState(1929500);
    const [mostrarContenedor, setMostrarContenedor] = useState(false);

    const handleChange = (event) => {
        // Remueve los puntos antes de cambiar el estado
        const valorSinPuntos = event.target.value.replace(/\./g, '');
        setSaldo(valorSinPuntos);
    };

    const handleClick = () => {
        setMostrarContenedor(true);
    };

    // Formatea el saldo con puntos como separadores de miles
    const saldoFormateado = saldo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');








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
            className="dropdownBanco"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Seleccionar banco"}
        </button>
    ));
    //Obtener datos de mis compras

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
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
                                        <p>Solicitar retiro de dinero</p>
                                    </div>
                                </Grid>
                                <div className="contMainBilletera">
                                    <div className="saldoBilletera">
                                        <div className="saldoBilleteraLeft">
                                            <h3>Saldo que deseas retirar</h3>
                                            <div>
                                                <p>$</p><input type="text" value={saldoFormateado} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="saldoBilleteraRight">
                                            <button onClick={handleClick}>Siguiente</button>
                                        </div>
                                    </div>

                                    {mostrarContenedor &&
                                        <div className="contMainBilleteraDos">
                                            <div className="contMovimientos">
                                                <div className="TopcontMovimientos">
                                                    <p>A donde deseas que llegue tu dinero</p>
                                                </div>
                                                <div className="MiddleContMovimientos">
                                                    <div className="DataMiddleContMovimientos">
                                                        <p>Nombre del titular de la cuenta</p>
                                                        <p>Juan Pablo Rojas</p>
                                                    </div>

                                                    <div className="DataMiddleContMovimientos">
                                                        <p>Tipo de documento del titular de la cuenta</p>
                                                        <p>C.C</p>
                                                    </div>

                                                    <div className="DataMiddleContMovimientos">
                                                        <p>Numero de documento del titular de la cuenta</p>
                                                        <p>1234567890</p>
                                                    </div>

                                                    <div className="DataMiddleContMovimientos">
                                                        <p>Entidad Bancaria</p>
                                                        <div>
                                                            <Dropdown style={{ width: '40%' }} onSelect={handleSelect}>
                                                                <Dropdown.Toggle
                                                                    as={CustomDropdownButton}
                                                                    id="dropdown-basic"
                                                                >
                                                                    {selectedSortOption ? `Seleccionar banco ${selectedSortOption}` : "Seleccionar banco"}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="tamañocajaBanco">
                                                                    <Dropdown.Item
                                                                        eventKey="Más antiguo"
                                                                        className="itemsDropdownBanco"
                                                                    >
                                                                        Bancolombia
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item
                                                                        eventKey="Más reciente"
                                                                        className="itemsDropdownBanco"
                                                                    >
                                                                        Itaú
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item
                                                                        eventKey="Más reciente"
                                                                        className="itemsDropdownBanco"
                                                                    >
                                                                        Av villas
                                                                    </Dropdown.Item>

                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>

                                                    <div className="DataMiddleContMovimientos">
                                                        <p>Numero de cuenta</p>
                                                        <p>123456789098</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="SendSolicitudb">
                                                <button onClick={handleOpenDialog}>Enviar solicitud</button>
                                            </div>
                                        </div>
                                    }

                                </div>

                                <Dialog
                                    className='dialogDatsGuardados'
                                    open={dialogOpen}
                                    disableScrollLock={true} 
                                    PaperProps={{
                                        style: {
                                            width: isMdDown ? '80%' : '35%',
                                            backgroundColor: 'white',
                                            border: '2px solid gray',
                                            padding: '1.4rem',
                                            borderRadius: '10px'
                                        },
                                    }}
                                >
                                    <DialogTitle className='dialogtitleDtsGUardados' >
                                        <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                                        <p className='dialogtituloP'>¡Solicitud enviada con exito!</p>
                                    </DialogTitle>
                                    <DialogContent className='dialogContentDatsGuardados'>
                                        <p className='PdialogContent'>Tu solicitud fue enviada con exito. Esta será revisada y procesada por nosotros, en un máximo de 5 días habiles te estaremos dando repuesta.</p>
                                    </DialogContent>
                                    <DialogActions className='DialogActionsDatsGuardados'>
                                        <div className='div1buttonDialog' >
                                            <button className='button2DialogDatsGuardados' onClick={() => router.push({ pathname: './' })} >
                                                Ir a mi billetera
                                            </button>
                                        </div>
                                        <div className='div1buttonDialog' >
                                            <button className='button1DialogDatsGuardados' onClick={() => router.push({ pathname: '/' })} >
                                                Ir al inicio
                                            </button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}