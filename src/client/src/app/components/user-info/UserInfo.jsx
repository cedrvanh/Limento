import React from 'react';

import Title from '../base/title';

const UserInfo = ({ user }) => {
    return (
        <section className="user-info">
            <img src={ user.avatar } alt='User Avatar' className="user-info__avatar" />
            <div className="user-info__meta">
                <Title type={3}>{ user.name }</Title>
            </div>
        </section>
    );
}

export default UserInfo;