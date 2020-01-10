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
    border: '1.5px solid #003e1f',
    color: '#FFFFFF',
    backgroundColor: '#003E1F',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#076A38'
    },
    '&:active': {
      backgroundColor: '#076A38'
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
    <button className={classType}>{children}</button>
  ) : (
    <button className={classType} onClick={click}>
      {children}
    </button>
  );
};

export default Button;
