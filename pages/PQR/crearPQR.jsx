import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme, TextField, Button, FormControl, Select, MenuItem, FormHelperText, Autocomplete, ThemeProvider, createTheme, InputAdornment, IconButton } from "@mui/material";
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
import { Dropdown } from 'react-bootstrap';
import { RiArrowDropDownFill } from "react-icons/ri";




import { useDispatch, useSelector } from "react-redux";
export default function crearPQR() {



    const irA = useRef(null); //PosiciónTopPage
    const router = useRouter();//NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const [isOpen, setIsOpen] = useState(true); // Estado para el primer contenedor
    const [isNextOpen, setIsNextOpen] = useState(false); // Estado para el segundo contenedor
    const [text, setText] = useState('Para nosotros es muy importante tus preguntas, quejas, reclamos o felicitaciones. Para poder gestionarlos de la mejor manera, te invitamos a completar la siguiente información:');
    const [tipoIdentificacion, setTipoIdentificacion] = useState(""); // Agrega esta línea
    const [selectedTipoIdentificacion, setSelectedTipoIdentificacion] = useState("Seleccione tipo de identificación");
    const [selectedCiudad, setSelectedCiudad] = useState("Seleccione la ciudad");
    const [selectedMotivo, setSelectedMotivo] = useState("Seleccione el motivo");
    const [imagenes, setImagenes] = useState({ imagen1: null, imagen2: null, imagen3: null });
    const [nombresImagenes, setNombresImagenes] = useState({ nombreimagen1: "", nombreimagen2: "", nombreimagen3: "" });

    const handleImagen = (e, id) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            const extension = "." + base64.substring(base64.indexOf("/") + 1, base64.indexOf(";base64"));
            const nombreImagen = shortid.generate().substring(0, 11) + extension;
            setImagenes(prevState => ({ ...prevState, [id]: file })); // Guarda el objeto File en lugar de la cadena base64
            setNombresImagenes(prevState => ({ ...prevState, ["nombre" + id]: nombreImagen }));
        };
        reader.readAsDataURL(file);
    };


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



    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
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


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const hacerPeticion = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // Verifica que todas las imágenes se hayan cargado
        if (!imagenes.imagen1 || !imagenes.imagen2 || !imagenes.imagen3) {
            alert("Por favor, carga todas las imágenes antes de enviar.");
            return; // Detiene la ejecución de la función
        }

        const formData = new FormData();
        formData.append("tipoidentificacion", form.tipoidentificacion);
        formData.append("identificacion", form.identificacion);
        formData.append("email", form.email);
        formData.append("telefono", form.telefono);
        formData.append("ciudad", form.ciudad);
        formData.append("direccion", form.direccion);
        formData.append("barrio", form.barrio);
        formData.append("motivo", form.motivo);
        formData.append("asunto", form.asunto);
        formData.append("descripcion", form.descripcion);
        formData.append("estado", form.estado);
        formData.append("imagen1", imagenes.imagen1); // Adjunta el objeto File al FormData
        formData.append("nombreimagen1", nombresImagenes.nombreimagen1);
        formData.append("imagen2", imagenes.imagen2); // Adjunta el objeto File al FormData
        formData.append("nombreimagen2", nombresImagenes.nombreimagen2);
        formData.append("imagen3", imagenes.imagen3); // Adjunta el objeto File al FormData
        formData.append("nombreimagen3", nombresImagenes.nombreimagen3);
        formData.append("numeroimagenes", 1); 


        // Muestra los nombres de las imágenes en la consola
        console.log("Nombre imagen 1:", nombresImagenes.nombreimagen1);
        console.log("Nombre imagen 2:", nombresImagenes.nombreimagen2);
        console.log("Nombre imagen 3:", nombresImagenes.nombreimagen3);
        // Aquí va el resto de tu código para hacer la petición
        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}151`,
                data: formData,
            });
            console.log("Datos enviados:", formData);
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
                    setTipoIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.tipoidentificacion);
                }
            } catch (error) {
                console.error("Error al obtener los tipos de identificación", error);
            }
        };
        obtenerTiposIdentificacion();
    }, []);


    const CustomDropdownButton = React.forwardRef(({ children, onClick, href }, ref) => (
        <button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            href={href}
            className="DropDownTipoDocumentoPQR"
        >
            {children}
        </button>
    ));

    const handleSelectCiudad = (value, nombre) => {
        setSelectedCiudad(nombre);
        setForm({ ...form, ciudad: value });
    };

    const handleSelectTipoIdentificacion = (value, nombre) => {
        setSelectedTipoIdentificacion(nombre);
        setForm({ ...form, tipoidentificacion: value });
    };

    const handleSelectMotivo = (value, nombre) => {
        setSelectedMotivo(nombre);
        setForm({ ...form, motivo: value });
    };






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
                                                        <input type="text" name="nombres" id="" onChange={handleChange} />
                                                    </div>
                                                    <div>
                                                        <p>Tipo de documento</p>
                                                        <Dropdown style={{ width: '100%', marginBottom: '2rem' }}>
                                                            <Dropdown.Toggle as={CustomDropdownButton} id="dropdown-basic">
                                                                {selectedTipoIdentificacion}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento">
                                                                {tipoIdentificacion && tipoIdentificacion.map((tipo) => (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdownTipoDoc"
                                                                        onClick={() => handleSelectTipoIdentificacion(tipo.id, `${tipo.tipoidentificacion} - ${tipo.descripcion}`)}
                                                                    >
                                                                        {`${tipo.tipoidentificacion} - ${tipo.descripcion}`}
                                                                    </Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div>
                                                        <p>Correo electrónico</p>
                                                        <input
                                                            autoComplete="off"
                                                            name="email"
                                                            type="text"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p>Ciudad</p>
                                                        <Dropdown style={{ width: '100%', marginBottom: '2rem' }}>
                                                            <Dropdown.Toggle as={CustomDropdownButton} id="dropdown-basic">
                                                                {selectedCiudad}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                                                {ciudades && ciudades.map((ciudad) => (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdownTipoDoc"
                                                                        onClick={() => handleSelectCiudad(ciudad.id_ciu, `${ciudad.nombre_ciu}`)}
                                                                    >
                                                                        {`${ciudad.nombre_ciu}`}
                                                                    </Dropdown.Item>
                                                                ))}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div>
                                                        <p>Barrio</p>
                                                        <input type="text" name="barrio" onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Apellidos</p>
                                                        <input type="text" name="apellidos" id="" onChange={handleChange} />
                                                    </div>
                                                    <div>
                                                        <p>Numero de documento</p>
                                                        <input
                                                            autoComplete="off"
                                                            name="identificacion"
                                                            type="text"
                                                            onChange={handleChange}
                                                            maxLength={10}
                                                            onKeyPress={(event) => {
                                                                if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p>Numero de contacto</p>
                                                        <input type="text" name="telefono" id="" onChange={handleChange} />
                                                    </div>
                                                    <div>
                                                        <p>Dirección</p>
                                                        <input type="text" name="direccion" id="" onChange={handleChange} />
                                                    </div>
                                                    <div>
                                                        <p>Motivo</p>
                                                        <Dropdown style={{ width: '100%', marginBottom: '2rem' }}>
                                                            <Dropdown.Toggle as={CustomDropdownButton} id="dropdown-basic">
                                                                {selectedMotivo}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento">
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() => handleSelectMotivo("Petición", "Petición")}
                                                                >
                                                                    Petición
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() => handleSelectMotivo("Queja", "Queja")}
                                                                >
                                                                    Queja
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() => handleSelectMotivo("Reclamo", "Reclamo")}
                                                                >
                                                                    Reclamo
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() => handleSelectMotivo("Felicitación", "Felicitación")}
                                                                >
                                                                    Felicitación
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
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
                                                    <input type="text" name="asunto" onChange={handleChange} />
                                                </div>

                                                <div className="DescripSoli">
                                                    <p>Descripción</p>
                                                    <textarea name="descripcion" onChange={handleChange} />

                                                </div>

                                                <div className="AdjArchSoli">
                                                    <div className="AdjArchSoliTitle">
                                                        <p>Adjuntar archivos</p>
                                                    </div>

                                                    <div className="AdjArchSoliIcons">
                                                        <div className="SubAdjArchSoliIcons">
                                                            <div>
                                                                <input type="file" onChange={(e) => handleImagen(e, "imagen1")} />
                                                                <HiOutlineDocumentArrowUp />
                                                            </div>
                                                            <div>
                                                                <input type="file" onChange={(e) => handleImagen(e, "imagen2")} />
                                                                <HiOutlineDocumentArrowUp />
                                                            </div>
                                                            <div>
                                                                <input type="file" onChange={(e) => handleImagen(e, "imagen3")} />
                                                                <HiOutlineDocumentArrowUp />
                                                            </div>
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
