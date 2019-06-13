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

        return (
            <React.Fragment>
                <article className="card">
                    <img className="card__thumbnail" src={ post.media.path } />
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