import Container from "../../components/layouts/Container";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import { URL_IMAGES_RESULTSSMS } from "../../helpers/Constants";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";

export default function index() {

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const irA = useRef(null); //PosiciónTopPage
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [subcategorias, setSubcategorias] = useState(null);
    const [subcategoriasFiltradas, setSubcategoriasFiltradas] = useState([]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };


    useEffect(() => {
        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138",
                });
                // Filtramos las subcategorías con id_categorias igual a 1
                const subcategoria1 = res.data.listsubcategorias.filter(subcategoria => subcategoria.id_categorias === 1);
                console.log("Subcategorías filtradas con id_categoria 1:", subcategoria1);
                // Almacenamos las subcategorías filtradas en el nuevo estado
                setSubcategoriasFiltradas(subcategoria1);
                setSubcategorias(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las subcategorías", error);
            }
        };
        leerSubcategorias();
    }, []);


    const actualizarSubcategoria = async (id, nombre, descripcion) => {
        if (!nombre || !descripcion) {
            alert('Por favor, no dejes ningún campo vacío.');
            return;
        }

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "139",
                params: {
                    id,
                    nombre,
                    descripcion
                }
            });
            console.log('Actualización exitosa:', res);
            alert('Actualización exitosa!');
        } catch (error) {
            console.error('Error al actualizar la subcategoría', error);
            alert('Error al actualizar la subcategoría');
        }
    };



    // Definimos el estado para la imagen, el nombre de la imagen y las imágenes de vista previa
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [previewImages, setPreviewImages] = useState({});
    const [imagenesSubcategorias, setImagenesSubcategorias] = useState([]);


    // Manejamos la carga de la imagen
    const handleImagen = (e, id) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            const extension =
                "." +
                reader.result.substring(
                    reader.result.indexOf("/") + 1,
                    reader.result.indexOf(";base64")
                );
            setImageName(shortid.generate().substring(0, 11) + extension);
            setPreviewImages(prevState => ({
                ...prevState,
                [id]: URL.createObjectURL(file)
            }));
        };
        reader.readAsDataURL(file);
    };

    // Enviamos la imagen al servidor
    const handleCrearImagen = async (id_subcategoria) => {
        const formData = new FormData();
        formData.append("id_subcategoria", id_subcategoria);
        formData.append("id_categorias", 1);
        formData.append("nombreimagen", imageName);
        formData.append("imagen", image);
        formData.append("numeroimagenes", 1);

        // Mostramos los datos que se van a enviar
        console.log("Datos a enviar:", {
            id_subcategoria: id_subcategoria,
            id_categorias: 1,
            nombreimagen: imageName,
            imagen: image,
            numeroimagenes: 1
        });

        const grabarImg = async () => {
            await fetch(`${URL_BD_MR}140`, {
                method: "POST",
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    console.log("OK INGRESO FOTOS : ", response);
                    alert("La imagen se ha enviado correctamente.");
                } else {
                    console.log("ERROR, INGRESO FOTOS : ", response);
                    alert("Ha ocurrido un error al enviar la imagen.");
                }
            });
        };
        grabarImg();
    };



    // Obtenemos las imágenes de las subcategorías del servidor
    useEffect(() => {
        const leerImagenesSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: URL_BD_MR + "141",
                });
                console.log("Imágenes de las subcategorías:", res.data.listimgsubcategorias);
                setImagenesSubcategorias(res.data.listimgsubcategorias);
            } catch (error) {
                console.error("Error al leer las imágenes de las subcategorías", error);
            }
        };
        leerImagenesSubcategorias();
    }, []);



    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account" style={{ marginBottom: "18rem" }}>
                                <Grid
                                    className="contMainOpiniones"
                                    container
                                    style={{ width: isMdDown ? "100%" : "89%" }}
                                    display={"flex"}
                                    flexDirection={"column"}>
                                    <div className="TitleOpVend">
                                        <p>Editar información categorías</p>
                                    </div>

                                    <div className="EditarInfoCategorias">

                                        <div className="SubEditarInfoCategorias">
                                            <span className="titleCategoriaEditar">Categoría exterior</span>
                                            {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 1).map(subcategoria => (
                                                <div key={subcategoria.id} className="contSubcat">
                                                    <input
                                                        type="text"
                                                        defaultValue={subcategoria.nombre}
                                                        onChange={e => subcategoria.nombre = e.target.value}
                                                    />
                                                    <textarea
                                                        type="text"
                                                        defaultValue={subcategoria.descripcion}
                                                        onChange={e => subcategoria.descripcion = e.target.value}
                                                    />
                                                    <div className="ImagensCatEditar">
                                                        <img src="https://i.postimg.cc/kXJNxCw3/motorBMW.png" alt="" />
                                                        <img src="https://i.postimg.cc/Znnwxyzg/frenosktm.png" alt="" />
                                                    </div>
                                                    <button className="actInfoCatButton" onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                        Actualizar
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="SubEditarInfoCategorias">
                                            <span className="titleCategoriaEditar">Categoría interior</span>
                                            {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 2).map(subcategoria => (
                                                <div key={subcategoria.id} className="contSubcat">
                                                    <input
                                                        type="text"
                                                        defaultValue={subcategoria.nombre}
                                                        onChange={e => subcategoria.nombre = e.target.value}
                                                    />
                                                    <textarea
                                                        type="text"
                                                        defaultValue={subcategoria.descripcion}
                                                        onChange={e => subcategoria.descripcion = e.target.value}
                                                    />
                                                    <button onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                        Actualizar
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="SubEditarInfoCategorias">
                                            <span className="titleCategoriaEditar">Categoría tren motriz</span>
                                            {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 3).map(subcategoria => (
                                                <div key={subcategoria.id} className="contSubcat">
                                                    <input
                                                        type="text"
                                                        defaultValue={subcategoria.nombre}
                                                        onChange={e => subcategoria.nombre = e.target.value}
                                                    />
                                                    <textarea
                                                        type="text"
                                                        defaultValue={subcategoria.descripcion}
                                                        onChange={e => subcategoria.descripcion = e.target.value}
                                                    />
                                                    <button onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                        Actualizar
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="SubEditarInfoCategorias">
                                            <span className="titleCategoriaEditar">Categoría genéricos</span>
                                            {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === 4).map(subcategoria => (
                                                <div key={subcategoria.id} className="contSubcat">
                                                    <input
                                                        type="text"
                                                        defaultValue={subcategoria.nombre}
                                                        onChange={e => subcategoria.nombre = e.target.value}
                                                    />
                                                    <textarea
                                                        type="text"
                                                        defaultValue={subcategoria.descripcion}
                                                        onChange={e => subcategoria.descripcion = e.target.value}
                                                    />
                                                    <button onClick={() => actualizarSubcategoria(subcategoria.id, subcategoria.nombre, subcategoria.descripcion)}>
                                                        Actualizar
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <ModalMensajes
                                        shown={showModal}
                                        close={handleModalClose}
                                        titulo={tituloMensajes}
                                        mensaje={textoMensajes}
                                        tipo="error"
                                    />
                                </Grid>

                                <Grid
                                    className="contMainOpiniones"
                                    container
                                    style={{ width: isMdDown ? "100%" : "89%" }}
                                    display={"flex"}
                                    flexDirection={"column"}>
                                    <div className="TitleOpVend">
                                        <p>Editar imagenes Subcategorías</p>
                                    </div>

                                    <div>


                                        {subcategoriasFiltradas.map(subcategoria => {
                                            // Buscamos la imagen de la subcategoría en las imágenes de las subcategorías
                                            const imagenSubcategoria = imagenesSubcategorias.find(imagen => imagen.id_subcategoria === subcategoria.id);

                                            return (
                                                <div key={subcategoria.id}>
                                                    <h2>{subcategoria.nombre}</h2>
                                                    {imagenSubcategoria && <p>Nombre de la imagen: {imagenSubcategoria.nombreimagen}</p>}
                                                    <input type="file" onChange={(e) => handleImagen(e, subcategoria.id)} />
                                                    <button onClick={() => handleCrearImagen(subcategoria.id)}>Enviar imagen</button>
                                                    {previewImages[subcategoria.id] && <img src={previewImages[subcategoria.id]} alt="Vista previa" />}
                                                </div>
                                            );
                                        })}


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