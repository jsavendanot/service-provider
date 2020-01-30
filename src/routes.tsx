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
    path: '/profile/:name',
    component: LayoutWithNavbar,
    routes: [
      {
        path: '/profile/:name',
        exact: true,
        component: lazy(() => import('views/Profile'))
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
        path: '/dashboard/consumer/:id',
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
        path: '/goals/:id/suggest',
        exact: true,
        component: lazy(() => import('views/Goals/SuggestGoal'))
      },
      {
        path: '/goal/:id',
        exact: true,
        component: lazy(() => import('views/Goals/GoalDetail'))
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
        path: '/journal/:id',
        exact: true,
        component: lazy(() => import('views/Journey/JournalDetail'))
      },
      {
        path: '/story',
        exact: true,
        component: lazy(() => import('views/Story'))
      },
      {
        path: '/story/:id/suggest',
        exact: true,
        component: lazy(() => import('views/Story/SuggestArea'))
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
        path: '/network/:id/suggest',
        exact: true,
        component: lazy(() => import('views/Network/SuggestService'))
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
