import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px'
  },
  stepName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '35px',
    color: '#000000'
  },
  textFieldContainer: {
    width: '40%',
    padding: '10px 0'
  },
  textField: {
    background: '#FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: '3px',
    '& .MuiOutlinedInput-input': {
      padding: '10px'
    },
    '& .MuiFormLabel-root': {
      lineHeight: '0'
    },
    marginTop: '5px'
  },
  optionalText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '14px',
    color: '#C57D7D',
    marginLeft: '10px'
  },
  checkBox: {
    '& .MuiIconButton-label': {
      color: '#C57D7D'
    }
  },
  checkText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#692B40'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#000000',
    marginRight: '20px'
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  phone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 20
    }
  },
  address: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  currentPlan: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  }
};
type FormStateType = {
  isValid: boolean;
  values: {
    name?: string;
    phone?: number;
    address?: string;
    currentPlan?: string;
  };
  touched: {
    name?: boolean;
    phone?: boolean;
    address?: boolean;
    currentPlan?: boolean;
  };
  errors: {
    name?: string[];
    phone?: number[];
    address?: string[];
    currentPlan?: string[];
  };
};

export const Practitioner: React.FC = () => {
  const classes = useStyles();

  /** Handle Fields */
  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
          <span className={classes.stepName}>4. General Practitioner</span>
          <span className={classes.optionalText}>(Optional)</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('name')}
            helperText={
              hasError('name')
                ? formState.errors.name && formState.errors.name[0]
                : null
            }
            fullWidth
            label="Name"
            name="name"
            autoComplete="off"
            value={formState.values.name || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('phone')}
            helperText={
              hasError('phone')
                ? formState.errors.phone && formState.errors.phone[0]
                : null
            }
            fullWidth
            label="Phone"
            name="phone"
            autoComplete="off"
            value={formState.values.phone || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
        <div style={{ width: '60%', padding: '10px 0' }}>
          <TextField
            error={hasError('address')}
            helperText={
              hasError('address')
                ? formState.errors.address && formState.errors.address[0]
                : null
            }
            fullWidth
            label="Address"
            name="address"
            autoComplete="off"
            value={formState.values.address || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px'
          }}>
          <span className={classes.subTitle}>
            A current GP Mental Health Treatment Plan?
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={<Checkbox checked={false} value="1" color="primary" />}
              label={<span className={classes.checkText}>Yes</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={<Checkbox checked={false} value="1" color="primary" />}
              label={<span className={classes.checkText}>No</span>}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Practitioner;
