import React, { Component } from 'react';

import List from '@material-ui/core/List';
import CommentItem from '../comment-item';

class CommentList extends Component {
    render() {
        const { user } = this.props;

        return (
            
            <List>
                { console.log(user.comments == null) }
                {/* {user && user.comments.map((comment, index) => (
                    <CommentItem key={ comment.id } comment={ comment } />
                ))} */}
            </List>
        )
    }
}

export default CommentList;