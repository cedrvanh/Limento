import React from 'react';

import List from '@material-ui/core/List';
import ConversationItem from '../conversation-item';


const ConversationList = () => {
    return (
        <List>
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
            <ConversationItem />
        </List>
    )
}

export default ConversationList;