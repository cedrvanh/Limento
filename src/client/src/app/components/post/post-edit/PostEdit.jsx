/*
Import external libraries
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';

import UserInfo from '../../user-info';
import Title from '../../base/title';

class PostEdit extends Component {
    render() {
        const { data: post } = this.props;
        const IMAGE_PATH = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

        return (
            <React.Fragment>
                <p>Test</p>
            </React.Fragment>
        );
    }
}

export default PostEdit;