/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Auth } from '../../../services';

class LogOutPage extends Component {
    componentWillMount() {
        this.onLogOut();
    }

    onLogOut = () => {
        Auth.logout();

        /* TODO: Fix redirect */
        this.props.history.push('/login');
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

export default (LogOutPage);