import React from 'react';

import {
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  subGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  radioBox: {
    color: '#C57D7D'
  }
}));

export type SharedItemProps = {};
export const SharedItem: React.FC<SharedItemProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.subGroup}>
        <span className={classes.name}>My goals</span>
        <Checkbox color="primary" checked={true} value="1" />
      </div>
      <div style={{ borderBottom: '1px solid #C57D7D' }}>
        <div style={{ paddingLeft: '20px' }}>
          <RadioGroup name="share" value="all">
            <FormControlLabel
              value="all"
              control={<Radio color="primary" />}
              label={<span>All goals</span>}
            />
            <FormControlLabel
              value="specific"
              control={<Radio color="primary" />}
              label={<span>Specific goals and steps...</span>}
            />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default SharedItem;
