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

    return (
        <ul className="header__actions">
            {searchBtnView}
            {
                datosusuarios.logged ?
                    (
                        <Dropdown className="dropdown-user-data" >
                            <Dropdown.Toggle className="infousuario  p-2 " variant="secondary" id="dropdown-basic">
                                {
                                    datosusuarios.tipoidentificacion === 6 ?
                                        (
                                            <>
                                                <i className="icon-user"></i>{" "} {datosusuarios.razonsocial}
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <i className="icon-user"></i>{" "} {datosusuarios.name}
                                            </>
                                        )
                                }
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="datainfousuario">
                                <Dropdown.Item className="datainfousuario" href="/EditUsers/CompSMS">Mis Datos</Dropdown.Item>
                                <Dropdown.Item className="datainfousuario" href="/publication">Mis Publicaciones</Dropdown.Item>
                                <Dropdown.Item className="datainfousuario" href="/MisCompras/misCompras">Mis Compras</Dropdown.Item>
                                <Dropdown.Item className="datainfousuario" onClick={Salir} >Cerrar Sesión</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    :
                    (
                        <div className="headercrearcuenta">
                            <Row className="ps-footer__fax">
                                <Col lg={6}>
                                    <div className="espaciotextocrearcuenta">
                                        <a className="textocrearcuenta" href="/my-account">
                                            Crea tu cuenta
                                        </a>
                                    </div>

                                </Col>
                                <Col lg={3}>
                                    <div className="espaciotextocrearcuenta">
                                        <Link href="/loginaccount">
                                            <a className="textocrearcuenta">
                                                Ingresa
                                            </a>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
            }

            <li className="ml-10"
                onClick={() => reiniciarCtr()}
            >
                <Link href="/shop/wishlist">
                    <a className="header__action">
                        <i className="fa fa-heart-o mlmenos20"></i>
                        <span className="header__action-badge mlmenos10">
                            {numberitemswishlist ? numberitemswishlist : 0}
                        </span>
                    </a>
                </Link>
            </li>
            <li
                onClick={() => reiniciarCtr()}
            >
                <Link href="/shop/shopping-cart">
                    <a className="header__action">
                        <i className="icon-cart-empty mlmenos20"></i>
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
