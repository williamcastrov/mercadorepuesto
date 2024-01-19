import React, { useEffect, useState } from "react";
import { toggleDrawer } from "~/store/app/action";
import { useDispatch, connect, useSelector } from "react-redux";
import Link from "next/link";
import { Modal, Button, Row, Col, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDataWishList } from "../../../../store/datawishlist/action";
import { getDataShoppingCart } from "../../../../store/datashoppingcart/action";
import { useRouter } from "next/router";
import axios from "axios";
import { URL_BD_MR } from "../../../../helpers/Constants";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { LiaBellSolid } from "react-icons/lia";
import { RxBell } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

//Firebase
import firebase from "../../../../utilities/firebase";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

import {
    caculateArrayQuantity,
    calculateCartQuantity,
} from "~/utilities/ecomerce-helpers";




 


const ModuleHeaderActions = ({ ecomerce, search = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cartTotal, setCartTotal] = useState(0);
    const [wishlistTotal, setWishlistTotal] = useState(0);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const numberitemswishlist = useSelector((state) => state.wishlist.datawishlist);
    const numberitemsshoppingcart = useSelector((state) => state.datashoppingcart.datashoppingcart);
    //console.log("DATOS USUARIO STATE : ", datosusuarios);
    //console.log("DATOS MODELOS : ", numberitemsshoppingcart);
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenDrawer(e) {
        e.preventDefault();
        dispatch(toggleDrawer(true));
    }

    const Salir = () => {
        //localStorage.clear();
        /*
        localStorage.removeItem('datoscarroceriasvehiculos');
        localStorage.removeItem('datosannosvehiculos');
        localStorage.removeItem('datosmarcasvehiculos');
        localStorage.removeItem('subcategorias');
        localStorage.removeItem('categorias');
        localStorage.removeItem('datostiposvehiculos');
        */
        const auth = getAuth(firebase);
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push("/");
            console.log("Sesión Cerrada")
        }).catch((error) => {
            // An error happened.
            console.log("Error Cerrando Sesión")
        });
    }

    useEffect(() => {
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "54",
                params,
            })
                .then((res) => {
                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                    dispatch(getDataWishList(res.data.listaritemdeseos.length));
                })
                .catch(function (error) {
                    console.log("Error número de productos en lista de deseos");
                });
        };
        leerItems();

        if (ecomerce.cartItems) {
            setCartTotal(calculateCartQuantity(ecomerce.cartItems));
        }
        if (ecomerce.wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(ecomerce.wishlistItems));
        }
    }, []);

    useEffect(() => {
        const leerItemsCart = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "59",
                params,
            })
                .then((res) => {
                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                    dispatch(getDataShoppingCart(res.data.listarcarritocompra.length));
                })
                .catch(function (error) {
                    console.log("Error número de productos en carrito de compras");
                });
        };
        leerItemsCart();

        if (ecomerce.cartItems) {
            setCartTotal(calculateCartQuantity(ecomerce.cartItems));
        }
        if (ecomerce.wishlistItems) {
            setWishlistTotal(caculateArrayQuantity(ecomerce.wishlistItems));
        }
    }, [numberitemswishlist]);

    // view
    let searchBtnView;
    if (search) {
        searchBtnView = (
            <li>
                <a className="header__action" href="#">
                    <i className="icon-magnifier"></i>
                </a>
            </li>
        );
    }

    const reiniciarCtr = () => {
        localStorage.setItem(
            "contrview",
            JSON.stringify(0)
        );
    }


    const [datosUsuario, setDatosUsuario] = useState(null);

    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    setDatosUsuario(res.data[0]);
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };

        leerDatosUsuario();
    }, [datosusuarios]);







 




    return (
        <ul className="header__actions">
            {searchBtnView}
            {
                datosusuarios.logged ?
                    (
                        <Dropdown className="dropNavbar" onToggle={(isOpen) => setIsOpen(isOpen)}>
                            <Dropdown.Toggle className="infousuario" id="dropdown-basic">
                                {
                                    datosusuarios.tipoidentificacion === 6 ?
                                        (
                                            <>
                                                {" "} {datosusuarios.razonsocial}{isOpen ? <IoChevronUp /> : <IoChevronDown />}
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <div className="DropdownNavbar">
                                                    <div className="BallDropdownNavbar">
                                                        <p>{datosUsuario ? `${datosUsuario.primernombre[0]}${datosUsuario.primerapellido[0]}` : 'JP'}</p>
                                                    </div>
                                                    <div className="NameDropdownNavbar">
                                                        {" "} {datosUsuario ? `${datosUsuario.primernombre} ${datosUsuario.primerapellido[0]}` : ''}{isOpen ? <IoChevronUp /> : <IoChevronDown />}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="datainfousuario">
                                <Dropdown.Item className="datainfousuario" href="/EditUsers/MisDatos">Mis Datos</Dropdown.Item>
                                <Dropdown.Item className="datainfousuario" href="/publication">Mis Publicaciones</Dropdown.Item>
                                <Dropdown.Item className="datainfousuario" href="/MisCompras/misCompras">Mis Compras</Dropdown.Item>
                                <Dropdown.Item className="datainfousuario" onClick={Salir} >Cerrar Sesión</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    :
                    (
                        <div className="headercrearcuenta">
                            <div className=" navCCC">
                                <div>
                                    <div className="espaciotextocrearcuenta">
                                        <a className="textocrearcuenta" href="/my-account">
                                            Crea tu cuenta
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="espaciotextocrearcuenta">
                                        <Link href="/loginaccount">
                                            <a className="textocrearcuenta">
                                                Ingresa
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }


            <li >
                <a className="header__action">
                    <RxBell />
                    <span className="header__action-badge ">
                        {numberitemsshoppingcart ? numberitemsshoppingcart : 0}
                    </span>

                </a>
            </li>
             
            

            <li className="ml-10"
                onClick={() => reiniciarCtr()}
            >
                <Link href="/shop/wishlist">
                    <a className="header__action">
                        <GoHeart className="mlmenos20" />
                        <span className="header__action-badge mlmenos10">
                            {numberitemswishlist ? numberitemswishlist : 0}
                        </span>
                    </a>
                </Link>
            </li>


            <li onClick={() => reiniciarCtr()}>
                <Link href="/shop/shopping-cart">
                    <a className="header__action">
                        <HiOutlineShoppingCart className="mlmenos20" />
                        <span className="header__action-badge mlmenos10">
                            {numberitemsshoppingcart ? numberitemsshoppingcart : 0}
                        </span>
                    </a>
                </Link>
            </li>


        </ul>
    );
};

export default connect((state) => state)(ModuleHeaderActions);
