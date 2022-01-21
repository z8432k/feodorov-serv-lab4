import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Button, ButtonGroup, createTheme, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Rooms from "./Rooms";
import Clients from "./Clients";
import Rents from "./Rents";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {orange} from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

const theme = createTheme({
    status: {
        danger: orange[500],
    },
});

function renderPage(page) {
    switch (page) {
        case 'rooms':
            return (<Rooms />);
        case 'clients':
            return (<Clients />);
        default:
            return (<Rents />)
    }
}

export default function RowAndColumnSpacing() {
    const [page, setPage] = useState('rooms');

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>
            <Grid  container
                   direction="column"
                   justifyContent="flex-start"
                   alignItems="center"
                   spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <ButtonGroup variant="contained">
                            <Button onClick={() => setPage("rooms")}>Rooms</Button>
                            <Button onClick={() => setPage("clients")}>Clients</Button>
                            <Button onClick={() => setPage("rent")}>Rent</Button>
                        </ButtonGroup>
                    </Item>
                </Grid>
                {
                    renderPage(page)
                }
            </Grid>
        </ThemeProvider>
    );
}