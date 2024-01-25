import React, { useEffect, useState } from "react";
//import Menu from "~/components/elements/menu/Menu";
import useGetProducts from "~/hooks/useGetProducts";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import MenuDropdown from "~/components/elements/menu/MenuDropdown";
import MegaMenu from "~/components/elements/menu/MegaMenu";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import ModuleMenuHomepages from "~/components/elements/menu/modules/ModuleMenuHomepages";
import img1 from "../../../../public/imagescategorias/categorias1.jpg";
import img2 from "../../../../public/imagescategorias/categorias2.jpg";
import img4 from "../../../../public/imagescategorias/categorias3.png";
import img5 from "../../../../public/imagescategorias/categorias5.jpg";
import { BsInfoCircleFill } from "react-icons/bs";
import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";
import Popover from '@mui/material/Popover';
import { URL_BD_MR } from "../../../../helpers/Constants";
import { HiOutlineInformationCircle } from "react-icons/hi";

const ModuleHeaderSupplies = (props) => {

    const router = useRouter();
    const [classCategorias, setClassCategorias] = useState(
        "header__categories-toggle sinborder"
    );

    const onSelecciono = () => {
        setClassCategorias("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassCategorias("header__categories-toggle sinborder");
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    const [activeIndex, setActiveIndex] = useState(0);
    const [activeDescripcion, setActiveDescripcion] = useState('');

    const handleIconClick = (descripcion) => {
        setActiveDescripcion(descripcion);
    };

    const handleMouseOver = (index) => {
        setActiveIndex(index);
        setActiveDescripcion(''); // Borra la descripción activa
    };


    // Supongamos que tus datos de usuario están en el estado
    const [categorias, setCategorias] = useState(null);
    const [subcategorias, setSubcategorias] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState(1); // Inicialmente mostramos la categoría 1
    const [descripcionActiva, setDescripcionActiva] = useState(''); // Inicialmente no mostramos ninguna descripción

    useEffect(() => {
        const leerCategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "135", // Reemplaza con tu URL
                });

                console.log("Categorías por console:", res.data.listcategorias); // Imprime los datos de respuesta

                // Aquí puedes manejar los datos de respuesta como necesites
                // Por ejemplo, podrías guardarlos en el estado para renderizarlos más tarde
                setCategorias(res.data.listcategorias);
            } catch (error) {
                console.error("Error al leer las categorías", error);
                // Maneja el error según tus necesidades
            }
        };

        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138", // Reemplaza con tu URL
                });

                console.log("Subcategorías por console:", res.data.listsubcategorias); // Imprime los datos de respuesta

                // Aquí puedes manejar los datos de respuesta como necesites
                // Por ejemplo, podrías guardarlos en el estado para renderizarlos más tarde
                setSubcategorias(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las subcategorías", error);
                // Maneja el error según tus necesidades
            }
        };

        leerCategorias();
        leerSubcategorias();
    }, []);


    return (
        <div className="header__supplies">
            <button className={classCategorias} onClick={handleClick}>
                <span
                    onMouseOver={onSelecciono}
                    onMouseOut={outSelecciono}>
                    <span>Categorías</span>
                    <IoIosArrowDown />
                </span>
            </button>
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
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        clipPath: 'inset(172px 0 0 0)'
                    },
                    "& .MuiPaper-root": {
                        borderRadius: '8px', // Añade un borde redondeado al Popover
                        border: '2px solid #03037D',
                    }
                }}
            >
                <div className="ContainerCategoriasLeft">
                    <div className="CategoriasUno">
                        {categorias ? categorias.sort((a, b) => a.id - b.id).map((categoria, index) => (
                            <button
                                key={index}
                                onMouseOver={() => {
                                    setCategoriaActiva(categoria.id);
                                    setDescripcionActiva(''); // Borramos la descripción activa al cambiar de categoría
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
                                        <HiOutlineInformationCircle onMouseOver={() => setDescripcionActiva(subcategoria.descripcion)} />
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
                                                <HiOutlineInformationCircle onMouseOver={() => setDescripcionActiva(subcategoria.descripcion)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}


                            <div className="contDescripcionSubCat">
                                <div className="TopcontDescripcionSubCat">
                                    <div className="descripCategoriatxt">
                                        <p>{descripcionActiva} </p>
                                    </div>
                                    {descripcionActiva && <HiOutlineInformationCircle title={`Info sobre ${descripcionActiva}`} />}
                                </div>

                                {descripcionActiva && (
                                    <div className="imgSubCategorias">
                                        <img src="https://i.postimg.cc/kXJNxCw3/motorBMW.png" alt="" />
                                        <img src="https://i.postimg.cc/Znnwxyzg/frenosktm.png" alt="" />
                                    </div>
                                )}

                            </div>

                        </div>


                    </div>
                </div>
            </Popover>


        </div>
    );
};

export default ModuleHeaderSupplies;
