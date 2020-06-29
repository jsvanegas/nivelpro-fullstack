import React, { useState } from 'react';

import { MenuItem , TextField, makeStyles } from '@material-ui/core';

import TableDocuments from '../table-documents/TableDocuments';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const typeDocuments = [
    { value: '01', label: 'Factura de Venta' },
    { value: '02', label: 'Factura de Exportación' },
    { value: '91', label: 'Nota Crédito' },
    { value: '92', label: 'Nota Débito' },
    { value: '03', label: 'Factura de Contingencia Cliente' },
    { value: '04', label: 'Factura de Contingencia DIAN' },
    { value: 'OT', label: 'Otros Documentos' }
];

function MainContainer() {

    const classes = useStyles();

    const [typeDocument, setTypeDocument] = useState('');

    const handleChange = (event) => {
        setTypeDocument(event.target.value);
    };

    return (
        <>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="nit-emisor" label="NIT del Emisor" />

            <TextField
                id="standard-select-type-document"
                select
                label="Tipo de documento"
                value={typeDocument}
                onChange={handleChange}
                helperText="seleccione el tipo de documento"
            >
                {typeDocuments.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>


            <TextField id="num-document" label="Número de Documento" />


        </form>

        <TableDocuments />
        </>


    );

}

export default MainContainer;