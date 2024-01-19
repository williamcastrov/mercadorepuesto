import React from "react";
import { useRouter } from "next/router";

const ImagenVendedor = () => {

    const router = useRouter();
    const crearProductos = () => {
        router.push("/CreateProduct/createproduct");
    };

    return (
        <div className="mainContImgVendedor">
              <img src="https://i.postimg.cc/QCXh03N6/Dise-o-sin-t-tulo.png" alt=""  onClick={crearProductos}/>
        </div>
    );
};

export default ImagenVendedor; 