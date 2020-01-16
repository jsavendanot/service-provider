import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const baseStyle = {
  width: '100%',
  height: '50px',
  borderRadius: '25px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '21px',
  cursor: 'pointer'
};

const useStyles = makeStyles((theme: Theme) => ({
  primary: {
    ...baseStyle,
    boxSizing: 'border-box',
    border: 'none',
    color: '#FFFFFF',
    backgroundColor: '#692B40',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  secondary: {
    ...baseStyle,
    boxSizing: 'border-box',
    color: '#692B40',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#FFFFFF',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  }
}));

type Props = {
  children: React.ReactNode;
  click?: () => void;
  type: 'primary' | 'secondary';
  disabled?: boolean;
};

const Button: React.FC<Props> = (props: Props) => {
  const classes = useStyles(props);
  const { children, click, type, disabled } = props;
  let classType = '';
  if (type === 'primary') {
    classType = classes.primary;
  } else if (type === 'secondary') {
    classType = classes.secondary;
  }
  return disabled ? (
    <button className={classType} style={{ opacity: '0.2' }}>
      {children}
    </button>
  ) : (
    <button className={classType} onClick={click}>
      {children}
    </button>
  );
};

export default Button;
