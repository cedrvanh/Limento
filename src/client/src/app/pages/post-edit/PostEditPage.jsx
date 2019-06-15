/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Import internal libraries
*/
import { Api } from '../../services';
import { PostDetail } from '../../components/post';
import Spinner from '../../components/base/spinner';
import PostEdit from '../../components/post/post-edit';

class PostDetailPage extends Component {
    state = {
        post: null,
        isLoading: false,
    };

    render() {
        const { post, isLoading } = this.state;

        return (
            <React.Fragment>
                {
                    isLoading ? <Spinner /> : <PostEdit data={ post } />
                } 
            </React.Fragment>
        )
    }
}

export default (PostDetailPage);