/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { Auth } from '../../../services';

class LogOutPage extends Component {
    
    componentWillMount() {
        this.onLogOut();
    }

    onLogOut = () => {
        Auth.logout();
    }

    render() {
        return (
            <Redirect to="/login" />
        )
    }
}

export default withRouter(LogOutPage);