/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

import { BaseLayout } from './layouts';

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: (): any => <Redirect to="/home" />
  },
  {
    path: '/home',
    component: BaseLayout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: lazy(() => import('views/Landing'))
      }
    ]
  }
];

export default routes;
