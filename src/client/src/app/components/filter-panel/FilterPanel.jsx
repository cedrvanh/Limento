import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Title from '../base/title';

const styles = theme => ({
    drawerPaper: {
        width: '75%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-start',
    },
});

class FilterPanel extends Component {
    render() {
        const { classes, isDrawerOpen, handleDrawer } = this.props;

        return (
            
            <Drawer
            variant="persistent"
            anchor="right"
            classes={{
                paper: classes.drawerPaper,
            }}
            open={isDrawerOpen}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List> 
                    <ListItem>
                        <Title type={3}>Filters</Title>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(FilterPanel);