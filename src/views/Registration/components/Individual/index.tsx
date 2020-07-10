import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';
import validate from 'validate.js';
import useRouter from 'common/utils/useRouter';

import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { NavProps } from '../../types';
import { Button, Loading } from 'common/components';
import { Profile } from 'types/profile';
import uuid from 'uuid';
import { createProfile } from 'slices/profile/action';
import { RootState } from 'reducer';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '84px',
    height: '30px',
    background: '#692B40',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '28px',
    color: '#FFFFFF',
    cursor: 'pointer',
    margin: '20px 0'
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
  },
  avatar: {
    width: '80px',
    height: '80px'
  }
}));

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 15
    }
  },
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  middleName: {
    presence: false,
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
  organisation: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  streetAddress: {
    presence: false,
    length: {
      maximum: 100
    }
  },
  addressLine2: {
    presence: false,
    length: {
      maximum: 100
    }
  },
  city: {
    presence: false,
    length: {
      maximum: 80
    }
  },
  state: {
    presence: false,
    length: {
      maximum: 50
    }
  },
  zipCode: {
    presence: false,
    length: {
      maximum: 5
    }
  },
  workPhone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: true,
    length: {
      minimum: 10,
      maximum: 15
    }
  },
  mobilePhone: {
    presence: false,
    length: {
      minimum: 10,
      maximum: 15
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
    organisation?: string;
    streetAddress?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    workPhone?: string;
    mobilePhone?: string;
  };
  touched: {
    title?: boolean;
    firstName?: boolean;
    middleName?: boolean;
    lastName?: boolean;
    practice?: boolean;
    organisation?: boolean;
    streetAddress?: boolean;
    addressLine2?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    workPhone?: boolean;
    mobilePhone?: boolean;
  };
  errors: {
    title?: string[];
    firstName?: string[];
    middleName?: string[];
    lastName?: string[];
    practice?: string[];
    organisation?: string[];
    streetAddress?: string[];
    addressLine2?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    workPhone?: string[];
    mobilePhone?: string[];
  };
};

type Props = {
  setState: Dispatch<SetStateAction<NavProps>>;
};

const Individual: React.FC<Props> = ({ setState }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.profile.loading
  );

  const profile: Profile = useSelector(
    (state: RootState) => state.profile.profile
  );

  /** Handle Fields */
  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [registrationForm, setRegistrationForm] = useState({
    title: '',
    firstName: profile.FirstName,
    lastName: profile.Surname,
    middleName: '',
    practice: '',
    organisation: '',
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    workPhone: '',
    mobilePhone: '',
    image: '',
    imageType: ''
  });

  const [organisationList] = useState([
    {
      name: '',
      value: ''
    },
    {
      name: 'Calvary Health Care Riverina',
      value: 'Calvary Health Care Riverina'
    },
    {
      name: 'Centacare',
      value: 'Centacare'
    },
    {
      name: 'Directions Health',
      value: 'Directions Health'
    },
    {
      name: 'Family & Community Services',
      value: 'Family & Community Services'
    },
    {
      name: 'Flourish Australia',
      value: 'Flourish Australia'
    },
    {
      name: 'Headspace',
      value: 'Headspace'
    },
    {
      name: 'Intereach',
      value: 'Intereach'
    },
    {
      name: 'Karralika Programs',
      value: 'Karralika Programs'
    },
    {
      name: 'Lambing Flat Enterprises',
      value: 'Lambing Flat Enterprises'
    },
    {
      name: 'Likemind',
      value: 'Likemind'
    },
    {
      name: 'Marathon Health',
      value: 'Marathon Health'
    },
    {
      name: 'Murrumbidgee Local Health District',
      value: 'Murrumbidgee Local Health District'
    },
    {
      name: 'Murrumbidgee Primary Health Network',
      value: 'Murrumbidgee Primary Health Network'
    },
    {
      name: 'One Door Mental Health',
      value: 'One Door Mental Health'
    },
    {
      name: 'Relationships Australia',
      value: 'Relationships Australia'
    },
    {
      name: 'Riverina Medical & Dental Aboriginal Corporation',
      value: 'Riverina Medical & Dental Aboriginal Corporation'
    },
    {
      name: 'St Vincent de Paul Society',
      value: 'St Vincent de Paul Society'
    },
    {
      name: 'Sunflower House',
      value: 'Sunflower House'
    },
    {
      name: 'Wellways',
      value: 'Wellways'
    }
  ]);

  const [states] = useState([
    { name: '', value: '' },
    { name: 'New South Wales', value: 'New South Wales' },
    { name: 'Victoria', value: 'Victoria' },
    { name: 'Queensland', value: 'Queensland' },
    { name: 'Western Australia', value: 'Western Australia' },
    { name: 'South Australia', value: 'South Australia' },
    { name: 'Tasmania', value: 'Tasmania' }
  ]);

  const [termCheckBox, setTermCheckBox] = useState(false);

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

    setRegistrationForm(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  /** Handle Submit */

  const handleSubmit = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        title: registrationForm.title,
        firstName: registrationForm.firstName,
        lastName: registrationForm.lastName,
        organisation: registrationForm.organisation,
        streetAddress: registrationForm.streetAddress,
        city: registrationForm.city,
        state: registrationForm.state,
        zipCode: registrationForm.zipCode,
        workPhone: registrationForm.workPhone,
        mobilePhone: registrationForm.mobilePhone
      },
      touched: {
        ...formState.touched,
        title: true,
        firstName: true,
        lastName: true,
        organisation: true,
        streetAddress: true,
        city: true,
        state: true,
        zipCode: true,
        workPhone: true,
        mobilePhone: true
      }
    }));

    if (formState.isValid && termCheckBox) {
      const profile: Profile = {
        ContactId: uuid(),
        RecoveryPlanId: sessionStorage.getItem('Provider_RecoveryPlanId')!,
        UserId: sessionStorage.getItem('Provider_UserId')!,
        SafetyPlanId: sessionStorage.getItem('Provider_SafetyPlanId')!,
        FirstName: registrationForm.firstName,
        Surname: registrationForm.lastName,
        PreferredName: registrationForm.middleName,
        Gender: '',
        DateOfBirth: '',
        UserEmail: sessionStorage.getItem('Provider_Email')!,
        ContactType: '935000001',
        HomeAddress: '',
        HomePostCode: '',
        PostalAddress: '',
        PostalPostCode: registrationForm.zipCode,
        HomePhone: '',
        MobilePhone: registrationForm.mobilePhone,
        BusinessPhone: '',
        PrimaryEmail: '',
        PreferredContactMethod: '',
        ContactName: registrationForm.organisation,
        RelationshipToConsumer: registrationForm.practice,
        EmergencyContactPhone: registrationForm.workPhone,
        EmergencyAddress:
          registrationForm.streetAddress +
          ', ' +
          registrationForm.addressLine2 +
          ', ' +
          registrationForm.city +
          ', ' +
          registrationForm.state,
        EmergencyWhenToContact: '',
        CountryOfBirth: '',
        PreferredLanguage: '',
        GeneralPractionerId: '',
        MedicalRecordNumber: '',
        AdditionalInformation: registrationForm.title,
        Image: registrationForm.image,
        ImageType: '',
        ImageUrl: '',
        FullName: ''
      };

      dispatch(createProfile(history, profile));
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let imageType = event.target.files[0].type.replace('image/', '');
      if (imageType === 'jpeg') {
        imageType = 'jpg';
      }
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        setRegistrationForm(value => ({
          ...value,
          image: e.target
            ? e.target?.result!.toString().split('base64,')[1]
            : '',
          imageType: imageType
        }));
      };
    }
  };

  return (
    <>
      {loading && <Loading />}
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
                  fullWidth
                  label="Title*"
                  name="title"
                  autoComplete="off"
                  value={registrationForm.title}
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '30%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('firstName')}
                    fullWidth
                    label="First name*"
                    name="firstName"
                    autoComplete="off"
                    value={registrationForm.firstName}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div style={{ width: '30%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('middleName')}
                    fullWidth
                    label="Middle name"
                    name="middleName"
                    autoComplete="off"
                    value={registrationForm.middleName}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div style={{ width: '30%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('lastName')}
                    fullWidth
                    label="Last name*"
                    name="lastName"
                    autoComplete="off"
                    value={registrationForm.lastName}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.formGroup}>
              <span className={classes.formGroupTitle}>
                Practice or Service Name
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
                    fullWidth
                    label="Practice"
                    name="practice"
                    autoComplete="off"
                    value={registrationForm.practice}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
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
              <div style={{ width: '65%', marginTop: '15px' }}>
                <TextField
                  error={hasError('organisation')}
                  fullWidth
                  label={
                    <span className={classes.selectOptionLabel}>
                      Select organisation
                    </span>
                  }
                  name="organisation"
                  select
                  autoComplete="off"
                  SelectProps={{ native: true }}
                  value={registrationForm.organisation}
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}>
                  {organisationList.map(org => (
                    <option key={org.value} value={org.value}>
                      {org.name}
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
                    fullWidth
                    label="Street Address*"
                    name="streetAddress"
                    autoComplete="off"
                    value={registrationForm.streetAddress}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div style={{ width: '50%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('addressLine2')}
                    fullWidth
                    label="Address Line 2"
                    name="addressLine2"
                    autoComplete="off"
                    value={registrationForm.addressLine2}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    fullWidth
                    label="City"
                    name="city"
                    autoComplete="off"
                    value={registrationForm.city}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div style={{ width: '30%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('state')}
                    fullWidth
                    label={
                      <span className={classes.selectOptionLabel}>
                        Select state
                      </span>
                    }
                    name="state"
                    select
                    autoComplete="off"
                    SelectProps={{ native: true }}
                    value={registrationForm.state}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}>
                    {states.map(state => (
                      <option key={state.value} value={state.value}>
                        {state.name}
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
                    fullWidth
                    label="Postcode"
                    name="zipCode"
                    autoComplete="off"
                    value={registrationForm.zipCode}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
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
                    error={hasError('workPhone')}
                    fullWidth
                    label="Work*"
                    name="workPhone"
                    autoComplete="off"
                    value={registrationForm.workPhone}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div style={{ width: '30%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('mobilePhone')}
                    fullWidth
                    label="Mobile"
                    name="mobilePhone"
                    autoComplete="off"
                    value={registrationForm.mobilePhone}
                    variant="outlined"
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true
                    }}
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
                  value="We are still building our Terms of Service. 
                For now, checking the box below will not make you agree to anything. But for testing, please still pretend to agree to this (by checking the box) in order to proceed."
                  autoComplete="off"
                  rows="6"
                  style={{ marginTop: '15px' }}
                  className={classes.termsOfService}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termCheckBox}
                    value={termCheckBox}
                    className={classes.termsCheckBox}
                    onChange={() => setTermCheckBox(value => !value)}
                  />
                }
                label={
                  <span className={classes.termsText}>
                    I agree to the Terms of Service*
                  </span>
                }
              />
              {!termCheckBox && !formState.isValid && (
                <FormHelperText error>
                  This field must be checked
                </FormHelperText>
              )}
            </div>
            <div className={classes.formGroup}>
              <span className={classes.formGroupTitle}>Profile Image </span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* <div
                style={{
                  height: '141.1px',
                  width: '117px',
                  marginTop: '15px'
                }}>
                <img src="/images/landing/consumer_image.svg" alt="" />
              </div> */}
                <Avatar
                  alt=""
                  className={classes.avatar}
                  src={'data:image/png;base64,' + registrationForm.image}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '20px'
                  }}>
                  <div>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleFileInputChange}
                      id="icon-button-file"
                      style={{ display: 'none' }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '30px'
                      }}>
                      <label htmlFor="icon-button-file">
                        <div className={classes.uploadButton}>
                          <span className={classes.uploadButtonText}>
                            UPLOAD
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
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
    </>
  );
};

export default Individual;
