/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

/*
Styling
*/
import './PostsList.scss'
import PostCard from '../post-card';

class PostsLists extends Component {
    render() {
        const { posts, onReadMore } = this.props;

        return (
            <React.Fragment>
                {posts && posts.map( (post, index) => (
                    <PostCard key={ post.id } post={ post } onReadMore={onReadMore}/>
                ))}
            </React.Fragment>
        );
    }
}

export default (PostsLists);