/*
Import external libraries
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';

/*
Styling
*/
import './PostDetail.scss'

class PostDetail extends Component {
    
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { data: post } = this.props;
        const IMAGE_PATH = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

        return (
            <React.Fragment>
                <article key={ post.id } className={classNames("post--large")}>
                    <span onClick={this.goBack}>Back</span>
                    <img className="card__thumbnail" src={ IMAGE_PATH } />
                    <h1 className="post__title">{ post.title }</h1>
                    <div className="post__synopsis">{ post.synopsis }</div>
                    <div className="post__body">{Parser(post.body)}</div>
                </article>
            </React.Fragment>
        );
    }
}

export default withRouter(PostDetail);