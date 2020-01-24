import React from 'react';

import { Button as MuiButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const defaultStyles = {
  width: '100%',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  }
};

const useStyles = makeStyles(() => ({
  primary: {
    height: '50px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    boxSizing: 'border-box',
    border: 'none',
    color: '#FFFFFF',
    backgroundColor: '#692B40',
    ...defaultStyles
  },
  secondary: {
    height: '50px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    boxSizing: 'border-box',
    color: '#692B40',
    backgroundColor: '#FFFFFF',
    border: '1px solid #692B40',
    ...defaultStyles
  },
  tertiary: {
    height: '50px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    boxSizing: 'border-box',
    color: '#C57D7D',
    backgroundColor: '#FFFFFF',
    border: '1px solid #C57D7D',
    ...defaultStyles
  },
  primarySmall: {
    height: '35px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    boxSizing: 'border-box',
    border: 'none',
    color: '#FFFFFF',
    backgroundColor: '#692B40',
    textTransform: 'uppercase',
    ...defaultStyles
  },
  secondarySmall: {
    height: '35px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    boxSizing: 'border-box',
    color: '#692B40',
    letterSpacing: '1.25px',
    backgroundColor: '#FFFFFF',
    textTransform: 'uppercase',
    border: '1px solid #692B40',
    ...defaultStyles
  },
  tertiarySmall: {
    height: '35px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    boxSizing: 'border-box',
    color: '#C57D7D',
    letterSpacing: '1.25px',
    backgroundColor: '#FFFFFF',
    textTransform: 'uppercase',
    border: '1px solid #C57D7D',
    ...defaultStyles
  }
}));

type Props = {
  children: React.ReactNode;
  click?: () => void;
  type:
    | 'primary'
    | 'secondary'
    | 'primarySmall'
    | 'secondarySmall'
    | 'tertiary'
    | 'tertiarySmall';
  disabled?: boolean;
};

const Button: React.FC<Props> = (props: Props) => {
  const classes = useStyles(props);
  const { children, click, type, disabled } = props;
  let classType = '';
  if (type === 'primary') {
    classType = classes.primary;
  } else if (type === 'primarySmall') {
    classType = classes.primarySmall;
  } else if (type === 'secondary') {
    classType = classes.secondary;
  } else if (type === 'secondarySmall') {
    classType = classes.secondarySmall;
  } else if (type === 'tertiary') {
    classType = classes.tertiary;
  } else if (type === 'tertiarySmall') {
    classType = classes.tertiarySmall;
  }
  return disabled ? (
    <MuiButton className={classType} style={{ opacity: '0.2' }}>
      {children}
    </MuiButton>
  ) : (
    <MuiButton className={classType} onClick={click}>
      {children}
    </MuiButton>
  );
};

export default Button;
