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
        isLoading: true,
        title: '',
        synopsis: '',
        price: null,
        category: null,
        tags: []
    };

    componentWillMount() {
        console.log(this.props.match.params.id);
        this.loadPost(this.props.match.params.id);
    }

    loadPost = (id) => {
        Api.findOnePost(id)
            .then((post) => {
                this.setState(prevState => ({
                    ...prevState,
                    title: post.title,
                    synopsis: post.synopsis,
                    price: post.price,
                    category: post.category,
                    tags: post.tags,
                    isLoading: false,
                }));
            })
            .catch((err) => {
                console.log(err);
            });
        
    }

    onUpdatePost = () => {
        console.log('Updated Post');

        const updatedPost = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            price: this.state.price
        }

        Api.updatePost(this.props.match.params.id, updatedPost);
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isLoading ? <Spinner /> : 
                    <PostEdit {...this.state} handleChange={this.onChange} handleUpdate={this.onUpdatePost} />
                } 
            </React.Fragment>
        )
    }
}

export default (PostDetailPage);