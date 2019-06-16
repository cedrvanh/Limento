/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Import internal libraries
*/
import { Api, Auth } from '../../services';
import { PostDetail } from '../../components/post';
import Spinner from '../../components/base/spinner';

class PostDetailPage extends Component {
    state = {
        post: null,
        isLoading: true,
        uid: Auth.getCurrentUID()
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

    goToMessagePage = () => {
        const newConversation = {
            userOne: this.state.uid,
            userTwo: this.state.post.user.id
        }

        Api.createConversation(newConversation).then(res => {
            this.props.history.push(`/chat/${res.id}`);
        })
    }

    render() {
        const { post, isLoading } = this.state;

        return (
            <React.Fragment>
                {
                    isLoading ? <Spinner /> : <PostDetail data={post} goToChat={this.goToMessagePage}/>
                } 
            </React.Fragment>
        )
    }
}

export default (PostDetailPage);