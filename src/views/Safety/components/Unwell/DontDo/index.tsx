import React from 'react';
import { Unwell } from 'types/safety';
import { People, Add, Block } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';
import { Network } from 'types/network';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  values: {
    display: 'flex',
    flexDirection: 'column'
  },
  value: {
    padding: '10px',
    backgroundColor: '#FFFAE9',
    borderRadius: '4px',
    margin: '10px 0'
  },
  action: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  dontDoText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#B50000'
  },
  support: {
    paddingLeft: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  supportText: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#C57D7D',
    marginRight: '5px'
  }
}));

type Props = {
  dontDo: Unwell[];
  collapse: boolean;
};

export const DontDo: React.FC<Props> = ({ dontDo, collapse }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.network.networks
  );

  return (
    <div style={{ margin: '5px 0' }}>
      {collapse && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '5px 0'
          }}>
          <Block style={{ fill: '#B50000', marginRight: '5px' }} />
          <span className={classes.dontDoText}>Don't do</span>
        </div>
      )}
      {collapse && (
        <div>
          {dontDo.map((item, index) => {
            return (
              <div key={index} className={classes.values}>
                <div className={classes.value}>{item.Description}</div>
                <div className={classes.support}>
                  <People style={{ fill: '#C57D7D', marginRight: '10px' }} />
                  <span className={classes.supportText}>
                    {
                      networks.find(
                        network =>
                          network.Id === item.NetworkContactIdResponsible
                      )?.Name
                    }
                  </span>
                </div>
              </div>
            );
          })}
          <div className={classes.action}>
            <div style={{ width: '91px', marginRight: '20px' }}>
              <Button type="primarySmall">
                <Add style={{ marginRight: '5px' }} />
                Add
              </Button>
            </div>
            <div style={{ width: '155px' }}>
              <Button type="tertiarySmall">
                <img
                  src="/images/safety/suggestion.svg"
                  alt=""
                  style={{ marginRight: '5px' }}
                />
                Suggestions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DontDo;
