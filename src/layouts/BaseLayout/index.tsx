import React, { Fragment, Suspense } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  content: {
    background: '#FFEAEA',
    minHeight: '100vh'
  }
}));

const BaseLayout: React.FC<RouteConfigComponentProps> = (
  props: RouteConfigComponentProps
) => {
  const { route } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {route && renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

export default BaseLayout;
