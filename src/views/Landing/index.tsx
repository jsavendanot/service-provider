import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';
import validate from 'validate.js';

import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'components';

const useStyles = makeStyles(() => ({
  /** Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#C57D7D'
  },
  headerButton: {
    width: '109px',
    padding: '5px',
    border: '1.5px solid #C57D7D',
    boxSizing: 'border-box',
    borderRadius: '18px',
    color: '#C57D7D',
    background: '#FFEAEA',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFEAEA'
    },
    '&:active': {
      backgroundColor: '#FFEAEA'
    }
  },
  /** Form */
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '37px',
    color: '#000000',
    marginBottom: '10px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    margin: '10px 0'
  },
  formFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    padding: '16px'
  },
  formFooterText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    margin: '0 10px'
  },
  /** Image  */
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    email?: string;
    password?: string;
  };
  touched: {
    email?: boolean;
    password?: boolean;
  };
  errors: {
    email?: string[];
    password?: string[];
  };
};

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Landing: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

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

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = () => {};

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <div className={classes.header}>
          <img src="/images/landing/logo.svg" alt="" />
          <div className={classes.header}>
            <span
              className={classes.headerMenuText}
              style={{ marginRight: '20px' }}>
              Help
            </span>
            <button
              className={clsx(classes.headerButton, classes.headerMenuText)}>
              Register
            </button>
          </div>
        </div>
      </Grid>
      <Grid item xs={5}>
        <div className={classes.form}>
          <span className={classes.formTitle}>Service Provider sign in</span>
          <TextField
            error={hasError('email')}
            helperText={
              hasError('email')
                ? formState.errors.email && formState.errors.email[0]
                : null
            }
            fullWidth
            label="Email"
            name="email"
            autoComplete="off"
            value={formState.values.email || ''}
            variant="outlined"
            className={classes.textField}
            onChange={changeHandler}
          />
          <TextField
            error={hasError('password')}
            helperText={
              hasError('password')
                ? formState.errors.password && formState.errors.password[0]
                : null
            }
            fullWidth
            autoComplete="off"
            label="Password"
            name="password"
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
            className={classes.textField}
            onChange={changeHandler}
          />
          <div style={{ marginTop: '10px' }}>
            <Button type="primary" click={submitHandler}>
              Sign in
            </Button>
          </div>
          <div className={classes.formFooter}>
            <span className={classes.formFooterText}>
              Don't have an account?
            </span>
            <span
              className={classes.formFooterText}
              style={{
                textDecoration: 'underline',
                color: '#692B40',
                cursor: 'pointer'
              }}>
              Register
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.imageContainer}>
          <img src="/images/landing/gary.svg" alt="" />
        </div>
      </Grid>
    </Grid>
  );
};

export default Landing;
