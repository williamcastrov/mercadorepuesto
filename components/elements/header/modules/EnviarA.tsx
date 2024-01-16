import axios from 'axios';
import React, { FC, useEffect, useState } from "react";
import { IoLocationSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { URL_BD_MR } from "~/helpers/Constants";



const EnviarA: FC = () => {

    //Componente que le muestra al usuario enviar a la ciudad mas reciente que tiene loggeada

    const datosusuarios = useSelector((state: any) => state.userlogged.userlogged);
    const [direccion, setDireccion] = useState<any>(null);

    //función para obtener direccion de usuario
    useEffect(() => {
        const obtenerDireccionUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "65",
                    params,
                });
                // Ordenamos las direcciones por fecha de creación y seleccionamos la más reciente
                const direccionesOrdenadas = res.data.listardireccionesusuario.sort((a: any, b: any) => new Date(b.fechacreacion).getTime() - new Date(a.fechacreacion).getTime());
                setDireccion(direccionesOrdenadas[0])
            } catch (error) {
                // console.error("Error al leer la dirección del usuario", error);
            }
        };
        obtenerDireccionUsuario();
    }, [datosusuarios]);


    return (
        <>
            {datosusuarios && datosusuarios.uid ? (
                <div className="UbicacionIzquierda">
                    <IoLocationSharp />
                    <div>
                        <p className='PEnviarA'>Enviar a</p>
                        {direccion && <p>{direccion.nombreciudad}</p>}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default EnviarA;