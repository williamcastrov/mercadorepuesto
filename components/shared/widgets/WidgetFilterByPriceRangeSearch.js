import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box, Grid, Button } from '@mui/material';
import { useRouter } from "next/router";
import PropTypes, { func } from "prop-types";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { getRangosPrecio } from "../../../store/rangosprecio/action";
import { getChangeSearchPrice } from "../../../store/changesearchprice/action";

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function valuetext(value) {
    return `${value}°C`;
}

const WidgetFilterByPriceRangeSearch = (props) => {
    const dispatch = useDispatch();
    const { precioFiltroMinimo, setPrecioFiltroMinimo, setMenorPrecio,
        setMayorPrecio, precioFiltroMaximo, setPrecioFiltroMaximo, setFiltroPrecio } = props;

    const [valueInicial, setValueInicial] = React.useState(1);
    const [valueFinal, setValueFinal] = React.useState(10000000);
    const [value, setValue] = React.useState([1, 10000000]);
    const [classOkPrecio, setClassOkPrecio] = useState('iconookpreciosearch fa fa-angle-right')
    const [classBlock, setClassBlock] = useState('inputdatospreciofiltro')

    const [cambio, setCambio] = React.useState(0);
    const [change, setChange] = useState(false);
    let blockscreen = useSelector((state) => state.blockscreen.blockscreen);

    useEffect(() => {
        let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
        //console.log("PRECIO : ", rangoprecios)
        setValueInicial(rangoprecios.menorprecio);
        setValueFinal(rangoprecios.mayorprecio);
        setValue([rangoprecios.menorprecio, rangoprecios.mayorprecio]);
    }, []);

    const handleChange = (event, newValue) => {
        setChange(true);
        //console.log("PRECIO : ", newValue)
        setValueInicial(newValue[0]);
        setValueFinal(newValue[1]);
        setPrecioFiltroMinimo(newValue[0]);
        setPrecioFiltroMaximo(newValue[1]);
        setValue(newValue);
    };

    useEffect(() => {
        setValue([valueInicial, valueFinal]);
    }, [valueInicial, valueFinal]);

    useEffect(() => {
        if (blockscreen == 1)
            setClassBlock("inputdatospreciofiltro deshabilitardos")
        else
            setClassBlock("inputdatospreciofiltro")
    }, [blockscreen]);

    const handleChangeInicial = (valor) => {
        setChange(false);
        setClassOkPrecio('iconookpreciosearch habilitar fa fa-angle-right')
        //console.log("VAL : ", valor)
        setPrecioFiltroMinimo(valor);
        setValueInicial(valor)
        setValue([valor, valueFinal]);
    };

    const buscarPrd = () => {
        if (!change) {
            let validarprecio;
            let prinicial = "";
            for (var i = 0; i < valueInicial.length; i++) {
                validarprecio = valueInicial.substr(i, 1);
                if (
                    validarprecio == 0 ||
                    validarprecio == 1 ||
                    validarprecio == 2 ||
                    validarprecio == 3 ||
                    validarprecio == 4 ||
                    validarprecio == 5 ||
                    validarprecio == 6 ||
                    validarprecio == 7 ||
                    validarprecio == 8 ||
                    validarprecio == 9
                ) {
                    prinicial = prinicial + validarprecio;
                } else console.log("ES UN NUMERO ", i, validarprecio);
            }

            let prfinal = "";
            for (var i = 0; i < valueFinal.length; i++) {
                validarprecio = valueFinal.substr(i, 1);
                if (
                    validarprecio == 0 ||
                    validarprecio == 1 ||
                    validarprecio == 2 ||
                    validarprecio == 3 ||
                    validarprecio == 4 ||
                    validarprecio == 5 ||
                    validarprecio == 6 ||
                    validarprecio == 7 ||
                    validarprecio == 8 ||
                    validarprecio == 9
                ) {
                    prfinal = prfinal + validarprecio;
                } else console.log("ES UN NUMERO ", i, validarprecio);
            }

            if (!prinicial)
                prinicial = 1;

            if (!prfinal)
                prfinal = 100000000;

            setValueInicial(parseInt(prinicial));
            setValueFinal(parseInt(prfinal));
            setPrecioFiltroMinimo(parseInt(prinicial));
            setPrecioFiltroMaximo(parseInt(prfinal));
            setValue([parseInt(prinicial), parseInt(prfinal)]);
            setFiltroPrecio(true);

            let item = {
                preciominimo: prinicial,
                preciofinal: prfinal
            }
            // Coloca los datos en state arreglo de años de los vehiculos
            dispatch(getRangosPrecio(item));
            dispatch(getChangeSearchPrice(true));
        } else {
            setValueInicial(parseInt(precioFiltroMinimo));
            setValueFinal(parseInt(precioFiltroMaximo));
            setPrecioFiltroMinimo(parseInt(precioFiltroMinimo));
            setPrecioFiltroMaximo(parseInt(precioFiltroMaximo));
            setValue([parseInt(precioFiltroMinimo), parseInt(precioFiltroMaximo)]);
            setFiltroPrecio(true);

            let item = {
                preciominimo: precioFiltroMinimo,
                preciofinal: precioFiltroMaximo
            }
            // Coloca los datos en state arreglo de años de los vehiculos
            dispatch(getRangosPrecio(item));
            dispatch(getChangeSearchPrice(true));
        }
    }

    const handleChangeFinal = (valor) => {
        setChange(false);
        setClassOkPrecio('iconookpreciosearch habilitar fa fa-angle-right')
        setValueFinal(valor);
        setValue([valueInicial, valor]);
        setPrecioFiltroMaximo(valor);
    };

    const limpiarFiltro = () => {
        setMenorPrecio(1);
        setMayorPrecio(10000000);
        setPrecioFiltroMinimo(1);
        setPrecioFiltroMaximo(10000000);
        setValueInicial(1);
        setValueFinal(10000000);
        setValue([1, 10000000]);
        setFiltroPrecio(false);
        dispatch(getChangeSearchPrice(false));
    }

    return (
        <Box sx={{ ml: '4px', width: 200, height: 1 }}>
            <div className={classBlock}>
                <div className="mlmenos9 tamañotextofiltropreciosearch">Por Precio</div>
                <Slider
                    className="tamanofiltropreciosearch"
                    getAriaLabel={() => 'Rango de precio'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={1000}
                    max={10000000}
                />
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                        <NumberFormat
                            placeholder="Precio mínimo"
                            value={valueInicial}
                            className="mlmenos8 sinborder textocolorfiltropreciosearch eliminarflechas"
                            //name={datosBuscar}
                            onChange={(e) => handleChangeInicial(e.target.value)}
                            thousandSeparator={true}
                            prefix={"$ "}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                        <NumberFormat
                            placeholder="Precio máximo"
                            value={valueFinal}
                            className="ml-25 sinborder textocolorfiltropreciosearch eliminarflechas"
                            //name={datosBuscar}
                            onChange={(e) => handleChangeFinal(e.target.value)}
                            thousandSeparator={true}
                            prefix={"$ "}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <i
                            onClick={() => buscarPrd()}
                            className="iconookpreciosearch fa fa-angle-right" aria-hidden="true"></i>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={12} lg={12} className="mt-2">
                        <div
                            className="tamañobotonlimpiarfiltrosearch apuntador"
                            onClick={() => limpiarFiltro()}
                        >
                            Limpiar Filtro
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default WidgetFilterByPriceRangeSearch;
