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

    setPostType = () => {
        return this.props.activeTab === 0 ? "Offer" : "Request"
    } 

    render() {
        const { posts, onReadMore, activeTab } = this.props;
        
        const filteredPosts = posts.filter((post) => {
            return post.type.name === this.setPostType();
        })

        return (
            <React.Fragment>
                {filteredPosts.map((post, index) => (
                    <PostCard key={ post.id } post={ post } onReadMore={onReadMore}/>
                ))}
            </React.Fragment>
        );
    }
}

export default (PostsLists);