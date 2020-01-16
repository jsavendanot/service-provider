import React, { ReactNode } from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#000000'
  },
  dashboardBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '10px 0'
  },
  dashboardBoxContent: {
    padding: '15px',
    backgroundColor: '#FFFFFF',
    borderRadius: '6px'
  }
}));

type Props = {
  title: string;
  header?: ReactNode;
  children: ReactNode;
};

const DashboareBox: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { title, header, children } = props;
  return (
    <div className={classes.dashboardBox}>
      <span className={classes.title}>{title}</span>
      <div className={classes.header}>{header}</div>
      <div className={classes.dashboardBoxContent}>{children}</div>
    </div>
  );
};

export default DashboareBox;
