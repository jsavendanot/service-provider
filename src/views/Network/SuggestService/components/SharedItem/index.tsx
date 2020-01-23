import React from 'react';

import {
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
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
  }
}));

type Props = {
  id: number;
  name: string;
};
export const SharedItem: React.FC<Props> = ({ id, name }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.group}>
        <div className={classes.header}>
          <span className={classes.name}>{name}</span>
          <Checkbox color="primary" checked={true} value="1" />
        </div>
        {id < 3 && (
          <div style={{ paddingLeft: '30px' }}>
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
