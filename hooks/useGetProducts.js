import { useState } from "react";
import axios from "axios";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductRepository from "~/repositories/ProductRepository";
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://sitbusiness.co/mrp/api/";

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);

    return {
        loading,
        product,
        productItems,
        category,
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
            console.log("PAYLOAD : ", payload)
            
            setLoading(true);
            let responseData;
            let url = 'https://sitbusiness.co/mrp/api/api/4/'
            
            if (payload) {
                responseData = await axios(
                    {
                        method: 'post',
                        url:url,
                        params: payload
                    })
            } else {
                console.log("ERROR CREANDO USUARIO")
            }

            if (responseData) {
                console.log("RESPONSEDATA : ", responseData)
            }
        },

        getProducts: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getProducts(payload);
                //console.log("RESPUESTA API 17 GETPRD : ", responseData)
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.getProducts(queries);
            }

            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            //console.log("PAYLOAD PRODUCTBYID : ", payload)
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            //console.log("RESPONSE DATA : ", responseData[0])
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
            //console.log("PAYLOAD PRODUCTBYID : ", payload)
            setLoading(true);
            const responseData = await ProductRepository.getPublicationById(
                payload
            );
            //console.log("RESPONSE DATA : ", responseData[0])
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
