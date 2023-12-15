import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { SavedVehicle } from "~/types/Filter";
import { Themes } from "~/utilities/StyleVariables";
import { CloseWindowContext } from "../Header";
import CarIcon from "../svgs/CarIcon";
import Glass from "../svgs/GlassIcon";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Dropdown, Form, ListGroup } from "react-bootstrap";
import Select from "react-select";
import { getLeeIra } from "../../../../store/leeira/action";
import { getAddLogin } from "../../../../store/addlogin/action";
import axios from "axios";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ModalEjemploBusqueda from "../../../../pages/mensajes/ModalEjemploBusqueda";
import UpdateData from "./UpdateData";
//import LoadingMotorEectrico from "../../../components/elements/Loading/LoadingMotorEectrico";
import LoadingSpinner from "../../../../components/elements/Loading/LoadingMotorEectrico";

interface Props {
    content: string;
    vehicle: SavedVehicle | null;
    loading: boolean;
}

let dataencontrada = [];
let datprd = [];
let coincideproducto = [];
let ordercoincidencia = [];
let coincidebdprod = [];
let unicoitem = [];
let mostrar = [];
let numbusquedas = 0;
let contador = 0;
let stringx = "";

let tiposgenericos = [
    { value: 1, label: "Estéticos y cuidados del vehículo" },
    { value: 2, label: "Accesorios interior" },
    { value: 3, label: "Accesorios exterior" },
    { value: 4, label: "Sistemas de sonido y entretenimiento" },
    { value: 5, label: "Iluminación, exploradoras y partes eléctricas" },
    { value: 6, label: "Lubricantes y fluidos" },
    { value: 7, label: "Llantas y rines" },
    { value: 8, label: "Baterías" },
    { value: 9, label: "Plumillas" },
    { value: 10, label: "Herramientas y kit de carreteras" },
];

const Searcher = React.forwardRef<HTMLButtonElement, Props>(
    ({ content, vehicle, loading }, ref) => {
        const router = useRouter();
        const [input, setInput] = useState("");
        const closeWindow = useContext(CloseWindowContext);
        const [mostrarResultados, setMostrarResultados] =
            useState("divtransparente");
        const [control, setControl] = useState(false);
        const [mostrarCoincidencia, setMostrarCoincidencia] = useState([]);
        const [controlReg, setControlReg] = useState(0);
        const [dataWords, setDataWords] = useState([]);
        const [dataConectores, setDataConectores] = useState([]);
        const [dataBusquedaUsuario, setDataBusquedaUsuario] = useState([]);
        const [dataInput, setDataInput] = useState("");
        const [findWord, setFindWord] = useState(false);
        const [wordIni, setWordIni] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [erase, setErase] = useState("");
        const [claseContent, setClaseContent] = useState(
            "dropdown-content-close"
        );
        const [showModalMensajes, setShowModalMensajes] = useState(false);
        const [tituloMensajes, setTituloMensajes] = useState("");
        const [textoMensajes, setTextoMensajes] = useState("");
        const dispatch = useDispatch();

        useEffect(() => {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            let unico = [];
            let reg = 600000;
            let baseword = [];

            const leebdprd = async () => {
                await axios({
                    method: "post",
                    url: "https://gimcloud.com.co/mrp/api/41",
                }).then((res) => {
                    res.data.listarproductosbd &&
                        res.data.listarproductosbd.map((item) => {
                            let texto = item.titulonombre.split(" ");
                            texto &&
                                texto.map((row, index) => {
                                    if (index == 0) {
                                        reg = reg + 1;
                                        let palabra = row.toLowerCase();
                                        let word = {
                                            id: reg,
                                            palabrabase: palabra,
                                        };

                                        let valid;
                                        valid = unico.includes(palabra);
                                        if (!valid) {
                                            unico.push(palabra);
                                            baseword.push(word);
                                        }
                                    }
                                });
                        });
                    //console.log("WORD PRD : ", baseword)
                    //console.log("WORD PRD : ", wordproducts)
                });
            };
            leebdprd();

            const datwords = JSON.parse(localStorage.getItem("datawords"));

            datwords &&
                datwords.map((row, index) => {
                    let item = {
                        id: row.id,
                        palabrabase: row.palabrabase,
                    };
                    baseword.push(item);
                });
            setDataWords(baseword);

            // Lee BD de conectores de palabras
            const datconectores = JSON.parse(
                localStorage.getItem("dataconectores")
            );
            setDataConectores(datconectores);

            let busquedausuario = [];
            //Lee datos ingresados por el usuario en el buscador
            busquedausuario = JSON.parse(
                localStorage.getItem("busquedausuario")
            );

            if (!busquedausuario) busquedausuario = [];

            setDataBusquedaUsuario(busquedausuario);

            //Lee ubicacion del producto en el vehículo
            if (ubiposprod) {
                setInput(ubiposprod);
            }
        }, []);

        useEffect(() => {
            if (mostrarCoincidencia)
                if (mostrarCoincidencia.length == 0) setControl(false);
        }, [mostrarCoincidencia]);

        const oprimeEnter = (dato) => {
            localStorage.setItem("esgenerico", JSON.stringify(false));
            localStorage.setItem("codigogenerico", JSON.stringify(0));
            if (dato.charCode == "13") {
                const datplaceholder = JSON.parse(
                    localStorage.getItem("placeholdersearch")
                );

                let valinput = null;
                let datenter = dato.target.defaultValue;

                if (!datplaceholder) {
                    valinput = dato.target.defaultValue;
                }

                search(datenter);
                /*
                if (!dataInput && valinput) {
                    search(valinput);
                } else
                if (!dataInput && valinput) {
                    search(valinput);
                } else search(datplaceholder);
                */

                setClaseContent("dropdown-content-close");

                let busquedausuario = [];

                busquedausuario = JSON.parse(
                    localStorage.getItem("busquedausuario")
                );

                if (!busquedausuario) busquedausuario = [];

                let busqueda = [];
                numbusquedas = numbusquedas + 1;
                if (!busquedausuario) {
                    if (dataInput) {
                        let item = {
                            value: numbusquedas,
                            label: dataInput,
                        };
                        busqueda.push(item);
                        localStorage.setItem(
                            "busquedausuario",
                            JSON.stringify(busqueda)
                        );
                    }
                } else {
                    if (dataInput) {
                        let sigue = 0;

                        busquedausuario &&
                            busquedausuario.map((row, index) => {
                                busqueda.push(row);
                                sigue = row.value;
                            });

                        if (busqueda.length > 9) busqueda.splice(0, 1);

                        let item = {
                            value: sigue + 1,
                            label: dataInput,
                        };

                        busqueda.push(item);
                        localStorage.setItem(
                            "busquedausuario",
                            JSON.stringify(busqueda)
                        );
                    }
                }
            }
        };

        const search = (dat) => {
            let datfind = dat;
            localStorage.setItem("selectpage", JSON.stringify(0));
            localStorage.setItem("itemshoppingcartadd", JSON.stringify(null));
            localStorage.setItem("itemswishlistadd", JSON.stringify(null));
            dispatch(getLeeIra(0));
            dispatch(getAddLogin([]));
            localStorage.setItem("ira", JSON.stringify(0));

            localStorage.setItem("placeholdersearch", JSON.stringify(datfind));
            if (!dat)
                localStorage.setItem("eraseplaceholder", JSON.stringify(0));
            else localStorage.setItem("eraseplaceholder", JSON.stringify(1));

            let longdatfind = 0;
            let longmenosuno = 0;
            let cadenaExtraida = "";

            let texto = datfind.split(" ");

            datfind = "";
            texto &&
                texto.map((palabra) => {
                    longdatfind = palabra.length;
                    longmenosuno = longdatfind - 1;
                    cadenaExtraida = palabra.substring(
                        longmenosuno,
                        longdatfind
                    );

                    if (cadenaExtraida == "s" || cadenaExtraida == "S") {
                        let cadenaExtraidaDos = palabra.substring(
                            0,
                            longmenosuno
                        );
                        datfind = datfind + " " + cadenaExtraidaDos;
                        //console.log("TEXTO : ", datfind);
                    } else if (
                        cadenaExtraida == "a" ||
                        cadenaExtraida == "A" ||
                        cadenaExtraida == "o" ||
                        cadenaExtraida == "O"
                    ) {
                        let cadenaExtraidaDos = palabra.substring(
                            0,
                            longmenosuno
                        );
                        datfind = datfind + " " + cadenaExtraidaDos;
                    } else datfind = datfind + " " + palabra;
                });

            setControl(false);
            let string = vehicle
                ? `${vehicle.brand}, ${vehicle.year}, ${vehicle.model}, ${
                      vehicle.cilinder
                  } ${vehicle.fuel} ${
                      vehicle.transmision !== undefined
                          ? ", " + vehicle.transmision + ", "
                          : ", "
                  } ${datfind}`
                : datfind;

            if (stringx == string) {
                string = 0;
            } else {
                stringx = string;
                //contador = 0;
            }

            if (string == " " && contador < 7) {
                contador = contador + 1;
                string = contador;
            } else {
                contador = 0;
            }
            router.push(`/search?keyword=${string}`);
        };

        const onChangeInput = (dat) => {
            if (mostrarCoincidencia.length == 0) setControlReg(0);

            setIsLoading(true);
            let data = dat;
            let blanco = data.toLowerCase().split(" ");
            if (blanco[0] == "") {
                let newdata = data
                    .toLowerCase()
                    .substring(1, data.toLowerCase().length);
                data = newdata;
            }

            let datax = data.toLowerCase();
            let long = data.toLowerCase().length;
            setErase(datax);

            if (long == 0) {
                setFindWord(false);
                setWordIni(false);
                coincideproducto = [];
                dataencontrada = [];
                datprd = [];
                coincidebdprod = [];
                unicoitem = [];
                mostrar = [];
                setMostrarCoincidencia([]);
            }

            setDataInput(data);
            setInput(data);

            if (long > 2) {
                setClaseContent("dropdown-content");
                setMostrarResultados("");
                setControl(true);
            } else {
                setClaseContent("dropdown-content-close");
                //setInput("Busca el producto para tu vehículo")
                setControl(false);
            }

            let datbuscar = data.toLowerCase().split(" ");

            const leebd = async () => {
                let longdatfind = datbuscar[0].length;

                if (long < 4 && dataencontrada.length == 0) {
                    setWordIni(false);
                }

                let datafind;
                let longmenosuno = longdatfind - 1;
                let cadenaExtraida = datbuscar[0].substring(
                    longmenosuno,
                    longdatfind
                );

                if (cadenaExtraida == "s" || cadenaExtraida == "S") {
                    let cadenaExtraidaDos = datbuscar[0].substring(
                        0,
                        longmenosuno
                    );
                    datafind = cadenaExtraidaDos;
                    //console.log("TEXTO : ", datfind);
                } else if (
                    cadenaExtraida == "a" ||
                    cadenaExtraida == "A" ||
                    cadenaExtraida == "o" ||
                    cadenaExtraida == "O"
                ) {
                    let cadenaExtraidaDos = datbuscar[0].substring(
                        0,
                        longmenosuno
                    );
                    datafind = cadenaExtraidaDos;
                } else datafind = datbuscar[0];

                let complete = "";
                datbuscar &&
                    datbuscar.map((item, index) => {
                        if (index == 0) complete = datafind;
                        else complete = complete + " " + item;
                    });

                datafind = complete;
                //console.log("SALE : ", datafind);

                data = datafind;
                let longprd = long - 1;

                let longcoin = coincideproducto.length;

                for (var i = longcoin; i < longprd; i++) {
                    if (longprd >= 3 && i > 2) {
                        //console.log("ITEM : ", i)
                        const nameproduct = async () => {
                            let buscar = data.substring(0, longprd);
                            let params = {
                                name_contains: buscar,
                            };

                            await axios({
                                method: "post",
                                url: "https://gimcloud.com.co/mrp/api/40",
                                params,
                            }).then((res) => {
                                let valor = 100;

                                res.data &&
                                    res.data.map((row) => {
                                        let wordcoincide =
                                            row.titulonombre.split(" ");
                                        wordcoincide &&
                                            wordcoincide.map((tem, index) => {
                                                if (index == 0) {
                                                    let compara = tem.substring(
                                                        0,
                                                        longprd
                                                    );
                                                    if (
                                                        buscar.toLowerCase() ==
                                                        compara.toLowerCase()
                                                    ) {
                                                        valor = valor + 1;

                                                        let item = {
                                                            value: valor,
                                                            label: tem.toLowerCase(), //row.titulonombre,
                                                            name: tem.toLowerCase(),
                                                        };
                                                        coincidebdprod.push(
                                                            item
                                                        );
                                                    }
                                                }
                                            });
                                        coincidebdprod &&
                                            coincidebdprod.map((item) => {
                                                let valid;
                                                valid = unicoitem.includes(
                                                    item.label
                                                );
                                                if (!valid) {
                                                    unicoitem.push(item.label);
                                                    coincideproducto.push(item);
                                                }
                                            });
                                    });

                                if (coincideproducto.length > 0)
                                    datprd = coincideproducto;
                            });
                        };
                        //nameproduct();
                    }
                }

                let datosbuscador = [];
                ordercoincidencia &&
                    ordercoincidencia.map((row) => {
                        datosbuscador.push(row);
                    });

                coincideproducto &&
                    coincideproducto.map((igual) => {
                        datosbuscador.push(igual);
                    });

                if (
                    dataencontrada.length > 0 &&
                    ordercoincidencia.length == 0
                ) {
                    dataencontrada &&
                        dataencontrada.map((row) => {
                            datosbuscador.push(row);
                        });
                    coincideproducto &&
                        coincideproducto.map((igual) => {
                            datosbuscador.push(igual);
                        });
                }
                //console.log("BUSXXX : ", datosbuscador);

                let unico = [];
                let result = [];
                let contador = 0;

                let datosfiltrados = [];
                datosbuscador &&
                    datosbuscador.map((row) => {
                        let valid;
                        let compara = row.label.toLowerCase();
                        let dat = data.toLowerCase();
                        //console.log("COMPARA : ", compara," - ", data)
                        valid = compara.includes(data);
                        if (valid) {
                            datosfiltrados.push(row);
                        }
                    });

                datosfiltrados &&
                    datosfiltrados.map((item) => {
                        let valid;
                        let compara = item.label.toLowerCase();

                        valid = unico.includes(compara);
                        if (!valid) {
                            unico.push(compara);
                            result.push(item);
                        }
                    });

                //console.log("RESX : ", result);

                if (result.length > 0) {
                    setIsLoading(false);
                    let itemunicotres = [];
                    let resulttres = [];
                    let sinordenar = [];

                    result &&
                        result.map((item) => {
                            let valid;
                            valid = itemunicotres.includes(item.label);
                            if (!valid) {
                                resulttres.push(item);
                                itemunicotres.push(item.label);
                            }

                            let partword = item.label.split(" ");
                            partword &&
                                partword.map((row, index) => {
                                    let valid = row.includes(0);

                                    if (index == 0 && !valid) {
                                        sinordenar.push(item.label);
                                    }
                                });
                        });

                    let ordenado = sinordenar.sort();

                    let norepeat = [];
                    let contnorepeat = [];
                    let itemunico = [];

                    resulttres &&
                        resulttres.map((item) => {
                            //console.log("BUSCA : ",item)
                            let texto = item.label.toLowerCase();
                            let partword = texto.split(" ");
                            let temdos = datax.split(" ");

                            let contador = 0;
                            partword &&
                                partword.map((row) => {
                                    temdos &&
                                        temdos.map((comp) => {
                                            if (row.includes(comp)) {
                                                contador = contador + 1;

                                                let rep = {
                                                    value: item.value,
                                                    label: texto,
                                                    reg: contador,
                                                };

                                                let repuno = item.value;

                                                let valid =
                                                    contnorepeat.includes(
                                                        repuno
                                                    );
                                                if (!valid) {
                                                    norepeat.push(rep);
                                                    contnorepeat.push(repuno);
                                                }
                                            }
                                        });
                                });
                        });

                    let partx = datax.split(" ");
                    let ordnorepeat = [];
                    let ordnorepeatvalue = [];
                    let unica = [];
                    let oneword = [];

                    norepeat &&
                        norepeat.map((item) => {
                            let partword = item.label.split(" ");
                            partword &&
                                partword.map((row, index) => {
                                    if (index == 0) {
                                        if (row.includes(partx[0])) {
                                            ordnorepeat.push(item.label);
                                            let first = {
                                                label: item.label,
                                                value: item.value,
                                                first: item.label,
                                            };
                                            oneword.push(item.label);
                                            unica.push(item.value);
                                            ordnorepeatvalue.push(first);
                                        }
                                    }
                                });
                        });

                    norepeat &&
                        norepeat.map((item) => {
                            let valid = unica.includes(item.value);
                            if (!valid) {
                                ordnorepeat.push(item.label);
                                let first = {
                                    label: item.label,
                                    value: item.value,
                                    first: 0,
                                };
                                ordnorepeatvalue.push(first);
                            }
                        });

                    let orderoneword = oneword.sort();
                    let resultordenado = [];
                    let contreg = 0;

                    orderoneword &&
                        orderoneword.map((item) => {
                            ordnorepeatvalue &&
                                ordnorepeatvalue.map((row) => {
                                    if (item == row.first) {
                                        contreg = contreg + 1;
                                        if (contreg <= 20)
                                            resultordenado.push(row);
                                    }
                                });
                        });

                    ordnorepeatvalue &&
                        ordnorepeatvalue.map((row) => {
                            let valid = unica.includes(row.value);
                            if (!valid) {
                                contreg = contreg + 1;
                                if (contreg <= 20) resultordenado.push(row);
                            }
                        });
                    setMostrarCoincidencia(resultordenado);
                } else {
                    setIsLoading(false);

                    if (mostrarCoincidencia.length > 0)
                        mostrar = mostrarCoincidencia;

                    let acentos;
                    let palabra = "";

                    for (var i = 0; i < datax.length; i++) {
                        acentos = datax.substr(i, 1);
                        if (
                            acentos == "á" ||
                            acentos == "é" ||
                            acentos == "í" ||
                            acentos == "ó" ||
                            acentos == "ú"
                        ) {
                            if (acentos == "á") palabra = palabra + "a";
                            else if (acentos == "é") palabra = palabra + "e";
                            else if (acentos == "í") palabra = palabra + "i";
                            else if (acentos == "ó") palabra = palabra + "o";
                            else if (acentos == "ú") palabra = palabra + "u";
                        } else {
                            palabra = palabra + acentos;
                        }
                    }
                    //console.log("PALABRA ",palabra);
                    datax = palabra;

                    let finddata = [];
                    dataWords &&
                        dataWords.map((row) => {
                            let valid = row.palabrabase.includes(datax);
                            let item = {
                                value: row.id,
                                label: row.palabrabase,
                            };
                            if (valid) {
                                finddata.push(item);
                            }
                        });

                    if (finddata.length == 0) {
                        finddata = mostrar;
                    }

                    let partx = [];
                    let borra = datax.split(" ");

                    borra &&
                        borra.map((item) => {
                            if (item != "") partx.push(item);
                        });

                    let norepeat = [];
                    let filterdata = [];
                    let contnorepeat = [];

                    finddata &&
                        finddata.map((item) => {
                            //console.log("BUSCA : ",item)
                            let texto = item.label.toLowerCase();
                            let partword = texto.split(" ");
                            let temdos = datax.split(" ");

                            let contador = 0;
                            partword &&
                                partword.map((row) => {
                                    temdos &&
                                        temdos.map((comp) => {
                                            let comx = comp.trim();
                                            if (comx != "") {
                                                if (row.includes(comx)) {
                                                    contador = contador + 1;

                                                    let rep = {
                                                        value: item.value,
                                                        label: texto,
                                                        reg: contador,
                                                    };

                                                    let repuno = item.value;

                                                    let valid =
                                                        contnorepeat.includes(
                                                            repuno
                                                        );
                                                    if (!valid) {
                                                        filterdata.push(rep);
                                                        contnorepeat.push(
                                                            repuno
                                                        );
                                                    }
                                                }
                                            }
                                        });
                                });
                        });

                    filterdata &&
                        filterdata.map((item) => {
                            let validar;
                            validar = item.label.includes(datax);
                            if (validar) {
                                norepeat.push(item);
                            }
                        });

                    if (norepeat.length == 0) {
                        norepeat = finddata;
                    }

                    let ordnorepeat = [];
                    let ordnorepeatvalue = [];
                    let unica = [];
                    let oneword = [];

                    norepeat &&
                        norepeat.map((item) => {
                            let partword = item.label.split(" ");
                            partword &&
                                partword.map((row, index) => {
                                    if (index == 0) {
                                        if (row.includes(partx[0])) {
                                            ordnorepeat.push(item.label);
                                            let first = {
                                                label: item.label,
                                                value: item.value,
                                                first: item.label,
                                            };
                                            oneword.push(item.label);
                                            unica.push(item.value);
                                            ordnorepeatvalue.push(first);
                                        }
                                    }
                                });
                        });

                    norepeat &&
                        norepeat.map((item) => {
                            let valid = unica.includes(item.value);
                            if (!valid) {
                                ordnorepeat.push(item.label);
                                let first = {
                                    label: item.label,
                                    value: item.value,
                                    first: 0,
                                };
                                ordnorepeatvalue.push(first);
                            }
                        });

                    let orderoneword = oneword.sort();
                    let resultordenado = [];
                    let contreg = 0;

                    orderoneword &&
                        orderoneword.map((item) => {
                            ordnorepeatvalue &&
                                ordnorepeatvalue.map((row) => {
                                    if (item == row.first) {
                                        contreg = contreg + 1;
                                        if (contreg <= 20)
                                            resultordenado.push(row);
                                    }
                                });
                        });

                    ordnorepeatvalue &&
                        ordnorepeatvalue.map((row) => {
                            let valid = unica.includes(row.value);
                            if (!valid) {
                                contreg = contreg + 1;
                                if (contreg <= 20) resultordenado.push(row);
                            }
                        });

                    /*****************************************************************************
                     * REINICIAR CONTROL DE DATOS *
                     ****************************************************************************/

                    if (resultordenado.length == 0) {
                        //console.log("ENTRE");
                        let cont = controlReg + 1;
                        setControlReg(cont);

                        let acentos;
                        let palabra = "";

                        for (var i = 0; i < datax.length; i++) {
                            acentos = datax.substr(i, 1);
                            if (
                                acentos == "á" ||
                                acentos == "é" ||
                                acentos == "í" ||
                                acentos == "ó" ||
                                acentos == "ú"
                            ) {
                                if (acentos == "á") palabra = palabra + "a";
                                else if (acentos == "é")
                                    palabra = palabra + "e";
                                else if (acentos == "í")
                                    palabra = palabra + "i";
                                else if (acentos == "ó")
                                    palabra = palabra + "o";
                                else if (acentos == "ú")
                                    palabra = palabra + "u";
                            } else {
                                palabra = palabra + acentos;
                            }
                        }

                        datax = palabra;

                        let long = data.length - cont;
                        let longx = datax.length - cont;
                        let xdata = data.substring(0, long);
                        let xdatax = datax.substring(0, longx);
                        let finddata = [];

                        if (mostrarCoincidencia.length > 0)
                            mostrar = mostrarCoincidencia;

                        for (var i = 1; i < longx; i++) {
                            if (finddata.length == 0) {
                                dataWords &&
                                    dataWords.map((row) => {
                                        let valid =
                                            row.palabrabase.includes(xdatax);
                                        let item = {
                                            value: row.id,
                                            label: row.palabrabase,
                                        };
                                        if (valid) {
                                            finddata.push(item);
                                        }
                                    });
                            }

                            cont = cont + i;
                            long = data.length - cont;
                            longx = datax.length - cont;
                            xdata = data.substring(0, long);
                            xdatax = datax.substring(0, longx);
                        }

                        if (finddata.length == 0) finddata = mostrar;

                        setIsLoading(false);
                        let partx = [];
                        let borra = xdatax.split(" ");

                        borra &&
                            borra.map((item) => {
                                if (item != "") partx.push(item);
                            });

                        let norepeat = [];
                        let filterdata = [];
                        let contnorepeat = [];

                        finddata &&
                            finddata.map((item) => {
                                //console.log("BUSCA : ",item)
                                let texto = item.label.toLowerCase();
                                let partword = texto.split(" ");
                                let temdos = xdatax.split(" ");

                                let contador = 0;
                                partword &&
                                    partword.map((row) => {
                                        temdos &&
                                            temdos.map((comp) => {
                                                let comx = comp.trim();
                                                if (comx != "") {
                                                    if (row.includes(comx)) {
                                                        contador = contador + 1;

                                                        let rep = {
                                                            value: item.value,
                                                            label: texto,
                                                            reg: contador,
                                                        };

                                                        let repuno = item.value;

                                                        let valid =
                                                            contnorepeat.includes(
                                                                repuno
                                                            );
                                                        if (!valid) {
                                                            filterdata.push(
                                                                rep
                                                            );
                                                            contnorepeat.push(
                                                                repuno
                                                            );
                                                        }
                                                    }
                                                }
                                            });
                                    });
                            });

                        //console.log("NO REPEAT : ", contnorepeat);

                        filterdata &&
                            filterdata.map((item) => {
                                let validar;
                                validar = item.label.includes(xdatax);
                                if (validar) {
                                    norepeat.push(item);
                                }
                            });

                        if (norepeat.length == 0) {
                            norepeat = finddata;
                        }

                        let ordnorepeat = [];
                        let ordnorepeatvalue = [];
                        let unica = [];
                        let oneword = [];

                        norepeat &&
                            norepeat.map((item) => {
                                let partword = item.label.split(" ");
                                partword &&
                                    partword.map((row, index) => {
                                        if (index == 0) {
                                            if (row.includes(partx[0])) {
                                                ordnorepeat.push(item.label);
                                                let first = {
                                                    label: item.label,
                                                    value: item.value,
                                                    first: item.label,
                                                };
                                                oneword.push(item.label);
                                                unica.push(item.value);
                                                ordnorepeatvalue.push(first);
                                            }
                                        }
                                    });
                            });

                        norepeat &&
                            norepeat.map((item) => {
                                let valid = unica.includes(item.value);
                                if (!valid) {
                                    ordnorepeat.push(item.label);
                                    let first = {
                                        label: item.label,
                                        value: item.value,
                                        first: 0,
                                    };
                                    ordnorepeatvalue.push(first);
                                }
                            });

                        let orderoneword = oneword.sort();
                        let resultordenado = [];
                        let contreg = 0;

                        orderoneword &&
                            orderoneword.map((item) => {
                                ordnorepeatvalue &&
                                    ordnorepeatvalue.map((row) => {
                                        if (item == row.first) {
                                            contreg = contreg + 1;
                                            if (contreg <= 20)
                                                resultordenado.push(row);
                                        }
                                    });
                            });

                        ordnorepeatvalue &&
                            ordnorepeatvalue.map((row) => {
                                let valid = unica.includes(row.value);
                                if (!valid) {
                                    contreg = contreg + 1;
                                    if (contreg <= 20) resultordenado.push(row);
                                }
                            });
                        setMostrarCoincidencia(resultordenado);
                    } else {
                        let unica = [];
                        let result = [];
                        resultordenado &&
                            resultordenado.map((row) => {
                                let valid = unica.includes(row.label);
                                if (!valid) {
                                    unica.push(row.label);
                                    result.push(row);
                                }
                            });
                        setMostrarCoincidencia(result);
                    }
                }
                //setMostrarCoincidencia(coincideproducto);
            };
            if (long > 2) leebd();
        };

        const onClickSelect = (data) => {
            tiposgenericos &&
                tiposgenericos.map((row, ind) => {
                    if (data == row.label) {
                        localStorage.setItem(
                            "codigogenerico",
                            JSON.stringify(row.value * -1)
                        );
                    }
                });

            localStorage.setItem("contrview", JSON.stringify(0));
            setClaseContent("dropdown-content-close");
            setDataInput(data);
            setInput(data);
            search(data);
        };

        const onClickSerach = (dat) => {
            localStorage.setItem("esgenerico", JSON.stringify(false));
            localStorage.setItem("codigogenerico", JSON.stringify(0));
            localStorage.setItem("contrview", JSON.stringify(0));
            setClaseContent("dropdown-content-close");

            if (dataInput) search(dataInput);
            else search(input);

            let busquedausuario = [];

            busquedausuario = JSON.parse(
                localStorage.getItem("busquedausuario")
            );

            if (!busquedausuario) busquedausuario = [];

            let busqueda = [];
            numbusquedas = numbusquedas + 1;
            if (!busquedausuario) {
                if (dataInput) {
                    let item = {
                        value: numbusquedas,
                        label: dataInput,
                    };
                    busqueda.push(item);
                    localStorage.setItem(
                        "busquedausuario",
                        JSON.stringify(busqueda)
                    );
                }
            } else {
                if (dataInput) {
                    let sigue = 0;

                    busquedausuario &&
                        busquedausuario.map((row, index) => {
                            busqueda.push(row);
                            sigue = row.value;
                        });

                    if (busqueda.length > 9) busqueda.splice(0, 1);

                    let item = {
                        value: sigue + 1,
                        label: dataInput,
                    };
                    busqueda.push(item);

                    localStorage.setItem(
                        "busquedausuario",
                        JSON.stringify(busqueda)
                    );
                }
            }
        };

        const handleClickAway = () => {
            /*CIERRA VENTA FUERA DEL CLICK DATOS BUSCADOR */
            setClaseContent("dropdown-content-close");
        };

        const borrarCaracteres = (codigo) => {
            if (codigo == 8) {
                setWordIni(false);
                ordercoincidencia = [];
                coincideproducto = [];
                dataencontrada = [];
                datprd = [];
            }
        };

        const onClickInput = () => {
            //console.log("MOSTRAR : ", dataBusquedaUsuario)
            localStorage.setItem("esgenerico", JSON.stringify(false));
            localStorage.setItem("codigogenerico", JSON.stringify(0));
            localStorage.setItem("contrview", JSON.stringify(0));
            if (dataInput.length === 0) {
                //Lee datos ingresados por el usuario en el buscador
                let busquedausuario = [];

                busquedausuario = JSON.parse(
                    localStorage.getItem("busquedausuario")
                );

                if (!busquedausuario) busquedausuario = [];

                const compare = (a, b) => {
                    if (a.value > b.value) {
                        return -1;
                    }
                    if (a.value < b.value) {
                        return 1;
                    }
                    return 0;
                };

                if (busquedausuario.length > 0) busquedausuario.sort(compare);
                //console.log("BUS US :", busquedausuario)

                if (busquedausuario && busquedausuario.length > 0) {
                    setDataBusquedaUsuario(busquedausuario);
                    setMostrarCoincidencia(busquedausuario);
                } else {
                    localStorage.setItem("esgenerico", JSON.stringify(true));
                    setDataBusquedaUsuario(tiposgenericos);
                    setMostrarCoincidencia(tiposgenericos);
                }

                setClaseContent("dropdown-content");
                //setControl(true);
                setIsLoading(false);
            }
        };

        const activarAyuda = () => {
            setShowModalMensajes(true);
            setTituloMensajes("Ejemplos de búsqueda");
            setTextoMensajes("");
            //return;
        };
        //console.log("MOSTRAR : ", mostrarCoincidencia);

        return (
            <Container mt-10 empty={!vehicle}>
                <ModalEjemploBusqueda
                    shown={showModalMensajes}
                    close={setShowModalMensajes}
                    titulo={tituloMensajes}
                    mensaje={textoMensajes}
                    tipo="1"
                />
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="tamañocontainerserach">
                        <div className="tamañoiconobuscar">
                            <div className="dropdown posiciondos">
                                <input
                                    onKeyPress={(e) => oprimeEnter(e)}
                                    onKeyDown={(event) =>
                                        borrarCaracteres(event.keyCode)
                                    }
                                    onChange={(e) =>
                                        onChangeInput(e.target.value)
                                    }
                                    className="inputsearch"
                                    defaultValue={input}
                                    onClick={() => onClickInput()}
                                    value={input}
                                />

                                <div className={claseContent}>
                                    {isLoading ? (
                                        <h4 className="mt-10 ml-15">
                                            Cargando ....
                                        </h4>
                                    ) : (
                                        mostrarCoincidencia &&
                                        mostrarCoincidencia.map(
                                            (item, index) => {
                                                return (
                                                    <a
                                                        onClick={() =>
                                                            onClickSelect(
                                                                item.label
                                                            )
                                                        }>
                                                        {index <= 19
                                                            ? item.label
                                                            : null}
                                                    </a>
                                                );
                                            }
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="pt-9">
                                <div
                                    onClick={() => activarAyuda()}
                                    className="cajainfoejemplobusqueda posicionuno">
                                    <InfoIcon
                                        className="mtmenos5 mlmenos4"
                                        style={{
                                            fontSize: 27,
                                        }}></InfoIcon>
                                </div>
                            </div>
                            <div className="tamañocajainputsearchicon">
                                <button
                                    className="tamañoinputsearchicon"
                                    onClick={() => onClickSerach(dataInput)}>
                                    <Glass />
                                </button>
                            </div>
                        </div>
                        <button className="window-toggle-button" ref={ref}>
                            <p>{loading ? "Cargando..." : content}</p>
                            <CarIcon />
                        </button>
                    </div>
                </ClickAwayListener>
            </Container>
        );
    }
);
// <LoadingSpinner />
Searcher.displayName = "Searcher";

export default Searcher;

interface ContainerProps {
    empty: boolean;
}

const Container = styled.div<ContainerProps>`
    /*border: 1px ${Themes.lightMain} solid;*/
    /* background: ${Themes.lightMain}; */
    display: grid;
    padding: 0.75rem;
    border-radius: 10px !important;

    @media screen and (min-width: ${Themes.sm}) {
        border-radius: 999px;
        ${(props) =>
            props.empty
                ? "grid-template-columns: 30% 70%;"
                : "grid-template-columns: 40% 60%;"}
    }

    .input-container {
        background: ${Themes.main};
        border-radius: 10px;
        display: grid;
        grid-template-columns: 1fr auto;
        margin-bottom: 0.5rem;
        overflow: hidden;
        width: 100%;

        @media (min-width: ${Themes.sm}) {
            margin-bottom: 0;
            order: 2;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        #searcher {
            font-size: 1.7rem;
            background: ${Themes.grayBlue};
            padding: 0.75rem;

            &:placeholder {
                font-weight: 500;
            }
        }

        svg {
            /* border-left: 2px rgb(156 163 175) solid; */
            cursor: pointer;
            fill: white;
            height: 100%;
            padding: 0.75rem;
            aspect-ratio: 1.5/1;
        }
    }

    .window-toggle-button {
        /* border: 1px ${Themes.main} solid; */
        align-items: left;
        border-radius: 7px;
        background-color: ${Themes.lightMain};
        display: flex;
        gap: 0.5rem;
        margin-top: -21px !important;
        justify-content: center;
        padding: 0.75rem 1rem;
        width: 29%;
        height: 105%;

        p {
            color: ${Themes.main};
            font-weight: 500;
            margin-bottom: 0;
            font-size: 1.3rem;
        }

        @media (min-width: ${Themes.sm}) {
            order: 1;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        svg {
            height: 2.2rem;
            flex: none;
            fill: ${Themes.main};
        }
    }
`;
