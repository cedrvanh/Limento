import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

class Tag extends Component {    
    state = {
        active: false,
        iconVisible: false,
    }

    onClick = (e, id) => {
        this.props.onTagClick(e, id);

        this.setState(prevState => ({
            active: !prevState.active,
            iconVisible: !prevState.iconVisible
        }));
    }

    render () {
        const { classes, value } = this.props;
        const { active } = this.state;
    
        return (
            <Chip 
                className={['tag', active ? '' : classes.hide ]} 
                color={active ? 'secondary' : 'default'}
                onClick={(e) => this.onClick(e, value)} 
                onDelete={this.onClick}
                clickable 
                {...this.props} 
            />
        )
    }
};

const styles = theme => ({
    hide: {
        '& > svg': {
            visibility: 'hidden'
        }
    }
});

export default withStyles(styles)(Tag);