/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import { lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import authentication from '@kdpw/msal-b2c-react';

import { BaseLayout, MainLayout } from './layouts';

const routes: RouteConfig[] = [
  {
    path: '/home',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/home',
        exact: true,
        component: authentication.required(lazy(() => import('views/Home')))
      }
    ]
  },

  {
    path: '/profile',
    component: MainLayout,
    routes: [
      {
        path: '/profile',
        exact: true,
        component: authentication.required(lazy(() => import('views/Profile')))
      }
    ]
  },

  {
    path: '/consumer',
    component: MainLayout,
    routes: [
      {
        path: '/consumer',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/ConsumerProfile'))
        )
      },
      {
        path: '/consumer/add',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/ConsumerProfile/AddConsumer'))
        )
      }
    ]
  },

  {
    path: '/dashboard',
    component: MainLayout,
    routes: [
      {
        path: '/dashboard/:id',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Dashboard'))
        )
      }
    ]
  },

  {
    path: '/goals',
    component: MainLayout,
    routes: [
      {
        path: '/goals/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Goals')))
      },
      {
        path: '/goals/:tab/:id',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goals/GoalDetail'))
        )
      }
    ]
  },

  {
    path: '/suggest',
    component: MainLayout,
    routes: [
      {
        path: '/suggest/goal',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Goals/SuggestGoal'))
        )
      },
      {
        path: '/suggest/story',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Story/SuggestArea'))
        )
      },
      {
        path: '/suggest/network',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Network/SuggestService'))
        )
      }
    ]
  },

  {
    path: '/journey',
    component: MainLayout,
    routes: [
      {
        path: '/journey/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Journey')))
      },
      {
        path: '/journey/:tab/:id',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Journey/JournalDetail'))
        )
      }
    ]
  },

  {
    path: '/story',
    component: MainLayout,
    routes: [
      {
        path: '/story',
        exact: true,
        component: authentication.required(lazy(() => import('views/Story')))
      }
    ]
  },

  {
    path: '/safety',
    component: MainLayout,
    routes: [
      {
        path: '/safety',
        exact: true,
        component: authentication.required(lazy(() => import('views/Safety')))
      }
    ]
  },

  {
    path: '/network',
    component: MainLayout,
    routes: [
      {
        path: '/network/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Network')))
      }
    ]
  },

  {
    path: '/export',
    component: MainLayout,
    routes: [
      {
        path: '/export',
        exact: true,
        component: authentication.required(lazy(() => import('views/Export')))
      }
    ]
  },

  //** BaseLayout */
  {
    path: '/',
    component: BaseLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('views/Landing'))
      }
    ]
  }
];

export default routes;
