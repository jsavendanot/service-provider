import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { callConsumerReadApi } from 'slices/people/action';
import moment from 'moment';
import { Profile } from 'types/profile';

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

  const [consumerProfile, setConsumerProfile] = useState<Profile>();

  const genders = [
    { name: '', value: '' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'Other' },
    { name: 'Prefer not to say', value: 'Unknown' }
  ];

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

  useEffect(() => {
    (async function readConsumersProfile() {
      const profile = await callConsumerReadApi(
        sessionStorage.getItem('RecoveryPlanId')!
      );
      setConsumerProfile(profile);
    })();
  }, []);

  return (
    <>
      {/* {!consumerProfile && <Loading />} */}
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.formGroup}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={classes.textFieldContainer}>
                  <TextField
                    error={hasError('FirstName')}
                    fullWidth
                    label="First name"
                    name="FirstName"
                    autoComplete="off"
                    value={
                      consumerProfile && consumerProfile.FirstName
                        ? consumerProfile.FirstName
                        : ' '
                    }
                    variant="outlined"
                    onChange={handleChange}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div className={classes.textFieldContainer}>
                  <TextField
                    error={hasError('Surname')}
                    fullWidth
                    label="Last name"
                    name="Surname"
                    autoComplete="off"
                    value={
                      consumerProfile && consumerProfile.Surname
                        ? consumerProfile.Surname
                        : ' '
                    }
                    variant="outlined"
                    onChange={handleChange}
                    inputProps={{ readOnly: true }}
                  />
                </div>
              </div>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('PreferredName')}
                  fullWidth
                  label="Preferred name"
                  name="PreferredName"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.PreferredName
                      ? consumerProfile.PreferredName
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={classes.textFieldContainer}>
                  <TextField
                    error={hasError('DateOfBirth')}
                    fullWidth
                    label="Date of birth"
                    name="DateOfBirth"
                    autoComplete="off"
                    value={
                      consumerProfile && consumerProfile.DateOfBirth
                        ? moment(consumerProfile.DateOfBirth).format(
                            'DD/MM/YYYY'
                          )
                        : ' '
                    }
                    variant="outlined"
                    onChange={handleChange}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div className={classes.textFieldContainer}>
                  <TextField
                    error={hasError('Gender')}
                    fullWidth
                    label="Gender"
                    name="Gender"
                    select
                    autoComplete="off"
                    SelectProps={{ native: true }}
                    value={
                      consumerProfile && consumerProfile.Gender
                        ? consumerProfile.Gender
                        : ''
                    }
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    onChange={handleChange}>
                    {genders.map(gender => (
                      <option key={gender.value} value={gender.value}>
                        {gender.name}
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
            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '65%', padding: '10px 0' }}>
                <TextField
                  error={hasError('HomeAddress')}
                  fullWidth
                  label="Home address"
                  name="HomeAddress"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.HomeAddress
                      ? consumerProfile.HomeAddress
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div style={{ width: '20%', padding: '10px 0' }}>
                <TextField
                  error={hasError('PostalPostCode')}
                  fullWidth
                  label="Post Code"
                  name="PostalPostCode"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.PostalPostCode
                      ? consumerProfile.PostalPostCode
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '65%', padding: '10px 0' }}>
                <TextField
                  error={hasError('PostalAddress')}
                  fullWidth
                  label="Postal address"
                  name="PostalAddress"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.PostalAddress
                      ? consumerProfile.PostalAddress
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
              {/* <div style={{ width: '20%', padding: '10px 0' }}>
                <TextField
                  error={hasError('PostalPostCode')}
                  fullWidth
                  label="Post Code"
                  name="PostalPostCode"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.PostalPostCode
                      ? consumerProfile.PostalPostCode
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div> */}
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('MobilePhone')}
                fullWidth
                label="Phone"
                name="MobilePhone"
                autoComplete="off"
                value={
                  consumerProfile && consumerProfile.MobilePhone
                    ? consumerProfile.MobilePhone
                    : ' '
                }
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div style={{ width: '50%', padding: '10px 0' }}>
              <TextField
                error={hasError('PrimaryEmail')}
                fullWidth
                label="Email"
                name="PrimaryEmail"
                autoComplete="off"
                value={
                  consumerProfile && consumerProfile.PrimaryEmail
                    ? consumerProfile.PrimaryEmail
                    : ' '
                }
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
                error={hasError('ContactName')}
                fullWidth
                label="Contact name"
                name="ContactName"
                autoComplete="off"
                value={
                  consumerProfile && consumerProfile.ContactName
                    ? consumerProfile.ContactName
                    : ' '
                }
                variant="outlined"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('RelationshipToConsumer')}
                fullWidth
                label="Relationship to consumer"
                name="RelationshipToConsumer"
                select
                autoComplete="off"
                SelectProps={{ native: true }}
                value={
                  consumerProfile && consumerProfile.RelationshipToConsumer
                    ? consumerProfile.RelationshipToConsumer
                    : ''
                }
                inputProps={{ readOnly: true }}
                variant="outlined">
                {[
                  '',
                  'Parent',
                  'Spouse',
                  'Child',
                  'Partner',
                  'Grandparent',
                  'Sibling',
                  'Friend',
                  'other'
                ].map(relationship => (
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
                  error={hasError('EmergencyContactPhone')}
                  fullWidth
                  label="Phone"
                  name="EmergencyContactPhone"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.EmergencyContactPhone
                      ? consumerProfile.EmergencyContactPhone
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div style={{ width: '50%', padding: '10px 0' }}>
                <TextField
                  error={hasError('EmergencyAddress')}
                  fullWidth
                  label="Address"
                  name="EmergencyAddress"
                  autoComplete="off"
                  value={
                    consumerProfile && consumerProfile.EmergencyAddress
                      ? consumerProfile.EmergencyAddress
                      : ' '
                  }
                  variant="outlined"
                  onChange={handleChange}
                  inputProps={{ readOnly: true }}
                />
              </div>
            </div>
            <div style={{ width: '50%', padding: '10px 0' }}>
              <TextField
                error={hasError('EmergencyWhenToContact')}
                fullWidth
                label="When to contact"
                name="EmergencyWhenToContact"
                autoComplete="off"
                value={
                  consumerProfile && consumerProfile.EmergencyWhenToContact
                    ? consumerProfile.EmergencyWhenToContact
                    : ' '
                }
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
    </>
  );
};

export default General;
