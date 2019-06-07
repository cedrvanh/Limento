import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabItem from '../tab-item';

const styles = theme => ({
    root: {
        backgroundColor: '#FF5555',
        color: "#FFF"
    },
    indicator: {
        '& div > span': {
            backgroundColor: 'white'
        }
    }
});

function TabList(props) {
    const { classes } = props;
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Tabs className={[classes.root, classes.indicator]} value={value} indicatorColor="primary" onChange={handleChange} centered>
            <TabItem label={'Offers'} />
            <TabItem label={'Requests'} />
        </Tabs>
    )
}

export default withStyles(styles)(TabList);