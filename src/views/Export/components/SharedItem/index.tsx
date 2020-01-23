import React, { useState, ChangeEvent } from 'react';
import clsx from 'clsx';

import { RadioGroup, FormControlLabel, Radio, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowRight } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    border: '1px solid #C57D7D',
    borderBottom: 'none'
  },
  topBorder: {
    borderTopRightRadius: '12px',
    borderTopLeftRadius: '12px'
  },
  bottomBorder: {
    borderBottomRightRadius: '12px',
    borderBottomLeftRadius: '12px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  outline: {
    border: '1px solid #FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px'
  },
  radioText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F'
  }
}));

type Props = {
  id: number;
  name: string;
  text: string;
  checked: boolean;
};
export const SharedItem: React.FC<Props> = ({ id, name, text, checked }) => {
  const classes = useStyles();

  const [state, setState] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.group,
          id === 1 && classes.topBorder,
          id === 5 && classes.bottomBorder
        )}>
        <div className={classes.header}>
          <span className={classes.name}>{name}</span>
          <Switch
            checked={state}
            color="primary"
            value={state}
            onChange={event => handleChange(event)}
          />
        </div>
        {state && (
          <div style={{ paddingLeft: '22px' }}>
            <RadioGroup name="share" value="all">
              <FormControlLabel
                value="all"
                control={<Radio color="primary" />}
                label={<span className={classes.radioText}>All {text}</span>}
              />
              <FormControlLabel
                value="specific"
                control={<Radio color="primary" />}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <span className={classes.radioText}>
                      Specific {text}...
                    </span>
                    <KeyboardArrowRight
                      fontSize="large"
                      style={{
                        fill: '#C57D7D',
                        marginLeft: '30px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                }
              />
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedItem;
