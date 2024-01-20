import React from "react";
import { useRouter } from "next/router";

const ImagenVendedor = () => {

    const router = useRouter();
    const crearProductos = () => {
        router.push("/CreateProduct/createproduct");
    };

    return (
        <div className="mainContImgVendedor">
              <img src="https://i.postimg.cc/QMyLvxpc/6.png" alt=""  onClick={crearProductos}/>
        </div>
    );
};

export default ImagenVendedor; 