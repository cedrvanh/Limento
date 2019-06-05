/*
Import extenal libraries
*/
import React, { Component } from 'react';

import Title from '../../components/base/title';

class ProfilePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Title className="title" text="Profile Pagina" />
            </React.Fragment>
        )
    }
}

export default (ProfilePage);