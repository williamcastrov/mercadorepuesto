import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../../../store/editdata/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";


const ImagenVendedor = () => {

    const userlogged = useSelector((state) => state.userlogged.userlogged);
    const dispatch = useDispatch();
    const router = useRouter();

    const crearProductos = () => {
        router.push("/CreateProduct/createproduct");
    }; 

    const enviadatoslocalstorage = () => {
        localStorage.setItem(
            "datostiposvehiculos",
            JSON.stringify(datoscrearproductos.vgl_tiposvehiculos)
        );
        localStorage.setItem(
            "datosmarcasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_marcasvehiculos)
        );
        localStorage.setItem(
            "datoscarroceriasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_carroceriasvehiculos)
        );
        localStorage.setItem(
            "datosannosvehiculos",
            JSON.stringify(datoscrearproductos.vgl_annosvehiculos)
        );
        //localStorage.setItem('datosmodelosvehiculos', JSON.stringify(datoscrearproductos.vgl_modelosvehiculos));
        //localStorage.setItem('datoscilindrajevehiculos', JSON.stringify(datoscrearproductos.vgl_cilindrajesvehiculos));
        crearProductos();
    };

    //Valida si el usuario esta logueado o debe Registrarse 
    const vender = () => {
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        if (userlogged.idinterno === 0 && userlogged.activo === "S") {
            swal(
                "Mercado Repuesto",
                "Primero debes ingresar datos del vendedor!",
                "warning",
                { button: "Aceptar" }
            );
            router.push("/my-additionaldata");
        } else {
            if (userlogged.logged) {
                enviadatoslocalstorage();
            } else {
                Swal.fire({
                    width: '450px',
                    borderRadius: '16px',
                    showCancelButton: false,
                    showConfirmButton: false,
                    html:
                        `               
            <div style="border-radius: 16px; padding: 2rem;">
                <button id="closeButton" style="position: absolute; right: 2rem; top: 2rem; font-size: 25px; color: #2D2E83;">X</button>
                <img src="/static/img/favicon_2.png" alt="Mercado Repuesto" style="width: 50%; height: auto; margin: 0 auto;"/>
       
                <br />
                <h4>Vive una experiencia diferente en la <br/> compra o venta de tu repuesto</h4>
      
                <h4>Por favor ingresa a tu cuenta</h4>
       
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 1rem; width: 100%;">
                    <a href="/my-account" style="width: 100%; height: auto; margin: 0 auto; margin-top: .5rem; margin-bottom: 1.5rem;">
                        <button style="border-radius: 10px; color: #2D2E83; background-color: white; border: 3px solid #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Soy nuevo</button>
                    </a>
                    
                    <a href="/loginaccount" style="width: 100%; height: auto; margin: 0 auto;"> 
                        <button style="border-radius: 10px; color: white; background-color: #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Ya tengo una cuenta</button> 
                    </a>
                </div>
            </div>
            `,
                    didOpen: () => {
                        document.getElementById('closeButton').addEventListener('click', () => {
                            Swal.close();
                        });
                    }
                });
            }
        }

        let editdata = {
            editar: false
        }
        dispatch(getEditData(editdata));
        let datprd = [];
        localStorage.setItem("duplicarprd", JSON.stringify(datprd));
        localStorage.setItem("vehvehicles", JSON.stringify(datprd));
        dispatch(getDuplicarPrd(0));

        if (router.pathname != "/CreateProduct/createproduct") {
            router.replace("/CreateProduct/createproduct");
            router.push("/CreateProduct/createproduct");
        } else {
            location.reload();
        }
    };


    return (
        <div className="mainContImgVendedor">
            <img src="https://i.postimg.cc/QMyLvxpc/6.png" alt=""  onClick={() => vender()} />
        </div>
    );
};

export default ImagenVendedor; 