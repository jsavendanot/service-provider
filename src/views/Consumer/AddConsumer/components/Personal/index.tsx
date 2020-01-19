import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import {
  Grid,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
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
  note: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#C57D7D',
    marginRight: '40px'
  },
  formGroup: {
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
  selectOptionLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#692B40'
  },
  divider: {
    border: '1px solid #B7B7B8',
    margin: '15px 0'
  },
  textFieldContainer: {
    width: '40%',
    padding: '10px 0'
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
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  preferredName: {
    presence: false,
    length: {
      maximum: 80
    }
  },
  dob: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  gender: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  homeAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  postCode: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 10
    }
  },
  postalAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  postalCode: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 10
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
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 50
    }
  },
  preferredMethod: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    firstName?: string;
    lastName?: string;
    preferredName?: string;
    dob?: string;
    gender?: string;
    homeAddress?: string;
    postCode?: number;
    postalAddress?: string;
    postalCode?: number;
    phone?: number;
    email?: string;
    preferredMethod?: string;
  };
  touched: {
    firstName?: boolean;
    lastName?: boolean;
    preferredName?: boolean;
    dob?: boolean;
    gender?: boolean;
    homeAddress?: boolean;
    postCode?: boolean;
    postalAddress?: boolean;
    postalCode?: boolean;
    phone?: boolean;
    email?: boolean;
    preferredMethod?: boolean;
  };
  errors: {
    firstName?: string[];
    lastName?: string[];
    preferredName?: string[];
    dob?: string[];
    gender?: string[];
    homeAddress?: string[];
    postCode?: number[];
    postalAddress?: string[];
    postalCode?: number[];
    phone?: number[];
    email?: string[];
    preferredMethod?: string[];
  };
};

export const Personal: React.FC = () => {
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
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '30px'
          }}>
          <span className={classes.stepName}>1. Personal information</span>
          <span className={classes.note}>
            “*” = Required fields to connect on Jiemba
          </span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%', padding: '10px 0', marginRight: '50px' }}>
            <TextField
              error={hasError('firstName')}
              helperText={
                hasError('firstName')
                  ? formState.errors.firstName && formState.errors.firstName[0]
                  : null
              }
              fullWidth
              label="First name*"
              name="firstName"
              autoComplete="off"
              value={formState.values.firstName || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '30%', padding: '10px 0' }}>
            <TextField
              error={hasError('lastName')}
              helperText={
                hasError('lastName')
                  ? formState.errors.lastName && formState.errors.lastName[0]
                  : null
              }
              fullWidth
              label="Last name*"
              name="lastName"
              autoComplete="off"
              value={formState.values.lastName || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ width: '30%', padding: '10px 0' }}>
          <TextField
            error={hasError('preferredName')}
            helperText={
              hasError('preferredName')
                ? formState.errors.preferredName &&
                  formState.errors.preferredName[0]
                : null
            }
            fullWidth
            label="Preferred name"
            name="preferredName"
            autoComplete="off"
            value={formState.values.preferredName || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%', padding: '10px 0', marginRight: '50px' }}>
            <TextField
              error={hasError('dob')}
              helperText={
                hasError('dob')
                  ? formState.errors.dob && formState.errors.dob[0]
                  : null
              }
              fullWidth
              label="Date of birth*"
              placeholder="DD/MM/YYYY"
              name="dob"
              autoComplete="off"
              value={formState.values.dob || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '30%', padding: '10px 0' }}>
            <TextField
              error={hasError('gender')}
              helperText={
                hasError('gender')
                  ? formState.errors.gender && formState.errors.gender[0]
                  : null
              }
              fullWidth
              label={
                <span className={classes.selectOptionLabel}>Please select</span>
              }
              name="gender"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={formState.values.gender || ''}
              className={classes.textField}
              variant="outlined"
              onChange={handleChange}>
              {['', 'Male', 'Female'].map(gender => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </TextField>
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '65%', padding: '10px 0' }}>
            <TextField
              error={hasError('homeAddress')}
              helperText={
                hasError('homeAddress')
                  ? formState.errors.homeAddress &&
                    formState.errors.homeAddress[0]
                  : null
              }
              fullWidth
              label="Home address"
              name="homeAddress"
              autoComplete="off"
              value={formState.values.homeAddress || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '20%', padding: '10px 0' }}>
            <TextField
              error={hasError('postCode')}
              helperText={
                hasError('postCode')
                  ? formState.errors.postCode && formState.errors.postCode[0]
                  : null
              }
              fullWidth
              label="Post Code"
              name="postCode"
              autoComplete="off"
              value={formState.values.postCode || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '65%', padding: '10px 0' }}>
            <TextField
              error={hasError('postalAddress')}
              helperText={
                hasError('postalAddress')
                  ? formState.errors.postalAddress &&
                    formState.errors.postalAddress[0]
                  : null
              }
              fullWidth
              label="Postal address"
              name="postalAddress"
              autoComplete="off"
              value={formState.values.postalAddress || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '20%', padding: '10px 0' }}>
            <TextField
              error={hasError('postalCode')}
              helperText={
                hasError('postalCode')
                  ? formState.errors.postalCode &&
                    formState.errors.postalCode[0]
                  : null
              }
              fullWidth
              label="Post Code"
              name="postalCode"
              autoComplete="off"
              value={formState.values.postalCode || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
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
        <div style={{ width: '50%', padding: '10px 0' }}>
          <TextField
            error={hasError('email')}
            helperText={
              hasError('email')
                ? formState.errors.email && formState.errors.email[0]
                : null
            }
            fullWidth
            label="Email*"
            name="email"
            autoComplete="off"
            value={formState.values.email || ''}
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
          <span className={classes.subTitle}>Preferred method of contact:</span>
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
              label={<span className={classes.checkText}>Phone</span>}
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
              label={<span className={classes.checkText}>Text</span>}
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
              label={<span className={classes.checkText}>Email</span>}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Personal;
