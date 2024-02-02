import Container from "../../components/layouts/Container";
import { Breadcrumbs, Grid, useMediaQuery, useTheme, TextField, Button, FormControl, Select, MenuItem, FormHelperText, Autocomplete, ThemeProvider, createTheme, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
import { IoClose } from "react-icons/io5";
import { FaCheck } from 'react-icons/fa'; // Importa el icono de verificación de 'react-icons'
import { FaCheckCircle } from "react-icons/fa";



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
    // Estado para la imagen
    const [imagen, setImagen] = useState(null);
    const [nombreImagen, setNombreImagen] = useState("");
    const [aceptaTerminos, setAceptaTerminos] = useState(false); // Estado para saber si el usuario ha aceptado los términos
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numeroPeticion, setNumeroPeticion] = useState(null);
    //abrir dialog de confirmación
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    //Verifica los datos antes de pasar a siguiente
    const verificarDatos = () => {
        // Verificar que los campos "nombres" y "apellidos" no estén vacíos
        if (!form.nombres || !form.apellidos) {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que el campo "email" no esté vacío y sea un correo electrónico válido
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!form.email || !regexEmail.test(form.email)) {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que se haya seleccionado un "Tipo de documento"
        if (selectedTipoIdentificacion === "Seleccione tipo de identificación") {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que se haya seleccionado una "Ciudad"
        if (selectedCiudad === "Seleccione la ciudad") {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que el campo "identificacion" no esté vacío y tenga al menos 6 caracteres
        if (!form.identificacion || form.identificacion.length < 6) {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que el campo "telefono" no esté vacío y tenga exactamente 10 caracteres
        if (!form.telefono || form.telefono.length !== 10) {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que el campo "direccion" no esté vacío
        if (!form.direccion) {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que el campo "barrio" no esté vacío y solo contenga letras
        const regexBarrio = /^[a-zA-Z\s]*$/;
        if (!form.barrio || !regexBarrio.test(form.barrio)) {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que se haya seleccionado un "Motivo"
        if (selectedMotivo === "Seleccione el motivo") {
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Si todos los controles pasan, retorna "true"
        return true;
    };

    //Verificación de asunto y descripción antes de envíar
    const verificarAsuntoDescripcion = () => {
        // Verificar que el campo "asunto" no esté vacío, solo contenga letras y no esté completamente lleno
        const regexTexto = /^[a-zA-Z\s]*$/;
        if (!form.asunto || !regexTexto.test(form.asunto) || form.asunto.length === 100) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, ingresa un asunto válido.');
            setShowModal(true);
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Verificar que el campo "descripcion" no esté vacío, solo contenga letras y no esté completamente lleno
        if (!form.descripcion || !regexTexto.test(form.descripcion) || form.descripcion.length === 500) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, ingresa una descripción válida.');
            setShowModal(true);
            return false; // Detiene la ejecución de la función y retorna "false"
        }

        // Si todos los controles pasan, retorna "true"
        return true;
    };

    //Función para handle De imagen
    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (!file) {
            // No se seleccionó ningún archivo
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const image = reader.result;
            const extension =
                "." +
                image.substring(
                    image.indexOf("/") + 1,
                    image.indexOf(";base64")
                );
            const nombreImagen = shortid.generate().substring(0, 11) + extension;
            setImagen({ image: file, nombreImagen }); // Guarda el objeto File y el nombre de la imagen
        };
        reader.readAsDataURL(file);
    };

    //Función para botón de eliminar imagen
    const eliminarImagen = () => {
        setImagen(null);
        setNombreImagen("");
    };

    //Función para leer ciudades
    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );

    //función para ir a siguiente que verifica que estén bien todos los campos
    const irASiguiente = () => {
        // Verificar los datos antes de proceder
        if (!verificarDatos()) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, asegúrate de que todos los campos estén correctamente llenados.');
            setShowModal(true);
            return; // Detiene la ejecución de la función
        }

        if (!aceptaTerminos) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, acepta los términos y condiciones.');
            setShowModal(true);
            return; // Detiene la ejecución de la función
        }

        setIsOpen(false);
        setText('Describe tu solicitud:');
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    //form  para enviar todos los datos
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

    //Handlechange de los campos de inputs y textArea del form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //Función para hacer petición
    const hacerPeticion = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // Verifica que los datos estén correctos antes de proceder
        if (!verificarDatos() || !verificarAsuntoDescripcion()) return;

        // Verifica que todas las imágenes se hayan cargado
        if (!imagen) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, carga la imagen antes de enviar.');
            setShowModal(true);
            return; // Detiene la ejecución de la función
        }

        const formData = new FormData();
        formData.append("nombres", form.nombres);
        formData.append("apellidos", form.apellidos);
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
        formData.append("nombreimagen1", imagen.nombreImagen);
        formData.append("imagen1", imagen.image);
        formData.append("numeroimagenes", 1);

        // Muestra los nombres de las imágenes en la consola
        console.log("Nombre imagen 1:", imagen.nombreImagen);

        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}151`,
                data: formData,
            });
            console.log("Datos enviados:", formData);
            console.log("Respuesta del servidor:", res.data);

            // Obtén el número total de PQRs existentes después de enviar la nueva petición
            const resPQRs = await axios.post(`${URL_BD_MR}152`);
            const numeroPeticion = resPQRs.data.listarpqr.length;
            setNumeroPeticion(resPQRs.data.listarpqr.length);  // Actualiza numeroPeticion


            handleOpenDialog();
        } catch (error) {
            console.error("Error al hacer la petición", error);
        }
    };


    //Función para obtener los tipos de identificación
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

    //Botón para drodpdowns
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


    //Handle dropdown ciudad
    const handleSelectCiudad = (value, nombre) => {
        setSelectedCiudad(nombre);
        setForm({ ...form, ciudad: value });
    };

    //Handle dropdown tipo ident
    const handleSelectTipoIdentificacion = (value, nombre) => {
        setSelectedTipoIdentificacion(nombre);
        setForm({ ...form, tipoidentificacion: value });
    };

    //Handle dropdown motivo
    const handleSelectMotivo = (value, nombre) => {
        setSelectedMotivo(nombre);
        setForm({ ...form, motivo: value });
    };


    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

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
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <div className="contMainOpiniones" style={{ width: "80%", display: 'flex', flexDirection: 'column' }}>
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
                                                        <input type="text"
                                                            name="nombres" id=""
                                                            onChange={handleChange}
                                                            maxLength={20}
                                                            onInput={(e) => {
                                                                // Permitir solo letras y espacios
                                                                e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                // Capitalizar la primera letra de cada palabra
                                                                e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                            }}
                                                        />
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
                                                            autoComplete={Math.random().toString()}
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
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento" style={{ maxHeight: '281px', overflowY: 'auto' }}>
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
                                                        <input
                                                            type="text"
                                                            name="barrio"
                                                            onChange={handleChange}
                                                            autoComplete={Math.random().toString()}
                                                            maxLength={20}
                                                            onInput={(e) => {
                                                                // Permitir solo letras y espacios
                                                                e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                // Capitalizar la primera letra de cada palabra
                                                                e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Apellidos</p>
                                                        <input type="text"
                                                            name="apellidos" id=""
                                                            onChange={handleChange}
                                                            maxLength={20}
                                                            onInput={(e) => {
                                                                // Permitir solo letras y espacios
                                                                e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                // Capitalizar la primera letra de cada palabra
                                                                e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                            }}
                                                        />
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
                                                        <input
                                                            autoComplete="off"
                                                            type="text"
                                                            name="telefono"
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
                                                        <p>Dirección</p>
                                                        <input type="text" name="direccion" id="" onChange={handleChange} autoComplete={Math.random().toString()} maxLength={30} />
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
                                                    <div
                                                        style={{
                                                            backgroundColor: aceptaTerminos ? '#2D2E83' : '#f0f1f5', // Cambia el color de fondo a azul si el usuario ha aceptado los términos
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            justifyContent: 'center'
                                                        }}
                                                        onClick={() => setAceptaTerminos(!aceptaTerminos)} // Cambia el estado a 'true' si es 'false' y viceversa cuando el usuario hace clic en el div
                                                    >
                                                        {aceptaTerminos && <FaCheck color="white" />} {/* Muestra el icono de verificación si el usuario ha aceptado los términos */}
                                                    </div>
                                                    <p>Acepto el tratamiento de mis datos personales</p>
                                                </div>
                                                <div className="SigPQR">
                                                    <button onClick={irASiguiente}>Siguiente</button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}

                                    {!isOpen && (
                                        <Grid container className="MainFormCrearPQR">
                                            <div className="ContCrearSolMain">
                                                <div className="DescrAsunto">
                                                    <p>Asunto</p>
                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        name="asunto"
                                                        onChange={handleChange}
                                                        maxLength={90}
                                                        onInput={(e) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                            // Capitalizar la primera letra de cada palabra
                                                            e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                        }} />
                                                </div>

                                                <div className="DescripSoli">
                                                    <p>Descripción</p>
                                                    <textarea
                                                        name="descripcion"
                                                        onChange={handleChange}
                                                        maxLength={350}
                                                        onInput={(e) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                            // Capitalizar la primera letra de cada palabra
                                                            e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                        }} />

                                                </div>

                                                <div className="AdjArchSoli">
                                                    <div className="AdjArchSoliTitle">
                                                        <p>Adjuntar archivos</p>
                                                    </div>

                                                    <div className="AdjArchSoliIcons">
                                                        <div className="SubAdjArchSoliIcons">
                                                            <div>
                                                                <div>
                                                                    <input
                                                                        type="file"
                                                                        onChange={handleImagen}
                                                                        onClick={(e) => e.target.value = null} // Resetea el valor del input para poder seleccionar el mismo archivo 
                                                                        style={{ display: 'none' }}
                                                                        id="fileInput"
                                                                    />
                                                                    <label htmlFor="fileInput">
                                                                        {imagen ? (
                                                                            <img src={URL.createObjectURL(imagen.image)} alt="Previsualización" style={{ width: '100px', height: '100px' }} />
                                                                        ) : (
                                                                            <HiOutlineDocumentArrowUp />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {imagen && (
                                                                        <button onClick={() => setImagen(null)}>
                                                                            <IoClose />
                                                                        </button>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="EnviarPeticionPQR">
                                                    <button onClick={hacerPeticion}>Enviar</button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}
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
                                        <p className='PdialogContent'>Tu solicitud fue enviada con exito. Esta será revisada y procesada por nosotros, en un máximo de 15 días habiles te estaremos dando repuesta. <br /><br /> Número de petición: #{numeroPeticion}</p>
                                    </DialogContent>
                                    <DialogActions className='DialogActionsDatsGuardados'>
                                        <div className='div1buttonDialog' >
                                            <button className='button1DialogDatsGuardados' onClick={() => router.push({ pathname: '/' })} >
                                                Ir al inicio
                                            </button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                                <ModalMensajes
                                    shown={showModal}
                                    close={handleModalClose}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
