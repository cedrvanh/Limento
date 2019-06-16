/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

import { Auth } from '../../../services';

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
        const { posts, onReadMore, query } = this.props;
        
        // Filter out Authenticated user posts & selected Post Type
        const filteredPosts = posts.filter((post) => post.type.name === this.setPostType() && post.user.id !== Auth.getCurrentUID());

        return (
            <React.Fragment>
                <section className="cards">
                    {query ? posts.filter((post) => post.user.id !== Auth.getCurrentUID()).map((post, index) => (
                        <PostCard key={ post.id } post={ post } onReadMore={onReadMore}/>
                    )) :
                    
                    filteredPosts && filteredPosts.map((post, index) => (
                        <PostCard key={ post.id } post={ post } onReadMore={onReadMore}/>
                    ))}
                </section>
            </React.Fragment>
        );
    }
}

export default (PostsLists);