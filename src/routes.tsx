/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

import { BaseLayout, LayoutWithTopbar, MainLayout } from './layouts';

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: (): any => <Redirect to="/auth" />
  },
  {
    path: '/auth',
    component: BaseLayout,
    routes: [
      {
        path: '/auth',
        exact: true,
        component: lazy(() => import('views/Landing'))
      }
    ]
  },
  {
    path: '/home',
    component: MainLayout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: lazy(() => import('views/Home'))
      }
    ]
  },
  {
    path: '/provider',
    component: LayoutWithTopbar,
    routes: [
      {
        path: '/provider',
        exact: true,
        component: lazy(() => import('views/Provider'))
      }
    ]
  }
];

export default routes;
