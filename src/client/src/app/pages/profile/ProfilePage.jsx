/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Title from '../../components/base/title';

import { Api } from '../../services/';

class ProfilePage extends Component {
    state = {
        user: [],
        isLoading: true,

        // Hardcoded for the moment
        id: '5cfaedcd3fe1590cb4cc8fe2'
    };

    componentWillMount() {
        this.loadUser();
    }

    loadUser = () => {
        Api.findOneUser(this.state.id)
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
                <Title type={3}>{ user.name }</Title>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt molestias in odio quisquam rem architecto voluptatem non, velit illum distinctio earum dicta aspernatur enim doloremque culpa corrupti ea? Iste.
                </p>
            </React.Fragment>
        )
    }
}

export default (ProfilePage);