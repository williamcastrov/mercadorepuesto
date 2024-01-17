import React, { useEffect, useState } from "react";
import header_supplies from "~/public/static/data/header_supplies.json";
import VehiclesTypesRepository from "~/repositories/VehicleTypesRepository";
import Users from "~/repositories/Users";
import { getUsers } from "~/store/users/action";
import useGetProducts from "~/hooks/useGetProducts";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../../../store/editdata/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";

const ModuleHeaderAyudaPQR = () => {

    
    const router = useRouter();
    const dispatch = useDispatch();
    const { product, getProductById } = useGetProducts();
    const [loading, setLoading] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState([]);

    const [classVender, setClassVender] = useState(
        "header__categories-toggle sinborder"
    );

    const onSelecciono = () => {
        setClassVender("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassVender("header__categories-toggle sinborder");
    };

 
 


    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button
                className={classVender}
                onMouseOver={onSelecciono}
                onMouseOut={outSelecciono}>
                <span>Ayuda/PQR</span>
            </button>
        </div>
    );
};

export default ModuleHeaderAyudaPQR;
 