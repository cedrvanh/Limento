/*
Import external libraries
*/
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';

/*
Styling
*/
import './PostDetail.scss'

import UserInfo from '../../user-info';
import Title from '../../base/title';
import { Button, Divider } from '@material-ui/core';

class PostDetail extends Component {
    
    goBack = () => {
        this.props.history.goBack();
    }

    onClick = (e) => {
        e.preventDefault();

        this.props.goToChat();
    }
    render() {
        const { data: post, onClick } = this.props;

        return (
            <React.Fragment>
                <article key={ post.id } className={classNames("post--large")}>
                    <Link to={`/profile/${ post.user.id }`} style={{ textDecoration: 'none' }}>
                        <UserInfo user={ post.user } />  
                    </Link>
                    {post.media && <img className="card__thumbnail" alt='Post thumbnail' src={ post.media.path } />}
                    <Title type={3} className="post__price">Price: €{ post.price }</Title>
                    <Title type={1} className="post__title">{ post.title }</Title>
                    
                    { post.category && <span style={{ marginBottom: '1rem' }}>Category: { post.category.name }</span>}<br></br>

                    <br></br>{ post.tags && <ul>Tag: { post.tags.map((tag, index) => {
                        return <li>{ tag.name }</li>
                    })}</ul>}
                    <br></br>
                    <Divider></Divider>
                    <br></br>
                    <div className="post__synopsis">{ post.synopsis }</div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.onClick}
                        style={{ marginTop: '48px' }}
                    >
                        Send a message
                    </Button>
                </article>
            </React.Fragment>
        );
    }
}

export default withRouter(PostDetail);