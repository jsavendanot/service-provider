import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '563px',
    background: '#FFFFFF',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.24), 0px 2px 8px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  note: {
    width: '319px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    textAlign: 'justify'
  }
}));

export const Document: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.note}>
        To see the preview of the document, select the content you want to
        export from the left panel and press ‘Generate document’.
      </div>
    </div>
  );
};

export default Document;
