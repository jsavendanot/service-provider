import React, { Suspense } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

import { TopBar } from '../components';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column'
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative',
    height: '64px',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.24), 0px 2px 8px rgba(0, 0, 0, 0.12)'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    backgroundColor: '#FFFFFF'
  }
}));

const LayoutWithNavbar: React.FC<RouteConfigComponentProps> = (
  props: RouteConfigComponentProps
) => {
  const { route } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar className={classes.topBar} />
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <main className={classes.content}>
            <Suspense fallback={<LinearProgress />}>
              {route && renderRoutes(route.routes)}
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithNavbar;