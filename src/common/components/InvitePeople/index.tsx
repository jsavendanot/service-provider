import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { Close, Email } from '@material-ui/icons';

import { Button, SubmitConfirmation } from 'common/components';
import { Invitation } from 'types/network';
import { sendInvitation } from 'slices/invitation/action';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px',
    height: '100%'
  },
  closeIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#C57D7D'
  },
  desc: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  closeText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    cursor: 'pointer'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 20px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  }
}));

const schema = {
  EmailAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    EmailAddress?: string;
  };
  touched: {
    EmailAddress?: boolean;
  };
  errors: {
    EmailAddress?: string[];
  };
};

type Props = {
  close: () => void;
};

const InvitePeople: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [invitation, setInvitation] = useState<Invitation>({
    InvitationId: '',
    Name: '',
    EmailAddress: '',
    Subject: 'Invitation',
    Message: '',
    UserId: '',
    AcceptedOn: '',
    AccountType: 'Consumer',
    AllowRecPlanAccess: false,
    GoalsToShare: '',
    ShareAllGoals: false,
    JournalsToShare: '',
    ShareAllJournals: false,
    ShareMyStory: false,
    ShareSafetyPlan: false,
    ShareNetworkContacts: false,
    Relationship: '',
    SharingPurpose: '',
    InvitationCode: '',
    CreatedOn: ''
  });

  /** Send invitation */
  const submitSendInvitation = () => {
    dispatch(sendInvitation(invitation));
    close();
  };

  const handleInvitationFields = (name: string, value: string | boolean) => {
    setInvitation(values => ({
      ...values,
      [name]: value
    }));
  };

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

    handleInvitationFields(event.target.name, event.target.value);
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  /** Dialog */
  const [open, setOpen] = useState(false);

  function openDialogHandler() {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        EmailAddress: invitation.EmailAddress
      },
      touched: {
        ...formState.touched,
        EmailAddress: true
      }
    }));

    if (formState.isValid) {
      setOpen(true);
    }
  }

  const confirmDialog = (
    <SubmitConfirmation
      open={open}
      close={() => setOpen(false)}
      action={submitSendInvitation}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        invite this person?
      </span>
    </SubmitConfirmation>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IconButton className={classes.closeIcon} onClick={close}>
            <Close fontSize="large" style={{ fill: '#C57D7D' }} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>Invite client</span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.desc}>
            Invite clients who's under your care by sending invitation to their
            email.
          </span>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <TextField
            error={hasError('EmailAddress')}
            fullWidth
            label="Enter email address"
            name="EmailAddress"
            autoComplete="off"
            value={formState.values.EmailAddress || ''}
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="primary" click={openDialogHandler}>
            <div className={classes.buttonContent}>
              <Email style={{ fill: '#FFFFFF', marginRight: '5px' }} />
              Send email invitation
            </div>
          </Button>
        </Grid>
        <Grid item xs={12} container justify="center">
          <span className={classes.closeText} onClick={close}>
            Close
          </span>
        </Grid>
      </Grid>
      {open && confirmDialog}
    </div>
  );
};

export default InvitePeople;
