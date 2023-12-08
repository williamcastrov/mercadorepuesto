import React, { useState, useEffect } from "react";
import conditions from "~/public/static/data/conditions.json";

let condicion = [
    { value: 1, name: "Nuevo" },
    { value: 2, name: "Usado" },
];

const WidgetShopFilterByConditionsResult = (props) => {
    const {
        marcarCondicion,
        setMarcarCondicion,
        condition,
        setCondition,
        setFiltroCond,
        filtroCond,

        itemSelCond,
        setitemSelCond,
        setActCiy,
        setPaginaSel,
        setitemIni,
        setItemFin,
        setIrInicio,
    } = props;

    const SelectCondition = (item) => {
        if (itemSelCond == 1 && item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setActCiy(true);
            setPaginaSel(1);
            setitemIni(1);
            setItemFin(40);
        } else if (itemSelCond == 2 && item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setActCiy(true);
            setPaginaSel(1);
            setitemIni(1);
            setItemFin(40);
        } else {
            setActCiy(true);
            setCondition(item);
            setitemSelCond(item);
            setFiltroCond(item);
            setMarcarCondicion("subrayartexto");
            setIrInicio(true);
            setPaginaSel(1);
            setitemIni(1);
            setItemFin(40);
        }
    };

    return (
        <aside>
            <div className="widget-title tamañotextotitulocondicion">
                Condición
            </div>
            <div>
                {condicion &&
                    condicion.map((item, index) => {
                        return (
                            <div className="form-group">
                                <div
                                    className="mtmenos20"
                                    onClick={() => SelectCondition(item.value)}>
                                    {item.value == itemSelCond &&
                                    filtroCond > 0 ? (
                                        <div>
                                            <i
                                                className="tamañoletra11 fa fa-check-square-o colorbase"
                                                aria-hidden="true"></i>
                                            <label
                                                className={marcarCondicion}
                                                htmlFor="five-star">
                                                <span className="ps-rating tamañoletra11 colorbase">
                                                    <a>{item.name} </a>
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div>
                                            <i
                                                className="tamañoletra11 fa fa-square-o colorbase"
                                                aria-hidden="true"></i>
                                            <label htmlFor="five-star">
                                                <span className="ps-rating tamañoletra11 colorbase">
                                                    <a>{item.name} </a>
                                                </span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </aside>
    );
};

export default WidgetShopFilterByConditionsResult;
