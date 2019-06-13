/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';

import Title from '../../components/base/title';

import { Api, Auth } from '../../services/';
import UserInfo from '../../components/user-info';

class ProfilePage extends Component {
    state = {
        user: [],
        isLoading: true,

        uid: Auth.getCurrentUID()
    };

    componentWillMount() {
        this.loadUser();
    }

    loadUser = () => {
        Api.findOneUser(this.state.uid)
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    user: data,
                    isLoading: false
                }));
                console.log(this.state.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>
                <UserInfo user={ user } />
                <Title type={4}>Bio: </Title>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt molestias in odio quisquam rem architecto voluptatem non, velit illum distinctio earum dicta aspernatur enim doloremque culpa corrupti ea? Iste.
                </p>
                <Divider></Divider>
                {
                    user.posts && user.posts.map((post, index) => (
                        console.log(post)
                    ))
                }
            </React.Fragment>
        )
    }
}

export default (ProfilePage);