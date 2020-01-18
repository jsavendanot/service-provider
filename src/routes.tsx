/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

import { BaseLayout, LayoutWithNavbar, MainLayout } from './layouts';

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: (): any => <Redirect to="/auth" />
  },
  /** Base layout */
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
  /** Views without navigation bar */
  {
    path: '/provider',
    component: LayoutWithNavbar,
    routes: [
      {
        path: '/provider',
        exact: true,
        component: lazy(() => import('views/Provider'))
      }
    ]
  },
  {
    path: '/consumer/add',
    component: LayoutWithNavbar,
    routes: [
      {
        path: '/consumer/add',
        exact: true,
        component: lazy(() => import('views/Consumer/AddConsumer'))
      }
    ]
  },
  /** Main views with navigation bars */
  {
    route: '*',
    component: MainLayout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: lazy(() => import('views/Home'))
      },
      {
        path: '/dashboard',
        exact: true,
        component: lazy(() => import('views/Dashboard'))
      },
      {
        path: '/consumer',
        exact: true,
        component: lazy(() => import('views/Consumer'))
      }
    ]
  }
];

export default routes;
