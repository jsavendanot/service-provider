import React, { useState } from 'react';
import useRouter from 'utils/useRouter';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  tabMenuContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px'
  },
  tabContainer: {
    background: '#F8F8F8',
    boxShadow: 'inset 0px 0px 3px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    width: '100%',
    margin: '10px 0',
    height: '33px'
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    width: '50%',
    height: 33,
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  tabButton: {
    borderRadius: '20px',
    width: '50%',
    height: 33
  },
  tabTextActive: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '13px',
    lineHeight: '15px',
    color: '#692B40',
    textTransform: 'capitalize'
  },
  tabText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '15px',
    color: 'rgba(55, 71, 79, 0.4)',
    textTransform: 'capitalize'
  }
}));

type Props = {
  menus: string[];
  tab: string;
};

export const TabMenu: React.FC<Props> = ({ menus, tab }) => {
  const { history } = useRouter();
  const classes = useStyles();

  const [currentMenu, setCurrentMenu] = useState(tab);

  const handleTabsChange = (value: string) => {
    setCurrentMenu(value);
    history.push(value);
  };

  return (
    <div className={classes.tabMenuContainer}>
      <div className={classes.tabContainer}>
        {menus.map(menu => {
          return (
            <Button
              key={menu}
              className={clsx(
                currentMenu === menu && classes.tabButtonActive,
                currentMenu !== menu && classes.tabButton
              )}
              onClick={() => handleTabsChange(menu)}>
              <span
                className={clsx(
                  currentMenu === menu && classes.tabTextActive,
                  currentMenu !== menu && classes.tabText
                )}>
                {menu}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TabMenu;
