import React, { useEffect, useState } from "react";
import ModuleHeaderPromotions from "~/components/shared/headers/modules/ModuleHeaderPromotions";
import Menu from "~/components/elements/menu/Menu";
import header_supplies from "~/public/static/data/header_supplies.json";
import VehiclesTypesRepository from "~/repositories/VehicleTypesRepository";
import CountDown from "~/components/elements/CountDown";
import useGetProducts from "~/hooks/useGetProducts";
import ProductWithAvaiable from "~/components/elements/products/ProductWithAvaiable";
import { useRouter } from 'next/router';
import swal from 'sweetalert';

//Importaciones para el uso de Redux
import { useSelector } from "react-redux";

const ModuleHeaderTiposVehiculos = () => {
    const router = useRouter()
    const { product, getProductById } = useGetProducts();
    const [loading, setLoading] = useState(true);

    // Seteamos la variable para iniciar o reiniciar el UseEffect
    const [stateInf, setStateInf] = useState(Math.random());
    // Declaramos el Setter para los tipos de Vehiculos
    const [TiposVehiculos, setTiposVehiculos] = useState(
        header_supplies.header_supplies
    );
    const userlogged = useSelector((state) => state.userlogged.userlogged);
    //console.log("DATOS USUARIO LOGUEADO : ", userlogged);

    useEffect(() => {
        getProductById(2);
    }, []);

    const vender = () => {
        console.log("USUARIO LOGUEADO : ",userlogged.logged )
        if (userlogged.logged) {
            console.log("ENTRE")
           
        } else {
            swal("Mercado Repuesto", "Primero Debes ingresar o Registrarte!", "warning", { button: "Aceptar" });
            router.push('/my-account')
        }
        //console.log("PRUEBA : ", prueba)
    };

    // Lee de la base de datos de los tipos de Vehiculos desde la Base de Datos
    useEffect(() => {
        let queries;
        async function getTiposVehiculos(dat) {
            const TiposVehi = await VehiclesTypesRepository.getVehicleTypes(0);
            //console.log("TIPOS VEHICULOS : ", TiposVehi[0].header_supplies)
            //console.log("SUPLIES : ", header_supplies.header_supplies)
            setTiposVehiculos(TiposVehi[0].header_supplies);
            setTimeout(function () {
                setLoading(false);
            }, 200);
        }
        getTiposVehiculos(queries);
    }, [stateInf]);

    /* Despliega las categerias de Vehiculos en Vender se Retira este Codigo
    <div className="mega-menu__column col-12 col-sm-3">
                            <Menu
                                source={TiposVehiculos}
                                className="menu--single bold"
                            />
                        </div>
    */
    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button className="header__categories-toggle">
                <span onClick={vender}>Vender</span>
            </button>
            <div className="ps-dropdown__content">
                <div className="container">
                    <div className="mega-menu__row">
                        <div className="mega-menu__column col-12 col-sm-3">
                            {
                                // Se retira el Codigo donde despliega las Catergoria de los Vehiculos a vender
                            }
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

export default ModuleHeaderTiposVehiculos;
