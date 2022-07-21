import React, { useEffect, useState } from "react";
import ModuleHeaderPromotions from "~/components/shared/headers/modules/ModuleHeaderPromotions";
import Menu from "~/components/elements/menu/Menu";
import header_supplies from "~/public/static/data/header_supplies.json";
import CountDown from "~/components/elements/CountDown";
import useGetProducts from "~/hooks/useGetProducts";
import ProductWithAvaiable from "~/components/elements/products/ProductWithAvaiable";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const ModuleHeaderSupplies = () => {
    const { product, getProductById } = useGetProducts();
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);

    useEffect(() => {
        getProductById(2);
    }, []);

    useEffect(() => {
        let categorias = JSON.parse(localStorage.getItem("categorias"));
        let subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
        console.log("CATEGORIAS : ", categorias);
        console.log("SUB CATEGORIAS : ", subcategorias);

        if (categorias) {
            setCategorias(categorias);
            setSubcategorias(subcategorias);
        }
    }, []);

    console.log("DATOS : ", header_supplies.header_supplies);

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button className="header__categories-toggle">
                <span>Categorías <IoIosArrowForward /> </span>
            </button>
            <div className="ps-dropdown__content">
                <div className="container">
                    <div className="mega-menu__row">
                        <div className="mega-menu__column col-12 col-sm-3">
                            <Menu
                                source={categorias}
                                className="menu--single bold"
                            />
                        </div>
                        <div className="mega-menu__column col-12 col-sm-5 col-md-6">
                            <ModuleHeaderPromotions />
                        </div>
                        <div className="mega-menu__column col-12 col-sm-4 col-md-3">
                            <div className="mega-menu__product">
                                <CountDown
                                    time="12 31 2021, 6:00 am"
                                    format="MM DD YYYY, h:mm a"
                                />
                                {product && (
                                    <ProductWithAvaiable product={product} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleHeaderSupplies;
