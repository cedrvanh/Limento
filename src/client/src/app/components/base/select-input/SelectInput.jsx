import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: '8px 6px',
        margin: '16px 0px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0px 3px 6px #E4E4E4',
        borderRadius: '8px'
    },
    input: {
        marginLeft: 8,
        flex: 1,
        border: 'none'
    }
});

const SelectInput = (props) => {
    const { classes, children, ...other } = props; 

    return (
        <Paper className={classes.root}>
            <select {...other} className={classes.input}>
                <option value=''></option>
                { children }
            </select>
        </Paper>
    );
}

export default withStyles(styles)(SelectInput);