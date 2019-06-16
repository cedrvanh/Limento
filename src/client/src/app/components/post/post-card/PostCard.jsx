/*
Import external libraries
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import Title from '../../base/title';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserInfo from '../../user-info';
import { Divider } from '@material-ui/core';

class PostCard extends Component {
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }

    render() {
        const { post } = this.props;
        let cardMedia;

        if (post.media && post.type.name == 'Offer') {
            cardMedia = 
                <CardMedia
                    className={"card__thumbnail"}
                    component="img"
                    alt={ post.title } 
                    src={ post.media.path }
                />
        } else if (post.type.name == 'Request') {
            cardMedia = null
        } else {
            cardMedia = <CardMedia
                className={"card__thumbnail"}
                component="img"
                alt={ post.title } 
                src='https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            />
        }
        return (
            <React.Fragment>
                <section className="card">
                    <Link to={`/profile/${ post.user.id }`} style={{ textDecoration: 'none' }}>
                        <UserInfo user={ post.user } />
                    </Link>
                    <Card>
                        { cardMedia }
                        <CardContent className="card__content"> 
                            {post.category && post.type.name == 'Offer' &&
                                <Title type={5}>
                                    Category: { post.category.name }
                                </Title> 
                            }

                            {post.price && post.type.name == 'Offer' &&
                                <Title type={5}>
                                    Price: €{ post.price }
                                </Title> 
                            }

                            <Title type={3}>
                                { post.title }
                            </Title>

                            {post.type.name == 'Request' &&
                                <Typography variant="body2" color="textSecondary" component="p">
                                    { post.synopsis }
                                </Typography>
                            }
                            
                        </CardContent>
                        <CardActions>
                        <Button size="small" color="primary" onClick={(ev) => this.readMoreHandler(ev, post.id)}>
                            Read More
                        </Button>
                        </CardActions>
                    </Card>
                </section>
            </React.Fragment>
        );
    }
}

export default (PostCard);