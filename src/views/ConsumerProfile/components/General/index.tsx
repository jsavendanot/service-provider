import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  formGroup: {
    padding: '20px 0'
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
  formGroupTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#000000'
  },
  divider: {
    border: '1px solid #C57D7D'
  },
  selectOptionLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#692B40'
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
  },
  contactName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  relationship: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  contactPhone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 20
    }
  },
  contactAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  whenToContact: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
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
    contactName?: string;
    relationship?: string;
    contactPhone?: number;
    contactAddress?: string;
    whenToContact?: string;
    countryOfBirth?: string;
    preferredLanguage?: string;
    aborigianl?: string;
    torresIslander?: string;
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
    contactName?: boolean;
    relationship?: boolean;
    contactPhone?: boolean;
    contactAddress?: boolean;
    whenToContact?: boolean;
    countryOfBirth?: boolean;
    preferredLanguage?: boolean;
    aborigianl?: boolean;
    torresIslander?: boolean;
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
    contactName?: string[];
    relationship?: string[];
    contactPhone?: number[];
    contactAddress?: string[];
    whenToContact?: string[];
    countryOfBirth?: string[];
    preferredLanguage?: string[];
    aborigianl?: string[];
    torresIslander?: string[];
  };
};

export const General: React.FC = () => {
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
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('firstName')}
                  fullWidth
                  label="First name"
                  name="firstName"
                  autoComplete="off"
                  value={formState.values.firstName || ''}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('lastName')}
                  fullWidth
                  label="Last name"
                  name="lastName"
                  autoComplete="off"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('preferredName')}
                fullWidth
                label="Preferred name"
                name="preferredName"
                autoComplete="off"
                value={formState.values.preferredName || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('dob')}
                  fullWidth
                  label="Date of birth"
                  name="dob"
                  autoComplete="off"
                  value={formState.values.dob || ''}
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('gender')}
                  fullWidth
                  label={
                    <span className={classes.selectOptionLabel}>
                      Please select
                    </span>
                  }
                  name="gender"
                  select
                  autoComplete="off"
                  SelectProps={{ native: true }}
                  value={formState.values.gender || ''}
                  inputProps={{ readOnly: true }}
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
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          <span className={classes.formGroupTitle}>Contact details</span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '65%', padding: '10px 0' }}>
              <TextField
                error={hasError('homeAddress')}
                fullWidth
                label="Home address"
                name="homeAddress"
                autoComplete="off"
                value={formState.values.homeAddress || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div style={{ width: '20%', padding: '10px 0' }}>
              <TextField
                error={hasError('postCode')}
                fullWidth
                label="Post Code"
                name="postCode"
                autoComplete="off"
                value={formState.values.postCode || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '65%', padding: '10px 0' }}>
              <TextField
                error={hasError('postalAddress')}
                fullWidth
                label="Postal address"
                name="postalAddress"
                autoComplete="off"
                value={formState.values.postalAddress || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div style={{ width: '20%', padding: '10px 0' }}>
              <TextField
                error={hasError('postalCode')}
                fullWidth
                label="Post Code"
                name="postalCode"
                autoComplete="off"
                value={formState.values.postalCode || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              error={hasError('phone')}
              fullWidth
              label="Phone"
              name="phone"
              autoComplete="off"
              value={formState.values.phone || ''}
              variant="outlined"
              onChange={handleChange}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div style={{ width: '50%', padding: '10px 0' }}>
            <TextField
              error={hasError('email')}
              fullWidth
              label="Email"
              name="email"
              autoComplete="off"
              value={formState.values.email || ''}
              variant="outlined"
              onChange={handleChange}
              inputProps={{ readOnly: true }}
            />
          </div>
          {/* <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px'
            }}>
            <span className={classes.subTitle}>
              Preferred method of contact:
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={<span className={classes.checkText}>Phone</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={<span className={classes.checkText}>Text</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={<span className={classes.checkText}>Email</span>}
              />
            </div>
          </div> */}
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          <span className={classes.formGroupTitle}>Emergency Contact</span>
          <div className={classes.textFieldContainer}>
            <TextField
              error={hasError('contactName')}
              fullWidth
              label="Contact name"
              name="contactName"
              autoComplete="off"
              value={formState.values.contactName || ''}
              variant="outlined"
              onChange={handleChange}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              error={hasError('relationship')}
              fullWidth
              label={
                <span className={classes.selectOptionLabel}>
                  Relationship to consumer
                </span>
              }
              name="relationship"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={formState.values.relationship || ''}
              inputProps={{ readOnly: true }}
              variant="outlined"
              onChange={handleChange}>
              {['', 'Uncle'].map(relationship => (
                <option key={relationship} value={relationship}>
                  {relationship}
                </option>
              ))}
            </TextField>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('contactPhone')}
                fullWidth
                label="Phone"
                name="contactPhone"
                autoComplete="off"
                value={formState.values.contactPhone || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div style={{ width: '50%', padding: '10px 0' }}>
              <TextField
                error={hasError('contactAddress')}
                fullWidth
                label="Address"
                name="contactAddress"
                autoComplete="off"
                value={formState.values.contactAddress || ''}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
          </div>
          <div style={{ width: '50%', padding: '10px 0' }}>
            <TextField
              error={hasError('whenToContact')}
              fullWidth
              label="When to contact"
              name="whenToContact"
              autoComplete="off"
              value={formState.values.whenToContact || ''}
              variant="outlined"
              onChange={handleChange}
              inputProps={{ readOnly: true }}
            />
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          {/* <span className={classes.formGroupTitle}>Cultural background</span> */}
          {/* <div className={classes.textFieldContainer}>
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
              onChange={handleChange}
            />
          </div> */}
          {/* <div
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
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={<span className={classes.checkText}>Yes</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={<span className={classes.checkText}>No</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={
                  <span className={classes.checkText}>
                    Prefer not to disclose
                  </span>
                }
              />
            </div>
          </div> */}
          {/* <div
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
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={<span className={classes.checkText}>Yes</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={<span className={classes.checkText}>No</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={
                  <span className={classes.checkText}>
                    Prefer not to disclose
                  </span>
                }
              />
            </div>
          </div> */}
        </div>
      </Grid>
    </Grid>
  );
};

export default General;
