import React from 'react';
import clsx from 'clsx';

import {
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from '@material-ui/core';
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
};
export const SharedItem: React.FC<Props> = ({ id, name, text }) => {
  const classes = useStyles();
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
          <Checkbox color="primary" checked={true} value="1" />
        </div>
        {id < 3 && (
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
        {id === 6 && (
          <div style={{ padding: '0 20px' }}>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              placeholder=""
              fullWidth
              multiline
              value=""
              autoComplete="off"
              rows="3"
              style={{ marginTop: '15px' }}
              className={classes.outline}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedItem;
