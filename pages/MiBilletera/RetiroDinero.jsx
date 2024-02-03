import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase, Autocomplete } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { URL_BD_MR } from "../../helpers/Constants";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import ModalMensajes from "../mensajes/ModalMensajes";

export default function RetiroDinero() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md')); //Consts measured, 80% and in md 100%.
    const irA = useRef(null);//PosiciónTopPage
    const [UidUser, setUidUser] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mostrarContenedor, setMostrarContenedor] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal
    // Estado de cuenta
    const [estadoCuenta, setEstadoCuenta] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [bancos, setBancos] = useState([]);
    const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
    const [tipoIdentificacion, setTipoIdentificacion] = useState("");
    const [selectedTipoIdentificacion, setSelectedTipoIdentificacion] = useState("tipo de identificación");
    const [errorNombreTitular, setErrorNombreTitular] = useState(false);
    // Estado para manejar el error en el campo "identificacion"
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);
    // Estado para manejar el error en el campo "numerodecuenta"
    const [errorNumeroDeCuenta, setErrorNumeroDeCuenta] = useState(false);
    // Estado para manejar el error en el campo "selectedTipoIdentificacion"
    const [errorTipoIdentificacion, setErrorTipoIdentificacion] = useState(false);
    // Estado para manejar el error en el campo "selectedEntidadBancaria"
    const [errorEntidadBancaria, setErrorEntidadBancaria] = useState(false);

    const [selectedEntidadBancaria, setSelectedEntidadBancaria] = useState("Seleccione banco");
    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
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

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };


    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    const CustomDropdownButton = React.forwardRef(({ children, onClick, href }, ref) => (
        <button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            href={href}
            className="DropDownTipoDocumentoBanco"
        >
            {children}
        </button>
    ));

    const CustomDropdownButtonBanco = React.forwardRef(({ children, onClick, href }, ref) => (
        <button
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            href={href}
            className="DropDownTipoDocumentoBanco"
        >
            {children}
        </button>
    ));


    //Botón de siguiente verificando el numero y el dinero del usuario
    const handleClick = () => {
        // Verificamos si el valor de la transferencia es mayor que 0 y no comienza con 0
        const valorTransferencia = parseInt(form.valortransferencia.replace(/,/g, ''));
        if (valorTransferencia <= 0 || form.valortransferencia.startsWith('0')) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('El valor de la transferencia debe ser mayor a 0');
            setShowModal(true);
            return; // Salimos de la función para no abrir el siguiente contenedor
        }

        // Verificamos si el valor de la transferencia es mayor que el saldo final
        if (valorTransferencia > estadoCuenta.saldofinal) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El valor de la transferencia no puede ser mayor al saldo de tu cuenta!');
            setShowModal(true);
            return; // Salimos de la función para no abrir el siguiente contenedor
        }

        // Si todo está bien, abrimos el siguiente contenedor
        setMostrarContenedor(true);
    };

    //Petición para ver estado de cuenta del usuario con su uid
    useEffect(() => {
        const EstadoCuentaUsuario = async () => {
            try {
                const res = await axios.post(`${URL_BD_MR}145`);
                const datosUsuario = res.data.listestadodecta.find(usuario => usuario.usuario === datosusuarios.uid);
                setEstadoCuenta(datosUsuario);
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
            }
        };
        EstadoCuentaUsuario();
    }, [datosusuarios]);

    //Petición para obtener datos de usuario loggeado
    useEffect(() => {
        const datosDeusuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUsuario(res.data[0]);
                setUidUser(res.data[0].uid)
            } catch (error) {
                console.error("Error al leer los datos del usuario a retirar", error);
                // Maneja el error según tus necesidades
            }
        };
        datosDeusuario();
    }, [datosusuarios]);


    //Params a envíar al endPoint
    const [form, setForm] = useState({
        nombretitular: '',
        tipoidentificacion: '',
        identificacion: '',
        entidadbancaria: '',
        numerodecuenta: '',
        valortransferencia: '0',
    });

    //función para obtener bancos
    useEffect(() => {
        const obtenerBancos = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}157`,
                });
                if (Array.isArray(res.data.listarbancos)) {
                    setBancos(res.data.listarbancos);
                } else {
                    console.error("Error: se esperaba un array, pero se recibió", res.data.listarbancos);
                }
            } catch (error) {
                console.error("Error al obtener los bancos", error);
            }
        };
        obtenerBancos();
    }, []);


    //función para obtener tipos de identificación
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

    //función para ponerle "," a valor
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    //Función para eliminar "," a la hora de envíar
    const handleChangeValorTransferencia = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, "");
        setForm({
            ...form,
            valortransferencia: formatNumber(value),
        });
    };

    //Función para handles de form para hacer retiro 
    const handleChangeRetiro = (e) => {
        const { name, value } = e.target;

        // Actualiza el valor del campo
        setForm(prevState => ({ ...prevState, [name]: value }));

        // Verifica el campo "nombretitular"
        if (name === 'nombretitular') {
            if (!value) {
                setErrorNombreTitular(true);
            } else {
                setErrorNombreTitular(false);
            }
        }

        // Verifica el campo "identificacion"
        if (name === 'identificacion') {
            if (!value || value.length < 6) {
                setErrorIdentificacion(true);
            } else {
                setErrorIdentificacion(false);
            }
        }

        // Verifica el campo "numerodecuenta"
        if (name === 'numerodecuenta') {
            if (!value || value.length < 6) {
                setErrorNumeroDeCuenta(true);
            } else {
                setErrorNumeroDeCuenta(false);
            }
        }

    };

    //petición para hacer el retiro del usuario
    const validarFormulario = () => {
        // Verificamos si algún campo está vacío
        for (let campo in form) {
            if (form[campo] === '') {
                setTituloMensajes('¡Cuidado!');
                setTextoMensajes('Todos los campos deben estar llenos para poder enviar la petición.');
                setShowModal(true);
                return false; // Salimos de la función para no enviar la petición
            }
        }

        // Verificamos si el número de identificación y el número de cuenta tienen al menos 6 caracteres
        if (form.identificacion.length < 6 || form.numerodecuenta.length < 6) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El número de identificación y el número de cuenta deben tener al menos 6 caracteres.');
            setShowModal(true);
            return false; // Salimos de la función para no enviar la petición
        }

        // Verificamos si el valor de la transferencia es 0 o comienza con 0
        const valorTransferencia = parseInt(form.valortransferencia.replace(/,/g, ''));
        if (valorTransferencia <= 0 || form.valortransferencia.startsWith('0')) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El valor de la transferencia debe ser mayor que 0 y no puede comenzar con 0.');
            setShowModal(true);
            return false; // Salimos de la función para no enviar la petición
        }

        // Verificamos si el valor de la transferencia es mayor que el saldo final
        if (valorTransferencia > estadoCuenta.saldofinal) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('El valor de la transferencia no puede ser mayor al saldo de tu cuenta!');
            setShowModal(true);
            return false; // Salimos de la función para no enviar la petición
        }

        // Si todas las validaciones pasan, retornamos true
        return true;
    };

    // Función para hacer la petición a la API
    const enviarPeticion = async (params) => {
        try {
            const res = await axios({
                method: "post",
                url: `${URL_BD_MR}154`,
                params,
            });
            console.log("Respuesta del servidor petición retiro:", res.data); // Aquí agregamos el console.log

            // Si la petición se completa con éxito, abrimos el dialog
            handleOpenDialog();
        } catch (error) {
            console.error("Error al enviar petición a retirar", error);
        }
    };

    const hacerPeticionRetiro = async () => {
        // Inicializamos una variable para verificar si el formulario es válido
        let esFormularioValido = true;
    
        // Verificamos si el campo "nombretitular" está vacío
        if (!form.nombretitular) {
            setErrorNombreTitular(true);
            esFormularioValido = false;
        } else {
            setErrorNombreTitular(false);
        }
    
        // Verificamos si el campo "identificacion" está vacío o tiene menos de 6 caracteres
        if (!form.identificacion || form.identificacion.length < 6) {
            setErrorIdentificacion(true);
            esFormularioValido = false;
        } else {
            setErrorIdentificacion(false);
        }
    
        // Verificamos si el campo "numerodecuenta" está vacío o tiene menos de 6 caracteres
        if (!form.numerodecuenta || form.numerodecuenta.length < 6) {
            setErrorNumeroDeCuenta(true);
            esFormularioValido = false;
        } else {
            setErrorNumeroDeCuenta(false);
        }
    
        // Verificamos si el campo "selectedTipoIdentificacion" está vacío o es "tipo de identificación"
        if (!selectedTipoIdentificacion || selectedTipoIdentificacion === "tipo de identificación") {
            setErrorTipoIdentificacion(true);
            esFormularioValido = false;
        } else {
            setErrorTipoIdentificacion(false);
        }
    
        // Verificamos si el campo "selectedEntidadBancaria" está vacío o es "Seleccione banco"
        if (!selectedEntidadBancaria || selectedEntidadBancaria === "Seleccione banco") {
            setErrorEntidadBancaria(true);
            esFormularioValido = false;
        } else {
            setErrorEntidadBancaria(false);
        }
    
        // Si el formulario no es válido, mostramos el modal y salimos de la función para no enviar la petición
        if (!esFormularioValido) {
            setTituloMensajes('¡Cuidado!');
            setTextoMensajes('Por favor, asegúrate de llenar todos los campos correctamente antes de enviar el formulario.');
            setShowModal(true);
            return;
        }
    
        // Si el formulario es válido, procedemos a hacer la petición
        let params = {
            usuario: datosusuarios.uid,
            estado: 72,
            ...form,
            valortransferencia: form.valortransferencia.replace(/,/g, ''), // Eliminamos las comas
        };
        console.log("Parámetros enviados a retirar: ", params);
    
        // Llamamos a la función para enviar la petición
        enviarPeticion(params);
    };


    //Estilos a arreglar

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            fontSize: '18px', // Tamaño de fuente de 18px
            color: '#2D2E83', // Color de letra
            fontFamily: '"Jost", sans-serif', // Fuente
            fontWeight: '500', // Grosor de la fuente
            backgroundColor: '#f0f1f5', // Color de fondo 
            marginLeft: '.2rem',
            marginTop: '1px',
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
    };



    const handleSelectTipoIdentificacion = (value, nombre) => {
        setSelectedTipoIdentificacion(nombre);
        setForm({ ...form, tipoidentificacion: value });

        // Verificamos si el campo "selectedTipoIdentificacion" está vacío o es "tipo de identificación"
        if (!nombre || nombre === "tipo de identificación") {
            setErrorTipoIdentificacion(true);
        } else {
            setErrorTipoIdentificacion(false);
        }
    };

    const handleSelectEntidadBancaria = (value, nombre) => {
        setSelectedEntidadBancaria(nombre);
        setForm({ ...form, entidadbancaria: value });

        // Verificamos si el campo "selectedEntidadBancaria" está vacío o es "Seleccione banco"
        if (!nombre || nombre === "Seleccione banco") {
            setErrorEntidadBancaria(true);
        } else {
            setErrorEntidadBancaria(false);
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
                                        <p>Solicitar retiro de dinero</p>
                                    </div>
                                </Grid>
                                <div className="contMainBilletera">
                                    <div className="saldoBilletera">
                                        <div className="saldoBilleteraLeft">
                                            <h3>Saldo que deseas retirar</h3>
                                            <div>
                                                <p>$</p>
                                                <TextField
                                                    value={form.valortransferencia}
                                                    onChange={handleChangeValorTransferencia}
                                                    sx={textFieldStyles}
                                                />
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

                                                {datosUsuario ? (
                                                    <div className="MiddleContMovimientos">
                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Nombre del titular de la cuenta</p>
                                                            <div>
                                                                <input
                                                                    autoComplete="off"
                                                                    name="nombretitular"
                                                                    type="text"
                                                                    value={form.nombretitular}
                                                                    onChange={handleChangeRetiro}
                                                                    onClick={() => setErrorNombreTitular(false)}
                                                                    style={errorNombreTitular ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                                    placeholder="Nombre del titular"
                                                                    maxLength={50}
                                                                    onInput={(e) => {
                                                                        // Permitir solo letras y espacios
                                                                        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                                                                        // Capitalizar la primera letra de cada palabra
                                                                        e.target.value = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                                                    }}
                                                                />
                                                                {errorNombreTitular && <div className="ErrorRetitorText"> <p>Ingresa un nombre valido!</p></div>}
                                                            </div>

                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Tipo de documento del titular de la cuenta</p>
                                                            <div>
                                                                <Dropdown
                                                                    style={errorTipoIdentificacion ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px' }}
                                                                    onClick={() => setErrorTipoIdentificacion(false)}
                                                                >
                                                                    <Dropdown.Toggle as={CustomDropdownButton} id="dropdown-basic">
                                                                        {selectedTipoIdentificacion}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="tamañocajaoDropDownBanco">
                                                                        {tipoIdentificacion && tipoIdentificacion.map((tipo) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownBanco"
                                                                                onClick={() => handleSelectTipoIdentificacion(tipo.id, `${tipo.tipoidentificacion}`)}
                                                                            >
                                                                                {`${tipo.descripcion}`}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                {errorTipoIdentificacion && <div className="ErrorRetitorTextDos"> <p>Recuerda, debes elegir un tipo de identificación</p></div>}
                                                            </div>
                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Numero de documento del titular de la cuenta</p>
                                                            <div>
                                                                <input
                                                                    autoComplete="off"
                                                                    name="identificacion"
                                                                    type="text"
                                                                    maxLength={16}
                                                                    value={form.identificacion}
                                                                    onChange={handleChangeRetiro}
                                                                    onClick={() => setErrorIdentificacion(false)}
                                                                    style={errorIdentificacion ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                                    placeholder="Número de identificación"
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {errorIdentificacion && <div className="ErrorRetitorText"> <p>Recuerda, El documento debe contener solo números, longitud minima de 6 y maximo de 10</p></div>}
                                                            </div>
                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Entidad Bancaria</p>
                                                            <div>
                                                                <Dropdown
                                                                    style={errorEntidadBancaria ? { border: '1px solid red', borderRadius: '10px', width: '230px' } : { width: '230px'}}
                                                                    onClick={() => setErrorEntidadBancaria(false)}
                                                                >
                                                                    <Dropdown.Toggle as={CustomDropdownButtonBanco} id="dropdown-basic">
                                                                        {selectedEntidadBancaria}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu className="tamañocajaoDropDownBanco"  style={{ maxHeight: '280px', overflowY: 'auto' }}>
                                                                        {bancos && bancos.map((banco) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownBanco"
                                                                                onClick={() => handleSelectEntidadBancaria(banco.codigo, `${banco.nombre}`)}
                                                                            >
                                                                                {`${banco.nombre}`}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                {errorEntidadBancaria && <div className="ErrorRetitorTextDos"> <p>Recuerda, debes elegir un banco</p></div>}
                                                            </div>
                                                        </div>

                                                        <div className="DataMiddleContMovimientos">
                                                            <p>Numero de cuenta</p>
                                                            <div>
                                                                <input
                                                                    autoComplete="off"
                                                                    name="numerodecuenta"
                                                                    type="text"
                                                                    maxLength={16}
                                                                    value={form.numerodecuenta}
                                                                    onChange={handleChangeRetiro}
                                                                    onClick={() => setErrorNumeroDeCuenta(false)}
                                                                    style={errorNumeroDeCuenta ? { border: '1px solid red', textAlign: 'center', borderRadius: '10px' } : {}}
                                                                    placeholder="Número de cuenta"
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {errorNumeroDeCuenta && <div className="ErrorRetitorText"> <p>Porfavor, ingresa un número de cuenta bancaria valido!</p></div>}
                                                            </div>

                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p>No se encontraron datos del usuario.</p>
                                                )}


                                            </div>

                                            <div className="SendSolicitudb">
                                                <button onClick={hacerPeticionRetiro}>Enviar solicitud</button>
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
    )
}