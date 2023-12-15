import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function index(props) {
    const [device, setDevice] = useState("");
    const [deviceLink, setDeviceLink] = useState("");
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    console.log("DAT USER : ", datosusuarios);

    useEffect(() => {
        const handleDeviceDetection = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            let array = userAgent.split(" ");
            console.log("XXXXXXX : ", array);
          
            setDevice(userAgent);
            const isMobile =
                /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
                    userAgent
                );
            const isTablet =
                /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
                    userAgent
                );
//validacaracteres = preguntaVendedor.substr(i, 1);
            if (isMobile) {
                console.log("ID Dispositivo : ", "Mobile" + array[1] +" ");
                setDevice(
                    "Mobile" +
                        " " +
                        array[1] +
                        " " +
                        array[2] +
                        array[3] +
                        array[4] +
                        array[5]
                );
            } else if (isTablet) {
                console.log("ID Dispositivo : ", "Tablet" + array[1] +" ");
                setDevice(
                    "Tablet" +
                        " " +
                        array[1] +
                        " " +
                        array[2] +
                        array[3] +
                        array[4] +
                        array[5]
                );
            } else {
                let id = "Desktop" + array[1].substr(1, 10);
                let row = {
                    iddispositivo: id,
                    usuario: datosusuarios.uid,
                    locate: 0,
                    fecha: 0
                }


                

                console.log("ID Dispositivo : ",  row);
                setDevice(
                    "Desktop" +
                        " " +
                        array[1] +
                        " " +
                        array[2] +
                        array[3] +
                        array[4] +
                        array[5]
                );
            }
        };

        handleDeviceDetection();
        window.addEventListener("resize", handleDeviceDetection);

        return () => {
            window.removeEventListener("resize", handleDeviceDetection);
        };
    }, [datosusuarios]);

    console.log("DISPOSITIVOS : ", deviceLink);

    return (
        <div>
            <h4> Dispositivos Vinculados : </h4>
            {device}
        </div>
    );
}

export default index;
