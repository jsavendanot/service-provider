import React, { Suspense, useState } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

import { NavBar } from '../components';
import TopBar from './TopBar';

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
    paddingTop: '20px'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 200,
    minWidth: 150,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    backgroundColor: '#FFFAEA'
  }
}));

const MainLayout: React.FC<RouteConfigComponentProps> = (
  props: RouteConfigComponentProps
) => {
  const { route } = props;

  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <div className={classes.root}>
      <TopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.mainContainer}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
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

export default MainLayout;
