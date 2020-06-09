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
            <div className={classes.title}>Send an email invitation</div>
            <div className={classes.bodyText}>
              This is the easiest way to connect with a client - Simply enter
              their email address and we’ll send an invitation to that email.
              You can find them on your client list once they accept the
              invitation.
              <br />
              <b>
                Note: Make sure the client will use the same email address to
                sign up if they are not registered with Jiemba yet.
              </b>
            </div>
            <div className={classes.buttonContainer}>
              <Button type="primary" click={inviteClickHandler}>
                invite client
              </Button>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.title}>
              Create a new profile for my client
            </div>
            <div className={classes.bodyText}>
              Only use this option if your client is not registered with Jiemba
              yet. You’ll have to enter their information including their
              contact details and the email address they will use to sign up
              Jiemba.
              <br />
              <b>
                What’s great about this: Once your client sign up, they don’t
                need to fill the profile information again.
              </b>
            </div>
            <div className={classes.buttonContainer}>
              <Button type="primary" click={() => history.push('consumer/add')}>
                Create profile
              </Button>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.title}>Enter invitation code</div>
            <div className={classes.bodyText}>
              Use this when you receive an invitation from you client. To accept
              the invitation, simply enter the 6-digit code included in the
              email invitation.
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
