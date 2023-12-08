import { useState, useEffect } from "react";
import axios from "axios";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductRepository from "~/repositories/ProductRepository";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://gimcloud.com.co/mrp/api/";

let tiposgenericos = [
    { value: -1, name: "Estéticos y cuidados del vehículo" },
    { value: -2, name: "Accesorios interior" },
    { value: -3, name: "Accesorios exterior" },
    { value: -4, name: "Sistemas de sonido y entretenimiento" },
    { value: -5, name: "Iluminación, exploradoras y partes eléctricas" },
    { value: -6, name: "Lubricantes y fluidos" },
    { value: -7, name: "Llantas y rines" },
    { value: -8, name: "Baterías" },
    { value: -9, name: "Plumillas" },
    { value: -10, name: "Herramientas y kit de carreteras" },
]

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [restData, setRestData] = useState([]);
    const [dataPayload, setDataPayload] = useState(null);

    return {
        loading,
        product,
        productItems,
        category,
        dataPayload,
        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload, pageSize = 8) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(
                payload,
                pageSize
            );
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getUsers: async (payload) => {

            setLoading(true);
            let responseData;
            let url = 'https://gimcloud.com.co/mrp/api/api/4/'

            if (payload) {
                responseData = await axios(
                    {
                        method: 'post',
                        url: url,
                        params: payload
                    })
            } else {
                console.log("ERROR CREANDO USUARIO")
            }
        },

        getProducts: async (payload) => {
            //console.log("PAYLOAD : ", payload.name_contains)
            let esgenerico = JSON.parse(localStorage.getItem("esgenerico"));

            setLoading(true);
            let responseData;
            let cadena = "";
            let palabrasseparadas = 0;
            let separatewords = [];
            let datfind = "0";
            let wordcomplete;
            let conectores = JSON.parse(localStorage.getItem("dataconectores"));

            if (payload) {

                if (payload.name_contains)
                    cadena = payload.name_contains;

                setDataPayload(payload.name_contains);

                datfind = JSON.parse(localStorage.getItem("placeholdersearch"));
                wordcomplete = JSON.parse(localStorage.getItem("placeholdersearch"));

                if (!datfind)
                    datfind = "";

                palabrasseparadas = cadena.split(' ')

                let longconectors = conectores.length;

                palabrasseparadas &&
                    palabrasseparadas.map((row) => {
                        let continuar = true;
                        for (var i = 0; i < longconectors; i++) {
                            let item = conectores[i].conector.toLowerCase()
                            if (item == row.toLowerCase() || "" == row.toLowerCase()) {
                                continuar = false;
                                break;
                            }
                        }
                        if (continuar)
                            separatewords.push(row.toLowerCase());
                    });


                responseData = await ProductRepository.getProducts(payload);
                //console.log("RESPDATAUNO : ", responseData)
                setRestData(responseData);
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.getProducts(queries);
                //console.log("RESPDATADOS : ", responseData)
                setRestData(responseData);
            }

            if (responseData) {

                let resultado = [];
                let control = [];

                separatewords &&
                    separatewords.map((row) => {
                        responseData &&
                            responseData.map((item, index) => {
                                let una = item.name.toLowerCase() + " " + item.condicion.toLowerCase() + " " +
                                    item.descripcionproducto.toLowerCase();
                               
                                let dos = row.toLowerCase();

                                let respuesta = una.includes(dos)

                                if (respuesta) {
                                    let it = {
                                        index: index,
                                        id: item.id
                                    }
                                    control.push(it);
                                    resultado.push(item);
                                }
                            });
                    });

               

                let resprod = [];
                let unico = [];
                let validar;

                resultado &&
                    resultado.map((item, index) => {
                        let compara = item.id+item.name;
                        validar = unico.includes(compara);
                        if (!validar) {
                            unico.push(compara);
                            resprod.push(item);
                        }
                    });
                //console.log("RESPDATADOS : ", resprod)

                let validapalabras = [];
                let contarpalabras = [];
                let datosbase = [];
                let datosordenados = [];

                let long = conectores.length;

                if (resprod.length > 0) {

                    datosbase = resprod;
                    resprod &&
                        resprod.map((item) => {
                            let contador = 0;

                            separatewords &&
                                separatewords.map((palabra) => {


                                    let compara = item.marca.toLowerCase() + " " + item.modelos.toLowerCase() +
                                        " " + item.name.toLowerCase() + " " + item.condicion.toLowerCase() +
                                        " " + item.descripcionproducto.toLowerCase();
                                    validapalabras = compara.split(' ');

                                    let wordunique = [];
                                    let wordselect = [];

                                    let valid;
                                    validapalabras &&
                                        validapalabras.map((row) => {
                                            let palabraunique = item.id + row;
                                            valid = wordunique.includes(palabraunique);
                                            if (!valid) {
                                                wordunique.push(palabraunique);
                                                wordselect.push(row);
                                            }
                                        });

                                    wordselect &&
                                        wordselect.map((row) => {
                                            let continuar = true;
                                            for (var i = 0; i < long; i++) {
                                                if (conectores[i].conector == row.toLowerCase()) {
                                                    continuar = false;
                                                    break;
                                                }
                                            }

                                            if (continuar) {
                                                if (row.toLowerCase().includes(palabra.toLowerCase()))
                                                    contador = contador + 1;
                                            }
                                        });
                                });

                            let cont = {
                                id: item.id,
                                cantidad: contador
                            }
                            contarpalabras.push(cont);
                        });
                } else {
                    datosbase = responseData;

                    responseData &&
                        responseData.map((item) => {
                            let contador = 0;
                            separatewords &&
                                separatewords.map((palabra) => {
                                    validapalabras = item.name.split(' ');
                                    validapalabras &&
                                        validapalabras.map((row) => {
                                            let continuar = true;
                                            for (var i = 0; i < long; i++) {
                                                let item = conectores[i].conector.toLowerCase();
                                                if (item == row.toLowerCase()) {
                                                    continuar = false;
                                                    break;
                                                }
                                            }

                                            if (continuar) {
                                                if (palabra.toLowerCase() == row.toLowerCase())
                                                    contador = contador + 1;
                                            }
                                        });
                                });
                            let cont = {
                                id: item.id,
                                cantidad: contador
                            }
                            contarpalabras.push(cont);
                        });
                }

                let wordapart = datfind.split(' ')
                let equal = wordapart[0];

                let result = [];
                let norepeat = [];
                let contnorepeat = [];

                if (wordcomplete) {
                    datosbase &&
                        datosbase.map((item) => {
                            let texto = item.name.toLowerCase() + " " + item.descripcionproducto.toLowerCase() + " " +
                                item.condicion.toLowerCase() + " " + item.marca.toLowerCase() + " " +
                                item.modelos.toLowerCase()
                            let partword = texto.split(' ');
                            let temdos = wordcomplete.split(' ');
                            let contador = 0;

                            partword &&
                                partword.map((row) => {
                                    temdos &&
                                        temdos.map((comp) => {
                                            if (row == comp) {
                                                contador = contador + 1;

                                                let rep = {
                                                    id: item.id,
                                                    word: comp,
                                                    reg: contador
                                                }

                                                let repuno = item.id + comp;

                                                let valid = contnorepeat.includes(repuno);
                                                if (!valid) {
                                                    norepeat.push(rep);
                                                    contnorepeat.push(repuno);
                                                }
                                            }
                                        });
                                });
                        });

                    let ordena = norepeat.sort((b, a) => {
                        return a.reg - b.reg;
                    });

                    contnorepeat = [];
                    //console.log("RESPDATADOS : ", esgenerico)
                    ordena &&
                        ordena.map((ord) => {
                            datosbase &&
                                datosbase.map((item) => {
                                    if (item.id == ord.id) {
                                        let valid = contnorepeat.includes(item.id);
                                        if (!valid) {
                                            result.push(item);
                                            contnorepeat.push(item.id);
                                        }
                                    }
                                });
                        });

                    datosbase &&
                        datosbase.map((item) => {
                            let valid = contnorepeat.includes(item.id);
                            if (!valid) {
                                result.push(item);
                            }
                        });
                } else {
                    datosbase &&
                        datosbase.map((item) => {
                            result.push(item);
                        });
                }

                const datagenericos = JSON.parse(localStorage.getItem("datagenericos"));

                if (payload.name_contains) {
                    tiposgenericos &&
                        tiposgenericos.map((row) => {
                            datagenericos &&
                                datagenericos.map((item) => {
                                    if (row.value == item.posicionproducto) {
                                        let valid = contnorepeat.includes(item.id);
                                        if (!valid) {
                                            result.push(item);
                                        }
                                    }
                                });
                        });
                }

                //Si selecciono categoria genericos filtra o elimina los no genericos
                let filtraresult = [];

                //console.log("RESULT : ", result)

                if (esgenerico) {
                    result &&
                        result.map((item) => {
                            if (item.productogenerico == "Si") {
                                filtraresult.push(item);
                            }
                        });
                }else
                filtraresult = result;

                setProductItems(filtraresult);

                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            } else {
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );

                const datagenericos = JSON.parse(localStorage.getItem("datagenericos"));
                //localStorage.setItem("placeholdersearch", JSON.stringify(null));
                localStorage.setItem("eraseplaceholder", JSON.stringify(null));

                let result = [];
                let contnorepeat = [];

                tiposgenericos &&
                    tiposgenericos.map((row) => {
                        datagenericos &&
                            datagenericos.map((item) => {
                                if (row.value == item.posicionproducto) {
                                    let valid = contnorepeat.includes(item.id);
                                    if (!valid) {
                                        result.push(item);
                                    }
                                }
                            });
                    });

                setProductItems(result);
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );

            if (responseData) {
                setProduct(responseData[0]);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getPublicatById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getPublicationById(
                payload
            );

            if (responseData) {
                setProduct(responseData[0]);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getCategoryBySlug: async (payload) => {
            setLoading(true);
            const response = await ProductRepository.getPrductCategoryBySlug(
                payload
            );
            if (response) {
                setCategory(response);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
