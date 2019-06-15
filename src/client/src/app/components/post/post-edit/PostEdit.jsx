/*
Import external libraries
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';

import TextInput from '../../base/text-input';
import { Button } from '@material-ui/core';

class PostEdit extends Component {
    
    onSubmit = (e) => {
        e.preventDefault();

        this.props.handleUpdate();
    }

    render() {
        const { data: post, handleChange } = this.props;
        return (
            <React.Fragment>
                {/* <img className="card__thumbnail" alt='Post thumbnail' src={ post.media.path } /> */}
                <TextInput type={'text'} id='title' value={ this.props.title } onChange={handleChange} />
                <TextInput type={'text'} id='synopsis'value={ this.props.synopsis } onChange={handleChange} />
                <TextInput type={'number'} id='price' value={ this.props.price ? this.props.price : 0 } onChange={handleChange} />
                <Button variant="contained" color="secondary" fullWidth onClick={this.onSubmit}>
                    Update post
                </Button>
            </React.Fragment>            
        );

    }
}

export default PostEdit;