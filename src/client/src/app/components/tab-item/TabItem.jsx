import React from 'react';

import Tab from '@material-ui/core/Tab';

function TabItem(props) {
    return <Tab label={props.label} {...props}/>
}

export default TabItem;