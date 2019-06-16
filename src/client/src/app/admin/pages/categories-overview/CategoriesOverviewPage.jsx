/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

/*
Layout
*/
import { ContentLayout } from '../../layouts';

/*
Pages
*/
import CategoriesTablePage from '../categories-table';
import CategoryFormPage from '../category-form';

const tabs = [
  { id: 'List', link: '/admin/categories' },
  { id: 'Create new category', link: '/admin/categories/create' },
];

class CategoriesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Categories Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/categories" component={ CategoriesTablePage }></Route>
        <Route path="/admin/categories/create" component={ CategoryFormPage }></Route>
        <Route path="/admin/categories/:id/edit" component={ CategoryFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (CategoriesOverviewPage);