/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

import Title from '../../base/title';

import UserInfo from '../../user-info';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';

class PostCardProfile extends Component {

    onEditHandler = (id) => {
        this.props.onEditHandler(id);
    }

    onDeleteHandler = (id) => {
        this.props.onDeleteHandler(id);
    }
    
    render() {
        const { post } = this.props;

        return (
            <React.Fragment>
                <article className="card--profile">
                    { post.media && <img className="card--profile__thumbnail" src={ post.media.path } /> }
                    <section className="card--profile__content">
                        <Title type={5}>{ post.title }</Title>
                    </section>
                    <section className="card--profile__meta">
                        <Tooltip title="Edit">
                            <IconButton aria-label="Edit">
                                <EditIcon onClick={() => this.onEditHandler(post.id)} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon onClick={() => this.onDeleteHandler(post.id)} />
                            </IconButton>
                        </Tooltip>
                    </section>
                </article>
                <Divider></Divider>
            </React.Fragment>
        );
    }
}

export default (PostCardProfile);