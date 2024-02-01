import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme, TextField, Button, FormControl, Select, MenuItem, FormHelperText, Autocomplete, ThemeProvider, createTheme, InputAdornment, IconButton  } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";
import Link from '@mui/material/Link';
import { GrNext } from "react-icons/gr";
import { useRouter } from "next/router";
import { TbSearch } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { MdExpandMore } from 'react-icons/md';

import { RiArrowDropDownFill } from "react-icons/ri";




import { useDispatch, useSelector } from "react-redux";
export default function crearPQR() {
    const irA = useRef(null); //PosiciónTopPage
    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const [isOpen, setIsOpen] = useState(true);
    const [text, setText] = useState('Para nosotros es muy importante tus preguntas, quejas, reclamos o felicitaciones. Para poder gestionarlos de la mejor manera, te invitamos a completar la siguiente información:');

    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );

    useEffect(() => {
        console.log('Ciudades:', ciudades); // Agregamos el console.log aquí
    }, [ciudades]);

    const handleClick = () => {
        setIsOpen(false);
        setText('Describe tu solicitud:');
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);




    const themeDos = createTheme({
        typography: {
            fontFamily: '"Jost", sans-serif',
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2D2E83',
                        backgroundColor: '#f0f1f5',
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2D2E83',
                        backgroundColor: '#f0f1f5',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2D2E83',
                        backgroundColor: '#f0f1f5',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '0',
                        },
                    },
                },
            },
        },
    });

    const themeTres = createTheme({
        typography: {
            fontFamily: '"Jost", sans-serif',
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2D2E83',
                        backgroundColor: '#f0f1f5',
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2D2E83',
                        backgroundColor: '#f0f1f5',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#2D2E83',
                        backgroundColor: '#f0f1f5',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '0',
                        },
                    },
                },
            },
        },
    });


    const [form, setForm] = useState({
        tipoidentificacion: "",
        identificacion: "",
        email: "",
        telefono: "",
        ciudad: "",
        direccion: "",
        barrio: "",
        motivo: "",
        asunto: "",
        descripcion: "",
        estado: 80,
    });

    const [tiposIdentificacion, setTiposIdentificacion] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const hacerPeticion = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
        let params = {
            ...form,
        };
        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}151`,
                params,
            });
            console.log("Datos enviados:", params);
            console.log("Respuesta del servidor:", res.data);
        } catch (error) {
            console.error("Error al hacer la petición", error);
        }
    };

    useEffect(() => {
        const obtenerTiposIdentificacion = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}7`,
                });
                if (Array.isArray(res.data.tipoidentificacion)) {
                    setTiposIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipoidentificacion);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTiposIdentificacion();
    }, []);






    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid className="contMainOpiniones" container style={{ width: isMdDown ? "100%" : "80%" }} display={"flex"} flexDirection={"column"}>
                                    <div className="TopBuscarPQR">
                                        <Breadcrumbs separator={<GrNext style={{ color: '#D9D9D9' }} size={17} />} aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => { e.preventDefault(); router.push('./') }}

                                            >
                                                <p className="VerVentaLink">Ayuda / PQRS</p>
                                            </Link>
                                            <p className="VerVentaLink">Crear solicitud</p>
                                        </Breadcrumbs>
                                        <p className="SubtitleBuscar">{text}</p>
                                    </div>

                                    {isOpen && (
                                        <Grid container spacing={6} className="MainFormCrearPQR">
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Nombres</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Tipo de documento</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Correo electrónico</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Ciudad</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Barrio</p>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Apellidos</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Numero de documento</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Numero de contacto</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Dirección</p>
                                                        <input type="text" name="" id="" />
                                                    </div>
                                                    <div>
                                                        <p>Motivo</p>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <div className="ButtomFormCrearPQR">
                                                <div className="acepptCond">
                                                    <div>

                                                    </div>
                                                    <p>Acepto el tratamiento de mis datos personales</p>
                                                </div>
                                                <div className="SigPQR">
                                                    <button onClick={handleClick}>Siguiente</button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}

                                    {!isOpen && (
                                        <Grid container className="MainFormCrearPQR">
                                            <div className="ContCrearSolMain">
                                                <div className="DescrAsunto">
                                                    <p>Asunto</p>
                                                    <input type="text" />
                                                </div>

                                                <div className="DescripSoli">
                                                    <p>Descripción</p>
                                                    <textarea />

                                                </div>

                                                <div className="AdjArchSoli">
                                                    <div className="AdjArchSoliTitle">
                                                        <p>Adjuntar archivos</p>
                                                    </div>

                                                    <div className="AdjArchSoliIcons">
                                                        <div className="SubAdjArchSoliIcons">
                                                            <div><HiOutlineDocumentArrowUp /></div>
                                                            <div><HiOutlineDocumentArrowUp /></div>
                                                            <div><HiOutlineDocumentArrowUp /></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="EnviarPeticionPQR">
                                                    <button>Enviar</button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}


                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <ThemeProvider theme={themeTres}>
                                            <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#f0f1f5', borderRadius: '10px' }}>
                                                <Autocomplete
                                                    disableClearable // Desactiva el icono de la "x"
                                                    options={tiposIdentificacion}
                                                    getOptionLabel={(option) => option.descripcion}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            label={params.inputProps.value ? '' : 'Seleccione Tipo de Documento'}
                                                            InputLabelProps={{ shrink: params.inputProps.value ? true : false }}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton sx={{ color: '#2D2E83', fontSize: '20px', marginRight:'-15px' }}>
                                                                            <RiArrowDropDownFill style={{marginRight:'-15px'}} />
                                                                        </IconButton>
                                                                        {params.InputProps.endAdornment}
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            sx={{
                                                                backgroundColor: '#f0f1f5',
                                                                borderRadius: '10px',
                                                            }}
                                                        />
                                                    }
                                                    onChange={(event, newValue) => {
                                                        setForm({ ...form, tipoidentificacion: newValue ? newValue.id : '' });
                                                    }}
                                                    clearIcon={null}
                                                    popupIcon={null}
                                                />
                                            </FormControl>
                                        </ThemeProvider>
                                        <TextField name="identificacion" placeholder="Identificación" onChange={handleChange} />
                                        <TextField name="email" placeholder="Correo Electrónico" onChange={handleChange} />
                                        <TextField name="telefono" placeholder="Teléfono" onChange={handleChange} />
                                        <ThemeProvider theme={themeDos}>
                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                <Autocomplete
                                                    disableClearable // Desactiva el icono de la "x"
                                                    options={ciudades}
                                                    getOptionLabel={(option) => option.nombre_ciu}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            label={params.inputProps.value ? '' : 'Seleccione Ciudad'}
                                                            InputLabelProps={{ shrink: params.inputProps.value ? true : false }}
                                                        />
                                                    }
                                                    onChange={(event, newValue) => {
                                                        setForm({ ...form, ciudad: newValue ? newValue.id_ciu : '' });
                                                    }}
                                                />
                                            </FormControl>
                                        </ThemeProvider>
                                        <TextField name="direccion" placeholder="Dirección" onChange={handleChange} />
                                        <TextField name="barrio" placeholder="Barrio" onChange={handleChange} />
                                        <TextField name="motivo" placeholder="Motivo" onChange={handleChange} />
                                        <TextField name="asunto" placeholder="Asunto" onChange={handleChange} />
                                        <TextField name="descripcion" placeholder="Descripción" onChange={handleChange} />
                                        <Button type="submit" onClick={hacerPeticion}>Enviar</Button>
                                    </div>
                                </Grid>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
