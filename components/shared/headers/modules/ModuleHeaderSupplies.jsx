import React, { useEffect, useState } from "react";
//import Menu from "~/components/elements/menu/Menu";
import { useRouter } from "next/router";
import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";
import Popover from '@mui/material/Popover';
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from "../../../../helpers/Constants";
import { HiOutlineInformationCircle } from "react-icons/hi";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IoIosArrowUp } from "react-icons/io";


const ModuleHeaderSupplies = (props) => {

    const router = useRouter();
    const [classCategorias, setClassCategorias] = useState(
        "header__categories-toggle sinborder"
    );
    // Supongamos que tus datos de usuario están en el estado
    const [categorias, setCategorias] = useState(null);
    const [subcategorias, setSubcategorias] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState(1); // Inicialmente mostramos la categoría 1
    const [descripcionActiva, setDescripcionActiva] = useState(''); // Inicialmente no mostramos ninguna descripción
    const [nombreSubcategoriaActiva, setNombreSubcategoriaActiva] = useState(''); // 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [imagenesSubcategorias, setImagenesSubcategorias] = useState([]); // Inicialmente no mostramos ninguna imagen
    const [subcategoriaActiva, setSubcategoriaActiva] = useState();


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onSelecciono = () => {
        setClassCategorias("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassCategorias("header__categories-toggle sinborder");
    };

    const handleClick = (event) => {
        if (open) {
            handleClose();
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const leerCategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "135",
                });

                //  console.log("Categorías por console:", res.data.listcategorias); 
                setCategorias(res.data.listcategorias);
            } catch (error) {
                console.error("Error al leer las categorías", error);

            }
        };

        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138",
                });

                //   console.log("Subcategorías por console:", res.data.listsubcategorias); 


                setSubcategorias(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las subcategorías", error);

            }
        };

        leerCategorias();
        leerSubcategorias();
    }, []);


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

    const handleMouseOver = (descripcion, nombre) => {
        setDescripcionActiva(descripcion);
        setNombreSubcategoriaActiva(nombre);
    };

    return (
        <div className="header__supplies">
            <button className={classCategorias} onClick={handleClick}>
                <span
                    onMouseOver={onSelecciono}
                    onMouseOut={outSelecciono}>
                    <span>Categorías</span>
                    {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </button>
            <ClickAwayListener onClickAway={handleClose} mouseEvent="onMouseDown">
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    disableScrollLock={true}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                    BackdropProps={{ invisible: false }}
                    sx={{
                        "& .MuiBackdrop-root": {
                            // backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            //clipPath: 'inset(172px 0 0 0)'

                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            // Ajusta o elimina esta línea según sea necesario
                            clipPath: 'inset(0px 0 0 0)'
                        },
                        "& .MuiPaper-root": {
                            borderRadius: '8px', // Añade un borde redondeado al Popover
                            border: '2px solid #03037D',
                        }
                    }}
                >
                    <div className="ContainerCategoriasLeft">
                        <div className="CategoriasUno">
                            {categorias ? categorias.sort((a, b) => a.id - b.id).map((categoria, subcategoria, index) => (
                                <button
                                    key={index}
                                    onMouseOver={() => {
                                        setCategoriaActiva(categoria.id);
                                        setDescripcionActiva(''); // Borramos la descripción activa al cambiar de categoría
                                        setNombreSubcategoriaActiva(''); // Borramos el nombre de la subcategoría activa al cambiar de categoría 
                                        setSubcategoriaActiva(subcategoria.id); // Aquí actualizamos la subcategoría activa
                                    }}
                                    style={{ backgroundColor: categoriaActiva === categoria.id ? '#e0e2eb' : 'initial' }}
                                >
                                    {categoria.nombre}
                                </button>
                            )) : 'Cargando categorías...'}
                        </div>
                        <div className="subCategoriasLeft">

                            <div className="contInfoCategoriasLeft contInfoCategoriasLeftOne">
                                {subcategorias ? subcategorias.filter(subcategoria => subcategoria.id_categorias === categoriaActiva).slice(0, 10).map((subcategoria, index) => (
                                    <div key={index} className="textSubcategorias">
                                        <div className="ButtonSubCategorias">
                                            <p> {subcategoria.nombre}</p>
                                            <HiOutlineInformationCircle onMouseOver={() => {
                                                handleMouseOver(subcategoria.descripcion, subcategoria.nombre);
                                                setSubcategoriaActiva(subcategoria.id); // Aquí actualizamos la subcategoría activa
                                            }} />
                                        </div>
                                    </div>
                                )) : 'Cargando subcategorías...'}
                            </div>


                            <div style={{ width: '415px', marginLeft: categoriaActiva === 4 ? '2rem' : '5rem' }}>

                                {subcategorias && subcategorias.filter(subcategoria => subcategoria.id_categorias === categoriaActiva).length > 10 ? (
                                    <div className="MainContainerCategoriasRight">
                                        {subcategorias.filter(subcategoria => subcategoria.id_categorias === categoriaActiva).slice(10).map((subcategoria, index) => (
                                            <div key={index} className="textSubcategorias textSubcategoriasDerecha">
                                                <div className="ButtonSubCategorias">
                                                    <p> {subcategoria.nombre}</p>
                                                    <HiOutlineInformationCircle onMouseOver={() => {
                                                        setDescripcionActiva(subcategoria.descripcion);
                                                        setNombreSubcategoriaActiva(subcategoria.nombre);
                                                        setSubcategoriaActiva(subcategoria.id); // Aquí actualizamos la subcategoría activa
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}


                                <div className="contDescripcionSubCat">
                                    {descripcionActiva && (
                                        <div className="TopcontDescripcionSubCat">
                                            <div className="descripCategoriatxt">
                                                <p className="titleDescCat">Información sobre "{nombreSubcategoriaActiva}"</p>
                                                <p>{descripcionActiva} </p>
                                            </div>
                                        </div>
                                    )}

                                    {imagenesSubcategorias && subcategorias && (
                                        <div className="imgSubCategorias">
                                            {imagenesSubcategorias
                                                .filter(imagen => {
                                                    const subcategoria = subcategorias.find(subcategoria => subcategoria.id === subcategoriaActiva);
                                                    return subcategoria && imagen.id_subcategoria === subcategoria.id;
                                                })
                                                .sort((a, b) => a.id - b.id) // Ordenamos las imágenes por "id"
                                                .slice(0, 2) // Seleccionamos las primeras dos imágenes
                                                .map((imagen, index) => (
                                                    <img src={`${URL_IMAGES_RESULTSSMS}${imagen.nombreimagen}`} alt={imagen.nombreimagen} />
                                                ))
                                            }
                                        </div>
                                    )}

                                </div>

                            </div>


                        </div>
                    </div>
                </Popover>
            </ClickAwayListener>

        </div>
    );
};

export default ModuleHeaderSupplies;
