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

class ProfilePage extends Component {
    state = {
        user: [],
        isLoading: true,
        uid: Auth.getCurrentUID()
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

    render() {
        const { user, isLoading } = this.state;

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
                <Title type={4}>Overview offers</Title>
                <Divider></Divider>
                {
                    user.posts && user.posts.map((post, index) => (
                        <PostCardProfile key={ post.id } post={ post } />
                    ))
                }
            </React.Fragment>
        )
    }
}

export default (ProfilePage);