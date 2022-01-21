import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useEffect, useRef, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {SimpleDialog} from "./Dialog";
import Actions from "./Actions";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function Access() {
    const [rents, setRents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);


    function loadRents() {
        return fetch("http://localhost:3000/access/")
            .then((resp) => resp.json())
            .then(setRents);
    }

    useEffect(async () => {
        await fetch("http://localhost:3000/people/")
            .then((resp) => resp.json())
            .then(setClients);
        await fetch("http://localhost:3000/rooms/")
            .then((resp) => resp.json())
            .then(setRooms);
        await loadRents();
    }, []);

    function onDelClick(data) {
        fetch("http://localhost:3000/access/" + data.row.id, {
            method: 'DELETE',
        })
        .then(loadRents);
    };

    const columns = [
        {
            field: 'person',
            headerName: 'Person',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (data) => data.row.person.name
        },
        {
            field: 'room',
            headerName: 'Room',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (data) => data.row.room.name
        },
        {
            field: 'days',
            headerName: 'Days',
            width: 150,
            editable: false,
            sortable: false,
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (data) => (<Actions onClick={(e) => onDelClick(data, e)}/>)
        }
    ];

    const [client, setClient] = React.useState('');
    const [room, setRoom] = React.useState('');
    const taxRef = useRef('');


    const handleClient = (event) => {
        setClient(event.target.value);
    };

    const handleRoom = (event) => {
        setRoom(event.target.value);
    };

    function addGrant() {
        fetch("http://localhost:3000/access/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: client,
                room_id: room,
                days: taxRef.current.value
            })
        })
        .then(loadRents);
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
                            rows={rents}
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={client}
                                    label="Client"
                                    onChange={handleClient}
                                >
                                    {
                                        clients.map((c, k) => (<MenuItem key={k} value={c.id}>{c.name}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Item>
                        <Item>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Room</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={room}
                                    label="Room"
                                    onChange={handleRoom}
                                >
                                    {
                                        rooms.map((r, k) => (<MenuItem key={k} value={r.id}>{r.name}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Item>
                        <Item>
                            <TextField
                                label="Days"
                                id="filled-hidden-label-small"
                                variant="filled"
                                size="small"
                                inputRef={taxRef}
                            />
                        </Item>
                        <Item>
                            <Button onClick={() => addGrant()} variant="contained">Add</Button>
                        </Item>
                    </SimpleDialog>
                    <Button onClick={() => setOpen(true)} variant="contained">Form</Button>
                </Item>
            </Grid>
        </>
    );
}