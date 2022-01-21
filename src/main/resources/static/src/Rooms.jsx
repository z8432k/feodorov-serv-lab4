import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useEffect, useRef, useState} from "react";
import {Button, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {SimpleDialog} from "./Dialog";
import Actions from "./Actions";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false);

    function loadRooms() {
        fetch("http://localhost:3000/rooms/")
            .then((resp) => resp.json())
            .then(setRooms);
    }

    useEffect(loadRooms, []);

    function onDelClick(data) {
        fetch("http://localhost:3000/rooms/" + data.row.id, {
            method: 'DELETE',
        })
        .then(loadRooms);
    }

    const columns = [
        {
            field: 'name',
            headerName: 'room',
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
            renderCell: (data) => (<Actions onClick={(e) => onDelClick(data, e)}/>)
        }
    ];

    const value1Ref = useRef('');
    const value2Ref = useRef('');

    async function addRoom() {
        await fetch("http://localhost:3000/rooms/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: value1Ref.current.value,
                square: value2Ref.current.value
            })
        });

        setOpen(false);

        return loadRooms();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rooms}
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
                        title="Room"
                    >
                        <Item>
                            <TextField
                                label="Name"
                                id="filled-hidden-label-small"
                                variant="filled"
                                size="small"
                                inputRef={value1Ref}
                            />
                        </Item>
                        <Item>
                            <Button onClick={() => addRoom()} variant="contained">Add</Button>
                        </Item>
                    </SimpleDialog>
                    <Button onClick={() => setOpen(true)} variant="contained">Form</Button>
                </Item>
            </Grid>
        </>
    );
}