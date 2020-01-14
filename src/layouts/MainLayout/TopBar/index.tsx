import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Hidden,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#692B40'
  },
  icon: {
    color: '#37474F',
    fontSize: '30px'
  }
}));

type Props = {
  className: string;
  onOpenNavBarMobile: () => void;
};

const TopBar: React.FC<Props> = (props: Props) => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onOpenNavBarMobile}>
              <Menu className={classes.icon} />
            </IconButton>
          </Hidden>
        </div>
        <div style={{ flexGrow: 2 }}>
          <Typography variant="h1">My Goals</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
