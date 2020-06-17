import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import { Button } from 'common/components';
import { acceptInvitationCode } from 'slices/invitation/action';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 10px',
    marginBottom: '10px'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#C57D7D'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    textTransform: 'capitalize'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%'
  },
  buttonContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    cursor: 'pointer'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
  }
}));

const schema = {
  code: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 6,
      minimum: 6
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    code?: string;
  };
  touched: {
    code?: boolean;
  };
  errors: {
    code?: string[];
  };
};

type Props = {
  close: () => void;
};

const EnterCode: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    setCode(event.target.value);
  };

  const closeHandler = () => {
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    close();
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const handleSaveButtonClick = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        code: code
      },
      touched: {
        ...formState.touched,
        code: true
      }
    }));

    if (formState.isValid) {
      dispatch(acceptInvitationCode(code));
      closeHandler();
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.header}>
          <span className={classes.headerText}>Enter invitation code</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={hasError('code')}
          fullWidth
          variant="outlined"
          label="Enter 6-digit code"
          name="code"
          autoComplete="off"
          value={formState.values.code || ''}
          className={classes.textField}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.buttonContainer}>
          <div className={classes.buttonContent}>
            <span className={classes.buttonText} onClick={closeHandler}>
              Cancel
            </span>
          </div>
          <div className={classes.buttonContent}>
            <Button
              type="primary"
              disabled={formState.values.code === ''}
              click={handleSaveButtonClick}>
              Save
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default EnterCode;
