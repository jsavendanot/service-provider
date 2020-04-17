import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import useRouter from 'common/utils/useRouter';

import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
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
    margin: '10px 0',
    '& .MuiOutlinedInput-input': {
      padding: '18px'
    }
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
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      bottom: 0,
      top: 'auto'
    }
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

type Props = {
  register: () => void;
};

const Login: React.FC<Props> = ({ register }) => {
  const classes = useStyles();
  const { history } = useRouter();

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

  const handleSubmit = () => {
    history.push('/home');
  };

  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <div className={classes.form}>
          <span className={classes.formTitle}>Service Provider</span>
          <div style={{ marginTop: '10px' }}>
            <Button type="primary" click={handleSubmit}>
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
              }}
              onClick={register}>
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

export default Login;
