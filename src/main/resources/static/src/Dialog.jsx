import {Dialog, DialogTitle, List, ListItem} from "@mui/material";
import PropTypes from 'prop-types';


export function SimpleDialog(props) {
    const { onClose, open, children, title } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};
