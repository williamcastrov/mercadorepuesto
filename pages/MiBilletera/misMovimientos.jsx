import Container from "../../components/layouts/Container"
import { Grid, useMediaQuery, useTheme, InputAdornment, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { URL_BD_MR } from "../../helpers/Constants";
import { useSelector } from "react-redux";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";

export default function misMovimientos() {

    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [busqueda, setBusqueda] = useState("");
    const [movimientos, setMovimientos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    useEffect(() => {
        const ListarMovimientosUsuario = async () => {
            try {
                const res = await axios.post(`${URL_BD_MR}148`);
                const datosUsuario = res.data.listtransvendedor.filter(usuario => usuario.usuario === datosusuarios.uid);
                setMovimientos(datosUsuario);
            } catch (error) {
                console.error("Error al leer las transacciones del vendedor", error);
            }
        };
        ListarMovimientosUsuario();
    }, [datosusuarios]);


    //Seleccionar funcion por mas antiguo o mas nuevo 
    const handleSelect = (eventKey) => {
        setSelectedSortOption(eventKey);

        if (eventKey === "Más antiguo") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion))
            );
        } else if (eventKey === "Más reciente") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion))
            );
        } else if (eventKey === "Mayor precio") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => b.valor - a.valor)
            );
        } else if (eventKey === "Menor precio") {
            setMovimientos(prevMovimientos =>
                [...prevMovimientos].sort((a, b) => a.valor - b.valor)
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


    //toppagewhilesign
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
                        <div className="container" >
                            <div className="ps-page__header" > </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: '28rem' }}>
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9', marginBottom: '3rem' }} size={17} />} aria-label="breadcrumb" className="linkMisvResF">
                                        <Link
                                            className="linkMisv"
                                            underline="none"
                                            href="./"
                                            onClick={(e) => { e.preventDefault(); router.push('./') }}

                                        >
                                            <p className="VerVentaLink VerVentaLinkPres">Mi billetera</p>
                                        </Link>
                                        <p className="VerVentaLink VerVentaLinkPres">Mis movimientos</p>
                                    </Breadcrumbs>
                                </Grid>
                                <Grid className="contMainMisFacturas contMainMisFacturas2" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '-1rem' }}>
                                    <div className="contTopMisFacturas">
                                        <InputBase
                                            value={searchTerm}
                                            onChange={event => setSearchTerm(event.target.value)}
                                            placeholder="Buscar en mis movimientos"
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

                                    <Grid container className="dataMainMovimientos" display={'flex'} flexDirection={'column'}>
                                        <Grid item xs={12}>
                                            <Grid container className="dataMovimientosTop">
                                                <Grid item xs={3}>
                                                    <p>Fecha</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p>Concepto</p>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <p>Valor</p>
                                                </Grid>
                                            </Grid>

                                            {movimientos
                                                .filter(movimiento => movimiento.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion))
                                                .map((movimiento, index) => (
                                                    <Grid container className="dataMovimientosM" key={index}>
                                                        <Grid item xs={3}>
                                                            <p>{movimiento.fechacreacion.slice(0, 10)}</p>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <p>{movimiento.nombre}</p>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <p>${movimiento.valor.toLocaleString('en-US')}</p>
                                                        </Grid>
                                                    </Grid>
                                                ))}


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