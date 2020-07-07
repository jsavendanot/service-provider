import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Theme
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '30px 8px',
    width: '265px',
    [theme.breakpoints.up('sm')]: {
      width: '285px'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#C57D7D'
  },
  image: {
    width: '46px',
    height: '44px'
  },
  iconButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '0'
  },
  listText: {
    marginLeft: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    textAlign: 'justify'
  },
  closeText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    cursor: 'pointer'
  }
}));

type Props = {
  open: boolean;
  close: () => void;
};

const Tips: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <div className={classes.root}>
          <IconButton className={classes.iconButton} onClick={close}>
            <Close style={{ fill: '#C57D7D' }} />
          </IconButton>
          <Grid container justify="center">
            <Grid item xs={2} />
            <Grid item xs={10}>
              <span className={classes.title}>
                When defining your
                <br />
                goals be sure to:
              </span>
            </Grid>
            <Grid item xs={12}>
              <div style={{ margin: '20px 10px' }}>
                {[
                  'Make your goals personal and describe them in present tense.',
                  'Phrase your goals positively. State what you want, not what you don’t want.',
                  'Make sure your goals are yours, and yours alone.',
                  'Commit yourself to the pursuit of your goals.',
                  'Review and visualize daily; see it, hear it, feel it.'
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        margin: '10px 0'
                      }}>
                      &#8226;
                      <div className={classes.listText}>{item}</div>
                    </div>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={3}>
              <span className={classes.closeText} onClick={close}>
                Close
              </span>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Tips;
