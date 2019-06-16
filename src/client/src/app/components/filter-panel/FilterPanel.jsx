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
import SelectInput from '../base/select-input';
import { Api } from '../../services';

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
    state = {
        categories: [],
        tags: [],
    }

    async componentDidMount() {
        await this.loadCategories();
        await this.loadTags();
    }

    loadCategories = () => {
        Api.findAllCategories()
            .then(res => {
                this.setState({
                    categories: res,
                });
            });
    }
    
    loadTags = () => {
        Api.findAllTags()
            .then(res => {
                this.setState({
                    tags: res,
                })
            })
    }

    render() {
        const { classes, isDrawerOpen, handleDrawer } = this.props;
        const { categories, tags } = this.state;
        
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
                    <ListItem>
                        <SelectInput id="selectedCategory">
                            {categories && categories.map((category, index) => (
                                <option key={ category.id } value={ category.name }>{ category.name }</option>
                            ))}
                        </SelectInput>
                    </ListItem>
                    <ListItem>
                        <SelectInput id="selectedTag">
                            <Title type={4}>Tag</Title>
                            {tags && tags.map((tag, index) => (
                                <option key={ tag.id } value={ tag.name }>{ tag.name }</option>
                            ))}
                        </SelectInput>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(FilterPanel);