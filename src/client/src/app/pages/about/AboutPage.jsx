/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import Ghent from '../../assets/images/ghent.jpg';

class AboutPage extends Component {
    render() {
        return (
            <React.Fragment>
                <img src={Ghent} className="about__img" />
                <Typography variant="body1" component="span">
                Limento is an applicafion which allows users to connect with each through food. This means people can offer certain type of food and expect an answer from potential customers. Limento also allows users to ask for an specific dish for a price. Thus, an online free market is build to share passion for food, offering social interectation with other people in the same city.
                <br></br><br></br>
                Our technical concept is a combination of other apps that have proved to work. We just make the scope smaller for greater results having a positive influence in the community of Ghent
                </Typography>
            </React.Fragment>
        )
    }
}

export default (AboutPage);