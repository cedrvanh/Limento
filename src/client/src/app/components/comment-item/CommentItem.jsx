import React, { Component } from 'react';

import emptyStar from '../../assets/images/star-empty.png';
import fullStar from '../../assets/images/star-full.png';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Api } from '../../services';
import Rating from 'react-rating';

class CommentItem extends Component {
    render() {
        const { comment } = this.props;

        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={ comment.author.name } src={ comment.author.avatar } />
                    </ListItemAvatar>
                    <ListItemText
                    primary={` - ${ comment.author.name }` }
                    secondary={
                        <React.Fragment>
                            <Rating 
                                initialRating={ comment.rating } 
                                emptySymbol={<img src={emptyStar} className="icon" />}
                                fullSymbol={<img src={fullStar} className="icon" />}
                                readonly
                            />
                            <Typography variant="span">{ comment.body }</Typography>
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider />
            </React.Fragment>
        )
    }   
}

export default CommentItem;