import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function InteractiveShopping(props) {
    const router = useRouter();

    const datosbuscarproductos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales
    );
    //console.log("DATOS BUSCAR PRODUCTOS : ", datosbuscarproductos);

    const enviadatoslocalstorage = () => {
        localStorage.setItem('datostiposvehiculos', JSON.stringify(datosbuscarproductos.vgl_tiposvehiculos));
        localStorage.setItem('datosmarcasvehiculos', JSON.stringify(datosbuscarproductos.vgl_marcasvehiculos));
        localStorage.setItem('datoscarroceriasvehiculos', JSON.stringify(datosbuscarproductos.vgl_carroceriasvehiculos));
        localStorage.setItem('datosannosvehiculos', JSON.stringify(datosbuscarproductos.vgl_annosvehiculos));
        comprainteractiva();
    };

    const comprainteractiva = () => {
        router.push("/searchinteractive/searchinteractive")
    };

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button className="header__categories-toggle">
                <span onClick={enviadatoslocalstorage} >Buscador_Interactivo </span>
            </button>
        </div>
    );
}

export default InteractiveShopping;