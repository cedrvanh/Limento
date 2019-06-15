import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ConversationItem = () => {
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://randomuser.me/api/portraits/women/10.jpg" />
            </ListItemAvatar>
            <ListItemText
                secondary={
                <React.Fragment>
                    <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    >
                    Ali Connors
                    </Typography>
                    {" I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
                }
            />
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    )
}

export default ConversationItem;