import React, { useEffect, useState } from "react";
//import ModuleHeaderContactNumber from "~/components/shared/headers/modules/ModuleHeaderContactNumber";
import ModuleHeaderCategories from "~/components/shared/headers/modules/ModuleHeaderCategories";
import ModuleHeaderSupplies from "~/components/shared/headers/modules/ModuleHeaderSupplies";
import ModuleHeaderVender from "~/components/shared/headers/modules/ModuleHeaderVender";
import MainMenuRepository from "~/repositories/MainMenuRepository";
import Menu from "~/components/elements/menu/Menu";
import menu from "~/public/static/data/menu.json";
import InteractiveShopping from "../InteractiveShopping/InteractiveShopping";
import MyGarage from "../MyGarage/MyGarage";
//import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";

const NavigationPrimary = (props) => {
    const { categorias, setCategorias } = props;
    //console.log("CATEGOPRIAS PRIMARY : ", categorias);

    const [loading, setLoading] = useState(true);

    // Seteamos la variable para iniciar o reiniciar el UseEffect
    const [stateInf, setStateInf] = useState(Math.random());
    // Declaramos el Setter para los tipos de Vehiculos
    const [mainMenu, setMainMenu] = useState(menu.main_menu);
    //console.log("MAIN MENU : ",menu.main_menu)

    // Lee de la base de datos de los tipos de Vehiculos desde la Base de Datos

    useEffect(() => {
        let queries;
        async function getMainMenu(dat) {
            const MenuPrincipal = await MainMenuRepository.getMainMenu(0);
            //console.log("DATOS MENU BD : ", MenuPrincipal[0])
            //console.log("DATOS JSON : ", menu.main_menu)
            setMainMenu(MenuPrincipal[0].main_menu)
            setTimeout(function () {
                setLoading(false);
            }, 200);
        }
        getMainMenu(queries);
    }, [stateInf]);
//<ModuleHeaderCategories categorias={categorias} setCategorias={setCategorias} />
//<ModuleHeaderSupplies />
    return (
        <nav className="navigation--primary ">
            <div className="container ">
                <div className="navigation__left posicion">
                    <ModuleHeaderSupplies />
                    <InteractiveShopping />
                    <ModuleHeaderVender />
                    <MyGarage />
                    <div className="navigation__menu">
                        <Menu
                            source={mainMenu}
                            className="menu menu--desktop"
                        />
                    </div>
                </div>
                <div className="navigation__right">
                    <ModuleHeaderActions/>
                </div>
            </div>
        </nav>
    );
};
//  <ModuleHeaderContactNumber />
//<ModuleHeaderSwichers/>
export default NavigationPrimary;
