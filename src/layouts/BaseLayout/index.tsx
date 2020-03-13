import React, { Suspense } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  content: {
    background: '#FFEAEA',
    minHeight: '100vh'
  }
}));

const BaseLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
  const classes = useStyles();

  return (
    <>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {route && renderRoutes(route.routes)}
        </Suspense>
      </main>
    </>
  );
};

export default BaseLayout;
