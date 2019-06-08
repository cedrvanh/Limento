/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';

/*
Utilities
*/
import { RouteWithLayout } from './utilities';

/*
Layout
*/
import { LoginLayout, PageLayout } from './layouts';
import { AdminLayout } from './admin/layouts';

/*
Page components
*/
import HomePage from './pages/home';
import AdminPage from './admin/pages/admin';
import { LoginPage } from './pages/auth';
import NewsPage from './pages/news';
import PostDetailPage from './pages/post-detail';
import ProfilePage from './pages/profile';
import PostCreatePage from './pages/post-create';
import ChatPage from './pages/chat';
import AboutPage from './pages/about';
import NotFoundPage from './pages/404';

/*
Import styling
*/
import './Main.css';
import './_sass/main.scss';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <RouteWithLayout exact path='/' layout={ PageLayout } component={ HomePage }/>
          <Redirect from="/home" to="/"/>
          <RouteWithLayout exact path='/feed' layout={ PageLayout } component={ NewsPage }/>
          <RouteWithLayout exact path='/feed/:id' layout={ PageLayout } component={ PostDetailPage }/>
          <RouteWithLayout exact path='/feed/create' layout={ PageLayout } component={ PostCreatePage }/>
          <RouteWithLayout path='/profile' layout={ PageLayout } component={ ProfilePage }/>
          <RouteWithLayout path='/chat' layout={ PageLayout } component={ ChatPage }/>
          <RouteWithLayout path='/about' layout={ PageLayout } component={ AboutPage }/>
          <RouteWithLayout path="/login" layout={ LoginLayout } component={ LoginPage }></RouteWithLayout>
          <RouteWithLayout path="/admin" layout={ AdminLayout } component={ AdminPage }></RouteWithLayout>
          <RouteWithLayout layout={ PageLayout } component={ NotFoundPage }></RouteWithLayout>
        </Switch>
      </div>
    );
  }
}

export default Main;