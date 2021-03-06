import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { FormControl } from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: '4px 6px',
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
    }
});

const TextInput = (props) => {
    const { classes, label, onChange, ...other } = props; 

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={label}
                onChange={onChange}
                inputProps={{ 'aria-label': label }}
                {...other}
            />
        </Paper>
    );
}

export default withStyles(styles)(TextInput);