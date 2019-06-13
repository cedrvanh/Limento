import React from 'react';

import Title from '../base/title';

import './UserInfo.scss';

const UserInfo = ({ user }) => {
    return (
        <section className="user-info">
            <img src={ user.avatar } alt='User Avatar' className="user-info__avatar" />
            <Title type={3}>{ user.name }</Title>
        </section>
    );
}

export default UserInfo;