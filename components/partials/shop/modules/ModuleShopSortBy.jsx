import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";

const ModuleShopSortBy = (props) => {
    const { ordenarPor, setOrdenarPor, textoOrdenar, setTextoOrdenar } = props;

    const sortByItems = [
        {
            id: 1,
            text: "Más reciente",
        },
        {
            id: 2,
            text: "De mayor a menor precio",
        },
        {
            id: 3,
            text: "De menor a mayor precio",
        },
    ];

    const viewItems = sortByItems.map((item) => (
        <Menu.Item className="textocolor" key={item.id}>
            <a onClick={() => ordenar(item.id, item.text)}>{item.text}</a>
        </Menu.Item>
    ));
    const view = <Menu>{viewItems}</Menu>;

    const ordenar = (item, texto) => {
        setOrdenarPor(item);
        setTextoOrdenar(texto);
    };

    return (
        <div className="ps-shop__sortby">
            <span> </span>
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle">
                <Button>
                    {textoOrdenar}{" "}
                    <i className="icon-chevron-down textocolorflecha"></i>
                </Button>
            </Dropdown>
        </div>
    );
};

export default ModuleShopSortBy;
