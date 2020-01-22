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
      },
      {
        path: '/goals',
        exact: true,
        component: lazy(() => import('views/Goals'))
      },
      {
        path: '/goals/:tab',
        exact: true,
        component: lazy(() => import('views/Goals'))
      },
      {
        path: '/suggest/goal',
        exact: true,
        component: lazy(() => import('views/Goals/SuggestGoal'))
      },
      {
        path: '/journey',
        exact: true,
        component: lazy(() => import('views/Journey'))
      },
      {
        path: '/journey/:tab',
        exact: true,
        component: lazy(() => import('views/Journey'))
      },
      {
        path: '/journal',
        exact: true,
        component: lazy(() => import('views/Journey/JournalDetail'))
      },
      {
        path: '/story',
        exact: true,
        component: lazy(() => import('views/Story'))
      },
      {
        path: '/safety',
        exact: true,
        component: lazy(() => import('views/Safety'))
      },
      {
        path: '/network',
        exact: true,
        component: lazy(() => import('views/Network'))
      },
      {
        path: '/network/:tab',
        exact: true,
        component: lazy(() => import('views/Network'))
      },
      {
        path: '/export',
        exact: true,
        component: lazy(() => import('views/Export'))
      }
    ]
  }
];

export default routes;
