import React from 'react';
import Button from '@material-ui/core/Button';

const BaseButton = (text) => {
    return (
        <Button variant="contained" color="primary">
            { this.props.children }
        </Button>
    );
}


export default BaseButton;