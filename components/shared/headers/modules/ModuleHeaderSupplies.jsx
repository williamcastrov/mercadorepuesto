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

import { IoIosArrowDown } from "react-icons/io";


const ModuleHeaderSupplies = (props) => {
    const router = useRouter();
    const [classCategorias, setClassCategorias] = useState(
        "header__categories-toggle sinborder"
    );
    const { product, getProductById } = useGetProducts();
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [classContent, setClassContent] = useState("ps-dropdown--content");
    const [itemCategoria, setItemCategoria] = useState("");

    const { setShowModal, showModal } = props;
    const [showModalSubCategorias, setShowModalSubCategorias] = useState(false);
    const [showModalEjemplos, setShowModalEjemplos] = useState(false);
    const [itemSubCategoria, setItemSubCategoria] = useState("");
    const [subcategoriasSeleccionada, setSubcategoriasSeleccionada] = useState(
        []
    );
    const [ejemplos, setEjemplos] = useState(false);
    const [textoEjemplos, setTextoEjemplos] = useState("");
    const [classUbicaEjemplos, setClassUbicaEjemplos] = useState(
        "divubicaejemplosuno"
    );

    useEffect(() => {
        getProductById(2);
    }, []);

    useEffect(() => {
        let categorias = JSON.parse(localStorage.getItem("categorias"));
        let subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
        //console.log("CATEGORIAS : ", categorias);
        //console.log("SUB CATEGORIAS : ", subcategorias);

        if (categorias) {
            setCategorias(categorias);
            setSubcategorias(subcategorias);
        }
    }, []);

    //console.log("DATOS : ", header_supplies.header_supplies);

    const activar = (categoria) => {
        //console.log("CATEGORIA SELECCIONADA : ", categoria);
        setNombreCategoria(categoria.nombre);
        setItemCategoria(categoria.id);
        setTextoEjemplos(categoria.descripcion);

        let ordenar = subcategorias.sort();

        console.log("ARREGLO ORDENADO : ", ordenar);

        const newDet = [];
        const newDetImp = [];
        subcategorias &&
            subcategorias.forEach((row) => {
                if (
                    Number.parseInt(row.id_categorias) ===
                    Number.parseInt(categoria.id)
                ) {
                    //console.log("TIPO DE PRODUCTO SELECCIONADO ES : ", row.tipodeproducto)
                    let item = {
                        id: row.id,
                        id_categorias: row.id_categorias,
                        nombre: row.nombre,
                        descripcion: row.descripcion,
                        url: row.url,
                        estado: row.estado,
                        palabraclave: row.palabrasclaves,
                    };
                    newDet.push(item);
                }
            });

        let longitud = newDet.length;
        for (var i = 0; i < longitud; i = i + 2) {
            let siguiente = i + 1;
            if (newDet[i].id_categorias > 2) {
                if (newDet[i].id != 34) {
                    let item = {
                        id1: newDet[i].id,
                        id2: newDet[siguiente].id,
                        nombre1: newDet[i].nombre,
                        nombre2: newDet[siguiente].nombre,
                        palabraclaveuna: newDet[i].palabraclave,
                        palabraclavedos: newDet[siguiente].palabraclave,
                    };
                    newDetImp.push(item);
                }
            } else {
                if (newDet[i].id != 34) {
                    let itemuno = {
                        id1: newDet[i].id,
                        nombre1: newDet[i].nombre,
                        palabraclaveuna: newDet[i].palabraclave,
                    };
                    newDetImp.push(itemuno);
                    let itemdos = {
                        id1: newDet[siguiente].id,
                        nombre1: newDet[siguiente].nombre,
                        palabraclaveuna: newDet[siguiente].palabraclave,
                    };
                    newDetImp.push(itemdos);
                }
            }
        }
        setSubcategoriasSeleccionada(newDetImp);
        //console.log("IMPRIMIR SUB CATEGORIAS : ", newDetImp)
        setShowModalSubCategorias(true);
    };

    const activarsubcategoria = (id) => {
        //console.log("ID SUBCATEGORIAS : ", id)
        setItemSubCategoria(id);
    };

    const abrirCerrarCategorias = () => {
        if (classContent == "ps-dropdown--content") {
            setClassContent("ps-dropdown__content"); // opacidadcategorias
        } else {
            setClassContent("ps-dropdown--content");
        }
    };

    const buscarProductos = (clave) => {
        let buscar = "/search?keyword=" + clave;
        //console.log("CLAVE : ", buscar);
        router.push(buscar);
        setShowModal(false);
        setShowModalSubCategorias(false);
    };

    const mostrarEjemplos = () => {
        setEjemplos(true);

        if (itemCategoria < 3) {
            setClassUbicaEjemplos("divubicaejemplosuno");
        } else if (itemCategoria > 2) {
            setClassUbicaEjemplos("divubicaejemplosdos");
        } else setClassUbicaEjemplos("divubicaejemplosuno");
    };

    const cerrarEjemplos = () => {
        setEjemplos(false);
    };

    const activarEjemplos = () => {
        setShowModalEjemplos(true);
    };

    const desactivarEjemplos = () => {
        setShowModalEjemplos(false);
    };

    const close = () => {
        setShowModal(false);
        setShowModalSubCategorias(false);
    };

    const onSelecciono = () => {
        setClassCategorias("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassCategorias("header__categories-toggle sinborder");
    };

    const [shadowClass, setShadowClass] = useState("shadow--hidden");














































    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div className="header__supplies">
            <button className={classCategorias} >
                <span
                    onMouseOver={onSelecciono}
                    onMouseOut={outSelecciono}>
                    <span>Categorías</span>
                    <IoIosArrowDown />
                </span>
            </button>

            


        </div>
    );
};

function Menu(props) {
    const { source, className } = props;
    // Views
    let menuView;
    console.log("SOURCE : ", source);
    if (source) {
        menuView = source.map((item) => {
            if (item.subMenu) {
                return <MenuDropdown source={item} key={item.text} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={item.text} />;
            } else if (item.external) {
                if (item.module === "homepages") {
                    console.log("ITEM SELECCIONADO  : ", item);
                    return (
                        <li
                            className="menu-item-has-children has-mega-menu"
                            key={item.module}>
                            <Link href={item.url}>
                                <a>{item.text}</a>
                            </Link>
                            <div className="mega-menu">
                                <ModuleMenuHomepages />
                            </div>
                        </li>
                    );
                }
            } else {
                return (
                    <li key={item.text}>
                        <Link href={item.url}>
                            <a>
                                {item.icon && <i className={item.icon}></i>}
                                {item.text}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
}

export default ModuleHeaderSupplies;
