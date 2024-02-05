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


    const [contadorAsunto, setContadorAsunto] = useState(0);
    const [contadorDescripcion, setContadorDescripcion] = useState(0);
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
    const [imagen, setImagen] = useState(null);
    const [nombreImagen, setNombreImagen] = useState("");
    const [aceptaTerminos, setAceptaTerminos] = useState(false); // Estado para saber si el usuario ha aceptado los términos
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numeroPeticion, setNumeroPeticion] = useState(null);
    const [errorNombres, setErrorNombres] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorApellidos, setErrorApellidos] = useState(false);
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);
    const [errorBarrio, setErrorBarrio] = useState(false);
    const [errorCiudad, setErrorCiudad] = useState(false);
    const [errorTipoIdentificacion, setErrorTipoIdentificacion] = useState(false);
    const [errorMotivo, setErrorMotivo] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorAceptaTerminos, setErrorAceptaTerminos] = useState(false);
    const [errorAsunto, setErrorAsunto] = useState(false);
    const [errorDescripcion, setErrorDescripcion] = useState(false);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [imagen2, setImagen2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);
    const [imagen3, setImagen3] = useState(null);
    const [showAll, setShowAll] = useState(false);

    //abrir o cerrar ver más en recomendaciones de archivos
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    //abrir dialog de confirmación de envío
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //Handle dropdown tipo ident
    const handleSelectTipoIdentificacion = (value, nombre) => {
        setSelectedTipoIdentificacion(nombre);
        setForm({ ...form, tipoidentificacion: value });

        if (nombre === "Seleccione tipo de identificación") {
            setErrorTipoIdentificacion(true);
        } else {
            setErrorTipoIdentificacion(false);
        }
    };

    //Handle dropdown motivo
    const handleSelectMotivo = (value, nombre) => {
        setSelectedMotivo(nombre);
        setForm({ ...form, motivo: value });

        if (nombre === "Seleccione el motivo") {
            setErrorMotivo(true);
        } else {
            setErrorMotivo(false);
        }
    };

    //Handle dropdown ciudad
    const handleSelectCiudad = (value, nombre) => {
        setSelectedCiudad(nombre);
        setForm({ ...form, ciudad: value });

        if (nombre === "Seleccione la ciudad") {
            setErrorCiudad(true);
        } else {
            setErrorCiudad(false);
        }
    };

    //Función para leer ciudades
    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );

    //Función para handle De imagen 1
    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (!file) {
            // No se seleccionó ningún archivo
            return;
        }

        // Verifica el tamaño del archivo (no debe ser mayor a 800 KB)
        if (file.size > 800 * 1024) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('La imagen no puede pesar más de 800kb.');
            setShowModal(true);
            return;
        }

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = function () {
            // Verifica el tamaño de la imagen (no debe ser mayor a 1024*1024)
            if (this.width > 1024 || this.height > 1024) {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('La imagen no puede ser mayor de 1024*1024.');
                setShowModal(true);
                URL.revokeObjectURL(url);
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
                setSelectedImage(image);
                setImagen({ image: file, nombreImagen }); // Guarda el objeto File y el nombre de la imagen
            };
            reader.readAsDataURL(file);
        };
        img.src = url;
    };

    //handle para segunda imagen
    const handleImagen2 = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        // Verifica el tamaño del archivo (no debe ser mayor a 800 KB)
        if (file.size > 800 * 1024) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('La imagen no puede pesar más de 800kb.');
            setShowModal(true);
            return;
        }

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = function () {
            // Verifica el tamaño de la imagen (no debe ser mayor a 1024*1024)
            if (this.width > 1024 || this.height > 1024) {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('La imagen no puede ser mayor de 1024*1024.');
                setShowModal(true);
                URL.revokeObjectURL(url);
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
                setSelectedImage2(image);
                setImagen2({ image: file, nombreImagen });
            };
            reader.readAsDataURL(file);
        };
        img.src = url;
    };

    //handle para tercera imagen
    const handleImagen3 = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        // Verifica el tamaño del archivo (no debe ser mayor a 800 KB)
        if (file.size > 800 * 1024) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('La imagen no puede pesar más de 800kb.');
            setShowModal(true);
            return;
        }

        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = function () {
            // Verifica el tamaño de la imagen (no debe ser mayor a 1024*1024)
            if (this.width > 1024 || this.height > 1024) {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('La imagen no puede ser mayor de 1024*1024.');
                setShowModal(true);
                URL.revokeObjectURL(url);
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
                setSelectedImage3(image);
                setImagen3({ image: file, nombreImagen });
            };
            reader.readAsDataURL(file);
        };
        img.src = url;
    };

    //Verifica los datos antes de pasar a siguiente
    const verificarDatos = () => {
        let isValid = true;
        // Verificar que los campos "nombres" y "apellidos" no estén vacíos
        if (!form.nombres) {
            setErrorNombres(true);
            isValid = false;
        } else {
            setErrorNombres(false);
        }

        // Verificar que los campos "nombres" y "apellidos" no estén vacíos
        if (!form.apellidos) {
            setErrorApellidos(true);
            isValid = false;
        } else {
            setErrorApellidos(false);
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!form.email || !regexEmail.test(form.email)) {
            setErrorEmail(true);
            isValid = false;
        } else {
            setErrorEmail(false);
        }

        // Verificar que el campo "identificacion" no esté vacío y tenga al menos 6 caracteres
        if (!form.identificacion || form.identificacion.length < 6) {
            setErrorIdentificacion(true);
            isValid = false;
        } else {
            setErrorIdentificacion(false);
        }

        // Verificar que el campo "telefono" no esté vacío y tenga exactamente 10 caracteres
        if (!form.telefono || form.telefono.length !== 10) {
            setErrorTelefono(true);
            isValid = false;
        } else {
            setErrorTelefono(false);
        }

        // Verificar que el campo "direccion" no esté vacío
        if (!form.direccion) {
            setErrorDireccion(true);
            isValid = false;
        } else {
            setErrorDireccion(false);
        }

        // Verificar que el campo "barrio" no esté vacío y solo contenga letras
        const regexBarrio = /^[a-zA-Z\s]*$/;
        if (!form.barrio || !regexBarrio.test(form.barrio)) {
            setErrorBarrio(true);
            isValid = false;
        } else {
            setErrorBarrio(false);
        }

        if (selectedCiudad === "Seleccione la ciudad") {
            setErrorCiudad(true);
            isValid = false;
        } else {
            setErrorCiudad(false);
        }

        // Verificar que se haya seleccionado un "Tipo de documento"
        if (selectedTipoIdentificacion === "Seleccione tipo de identificación") {
            setErrorTipoIdentificacion(true);
            isValid = false;
        } else {
            setErrorTipoIdentificacion(false);
        }

        // Verificar que se haya seleccionado un "Motivo"
        if (selectedMotivo === "Seleccione el motivo") {
            setErrorMotivo(true);
            isValid = false;
        } else {
            setErrorMotivo(false);
        }
        // Si todos los controles pasan, retorna "true"
        return isValid; // Devuelve el valor actual de isValid
    };

    //Verificación de asunto y descripción antes de envíar
    const verificarAsuntoDescripcion = () => {
        // Verificar que el campo "asunto" no esté vacío, solo contenga letras y no esté completamente lleno
        const regexTexto = /^[a-zA-Z\s]*$/;
        if (!form.asunto || !regexTexto.test(form.asunto) || form.asunto.length === 100) {
            setErrorAsunto(true);
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, ingresa un asunto válido.');
            setShowModal(true);
            return false; // Detiene la ejecución de la función y retorna "false"
        } else {
            setErrorAsunto(false);
        }

        // Verificar que el campo "descripcion" no esté vacío, solo contenga letras y no esté completamente lleno 
        if (!form.descripcion || !regexTexto.test(form.descripcion) || form.descripcion.length === 500) {
            setErrorDescripcion(true);
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, ingresa una descripción válida.');
            setShowModal(true);
            return false; // Detiene la ejecución de la función y retorna "false"
        } else {
            setErrorDescripcion(false);
        }

        // Si todos los controles pasan, retorna "true"
        return true;
    };

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
            setErrorAceptaTerminos(true);
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, acepta los términos y condiciones.');
            setShowModal(true);
            return; // Detiene la ejecución de la función
        } else {
            setErrorAceptaTerminos(false);
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
        estado: 72,
    });

    //Handlechange de los campos de inputs y textArea del form
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualiza el valor del campo
        setForm(prevState => ({ ...prevState, [name]: value }));

        // Verifica el campo "nombres"
        if (name === 'nombres') {
            if (!value) {
                setErrorNombres(true);
            } else {
                setErrorNombres(false);
            }
        }

        // Verifica el campo "email"
        if (name === 'email') {
            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!value || !regexEmail.test(value)) {
                setErrorEmail(true);
            } else {
                setErrorEmail(false);
            }
        }

        if (name === 'apellidos') {
            if (!value) {
                setErrorApellidos(true);
            } else {
                setErrorApellidos(false);
            }
        }

        if (name === 'identificacion') {
            if (!value || value.length < 6) {
                setErrorIdentificacion(true);
            } else {
                setErrorIdentificacion(false);
            }
        }

        if (name === 'telefono') {
            if (!value || value.length !== 10) {
                setErrorTelefono(true);
            } else {
                setErrorTelefono(false);
            }
        }

        if (name === 'direccion') {
            if (!value) {
                setErrorDireccion(true);
            } else {
                setErrorDireccion(false);
            }
        }

        if (name === 'barrio') {
            const regexBarrio = /^[a-zA-Z\s]*$/;
            if (!value || !regexBarrio.test(value)) {
                setErrorBarrio(true);
            } else {
                setErrorBarrio(false);
            }
        }

        if (name === 'asunto') {
            const regexTexto = /^[a-zA-Z\s]*$/;
            if (!value || !regexTexto.test(value) || value.length === 100) {
                setErrorAsunto(true);
            } else {
                setErrorAsunto(false);
            }
            setContadorAsunto(value.length);
        }

        if (name === 'descripcion') {
            const regexTexto = /^[a-zA-Z\s]*$/;
            if (!value || !regexTexto.test(value) || value.length === 500) {
                setErrorDescripcion(true);
            } else {
                setErrorDescripcion(false);
            }
            setContadorDescripcion(value.length)
        }
    };

    //Función para hacer petición
    const hacerPeticion = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // Verifica que los datos estén correctos antes de proceder
        if (!verificarDatos() || !verificarAsuntoDescripcion()) return;

        // Verifica que todas las imágenes se hayan cargado
        if (!imagen) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, debes cargar almenos una imagen antes de enviar la petición.');
            setShowModal(true);
            return; // Detiene la ejecución de la función
        }

        let numeroImagenes = 0; // Inicializa el contador de imágenes

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

        //Condicionales para reconocer la longitud de las imagenes
        if (imagen) {
            formData.append("nombreimagen1", imagen.nombreImagen);
            formData.append("imagen1", selectedImage);
            numeroImagenes++; // Incrementa el contador de imágenes
        }
        if (imagen2) {
            formData.append("nombreimagen2", imagen2.nombreImagen);
            formData.append("imagen2", selectedImage2);
            numeroImagenes++; // Incrementa el contador de imágenes
        }
        if (imagen3) {
            formData.append("nombreimagen3", imagen3.nombreImagen);
            formData.append("imagen3", selectedImage3);
            numeroImagenes++; // Incrementa el contador de imágenes
        }

        formData.append("numeroimagenes", numeroImagenes); // contador de imágenes
        console.log("Número de imágenes:", numeroImagenes); // Muestra el número de imágenes en la consola

        // Muestra los nombres de las imágenes en la consola
        console.log("Nombre imagen 1:", imagen ? imagen.nombreImagen : 'No hay imagen 1');
        console.log("Nombre imagen 2:", imagen2 ? imagen2.nombreImagen : 'No hay imagen 2');
        console.log("Nombre imagen 3:", imagen3 ? imagen3.nombreImagen : 'No hay imagen 3');
        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}151`,
                data: formData,
            });
            console.log("Datos enviados:", formData);
            console.log("Respuesta del servidor:", res.data);

            // Obténgo el número total de PQRs existentes después de enviar la nueva petición
            const resPQRs = await axios.post(`${URL_BD_MR}152`);
            setNumeroPeticion(resPQRs.data.listarpqr.length);  // Actualiza numeroPeticion para mostrar al usuario el numero de su PQR

            //abro dialog para mostrar al usuario el numero de peticion de su PQR
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
                                                        <div>
                                                            <input type="text"
                                                                name="nombres"
                                                                id=""
                                                                onChange={handleChange}
                                                                onClick={() => setErrorNombres(false)}
                                                                style={errorNombres ? { border: '1px solid red' } : {}}
                                                                maxLength={20}
                                                                onInput={(e) => {
                                                                    // Permitir solo letras y espacios
                                                                    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                    // Capitalizar la primera letra de cada palabra
                                                                    e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                                }}
                                                            />
                                                            {errorNombres && <div className="errorInputPQR"> <span>Ingresa un nombre valido!</span></div>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p>Tipo de documento</p>
                                                        <div>
                                                            <Dropdown style={errorTipoIdentificacion ? { border: '1px solid red', borderRadius: '10px', width: '100%' } : { borderRadius: '10px', width: '100%' }} onClick={() => setErrorTipoIdentificacion(false)}>
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
                                                            {errorTipoIdentificacion && <div className="errorInputPQRS"> <span style={{ marginTop: '-1.8rem', marginBottom: '2rem' }}>Recuerda, debes elegir un tipo de identificación</span></div>}
                                                        </div>

                                                    </div>
                                                    <div style={{ marginTop: '-2rem' }}>
                                                        <p>Correo electrónico</p>
                                                        <div>
                                                            <input
                                                                autoComplete={Math.random().toString()}
                                                                name="email"
                                                                type="text"
                                                                onChange={handleChange}
                                                                onClick={() => setErrorEmail(false)}
                                                                style={errorEmail ? { border: '1px solid red' } : {}}
                                                            />
                                                            {errorEmail && <div className="errorInputPQR"> <span>Ingresa un email valido! Ej: juan@gmail.com</span></div>}
                                                        </div>

                                                    </div>
                                                    <div >
                                                        <p>Ciudad</p>
                                                        <div>
                                                            <Dropdown style={errorCiudad ? { border: '1px solid red', borderRadius: '10px', width: '100%' } : { borderRadius: '10px', width: '100%' }} onClick={() => setErrorCiudad(false)}>
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
                                                            {errorCiudad && <div className="errorInputPQRS"> <span>Recuerda, debes elegir una ciudad</span></div>}
                                                        </div>

                                                    </div>
                                                    <div style={{ marginTop: '-2rem' }}>
                                                        <p>Barrio</p>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="barrio"
                                                                onChange={handleChange}
                                                                onClick={() => setErrorBarrio(false)}
                                                                style={errorBarrio ? { border: '1px solid red' } : {}}
                                                                autoComplete={Math.random().toString()}
                                                                maxLength={20}
                                                            />
                                                            {errorIdentificacion && <div className="errorInputPQR"> <span>Recuerda, debes elegir un barrio valido</span></div>}
                                                        </div>

                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="InputsContainerPQR">
                                                    <div>
                                                        <p>Apellidos</p>
                                                        <div>
                                                            <input type="text"
                                                                name="apellidos" id=""
                                                                onClick={() => setErrorApellidos(false)}
                                                                style={errorApellidos ? { border: '1px solid red' } : {}}
                                                                onChange={handleChange}
                                                                maxLength={20}
                                                                onInput={(e) => {
                                                                    // Permitir solo letras y espacios
                                                                    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                    // Capitalizar la primera letra de cada palabra
                                                                    e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                                }}
                                                            />
                                                            {errorApellidos && <div className="errorInputPQR"> <span>Ingresa un apellido valido!</span></div>}
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <p>Numero de documento</p>
                                                        <div>
                                                            <input
                                                                autoComplete="off"
                                                                name="identificacion"
                                                                type="text"
                                                                onChange={handleChange}
                                                                onClick={() => setErrorIdentificacion(false)}
                                                                style={errorIdentificacion ? { border: '1px solid red' } : {}}
                                                                maxLength={10}
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                            {errorIdentificacion && <div className="errorInputPQR"> <span>Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10</span></div>}
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <p>Numero de contacto</p>
                                                        <div>
                                                            <input
                                                                autoComplete="off"
                                                                type="text"
                                                                name="telefono"
                                                                onChange={handleChange}
                                                                onClick={() => setErrorTelefono(false)}
                                                                style={errorTelefono ? { border: '1px solid red' } : {}}
                                                                maxLength={10}
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                            {errorTelefono && <div className="errorInputPQR"> <span>Recuerda, El teléfono de contacto debe contener 10 digitos</span></div>}
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <p>Dirección</p>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="direccion"
                                                                onChange={handleChange}
                                                                onClick={() => setErrorDireccion(false)}
                                                                style={errorDireccion ? { border: '1px solid red' } : {}}
                                                                autoComplete={Math.random().toString()}
                                                                maxLength={30}
                                                            />
                                                            {errorDireccion && <div className="errorInputPQR"> <span>Ingresa una dirección valida! Ej: CLL 40 # 22...</span></div>}
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <p>Motivo</p>
                                                        <div>
                                                            <Dropdown style={errorMotivo ? { border: '1px solid red', borderRadius: '10px', width: '100%' } : { borderRadius: '10px', width: '100%' }} onClick={() => setErrorMotivo(false)}>
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
                                                            {errorMotivo && <div className="errorInputPQRS"> <span>Recuerda, debes elegir el motivo de la petición</span></div>}
                                                        </div>

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
                                                        onClick={() => {
                                                            setAceptaTerminos(!aceptaTerminos);
                                                            setErrorAceptaTerminos(false); // Restablece errorAceptaTerminos a 'false' cuando el usuario hace clic en el div
                                                        }}
                                                    >
                                                        {aceptaTerminos && <FaCheck color="white" />} {/* Muestra el icono de verificación si el usuario ha aceptado los términos */}
                                                    </div>
                                                    <p
                                                        onClick={() => {
                                                            setAceptaTerminos(!aceptaTerminos);
                                                            setErrorAceptaTerminos(false); // Restablece errorAceptaTerminos a 'false' cuando el usuario hace clic en el p
                                                        }}
                                                        style={errorAceptaTerminos ? { textDecoration: 'underline', textDecorationColor: 'red' } : {}}
                                                    >
                                                        Acepto el tratamiento de mis datos personales
                                                    </p>
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
                                                    <textarea
                                                        autoComplete="off"
                                                        type="text"
                                                        name="asunto"
                                                        onChange={handleChange}
                                                        onClick={() => setErrorAsunto(false)}
                                                        style={errorAsunto ? { border: '1px solid red' } : {}}
                                                        maxLength={90}
                                                        onInput={(e) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                            // Capitalizar la primera letra de cada palabra
                                                            e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                        }}
                                                    />
                                                    <div className="contPQR">
                                                        <p>{contadorAsunto}/90</p>
                                                    </div>
                                                </div>

                                                <div className="DescripSoli">
                                                    <p>Descripción</p>
                                                    <textarea
                                                        name="descripcion"
                                                        onChange={handleChange}
                                                        onClick={() => setErrorDescripcion(false)}
                                                        style={errorDescripcion ? { border: '1px solid red' } : {}}
                                                        maxLength={400}
                                                        onInput={(e) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                            // Capitalizar la primera letra de cada palabra
                                                            e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                        }}
                                                    />
                                                    <div className="contPQR">
                                                        <p>{contadorDescripcion}/400</p>
                                                    </div>
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
                                                                            <HiOutlineDocumentArrowUp className="InputIconPQR" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {imagen && (
                                                                        <button onClick={() => {
                                                                            setImagen(null);
                                                                            setImagen2(null);
                                                                            setImagen3(null);
                                                                        }}>
                                                                            <IoClose className="deleteImgPQR" />
                                                                        </button>
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <div>
                                                                    <input
                                                                        type="file"
                                                                        onChange={handleImagen2} // Usa la función handleImagen2 para la segunda imagen
                                                                        onClick={(e) => e.target.value = null} // Resetea el valor del input para poder seleccionar el mismo archivo 
                                                                        style={{ display: 'none' }}
                                                                        disabled={!imagen}
                                                                        id="fileInput2" // Cambia el id para diferenciarlo del primer input
                                                                    />
                                                                    <label htmlFor="fileInput2"> {/* Asegúrate de cambiar el htmlFor al nuevo id */}
                                                                        {imagen2 ? ( // Usa imagen2 en lugar de imagen
                                                                            <img src={URL.createObjectURL(imagen2.image)} alt="Previsualización" style={{ width: '100px', height: '100px' }} />
                                                                        ) : (
                                                                            <HiOutlineDocumentArrowUp className="InputIconPQR" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {imagen2 && (
                                                                        <button onClick={() => {
                                                                            setImagen2(null);
                                                                            setImagen3(null);
                                                                        }}>
                                                                            <IoClose className="deleteImgPQR" />
                                                                        </button>
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <div>
                                                                    <input
                                                                        type="file"
                                                                        onChange={handleImagen3} // Usa la función handleImagen3 para la tercera imagen
                                                                        onClick={(e) => e.target.value = null} // Resetea el valor del input para poder seleccionar el mismo archivo 
                                                                        style={{ display: 'none' }}
                                                                        disabled={!imagen2} // Deshabilita el input si no hay imagen en el input de la imagen 2
                                                                        id="fileInput3" // Cambia el id para diferenciarlo del segundo input
                                                                    />
                                                                    <label htmlFor="fileInput3"> {/* Asegúrate de cambiar el htmlFor al nuevo id */}
                                                                        {imagen3 ? ( // Usa imagen3 en lugar de imagen
                                                                            <img src={URL.createObjectURL(imagen3.image)} alt="Previsualización" style={{ width: '100px', height: '100px' }} />
                                                                        ) : (
                                                                            <HiOutlineDocumentArrowUp className="InputIconPQR" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {imagen3 && ( // Usa imagen3 en lugar de imagen
                                                                        <button onClick={() => setImagen3(null)}> {/* Usa setImagen3 para resetear la tercera imagen */}
                                                                            <IoClose className="deleteImgPQR" />
                                                                        </button>
                                                                    )}
                                                                </span>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="recomendacionesArchivosPQR">
                                                    {showAll ? (
                                                        <>

                                                            <p>- Debes agregar como mínimo un(1) archivo y como máximo tres(3)</p>
                                                            <p>- El tamaño máximo de las imágenes es 1024 x 1024</p>
                                                            <p>- La proporción de las imágenes debe ser de 4:3, <br /> es decir 4 unidades de alto por 3 de ancho</p>
                                                            <p>- Cada imagen debe pesar máximo 800KB</p>
                                                            <p>- Cada pdf debe pesar máximo 800KB</p>
                                                            <p>- Tus archivos deben ser en formato jpg, jpeg, png o pdf</p>
                                                            <p>- Las imágenes deben ser cuadradas, óptimo 1024 x 1024</p>
                                                            <p>- Las imágenes deben llenar al menos el 85% o más del marco de la imagen</p>
                                                            <p>- La imagen debe estar enfocada</p>
                                                            <p>- No incluir datos de teléfonos</p>
                                                            <p>- No incluir datos de contactos</p>
                                                            <p>- Las imágenes deben ser nítidas</p>
                                                            <div className="buttonRecArchivos">
                                                                <button onClick={toggleShowAll}>Ver menos...</button>
                                                            </div>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>**Ten en cuenta que:</p>
                                                            <p>- Debes agregar como mínimo un(1) archivo y como máximo tres(3)</p>
                                                            <p>- El tamaño máximo de las imágenes es 1024 x 1024</p>
                                                            <p>- La proporción de las imágenes debe ser de 4:3, <br /> es decir 4 unidades de alto por 3 de ancho</p>
                                                            <p>- Cada imagen debe pesar máximo 800KB</p>
                                                            <p>- Tus archivos deben ser en formato jpg, jpeg, png o pdf</p>
                                                            <div className="buttonRecArchivos">
                                                                <button onClick={toggleShowAll}>Ver más...</button>
                                                            </div>

                                                        </>
                                                    )}
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
                                            border: '1px solid gray',
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
