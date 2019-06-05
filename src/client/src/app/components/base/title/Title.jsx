import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ type = 1, children, ...props }) => {
    const Heading = type > 6 ? 'h6' : `h${type}`;

    return (
        <Heading {...props}>{ children }</Heading>
    );
}

Title.propTypes = {
    type: PropTypes.oneOf([
        1,
        2,
        3,
        4,
        5,
        6
    ])
}

export default Title;