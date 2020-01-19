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
  countryOfBirth: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  preferredLanguage: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  aborigianl: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10
    }
  },
  torresIslander: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    countryOfBirth?: string;
    preferredLanguage?: string;
    aborigianl?: string;
    torresIslander?: string;
  };
  touched: {
    countryOfBirth?: boolean;
    preferredLanguage?: boolean;
    aborigianl?: boolean;
    torresIslander?: boolean;
  };
  errors: {
    countryOfBirth?: string[];
    preferredLanguage?: string[];
    aborigianl?: string[];
    torresIslander?: string[];
  };
};

export const Background: React.FC = () => {
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
          <span className={classes.stepName}>3. Cultural background </span>
          <span className={classes.optionalText}>(Optional)</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('countryOfBirth')}
            helperText={
              hasError('countryOfBirth')
                ? formState.errors.countryOfBirth &&
                  formState.errors.countryOfBirth[0]
                : null
            }
            fullWidth
            label="Country of birth"
            name="countryOfBirth"
            autoComplete="off"
            value={formState.values.countryOfBirth || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('preferredLanguage')}
            helperText={
              hasError('preferredLanguage')
                ? formState.errors.preferredLanguage &&
                  formState.errors.preferredLanguage[0]
                : null
            }
            fullWidth
            label="Preferred language"
            name="preferredLanguage"
            autoComplete="off"
            value={formState.values.preferredLanguage || ''}
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
          <span className={classes.subTitle}>Aborigianl?</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>Yes</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>No</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={
                <span className={classes.checkText}>
                  Prefer not to disclose
                </span>
              }
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px'
          }}>
          <span className={classes.subTitle}>Torres Strait Islander?</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>Yes</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>No</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={
                <span className={classes.checkText}>
                  Prefer not to disclose
                </span>
              }
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Background;
