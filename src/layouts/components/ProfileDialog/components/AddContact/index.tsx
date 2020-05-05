import React, { useState, useEffect, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Divider, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import validate from 'validate.js';
import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    width: '458px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  divider: {
    border: '1px solid #C57D7D',
    margin: '5px 0'
  },
  buttonContainer: {
    width: '77%',
    margin: '10px 0'
  }
}));

const schema = {
  Name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  Phone: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    Name?: string;
    Phone?: string;
  };
  touched: {
    Name?: boolean;
    Phone?: boolean;
  };
  errors: {
    Name?: string[];
    Phone?: string[];
  };
};

type Props = {
  close: () => void;
};
export const AddContact: React.FC<Props> = ({ close }) => {
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
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} container alignItems="center">
          <div className={classes.title} style={{ flexGrow: 1 }}>
            Add contact
          </div>
          <div>
            <IconButton onClick={close}>
              <Close style={{ fill: '#C57D7D' }} />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} container justify="center">
          <div style={{ width: '80%', margin: '20px 0' }}>
            <TextField
              error={hasError('Name')}
              fullWidth
              label="Name"
              name="Name"
              autoComplete="off"
              value={formState.values.Name || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '80%', margin: '20px 0' }}>
            <TextField
              error={hasError('Phone')}
              fullWidth
              label="Contact number"
              name="Phone"
              autoComplete="off"
              value={formState.values.Phone || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="center"
          style={{ marginTop: '30px' }}>
          <div className={classes.buttonContainer}>
            <Button type="primary">Add to contact list</Button>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="center"
          style={{ marginBottom: '30px' }}>
          <div className={classes.buttonContainer}>
            <Button type="secondary">Cancel</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddContact;
