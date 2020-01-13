import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'components';

const useStyles = makeStyles(() => ({
  /** Title */
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '37px',
    color: '#000000'
  },
  /** Notes */
  notes: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px'
  },
  noteText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000'
  },
  /** Form */
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    background: '#FFFFFF',
    borderRadius: '4px'
  },
  formNote: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#C57D7D',
    margin: '10px 0'
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
  formGroup: {
    padding: '20px 0'
  },
  formGroupTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#000000'
  },
  formGroupNote: {
    padding: '5px 0',
    width: '65%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  selectOptionLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#692B40'
  },
  /** Terms of Service */
  termsOfService: {
    border: '1px solid #FFEAEA',
    background: '#FFFFFF',
    borderRadius: '3px'
  },
  termsCheckBox: {
    '& .MuiIconButton-label': {
      color: '#C57D7D'
    }
  },
  termsText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#692B40'
  },
  /** Profile Image */
  uploadButton: {
    width: '84px',
    height: '30px',
    background: '#692B40',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '28px',
    color: '#FFFFFF',
    cursor: 'pointer',
    margin: '20px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#692B40'
    },
    '&:active': {
      backgroundColor: '#692B40'
    }
  },
  uploadButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF'
  },
  /** Submit Button */
  submitButtonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF'
  }
}));

const schema = {
  title: {
    presence: false,
    length: {
      maximum: 32
    }
  },
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  middleName: {
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
  practice: {
    presence: false,
    length: {
      maximum: 80
    }
  },
  service: {
    presence: false,
    length: {
      maximum: 80
    }
  },
  organisation: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  streetAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  addressLine2: {
    presence: false,
    length: {
      maximum: 200
    }
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  state: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  zipCode: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  work: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  mobile: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 15
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 15
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  retypedPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    practice?: string;
    service?: string;
    organisation?: string;
    streetAddress?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    work?: string;
    mobile?: string;
    email?: string;
    password?: string;
    retypedPassword?: string;
  };
  touched: {
    title?: boolean;
    firstName?: boolean;
    middleName?: boolean;
    lastName?: boolean;
    practice?: boolean;
    service?: boolean;
    organisation?: boolean;
    streetAddress?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    work?: boolean;
    mobile?: boolean;
    email?: boolean;
    password?: boolean;
    retypedPassword?: boolean;
  };
  errors: {
    title?: string[];
    firstName?: string[];
    middleName?: string[];
    lastName?: string[];
    practice?: string[];
    service?: string[];
    organisation?: string[];
    streetAddress?: string[];
    addressLine2?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    work?: string[];
    mobile?: string[];
    email?: string[];
    password?: string[];
    retypedPassword?: string[];
  };
};

const Individual: React.FC = () => {
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
    <Grid container justify="flex-start">
      <Grid item xs={9}>
        <span className={classes.title}>
          Service Provider Registration - Individual
        </span>
      </Grid>
      <Grid item xs={9}>
        <div className={classes.notes}>
          <div style={{ marginTop: '20px' }}>
            <span className={classes.noteText}>
              Registering with Jiemba will populate you in the ‘Find service
              providers near...’ feature of the consumer site.
            </span>
          </div>
          <div style={{ margin: '20px 0' }}>
            <span className={classes.noteText}>
              Please fill out this form which will complete the short
              registration process.
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={9}>
        <div className={classes.form}>
          <div className={classes.formNote}>
            Fields marked with ”*” are required.
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Name</span>
            <div style={{ width: '30%', padding: '10px 0' }}>
              <TextField
                error={hasError('title')}
                helperText={
                  hasError('title')
                    ? formState.errors.title && formState.errors.title[0]
                    : null
                }
                fullWidth
                label="Title"
                name="title"
                autoComplete="off"
                value={formState.values.title || ''}
                variant="outlined"
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '30%', padding: '10px 0' }}>
                <TextField
                  error={hasError('firstName')}
                  helperText={
                    hasError('firstName')
                      ? formState.errors.firstName &&
                        formState.errors.firstName[0]
                      : null
                  }
                  fullWidth
                  label="First*"
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
                  error={hasError('middleName')}
                  helperText={
                    hasError('middleName')
                      ? formState.errors.middleName &&
                        formState.errors.middleName[0]
                      : null
                  }
                  fullWidth
                  label="Middle"
                  name="middleName"
                  autoComplete="off"
                  value={formState.values.middleName || ''}
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
                      ? formState.errors.lastName &&
                        formState.errors.lastName[0]
                      : null
                  }
                  fullWidth
                  label="Last*"
                  name="lastName"
                  autoComplete="off"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>
              Practice and/or Service Name
            </span>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '30%',
                  padding: '10px 0',
                  marginRight: '34px'
                }}>
                <TextField
                  error={hasError('practice')}
                  helperText={
                    hasError('practice')
                      ? formState.errors.practice &&
                        formState.errors.practice[0]
                      : null
                  }
                  fullWidth
                  label="Practice"
                  name="practice"
                  autoComplete="off"
                  value={formState.values.practice || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '30%', padding: '10px 0' }}>
                <TextField
                  error={hasError('service')}
                  helperText={
                    hasError('service')
                      ? formState.errors.service && formState.errors.service[0]
                      : null
                  }
                  fullWidth
                  label="Service"
                  name="service"
                  autoComplete="off"
                  value={formState.values.service || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Organisation*</span>
            <div
              className={classes.formGroupNote}
              style={{ textAlign: 'justify' }}>
              To register with Jiemba as a service provider, your organisation
              has to be registered. Please contact your organisation if you
              can’t find it from the list below, or register for your
              organisation later.
            </div>
            <div style={{ width: '65%' }}>
              <TextField
                error={hasError('organisation')}
                helperText={
                  hasError('organisation')
                    ? formState.errors.organisation &&
                      formState.errors.organisation[0]
                    : null
                }
                fullWidth
                label={
                  <span className={classes.selectOptionLabel}>
                    Please select
                  </span>
                }
                name="organisation"
                select
                autoComplete="off"
                SelectProps={{ native: true }}
                value={formState.values.organisation || ''}
                className={classes.textField}
                variant="outlined"
                onChange={handleChange}>
                {[''].map(org => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Work Address*</span>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '50%',
                  padding: '10px 0',
                  marginRight: '34px'
                }}>
                <TextField
                  error={hasError('streetAddress')}
                  helperText={
                    hasError('streetAddress')
                      ? formState.errors.streetAddress &&
                        formState.errors.streetAddress[0]
                      : null
                  }
                  fullWidth
                  label="Street Address*"
                  name="streetAddress"
                  autoComplete="off"
                  value={formState.values.streetAddress || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '50%', padding: '10px 0' }}>
                <TextField
                  error={hasError('addressLine2')}
                  helperText={
                    hasError('addressLine2')
                      ? formState.errors.addressLine2 &&
                        formState.errors.addressLine2[0]
                      : null
                  }
                  fullWidth
                  label="Address Line 2"
                  name="addressLine2"
                  autoComplete="off"
                  value={formState.values.addressLine2 || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '30%',
                  padding: '10px 0'
                }}>
                <TextField
                  error={hasError('city')}
                  helperText={
                    hasError('city')
                      ? formState.errors.city && formState.errors.city[0]
                      : null
                  }
                  fullWidth
                  label="City*"
                  name="city"
                  autoComplete="off"
                  value={formState.values.city || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '30%', padding: '10px 0' }}>
                <TextField
                  error={hasError('state')}
                  helperText={
                    hasError('state')
                      ? formState.errors.state && formState.errors.state[0]
                      : null
                  }
                  fullWidth
                  label={
                    <span className={classes.selectOptionLabel}>
                      Please select
                    </span>
                  }
                  name="state"
                  select
                  autoComplete="off"
                  SelectProps={{ native: true }}
                  value={formState.values.state || ''}
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleChange}>
                  {[''].map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </TextField>
              </div>
              <div
                style={{
                  width: '30%',
                  padding: '10px 0'
                }}>
                <TextField
                  error={hasError('zipCode')}
                  helperText={
                    hasError('zipCode')
                      ? formState.errors.zipCode && formState.errors.zipCode[0]
                      : null
                  }
                  fullWidth
                  label="ZIP Code*"
                  name="zipCode"
                  autoComplete="off"
                  value={formState.values.zipCode || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Contact Numbers</span>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '30%',
                  padding: '10px 0',
                  marginRight: '34px'
                }}>
                <TextField
                  error={hasError('work')}
                  helperText={
                    hasError('work')
                      ? formState.errors.work && formState.errors.work[0]
                      : null
                  }
                  fullWidth
                  label="Work*"
                  name="work"
                  autoComplete="off"
                  value={formState.values.work || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '30%', padding: '10px 0' }}>
                <TextField
                  error={hasError('mobile')}
                  helperText={
                    hasError('mobile')
                      ? formState.errors.mobile && formState.errors.mobile[0]
                      : null
                  }
                  fullWidth
                  label="Mobile*"
                  name="mobile"
                  autoComplete="off"
                  value={formState.values.mobile || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Email Address*</span>
            <div
              className={classes.formGroupNote}
              style={{ textAlign: 'left' }}>
              You will use this email to log in and receive notifications.
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
                label="Email"
                name="email"
                autoComplete="off"
                value={formState.values.email || ''}
                variant="outlined"
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Password*</span>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '30%',
                  padding: '10px 0',
                  marginRight: '34px'
                }}>
                <TextField
                  error={hasError('password')}
                  helperText={
                    hasError('password')
                      ? formState.errors.password &&
                        formState.errors.password[0]
                      : null
                  }
                  fullWidth
                  label="Password*"
                  name="password"
                  autoComplete="off"
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '30%', padding: '10px 0' }}>
                <TextField
                  error={hasError('retypedPassword')}
                  helperText={
                    hasError('retypedPassword')
                      ? formState.errors.retypedPassword &&
                        formState.errors.retypedPassword[0]
                      : null
                  }
                  fullWidth
                  label="Retyped Password"
                  name="retypedPassword"
                  autoComplete="off"
                  type="password"
                  value={formState.values.retypedPassword || ''}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Terms of Service</span>
            <div style={{ width: '100%' }}>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder=""
                fullWidth
                multiline
                value=""
                disabled
                autoComplete="off"
                rows="6"
                style={{ marginTop: '15px' }}
                className={classes.termsOfService}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.termsCheckBox}
                />
              }
              label={
                <span className={classes.termsText}>
                  I agree to the Terms of Service*
                </span>
              }
            />
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Profile Image </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  height: '141.1px',
                  width: '117px',
                  marginTop: '15px'
                }}>
                <img src="/images/landing/profile_image.svg" alt="" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '20px'
                }}>
                <button className={classes.uploadButton}>
                  <span className={classes.uploadButtonText}>UPLOAD</span>
                </button>
                <span style={{ marginLeft: '5px' }}>No image chosen</span>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={9}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '30px 0 50px'
          }}>
          <div style={{ width: '20%' }}>
            <Button type="primary">
              <span className={classes.submitButtonText}>SUBMIT</span>
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Individual;
