import * as React from "react";
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
    Button,
    ButtonGroup,
    createTheme,
    Tab,
    TabPanelUnstyled,
    Tabs,
    TabsListUnstyled,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useState} from "react";
import Rooms from "./Rooms";
import Clients from "./Clients";
import Access from "./Access";
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function RowAndColumnSpacing() {
    const [page, setPage] = useState('rooms');

    function handleChange(event, value) {
        setPage(value);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="center" marginTop={5}>
                    <Grid item xs={10}>
                        <Item>
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={page}
                                    onChange={handleChange}
                                    textColor="secondary"
                                    indicatorColor="primary">

                                    <Tab value="rooms" label="Rooms" />
                                    <Tab value="people" label="People" />
                                    <Tab value="grants" label="Grants" />
                                </Tabs>
                            </Box>
                            <TabPanel value={page} index={'rooms'}>
                                <Rooms />
                            </TabPanel>
                            <TabPanel value={page} index={'people'}>
                                <Clients />
                            </TabPanel>
                            <TabPanel value={page} index={'grants'}>
                                <Access />
                            </TabPanel>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}