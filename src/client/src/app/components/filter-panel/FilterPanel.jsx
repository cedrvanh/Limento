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

const filters = [
    { name: 'Date', value: 'date', },
    { name: 'Price', value: 'price', },
]

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

    onClick = (e, filters) => {
        e.preventDefault();

        this.props.handleFilterSubmit(filters);
    }

    render() {
        const { classes, isDrawerOpen, handleDrawer, handleFilterChange } = this.props;
        const { categories, tags } = this.state;
        
        return (
            
            <Drawer
            variant="persistent"
            anchor="right"
            classes={{
                paper: 'drawerPaper',
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
                        <SelectInput id="selectedCategory" onChange={handleFilterChange}>
                            <option value=''>Select a category</option>
                            {categories && categories.map((category, index) => (
                                <option key={ category.id } value={ category.name }>{ category.name }</option>
                            ))}
                        </SelectInput>
                    </ListItem>
                    <ListItem>
                        <SelectInput id="selectedTag" onChange={handleFilterChange}>
                            <option value=''>Select a tag</option>
                            {tags && tags.map((tag, index) => (
                                <option key={ tag.id } value={ tag.name }>{ tag.name }</option>
                            ))}
                        </SelectInput>
                    </ListItem>
                    <ListItem>
                        <SelectInput id="selectedSort" onChange={handleFilterChange}>
                            <option value=''>Sort by</option>
                            {filters && filters.map((filter, index) => (
                                <option key={ index } value={ filter.value }>{ filter.name }</option>
                            ))}
                        </SelectInput>
                    </ListItem>
                    <ListItem>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={(e) => this.onClick(e, this.props.filters)}
                        >
                            Apply Filters
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(FilterPanel);