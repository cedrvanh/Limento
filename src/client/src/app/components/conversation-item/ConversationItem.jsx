import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const ConversationItem = (props) => {
    const { conversation } = props

    function onConversationClick(e, id) {
        e.preventDefault();
        
        if (typeof props.onConversationClick === 'function') {
            props.onConversationClick(id);
        }
    }

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start" onClick={(e) => onConversationClick(e, conversation.id)}>
                <ListItemAvatar>
                    <Avatar alt={ conversation.userTwo.name } src={ conversation.userTwo.avatar } />
                </ListItemAvatar>
                <ListItemText
                    primary={ conversation.userTwo.name } 
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    )
}

export default ConversationItem;