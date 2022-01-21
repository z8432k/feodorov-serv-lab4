import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useEffect, useRef, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {Button, TextField} from "@mui/material";
import {SimpleDialog} from "./Dialog";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);

    function loadClients() {
        fetch("http://localhost:3000/people/")
            .then((resp) => resp.json())
            .then(setClients);
    }

    useEffect(loadClients, []);

    function onDelClick(data) {
        fetch("http://localhost:3000/people/" + data.row.id, {
            method: 'DELETE',
        })
        .then(loadClients);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'client',
            width: 200,
            editable: false,
            sortable: false,
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 200,
            editable: false,
            sortable: false,
            renderCell: (data) => (<Button onClick={(e) => onDelClick(data, e)} variant="contained" color="error">del</Button>)
        }
    ];

    const valueRef = useRef('');

    function addPerson() {
        fetch("http://localhost:3000/people/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: valueRef.current.value})
        })
        .then(() => setOpen(false))
        .then(loadClients);
    }


    const handleClose = (value) => {
        setOpen(false);
    };


    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={clients}
                            columns={columns}
                            disableSelectionOnClick
                            disableColumnMenu
                        />
                    </div>
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <SimpleDialog
                        open={open}
                        onClose={handleClose}
                        title="Person"
                    >
                        <Item>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                variant="filled"
                                size="small"
                                inputRef={valueRef}
                            />
                        </Item>
                        <Item>
                            <Button onClick={() => addPerson()} variant="contained">Add</Button>
                        </Item>
                    </SimpleDialog>
                    <Button onClick={() => setOpen(true)} variant="contained">Form</Button>
                </Item>
            </Grid>
        </>
    );
}
