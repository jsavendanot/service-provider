import React, { useEffect, useState, ChangeEvent } from 'react';

import useRouter from 'common/utils/useRouter';
import { Grid, Avatar, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, Save } from '@material-ui/icons';
import validate from 'validate.js';
import produce from 'immer';

import { Profile } from 'types/profile';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { fetchProfile, editProfile } from 'slices/profile/action';
import { Loading } from 'common/components';

const useStyles = makeStyles(() => ({
  gridItem: {
    backgroundColor: '#FFFAEA',
    padding: '30px 0 20px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  /** Profile Image */
  uploadButton: {
    width: '84px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  providerName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    marginTop: '5px'
  },
  /** Content */
  content: {
    padding: '20px 0'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#000000',
    marginTop: '5px',
    marginBottom: '10px'
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#000000',
    marginRight: '20px',
    width: '100px'
  },
  value: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#C57D7D'
  },
  button: {
    width: '100px',
    padding: '5px',
    border: '1px solid #C57D7D',
    borderRadius: '50px',
    color: '#692B40',
    background: '#FFFFFF',
    cursor: 'pointer',
    margin: '20px 0',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#C57D7D'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#692B40',
    textTransform: 'uppercase'
  },
  elementGroup: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0'
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40',
    textTransform: 'uppercase'
  },
  selectOptionLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#692B40'
  }
}));

const schema = {
  RelationshipToConsumer: {
    length: {
      maximum: 80
    }
  },
  ContactName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  EmergencyAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 364
    }
  },
  EmergencyContactPhone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15
    }
  },
  MobilePhone: {
    presence: false,
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    RelationshipToConsumer?: string;
    ContactName?: string;
    EmergencyAddress?: string;
    EmergencyContactPhone?: string;
    MobilePhone?: string;
  };
  touched: {
    RelationshipToConsumer?: boolean;
    ContactName?: boolean;
    EmergencyAddress?: boolean;
    EmergencyContactPhone?: boolean;
    MobilePhone?: boolean;
  };
  errors: {
    RelationshipToConsumer?: string[];
    ContactName?: string[];
    EmergencyAddress?: string[];
    EmergencyContactPhone?: string[];
    MobilePhone?: string[];
  };
};

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.profile.loading
  );

  const profileState: Profile = useSelector(
    (state: RootState) => state.profile.profile!
  );

  const [profile, setProfile] = useState(profileState);

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      RelationshipToConsumer: profile.RelationshipToConsumer,
      ContactName: profile.ContactName,
      EmergencyAddress: profile.EmergencyAddress,
      EmergencyContactPhone: profile.EmergencyContactPhone,
      MobilePhone: profile.MobilePhone
    },
    touched: {},
    errors: {}
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

    setProfile(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let imageType = event.target.files[0].type.replace('image/', '');
      if (imageType === 'jpeg') {
        imageType = 'jpg';
      }
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        setProfile(
          produce((draft: Profile) => {
            draft.Image = e.target?.result!.toString().split('base64,')[1];
            draft.ImageType = imageType;
          })
        );
      };
    }
  };

  const saveHandler = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        RelationshipToConsumer: profile.RelationshipToConsumer,
        ContactName: profile.ContactName,
        EmergencyAddress: profile.EmergencyAddress,
        EmergencyContactPhone: profile.EmergencyContactPhone,
        MobilePhone: profile.MobilePhone
      },
      touched: {
        ...formState.touched,
        RelationshipToConsumer: true,
        ContactName: true,
        EmergencyAddress: true,
        EmergencyContactPhone: true,
        MobilePhone: true
      }
    }));

    if (formState.isValid) {
      dispatch(editProfile(history, profile));
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Grid container>
        <Grid item xs={12} className={classes.gridItem}>
          <Grid container justify="center">
            <Grid item xs={1}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => history.goBack()}>
                <KeyboardArrowLeft style={{ fill: '#692B40' }} />
                <span className={classes.navText}>back</span>
              </div>
            </Grid>
            <Grid item xs={8}>
              <span className={classes.title}>Profile</span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '10px'
                  }}>
                  <Avatar
                    alt=""
                    className={classes.avatar}
                    src={'data:image/png;base64,' + profile.Image}
                  />
                  <span
                    className={
                      classes.providerName
                    }>{`Dr ${profile.FirstName}`}</span>
                </div>
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
                        <span className={classes.uploadButtonText}>upload</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={7}>
              <div className={classes.content}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: '20px'
                  }}>
                  <Button className={classes.button} onClick={saveHandler}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Save style={{ fill: '#692B40', marginRight: '8px' }} />
                      <span className={classes.buttonText}>Save</span>
                    </div>
                  </Button>
                </div>
                <div className={classes.elementGroup}>
                  <span className={classes.subTitle}>Name</span>
                  <div style={{ display: 'flex', margin: '10px 0' }}>
                    <div style={{ marginRight: '40px' }}>
                      <span className={classes.name}>Title</span>
                      <span className={classes.value}>
                        {profile.AdditionalInformation}
                      </span>
                    </div>
                    <div style={{ marginRight: '10px' }}>
                      <span className={classes.name}>Full name</span>
                      <span className={classes.value}>
                        {`${profile.FirstName}
                      ${profile.Surname}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={classes.elementGroup}>
                  <div className={classes.element}>
                    <span className={classes.subTitle}>Practice</span>
                    <span className={classes.value}>
                      <div style={{ width: '40%' }}>
                        <TextField
                          error={hasError('RelationshipToConsumer')}
                          label=""
                          name="RelationshipToConsumer"
                          type="text"
                          autoComplete="off"
                          fullWidth
                          value={
                            profile.RelationshipToConsumer
                              ? profile.RelationshipToConsumer
                              : ''
                          }
                          placeholder="type here"
                          onChange={handleChange}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className={classes.elementGroup}>
                <div className={classes.element}>
                  <span className={classes.subTitle}>Organisation</span>
                  <span className={classes.value}>
                    <div style={{ width: '65%', marginTop: '15px' }}>
                      <TextField
                        error={hasError('ContactName')}
                        fullWidth
                        label={
                          <span className={classes.selectOptionLabel}>
                            Select organisation
                          </span>
                        }
                        name="ContactName"
                        select
                        autoComplete="off"
                        SelectProps={{ native: true }}
                        value={profile.ContactName}
                        variant="outlined"
                        onChange={handleChange}>
                        {organisationList.map(org => (
                          <option key={org.value} value={org.value}>
                            {org.name}
                          </option>
                        ))}
                      </TextField>
                    </div>
                  </span>
                </div>
              </div>
              <div className={classes.elementGroup}>
                <div className={classes.element}>
                  <span className={classes.subTitle}>Work Address</span>
                  <span className={classes.value}>
                    <div style={{ width: '65%' }}>
                      <TextField
                        error={hasError('EmergencyAddress')}
                        label=""
                        name="EmergencyAddress"
                        type="text"
                        autoComplete="off"
                        fullWidth
                        value={
                          profile.EmergencyAddress
                            ? profile.EmergencyAddress
                            : ''
                        }
                        placeholder="type here"
                        onChange={handleChange}
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className={classes.elementGroup}>
                <span className={classes.subTitle}>Contact Details</span>
                <div style={{ margin: '10px 0' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '15px 0'
                    }}>
                    <div className={classes.name}>Work</div>
                    <div style={{ width: '50%' }}>
                      <TextField
                        error={hasError('EmergencyContactPhone')}
                        label=""
                        name="EmergencyContactPhone"
                        type="text"
                        autoComplete="off"
                        fullWidth
                        value={
                          profile.EmergencyContactPhone
                            ? profile.EmergencyContactPhone
                            : ''
                        }
                        placeholder="type here"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '15px 0'
                    }}>
                    <div className={classes.name}>Mobile</div>
                    <div style={{ width: '50%' }}>
                      <TextField
                        error={hasError('MobilePhone')}
                        label=""
                        name="MobilePhone"
                        type="text"
                        fullWidth
                        autoComplete="off"
                        value={profile.MobilePhone ? profile.MobilePhone : ''}
                        placeholder="type here"
                        onChange={handleChange}
                        inputProps={{ maxLength: 20 }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '15px 0'
                    }}>
                    <div className={classes.name}>Email</div>
                    <span className={classes.value}>{profile.UserEmail}</span>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
