import React from 'react';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'common/utils/useRouter';
import { Dialog, DialogContent, Theme } from '@material-ui/core';
import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '450px'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#C57D7D',
    marginBottom: '10px'
  },
  bodyText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    marginBottom: '20px'
  },
  box: {
    marginBottom: '20px'
  },
  buttonContainer: {
    width: '200px'
  }
}));

type Props = {
  open: boolean;
  close: () => void;
  openInvitation: () => void;
  openEnterCode: () => void;
};

const OptionsPopup: React.FC<Props> = ({
  open,
  close,
  openInvitation,
  openEnterCode
}) => {
  const classes = useStyles();
  const { history } = useRouter();

  const inviteClickHandler = () => {
    close();
    openInvitation();
  };

  const enterCodeClickHandler = () => {
    close();
    openEnterCode();
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <div className={classes.root}>
          <div className={classes.box}>
            <div className={classes.title}>Send an invitation</div>
            <div className={classes.bodyText}>
              This is the easiest way to connect with your client – simply enter
              their email address and they’ll receive an invitation to join.
              You’ll be able to find them on your client list once they accept
              the invitation.
              <br />
              <b>
                Note: Your client will need to use the email address that you
                send the invitation to when they sign up to Jiemba, or else they
                will not show up in your client list. If they use a different
                address, you will need to wait for them to add you as a service
                provider, or add them again yourself.
              </b>
            </div>
            <div className={classes.buttonContainer}>
              <Button type="primary" click={inviteClickHandler}>
                Add client
              </Button>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.title}>
              Create a new profile for my client
            </div>
            <div className={classes.bodyText}>
              Only use this option if your client is not registered with Jiemba
              yet and you have not sent them an invitation. Enter their
              information, including the email address they will use to sign up
              to Jiemba.
              <br />
              <b>
                What’s great about this: When your client signs up, they won’t
                need to fill out the profile information again, saving them
                time.
              </b>
            </div>
            <div className={classes.buttonContainer}>
              <Button type="primary" click={() => history.push('consumer/add')}>
                Create client profile
              </Button>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.title}>Enter invitation code</div>
            <div className={classes.bodyText}>
              If you have received an invitation from your client to join
              Jiemba, you can enter your 6-digit code here. You can find the
              code in your email invitation.
            </div>
            <div className={classes.buttonContainer}>
              <Button type="primary" click={enterCodeClickHandler}>
                Enter code
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OptionsPopup;
