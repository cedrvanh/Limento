import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { InputBase, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
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

const SearchInput = (props) => {    
    const { classes, onChange, onClick } = props;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            props.onClick();
        }
    }

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <InputBase
                    type='text'
                    id='message'
                    className={classes.input}
                    placeholder='Message'
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                    inputProps={{ 'aria-label': 'Comment' }}
                />
                <IconButton onClick={onClick}>
                    <SendIcon />
                </IconButton>
            </Paper>
        
        </React.Fragment>
    )
}

export default withStyles(styles)(SearchInput);