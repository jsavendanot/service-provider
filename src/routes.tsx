/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import authentication from '@kdpw/msal-b2c-react';

import { BaseLayout, MainLayout } from './layouts';
import { Redirect } from 'react-router-dom';

const routes: RouteConfig[] = [
  {
    path: '/home',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/home',
        exact: true,
        component: authentication.required(lazy(() => import('views/Home')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/invitation',
    component: BaseLayout,
    routes: [
      {
        path: '/invitation',
        exact: true,
        component: lazy(() => import('views/Invitation'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: BaseLayout,
    routes: [
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Errors/Error404'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/auth',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/auth',
        exact: true,
        component: authentication.required(lazy(() => import('views/Auth')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/profile',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/profile',
        exact: true,
        component: authentication.required(lazy(() => import('views/Profile')))
      },
      {
        path: '/profile/edit',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Profile/EditProfile'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/consumer',
    component: authentication.required(MainLayout),
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
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/register',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/register',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Registration'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/dashboard',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Dashboard'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/goals',
    component: authentication.required(MainLayout),
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
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/suggest',
    component: authentication.required(MainLayout),
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
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/journey',
    component: authentication.required(MainLayout),
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
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/story',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/story',
        exact: true,
        component: authentication.required(lazy(() => import('views/Story')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/safety',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/safety',
        exact: true,
        component: authentication.required(lazy(() => import('views/Safety')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/network',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/network/:tab',
        exact: true,
        component: authentication.required(lazy(() => import('views/Network')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  {
    path: '/export',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/export',
        exact: true,
        component: authentication.required(lazy(() => import('views/Export')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/notifications',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/notifications',
        exact: true,
        component: authentication.required(
          lazy(() => import('views/Notification'))
        )
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/settings',
    component: authentication.required(MainLayout),
    routes: [
      {
        path: '/settings',
        exact: true,
        component: authentication.required(lazy(() => import('views/Settings')))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
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
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
