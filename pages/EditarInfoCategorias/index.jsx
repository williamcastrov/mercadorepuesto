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
    const [subcategorias, setSubcategorias] = useState(null);

    useEffect(() => {
        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138",
                });
                console.log("Subcategorías por console:", res.data.listsubcategorias);

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
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}