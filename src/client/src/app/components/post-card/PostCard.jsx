/*
Import external libraries
*/
import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Title from '../base/title';

/*
Styling
*/
import './PostCard.scss'

class PostCard extends Component {

    render() {
        const { post } = this.props;
        const IMAGE_PATH = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

        return (
            <React.Fragment>
                {/* <Card>
                    <CardActionArea>
                        <CardContent>
                            <Title type={2}>
                                fdgdfgdfg
                            </Title>
                            <p>
                                { post ? 'True' : 'False' }
                            </p>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                </Card> */}
                <article class="card">
                    <img class="card__thumbnail" src={IMAGE_PATH}/>
                    <section class="card__content">
                        <Title type={2} style={{ margin: '8px 0' }}>Verse groenten</Title>
                    </section>
                </article>
            </React.Fragment>
        );
    }
}

export default (PostCard);