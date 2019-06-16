import React from 'react';
import Rating from 'react-rating';

import { withStyles } from '@material-ui/core/styles';

import emptyStar from '../../assets/images/star-empty.png';
import fullStar from '../../assets/images/star-full.png';
import TextInput from '../../components/base/text-input';
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

const CommentInput = (props) => {    
    const { classes, value, onChangeRating, onChangeInput, selectedRating } = props;

    const handleClick = (e) => {
        e.preventDefault();
    
       props.onSubmitComment();
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            props.onSubmitComment();
        }
    }

    return (
        <React.Fragment>
            <Rating 
                id="rating"
                start={0}
                end={5}
                initialRating={selectedRating}
                emptySymbol={<img src={emptyStar} className="icon" />}
                fullSymbol={<img src={fullStar} className="icon" />}
                onChange={onChangeRating}
            />
            <Paper className={classes.root}>
                <InputBase
                    type='text'
                    id='comment'
                    value={value}
                    className={classes.input}
                    onChange={onChangeInput}
                    onKeyPress={handleKeyPress}
                    placeholder='Comment'
                    inputProps={{ 'aria-label': 'Comment' }}
                />
                <IconButton onClick={handleClick}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </React.Fragment>
    )
}

export default withStyles(styles)(CommentInput);