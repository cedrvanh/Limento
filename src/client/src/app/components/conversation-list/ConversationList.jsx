import React from 'react';

import List from '@material-ui/core/List';
import ConversationItem from '../conversation-item';


const ConversationList = (props) => {
    const { onConversationClick, conversations } = props;
 
    return (
        <List>
            {conversations && conversations.map((conversation, index) => (
                    <ConversationItem key={ conversation.id } conversation={ conversation } onConversationClick={onConversationClick}/>
            ))}
        </List>
    )
}

export default ConversationList;