import * as React from "react";
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Button, ButtonGroup, createTheme, Tab, TabPanelUnstyled, Tabs, ThemeProvider, Typography} from "@mui/material";
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


    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="center" marginTop={5}>
                    <Grid item xs={8}>
                        <Item>
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={page}
                                    onChange={handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                >
                                    <Tab value="one" label="Item One" />
                                    <Tab value="two" label="Item Two" />
                                    <Tab value="three" label="Item Three" />
                                </Tabs>
                            </Box>
                        </Item>
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