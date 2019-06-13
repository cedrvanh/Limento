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

class PostDetailPage extends Component {
    state = {
        post: null,
        isLoading: true,
    };

    componentWillMount() {
        this.loadPost(this.props.match.params.id);
    }

    loadPost = (id) => {
        Api.findOnePost(id)
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    post: data,
                    isLoading: false,
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { post, isLoading } = this.state;

        return (
            <React.Fragment>
                {
                    isLoading ? <Spinner /> : <PostDetail data={post} />
                } 
            </React.Fragment>
        )
    }
}

export default (PostDetailPage);