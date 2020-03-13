import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';
import validate from 'validate.js';

import { Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { NavProps } from '../../types';
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
  /** Outlines */
  outline: {
    border: '1px solid #FFEAEA',
    background: '#FFEAEA',
    borderRadius: '3px'
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
  orgName: {
    presence: false,
    length: {
      maximum: 32
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
  contactPersonName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  contactPersonNum: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 15
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 50
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
    orgName?: string;
    streetAddress?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    contactPersonName?: string;
    contactPersonNum?: string;
    email?: string;
    password?: string;
    retypedPassword?: string;
    outline1?: string;
    outline2?: string;
  };
  touched: {
    orgName?: boolean;
    streetAddress?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    contactPersonName?: boolean;
    contactPersonNum?: boolean;
    email?: boolean;
    password?: boolean;
    retypedPassword?: boolean;
    outline1?: boolean;
    outline2?: boolean;
  };
  errors: {
    orgName?: string[];
    streetAddress?: string[];
    addressLine2?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    contactPersonName?: string[];
    contactPersonNum?: string[];
    email?: string[];
    password?: string[];
    retypedPassword?: string[];
    outline1?: string[];
    outline2?: string[];
  };
};

type Props = {
  setState: Dispatch<SetStateAction<NavProps>>;
};

const Organisation: React.FC<Props> = ({ setState }) => {
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

  /** Handle Submit */
  const handleSubmit = () => {
    setState('Confirm');
  };

  return (
    <Grid container justify="flex-start">
      <Grid item xs={9}>
        <span className={classes.title}>
          Service Provider Registration - Organisation
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
            <span className={classes.formGroupTitle}>Organisation Name*</span>
            <div style={{ width: '65%', padding: '10px 0' }}>
              <TextField
                error={hasError('orgName')}
                helperText={
                  hasError('orgName')
                    ? formState.errors.orgName && formState.errors.orgName[0]
                    : null
                }
                fullWidth
                label="Name"
                name="orgName"
                autoComplete="off"
                value={formState.values.orgName || ''}
                variant="outlined"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>Organisation Address</span>
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
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>
              Primary contact person
            </span>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '30%',
                  padding: '10px 0',
                  marginRight: '34px'
                }}>
                <TextField
                  error={hasError('contactPersonName')}
                  helperText={
                    hasError('contactPersonName')
                      ? formState.errors.contactPersonName &&
                        formState.errors.contactPersonName[0]
                      : null
                  }
                  fullWidth
                  label="Name*"
                  name="contactPersonName"
                  autoComplete="off"
                  value={formState.values.contactPersonName || ''}
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '30%', padding: '10px 0' }}>
                <TextField
                  error={hasError('contactPersonNum')}
                  helperText={
                    hasError('contactPersonNum')
                      ? formState.errors.contactPersonNum &&
                        formState.errors.contactPersonNum[0]
                      : null
                  }
                  fullWidth
                  label="Contact Number*"
                  name="contactPersonNum"
                  autoComplete="off"
                  value={formState.values.contactPersonNum || ''}
                  variant="outlined"
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
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>
              Please provide a brief outline of the Mental Health and/or Drug
              and Alcohol Services your organisation provides, including the
              catchment area.*
            </span>
            <div style={{ width: '100%' }}>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder=""
                fullWidth
                multiline
                value={formState.values.outline1 || ''}
                autoComplete="off"
                rows="4"
                style={{ marginTop: '15px' }}
                className={classes.outline}
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <span className={classes.formGroupTitle}>
              Please outline how you believe your organisation’s membership of
              the Murrumbidgee Mental Health Drug and Alcohol Alliance would
              benefit the communities of the Murrumbidgee District.*
            </span>
            <div style={{ width: '100%' }}>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder=""
                fullWidth
                multiline
                value={formState.values.outline2 || ''}
                autoComplete="off"
                rows="4"
                style={{ marginTop: '15px' }}
                className={classes.outline}
              />
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
                <img src="/images/landing/consumer_image.svg" alt="" />
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
            <Button type="primary" click={handleSubmit}>
              <span className={classes.submitButtonText}>SUBMIT</span>
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Organisation;
