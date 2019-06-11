/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

import Title from '../base/title';

/*
Styling
*/
import './PostCard.scss'
import UserInfo from '../user-info';

class PostCard extends Component {
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }

    render() {
        const { post } = this.props;
        const IMAGE_PATH = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

        return (
            <React.Fragment>
                <article className="card">
                    <UserInfo user={ post.user } />
                    <img className="card__thumbnail" src={ IMAGE_PATH } />
                    <section className="card__content">
                        <Title type={4} style={{ margin: '8px 0' }}>{ post.title }</Title>
                    </section>
                    <button onClick={(ev) => this.readMoreHandler(ev, post.id)}>More</button>
                </article>
            </React.Fragment>
        );
    }
}

export default (PostCard);