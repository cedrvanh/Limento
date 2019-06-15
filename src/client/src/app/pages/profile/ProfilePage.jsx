/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Title from '../../components/base/title';

import { Api, Auth } from '../../services/';
import UserInfo from '../../components/user-info';
import { PostCardProfile } from '../../components/post';
import Spinner from '../../components/base/spinner';
import CommentList from '../../components/comment-list';
import CommentInput from '../../components/comment-input';

class ProfilePage extends Component {
    state = {
        user: [],
        isLoading: true,
        uid: Auth.getCurrentUID(),
        comment: '',
        selectedRating: 0
    };

    componentWillMount() {
        this.loadUser(this.props.match.params.id);
    }

    loadUser = (id) => {
        Api.findOneUser(id)
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    user: data,
                    isLoading: false
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToEditPage = (id) => {
        this.props.history.push(`/feed/${id}/edit`);
    }

    submitComment = () => {
        const newComment = {
            author: this.state.uid,
            rating: this.state.selectedRating,
            body: this.state.comment,
        }
        console.log('Comment submitted');
        /*
        Api.createComment(newComment)
            .then(comment => {
                const updateUserWithComment = {
                    comments: comment.id
                }
                Api.updateUser(updateUserWithComment);
            });
        */
    }

    onChangeRating = (rating) => {
        this.setState({
            selectedRating: rating
        })
    } 

    onChangeComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    } 

    onDeletePost = (id) => {
        Api.deletePost(id);
    }

    isOnOwnProfile = () => {
        return this.props.match.params.id === this.state.uid;
    }

    render() {
        const { user, isLoading, uid, comment, selectedRating } = this.state;


        if (isLoading) {
            return <Spinner />
        }

        return (
            <React.Fragment>
                <UserInfo user={ user } />
                <Title type={4}>Bio: </Title>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt molestias in odio quisquam rem architecto voluptatem non, velit illum distinctio earum dicta aspernatur enim doloremque culpa corrupti ea? Iste.
                </p>
                {   this.isOnOwnProfile() &&
                    <React.Fragment>
                        <Title type={4}>Overview offers</Title>
                        <Divider />
                        {
                            user.posts && user.posts.map((post, index) => (
                                <PostCardProfile key={ post.id } post={ post } onEditHandler={this.goToEditPage} onDeleteHandler={this.onDeletePost} />
                            ))
                        }
                    </React.Fragment>
                }
                {
                    !this.isOnOwnProfile() &&
                    <React.Fragment>
                        <Divider />
                        <Title type={4}>Comments</Title>
                        <CommentInput 
                            value={comment} 
                            selectedRating={selectedRating}
                            onChangeRating={this.onChangeRating}
                            onChangeInput={this.onChangeComment} 
                            onSubmitComment={this.submitComment} 
                        />
                        <CommentList user={ user } />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default (ProfilePage);