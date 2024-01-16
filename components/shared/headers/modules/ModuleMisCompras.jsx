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

const ModuleMisCompras = () => {
    const router = useRouter();
  

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button >
                <span >Mis compras</span>
            </button>
        </div>
    );
};

export default ModuleMisCompras;
